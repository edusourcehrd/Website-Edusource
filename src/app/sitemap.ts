import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { courses } from "@/lib/courses-data";
import { sanityClient } from "@/lib/sanity";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3600; // Revalidate sitemap every hour

type SanityItem = {
  slug?: string | null;
  _createdAt?: string | null;
  _updatedAt?: string | null;
  publishedAt?: string | null;
};

// Distinct fallback dates to prevent identical lastModified timestamps across sitemap
const STATIC_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-05-18T00:00:00.000Z",
  "/courses": "2026-05-15T00:00:00.000Z",
  "/blog": "2026-05-15T00:00:00.000Z",
  "/admission": "2026-05-10T00:00:00.000Z",
  "/privacy-policy": "2026-05-18T00:00:00.000Z",
  "/terms-of-service": "2026-05-18T00:00:00.000Z",
};

function parseDate(dateStr?: string | null, fallback: Date = new Date("2026-05-01")): Date {
  if (!dateStr) return fallback;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? fallback : parsed;
}

function normalizeSlug(slug: string): string {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

async function getSanityCourses(): Promise<SanityItem[]> {
  try {
    return await sanityClient.fetch<SanityItem[]>(
      `*[_type == "course" && defined(slug.current)] {
        "slug": slug.current,
        _createdAt,
        _updatedAt
      }`,
      {},
      { next: { revalidate } }
    );
  } catch (error) {
    console.error("Failed to fetch Sanity courses for sitemap:", error);
    return [];
  }
}

async function getSanityBlogPosts(): Promise<SanityItem[]> {
  try {
    return await sanityClient.fetch<SanityItem[]>(
      `*[_type == "post" && published == true && defined(slug.current)] {
        "slug": slug.current,
        _createdAt,
        _updatedAt,
        publishedAt
      }`,
      {},
      { next: { revalidate } }
    );
  } catch (error) {
    console.error("Failed to fetch Sanity blog posts for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // 1. Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(STATIC_LAST_MODIFIED["/"]),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(STATIC_LAST_MODIFIED["/courses"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(STATIC_LAST_MODIFIED["/blog"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission`,
      lastModified: new Date(STATIC_LAST_MODIFIED["/admission"]),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(STATIC_LAST_MODIFIED["/privacy-policy"]),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(STATIC_LAST_MODIFIED["/terms-of-service"]),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Dynamic Course Pages
  const courseMap = new Map<string, MetadataRoute.Sitemap[number]>();

  // Local Courses
  for (const course of courses) {
    const slug = normalizeSlug(course.slug);
    if (!slug) continue;

    courseMap.set(slug, {
      url: `${baseUrl}/courses/${slug}`,
      lastModified: new Date("2026-05-15T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  // Sanity Courses (overrides or adds to courseMap)
  const sanityCourses = await getSanityCourses();
  for (const course of sanityCourses) {
    if (!course.slug) continue;
    const slug = normalizeSlug(course.slug);
    if (!slug) continue;

    courseMap.set(slug, {
      url: `${baseUrl}/courses/${slug}`,
      lastModified: parseDate(course._updatedAt || course._createdAt, new Date("2026-05-15")),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  // 3. Dynamic Blog Post Pages
  const blogMap = new Map<string, MetadataRoute.Sitemap[number]>();

  // Local Blog Posts
  for (const post of blogPosts) {
    const slug = normalizeSlug(post.slug);
    if (!slug) continue;

    blogMap.set(slug, {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: parseDate(post.date, new Date("2026-05-12")),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Sanity Blog Posts
  const sanityPosts = await getSanityBlogPosts();
  for (const post of sanityPosts) {
    if (!post.slug) continue;
    const slug = normalizeSlug(post.slug);
    if (!slug) continue;

    blogMap.set(slug, {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: parseDate(
        post._updatedAt || post.publishedAt || post._createdAt,
        new Date("2026-05-12")
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return [...staticEntries, ...courseMap.values(), ...blogMap.values()];
}
