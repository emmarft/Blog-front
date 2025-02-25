import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';

export function Auth() {
  const navigate = useNavigate();
  const { signIn, hasAccess } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success('Connexion réussie !');

      if (hasAccess(['admin', 'reader'])) {
        navigate('/profile');
      }
      else {
        navigate('/');
      }
    } catch (error) {
      toast.error('Erreur de connexion');
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Daily Tips</title>
        <meta name="description" content="Connectez-vous à votre compte Daily Tips." />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-playfair">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder à votre profil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}