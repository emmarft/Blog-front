import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { articles } from '../data/articles';
import { ArticleCard } from '../components/article-card';
import Masonry from 'react-masonry-css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Array.from(new Set(articles.map(article => article.category)));

  const filteredArticles = articles.filter(article => {
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <>
      <Helmet>
        <title>Articles - Daily Tips</title>
        <meta name="description" content="Découvrez notre collection d'articles lifestyle." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 font-playfair text-center">Articles</h1>
          
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                Tous
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {filteredArticles.map((article) => (
                <div key={article.id} className="masonry-grid_item">
                  <ArticleCard article={article} />
                </div>
              ))}
            </Masonry>
            
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun article trouvé</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}