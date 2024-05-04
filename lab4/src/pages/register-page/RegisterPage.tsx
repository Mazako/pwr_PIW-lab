import {FC, useEffect, useState} from "react";
import {Header} from "../../components/header/Header";
import styles from "./RegisterPage.module.css";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, updateProfile} from "firebase/auth";
import {useNavigate} from "react-router";
import {validateRegistration} from "../../utils/validation";
import {toast} from "react-toastify";
import {containerIds} from "../../utils/ToastifyContainerIds";
import { FirebaseError } from "firebase/app";
import {addUser} from "../../firebase/UserQuerries";

export const RegisterPage: FC = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [userUndefined, setUserUndefined] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                navigate('/browse');
            } else {
                setUserUndefined(false)
            }
        })

    }, [auth, navigate])

    const handleRegistration = async () => {
        const validation = validateRegistration(firstName, lastName, email, password);
        if (!validation.valid) {
            toast(validation.messages, {containerId: containerIds.main, type: 'error'})
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            await auth.signOut();
            await updateProfile(response.user, {
                displayName: `${firstName} ${lastName}`
            });
            await sendEmailVerification(response.user);
            await addUser({firstName, lastName, email, id: response.user.uid})
            toast('Registered successfully. Check your mail to verify your registration', {containerId: containerIds.main});
            navigate('/browse')
        } catch (e) {
            if (e instanceof FirebaseError) {
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        toast('E-mail address is already in use', {containerId: containerIds.main, type: 'error'});
                        break;
                    case 'auth/invalid-email':
                        toast('E-mail address is invalid', {containerId: containerIds.main, type: 'error'});
                        break;
                    case 'auth/weak-password':
                        toast('Password is not strong enough', {containerId: containerIds.main, type: 'error'});
                        break;

                }
            }
        }
    }

    if (userUndefined) {
        return <></>
    }

    return (
        <section>
            <Header title={'Register'}/>
            <article className={styles.loginForm}>
                <label id={styles['fNameL']} htmlFor={styles['fName']}>First name</label>
                <input type="text" id={styles['fName']} value={firstName}
                       onChange={e => setFirstName(e.target.value)}/>

                <label id={styles['lNameL']} htmlFor={styles['lName']}>Last name</label>
                <input type="text" id={styles['lName']} value={lastName}
                       onChange={e => setLastName(e.target.value)}/>

                <label id={styles['emailL']} htmlFor={styles['email']}>E-mail</label>
                <input type="email" id={styles['email']} value={email}
                       onChange={e => setEmail(e.target.value)}/>

                <label id={styles['passwordL']} htmlFor={styles['password']}>Password</label>
                <input id={styles['password']} type="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>

                <button id={styles['signUp']} className='button primary' onClick={handleRegistration}>
                    Sign up
                </button>
            </article>
        </section>
    )

}
