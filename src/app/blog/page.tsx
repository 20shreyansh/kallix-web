import { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts, getAllCategories } from "@/lib/queries";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogGridSkeleton } from "@/components/blog/blog-skeleton";
import { CategoryTabs } from "@/components/blog/category-tabs";
import { Pagination } from "@/components/blog/pagination";
import { NewsletterSection } from "@/components/blog/newsletter-section";
import { TopBanner } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Blog | Kallix",
  description:
    "Insights, guides, and updates on AI voice agents, automation, and the future of customer communication.",
};

const POSTS_PER_PAGE = 9;

async function BlogContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const currentPage = parseInt(params.page || "1", 10);

  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  // Filter posts by category
  const filteredPosts = category
    ? allPosts.filter((post) =>
        post.categories?.some((cat) => cat.slug.current === category)
      )
    : allPosts;

  // Paginate
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <>
      {/* Blog Container with Border */}
      <section className="pb-16">
        <div className="">
          {/* Category Tabs */}
          <div className="mb-8 max-w-6xl mx-auto">
            <Suspense fallback={<div className="h-10" />}>
              <CategoryTabs categories={categories} />
            </Suspense>
          </div>

          {/* Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <>
              <div className="h-px w-full bg-gray-100" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
              <div className="h-px w-full bg-gray-100" />
              {/* Pagination */}
              <Suspense fallback={null}>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </Suspense>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-500">Check back soon for new articles!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <SiteHeader />
      <main className="min-h-screen pt-48">
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogContent searchParams={searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
