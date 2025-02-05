import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary-foreground" />
            <span className="font-playfair text-lg">Daily Tips</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Discover the best lifestyle tips and tricks for a better everyday life.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              About
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}