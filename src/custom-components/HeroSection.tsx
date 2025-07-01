
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section 
      className="relative bg-gradient-to-br from-spring-meadows/90 via-granite-ridge/80 to-twilight-lupine/70 text-white py-24 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(128, 134, 79, 0.85), rgba(142, 152, 161, 0.75), rgba(163, 147, 147, 0.65)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block text-glacial-fog">
              Upptäck Sveriges Natur
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-glacial-fog/90 max-w-3xl mx-auto leading-relaxed">
            Hitta, spara och utforska naturområden med alla bekvämligheter du behöver
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col sm:flex-row gap-4 bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-granite-ridge w-5 h-5 group-focus-within:text-spring-meadows transition-colors duration-200" />
              <Input 
                placeholder="Sök efter naturområden, parker, leder..." 
                className="pl-14 border-lake-mist/30 text-granite-ridge text-lg h-14 bg-white/80 backdrop-blur-sm focus:bg-white shadow-sm rounded-xl"
              />
            </div>
            <Button 
  size="lg" 
  className="bg-gradient-to-r from-spring-meadows to-spring-meadows/80 hover:from-spring-meadows/90 hover:to-spring-meadows/70 text-white px-10 h-14 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
>
  Explore
</Button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
