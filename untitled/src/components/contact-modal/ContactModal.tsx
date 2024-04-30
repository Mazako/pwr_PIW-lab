import {forwardRef, useImperativeHandle, useRef} from "react";
import styles from './ContractModal.module.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {containerIds} from "../../utils/ToastifyContainerIds";

interface ContactModalProps {
    hotelName: string
}

export const ContactModal = forwardRef<HTMLDialogElement, ContactModalProps>((props, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const innerRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const handleMessageSend = () => {
        if (textAreaRef.current?.value.trim() === '') {
            toast('Message content cannot be empty', {type: 'error', containerId: containerIds.contactModal});
        }
        else {
            toast('Message sent successfully', {containerId: containerIds.main});
            handleClose();
        }
    };

    const handleClose = () => {
        toast.dismiss({containerId: containerIds.contactModal})
        innerRef.current?.close();
    }

    return (
        <dialog ref={innerRef} onClose={handleClose}>
            <form method="dialog" onSubmit={e => e.preventDefault()}>
                <section className='dialogX'>
                    <button onClick={handleClose}>
                        <img src="/assets/icons/cancel.svg" alt="Cancel icon"/>
                    </button>
                </section>
                <p className='dialogHeader'>Contact</p>
                <p className="text-small">You are contacting the {props.hotelName} hotel</p>
                <textarea className={styles.dialogTextarea} ref={textAreaRef}/>

                <section className={styles.dialogButtons}>
                    <button className="button secondary" onClick={handleClose}>Cancel</button>
                    <button className="button primary" onClick={handleMessageSend}>
                        Send
                        <img src="/assets/icons/mail.svg" alt="Mail icon"/>
                    </button>
                </section>
            </form>
            <ToastContainer containerId={containerIds.contactModal} position='bottom-right'/>
        </dialog>
    )
});
