import { Skeleton } from "@/components/ui/skeleton"

export function ExperienceSkeleton() {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-40 rounded-full" />
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-64 rounded-xl" variant="card" />
          ))}
        </div>
      </div>
    </div>
  )
}
