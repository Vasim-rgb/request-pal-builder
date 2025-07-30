import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
  onClick?: () => void;
}

export function ServiceCard({ icon, title, className, onClick }: ServiceCardProps) {
  return (
    <Card 
      className={cn(
        "p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white border border-gray-200", 
        className
      )}
      onClick={onClick}
    >
      <div className="text-gray-600 flex items-center justify-center h-12 w-12">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center">{title}</span>
    </Card>
  );
}