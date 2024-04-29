import {forwardRef} from "react";
import styles from './ContractModal.module.css';

interface ContactModalProps {
    hotelName: string
}

export const ContactModal = forwardRef<HTMLDialogElement, ContactModalProps>((props, ref) => {

    return (
        <dialog ref={ref}>
            <form method="dialog">
                <section className='dialogX'>
                    <button type="submit">
                        <img src="/assets/icons/cancel.svg" alt="Cancel icon"/>
                    </button>
                </section>
                <p className='dialogHeader'>Contact</p>
                <p className="text-small">You are contacting the {props.hotelName} hotel</p>
                <textarea className={styles.dialogTextarea}/>

                <section className={styles.dialogButtons}>
                    <button className="button secondary" type="submit">Cancel</button>
                    <button className="button primary" type="submit">
                        Send
                        <img src="/assets/icons/mail.svg" alt="Mail icon"/>
                    </button>
                </section>
            </form>
        </dialog>
    )
});
