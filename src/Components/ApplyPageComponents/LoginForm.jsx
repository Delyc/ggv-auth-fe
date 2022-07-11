import { useMutation } from "@apollo/client";
import Head from "next/head";
import {useRouter} from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FormButton from "./FormButton";
import { AUTH_TOKEN } from "../constant";
import { LOGIN_MUTATION } from "../../mutations/auth";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [login, { data, loading, }] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: username,
      password: password
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return alert("please fill in all fields");
    }
    console.log("Logging in");
    try {
      const {data } = await login(username, password);
      toast.success("Login successful")
      if (data) {
        console.log("Completed");
        localStorage.setItem(AUTH_TOKEN, data.login.jwt);
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        console.log("user logged in");
        setUsername("");
        setPassword("");
        router.push("/apply");
      }
      
      
    } catch (error) {
      toast.error(error.message)
    }
    

   
    // here check if the user is logged in and redirect him to the /apply
 
  

    
  };


  return (
    <div className="font-syne bg-[#d1be84] bg-cover grid grid-col-1 md:grid-cols-2 md:h-[100vh]">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to GGV" />
      </Head>
      <div className="h-[100vh]">
        <div className="w-[50px] h-40 pt-5 ml-6">
          <Image
            src="/logo.svg"
            layout="responsive"
            width={5}
            height={5}
            opacity={100}
          />
        </div>
        <h3 className="text-center text-xl mt-[3rem]">
          Welcome back, Please Login to apply for a Visa
        </h3>
        <div className="flex justify-center">
          <form
            onSubmit={onSubmit}
            className="pt-6 pb-8 mb-4 mt-[5rem] border-2 rounded-lg shadow-md px-7 border-gray "
          >
            <div className="mb-6">
              <label className="text-lg md:text-xl">Email or Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                name="username"
                onChange={onChangeUsername}
                placeholder="Enter Your Email"
                value={username}
              />
            </div>

            <div className="mb-4">
              <label className="text-lg md:text-xl">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Enter Password"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mt-5 ml-[8vh]">
              <FormButton buttonInfo={loading ? "Sending" : "Login"} />
            </div>
            <div className="text-sm mt-3  cursor-pointer">
              <h3 className="hover:text-green">Forgot Password?</h3>
              <Link href="/login">
                <h3 className="hover:text-green mt-3">
                  Dont have an Account? Sign in
                </h3>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex bg-[url('/apply_for_visa_bg.png')]  bg-cover bg-no-repeat sm:bg-center md:bg-bottom lg:bg-bottom xl:bg-bottom 2xl:center">
        <div className="mt-[50px] md:mt-[150px] mx-4 md:mx-12">
          <h3
            className=" text-white
           text-4xl md:text-5xl lg:text-6xl font-semibold"
          >
            GGV
          </h3>
          <p className="max-w-md md:max-w-xl text-2xl md:text-4xl mt-5 text-white">
            Your gateway to <br></br>environmental tourism
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
