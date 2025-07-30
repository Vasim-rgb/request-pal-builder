import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-green/10 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-success-green to-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Request Submitted Successfully!</h1>
          
          <p className="text-gray-600 mb-2">Your service request has been received.</p>
          <p className="text-gray-600 mb-6">Our team will contact you shortly.</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <span className="font-semibold">Thank you for choosing Mociber!</span><br />
              We'll get your home service sorted quickly.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/services")}
              className="w-full h-12 bg-gradient-to-r from-brand-purple to-brand-purple-light hover:opacity-90 text-white font-semibold"
            >
              Book Another Service
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full h-12 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}