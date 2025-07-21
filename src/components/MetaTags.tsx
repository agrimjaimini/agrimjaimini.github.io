import React, { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = "Agrim Jaimini - Computer Science @ Cornell University",
  description = "Computer Science student at Cornell University with expertise in Software Engineering, Data Science, Machine Learning, and Blockchain technologies.",
  keywords = "Agrim Jaimini, Cornell University, Computer Science, Software Engineering, Data Science, Machine Learning, Blockchain, Portfolio",
  image = "/profile.jpg",
  url = "https://agrimjaimini.github.io",
  type = "website",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Agrim Jaimini');
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph tags
    updatePropertyTag('og:type', type);
    updatePropertyTag('og:url', url);
    updatePropertyTag('og:title', title);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:site_name', 'Agrim Jaimini Portfolio');
    
    // Twitter tags
    updatePropertyTag('twitter:card', 'summary_large_image');
    updatePropertyTag('twitter:url', url);
    updatePropertyTag('twitter:title', title);
    updatePropertyTag('twitter:description', description);
    updatePropertyTag('twitter:image', image);
    
    // Theme color
    updateMetaTag('theme-color', '#0ea5e9');
    updateMetaTag('msapplication-TileColor', '#0ea5e9');
    
    // Add preconnect links if they don't exist
    const addPreconnect = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        document.head.appendChild(link);
      }
    };
    
    addPreconnect('https://fonts.googleapis.com');
    addPreconnect('https://fonts.gstatic.com');
    addPreconnect('https://github.com');
    addPreconnect('https://linkedin.com');
    
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Agrim Jaimini",
      "jobTitle": "Computer Science Student",
      "alumniOf": {
        "@type": "Organization",
        "name": "Cornell University"
      },
      "url": "https://agrimjaimini.github.io",
      "sameAs": [
        "https://github.com/agrimjaimini",
        "https://linkedin.com/in/agrimjaimini"
      ],
      "knowsAbout": [
        "Software Engineering",
        "Data Science",
        "Machine Learning",
        "Blockchain",
        "Quantitative Finance"
      ]
    };
    
    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default MetaTags; 