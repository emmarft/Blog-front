import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, FileText, Heart, Bell, LayoutDashboard } from 'lucide-react';

export function Profile() {
  const { user, hasAccess } = useAuth();
  const canAccessDashboard = hasAccess(['admin']);

  const savedArticles = [
    { id: '1', title: 'Les meilleurs conseils pour une routine beauté naturelle' },
    { id: '2', title: 'Comment organiser son intérieur de façon minimaliste' }
  ];

  const notifications = [
    { id: 1, text: 'Nouvel article disponible dans la catégorie Beauté', date: '2024-03-20' },
    { id: 2, text: 'Votre article a été commenté', date: '2024-03-19' }
  ];

  return (
    <>
      <Helmet>
        <title>Profil - Daily Tips</title>
        <meta name="description" content="Gérez votre profil Daily Tips" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <Card className="mb-8 bg-primary/5">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-3xl font-semibold text-primary-foreground">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-playfair font-bold mb-2">{user?.name}</h1>
                      <p className="text-muted-foreground mb-4">{user?.email}</p>
                    </div>
                    {canAccessDashboard && (
                      <Link to="/dashboard">
                        <Button className="rounded-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Accéder au Dashboard
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Button>
                    {user?.role === 'admin' && (
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Gérer les utilisateurs
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Content */}
          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList>
              <TabsTrigger value="saved">
                <Heart className="mr-2 h-4 w-4" />
                Articles sauvegardés
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Articles sauvegardés</h2>
                  <div className="space-y-4">
                    {savedArticles.map((article) => (
                      <Link key={article.id} to={`/article/${article.id}`}>
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <p className="font-medium">{article.title}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <Card key={notification.id}>
                        <CardContent className="p-4">
                          <p className="font-medium">{notification.text}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(notification.date).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </>
  );
}