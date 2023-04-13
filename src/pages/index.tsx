import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';

export default function Home() {
  const router = useRouter();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      router.push('/errands-manager');
    } else {
      router.push('/authentication');
    }
  }, [router, session]);

  return <div>Loading...</div>;
}
