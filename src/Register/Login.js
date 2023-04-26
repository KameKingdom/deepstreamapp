import React from 'react';
import GoogleLogIn from "./GoogleLogIn";
import { Helmet } from "react-helmet";
import "../css/kame.css";
import "../css/kame_login.css";
import { Link } from "react-router-dom";
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Footer, Header } from '../PageParts';


function Login() {
    const [user] = useAuthState(auth);

    return (
        <div>
            <Helmet><title>ログイン</title></Helmet>
            <Header /><br/><br/>
            <div class="login-page">
                <div class="form">
                    <center>
                        {user ?
                            <>
                                <p class="kame_font_002">アカウント</p>
                                <GoogleLogIn />
                                <br />
                            </>
                            :
                            <>
                                <p class="kame_font_002">ログイン</p>
                                <GoogleLogIn />
                                <br />
                                <p class="message">未登録の方は<Link to="/register">会員登録</Link></p>
                                <p class="message">利用規約は<Link to="/termsofservice">こちら</Link></p>
                            </>
                        }
                    </center>
                </div>
            </div>
        </div>
    )
}
export default Login;