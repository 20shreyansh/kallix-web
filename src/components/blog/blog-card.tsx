import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { PostCard as PostCardType } from "@/lib/types";

function formatDate(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

interface BlogCardProps {
  post: PostCardType;
}

export function BlogCard({ post }: BlogCardProps) {
  const category = post.categories?.[0];

  return (
    <div className="border-l border-b last:border-r border-gray-100 pb-12">
      <Link href={`/blog/${post.slug.current}`} className="group block">
        {/* Image */}
        <div className="bg-gradient-to-br from-violet-100 to-violet-50 p-4 mb-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(600).height(375).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center">
                <span className="text-violet-300 text-4xl">📝</span>
              </div>
            )}
          </div>
        </div>

        {/* Category */}
        {category && (
          <span className="text-sm font-medium text-violet-500 mb-3 block px-4">
            {category.title}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors mb-3 line-clamp-2 px-4">
          {post.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-400 tracking-wide px-4">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          {post.readingTime && (
            <>
              <span>|</span>
              <span>{post.readingTime} MINUTE READ</span>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
