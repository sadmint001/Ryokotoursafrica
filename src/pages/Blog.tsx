import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';

const Blog = () => {
  useEffect(() => {
    // Title tag
    document.title = 'Blog | Ryoko Africa Tours';

    // Meta description
    const ensureMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    ensureMeta('description', 'Safari stories, travel tips, and photography advice for Kenya.');

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/blog`);

    // Structured data (JSON-LD)
    const ldId = 'ld-blog';
    let scriptEl = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = ldId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Ryoko Africa Tours Blog',
      url: `${window.location.origin}/blog`,
      description: 'Safari stories, travel tips, and photography advice for Kenya.'
    };
    scriptEl.textContent = JSON.stringify(jsonLd);

    return () => {
      // Optional cleanup of JSON-LD when navigating away
      const node = document.getElementById(ldId);
      if (node) node.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/10">
      <Navbar />
      <header className="container mx-auto px-4 pt-24 md:pt-28 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">
          Blog: Safari Travel Tips & Stories
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          Get inspired with articles on wildlife, culture, and adventure across Kenya.
        </p>
      </header>
      <main>
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
