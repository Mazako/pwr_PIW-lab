import {doc, getDoc, getDocs, query, setDoc} from "firebase/firestore";
import {db, usersRef} from "./firebase";

export interface UserData {
    firstName: string;
    lastName: string,
    email: string,
    id: string,
}

export const addUser = async ({firstName, lastName, email, id}: UserData) => {
    await setDoc(doc(db, 'users', id), {
        first_name: firstName,
        last_name: lastName,
        e_mail: email,
    });
};

export const userExists = async (id: string | undefined) => {
    if (!id) {
        return false;
    }
    return (await getDoc(doc(db, 'users', id))).exists();
};

export const getAllUsers = async(): Promise<UserData[]> => {
    const q = query(usersRef);
    const results = await getDocs(q);
    return results.docs.map(r => {
        return {
            firstName: r.data().first_name,
            lastName: r.data().last_name,
            email: r.data().e_mail,
            id: r.id
        } as UserData;
    });
};
