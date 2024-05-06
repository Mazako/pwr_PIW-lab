import {FC} from "react";

import styles from './ChatMessage.module.css';

export interface ChatMessageProps {
    message: string;
    seen: boolean;
    date: string;
    author: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({message, seen, date, author}) => {
    const boxStyle = author ? styles.author : styles.reciever;

    return (
        <article className={`${styles.message} ${boxStyle}`}>
            <p>{message}</p>
            {
                author
                &&
                <article className={styles.sendAndSeen}>
                    <img src={seen ? '/assets/icons/send-check-fill.svg' : '/assets/icons/send.svg'}/>
                    <p>{date}</p>
                </article>

            }
        </article>
    );
};
