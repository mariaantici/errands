import { supabase } from '@/utils/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/services/types';

// Fetch the user's data from Supabase
export async function getUserData(): Promise<SupabaseUser | null> {
    try {
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
            throw error;
        }

        return user;

    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Create new user using the Supabase's auth.users id 
export async function createUser(): Promise<void> {
    try {
        // Fetch the user's data from Supabase
        const user = await getUserData();
        let userId: string;

        if (user) {
            userId = user.id;
        }

        const { error } = await supabase
            .from('users')
            .insert({ id: userId });

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error creating new user', error);
        throw error;
    }
}

// Fetch user from users table
export async function getUser(): Promise<User | null> {
    try {
        // Fetch the user's data from Supabase
        const user = await getUserData();
        let userId: string;

        if (user) {
            userId = user.id;
        }

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            throw error;
        }

        return data as User;

    } catch (error) {
        console.error('Error fetching user', error);
        throw error;
    }
}

// Update user name in users table
export async function updateUser(name: string): Promise<string | null> {
    try {
        // Fetch the user's data from Supabase
        const user = await getUserData();
        let userId: string;

        if (user) {
            userId = user.id;
        }

        const { data, error } = await supabase
            .from('users')
            .update({ 'name': name })
            .eq('id', userId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error updating user name', error);
        throw error;
    }
}