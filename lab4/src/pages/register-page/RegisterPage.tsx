import {FC} from "react";
import {Header} from "../../components/header/Header";
import styles from "./RegisterPage.module.css";

export const RegisterPage: FC = () => {
    return (
        <section>
            <Header title={'Register'} />
            <article className={styles.loginForm}>
                <label id={styles['fNameL']} htmlFor={styles['fName']}>First name</label>
                <input type="email" id={styles['fName']}/>

                <label id={styles['lNameL']} htmlFor={styles['lName']}>Last name</label>
                <input type="email" id={styles['lName']}/>

                <label id={styles['emailL']} htmlFor={styles['email']}>E-mail</label>
                <input type="email" id={styles['email']}/>

                <label id={styles['passwordL']} htmlFor={styles['password']}>Password</label>
                <input id={styles['password']} type="password"/>

                <button id={styles['signUp']} className='button primary'>
                    Sign up
                </button>
            </article>
        </section>
    )

}
