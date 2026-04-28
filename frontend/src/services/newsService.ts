import { blogPosts } from "../data/blogPosts";
import type { SupportedLocale } from "../i18n/types";

const MAX_ACTIVE_POSTS = 30;
const ARCHIVE_AFTER_MONTHS = 7;

export function getAllPosts() {
  return blogPosts.slice().sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

export function getFeaturedPosts(limit = 4) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function archivePolicySummary(locale: SupportedLocale) {
  return locale === "es"
    ? `Hasta ${MAX_ACTIVE_POSTS} noticias activas y depuracion sugerida despues de ${ARCHIVE_AFTER_MONTHS} meses.`
    : `Up to ${MAX_ACTIVE_POSTS} active stories with suggested cleanup after ${ARCHIVE_AFTER_MONTHS} months.`;
}
