/* eslint-disable @next/next/no-img-element -- local editorial assets preserve the current site image treatment */
import Link from "next/link";
import type { GuideArticle } from "./data";

export function GuideMetadata({ article, compact = false }: { article: GuideArticle; compact?: boolean }) {
  return (
    <div className={`guide-metadata${compact ? " guide-metadata--compact" : ""}`} aria-label="Article details">
      <span>{article.category}</span>
      <time dateTime={article.dateISO}>{article.date}</time>
      <span>{article.readingTime}</span>
    </div>
  );
}

export function GuideCard({ article }: { article: GuideArticle }) {
  return (
    <article className="guide-card">
      <Link className="guide-card-image" href={`/guide/${article.slug}`} aria-label={`Read ${article.title}`}>
        <img src={article.featuredImage} alt={article.imageAlt} width="1200" height="820" loading="lazy" style={{ objectPosition: article.imagePosition }} />
      </Link>
      <GuideMetadata article={article} compact />
      <h2 className="type-card-title"><Link href={`/guide/${article.slug}`}>{article.title}</Link></h2>
    </article>
  );
}

export function FeaturedGuideCard({ article }: { article: GuideArticle }) {
  return (
    <article className="featured-guide-card">
      <Link className="featured-guide-image" href={`/guide/${article.slug}`} aria-label={`Read ${article.title}`}>
        <img src={article.featuredImage} alt={article.imageAlt} width="1600" height="1050" fetchPriority="high" style={{ objectPosition: article.imagePosition }} />
      </Link>
      <div className="featured-guide-copy">
        <GuideMetadata article={article} compact />
        <h2><Link href={`/guide/${article.slug}`}>{article.title}</Link></h2>
        <p className="type-body">{article.excerpt}</p>
      </div>
    </article>
  );
}

export function GuideHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="guide-page-heading inner-content">
      <p className="guide-eyebrow type-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <div className="guide-heading-row">
        <h1 className="type-page-title">{title}</h1>
        <p className="type-body">{description}</p>
      </div>
    </header>
  );
}

export function RelatedGuides({ articles }: { articles: GuideArticle[] }) {
  return (
    <section className="related-guides inner-content" aria-labelledby="related-guides-title">
      <div className="related-guides-heading">
        <p className="guide-eyebrow type-eyebrow"><span aria-hidden="true" />Keep planning</p>
        <h2 className="type-section-title" id="related-guides-title">Related Guides</h2>
      </div>
      <div className="guide-grid">
        {articles.map((article) => <GuideCard article={article} key={article.slug} />)}
      </div>
    </section>
  );
}
