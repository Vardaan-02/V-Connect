import UserAvatar from "../../feed/_PostApp/avatar";
import { Card, CardContent } from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";
import { Badge } from "@ui/components/ui/badge";
import { cn } from "@ui/lib/utils";
import { useUser } from "@providers/stateClient/userClient";

export const ProfileCard = ({ className="" }) => {
  const {currentUser:user}=useUser();
  return (
    <Card
      className={cn(
        "relative glass-card border-border/50 overflow-hidden animate-fade-in shadow-xl rounded-2xl h-[400px]", 
        className
      )}
    >  
      <CardContent className="p-6 text-center">
        <UserAvatar 
          src={user.profileImageURL} 
          name={user.name} 
          size="lg" 
          className="ring-4 ring-white shadow-lg transform transition-all duration-300 hover:scale-105 mx-auto" 
        />
        <h3 className="mt-3 text-xl font-semibold text-white">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.title}</p>

        <div className="mt-4 flex items-center justify-around bg-white/10 rounded-lg p-2">
          <div className="text-center">
            <p className="text-lg font-semibold text-white">{user.posts.length}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">{user.followers.length}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">{user.following.length}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Profile Completion</span>
            <span className="text-xs font-medium text-white">75%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400" style={{ width: "75%" }} />
          </div>
        </div>
        
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 justify-center w-full max-w-xs mx-auto">
          <Button size="sm" className="w-full sm:w-auto sm:flex-1 bg-blue-500 hover:bg-blue-600 transition-all">
            Edit Profile
          </Button>


        </div>
        
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-transparent">{user.title}</Badge>
          <Badge className="bg-muted text-muted-foreground border-transparent">Content Creator</Badge>
          <Badge className="bg-muted text-muted-foreground border-transparent">Influencer</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
