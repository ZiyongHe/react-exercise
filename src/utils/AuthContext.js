import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { auth, storage, db } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, getDocs, doc, collection, query, where } from "firebase/firestore"



const AuthContext = React.createContext()

export function useAuth () {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({})
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [players, setPlayers] = React.useState(['','','','']);
    const [availability, setAvailability] = React.useState([1,1,1,1])

    function signup ( email, password ) {
        return auth.createUserWithEmailAndPassword(email, password).then(async res=>{
            // initialize user arrays and save to firestore                                                    
            await setDoc(doc(db, "players", `${res.user.uid}`), {
                uid:`${res.user.uid}`,
                players: ["","","",""],
                availability: [1,1,1,1]
              });
            console.log('Initialize user firestore')
            navigate("/lobby");
        })
    }

    function login ( email, password) {
        return auth.signInWithEmailAndPassword(email,password).then(async res=>{
            console.log(res.user.uid)   
            const q = query(collection(db, "players"), where("uid", "==", res.user.uid));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs[0]
            console.log('SetPlayers: ' , data.data().players)
            console.log('SetAvailability: ' , data.data().availability)    
            setPlayers(data.data().players)
            setAvailability(data.data().availability)
            navigate("/lobby")

        })
    }

    function logout () {
        auth.signOut()
        setCurrentUser('')
    }


    function uploadImage (image) {
        console.log(image)
        const imageRef = ref (storage, `${currentUser.uid}/avatar.png`)
        uploadBytes(imageRef, image).then(()=>{
            getDownloadURL(imageRef).then(url=>{
                const userObject = {...currentUser,imageURL:url}
                setCurrentUser(userObject)
                console.log(currentUser)
            })
        })
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged ( async user => {
            if (!user){
                return unsubscribe
            }
            await getDownloadURL(ref (storage, `${user.uid}/avatar.png`)).then(url=>{
                const userObject = {...user.multiFactor.user,imageURL:url}
                setCurrentUser(userObject)
            }).catch(err=>{
                console.log(err)
                console.log('User is using default profile picture')
                const userObject = {...user.multiFactor.user,imageURL:'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                setCurrentUser(userObject)
            })
            return unsubscribe
        })}, [])

    useEffect(()=>{
        setError('')
    },[navigate])

    useEffect(()=>{
        if (currentUser.uid) {
            setDoc(doc(db, "players", `${currentUser.uid}`), {
                uid:`${currentUser.uid}`,
                players: players,
                availability: availability
              });
            console.log('Player selections have been updated to firestore database')
        }
    })

    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
        error,
        setError,
        loading,
        setLoading,
        storage,
        uploadImage,
        players, 
        setPlayers, 
        availability, 
        setAvailability,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
