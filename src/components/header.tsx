import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/use-auth';
import { ModeToggle } from './mode-toggle';

export function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary-foreground" />
            <span className="font-playfair text-xl font-semibold">Daily Tips</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary-foreground transition-colors">
              Home
            </Link>
            <Link to="/articles" className="text-sm font-medium hover:text-primary-foreground transition-colors">
              Articles
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary-foreground transition-colors">
              Categories
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  {user?.name}
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}