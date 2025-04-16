import { Skeleton } from "@/components/ui/skeleton"

export function SkillsSkeleton() {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 rounded-full" />
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <Skeleton className="h-10 w-64 rounded-full" />
        </div>

        <Skeleton className="w-full h-[500px] rounded-xl" variant="card" />

        <div className="mt-12 text-center">
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" variant="text" count={2} gap={2} />
        </div>
      </div>
    </div>
  )
}
