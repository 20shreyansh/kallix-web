"use client";

import { useState, useEffect } from "react";

interface TocSection {
  id: string;
  title: string;
  level: number;
  subsections: { id: string; title: string }[];
}

interface TableOfContentsProps {
  sections: TocSection[];
}

export function TableOfContentsClient({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  // Track which section is currently in view
  useEffect(() => {
    if (sections.length === 0) return;

    // Collect all heading IDs (both main sections and subsections)
    const allIds = sections.flatMap((section) => [
      section.id,
      ...section.subsections.map((sub) => sub.id),
    ]);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible entry
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const id = visibleEntry.target.id;
          setActiveId(id);

          // Auto-expand parent section if a subsection is active
          sections.forEach((section) => {
            if (
              section.id === id ||
              section.subsections.some((sub) => sub.id === id)
            ) {
              setExpandedSections((prev) => new Set(prev).add(section.id));
            }
          });
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    // Observe all headings
    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  // Toggle section expansion
  const toggleSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Check if a section or any of its subsections is active
  const isSectionActive = (section: TocSection) => {
    return (
      activeId === section.id ||
      section.subsections.some((sub) => sub.id === activeId)
    );
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#FCFCFC] rounded-2xl p-6 border border-[#C9C9C9]">
      <h3 className="text-xl font-medium text-black mb-6">On this page</h3>
      <nav className="space-y-3">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const isActive = isSectionActive(section);
          const hasSubsections = section.subsections.length > 0;

          return (
            <div key={section.id}>
              <div className="flex items-center justify-between w-full">
                <a
                  href={`#${section.id}`}
                  className={`flex-1 text-sm transition-colors truncate pr-2 ${
                    activeId === section.id
                      ? "text-violet-600 font-medium"
                      : isActive
                      ? "text-black font-medium"
                      : "text-black hover:text-black/70"
                  }`}
                >
                  {section.title}
                </a>
                {hasSubsections && (
                  <button
                    onClick={(e) => toggleSection(section.id, e)}
                    className="p-1 hover:bg-black/5 rounded transition-colors"
                    aria-label={
                      isExpanded ? "Collapse section" : "Expand section"
                    }
                  >
                    <svg
                      className={`w-4 h-4 text-black/60 transition-transform duration-200 ${
                        isExpanded ? "" : "-rotate-90"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {hasSubsections && isExpanded && (
                <div className="ml-4 space-y-3 my-2">
                  {section.subsections.map((sub) => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      className={`block text-xs transition-colors truncate ${
                        activeId === sub.id
                          ? "text-violet-600 font-medium"
                          : "text-black/40 hover:text-black"
                      }`}
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
