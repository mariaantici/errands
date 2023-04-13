import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

export async function register(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        throw error;
    }

    if (data?.session) {
        supabase.auth.setSession(data.session);
    }

    return data?.user;
}

export async function login(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        throw error;
    }
    return data?.user;
}

export async function logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
}

export async function resetPassword(email: string): Promise<void> {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
        throw error;
    }
}

export async function updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
        throw error;
    }
}
