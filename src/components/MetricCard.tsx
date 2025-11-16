// src/components/MetricCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  status?: {
    label: string;
    variant: "success" | "warning" | "destructive";
  };
}

export const MetricCard = ({ title, value, subtitle, icon: Icon, status }: MetricCardProps) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="w-5 h-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {status && (
          <Badge variant={status.variant} className="mt-2">
            {status.label}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
