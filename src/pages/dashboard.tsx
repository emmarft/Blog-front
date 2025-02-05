import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, BarChart2, Users, FileText, Plus, Trash2, Edit, Image } from 'lucide-react';
import { articles } from '@/data/articles';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface ArticleFormData {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
}

export function Dashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('articles');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleFormData | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
  });

  const stats = [
    { title: 'Articles Publiés', value: articles.length, icon: FileText },
    { title: 'Vues Totales', value: '2.4K', icon: BarChart2 },
    { title: 'Utilisateurs', value: '156', icon: Users },
    { title: 'Commentaires', value: '89', icon: PenLine },
  ];

  const categories = ['Beauté', 'Lifestyle', 'Nutrition', 'Mode', 'Bien-être', 'Décoration'];

  const handleCreate = () => {
    toast.success('Article créé avec succès !');
    setIsCreateDialogOpen(false);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      image: '',
    });
  };

  const handleEdit = (article: ArticleFormData) => {
    setSelectedArticle(article);
    setFormData(article);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    toast.success('Article mis à jour avec succès !');
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    toast.success('Article supprimé avec succès !');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Daily Tips</title>
        <meta name="description" content="Gérez votre contenu Daily Tips" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Connecté en tant que {user?.name} ({user?.role})
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Article
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Créer un nouvel article</DialogTitle>
                <DialogDescription>
                  Remplissez les informations ci-dessous pour créer un nouvel article.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Extrait</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Contenu</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button variant="outline" size="icon">
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreate}>Créer l'article</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Articles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Gestion des Articles</CardTitle>
            <CardDescription>
              Gérez tous vos articles depuis cette interface.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irréversible. L'article sera définitivement supprimé.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier l'article</DialogTitle>
              <DialogDescription>
                Modifiez les informations de l'article ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titre</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">Extrait</Label>
                <Textarea
                  id="edit-excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Contenu</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">URL de l'image</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  <Button variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleUpdate}>Mettre à jour</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}