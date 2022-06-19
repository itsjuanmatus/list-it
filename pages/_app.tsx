import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import jwtDecode from 'jwt-decode';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const accessToken = useLocalStorage('accessToken');

  /*  useEffect(() => {
    if (accessToken) {
      const decodedToken: {
        exp: number;
        iat: number;
        sub: string;
      } = jwtDecode(accessToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // delete token from local storage
        localStorage.removeItem('accessToken');
        // redirect to login page
        router.push('/login');
      }

      if (router.pathname === '/login') {
        router.push('/');
      }

      if (accessToken === '') {
        router.push('/login');
      }
    } else if (accessToken === null) {
      router.push('/login');
    }
  }, [accessToken, router]);
  (''); */

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
