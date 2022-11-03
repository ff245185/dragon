import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loder, setLoder] = useState(true);

    const providerLogin = (provider) => {
        setLoder(true);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email, password) => {
        setLoder(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoder(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoder(true)
        return signOut(auth);
    }

    const verifyEmail = () =>{
        return sendEmailVerification(auth.currentUser)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('inside auth state change', currentUser);
            setLoder(false);
            setUser(currentUser)
        });

        return () => {
            unsubscribe();
        }

    }, [])

    const authInfo = { user,loder, providerLogin, logOut, createUser,verifyEmail , signIn };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;