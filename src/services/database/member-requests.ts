import { supabase } from '@/utils/supabaseClient';
import { MemberRequest } from '@/services/types';

// Create member request
export async function createRequest(senderId: string, inviteeEmail: string, listName: string, listId: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('member-requests')
            .insert([{ sender_id: senderId, invitee_email: inviteeEmail, list_name: listName, list_id: listId }])

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error searching for member request', error);
        throw error;
    }
}

// Fetch the member request
export async function fetchRequest(email: string): Promise<MemberRequest | null> {
    try {
        const { data, error } = await supabase
            .from('member-requests')
            .select('*')
            .eq('invitee_email', email)
            .single();

        if (error) {
            throw error;
        }

        return data as MemberRequest;

    } catch (error) {
        console.error('Error fetching member request', error);
        throw error;
    }
}

// Delete the member request
export async function deleteRequest(requestId: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('member-requests')
            .delete()
            .eq('id', requestId);

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error deleting member request', error);
        throw error;
    }
}
