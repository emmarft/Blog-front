export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category_id: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
  };
}
