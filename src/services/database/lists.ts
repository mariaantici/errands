import { supabase } from '@/utils/supabaseClient';
import { List } from '@/services/types';
import { getUserData } from '@/services/database/users';

// Fetch all list_name for user from lists table
export async function getMemberListNames(): Promise<{ list_name: string }[] | null> {
    try {
        // Fetch the user's data from Supabase
        const user = await getUserData();
        let userId: string;

        if (user) {
            userId = user.id;
        }

        const { data, error } = await supabase
            .from('user_list')
            .select('list_name')
            .eq('user_id', userId)

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error updating user name', error);
        throw error;
    }
}

// Create by default the 3 lists for a new user: Household, Trip & Workplace
export async function createDefaultListsForUser(): Promise<void> {
    const defaultListNames = ['Household', 'Trip', 'Workplace'];

    try {
        // Fetch the user's data from Supabase
        const user = await getUserData();
        let userId: string;

        if (user) {
            userId = user.id;
        }

        // Fetch all list names for user in lists table
        const listNames = await getMemberListNames();

        // Iterate through the default list names
        for (const listName of defaultListNames) {
            // Check if the user is already a member of a list with the current name
            let listExists = false;
            for (const list of listNames) {
                if (list.list_name === listName) {
                    listExists = true;
                    break;
                }
            }

            // If the list does not exist, create it for the user
            if (!listExists) {

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
                    console.error('Error updating user name', error);
                    throw error;
                }
            }
        }
    } catch (error) {
        console.error('Error updating user name', error);
        throw error;
    }

}


