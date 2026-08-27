import { Helmet } from 'react-helmet-async';

function BlogPost({ post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} - OrbitCV Blog</title>
        <meta name="description" content={post.meta_description} />
        <link rel="canonical" href={`https://orbitcv.vercel.app/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description} />
        <meta property="og:url" content={`https://orbitcv.vercel.app/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.published_at,
          })}
        </script>
      </Helmet>
      {/* render post.content as markdown */}
    </>
  );
}

export default BlogPost;