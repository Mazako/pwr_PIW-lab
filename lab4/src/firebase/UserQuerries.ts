import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "./firebase";

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
}

export const userExists = async (id: string | undefined) => {
    if (!id) {
        return false;
    }
    return (await getDoc(doc(db, 'users', id))).exists();
}
