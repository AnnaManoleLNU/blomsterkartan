
import FilterBar from "@/custom-components/FilterBar";
import HeroSection from "@/custom-components/HeroSection";
import Header from "@/custom-components/Header";
import PlaceCard from "@/custom-components/PlaceCard";

function App() {
  // Sample data for natural places
  const places = [
    {
      id: "1",
      name: "Abisko Nationalpark",
      type: "Nationalpark",
      location: "Kiruna kommun, Lappland",
      rating: 4.8,
      reviewCount: 324,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
      amenities: ["café", "tillgänglig", "familjevänlig"],
      distance: "15 km",
      isSaved: false
    },
    {
      id: "2",
      name: "Tyresta Nationalpark",
      type: "Nationalpark", 
      location: "Haninge kommun, Stockholm",
      rating: 4.6,
      reviewCount: 198,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400",
      amenities: ["café", "familjevänlig"],
      distance: "8 km",
      isSaved: true
    },
    {
      id: "3",
      name: "Djurgården",
      type: "Stadspark",
      location: "Stockholm centrum",
      rating: 4.7,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400",
      amenities: ["café", "tillgänglig", "familjevänlig"],
      distance: "2 km",
      isSaved: false
    },
    {
      id: "4",
      name: "Kungsleden",
      type: "Vandringsleder",
      location: "Lappland",
      rating: 4.9,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400",
      amenities: ["familjevänlig"],
      distance: "45 km",
      isSaved: true
    },
    {
      id: "5",
      name: "Botaniska trädgården",
      type: "Botanisk trädgård",
      location: "Göteborg",
      rating: 4.5,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
      amenities: ["café", "tillgänglig"],
      distance: "5 km",
      isSaved: false
    },
    {
      id: "6",
      name: "Sarek Nationalpark",
      type: "Nationalpark",
      location: "Jokkmokk kommun, Lappland",
      rating: 4.8,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
      amenities: ["familjevänlig"],
      distance: "67 km",
      isSaved: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-glacial-fog via-white to-warm-clouds/30">
      <Header />
      <HeroSection />
      <FilterBar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-granite-ridge mb-2">
              Upptäck naturområden nära dig
            </h2>
            <p className="text-granite-ridge/70">
              Välj bland {places.length} handplockade platser
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place, index) => (
            <div 
              key={place.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PlaceCard place={place} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-spring-meadows to-spring-meadows/80 hover:from-spring-meadows/90 hover:to-spring-meadows/70 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Ladda fler platser
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
