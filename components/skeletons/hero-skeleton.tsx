import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-16 w-full max-w-md mb-6" />
          <Skeleton className="h-12 w-full max-w-lg mb-8" />

          <div className="flex flex-wrap gap-3 mb-8">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <Skeleton className="w-64 h-64 md:w-80 md:h-80 rounded-full" />
        </div>
      </div>
    </div>
  )
}
