import { useEffect, useState } from "react";
import {Box, Button, Container, HStack, Input, VStack} from "@chakra-ui/react";
import Message from "./Components/Message";
import {app} from "./firebase";
import {onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {getFirestore, addDoc, collection, serverTimestamp} from "firebase/firestore";


const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

const logoutHandler = () => {
  signOut(auth);
}


function App() {

  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();
  
    try{
  
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      });

      setMessage("");
  
    }catch(error){
      alert(error);
    }
  
  }

  useEffect(() => {
   const unsubscribe =  onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <Box bg={"red.50"}>
      {
        user? (
          <Container h={"100vh"} bg={"white"}> 
          <VStack h={"full"} paddingY={"4"}>
           <Button onClick={logoutHandler} colorScheme={"red"} w={"full"}>
             Logout
           </Button>
   
           <VStack h={"full"} w={"full"} overflowY={"auto"}>
            <Message text={"Sample message"} />
            <Message text={"Sample message"} />
           </VStack>
   
           <form onSubmit={submitHandler} style={{width: "100%"}}>
            <HStack>
              <Input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Enter a Message..." 
              />
              <Button colorScheme={"purple"} type="submit">Send</Button>
            </HStack>
           </form>
   
          </VStack>
         </Container>
        ): (
          <VStack bg={"white"} justifyContent={"center"} h="100vh">
            <Button onClick={loginHandler} colorScheme={"purple"}>Sign In With Google</Button>
          </VStack>
        )
      }
    </Box>
  );
}

export default App;
