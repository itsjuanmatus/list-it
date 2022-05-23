import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const accessToken = useLocalStorage('accessToken');

  useEffect(() => {
    if (accessToken && router.pathname === '/login') {
      router.push('/');
    } else if (!accessToken && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [accessToken, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
