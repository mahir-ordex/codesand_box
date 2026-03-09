import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  path?: string;
}

export default function SEO({
  title,
  description,
  name = "JS Online Compiler",
  type = "website",
  path = "/",
}: SEOProps) {
  const keywords =
    "javascript playground, run javascript online, javascript compiler online, js editor online, javascript console online";
  const configuredUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  const fallbackUrl = typeof window !== "undefined" ? window.location.origin : "";
  const siteUrl = configuredUrl || fallbackUrl;
  const canonicalUrl = siteUrl ? `${siteUrl}${path}` : "";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      {/* Open Graph (Facebook / LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}

      {/* Twitter SEO */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}