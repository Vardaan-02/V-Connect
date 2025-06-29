"use client"
import { useState, useEffect } from "react";
import { Zap, Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
 const router=useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { name: "Feed", description: "Track your post performance", href:"/feed"},
    { name: "DashBoard", description: "Plan your content ahead" ,href:"/dashboard"},
    { name: "Messenger", description: "Get content suggestions", href:"/messenger"},
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0f172a]/95 backdrop-blur-lg shadow-lg"
          : "bg-gradient-to-r from-[#0f172a]/30 to-[#1e293b]/30 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
              <Zap className="relative h-8 w-8 text-cyan-400 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              PearlPost
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button
                className="flex items-center px-4 py-2 text-white/80 hover:text-cyan-400 transition-colors"
                onMouseEnter={() => setActiveDropdown("features")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Features
                <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div
                className={cn(
                  "absolute top-full -left-4 w-64 bg-[#0f172a]/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 py-3 transform transition-all duration-200",
                  activeDropdown === "features"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                )}
                onMouseEnter={() => setActiveDropdown("features")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {features.map((feature) => (
                  <a
                    key={feature.name}
                    onClick={()=>router.push(feature.href)}
                    className="block px-6 py-2 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-white/90 font-medium">{feature.name}</div>
                    <div className="text-sm text-white/60">{feature.description}</div>
                  </a>
                ))}
              </div>
            </div>

            <a href="#" className="px-4 py-2 text-white/80 hover:text-cyan-400 transition-colors">
              About
            </a>
            {!props.user?<div className="flex items-center space-x-4">
              <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-200 font-medium" onClick={()=>router.push("/auth")}>
                Login
              </button>
            </div>:<div className="flex items-center space-x-4">
              <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-200 font-medium" onClick={()=>{
                localStorage.removeItem("__Pearl_Token");
                router.push("/auth")
              }}>
                SignOut
              </button>
              </div>
}
            
          </div>
          <button
            className="md:hidden text-white/90 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "md:hidden absolute w-full bg-[#0f172a]/95 backdrop-blur-lg border-t border-white/10 transition-all duration-300 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="px-6 py-6 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-white/60 text-sm font-medium px-2">Features</div>
              {features.map((feature) => (
                <a
                  key={feature.name}
                  onClick={()=>router.push(feature.href)}
                  className="block px-2 py-2 text-white/80 hover:text-cyan-400 transition-colors"
                >
                  <div className="flex items-center">
                    <span>{feature.name}</span>
                    <ExternalLink className="ml-2 h-4 w-4 opacity-60" />
                  </div>
                </a>
              ))}
            </div>
            <a href="#" className="block px-2 py-2 text-white/80 hover:text-cyan-400 transition-colors">
              About
            </a>
          </div>
          
          {!props.user?<div className="space-y-3 pt-4 border-t border-white/10">
              <button className="w-full px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 active:scale-95 transition-all duration-200 font-medium" onClick={()=>router.push("/auth")}>
                Login
              </button>
            </div>:<div className="flex items-center space-x-4">
              <button className="w-full px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 active:scale-95 transition-all duration-200 font-medium" onClick={()=>{
                localStorage.removeItem("__Pearl_Token");
                router.push("/auth")
              }}>
                SignOut
              </button>
              </div>
}
        </div>
      </div>
    </nav>
  );
}

