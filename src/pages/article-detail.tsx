import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articles } from '../data/articles';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - Daily Tips</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        <div className="max-w-3xl mx-auto">
          <div className="text-sm font-medium text-primary-foreground mb-4">
            {article.category} • {new Date(article.date).toLocaleDateString()}
          </div>
          <h1 className="text-4xl font-playfair font-bold mb-6">{article.title}</h1>
          <div className="prose prose-lg max-w-none">
            {article.content}
          </div>
        </div>
      </div>
    </>
  );
}