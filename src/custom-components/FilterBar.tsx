import { Filter, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FilterBar = () => {
  const placeTypes = [
    "Nationalpark",
    "Naturreservat",
    "Stadspark",
    "Vandringsleder",
    "Botanisk trädgård",
    "Strand",
    "Skog",
    "Sjö",
  ];

  const amenities = [
    "Café i närheten",
    "Toaletter",
    "Tillgänglig",
    "Parkering",
    "Familjevänlig",
    "Hundvänlig",
    "Cykelvägar",
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-lake-mist/30 p-6 shadow-sm">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-lake-mist/50 hover:bg-warm-clouds/50 hover:border-spring-meadows/50 transition-all duration-200 rounded-xl shadow-sm backdrop-blur-sm bg-white/80">
                <Filter className="w-4 h-4 mr-2" />
                Typ av plats
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-lake-mist/30 z-50 rounded-xl shadow-xl">
              {placeTypes.map((type) => (
                <DropdownMenuItem key={type} className="hover:bg-warm-clouds/50 rounded-lg m-1">
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-lake-mist/50 hover:bg-warm-clouds/50 hover:border-spring-meadows/50 transition-all duration-200 rounded-xl shadow-sm backdrop-blur-sm bg-white/80">
                <MapPin className="w-4 h-4 mr-2" />
                Avstånd
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-lake-mist/30 z-50 rounded-xl shadow-xl">
              <DropdownMenuItem className="hover:bg-warm-clouds/50 rounded-lg m-1">Inom 5 km</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-warm-clouds/50 rounded-lg m-1">Inom 10 km</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-warm-clouds/50 rounded-lg m-1">Inom 25 km</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-warm-clouds/50 rounded-lg m-1">Inom 50 km</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-lake-mist/50 hover:bg-warm-clouds/50 hover:border-spring-meadows/50 transition-all duration-200 rounded-xl shadow-sm backdrop-blur-sm bg-white/80">
                <Star className="w-4 h-4 mr-2" />
                Bekvämligheter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-lake-mist/30 z-50 rounded-xl shadow-xl">
              {amenities.map((amenity) => (
                <DropdownMenuItem key={amenity} className="hover:bg-warm-clouds/50 rounded-lg m-1">
                  {amenity}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-3 flex-wrap">
            <Badge variant="secondary" className="bg-gradient-to-r from-spring-meadows to-spring-meadows/80 text-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              Stadspark ×
            </Badge>
            <Badge variant="secondary" className="bg-gradient-to-r from-spring-meadows to-spring-meadows/80 text-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              Café i närheten ×
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
