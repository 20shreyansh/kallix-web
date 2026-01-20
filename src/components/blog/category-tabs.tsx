"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

interface CategoryTabsProps {
  categories: Category[];
}

export function CategoryTabs({ categories }: CategoryTabsProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const tabs = [
    { slug: "all", title: "All" },
    ...categories.map((cat) => ({
      slug: cat.slug.current,
      title: cat.title,
    })),
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {tabs.map((tab) => {
        const isActive = tab.slug === activeCategory;
        return (
          <Link
            key={tab.slug}
            href={tab.slug === "all" ? "/blog" : `/blog?category=${tab.slug}`}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              isActive ? "text-violet-600" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.title}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
