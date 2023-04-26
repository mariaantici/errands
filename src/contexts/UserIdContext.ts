import { createContext } from "react";

const UserIdContext = createContext<string | null>(null);

export default UserIdContext;
