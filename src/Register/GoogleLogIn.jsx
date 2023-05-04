import React, { useState, useEffect } from 'react'
import { signInWithPopup } from "firebase/auth";
import { provider } from '../firebase';
import { auth, db } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/kame.css";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet";
import GoogleRegister from './GoogleRegister';

function GoogleLogIn() {
    const [user] = useAuthState(auth);

    return (
        <div>
            {user ? (
                <>
                    <IsAlreadyRegistered />
                </>
            ) : (
                <>
                    <SignInButton />
                </>
            )}
        </div>
    );
}

function SignInButton() {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <button onClick={signInWithGoogle}>
            <p class="kame_font_001">Google</p>
        </button>
    );
}

function SignOutButton() {
    return (
        <>
            <button onClick={() => auth.signOut()} class="kame_button_ligh_blue">
                <p class="kame_font_001">サインアウト</p>
            </button>
            <br />
        </>
    );

}

function UserInfo() {
    return (
        <div className='userInfo'>
            <img class="img_circle" src={auth.currentUser.photoURL} alt="ユーザー画像" /><br />
            <p class="kame_font_001">{auth.currentUser.displayName}</p>
        </div>
    );
}
function IsAlreadyRegistered() {
    const [documentExists, setDocumentExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function IsAlreadyRegistered() {
            const docRef = doc(db, "users", auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            setDocumentExists(docSnap.exists());
            setLoading(false);
        }

        IsAlreadyRegistered();
    }, []);
    if (loading) {return <div class="loader">Loading...</div>}


    return (
        <>
            {documentExists ? (
                <>
                    <Helmet>
                        <title>本人情報</title>
                    </Helmet>
                    <img class="img_circle" src={auth.currentUser.photoURL} alt="ユーザー画像" /><br /><br />
                    <p className='kame_font_001'>ようこそ、{auth.currentUser.displayName}さん</p>
                    <br /><br />
                    <Link class="kame_button_light_blue" to="/register001">
                        <p class="kame_font_001">情報の修正</p>
                    </Link>
                    <br />
                    <Link to="/" className='kame_button_light_blue'><p className='kame_font_001'>ホーム</p></Link>

                    <br />
                    <SignOutButton />
                </>
            ) : (
                <>
                    <UserInfo />
                    <p class="kame_font_001">このアカウントは登録されていません<br />「<Link to="/register001" style={{color:"green"}}>会員登録</Link>」から登録をお願いします</p>
                </>
            )}
        </>
    );
}
export default GoogleLogIn;