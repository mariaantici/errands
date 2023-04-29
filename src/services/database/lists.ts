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
                    console.error('Error creating default lists', error);
                    throw error;
                }
            }
        } catch (error) {
            console.error('The user already has this list', error);
            throw error;
        }
    }
}
