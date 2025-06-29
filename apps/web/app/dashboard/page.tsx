"use client";
import { useState, useEffect, use } from "react";
import { Header } from "./_profile/header";
import { StatsGrid } from "./_profile/statsGrid";
import { EngagementChart } from "./_profile/engagementChart";
import { ProfileCard } from "./_profile/profileCard";
import { ActivityFeed } from "./_profile/activityFeed";
import { toast } from "sonner";
import { useActivityData, useChartData, useCurrentUser } from "@hooks/user";
import Loader from "app/loading";
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { user, isLoading } = useCurrentUser();
  const { chartData, isLoading: isLoadingChartData } = useChartData(user ? user.id : null);
  const { activityData, isLoading: isLoadingActivityData } = useActivityData(user ? user.id : null);
  if (isLoading || isLoadingChartData|| isLoadingActivityData) {
    return (
      <Loader></Loader>
    );
  }
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header user={user}/>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
          <p className="text-muted-foreground animate-fade-in opacity-0 delay-100">
            Your social media performance at a glance
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 mx-4">
            <StatsGrid user={user}/>
            <div className="mt-13 ">
            <EngagementChart chartData={chartData}/>
            </div>
          </div>
          <div className="lg:col-span-1">
           <div className="h-2/5">
            <ActivityFeed activityData={activityData}/>
            </div>
            <div className="h-1/3 mt-18">
            <ProfileCard user={user} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
