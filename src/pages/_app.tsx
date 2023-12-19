import PreInitApp from '@/HOC/preApp';
import ProtectedRoute from '@/HOC/protectedRoute';
import { store } from '@/Redux/store';
import NavbarComponent from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Toaster />
    <PreInitApp>
      <ProtectedRoute>
        <NavbarComponent />
        <Component {...pageProps} />
      </ProtectedRoute>
    </PreInitApp>
  </Provider>
}
