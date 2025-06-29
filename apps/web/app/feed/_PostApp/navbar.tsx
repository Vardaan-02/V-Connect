"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  MessageSquare, 
  Search, 
  Menu, 
  X,  
  Zap,
  Asterisk
} from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import UserAvatar from "./avatar";
import { useIsMobile } from "@hooks/isMobile";
import { redirect, usePathname } from "next/navigation"; 
import { useGetAllUser } from "@hooks/user";
import { User } from "gql/graphql";
import { graphqlClient } from "@providers/graphqlClient";
import { CreateRoomMutation } from "graphql/mutation/room";
import { useUser } from "@providers/stateClient/userClient";
export default function Header() {
  const {currentUser:user}=useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filteredUsers,setFilteredUsers]=useState([]);
  const isMobile = useIsMobile();
  const pathname = usePathname(); 
  const users=useGetAllUser();
  async function handleMsg(otheruser:User){
    const usersId=[otheruser.id,user.id];
    console.log(usersId);
    await graphqlClient.request(CreateRoomMutation,{
      payload:{
        usersId
      }
    });
    redirect("/messenger");
  }
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
          scrolled 
            ? "bg-[#0a0f1c]/90 backdrop-blur-xl shadow-lg border-b border-blue-500/30" 
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="relative h-8 w-8 text-cyan-400 transform group-hover:scale-110 transition-transform duration-200" />
            <span className="text-white text-lg font-semibold tracking-wide">PearlPost</span>
          </Link>

          {!isMobile && (
            <nav className="flex items-center space-x-6">
              <NavItem icon={<Home className="h-6 w-6" />} label="Home" path="/" active={pathname === "/"} />
            <NavItem icon={<Briefcase className="h-6 w-6" />} label="Dashboard" path="/dashboard" active={pathname === "/dashboard"} />
            <NavItem icon={<MessageSquare className="h-6 w-6" />} label="Messenger" path="/messenger" active={pathname === "/messenger"} />
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isMobile && (
                <div className="relative group">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400 transition-all group-hover:text-blue-300" />
                  <Input
                  placeholder="Search users..."
                  className="w-48 bg-[#131b2e]/50 border border-blue-500/30 
                     focus:w-64 transition-all duration-300 pl-9 
                     text-white placeholder-blue-200/50 focus-visible:ring-2 
                     focus-visible:ring-blue-500/50 rounded-full shadow-md"
                  onChange={(e) => {
                    const query = e.target.value.toLowerCase();
                    const filteredUsers = users.allUser.filter((u) =>
                    u.name.toLowerCase().includes(query)
                    );
                    setFilteredUsers(filteredUsers); 
                  }}
                  />
                  {filteredUsers.length > 0 && (
                  <div className="absolute top-12 left-0 w-full bg-[#0a0f1c] border border-blue-500/30 rounded-lg shadow-lg z-10">
                    {filteredUsers.map((user,index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-500/10 cursor-pointer text-white"
                      onClick={() => {
                      console.log(`Selected user: ${user.name}`);
                      }}
                    >
                      <div className="flex items-stretch space-x-2 justify-between ">
                      <div className="flex items-center space-x-2">
                      <UserAvatar src={user.profileImageURL} name={user.name} className="border-2 border-white"></UserAvatar>
                      {user.name}
                      </div>
                      <Button className="bg-yellow-300 rounded-full border-2 border-white" onClick={()=>handleMsg(user)}><MessageSquare className="text-white" ></MessageSquare></Button>
                      </div>
                    </div>
                    ))}
                  </div>
                  )}
                </div>
            )}


            <UserAvatar src={user.profileImageURL} name={user.name} size="sm" />
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </header>


      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0f1c]/95 backdrop-blur-lg shadow-lg border-t border-blue-500/30">
          <div className="flex justify-around py-3">
            <NavItem icon={<Home className="h-6 w-6" />} label="Home" path="/" active={pathname === "/"} />
            <NavItem icon={<Briefcase className="h-6 w-6" />} label="Dashboard" path="/dashboard" active={pathname === "/dashboard"} />
            <NavItem icon={<MessageSquare className="h-6 w-6" />} label="Messanger" path="/messanger" active={pathname === "/messanger"} />
          </div>
        </nav>
      )}
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, active }) => {
  return (
    <Link href={path} passHref>
      <Button
        variant="ghost"
        className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 ${
          active
            ? "bg-blue-500/20 text-blue-300 shadow-md border border-blue-500/40" 
            : "text-blue-300/70 hover:bg-blue-500/10 hover:text-blue-200"
        }`}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Button>
    </Link>
  );
};

