interface HeadOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export function createHead(options: HeadOptions): void {
  // Set document title
  document.title = options.title;

  // Get existing meta tags or create new ones
  const descriptionMeta = document.querySelector('meta[name="description"]') || 
    document.createElement('meta');
  const ogTitleMeta = document.querySelector('meta[property="og:title"]') || 
    document.createElement('meta');
  const ogDescriptionMeta = document.querySelector('meta[property="og:description"]') || 
    document.createElement('meta');
  const ogTypeMeta = document.querySelector('meta[property="og:type"]') || 
    document.createElement('meta');
  const ogUrlMeta = document.querySelector('meta[property="og:url"]') || 
    document.createElement('meta');
  
  // Set meta tag attributes
  descriptionMeta.setAttribute('name', 'description');
  descriptionMeta.setAttribute('content', options.description);
  
  ogTitleMeta.setAttribute('property', 'og:title');
  ogTitleMeta.setAttribute('content', options.title);
  
  ogDescriptionMeta.setAttribute('property', 'og:description');
  ogDescriptionMeta.setAttribute('content', options.description);
  
  ogTypeMeta.setAttribute('property', 'og:type');
  ogTypeMeta.setAttribute('content', 'website');
  
  ogUrlMeta.setAttribute('property', 'og:url');
  ogUrlMeta.setAttribute('content', options.url);

  // Add meta tags to head if they don't exist
  if (!document.querySelector('meta[name="description"]')) {
    document.head.appendChild(descriptionMeta);
  }
  if (!document.querySelector('meta[property="og:title"]')) {
    document.head.appendChild(ogTitleMeta);
  }
  if (!document.querySelector('meta[property="og:description"]')) {
    document.head.appendChild(ogDescriptionMeta);
  }
  if (!document.querySelector('meta[property="og:type"]')) {
    document.head.appendChild(ogTypeMeta);
  }
  if (!document.querySelector('meta[property="og:url"]')) {
    document.head.appendChild(ogUrlMeta);
  }

  // Add og:image if provided
  if (options.image) {
    const ogImageMeta = document.querySelector('meta[property="og:image"]') || 
      document.createElement('meta');
    ogImageMeta.setAttribute('property', 'og:image');
    ogImageMeta.setAttribute('content', options.image);
    
    if (!document.querySelector('meta[property="og:image"]')) {
      document.head.appendChild(ogImageMeta);
    }
  }
}
