import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Text,
    Alert,
    AlertIcon,
    Heading,
    useToast
  } from "@chakra-ui/react";
  import React, { useState,useContext} from "react";
  
  import { FcGoogle } from "react-icons/fc";
  import { BsFacebook } from "react-icons/bs";

  import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



  
  export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast =useToast()
    
        const handleSubmit =async (e) => {
      e.preventDefault();
      setError("")
      setLoading(true);
      const payload={
        email,
        password
      }
       await  axios.post("http://localhost:8080/users/login", payload).then((res)=>{
        // setUserName(res.data.displayName)
        const user=(res)
        // userLogin(res.data.token)
        toast({
          position : 'top',
          colorScheme : 'green', 
          status : "success",
          title:res.data.msg
        })
        if(res.data.token){
          localStorage.setItem("logintoken",res.data.token)
          navigate(res.data.administration === true ? '/admin' : '/')
        }
        else{
         navigate("/  ")
        }
        console.log(user)
        setLoading(false)
      })
    };

  
  
    return (
      <Box
        bgImage="url(https://i.ibb.co/0Cb6rgb/oie-Hhvrt-U7-Cmx-Ws.jpg)"
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="100%"
        Size="100%"
      >
 
        <Flex
          align="center"
          justify="center"
          m={"auto"}
          pb={130}
          h={"100vh"}
          w={["96%", "65%", "45%"]}
        >
          <Box  bg="white"  w={400} p={39} rounded="md" textAlign={"center"}>
            <Heading variant={"solid"}>LOG IN</Heading>
            <br />
            <Box></Box>
            <form 
            onSubmit={handleSubmit}
            >
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    direction={["column", "row"]}
                    placeholder={"Enter Email Address"}
                    isInvalid
                    errorBorderColor="black"
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    placeholder={"Enter Password"}
                    isInvalid
                    errorBorderColor="black"
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Checkbox
                  isInvalid
                  errorBorderColor="black"
                  id="rememberMe"
                  name="rememberMe"
                  colorScheme="purple"
                >
                  Remember me?
                </Checkbox>
  
                <Button 
                  type="submit"
                  bg="crimson"
                  _hover={"green"}
                  color="white"
                  width="full"
                  isLoading={loading}
                >
                  Login
                </Button>
                <Box alignSelf={"center"}>
                  <Text variant={"ghost"}>Or</Text>
                </Box>
                <Box>
                  <Flex
                    gap={5}
                    ml="105px"
                    align={"center"}
                    direction={{ base: "column", md: "column", lg: "row" }}
                  >
                    <Box>
                      <Button 
                      // onClick={handleGoogleLogin} 
                      variant="outline" colorScheme={"#50b6ff"}>
                        <FcGoogle />
                      </Button>
                    </Box>
                    <Box>
                      <Button 
                      // onClick={handleFBlogin}
                       variant="outline" colorScheme={"#50b6ff"}>
                        <BsFacebook />
                      </Button>
                    </Box>
                  </Flex>
                  <br />
                  <Text ml="40px">
                    New to Tata CLiq{" "}
                    <Link color="blue" to="/signup">
                      Create an account
                    </Link>
                  </Text>
                </Box>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Box>
    );
  }