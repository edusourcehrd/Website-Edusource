import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";
import { courses as localCourses } from "@/lib/courses-data";
import { sanityClient, SINGLE_COURSE_QUERY, COURSES_QUERY } from "@/lib/sanity";
import { SITE_CONFIG } from "@/lib/site-config";
import { getBreadcrumbSchema, getCourseSchema, getFAQSchema } from "@/lib/jsonld";
import JsonLdScript from "@/components/seo/JsonLdScript";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchCourseData(slug: string) {
  try {
    const sanityCourse = await sanityClient.fetch(SINGLE_COURSE_QUERY, { slug });
    if (sanityCourse) {
      return {
        ...sanityCourse,
        isSanity: true,
        visualTheme: {
          gradient: "from-blue-600 to-indigo-700",
          secondaryGradient: "from-blue-50 to-white",
        },
      };
    }
  } catch {
    // Fallback to local
  }

  const localCourse = localCourses.find((c) => c.slug === slug);
  if (localCourse) {
    // Exclude React component function (icon) so it can cross RSC boundary safely
    const { icon: _icon, ...courseWithoutIcon } = localCourse;
    return courseWithoutIcon;
  }

  return null;
}

export async function generateStaticParams() {
  const localParams = localCourses.map((c) => ({ slug: c.slug }));

  try {
    const sanityCourses = await sanityClient.fetch(COURSES_QUERY);
    const sanityParams = (sanityCourses || [])
      .filter((c: Record<string, unknown>) => Boolean(c.slug))
      .map((c: Record<string, unknown>) => ({ slug: String(c.slug) }));

    const slugSet = new Set(localParams.map((p) => p.slug));
    for (const p of sanityParams) {
      if (!slugSet.has(p.slug)) {
        localParams.push(p);
      }
    }
  } catch {
    // Ignore error in build fallback
  }

  return localParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourseData(slug);

  if (!course) {
    return {
      title: "Course Not Found | Edusource HRD Centre",
    };
  }

  const title = `${course.title} | Edusource HRD Centre Kollam`;
  const description =
    course.shortDescription ||
    `Enroll in ${course.title} at Edusource HRD Centre, Kollam. Government-approved diploma with hands-on skill training.`;
  const canonicalUrl = `${SITE_CONFIG.url}/courses/${slug}`;

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
      images: [
        {
          url: course.courseImageUrl || SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [course.courseImageUrl || SITE_CONFIG.ogImage],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await fetchCourseData(slug);

  if (!course) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Courses", item: "/courses" },
    { name: course.title, item: `/courses/${slug}` },
  ]);

  const courseSchemas = getCourseSchema({
    title: course.title,
    description: course.shortDescription || course.fullDescription || course.title,
    slug,
    duration: course.duration,
    category: course.category,
    certification: course.certification,
    careerFocus: course.careerFocus,
    learningMode: course.learningMode || course.mode,
    courseImageUrl: course.courseImageUrl,
  });

  const faqSchema = course.faqs ? getFAQSchema(course.faqs) : null;

  return (
    <>
      <JsonLdScript data={[breadcrumbSchema, ...courseSchemas, faqSchema]} />
      <CourseDetailClient slug={slug} initialCourse={course} />
    </>
  );
}
