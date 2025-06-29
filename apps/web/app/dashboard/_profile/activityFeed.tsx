import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { Avatar, AvatarImage } from '@ui/components/ui/avatar';
import { 
  HeartIcon, 
  MessageCircleIcon, 
  UserPlusIcon,
  ShareIcon,
  StarIcon
} from 'lucide-react';
import { cn, convertIsoToHuman } from '@ui/lib/utils';
import { Badge } from '@ui/components/ui/badge';


interface ActivityItemProps {
  activity: any;
  index: number;
}

const ActivityItem = ({ activity, index }: ActivityItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  
  
  const getActionColor = (action: string) => {
    switch(action) {
      case 'like': return 'text-pink-500 bg-pink-500/10';
      case 'comment': return 'text-blue-500 bg-blue-500/10';
      case 'follow': return 'text-emerald-500 bg-emerald-500/10';
      case 'share': return 'text-purple-500 bg-purple-500/10';
      case 'reply': return 'text-amber-500 bg-amber-500/10';
      default: return 'text-primary bg-primary/10';
    }
  };
  const getActionIcon = (action: string) => {
    switch(action) {
      case 'like': return HeartIcon;
      case 'comment': return MessageCircleIcon;
      case 'follow': return UserPlusIcon;
      case 'share': return ShareIcon;
      case 'reply': return StarIcon;
      default: return HeartIcon;
    }
  };
  const Icon = getActionIcon(activity.action);
  const {time}= convertIsoToHuman(activity.time);
  return (
    <div 
      className={cn(
        "flex gap-3 p-3 rounded-lg transition-all duration-500 hover:bg-secondary/40",
        !isVisible ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      )}
    >
      <Avatar className="h-9 w-9 border border-border/50">
        <AvatarImage src={activity.user.avatar} />
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{activity.user.name}</p>
          <span className="text-xs text-muted-foreground">{activity.user.username}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
          {activity.content}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-muted-foreground">{time}</p>
          <div className={cn(
            "flex items-center px-1.5 py-0.5 rounded text-xs",
            getActionColor(activity.action)
          )}>
            <Icon className="h-3 w-3 mr-1" />
            <span>{activity.action}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityFeed = ({activityData}) => {
  const activities = activityData;
  return (
    <Card className="glass-card border-border/50 animate-fade-in delay-200 mb-20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <Badge variant="outline" className="text-xs px-2 py-0">
            5 new
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-1 max-h-[290px] overflow-y-auto scrollbar-hide">
          {activities.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
