
import { Heart, MapPin, Star, Coffee, Users, Accessibility } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PlaceCardProps {
  place: {
    id: string;
    name: string;
    type: string;
    location: string;
    rating: number;
    reviewCount: number;
    image: string;
    amenities: string[];
    distance: string;
    isSaved: boolean;
  };
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "café": return <Coffee className="w-3 h-3" />;
      case "tillgänglig": return <Accessibility className="w-3 h-3" />;
      case "familjevänlig": return <Users className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-none group hover:-translate-y-2 hover:scale-[1.02] rounded-2xl">
      <div className="relative overflow-hidden">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
            place.isSaved 
              ? 'bg-twilight-lupine/90 text-white hover:bg-twilight-lupine shadow-lg' 
              : 'bg-white/80 text-granite-ridge hover:bg-white shadow-md'
          }`}
        >
          <Heart className={`w-4 h-4 transition-all duration-300 ${place.isSaved ? 'fill-current scale-110' : 'hover:scale-110'}`} />
        </Button>
        
        <Badge className="absolute bottom-3 left-3 bg-gradient-to-r from-spring-meadows to-spring-meadows/80 text-white shadow-lg backdrop-blur-sm border-0 font-medium">
          {place.type}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-xl text-granite-ridge group-hover:text-spring-meadows transition-colors duration-300 line-clamp-1">
            {place.name}
          </h3>
          <div className="flex items-center text-sm text-granite-ridge bg-warm-clouds/30 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-current text-yellow-500 mr-1" />
            <span className="font-semibold">{place.rating}</span>
            <span className="text-xs ml-1">({place.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-granite-ridge/80 mb-4">
          <MapPin className="w-4 h-4 mr-1 text-spring-meadows" />
          <span className="truncate">{place.location}</span>
          <span className="mx-2">•</span>
          <span className="font-medium text-spring-meadows">{place.distance}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {place.amenities.map((amenity, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-gradient-to-r from-warm-clouds/60 to-warm-clouds/40 text-granite-ridge flex items-center gap-1 border-0 hover:from-warm-clouds/80 hover:to-warm-clouds/60 transition-all duration-200"
            >
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-spring-meadows to-spring-meadows/80 hover:from-spring-meadows/90 hover:to-spring-meadows/70 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl font-semibold py-3"
          size="sm"
        >
          Visa detaljer
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
