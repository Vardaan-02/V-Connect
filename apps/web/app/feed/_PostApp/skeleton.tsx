import React from "react";

const PostSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded-md w-1/4 mb-4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded-md w-full animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-md w-full animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-md w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 h-[200px] bg-gray-200 rounded-md animate-pulse"></div>
      
      <div className="mt-4 pt-2 border-t border-gray-200/60 flex justify-between">
        <div className="h-8 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
