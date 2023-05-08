import { createContext } from "react";

interface MemberName {
    id: string;
    name: string;
}

const MembersNamesContext = createContext<MemberName[]>([]);

export default MembersNamesContext;
