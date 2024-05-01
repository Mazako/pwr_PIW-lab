import {getAuth} from "firebase/auth";
import {Header} from "../../components/header/Header";
import styles from './LoginPage.module.css';
import {useNavigate} from "react-router";
import {FC} from "react";
export const LoginPage: FC = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    // if (auth.currentUser) {
    //     return <Navigate to="/"></Navigate>
    // }

    return (
        <section>
            <Header title={'Log in'} />
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
                <button id={styles['googleButton']} className="button secondary">
                    <img width='24' height='24' src='/assets/icons/google.svg' alt='Google'/>
                    Sign up with google
                </button>
            </article>
        </section>
    )
}
