import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface GalleryModalProps {
  images: string[];
  open: boolean;
  onClose: () => void;
  hotelName: string;
}

const GalleryModal = ({ images, open, onClose, hotelName }: GalleryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <Carousel>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex aspect-square items-center justify-center p-2">
                  <img
                    src={image}
                    alt={`${hotelName} - Image ${index + 1}`}
                    className="w-full h-[60vh] object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
