import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth,
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAvhIL3GeO0TkDpO0EWfSMbdQh0qqMH4oA",
  authDomain: "netflix-clone-2167f.firebaseapp.com",
  projectId: "netflix-clone-2167f",
  storageBucket: "netflix-clone-2167f.appspot.com",
  messagingSenderId: "964315599372",
  appId: "1:964315599372:web:0e5052eaa9154c7a91d429",
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const signup=async(name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,

        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}
const logout=()=>{
     signOut(auth);
}
export {auth,db,signup,login,logout};