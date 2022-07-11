import { gql, useMutation } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/Home.module.css";
import { DELETE_USER, SIGNUP_MUTATION } from "../../mutations/auth";
import { CREATE_USER_MUTATION } from "../../mutations/auth";
import { AUTH_TOKEN } from "../constant";
import { USER } from '../constant'
import { useForm } from "react-hook-form";


const JoinUs = () => {
  const { register, handleSubmit, formState:{errors}} = useForm()
  const [username, setUsername] = useState("");
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const [email, setEmail] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const onChangeFirstName = (e) => {
    setEnteredFirstName(e.target.value);
  };
  const [enteredLastName, setEnteredLastName] = useState("");
  const onChangeLastName = (e) => {
    setEnteredLastName(e.target.value);
  };
  const [userID, setID] = useState(null)

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      username: username,
      email: email,
      password: password,

    },


  });


  const router = useRouter()

  const [addDetails] = useMutation(CREATE_USER_MUTATION,);



  const onSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      return alert("please fill in all fields");
    }
    try {
      const { data } = await signup(username, password, email);
      localStorage.setItem(AUTH_TOKEN, data.register.jwt);
      localStorage.setItem(USER, JSON.stringify(data.register.user));
      console.log(data)
      console.log(data.register.user?.id)
      console.log(data.register.user?.email)
      console.log("dataa", data)
      setID(data.register.user.id)
      try {
        const profile = await addDetails({
          variables: {
            data: {
              first_name: enteredFirstName,
              last_name: enteredLastName,
              user: userID
            }
          }
        })
        console.log(profile)
        console.log(enteredFirstName, enteredLastName, email, username, password)
        toast.success("Account created succesfully")

        setEmail("");
        setPassword("");
        setUsername("");
        router.push("/apply")
      } catch (error) {
        
        toast.error(error.message)

        console.log('error', error)
    }





    } catch (error) {
      if(error.message.includes("Email is taken")){
        return toast.error("Email is taken")
      
    }
    else{
      return toast.error("username is taken")
    }
    }
    

  };








  return (
    <div className=" font-syne " id="joinUs">
      <Head>
        <title>Welcome to GGV</title>
        <meta name="description" content="Join Our Family" />
      </Head>
      <div className="font-syne bg-[#d1be84] bg-cover grid grid-col-1 md:grid-cols-2 2xl:h-[100vh]">
        <div className="">
          <div className="w-[50px] h-40 pt-5 ml-6">
            <Image
              src="/logo.svg"
              layout="responsive"
              width={5}
              height={5}
              opacity={100}
            />
          </div>
          <h3
            className={`${styles.headings
              }  ${"text-center text-3xl md:text-4xl mb-5 font-semibold"}`}
          >
            Login or Sign Up to apply the Visa
          </h3>
          <form
            onSubmit={onSubmit}
            className="pt-6 pb-8 mb-4 border-2 rounded-lg shadow-md px-7 border-gray "
          >
            <div className="mb-4">
              <label className="text-lg md:text-xl">
                First name{" "}
                <span className="text-sm">(As They appear on passport)</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={enteredFirstName}
                onChange={(e) => onChangeFirstName(e)}
                placeholder=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg md:text-xl">
                Last name{" "}
                <span className="text-sm">(As They appear on passport)</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={enteredLastName}
                onChange={(e) => onChangeLastName(e)}
                placeholder=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg md:text-xl">username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => onChangeUsername(e)}
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label className="text-lg md:text-xl">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                name="email"
                onChange={onChangeEmail}
                placeholder="Enter Your Email"
                value={email}
              />
            </div>
            <div className="mb-4">
              <label className="text-lg md:text-xl">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>



            <div className="mt-5 ml-[8vh]">
              <button className="shadow bg-green focus:shadow-outline focus:outline-none text-white font-bold px-6 md:text-xl bg-[#418d89] rounded-sm mt-8 mb-3 py-1">
                {loading ? "Sending" : "Join Us"}
              </button>
            </div>
          </form>
        </div>

        <div className="md:flex hidden text-white bg-[url('/apply_for_visa_bg.png')]  bg-cover bg-no-repeat sm:bg-center md:bg-bottom lg:bg-bottom xl:bg-bottom 2xl:center">
          <div className="mt-[50px] md:mt-[150px] mx-4 md:mx-12">
            <h3 className="  text-4xl md:text-5xl lg:text-6xl font-semibold">
              GGV
            </h3>
            <p className="max-w-md md:max-w-xl text-2xl md:text-4xl mt-5">
              Your gateway to <br></br>environmental tourism
            </p>
          </div>
          <div></div>
        </div>
      </div>

    </div>
  );
};

export default JoinUs;
