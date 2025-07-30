import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Phone, WashingMachine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceType } = useParams();
  
  // Map route params to service data keys
  const serviceKeyMap: { [key: string]: string } = {
    "ac": "ac-repair",
    "fridge": "refrigerator", 
    "tv": "tv-repair",
    "water-motor": "water-motor",
    "electrical": "electrical",
    "plumbing": "plumbing", 
    "washing-machine": "washing-machine"
  };
  
  const serviceData = {
    "washing-machine": {
      title: "Washing Machine Repair & Service",
      subtitle: "Professional quality service guaranteed",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Complete washing machine services including repair, maintenance, installation, and troubleshooting for all brands.",
      services: ["Repair", "Maintenance", "Installation", "Troubleshooting", "Cleaning", "Part Replacement"],
      timeRange: "2-3 hours (depending on service)",
      costRange: "Starting from ₹350*"
    },
    "electrical": {
      title: "Electrical Repair & Service",
      subtitle: "Safe and professional electrical work",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Complete electrical services including wiring, installation, repair, and troubleshooting for home and office.",
      services: ["Wiring", "Installation", "Repair", "MCB Replacement", "Socket Installation", "Switch Repair"],
      timeRange: "1-4 hours (depending on service)",
      costRange: "Starting from ₹200*"
    },
    "plumbing": {
      title: "Plumbing Repair & Service",
      subtitle: "Expert plumbing solutions",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Professional plumbing services including pipe repair, installation, leak fixing, and maintenance.",
      services: ["Pipe Repair", "Installation", "Leak Fixing", "Tap Repair", "Bathroom Fitting", "Kitchen Plumbing"],
      timeRange: "1-3 hours (depending on service)",
      costRange: "Starting from ₹300*"
    },
    "ac-repair": {
      title: "AC Repair & Service",
      subtitle: "Keep your AC running efficiently",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Complete AC services including repair, gas refilling, cleaning, and installation for all brands.",
      services: ["Repair", "Gas Refilling", "Cleaning", "Installation", "Maintenance", "Filter Replacement"],
      timeRange: "1-2 hours (depending on service)",
      costRange: "Starting from ₹500*"
    },
    "refrigerator": {
      title: "Refrigerator Repair & Service",
      subtitle: "Keep your food fresh and safe",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Expert refrigerator services including repair, gas charging, thermostat fixing, and maintenance.",
      services: ["Repair", "Gas Charging", "Thermostat Repair", "Compressor Service", "Door Seal Replacement", "Cleaning"],
      timeRange: "2-4 hours (depending on service)",
      costRange: "Starting from ₹400*"
    },
    "microwave": {
      title: "Microwave Repair & Service",
      subtitle: "Quick and reliable microwave solutions",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Professional microwave services including repair, magnetron replacement, and maintenance for all brands.",
      services: ["Repair", "Magnetron Replacement", "Control Panel Repair", "Door Repair", "Heating Issue", "Cleaning"],
      timeRange: "1-2 hours (depending on service)",
      costRange: "Starting from ₹300*"
    },
    "geyser": {
      title: "Geyser Repair & Service",
      subtitle: "Hot water solutions you can trust",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Complete geyser services including repair, element replacement, thermostat fixing, and installation.",
      services: ["Repair", "Element Replacement", "Thermostat Repair", "Installation", "Tank Cleaning", "Pipe Connection"],
      timeRange: "1-3 hours (depending on service)",
      costRange: "Starting from ₹350*"
    },
    "chimney": {
      title: "Chimney Repair & Service",
      subtitle: "Keep your kitchen smoke-free",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Professional chimney services including repair, cleaning, filter replacement, and installation.",
      services: ["Repair", "Deep Cleaning", "Filter Replacement", "Installation", "Motor Repair", "Duct Cleaning"],
      timeRange: "1-2 hours (depending on service)",
      costRange: "Starting from ₹400*"
    },
    "inverter": {
      title: "Inverter Repair & Service",
      subtitle: "Uninterrupted power solutions",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Expert inverter services including repair, battery replacement, installation, and maintenance.",
      services: ["Repair", "Battery Replacement", "Installation", "Circuit Repair", "Display Repair", "Wiring Check"],
      timeRange: "1-3 hours (depending on service)",
      costRange: "Starting from ₹300*"
    },
    "water-purifier": {
      title: "Water Purifier Repair & Service",
      subtitle: "Pure water for healthy living",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Complete water purifier services including repair, filter replacement, installation, and maintenance.",
      services: ["Repair", "Filter Replacement", "Installation", "UV Lamp Replacement", "Membrane Change", "Cleaning"],
      timeRange: "1-2 hours (depending on service)",
      costRange: "Starting from ₹250*"
    },
    "tv-repair": {
      title: "TV Repair & Service",
      subtitle: "Expert TV repair solutions",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Complete TV repair services including screen repair, audio issues, remote problems, and maintenance for all brands.",
      services: ["Screen Repair", "Audio Fix", "Remote Issues", "Power Problems", "HDMI Port Repair", "Software Update"],
      timeRange: "1-3 hours (depending on service)",
      costRange: "Starting from ₹400*"
    },
    "water-motor": {
      title: "Water Motor Repair & Service",
      subtitle: "Reliable water motor solutions",
      icon: <WashingMachine size={48} className="text-white" />,
      description: "Professional water motor services including repair, installation, maintenance, and troubleshooting for all types.",
      services: ["Motor Repair", "Installation", "Winding Repair", "Bearing Replacement", "Pipe Connection", "Pressure Check"],
      timeRange: "2-4 hours (depending on service)",
      costRange: "Starting from ₹500*"
    }
  };

  const mappedServiceType = serviceKeyMap[serviceType || ""] || serviceType;
  const service = serviceData[mappedServiceType as keyof typeof serviceData] || serviceData["washing-machine"];

  const handleCallAgent = () => {
    window.open(`tel:+919515624806`, '_self');
  };

  const handleRaiseRequest = () => {
    navigate(`/raise-request/${mappedServiceType}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/services")}
          className="mr-3 p-1"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">{service.title}</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Service Header Card */}
        <Card className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                {service.icon}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{service.title}</h2>
            <p className="text-sm opacity-90">{service.subtitle}</p>
          </CardContent>
        </Card>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Description:</h3>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </div>

        {/* List of Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">List of Services:</h3>
          <div className="grid grid-cols-2 gap-3">
            {service.services.map((item, index) => (
              <Button
                key={index}
                variant="service"
                className="h-12 font-medium"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        {/* Time & Cost */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Estimated Time & Cost:</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Time:</span> {service.timeRange}</p>
            <p><span className="font-medium">Cost:</span> {service.costRange}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={handleRaiseRequest}
            className="w-full h-12 bg-gradient-to-r from-brand-purple to-brand-purple-light hover:opacity-90 text-white font-semibold"
          >
            Raise Request
          </Button>
          
          <Button 
            onClick={handleCallAgent}
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold"
          >
            <Phone size={20} className="mr-2" />
            Call Our Agent
          </Button>
        </div>
      </div>
    </div>
  );
}