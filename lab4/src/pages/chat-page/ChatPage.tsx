import {FC} from "react";

import styles from "./ChatPage.module.css";
import {ChatUserCard} from "../../components/chat-user-card/ChatUserCard";
import {ChatMessage} from "../../components/chat-message/ChatMessage";

export const ChatPage: FC = () => {
    return (
        <section className={styles.chatPage}>
            <section className={styles.left}>
                <article className={styles.searchContainer}>
                    <article>
                        <img src='/assets/icons/search.svg' width={16}/>
                        <input type='text' placeholder='Search or start new chat' className={styles.search}/>
                    </article>
                    <ChatUserCard name='Paweł Nikołajów'
                                  sendDate='12-04-2001'
                                  lastMessage='No to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy'
                                  status='sent'/>
                    <ChatUserCard name='Rozbójnik Alibaba'
                                  sendDate='today'
                                  lastMessage='No to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy'
                                  status='unseen'/>
                    <ChatUserCard name='Rozbójnik Alibaba'
                                  sendDate='today'
                                  lastMessage='No to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy'
                                  status='viewed'/>
                    <ChatUserCard name='Rozbójnik Alibaba'
                                  sendDate='today'
                                  lastMessage='No to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy'
                                  status='seen'/>
                </article>
            </section>
            <section className={styles.right}>
                <article className={styles.chatHeader}>
                    <img src='/assets/icons/empty_avatar.png' alt='avatar'/>
                    <p>Piotr Skowyrski</p>
                </article>
                <article className={styles.messages}>
                    <ChatMessage message='No to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy'
                                 seen={true}
                                 date='12:30'
                                 author={false} />
                    <ChatMessage message='12 to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy12 to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy12 to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy12 to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy12 to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy12 to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy12 to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy'
                                 seen={false}
                                 date='12:30'
                                 author={true} />
                </article>
                <article className={styles.sendMessageContainer}>
                    <input type='text' placeholder='Enter your message here'/>
                    <button>
                        <img src='/assets/icons/send-fill.svg' alt='send message icon' width={24} height={24}/>
                    </button>
                </article>
            </section>
        </section>
    );
};
