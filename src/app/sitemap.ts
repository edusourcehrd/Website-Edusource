import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { sanityClient } from "@/lib/sanity";

const SITE_URL = "https://edusourcehrd.vercel.app";

export const revalidate = 3600;

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

type StaticRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

type SanityBlogPost = {
  slug?: string | null;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  publishedAt?: string | null;
};

const staticRoutes: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/courses", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.75 },
  { path: "/admission", changeFrequency: "monthly", priority: 0.85 },
  {
    path: "/courses/hospital-administration",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/courses/german-language-training",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/courses/hr-management",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/courses/medical-coding",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/courses/logistics-shipping-management",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/courses/medical-transcription",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/courses/ai-digital-marketing",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.25 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.25 },
];

function createUrl(path: string) {
  return `${SITE_URL}${path}`;
}

function toValidDate(value: string | null | undefined, fallbackDate: Date) {
  if (!value) {
    return fallbackDate;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallbackDate : date;
}

function normalizeSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

async function getSanityBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    return await sanityClient.fetch<SanityBlogPost[]>(
      `*[_type == "post" && published == true && defined(slug.current)] {
        "slug": slug.current,
        _createdAt,
        _updatedAt,
        publishedAt
      }`,
      {},
      { next: { revalidate } },
    );
  } catch (error) {
    console.error("Failed to fetch Sanity blog posts for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: createUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogUrlMap = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const post of blogPosts) {
    const slug = normalizeSlug(post.slug);

    if (!slug) {
      continue;
    }

    blogUrlMap.set(slug, {
      url: createUrl(`/blog/${slug}`),
      lastModified: toValidDate(post.date, lastModified),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  const sanityBlogPosts = await getSanityBlogPosts();

  for (const post of sanityBlogPosts) {
    if (!post.slug) {
      continue;
    }

    const slug = normalizeSlug(post.slug);

    if (!slug) {
      continue;
    }

    blogUrlMap.set(slug, {
      url: createUrl(`/blog/${slug}`),
      lastModified: toValidDate(
        post._updatedAt ?? post.publishedAt ?? post._createdAt,
        lastModified,
      ),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return [...staticUrls, ...blogUrlMap.values()];
}
