import { supabase } from '@/utils/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/services/types';

// Get the user's data from schema: auth -> users table
export async function getUserData(): Promise<SupabaseUser | null> {
    try {
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
            throw error;
        }

        return user;

    } catch (error) {
        console.error('Error fetching user data, the user is not authenticated', error);
        throw error;
    }
}

/*
The methods below use the 'users' table, which is not the same as schema: 'auth' -> 'users' table
The 'users' table is designed to store non-sensitive user-related information such as the user's id, email, and name.
This table allows sharing relevant user data with other users without exposing sensitive authentication-related information.
This approach eliminates the need for admin-level access and provides an additional layer of security by preventing unnecessary access to sensitive data.
The table is a core component of the user management and sharing features, enabling interactions between users while ensuring the integrity and confidentiality of the user data.
*/

// Create new user with user id and email, the name is not required
export async function createUser(userId: string, email: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('users')
            .insert({ id: userId, email: email });

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
}

// Get the logged in user
export async function getUser(): Promise<User | null> {
    try {
        // Get the user id from schema: auth -> users table
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
        console.error('Error getting user', error);
        throw error;
    }
}

// Update user name
export async function updateUser(name: string): Promise<string | null> {
    try {
        // Get the user id from schema: auth -> users table
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

// Get user id and name
export async function getName(userId: string): Promise<{ id: string, name: string } | null> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, name')
            .eq('id', userId)
            .single();

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error getting user name', error);
        throw error;
    }
}

// Get user name and email for user id
export async function getNameAndEmail(userId: string): Promise<{ name: string, email: string } | null> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('name, email')
            .eq('id', userId)
            .single();

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error getting user name', error);
        throw error;
    }
}

// Get user id for email
export async function getIdForEmail(email: string): Promise<string | null> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (error) {
            throw error;
        }

        return data.id;

    } catch (error) {
        console.error('Error getting user id for email', error);
        throw error;
    }
}
