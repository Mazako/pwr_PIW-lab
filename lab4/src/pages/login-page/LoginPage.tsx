import {getAuth, getRedirectResult, onAuthStateChanged} from "firebase/auth";
import {Header} from "../../components/header/Header";
import styles from './LoginPage.module.css';
import {useNavigate} from "react-router";
import {FC, useEffect, useState} from "react";
import {googleRedirectLogin} from "../../firebase/firebase";
import {toast} from "react-toastify";
import {containerIds} from "../../utils/ToastifyContainerIds";

export const LoginPage: FC = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [userUndefined, setUserUndefined] = useState(true);

    const handleGoogleLogin = async () => {
        await googleRedirectLogin()
    }

    useEffect(() => {
        getRedirectResult(auth)
            .then(user => {
                if (user) {
                    toast('Logged in succesfully', {containerId: containerIds.main});
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


    if (userUndefined) {
        return <></>;
    }

    return (
        <section>
            <Header title={'Log in'}/>
            <article className={styles.loginForm}>
                <label id={styles['emailL']}>E-mail</label>
                <input type="email" id={styles['email']}/>
                <label id={styles['passwordL']}>Password</label>
                <input id={styles['password']} type="password"/>
                <button id={styles['loginButton']} className="button primary">Log in</button>
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
