import { Skeleton } from "@/components/ui/skeleton"

export function CaseStudiesSkeleton() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="space-y-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-80 rounded-xl" variant="card" />
          ))}
        </div>
      </div>
    </div>
  )
}
