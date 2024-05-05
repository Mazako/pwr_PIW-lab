import {FC} from "react";

import styles from './ChatUserCard.module.css'

type MessageStatus = 'sent' | 'unseen' | 'viewed'

interface ChatUserCardProps {
    name: string,
    sendDate: string,
    lastMessage: string,
    status: MessageStatus
}

export const ChatUserCard: FC<ChatUserCardProps> = ({name, sendDate, lastMessage, status}) => {
    return (
        <section className={styles.card}>
            <img src='/assets/icons/empty_avatar.png' alt='avatar'/>
            <article className={styles.nameAndMessage}>
                <p>{name}</p>
                <p>{lastMessage}</p>
            </article>
            <p className={styles.date}>{sendDate}</p>
        </section>
    )
}
