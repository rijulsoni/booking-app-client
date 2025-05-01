import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store/store"
import { fetchFeaturedHotels } from "@/redux/slices/featuredHotelSlice"
import HotelCard from "./HotelCard"
import { Skeleton } from "@/components/ui/skeleton"

const FeaturedSection = () => {
  const [showAll, setShowAll] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { featuredHotels, loading, error } = useSelector((state: RootState) => state.featuredHotels)

  const displayHotels = showAll ? featuredHotels : featuredHotels.slice(0, 3)

  useEffect(() => {
    dispatch(fetchFeaturedHotels()) 
  }, [dispatch])

  const renderSkeletons = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      >
        <Skeleton className="h-48 w-full" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-hotel-blue">
            Featured Properties
          </h2>
          {!loading && featuredHotels?.length > 3 && (
            <Button
              variant="link"
              className="text-hotel-blue flex items-center"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All"}{" "}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium mb-4">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? renderSkeletons()
            : displayHotels.map((hotel) => (
                <HotelCard key={hotel._id} {...hotel} />
              ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
