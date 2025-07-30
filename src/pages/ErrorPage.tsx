import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Phone, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleCallAgent = () => {
    window.open(`tel:+919515624806`, '_self');
  };

  const handleTryAgain = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Unable to Submit Request</h1>
          
          <p className="text-gray-600 mb-6">
            We're experiencing high traffic right now. Please try again later or call our support agent directly.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center text-red-800 mb-2">
              <AlertCircle size={16} className="mr-2" />
              <span className="font-semibold">Server is busy - Please try one of the options below</span>
            </div>
            <div className="flex items-center justify-center text-red-700">
              <Phone size={16} className="mr-2" />
              <span className="font-medium">+91 95156 24806</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleCallAgent}
              className="w-full h-12 bg-warning-orange hover:bg-warning-orange/90 text-white font-semibold"
            >
              <Phone size={20} className="mr-2" />
              Call Our Agent
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleTryAgain}
              className="w-full h-12 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw size={20} className="mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}