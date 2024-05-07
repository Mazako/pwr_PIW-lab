import {FC, useEffect, useRef, useState} from "react";

import styles from "./ChatPage.module.css";
import {ChatUserCard} from "../../components/chat-user-card/ChatUserCard";
import {ChatMessage} from "../../components/chat-message/ChatMessage";
import {getAllUsers, UserData} from "../../firebase/UserQuerries";
import {getAuth} from "firebase/auth";
import {getChat, getChatMessages, sendMessage, UserMessagesDTO} from "../../firebase/chatQuerries";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import {loggedInSelector} from "../../features/LoggedInSlice";
import { Header } from "../../components/header/Header";

interface SelectedUser {
    id: string,
    name: string,
}

export const ChatPage: FC = () => {
    const [users, setUsers] = useState<null | UserData[]>(null);
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const auth = getAuth();
    const [messages, setMessages] = useState<UserMessagesDTO | null>(null);
    const [chatId, setChatId] = useState<string | null>(null);
    const [text, setText] = useState('');
    const loggedIn = useSelector(loggedInSelector);

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getAllUsers()
            .then(data => {
                setUsers(data.filter(u => u.id !== auth.currentUser?.uid));
            });
    }, [auth]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        const selectedId = selectedUser?.id;
        if (!userId || !selectedId) {
            return;
        }

        getChatMessages(userId, selectedId).then(setMessages);
        getChat(userId, selectedId).then(chat => setChatId(chat.id));


    }, [selectedUser]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        const selectedId = selectedUser?.id;
        if (!userId || !selectedId) {
            return;
        }
        if (chatId) {
            return onSnapshot(doc(db, 'chat', chatId), () => {
                console.log(chatId);
                getChatMessages(userId, selectedId).then(setMessages);
            });
        }
    }, [chatId]);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "auto"});
    }, [messages]);

    const handleSendMessage = async () => {
        const userId = auth.currentUser?.uid;
        const selectedId = selectedUser?.id;

        if (!userId || !selectedId) {
            return;
        }
        await sendMessage(userId, selectedId, text);
        setText('');
    };

    if (!loggedIn) {
        return <Header title={'Log in to use chat'}/>;
    }

    if (users === null) {
        return <></>;
    }

    return (
        <section className={styles.chatPage}>
            <section className={styles.left}>
                <article className={styles.searchBar}>
                    <img src="/assets/icons/search.svg" width={16} alt="search bar"/>
                    <input type="text" placeholder="Search or start new chat" className={styles.search}/>
                </article>
                {
                    users.map(user =>
                        <ChatUserCard name={user.firstName + ' ' + user.lastName}
                                      sendDate={''}
                                      lastMessage={''}
                                      status={"seen"}
                                      onClick={() => setSelectedUser({
                                          id: user.id,
                                          name: user.firstName + ' ' + user.lastName
                                      })}

                        />
                    )
                }
            </section>
            {
                selectedUser
                &&
                <section className={styles.right}>
                    <article className={styles.chatHeader}>
                        <img src="/assets/icons/empty_avatar.png" alt="avatar"/>
                        <p>{selectedUser.name}</p>
                    </article>
                    <article className={styles.messages}>
                        {
                            messages?.messages.map(message =>
                                <ChatMessage message={message.message}
                                             seen={messages.isLastMessageSeen}
                                             date={moment(Number(message.date) * 1000).format('YYYY-MM-DD HH:mm:ss')}
                                             author={message.author}/>
                            )
                        }
                        <div ref={endRef}></div>
                    </article>
                    <article className={styles.sendMessageContainer}>
                        <input type="text"
                               placeholder="Enter your message here"
                               value={text}
                               onChange={e => setText(e.target.value)}
                        onKeyDown={async e => {if (e.key === 'Enter') await handleSendMessage();}}/>
                        <button onClick={handleSendMessage}>
                            <img src="/assets/icons/send-fill.svg" alt="send message icon" width={24} height={24}/>
                        </button>
                    </article>
                </section>

            }
        </section>
    );
};
