import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const PoetryLoading = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-12 animate-fade-in">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Filter Skeleton */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 animate-fade-in">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-9 w-24" />
          ))}
        </div>

        {/* Poem Cards Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardContent className="p-8">
                <Skeleton className="h-6 w-20 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
