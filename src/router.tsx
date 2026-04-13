import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorFallback from './components/ErrorFallback';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
/* Pages désactivées (navigation retirée) — décommenter pour réactiver
const Learn = lazy(() => import('./pages/Learn'));
const EntertainmentEvents = lazy(() => import('./pages/EntertainmentEvents'));
const Careers = lazy(() => import('./pages/Careers'));
*/
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));

export const router = createBrowserRouter(
  [
    {
      element: <App />,
      errorElement: <ErrorFallback />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/services', element: <Services /> },
        /* { path: '/learn', element: <Learn /> },
        { path: '/entertainment-events', element: <EntertainmentEvents /> },
        { path: '/careers', element: <Careers /> }, */
        { path: '/blog', element: <BlogIndex /> },
        { path: '/blog/:slug', element: <BlogPost /> },
        { path: '/contact', element: <Contact /> },
        { path: '*', element: <Home /> },
      ],
    },
  ],
  { basename: basename || undefined }
);
