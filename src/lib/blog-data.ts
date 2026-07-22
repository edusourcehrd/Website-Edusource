export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'career-in-hospital-administration',
    title: 'Why a Career in Hospital Administration is Booming in 2026',
    excerpt: 'The healthcare industry is evolving rapidly. Discover why hospital administration is one of the most stable and rewarding career paths today.',
    content: 'Full article content about hospital administration...',
    category: 'Healthcare',
    date: 'May 10, 2026',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    tags: ['Healthcare', 'Career', 'Management']
  },
  {
    id: '2',
    slug: 'german-language-benefits',
    title: 'Top 5 Benefits of Learning German for Indian Students',
    excerpt: 'Thinking about studying abroad? Learning German opens doors to free education and world-class career opportunities in Germany.',
    content: 'Full article content about learning German...',
    category: 'Education',
    date: 'May 12, 2026',
    author: 'Language Expert',
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=2070&auto=format&fit=crop',
    tags: ['German', 'Study Abroad', 'Education']
  },
  {
    id: '3',
    slug: 'future-of-logistics',
    title: 'How AI is Transforming Logistics and Shipping Management',
    excerpt: 'Explore the impact of artificial intelligence on supply chain operations and what it means for future logistics professionals.',
    content: 'Full article content about logistics and AI...',
    category: 'Logistics',
    date: 'May 15, 2026',
    author: 'Tech Analyst',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Logistics', 'AI', 'Supply Chain']
  }
];
