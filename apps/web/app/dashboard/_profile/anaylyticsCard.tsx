import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@ui/components/ui/card';
import { cn } from '@ui/lib/utils';
import { AnimatedNumber } from '@ui/components/ui/animatedNumber';

interface AnalyticsCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  className,
  delay = 0
}: AnalyticsCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500 glass-card border-border/50",
      !isVisible ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="text-2xl font-semibold">
              <AnimatedNumber value={value} />
            </div>
            <div className={cn(
              "text-xs font-medium mt-1 flex items-center",
              change > 0 ? "text-emerald-500" : "text-rose-500"
            )}>
              {change > 0 ? '+' : ''}{change}% from last period
            </div>
          </div>
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-8 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
