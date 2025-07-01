import { User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-destructive backdrop-blur-md border-b border-lake-mist/30 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-spring-meadows hover:text-spring-meadows/80 transition-colors duration-300">
              GrönKarta
            </h1>
            <p className="text-granite-ridge text-sm hidden sm:block font-medium">
              Upptäck naturens skönhet
            </p>
          </div>
        

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-granite-ridge hover:bg-lake-mist/50 hover:text-spring-meadows transition-all duration-200 rounded-lg">
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sparade</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-granite-ridge hover:bg-lake-mist/50 hover:text-spring-meadows transition-all duration-200 rounded-lg">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Profil</span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden text-granite-ridge hover:bg-lake-mist/50 rounded-lg">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
