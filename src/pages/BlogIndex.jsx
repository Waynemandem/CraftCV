import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabaseClient'; // adjust to your actual client path

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, title, meta_description, published_at')
        .order('published_at', { ascending: false });

      if (error) setError(error.message);
      else setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) return <div className="p-8">Loading posts…</div>;
  if (error) return <div className="p-8">Couldn't load posts: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Blog - OrbitCV</title>
        <meta name="description" content="CV and job-search tips for Nigerian and African job seekers." />
        <link rel="canonical" href="https://orbitcv.vercel.app/blog" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">OrbitCV Blog</h1>
        {posts.length === 0 && <p>No posts yet.</p>}
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="text-xl font-semibold hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-600">{post.meta_description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}