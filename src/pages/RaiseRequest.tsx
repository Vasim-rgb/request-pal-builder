import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const RaiseRequest = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: serviceType || "",
    serviceCategory: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    problemDescription: "",
  });

  // Set the service type when component mounts or serviceType changes
  useEffect(() => {
    if (serviceType) {
      setFormData(prev => ({ ...prev, serviceType }));
    }
  }, [serviceType]);


  const getServiceCategories = (serviceType: string) => {
    // This should match exactly with the services shown in ServiceDetail
    const serviceData: { [key: string]: string[] } = {
      "electrical": ["Wiring", "Installation", "Repair", "MCB Replacement", "Socket Installation", "Switch Repair"],
      "plumbing": ["Pipe Repair", "Installation", "Leak Fixing", "Tap Repair", "Bathroom Fitting", "Kitchen Plumbing"],
      "washing-machine": ["Repair", "Maintenance", "Installation", "Troubleshooting", "Cleaning", "Part Replacement"],
      "ac-repair": ["Repair", "Gas Refilling", "Cleaning", "Installation", "Maintenance", "Filter Replacement"],
      "refrigerator": ["Repair", "Gas Charging", "Thermostat Repair", "Compressor Service", "Door Seal Replacement", "Cleaning"],
      "microwave": ["Repair", "Magnetron Replacement", "Control Panel Repair", "Door Repair", "Heating Issue", "Cleaning"],
      "geyser": ["Repair", "Element Replacement", "Thermostat Repair", "Installation", "Tank Cleaning", "Pipe Connection"],
      "chimney": ["Repair", "Deep Cleaning", "Filter Replacement", "Installation", "Motor Repair", "Duct Cleaning"],
      "inverter": ["Repair", "Battery Replacement", "Installation", "Circuit Repair", "Display Repair", "Wiring Check"],
      "water-purifier": ["Repair", "Filter Replacement", "Installation", "UV Lamp Replacement", "Membrane Change", "Cleaning"],
      "tv-repair": ["Screen Repair", "Audio Fix", "Remote Issues", "Power Problems", "HDMI Port Repair", "Software Update"],
      "water-motor": ["Motor Repair", "Installation", "Winding Repair", "Bearing Replacement", "Pipe Connection", "Pressure Check"]
    };
    return serviceData[serviceType] || ["Installation", "Repair", "Maintenance"];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Reset service category when service type changes
      ...(field === "serviceType" ? { serviceCategory: "" } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);

    try {
      // Check for duplicate requests within last 10 minutes
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      
      const { data: existingRequests, error: checkError } = await (supabase as any)
        .from('requests')
        .select('*')
        .eq('phone_number', formData.phoneNumber)
        .eq('service_type', formData.serviceType)
        .gte('created_at', tenMinutesAgo);

      if (checkError) {
        console.error('Error checking for duplicates:', checkError);
      }

      // If duplicate request found, show message
      if (existingRequests && existingRequests.length > 0) {
        toast({
          title: "Request Already Submitted",
          description: "You have already submitted a similar request recently. Please wait or call our agent for assistance.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const requestData = {
        ...formData,
        userEmail: user?.email_or_phone,
        userId: user?.id,
        userName: user?.name,
        timestamp: new Date().toISOString(),
        source: 'mociber-app'
      };

      // Store in Supabase requests table (types will be updated automatically)
      try {
        const { error: supabaseError } = await (supabase as any)
          .from('requests')
          .insert([{
            service_type: formData.serviceType,
            service_category: formData.serviceCategory,
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            address: formData.address,
            problem_description: formData.problemDescription,
            status: 'Pending'
          }]);

        if (supabaseError) {
          console.error('Error storing in Supabase:', supabaseError);
          throw new Error('Failed to store request in database');
        }
      } catch (dbError) {
        console.error('Database storage error:', dbError);
        // Continue with webhook even if DB storage fails
      }

      // Send to webhook (but don't handle errors - always show success dialog)
      try {
        await fetch('https://vasimshaik.app.n8n.cloud/webhook-test/complaint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      } catch (error) {
        console.error('Webhook error:', error);
        // Continue regardless of webhook status
      }

      // Always show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting request:', error);
      setShowSuccessDialog(true); // Show dialog even on error
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-3 p-1"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">Raise Request</h1>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-gray-700 font-medium">
              Type of Service <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.serviceType}
              readOnly
              className="h-12 border-gray-200 bg-gray-50 text-gray-700"
              placeholder="Service type will be auto-filled"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceCategory" className="text-gray-700 font-medium">
              Service Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.serviceCategory}
              onValueChange={(value) => handleInputChange("serviceCategory", value)}
              required
            >
              <SelectTrigger className="h-12 border-gray-200 bg-white hover:border-brand-purple/30 focus:border-brand-purple transition-all duration-200 hover:shadow-md">
                <SelectValue placeholder="Select service category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-xl z-50">
                {getServiceCategories(formData.serviceType).map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')} className="hover:bg-brand-pink/10 focus:bg-brand-pink/20 transition-colors duration-150">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700 font-medium">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="h-12 border-gray-200 hover:border-brand-purple/30 focus:border-brand-purple transition-all duration-200 hover:shadow-md focus:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="h-12 border-gray-200 hover:border-brand-purple/30 focus:border-brand-purple transition-all duration-200 hover:shadow-md focus:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700 font-medium">
              Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="min-h-[80px] border-gray-200 resize-none hover:border-brand-purple/30 focus:border-brand-purple transition-all duration-200 hover:shadow-md focus:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemDescription" className="text-gray-700 font-medium">
              Problem Description
            </Label>
            <Textarea
              id="problemDescription"
              placeholder="Describe the problem in detail"
              value={formData.problemDescription}
              onChange={(e) => handleInputChange("problemDescription", e.target.value)}
              className="min-h-[100px] border-gray-200 resize-none hover:border-brand-purple/30 focus:border-brand-purple transition-all duration-200 hover:shadow-md focus:shadow-md"
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-brand-purple to-brand-purple-light hover:opacity-90 hover:scale-[1.02] text-white font-semibold mt-8 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Request Submitted!</AlertDialogTitle>
            <AlertDialogDescription>
              Want to give more info about your repair? Call our agent
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogAction 
              onClick={() => {
                setShowSuccessDialog(false);
                window.open(`tel:+919515624806`, '_self');
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Call Our Agent
            </AlertDialogAction>
            <AlertDialogAction 
              onClick={() => {
                setShowSuccessDialog(false);
                navigate('/');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              No Thanks
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RaiseRequest;