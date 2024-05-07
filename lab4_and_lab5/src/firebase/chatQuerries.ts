import {
    addDoc,
    and,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    limit,
    or,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "firebase/firestore";
import {chatRef, db, messagesRef} from "./firebase";


type UserType = 'user_1' | 'user_2';

export interface MessageDTO {
    message: string,
    date: string,
    author: boolean
}

export interface UserMessagesDTO {
    messages: MessageDTO[],
    isLastMessageAuthor: boolean,
    isLastMessageSeen: false,
}


const whoami = (userId: string, chat: DocumentSnapshot): UserType => {
    // @ts-ignore
    if (userId === chat.data()['user_1']) {
        return 'user_1';
    } else {
        return 'user_2';
    }
};

export const getChat = async (userId: string, selectedId: string) => {
    const q = query(
        chatRef,
        and(
            or(where('user_1', '==', selectedId), where('user_2', '==', selectedId)),
            or(where('user_1', '==', userId), where('user_2', '==', userId)),
        ),
        limit(1)
    );

    const docs = await getDocs(q);
    if (docs.empty) {
        const id = await createChat(userId, selectedId);
        return await getDoc(doc(db, 'chat', id));
    }
    return docs.docs[0];
};

export const createChat = async (userId1: string, userId2: string) => {
    const doc = await addDoc(chatRef, {
        user_1: userId1,
        user_2: userId2,
        user_1_unseen_count: 0,
        user_2_unseen_count: 0,
    });
    return doc.id;
};

export const getMessages = async (chatId: string, me: UserType) => {
    const q = query(
        messagesRef,
        where('chat_id', '==', chatId),
        orderBy('send_date', 'asc')
    );
    const results = await getDocs(q);
    return results.docs.map(r => {
        return {
            message: r.data().message,
            date: r.data().send_date.seconds,
            author: r.data().author === me
        } as MessageDTO;
    });
};

export const getChatMessages = async (userId: string, selectedId: string): Promise<UserMessagesDTO> => {
    const chat = await getChat(userId, selectedId);
    const me = whoami(userId, chat);
    const ref = doc(db, 'chat', chat.id);
    if (me === 'user_1') {
        await updateDoc(ref, {user_1_unseen_count: 0});
    } else {
        await updateDoc(ref, {user_2_unseen_count: 0});
    }

    const messages = await getMessages(chat.id, me);
    if (messages.length === 0) {
        return {
            messages: [],
            isLastMessageAuthor: false,
            isLastMessageSeen: false,
        };
    }
    const lastMessage = messages[messages.length - 1];
    const isLastMessageSeen = me === 'user_1'
        ? chat.data()?.user_2_unseen_count === 0
        : chat.data()?.user_1_unseen_count === 0;
    return {
        messages: messages,
        isLastMessageAuthor: lastMessage.author,
        //@ts-ignore
        isLastMessageSeen,
    };


};

export const sendMessage = async (userId: string, selectedId: string, message: string) => {
    if (message.trim() === '') {
        return;
    }
    const chat = await getChat(userId, selectedId);
    const me = whoami(userId, chat);
    await addDoc(messagesRef, {
        chat_id: chat.id,
        message: message,
        author: me,
        send_date: serverTimestamp()
    });
    const ref = doc(db, 'chat', chat.id);
    if (me === 'user_1') {
        await updateDoc(ref, {user_2_unseen_count: Number(chat.data()?.user_2_unseen_count) + 1});
    } else {
        await updateDoc(ref, {user_1_unseen_count: Number(chat.data()?.user_1_unseen_count) + 1});
    }

};
