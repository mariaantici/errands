import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getSession } from '@/services/auth';

// Home component
const Home: React.FC = () => {
  // Instantiate Next.js router
  const router = useRouter();

  // useEffect to fetch the session and redirect the user
  useEffect(() => {
    // Function to fetch the session
    async function fetchSession() {
      try {
        // Fetch the session
        const session = await getSession();

        // Redirect user based on authentication status
        if (session) {
          // If the session exists, navigate to the errands-manager page
          router.push('/errands-manager');
        } else {
          // If the session doesn't exist, navigate to the authentication page
          router.push('/authentication');
        }
      } catch (error) {
        // Show an alert if there is an error fetching the session
        alert(error.message);
      }
    }

    // Call fetchSession function
    fetchSession();
  }, [router]); // Run useEffect when the router instance changes

  // Render Loading while redirecting
  return <div>Loading...</div>;
};

export default Home;
