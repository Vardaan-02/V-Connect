"use client";
import React, { useEffect, useState } from "react";
import ChatBot from "./_chatbot/page";
import Navbar from "@ui/components/ui/navbar";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Globe,
  ArrowRight,
  Heart,
  Zap,
} from "lucide-react";
import { useCurrentUser } from "@hooks/user";
import Loader from "./loading";
function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {user,isLoading}=useCurrentUser();
   if(isLoading) return <Loader></Loader>;
   console.log(user);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <Navbar user={user}></Navbar>

      <div className="flex items-center justify-center h-screen">
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1
                className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Connect. Share. <span className="text-indigo-400">Thrive.</span>
              </h1>
              <p
                className={`text-xl max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                Join millions of people who use ConnectHub to share ideas,
                discover new connections, and build meaningful relationships.
              </p>
              <div
                className={`transition-all duration-1000 delay-500 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-black via-blue-950 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        <div
          className="absolute inset-0 bg-grid-white/5"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">
              Experience the Future of Connection
            </h2>
            <p className="text-lg text-blue-300/80 max-w-2xl mx-auto">
              Discover powerful features that bring people together and create
              meaningful conversations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-2xl border border-white/5 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <MessageSquare className="h-8 w-8 text-blue-100" />
              </div>
              <h3 className="text-2xl font-bold text-blue-100 mb-4">
                Real-time Chat
              </h3>
              <p className="text-blue-300/80 leading-relaxed">
                Experience seamless communication with instant message delivery,
                typing indicators, and rich media sharing capabilities.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-2xl border border-white/5 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <Users className="h-8 w-8 text-blue-100" />
              </div>
              <h3 className="text-2xl font-bold text-blue-100 mb-4">
                Community Groups
              </h3>
              <p className="text-blue-300/80 leading-relaxed">
                Create and join vibrant communities with advanced moderation
                tools, events, and collaborative features.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-2xl border border-white/5 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <TrendingUp className="h-8 w-8 text-blue-100" />
              </div>
              <h3 className="text-2xl font-bold text-blue-100 mb-4">
                Trending Topics
              </h3>
              <p className="text-blue-300/80 leading-relaxed">
                Discover trending conversations and topics with AI-powered
                insights and real-time analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-black via-blue-950 to-indigo-950 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520333789090-1afc82db536a')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        <div
          className="absolute inset-0 bg-grid-white/5"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">
              Global Impact
            </h2>
            <p className="text-lg text-blue-300/80 max-w-2xl mx-auto">
              Connecting millions of people worldwide through meaningful
              conversations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-2xl border border-white/5 hover:border-blue-500/20">
                <Zap className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  2M+
                </span>
                <span className="text-blue-300/80">Active Users</span>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-2xl border border-white/5 hover:border-blue-500/20">
                <Users className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  500K+
                </span>
                <span className="text-blue-300/80">Communities</span>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-2xl border border-white/5 hover:border-blue-500/20">
                <Heart className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  10M+
                </span>
                <span className="text-blue-300/80">Messages Daily</span>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 backdrop-blur-2xl border border-white/5 hover:border-blue-500/20">
                <Globe className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  150+
                </span>
                <span className="text-blue-300/80">Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBot></ChatBot>
    </div>
  );
}

export default App;
