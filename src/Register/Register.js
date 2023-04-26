import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import "../css/kame.css";
import { Header } from '../PageParts';
import GoogleRegister from './GoogleRegister';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Register() {
    const [user] = useAuthState(auth);

    return (
        <div>
            <Helmet><title>会員登録</title></Helmet>
            <Header /><br /><br />
            <div class="login-page">
                <div class="form">
                    <center>
                        {user ?
                            <>
                                <p class="kame_font_002">会員登録</p>
                                <GoogleRegister />
                                <br/>
                                <p class="message">利用規約は<Link to="/termsofservice">こちら</Link></p><br/>

                            </>
                            :
                            <>
                                <p class="kame_font_002">会員登録</p>
                                <GoogleRegister />
                                <br />
                                <p class="message">アカウントをお持ちの方は<Link to="/login">ログイン</Link></p>
                                <p class="message">利用規約は<Link to="/termsofservice">こちら</Link></p>
                            </>
                        }
                    </center>
                </div>
            </div>
        </div>
    )
}

function LogInButton() {
    return (
        <Link class="kame_button_black" to="/Login">
            <p>ログイン</p>
        </Link>
    );
}
export default Register;
