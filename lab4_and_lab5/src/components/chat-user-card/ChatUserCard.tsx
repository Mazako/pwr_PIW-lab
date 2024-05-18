import {FC} from "react";

import styles from './ChatUserCard.module.css';

export type MessageStatus = 'myMessageUnseen' | 'myMessageSeen' | 'otherMessageSeen' | 'otherMessageUnseen'

interface ChatUserCardProps {
    name: string,
    sendDate: string,
    lastMessage: string,
    status: MessageStatus,
    onClick: () => void,
}

export const ChatUserCard: FC<ChatUserCardProps> = ({name, sendDate, lastMessage, status, onClick}) => {

    const getMessageStyle = () => {
        console.log(status);
        if (status === 'myMessageUnseen') {
            return styles.myMessageUnseen;
        } else if (status === 'myMessageSeen') {
            return styles.myMessageSeen;
        } else if (status === 'otherMessageUnseen') {
            return styles.otherMessageUnseen;
        } else {
            return '';
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
