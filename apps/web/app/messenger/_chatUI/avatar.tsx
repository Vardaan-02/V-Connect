import { Avatar,AvatarFallback,AvatarImage } from "@ui/components/ui/avatar";
import { cn } from "@ui/lib/utils";

interface UserAvatarProps {
  src?: string;
  fallback: string;
  className?: string;
}

export const UserAvatar = ({ src, fallback,className }: UserAvatarProps) => {
  return (
    <div className="relative">
      <Avatar className={cn("h-8 w-8", className)}>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
};
