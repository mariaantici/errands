import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';

// Home component
const Home: React.FC = () => {
  const router = useRouter();
  const { session } = useSessionContext();

  // Redirect user based on authentication status
  useEffect(() => {
    if (session) {
      router.push('/errands-manager');
    } else {
      router.push('/authentication');
    }
  }, [router, session]);

  // Render Loading while redirecting 
  return <div>Loading...</div>;
};

export default Home;
