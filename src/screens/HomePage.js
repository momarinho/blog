import { lazy, Suspense } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
const Posts = lazy(() => import('../components/Posts'));

export default function HomePage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Posts />
      </Suspense>
      <Footer />
    </div>
  );
}
