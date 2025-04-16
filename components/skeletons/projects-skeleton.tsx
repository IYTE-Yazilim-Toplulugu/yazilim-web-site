import { Skeleton } from "@/components/ui/skeleton"

export function ProjectsSkeleton() {
  return (
    <div className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 justify-center mb-6">
            <Skeleton className="h-6 w-40" />
          </div>

          <Skeleton className="w-full aspect-[16/9] rounded-xl mb-4" variant="card" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 rounded-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-xl" variant="card" />
          ))}
        </div>
      </div>
    </div>
  )
}
