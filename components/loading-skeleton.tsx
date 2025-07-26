import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductSkeleton() {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <Skeleton className="w-full h-48 mb-4 rounded-lg" />
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-20" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export function HeroSkeleton() {
  return (
    <div className="py-24 lg:py-32 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="w-12 h-12 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="aspect-square rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

export function CategorySkeleton() {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6 text-center">
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
        <Skeleton className="h-4 w-20 mx-auto" />
      </CardContent>
    </Card>
  )
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <Skeleton className={className} />
}
