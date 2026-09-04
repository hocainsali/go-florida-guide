"use client";

import { useState } from "react";
import { FeaturedGuideCard, GuideCard, GuideHeader } from "./GuideComponents";
import { guideArticles } from "./data";

const filters = [
  { label: "All guides", slugs: [] },
  { label: "Theme parks", slugs: ["beat-the-florida-heat-with-young-kids", "theme-park-day-packing-list"] },
  { label: "Planning", slugs: ["booking-flights-from-the-uk", "realistic-florida-family-budget", "orlando-villa-or-hotel"] },
  { label: "Beaches", slugs: ["florida-beyond-the-theme-parks", "first-time-miami-with-family"] },
  { label: "Road trips", slugs: ["florida-keys-family-road-trip"] },
] as const;

export default function GuideListingContent() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["label"]>("All guides");
  const selectedFilter = filters.find((filter) => filter.label === activeFilter) ?? filters[0];
  const isShowingAll = activeFilter === "All guides";
  const filteredArticles = isShowingAll
    ? guideArticles
    : guideArticles.filter((article) => (selectedFilter.slugs as readonly string[]).includes(article.slug));
  const featured = isShowingAll ? guideArticles.slice(0, 2) : [];
  const listed = isShowingAll ? guideArticles.slice(2) : filteredArticles;

  return (
    <>
      <GuideHeader eyebrow="Plan with confidence" description="Straightforward Florida advice made for UK families—from the first booking decision to the days you will remember most.">
        <div className="guide-filters" aria-label="Filter guides by category" role="group">
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter.label}
              className={activeFilter === filter.label ? "is-active" : ""}
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </GuideHeader>

      {featured.length > 0 && (
        <section className="featured-guides inner-content" aria-labelledby="featured-guides-title">
          <div className="guide-section-heading">
            <h2 className="type-section-title guide-section-title--flush" id="featured-guides-title">Featured Guides</h2>
          </div>
          <div className="featured-guides-grid">
            {featured.map((article) => <FeaturedGuideCard article={article} key={article.slug} />)}
          </div>
        </section>
      )}

      <section className="all-guides inner-content" id="guide-list" aria-labelledby="all-guides-title" aria-live="polite">
        <div className="guide-section-heading guide-section-heading--row">
          <div>
            <p className="guide-eyebrow type-eyebrow"><span aria-hidden="true" />Explore Florida</p>
            <h2 className="type-section-title" id="all-guides-title">{isShowingAll ? "Latest Guides" : `${activeFilter} Guides`}</h2>
          </div>
          <p className="type-body">
            {isShowingAll
              ? "Useful answers for every stage of your Florida holiday."
              : `${listed.length} ${listed.length === 1 ? "guide" : "guides"} selected for ${activeFilter.toLowerCase()}.`}
          </p>
        </div>
        <div className="guide-grid" key={activeFilter}>
          {listed.map((article) => <GuideCard article={article} key={article.slug} />)}
        </div>
      </section>
    </>
  );
}
