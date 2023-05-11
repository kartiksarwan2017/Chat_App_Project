import {Box, Button, Container, HStack, Input, VStack} from "@chakra-ui/react";
import Message from "./Components/Message";
import {onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {app} from "./firebase";
import { useEffect, useState } from "react";

const auth = getAuth(app);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

const logoutHandler = () => {
  signOut(auth);
}

function App() {

  const [user, setUser] = useState(false);

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
   
           <form style={{width: "100%"}}>
            <HStack>
              <Input placeholder="Enter a Message..." />
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
