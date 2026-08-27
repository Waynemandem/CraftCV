import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabaseClient';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) setError(error.message);
      else setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) return <div className="p-8">Loading…</div>;
  if (error || !post) return <div className="p-8">Post not found.</div>;

  return (
    <>
      <Helmet>
        <title>{post.title} - OrbitCV Blog</title>
        <meta name="description" content={post.meta_description} />
        <link rel="canonical" href={`https://orbitcv.vercel.app/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description} />
        <meta property="og:url" content={`https://orbitcv.vercel.app/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.published_at,
            author: { '@type': 'Organization', name: 'Axion Digital' },
          })}
        </script>
      </Helmet>
      <article className="max-w-3xl mx-auto px-4 py-12 prose">
        <Link to="/blog" className="text-sm text-gray-500">← Back to blog</Link>
        <h1>{post.title}</h1>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </>
  );
}