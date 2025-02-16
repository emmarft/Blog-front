import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Home } from '../pages/home';
import { Articles } from '../pages/articles';
import { ArticleDetail } from '../pages/article-detail';
import { Categories } from '../pages/categories';
import { Auth } from '../pages/auth';
import { Profile } from '../pages/profile';
import { Dashboard } from '../pages/dashboard';
import { ProtectedRoute } from '../components/protected-route';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/auth" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin', 'editor']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}