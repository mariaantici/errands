import { supabase } from '@/utils/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

// Register a new user with email and password
export async function register(email: string, password: string): Promise<User | null> {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            throw error;
        }

        if (data?.session) {
            supabase.auth.setSession(data.session);
        }

        return (data?.user);

    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

// Log in an existing user with email and password
export async function login(email: string, password: string): Promise<string | null> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            throw error;
        }

        return data.user.id;

    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

// Get session for authenticated user
export async function getSession(): Promise<Session> {
    try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
            throw error;
        }

        return session;

    } catch (error) {
        console.error('Error fetching the session', error);
        throw error;
    }
}

// Log out the current user
export async function logout(): Promise<void> {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
}

// Request a password reset for a user by their email
export async function resetPassword(email: string): Promise<void> {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
}

// Update the password for the current logged-in user
export async function updatePassword(newPassword: string): Promise<void> {
    try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}
