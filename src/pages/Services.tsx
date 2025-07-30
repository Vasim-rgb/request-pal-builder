import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Refrigerator, 
  Zap, 
  Wrench, 
  Snowflake, 
  Tv, 
  WashingMachine, 
  Droplets,
  LogOut
} from "lucide-react";

export default function Services() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const services = [
    { icon: <Refrigerator size={24} />, title: "Fridge", path: "/service/fridge" },
    { icon: <Zap size={24} />, title: "Electrical", path: "/service/electrical" },
    { icon: <Wrench size={24} />, title: "Plumbing", path: "/service/plumbing" },
    { icon: <Snowflake size={24} />, title: "AC", path: "/service/ac" },
    { icon: <Tv size={24} />, title: "TV", path: "/service/tv" },
    { icon: <WashingMachine size={24} />, title: "Washing Machine", path: "/service/washing-machine" },
    { icon: <Droplets size={24} />, title: "Water Motor", path: "/service/water-motor" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-xl flex items-center justify-center">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mociber</h1>
              <p className="text-sm text-gray-600">Hello {user?.name}, book our services</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Promotional Banner */}
        <Card className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white border-0 shadow-lg">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm opacity-90">Get quality home services brought right to your doorstep</p>
              <h2 className="text-lg font-semibold">Get your first service with 50% discount</h2>
              <Button 
                className="mt-3 bg-white text-brand-purple hover:bg-gray-100 font-medium"
                onClick={() => navigate("/service/electrical")}
              >
                Book Service Now
              </Button>
            </div>
            <div className="text-4xl">
              👷
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Services</h3>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                onClick={() => navigate(service.path)}
              />
            ))}
          </div>
        </div>

        {/* Call Agent Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => window.open("tel:+919515624806", "_self")}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            📞 Call Our Agent
          </Button>
        </div>
      </div>
    </div>
  );
}