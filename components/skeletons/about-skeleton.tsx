import { Skeleton } from "@/components/ui/skeleton"

export function AboutSkeleton() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          </div>

          <div>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" variant="text" count={4} gap={2} />
            <Skeleton className="h-4 w-full mb-6" variant="text" count={4} gap={2} />

            <div className="flex flex-wrap gap-3 mb-8">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>

            <div className="flex gap-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
