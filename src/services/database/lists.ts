import { supabase } from '@/utils/supabaseClient';
import { List } from '@/services/types';

// Create by default the 3 lists for a new user: Household, Trip & Workplace
export async function createDefaultListsForUser(userId: string): Promise<void> {
    // Create the default list of names for lists
    const defaultListNames = ['household', 'trip', 'workplace'];

    for (const listName of defaultListNames) {
        // Check to see if the user is already a member of another list
        try {
            const { data } = await supabase
                .from('lists')
                .select('list_name')
                .eq('list_name', listName)
                .eq('user_id', userId);

            if (data.length === 0) {
                // Create new list
                await createList(listName, userId);
            }
        } catch (error) {
            console.error('The user already has this list', error);
            throw error;
        }
    }
}

// Update list's id and set is owner to false
export async function updateListId(userId: string, listId: string, listName: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('lists')
            .update({ list_id: listId, is_owner: false })
            .eq('user_id', userId)
            .eq('list_name', listName);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Error updating list id', error);
        throw error;
    }
}

// Fetch list_id for user
export async function fetchListId(userId: string, listName: string): Promise<{ list_id: string } | null> {
    try {
        const { data, error } = await supabase
            .from('lists')
            .select('list_id')
            .eq('user_id', userId)
            .eq('list_name', listName)
            .single()

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error fetching list id', error);
        throw error;
    }
}

// Fetch user ids for list
export async function fetchMembersId(listId: string): Promise<{ user_id: string }[] | null> {
    try {
        const { data, error } = await supabase
            .from('lists')
            .select('user_id')
            .eq('list_id', listId);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error fetching members id', error);
        throw error;
    }
}

// Check if user is owner of the list
export async function isOwner(userId: string, listName: string): Promise<{ user_id: string, is_owner: boolean } | null> {
    try {
        const { data, error } = await supabase
            .from('lists')
            .select('user_id, is_owner')
            .eq('user_id', userId)
            .eq('list_name', listName)
            .single();

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error checking if the user is owner', error);
        throw error;
    }
}

// Delete list for user
export async function deleteList(listName: string, userId: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('lists')
            .delete()
            .eq('list_name', listName)
            .eq('user_id', userId);

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error deleting list for user', error);
        throw error;
    }
}

// Create list for user
export async function createList(listName: string, userId: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('lists')
            .insert([
                { list_name: listName, user_id: userId, is_owner: true },
            ]);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Error creating list for user', error);
        throw error;
    }
}
