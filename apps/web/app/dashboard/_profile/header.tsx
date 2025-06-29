import { useState, useEffect } from 'react';
import { 
  SearchIcon, 
  BellIcon, 
  MessageCircleIcon, 
  ChevronDownIcon,
  MenuIcon,
  Zap
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/ui/avatar';
import { Button } from '@ui/components/ui/button';
import { Input } from '@ui/components/ui/input';
import { Badge } from '@ui/components/ui/badge';
import { useRouter } from 'next/navigation';

export const Header = ({user}) => {
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={` top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-[#0a1f2f]/80 backdrop-blur-lg shadow-lg' // Blue glassmorphism with blur
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden animate-opacity-fade header-icon-animation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2 translate-on-hover">
            <div className="h-10 w-10 rounded-full  flex items-center justify-center animate-fade-in">
            <Zap className="relative h-8 w-8 text-cyan-400 transform group-hover:scale-110 transition-transform duration-200" />
            </div>
            <span className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-fade-in delay-75">
            V-Connect
            </span>
        </div>
      </div>
      
      <div className="lg:flex hidden items-center border rounded-lg overflow-hidden bg-[#1a2935]/50 pl-3 w-1/3 transition-all duration-300 focus-within:border-primary focus-within:blue-glow ml-52">
        <SearchIcon className="h-4 w-4 text-muted-foreground animate-fade-in" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="border-0 focus-visible:ring-0 bg-transparent animate-fade-in delay-75"
        />
      </div>
      
      <div className="flex items-center gap-3 ml-auto">
      <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-white/10 transition-all duration-300 group"
          onClick={()=>router.push('/messenger')}
        >
          <MessageCircleIcon className="h-5 w-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-blue-500 text-white shadow-lg animate-pulse" 
            variant="outline"
          >
            4
          </Badge>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-white/10 transition-all duration-300 group"
          onClick={()=>router.push('/feed')}
        >
          <BellIcon className="h-5 w-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white shadow-lg animate-pulse" 
            variant="outline"
          >
            2
          </Badge>
        </Button>
        
        <div className="ml-2 pl-2 border-l border-white/10 flex items-center gap-2 hover:border-white/20 transition-all duration-300 group">
            <Avatar className="h-9 w-9 border-2 border-blue-500/30 hover:border-blue-500/80 transition-all duration-300 overflow-hidden shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40">
              <AvatarImage src={user.profileImageURL} alt="User Avatar" className="h-full w-full object-cover" />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          <div className="hidden md:block transition-all duration-300 group-hover:translate-x-1">
            <p className="text-sm font-medium leading-none text-white group-hover:text-blue-200 transition-all duration-300">{user.name}</p>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-all duration-300">{user.title}</p>
          </div>
          <ChevronDownIcon className="h-4 w-4 text-white/60 hidden md:block group-hover:text-white/90 group-hover:rotate-180 transition-all duration-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;
