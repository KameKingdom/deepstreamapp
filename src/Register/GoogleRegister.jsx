import { signInWithPopup } from "firebase/auth";
import { provider, auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import "../css/kame.css";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function GoogleRegister() {
    const [user] = useAuthState(auth);
    return (
        <div>
            {user
                ? (
                    <IsAlreadyRegistered />
                ) : (
                    <SignInButton />
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
            <p class="kame_font_001">Register with Google</p>
        </button>
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
                    <img class="img_circle" src={auth.currentUser.photoURL} alt="ユーザー画像" /><br /><br />
                    ようこそ、{auth.currentUser.displayName}さん
                    <br /><br />
                    <Link class="kame_button_light_blue" to="/register001">
                        <p class="kame_font_001">情報の修正</p>
                    </Link>
                    <br />
                </>
            ) : (
                <>
                    <UserInfo />
                    <Link class="kame_button_light_blue" to="/register001">
                        <p class="kame_font_001">アカウント作成
                        </p>
                    </Link>
                </>
            )}
        </>
    );
}

export default GoogleRegister;