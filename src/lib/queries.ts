import { client } from "./sanity";
import type { Post, PostCard } from "./types";

// Get all published posts for listing
export async function getAllPosts(): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug
      },
      publishedAt,
      featured,
      readingTime
    }`
  );
}

// Get featured posts
export async function getFeaturedPosts(): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug
      },
      publishedAt,
      featured,
      readingTime
    }`
  );
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await client.fetch(
    `*[_type == "post" && slug.current == $slug] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      excerpt,
      mainImage,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      categories[]->{
        _id,
        title,
        slug,
        description
      },
      tags[]->{
        _id,
        title,
        slug
      },
      publishedAt,
      featured,
      status,
      body,
      seo,
      readingTime,
      audioUrl
    }`,
    { slug }
  );
  return posts[0] || null;
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "post" && status == "published"] {
      "slug": slug.current
    }`
  );
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && status == "published" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug
      },
      publishedAt,
      featured,
      readingTime
    }`,
    { categorySlug }
  );
}

// Get related posts (same category, excluding current post)
export async function getRelatedPosts(postId: string, categoryIds: string[]): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && status == "published" && _id != $postId && count((categories[]._ref)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug
      },
      publishedAt,
      featured,
      readingTime
    }`,
    { postId, categoryIds }
  );
}

// Get latest posts (excluding a specific post)
export async function getLatestPosts(excludePostId?: string): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && status == "published" && _id != $excludePostId] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug
      },
      publishedAt,
      featured,
      readingTime
    }`,
    { excludePostId: excludePostId || "" }
  );
}

// Get all categories
export async function getAllCategories(): Promise<{ _id: string; title: string; slug: { current: string } }[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }`
  );
}

// Get posts with pagination
export async function getPostsPaginated(
  page: number = 1,
  limit: number = 9,
  categorySlug?: string
): Promise<{ posts: PostCard[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;

  const categoryFilter = categorySlug
    ? `&& $categorySlug in categories[]->slug.current`
    : "";

  const posts = await client.fetch(
    `*[_type == "post" && status == "published" ${categoryFilter}] | order(publishedAt desc) [$start...$end] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug
      },
      publishedAt,
      featured,
      readingTime
    }`,
    { start, end, categorySlug: categorySlug || "" }
  );

  const total = await client.fetch(
    `count(*[_type == "post" && status == "published" ${categoryFilter}])`,
    { categorySlug: categorySlug || "" }
  );

  return { posts, total };
}
