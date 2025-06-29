import React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import UserAvatar from "./avatar";
import { useUser } from "@providers/stateClient/userClient";

const Suggestions = () => {
  const {currentUser:user}=useUser();
  return (
    <div className="glass-card slide-in-animation">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">People you might know</h3>
      </div>
      <div className="p-2">
        {user.recommendedUsers.map((user,index) => (
          <div
            key={index}
            className="p-3 hover:bg-secondary/40 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <UserAvatar src={user.profileImageURL} name={user.name} size="sm" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{user.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {user.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.title}
                </p>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-border">
        {user.recommendedUsers.length>3&&<Button variant="ghost" className="w-full text-primary text-sm">
          View all suggestions
        </Button>}
      </div>
    </div>
  );
};

export default Suggestions;
