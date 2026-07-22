import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import { blogPosts as localBlogPosts } from "@/lib/blog-data";
import { sanityClient } from "@/lib/sanity";
import { SITE_CONFIG } from "@/lib/site-config";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchBlogPostData(slug: string) {
  try {
    const query = `*[_type == "post" && slug.current == $slug && published == true][0] {
      _id,
      title,
      "slug": slug.current,
      "excerpt": coalesce(excerpt, ""),
      "category": coalesce(category->title, "Education"),
      "publishedAt": coalesce(publishedAt, _createdAt),
      "author": coalesce(author->name, "Edusource HRD Centre"),
      "featuredImageUrl": featuredImage.asset->url,
      body,
      seoTitle,
      seoDescription
    }`;
    const sanityPost = await sanityClient.fetch(query, { slug });
    if (sanityPost) {
      return {
        ...sanityPost,
        id: sanityPost._id,
        date: sanityPost.publishedAt,
        isSanity: true,
      };
    }
  } catch (error) {
    // Fallback to local
  }

  const localPost = localBlogPosts.find((p) => p.slug === slug);
  if (localPost) {
    return {
      ...localPost,
      featuredImageUrl: localPost.image,
      featuredImageAlt: localPost.title,
      body: null,
    };
  }

  return null;
}

export async function generateStaticParams() {
  const localParams = localBlogPosts.map((p) => ({ slug: p.slug }));

  try {
    const query = `*[_type == "post" && published == true && defined(slug.current)] { "slug": slug.current }`;
    const sanityPosts = await sanityClient.fetch<{ slug: string }[]>(query);
    const sanityParams = (sanityPosts || []).map((p) => ({ slug: p.slug }));

    const slugSet = new Set(localParams.map((p) => p.slug));
    for (const p of sanityParams) {
      if (!slugSet.has(p.slug)) {
        localParams.push(p);
      }
    }
  } catch (error) {
    // Ignore build time error
  }

  return localParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostData(slug);

  if (!post) {
    return {
      title: "Article Not Found | Edusource HRD Centre",
    };
  }

  const title = post.seoTitle || `${post.title} | Edusource HRD Centre`;
  const description =
    post.seoDescription ||
    post.excerpt ||
    `Read ${post.title} on the Edusource HRD Centre knowledge hub.`;
  const canonicalUrl = `${SITE_CONFIG.url}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_IN",
      type: "article",
      publishedTime: post.date,
      authors: [post.author || SITE_CONFIG.name],
      images: [
        {
          url: post.featuredImageUrl || SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.featuredImageUrl || SITE_CONFIG.ogImage],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostData(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${slug}` },
  ]);

  const articleSchema = getArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    author: post.author,
    image: post.featuredImageUrl,
  });

  return (
    <>
      <JsonLdScript data={[breadcrumbSchema, articleSchema]} />
      <BlogDetailClient slug={slug} initialPost={post} />
    </>
  );
}
