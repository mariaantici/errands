import { supabase } from '@/utils/supabaseClient';
import { List } from '@/services/types';

// Create by default the 3 lists for a new user: Household, Trip & Workplace
export async function createDefaultListsForUser(userId: string): Promise<void> {
    const defaultListNames = ['household', 'trip', 'workplace'];
    for (const listName of defaultListNames) {

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
}


