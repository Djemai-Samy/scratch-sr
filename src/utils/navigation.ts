export const convertSlug = (slug: string) => slug.replace(/\/{(.+?)}$/, "/:$1"); // Convert /{slug} to /:slug
