import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dq5qqux7",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-01",
  useCdn: true,
});

// For backward compatibility if needed, but we'll use sanityClient
export const client = sanityClient;

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dq5qqux7",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ Queries
export const COURSES_QUERY = `*[_type == "course" && published == true] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  "courseImageUrl": courseImage.asset->url,
  duration,
  mode,
  eligibility,
  features,
  syllabus,
  contactNumber,
  order,
  featured,
  seoTitle,
  seoDescription
}`;

export const SINGLE_COURSE_QUERY = `*[_type == "course" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  "courseImageUrl": courseImage.asset->url,
  duration,
  mode,
  eligibility,
  features,
  syllabus,
  contactNumber,
  featured,
  seoTitle,
  seoDescription
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && published == true] | order(order asc) {
  _id,
  studentName,
  "studentPhotoUrl": studentPhoto.asset->url,
  "courseTitle": course->title,
  review,
  rating,
  year,
  featured,
  order
}`;
