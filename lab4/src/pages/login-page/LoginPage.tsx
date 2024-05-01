import {getAuth, getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {Header} from "../../components/header/Header";
import styles from './LoginPage.module.css';
import {useNavigate} from "react-router";
import {FC, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {containerIds} from "../../utils/ToastifyContainerIds";
import {googleRedirectLogin} from "../../firebase/firebase";
import {validateLogin} from "../../utils/validation";

export const LoginPage: FC = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [userUndefined, setUserUndefined] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        getRedirectResult(auth)
            .then(user => {
                if (user) {
                    toast('Logged in successfully', {containerId: containerIds.main});
                    navigate('/browse');
                } else {
                    setUserUndefined(false);
                }
            })

        onAuthStateChanged(auth, user => {
            if (user) {
                navigate('/browse');
            } else {
                setUserUndefined(false)
            }
        })

    }, [auth, navigate])

    const handleGoogleLogin = async () => {
        await googleRedirectLogin(auth)
    }

    const handleClassicLogin = async () => {
        const validation = validateLogin(email, password);
        if (!validation.valid) {
            toast(validation.messages, {containerId: containerIds.main, type: 'error'});
            return;
        }

        try {
            const user = (await signInWithEmailAndPassword(auth, email, password)).user;
            if (!user.emailVerified) {
                await auth.signOut();
                toast('User is not verified. Check your mail to verify account', {
                    containerId: containerIds.main,
                    type: 'warning'
                })
            } else {
                toast('Logged in successfully', {containerId: containerIds.main});
            }
        } catch (e) {
            toast('Invalid data', {containerId: containerIds.main, type: 'error'});
        }

    }

    if (userUndefined) {
        return <></>;
    }

    return (
        <section>
            <Header title={'Log in'}/>
            <article className={styles.loginForm}>
                <label id={styles['emailL']}>E-mail</label>
                <input type="email" id={styles['email']} value={email}
                       onChange={e => setEmail(e.target.value)}/>

                <label id={styles['passwordL']}>Password</label>
                <input id={styles['password']} type="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>

                <button id={styles['loginButton']} className="button primary" onClick={handleClassicLogin}>Log in</button>

                <p id={styles['or']}>or</p>

                <button id={styles['signUp']} className='button secondary' onClick={() => navigate('/register')}>
                    Sign up
                </button>
                <button id={styles['googleButton']} className="button secondary" onClick={handleGoogleLogin}>
                    <img width='24' height='24' src='/assets/icons/google.svg' alt='Google'/>
                    Sign up with google
                </button>
            </article>
        </section>
    );
};
