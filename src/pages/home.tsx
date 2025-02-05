import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { articles } from '@/data/articles';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const featuredArticles = articles.slice(0, 3);
  const categories = ['Beauté', 'Lifestyle', 'Nutrition', 'Mode', 'Bien-être', 'Décoration'];

  return (
    <>
      <Helmet>
        <title>Daily Tips - Lifestyle Tips & Tricks</title>
        <meta name="description" content="Découvrez les meilleurs conseils lifestyle pour une vie plus épanouie." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-primary/10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
              Bienvenue sur Daily Tips
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Découvrez nos conseils et astuces pour une vie plus épanouie.
              Des articles soigneusement sélectionnés pour vous inspirer au quotidien.
            </p>
            <Link to="/articles">
              <Button size="lg" className="rounded-full">
                Découvrir nos articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Articles à la une</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/article/${article.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="text-sm font-medium text-primary-foreground mb-2">
                        {article.category}
                      </div>
                      <h3 className="text-xl font-playfair font-semibold mb-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground">{article.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-accent/20 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold mb-8 text-center">
            Explorez nos catégories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category} to="/categories">
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h3 className="font-medium">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-playfair font-bold mb-4">
                Restez inspiré(e)
              </h2>
              <p className="text-muted-foreground mb-6">
                Inscrivez-vous à notre newsletter pour recevoir nos meilleurs conseils
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="rounded-full">S'inscrire</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}