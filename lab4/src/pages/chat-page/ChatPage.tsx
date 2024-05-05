import {FC} from "react";

import styles from "./ChatPage.module.css";
import {ChatUserCard} from "../../components/chat-user-card/ChatUserCard";

export const ChatPage: FC = () => {
    return (
        <section className={styles.chatPage}>
            <section className={styles.left}>
                <article>
                    USER
                </article>
                <article className={styles.searchContainer}>
                    <img src='/assets/icons/search.svg' width={16}/>
                    <input type='text' placeholder='Search or start new chat' className={styles.search}/>
                </article>
                <article>
                    <ChatUserCard name='Paweł Nikołajów' sendDate='12-04-2001' lastMessage='No to kurde jedziemyNo to kurde jedziemyNo to kurde jedziemy' status='sent' />
                </article>
            </section>
            <section className={styles.right}>
                xD
            </section>
        </section>
    )
}
