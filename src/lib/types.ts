import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface Author {
    _id: string;
    name: string;
    slug: { current: string };
    image?: SanityImage;
    bio?: PortableTextBlock[];
}

export interface Category {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
}

export interface Tag {
    _id: string;
    title: string;
    slug: { current: string };
}

export interface SEO {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
}

export interface Post {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: SanityImage;
    author: Author;
    categories?: Category[];
    tags?: Tag[];
    publishedAt: string;
    featured: boolean;
    status: "draft" | "published" | "archived";
    body: PortableTextBlock[];
    seo?: SEO;
    readingTime?: number;
    audioUrl?: string;
}

export interface PostCard {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: SanityImage;
    author: {
        name: string;
        image?: SanityImage;
    };
    categories?: { title: string; slug: { current: string } }[];
    publishedAt: string;
    featured: boolean;
    readingTime?: number;
}
