import {ChangeEvent, FC, useEffect, useRef, useState} from "react";

import styles from "./ChatPage.module.css";
import {ChatUserCard, MessageStatus} from "../../components/chat-user-card/ChatUserCard";
import {ChatMessage} from "../../components/chat-message/ChatMessage";
import {getAuth} from "firebase/auth";
import {
    ChatUserInfoDto,
    getChat,
    getChatHistoryUsers,
    getChatMessages,
    sendMessage,
    UserMessagesDTO
} from "../../firebase/chatQuerries";
import {doc, onSnapshot, or, query, where} from "firebase/firestore";
import {chatRef, db} from "../../firebase/firebase";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import {loggedInSelector} from "../../features/LoggedInSlice";
import {Header} from "../../components/header/Header";
import {getAllOtherUsers, UserSearchData} from "../../firebase/UserQuerries";

interface SelectedUser {
    id: string,
    name: string,
}

export const ChatPage: FC = () => {
    const [users, setUsers] = useState<null | ChatUserInfoDto[]>(null);
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const auth = getAuth();
    const [messages, setMessages] = useState<UserMessagesDTO | null>(null);
    const [chatId, setChatId] = useState<string | null>(null);
    const [text, setText] = useState('');
    const loggedIn = useSelector(loggedInSelector);

    //search bar
    const [allUsersCache, setAllUsersCache] = useState<UserSearchData[]>([]);
    const [userSearchText, setUserSearchText] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<UserSearchData[]>([]);

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (auth.currentUser?.uid) {
            const uid = auth.currentUser.uid;
            getChatHistoryUsers(uid).then(setUsers);
            getAllOtherUsers(uid).then(setAllUsersCache);
            const q = query(
                chatRef,
                or(where('user_1', '==', uid), where('user_2', '==', uid))
            );

            onSnapshot(q, () => {
                getChatHistoryUsers(uid).then(setUsers);
            });
        }
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

    const determineLastMessageStatus = (lastMessageAuthor: boolean, viewerSeen: boolean): MessageStatus => {
        if (lastMessageAuthor) {
            if (viewerSeen) {
                return 'otherMessageSeen';
            } else {
                return 'otherMessageUnseen';
            }
        } else {
            if (viewerSeen) {
                return 'myMessageSeen';
            } else {
                return 'myMessageUnseen';
            }
        }
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>)  => {
        const searched = e.target.value;
        setUserSearchText(searched);
        if (searched === '') {
            setFilteredUsers(allUsersCache);
        } else {
            const filtered = allUsersCache.filter(user => {
                let regExp = new RegExp(`.*${searched}.*`);
                return user.firstName.match(regExp) || user.lastName.match(regExp);
            });
            setFilteredUsers(filtered);
        }
    }

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
                    <img src="/assets/icons/search.svg" width={16} alt="search bar"/>;
                    {/*TODO https://react-select.com/home*/}
                    <input type="text"
                           placeholder="Search or start new chat"
                           className={styles.search}
                           onChange={handleTextChange}
                           list='d-list'/>
                    <datalist id='d-list' onClick={() => console.log('x')}>
                        {
                            filteredUsers.map(u => {
                                return <option key={u.id} value={u.id}>{`${u.firstName} ${u.lastName}`}</option>;
                            })
                        }
                    </datalist>
                </article>
                {
                    users
                        .sort((user1, user2) => Number(user2.lastMessage.messages[0].date) - Number(user1.lastMessage.messages[0].date))
                        .map(user =>
                        <ChatUserCard name={user.user.firstName + ' ' + user.user.lastName}
                                      sendDate={moment(Number(user.lastMessage.messages[0].date) * 1000).format('YYYY-MM-DD HH:mm')}
                                      lastMessage={user.lastMessage.messages[0].message}
                                      status={determineLastMessageStatus(user.lastMessage.isLastMessageAuthor, user.lastMessage.isLastMessageSeen) }
                                      onClick={() => setSelectedUser({
                                          id: user.user.id,
                                          name: user.user.firstName + ' ' + user.user.lastName
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
                               onKeyDown={async e => {
                                   if (e.key === 'Enter') await handleSendMessage();
                               }}/>
                        <button onClick={handleSendMessage}>
                            <img src="/assets/icons/send-fill.svg" alt="send message icon" width={24} height={24}/>
                        </button>
                    </article>
                </section>

            }
        </section>
    );
};
