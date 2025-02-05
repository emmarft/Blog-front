import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/article/${article.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-sm font-medium text-primary-foreground mb-2">
            {article.category}
          </div>
          <h3 className="text-lg font-playfair font-semibold mb-2">{article.title}</h3>
          <p className="text-muted-foreground text-sm">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          {new Date(article.date).toLocaleDateString()}
        </CardFooter>
      </Card>
    </Link>
  );
}