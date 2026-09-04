/* eslint-disable @next/next/no-img-element -- local editorial assets preserve the current site image treatment */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerHeader from "../../components/InnerHeader";
import { GuideMetadata, RelatedGuides } from "../GuideComponents";
import { getGuideBySlug, guideArticles } from "../data";
import "../guide.css";

const origin = "https://go-florida.hocainsali.chatgpt.site";

type PageProps = { params: Promise<{ slug: string }> };

function renderParagraph(block: Extract<(typeof guideArticles)[number]["content"][number], { type: "paragraph" }>, index: number) {
  if (!block.segments) return <p key={index}>{block.text}</p>;
  return (
    <p key={index}>
      {block.segments.map((segment, segmentIndex) => {
        const content = segment.bold ? <strong>{segment.text}</strong> : segment.text;
        return segment.href
          ? <Link href={segment.href} key={segmentIndex}>{content}</Link>
          : <span key={segmentIndex}>{content}</span>;
      })}
    </p>
  );
}

export function generateStaticParams() {
  return guideArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideBySlug(slug);
  if (!article) return {};
  const url = `${origin}/guide/${article.slug}`;
  const image = `${origin}${article.featuredImage}`;
  return {
    title: `${article.title} | Go Florida Guide`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.excerpt, type: "article", url, publishedTime: article.dateISO, images: [{ url: image, width: 1600, height: 1050, alt: article.imageAlt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [image] },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getGuideBySlug(slug);
  if (!article) notFound();
  const related = guideArticles.filter((item) => item.slug !== article.slug).slice(0, 3);
  const articleUrl = `${origin}/guide/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${origin}${article.featuredImage}`,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: { "@type": "Organization", name: article.author.name, url: origin },
    publisher: { "@type": "Organization", name: "Go Florida Guide", url: origin },
    mainEntityOfPage: articleUrl,
  };

  return (
    <main className="guide-detail-page inner-page" id="top">
      <InnerHeader activePage="guide" />
      <article>
        <header className="article-header inner-content">
          <Link className="article-back" href="/guide">← Back to Guide</Link>
          <div className="article-heading-grid">
            <div>
              <p className="guide-eyebrow type-eyebrow"><span aria-hidden="true" />{article.category}</p>
              <h1 className="type-page-title">{article.title}</h1>
              <p className="article-excerpt">{article.excerpt}</p>
            </div>
            <GuideMetadata article={article} />
          </div>
        </header>

        <figure className="article-hero inner-content">
          <img src={article.featuredImage} alt={article.imageAlt} width="1920" height="1120" fetchPriority="high" style={{ objectPosition: article.imagePosition }} />
        </figure>

        <div className="article-layout inner-content">
          <div className="article-body">
            {article.content.map((block, index) => {
              if (block.type === "heading2") return <h2 key={index}>{block.text}</h2>;
              if (block.type === "heading3") return <h3 key={index}>{block.text}</h3>;
              if (block.type === "paragraph") return renderParagraph(block, index);
              if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
              if (block.type === "quote") return <blockquote key={index}>{block.text}</blockquote>;
              return <figure className="article-inline-image" key={index}><img src={block.src} alt={block.alt} width="1400" height="920" loading="lazy" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
            })}
          </div>
          <aside className="article-author" aria-label="About the author">
            <p className="guide-eyebrow">Author</p>
            <h2>{article.author.name}</h2>
            <p>{article.author.role}</p>
            <p>{article.author.bio}</p>
            <div className="article-share" aria-label="Share this guide">
              <span>Share</span>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">FB</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">IN</a>
            </div>
          </aside>
        </div>
      </article>

      <RelatedGuides articles={related} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </main>
  );
}
