export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Les meilleurs conseils pour une routine beauté naturelle',
    excerpt: 'Découvrez comment prendre soin de votre peau avec des produits naturels.',
    content: `La beauté naturelle est à la portée de tous. Voici quelques conseils essentiels pour une routine beauté efficace et naturelle...`,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1600',
    category: 'Beauté',
    date: '2024-03-20'
  },
  {
    id: '2',
    title: 'Comment organiser son intérieur de façon minimaliste',
    excerpt: 'Le minimalisme est la clé d\'un intérieur zen et organisé.',
    content: `Le minimalisme n'est pas seulement une tendance, c'est un art de vivre qui peut transformer votre quotidien...`,
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1600',
    category: 'Lifestyle',
    date: '2024-03-19'
  },
  {
    id: '3',
    title: 'Recettes healthy pour un petit-déjeuner équilibré',
    excerpt: 'Commencez la journée du bon pied avec ces recettes nutritives.',
    content: `Un petit-déjeuner équilibré est essentiel pour bien démarrer la journée. Voici nos meilleures recettes...`,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1600',
    category: 'Nutrition',
    date: '2024-03-18'
  }
];