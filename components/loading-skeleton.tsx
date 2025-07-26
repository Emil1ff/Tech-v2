import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Skeleton className="w-full h-64" />
          <div className="absolute top-3 left-3">
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <div className="absolute top-3 right-3">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CategorySkeleton() {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
        <Skeleton className="h-5 w-24 mx-auto mb-2" />
        <Skeleton className="h-4 w-16 mx-auto" />
      </CardContent>
    </Card>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
