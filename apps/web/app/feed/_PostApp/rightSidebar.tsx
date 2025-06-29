import React from "react";
import { Info, Linkedin, Plus } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import UserAvatar from "./avatar";
import { suggestedUsers, trendingTopics } from "@ui/lib/mockdata";

const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      
      <div className="glass-card slide-in-animation" style={{ animationDelay: '0.3s' }}>
        <div className="px-4 py-3 border-b border-gray-200/60">
          <h3 className="font-semibold text-sm">Trending topics</h3>
        </div>
        
        <div className="p-3">
          {trendingTopics.map((topic, index) => (
            <div 
              key={index} 
              className="py-2 px-3 hover:bg-secondary/40 rounded-lg transition-colors duration-200 mb-1 cursor-pointer"
            >
              <p className="text-sm font-medium hover:text-primary hover-effect">
                #{topic.replace(/\s+/g, '')}
              </p>
              <p className="text-xs text-muted-foreground">
                {1000 + Math.floor(Math.random() * 9000)} posts
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-3 slide-in-animation" style={{ animationDelay: '0.4s' }}>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-2">
          <a href="#" className="hover:text-primary hover:underline">About</a>
          <a href="#" className="hover:text-primary hover:underline">Accessibility</a>
          <a href="#" className="hover:text-primary hover:underline">Help Center</a>
          <a href="#" className="hover:text-primary hover:underline">Privacy & Terms</a>
          <a href="#" className="hover:text-primary hover:underline">Advertising</a>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>PostPearl Corporation © 2024</span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
