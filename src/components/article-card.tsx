import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/article/${article.id}`}>
      <Card className="mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-[15rem] object-cover"
          />
        </CardHeader>
        <CardContent className="p-4 h-48">
          {/* Correction: Affichage du nom de la catégorie */}
          <div className="text-sm font-medium text-primary-foreground mb-2">
            {article.category?.name || "Catégorie inconnue"}
          </div>
          <h3 className="text-lg font-playfair font-semibold mb-2">{article.title}</h3>

          {/* Affichage du contenu de l'article */}
          <p className="text-muted-foreground text-sm line-clamp-3">{article.content}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          {new Date(article.updated_at).toLocaleDateString()}
        </CardFooter>
      </Card>
    </Link>
  );
}
