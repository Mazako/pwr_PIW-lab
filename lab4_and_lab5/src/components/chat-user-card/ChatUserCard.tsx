import {FC} from "react";

import styles from './ChatUserCard.module.css'

type MessageStatus = 'sent' | 'unseen' | 'viewed' | 'seen'

interface ChatUserCardProps {
    name: string,
    sendDate: string,
    lastMessage: string,
    status: MessageStatus,
    onClick: () => void,
}

export const ChatUserCard: FC<ChatUserCardProps> = ({name, sendDate, lastMessage, status, onClick}) => {

    const getMessageStyle = () => {
        if (status === 'sent') {
            return styles.messageSent;
        } else if (status === 'unseen') {
            return styles.messageUnseen;
        } else if (status === 'viewed') {
            return styles.messageViewed;
        } else {
            return styles.messageSeen;
        }
    };

    return (
        <article className={styles.card} onClick={onClick}>
            <img src='/assets/icons/empty_avatar.png' alt='avatar'/>
            <article className={styles.nameAndMessage}>
                <p>{name}</p>
                <p className={getMessageStyle()}>{lastMessage}</p>
            </article>
            <p className={styles.date}>{sendDate}</p>
        </article>
    );
};
