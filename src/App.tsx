
import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { HelpProvider } from '@/hooks/useHelp';
import { AuthProvider } from '@/hooks/useAuth';

import PublicLayout from '@/components/layout/PublicLayout';
import ErrorBoundary from '@/components/features/ErrorBoundary';

import { ADMIN_PATH } from '@/constants/content';

import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const ArticlePage = lazy(() => import('@/pages/ArticlePage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const RequestPage = lazy(() => import('@/pages/RequestPage'));
const LegalPage = lazy(() => import('@/pages/LegalPage'));

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/components/layout/AdminLayout'));
const Overview = lazy(() => import('@/pages/admin/Overview'));
const ContentManager = lazy(() => import('@/pages/admin/ContentManager'));
const InboxPage = lazy(() => import('@/pages/admin/InboxPage'));
const AISettings = lazy(() => import('@/pages/admin/AISettings'));
const WebsiteSettings = lazy(() => import('@/pages/admin/WebsiteSettings'));
const MediaLibrary = lazy(() => import('@/pages/admin/MediaLibrary'));
const LanguagesPage = lazy(() => import('@/pages/admin/LanguagesPage'));
const SecurityPage = lazy(() => import('@/pages/admin/SecurityPage'));
const ActivityPage = lazy(() => import('@/pages/admin/ActivityPage'));

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Analytics />
          <SpeedInsights />

          <HelpProvider>
            <AuthProvider>
              <Suspense
                fallback={
                  <div className="app-bg min-h-screen p-12 text-sm text-subtle">
                    A little moment…
                  </div>
                }
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Navigate
                        to={`/${['en', 'es', 'fr'].includes(
                          localStorage.getItem('glow-language') || '',
                        )
                          ? localStorage.getItem('glow-language')
                          : 'en'}`}
                        replace
                      />
                    }
                  />

                  <Route path="/:lang" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="category/:id" element={<CategoryPage />} />
                    <Route path="article/:id" element={<ArticlePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="request/:id" element={<RequestPage />} />
                    <Route
                      path="legal/privacy-policy"
                      element={<LegalPage />}
                    />
                    <Route
                      path="legal/terms-of-service"
                      element={<LegalPage />}
                    />
                  </Route>

                  <Route
                    path="/public/en/legal/privacy-policy.html"
                    element={<LegalPage />}
                  />
                  <Route
                    path="/public/en/legal/terms-of-service.html"
                    element={<LegalPage />}
                  />

                  <Route
                    path="/admin"
                    element={<Navigate to={`${ADMIN_PATH}/login`} replace />}
                  />

                  <Route
                    path={`${ADMIN_PATH}/login`}
                    element={<AdminLogin />}
                  />

                  <Route path={ADMIN_PATH} element={<AdminLayout />}>
                    <Route path="overview" element={<Overview />} />
                    <Route path="articles" element={<ContentManager />} />
                    <Route path="faqs" element={<ContentManager />} />
                    <Route path="categories" element={<ContentManager />} />
                    <Route path="inbox" element={<InboxPage />} />
                    <Route path="live-chat" element={<InboxPage />} />
                    <Route path="ai" element={<AISettings />} />
                    <Route path="media" element={<MediaLibrary />} />
                    <Route path="analytics" element={<Overview />} />
                    <Route path="languages" element={<LanguagesPage />} />
                    <Route path="settings" element={<WebsiteSettings />} />
                    <Route path="users" element={<SecurityPage />} />
                    <Route path="security" element={<SecurityPage />} />
                    <Route path="activity" element={<ActivityPage />} />
                  </Route>

                  <Route
                    path="*"
                    element={<NotFound />}
                  />
                </Routes>
              </Suspense>

              <Toaster
                position="top-center"
                richColors
                closeButton
              />
            </AuthProvider>
          </HelpProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
