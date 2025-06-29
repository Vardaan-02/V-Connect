"use client"
import React, { useEffect, useState } from "react";
import Header from "./_PostApp/navbar";
import { ProfileCard } from "app/dashboard/_profile/profileCard";
import CreatePost from "./_PostApp/creatPost";
import { PostCard }from "./_PostApp/postcard";
import RightSidebar from "./_PostApp/rightSidebar";
import PostSkeleton from "./_PostApp/skeleton";
import Stories from "./_PostApp/stories";
import Suggestions from "./_PostApp/suggestions";
import { useIsMobile } from "@hooks/isMobile";
import ChatBot from "app/_chatbot/page";
import Loader from "app/loading";
import { useGetPosts } from "@hooks/posts";
import StoryViewer from "./_PostApp/_Stories/storyViewer";
import { useGetStories } from "@hooks/stories";
import { useUser } from "@providers/stateClient/userClient";
const Index: React.FC = () => {
  const [isLoad, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const {posts,isLoading2}=useGetPosts(); 
   const {stories,isLoading4}=useGetStories();
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const {isLoading} = useUser();
  const openStoryViewer = (userIndex: number, storyIndex: number = 0) => {
      setSelectedUserIndex(userIndex);
      setSelectedStoryIndex(storyIndex);
      setStoryViewerOpen(true);
  };
  useEffect(() => {
    setIsLoading(true);
  }, [posts]);
  useEffect(() => {
    if (!isLoading2 && !isLoading) {
      setIsLoading(false);
      console.log(posts);
    }
  }, [isLoading2, isLoading, posts]);
  if(isLoading4||isLoading||isLoad){
    return <Loader></Loader>
  }
  return (
    
    <div className="min-h-screen bg-background">
      <Header />
      <StoryViewer 
        isOpen={storyViewerOpen}
        initialUserIndex={selectedUserIndex}
        initialStoryIndex={selectedStoryIndex}
        onClose={() => setStoryViewerOpen(false)}
        stories={stories}
      />
      <main className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {!isMobile && (
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-">
                <ProfileCard />
                <Stories openStoryViewer={openStoryViewer} stories={stories}/>
              </div>
            </div>
          )}
          <div className="lg:col-span-6">
            <CreatePost />
            {isMobile && <Stories openStoryViewer={openStoryViewer} stories={stories}/>}
            
            {isLoad ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : (
              posts.map((post, index) => (
                <PostCard key={post.id} post={post} delay={index} />
              ))
            )}
          </div>
          
          {!isMobile && (
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <Suggestions />
                <RightSidebar />
              </div>
            </div>
          )}
        </div>
        <ChatBot></ChatBot>
      </main>
    </div>
  );
};

export default Index;
