import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import { toast } from 'sonner';

export function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
        }
        const data = await response.json();

        // Vérification et assignation d'une catégorie par défaut
        const validArticles = data.map((article: Article) => ({
          ...article,
          category: article.category || { name: 'Catégorie inconnue' }, 
        }));

        setArticles(validArticles);
      } catch (err) {
        setError('Impossible de charger les articles');
        toast.error('Impossible de charger les articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold mb-8">Accueil</h1>
      
      {isLoading ? (
        <p>Chargement des articles...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5">
              <div className="flex items-center space-x-4">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                  {/* Vérification de la catégorie avant d'afficher son nom */}
                  <p className="text-xs text-muted-foreground">
                    {article.category?.name || 'Catégorie inconnue'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
