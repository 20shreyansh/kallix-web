import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import type { PostCard } from "@/lib/types";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TableOfContentsClient } from "@/components/blog/table-of-contents";
import { AudioPlayer } from "@/components/blog/audio-player";
import { NewsletterSection } from "@/components/blog/newsletter-section";
import { TopBanner } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Kallix" };
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | Kallix Blog`,
    description: post.seo?.metaDescription || post.excerpt || "",
    keywords: post.seo?.keywords?.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.mainImage
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Extract plain text from Portable Text blocks for TTS
function extractPlainText(body: unknown[]): string {
  if (!body || !Array.isArray(body)) return "";

  return body
    .map((block) => {
      if (
        block &&
        typeof block === "object" &&
        "_type" in block &&
        block._type === "block"
      ) {
        const typedBlock = block as { children?: { text?: string }[] };
        return (
          typedBlock.children?.map((child) => child.text || "").join("") || ""
        );
      }
      return "";
    })
    .filter(Boolean)
    .join(". ");
}

// Helper function to extract headings from Portable Text body
interface TocSection {
  id: string;
  title: string;
  level: number;
  subsections: { id: string; title: string }[];
}

function extractHeadings(body: unknown[]): TocSection[] {
  if (!body || !Array.isArray(body)) return [];

  const sections: TocSection[] = [];
  let currentSection: TocSection | null = null;

  body.forEach((block) => {
    if (
      block &&
      typeof block === "object" &&
      "_type" in block &&
      block._type === "block"
    ) {
      const typedBlock = block as {
        style?: string;
        children?: { text?: string }[];
      };
      const style = typedBlock.style;
      const text =
        typedBlock.children?.map((child) => child.text || "").join("") || "";

      if (!text.trim()) return;

      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      if (style === "h2") {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          id,
          title: text,
          level: 2,
          subsections: [],
        };
      } else if (style === "h3" && currentSection) {
        currentSection.subsections.push({ id, title: text });
      } else if (style === "h3" && !currentSection) {
        // h3 without a parent h2, make it a top-level section
        sections.push({
          id,
          title: text,
          level: 3,
          subsections: [],
        });
      }
    }
  });

  // Don't forget the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

// Table of contents for sidebar
function TableOfContents({ body }: { body: unknown[] }) {
  const sections = extractHeadings(body);
  return <TableOfContentsClient sections={sections} />;
}

// Newsletter signup component
function NewsletterSignup() {
  return (
    <div className="bg-gradient-to-b from-violet-400 via-violet-300 to-violet-100 rounded-3xl p-6">
      <h3 className="font-semibold text-xl text-white mb-3">
        Don&apos;t miss what&apos;s next in AI.
      </h3>
      <p className="text-sm text-white mb-8 leading-relaxed">
        Subscribe for product updates, experiments, &amp; success stories from
        the Kallix team.
      </p>
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Enter your mail address"
            className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-black/40 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-medium text-sm rounded-full hover:bg-black/90 transition-colors tracking-wide"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

// Portable Text components for rich text rendering
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog image"}
            width={1200}
            height={675}
            className="rounded-xl w-full"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-black/50">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 text-black">{children}</h1>
    ),
    h2: ({ children, value }) => {
      const text =
        (value?.children as unknown as { text?: string }[] | undefined)
          ?.map((child) => child.text || "")
          .join("") || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h2
          id={id}
          className="text-2xl font-bold mt-8 mb-4 text-black scroll-mt-32"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text =
        (value?.children as unknown as { text?: string }[] | undefined)
          ?.map((child) => child.text || "")
          .join("") || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3
          id={id}
          className="text-xl font-semibold mt-6 mb-3 text-black scroll-mt-32"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-5 mb-2 text-black">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base text-black/70 leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-violet-500 pl-5 my-6 text-lg italic text-black/60">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-violet-600 hover:text-violet-700 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-black/5 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-5 text-base text-black/70">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-base text-black/70">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

// Format date for Explore articles section (e.g., "18 JUL 2025")
function formatDateShort(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

function ExploreArticleCard({ post }: { post: PostCard }) {
  const category = post.categories?.[0];

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(600).height(450).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center">
            <span className="text-violet-300 text-5xl">📝</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {category && (
          <span className="text-sm font-medium text-violet-600">
            {category.title}
          </span>
        )}
        <h3 className="text-lg font-semibold text-black group-hover:text-violet-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-black/40">
          {formatDateShort(post.publishedAt)}
          {post.readingTime && ` | ${post.readingTime} MINUTE READ`}
        </p>
      </div>
    </Link>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryIds = post.categories?.map((c) => c._id) || [];
  const relatedPosts =
    categoryIds.length > 0 ? await getRelatedPosts(post._id, categoryIds) : [];

  return (
    <div className="min-h-screen">
      <TopBanner />
      <SiteHeader />
      <main className="min-h-screen">
        {/* Main content area */}
        <div className="px-4 pb-16 pt-48">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-20">
              {/* Left Sidebar */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-32 space-y-6">
                  <TableOfContents body={post.body} />
                  <NewsletterSignup />
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-black border border-black rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      BLOGS
                    </Link>
                    {post.categories &&
                      post.categories.length > 0 &&
                      post.categories.map((cat) => (
                        <span
                          key={cat._id}
                          className="px-3 py-1 text-xs font-medium text-black bg-black/5 rounded-full"
                        >
                          {cat.title.toUpperCase()}
                        </span>
                      ))}
                  </div>
                  <ShareButtons title={post.title} slug={post.slug.current} />
                </div>

                {/* Meta info */}
                <div className="text-sm text-black/50 mb-4">
                  Last updated {formatDate(post.publishedAt)}
                  {post.readingTime &&
                    ` • ${post.readingTime} minutes reading time`}
                </div>

                {/* Author info */}
                {post.author && (
                  <div className="flex items-center gap-2 mb-8">
                    {post.author.image && (
                      <Image
                        src={urlFor(post.author.image)
                          .width(48)
                          .height(48)
                          .url()}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm text-black/70">
                      {post.author.name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-semibold text-black leading-[3.6rem]">
                  {post.title}
                </h1>

                {/* Featured Image */}
                {post.mainImage && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden my-12 shadow-lg">
                    <Image
                      src={urlFor(post.mainImage).width(1200).height(675).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Audio Player */}
                <div className="mb-8">
                  <AudioPlayer
                    title={post.title}
                    authorName={post.author?.name || "Kallix"}
                    blogContent={extractPlainText(post.body)}
                  />
                </div>

                {/* Article Content */}
                <article className="bg-white rounded-2xl border border-black/5 p-8 md:p-12">
                  <PortableText
                    value={post.body}
                    components={portableTextComponents}
                  />
                </article>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="text-sm text-black/60 bg-white border border-black/10 px-3 py-1 rounded-full"
                      >
                        #{tag.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-4 bg-white border-t border-black/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-medium text-black mb-12">
                Explore articles by
                <br />
                the Kallix team
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((rPost) => (
                  <ExploreArticleCard key={rPost._id} post={rPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  );
}
