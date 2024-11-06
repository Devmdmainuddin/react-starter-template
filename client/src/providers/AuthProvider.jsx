import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
   reauthenticateWithCredential
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import Swal from 'sweetalert2'
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
  const handleUpdatePassword =async (password, currentPassword) => {
    const currentuser = auth.currentUser;
    const credential = EmailAuthProvider.credential(currentuser.email, currentPassword);
   
    try {
      await reauthenticateWithCredential(currentuser, credential);
      await updatePassword(user, password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your password has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
   
    }

  }
  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = async () => {
    setUser(null);
    setLoading(true)
    signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
    return () => {
      unSubscribe();
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    handleUpdatePassword,
    sendPasswordResetEmail
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.object,
}

export default AuthProvider
