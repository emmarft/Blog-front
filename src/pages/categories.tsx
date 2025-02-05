import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Coffee, Utensils, Shirt, Smile, Home, Book, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  name: string;
  icon: React.ReactNode;
  description: string;
  articleCount: number;
  color: string;
}

const categories: Category[] = [
  {
    name: 'Beauté',
    icon: <Heart className="h-8 w-8" />,
    description: 'Conseils beauté et soins naturels',
    articleCount: 12,
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-300'
  },
  {
    name: 'Lifestyle',
    icon: <Coffee className="h-8 w-8" />,
    description: 'Art de vivre et quotidien',
    articleCount: 15,
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300'
  },
  {
    name: 'Nutrition',
    icon: <Utensils className="h-8 w-8" />,
    description: 'Alimentation saine et recettes',
    articleCount: 8,
    color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300'
  },
  {
    name: 'Mode',
    icon: <Shirt className="h-8 w-8" />,
    description: 'Tendances et conseils mode',
    articleCount: 10,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300'
  },
  {
    name: 'Bien-être',
    icon: <Smile className="h-8 w-8" />,
    description: 'Santé et développement personnel',
    articleCount: 14,
    color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-300'
  },
  {
    name: 'Décoration',
    icon: <Home className="h-8 w-8" />,
    description: 'Design d\'intérieur et DIY',
    articleCount: 9,
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300'
  },
  {
    name: 'Culture',
    icon: <Book className="h-8 w-8" />,
    description: 'Livres, films et arts',
    articleCount: 7,
    color: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300'
  },
  {
    name: 'Créativité',
    icon: <Palette className="h-8 w-8" />,
    description: 'Projets créatifs et inspiration',
    articleCount: 11,
    color: 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-300'
  }
];

export function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/articles?category=${categoryName}`);
  };

  return (
    <>
      <Helmet>
        <title>Catégories - Daily Tips</title>
        <meta name="description" content="Explorez nos différentes catégories d'articles lifestyle." />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold mb-4">Catégories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorez nos différentes catégories et trouvez l'inspiration qui vous correspond
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {category.articleCount} articles
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}