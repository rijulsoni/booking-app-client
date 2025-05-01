import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";
import GalleryModal from "@/components/GalleryModal";
import { useState } from "react";

const HotelGallery = ({ hotel }: { hotel: any }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative">
      <div className="md:col-span-2 row-span-2">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover rounded-lg"
          style={{ height: "500px" }}
        />
      </div>
      {hotel.gallery_images?.slice(0, 4).map((img: string, i: number) => (
        <img
          key={i}
          src={img}
          alt={`Gallery image ${i}`}
          className="w-full h-full object-cover rounded-lg"
          style={{ height: "240px" }}
        />
      ))}
      {hotel.gallery_images?.length > 4 && (
        <Button
          className="absolute bottom-12 right-4 bg-white text-hotel-blue hover:bg-gray-100"
          onClick={() => setIsGalleryOpen(true)}
        >
          <Images className="mr-2 h-4 w-4" />
          View All Photos ({hotel.gallery_images.length + 1})
        </Button>
      )}
      {hotel.gallery_images?.length > 1 && (
        <GalleryModal
          images={[hotel.image, ...hotel.gallery_images]}
          open={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          hotelName={hotel.name}
        />
      )}
    </div>
  );
};

export default HotelGallery;
