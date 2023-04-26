// Represents a user in the application
export interface User {
    id: string; // User's ID from auth.users
    name: string | null; // Name of the user
    created_at: Date; // Timestamp when the user was created
}

// Keeps track of a user's lists (household, trip or workplace)
export interface List {
    id: string; // ID of the relationship between user and list
    list_id: string; // ID of the list
    list_name: string; // Name of the list
    user_id: string; // ID of the related user
    is_owner: boolean; // Indicates if the user is the owner of the list
    created_at: Date; // Timestamp when the list was created
}

// Represents a user's errand within a list
export interface Errand {
    id: string;
    user_id: string; // ID of the user assigned to the errand
    list_name: string; // Name of the list the errand belongs to
    name: string; // Name of the errand
    date: Date; // Due date of the errand
    status: boolean; // Indicates if the errand is completed (true) or not (false)
    created_at: Date; // Timestamp when the errand was created
}
