"use client";

export function BlogCardSkeleton() {
  return (
    <div className="border-l border-b last:border-r border-gray-100 pb-12 animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-4 mb-4">
        <div className="aspect-[16/10] rounded-2xl bg-gray-200" />
      </div>

      {/* Category skeleton */}
      <div className="px-4 mb-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>

      {/* Title skeleton */}
      <div className="px-4 mb-3 space-y-2">
        <div className="h-5 w-full bg-gray-200 rounded" />
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
      </div>

      {/* Meta skeleton */}
      <div className="px-4">
        <div className="h-3 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <>
      <div className="h-px w-full bg-gray-100" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
      <div className="h-px w-full bg-gray-100" />
    </>
  );
}
