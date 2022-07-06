import { gql, useMutation } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef } from "react";
import styles from "../../../styles/Home.module.css";

const reg = gql`
  mutation joinUs($username: String!, $email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      jwt
      user {
        id
        email
      }
    }
  }
`;

const JoinUs = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [email, setEmail] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [joinUs, { data, loading, error }] = useMutation(reg, {
    variables: {
      email: email,
      password: password
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return alert("please fill in all fields");
    }
    joinUs(password, email);

    setEmail("");
    setPassword("");
    setUsername("");
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
            className={`${
              styles.headings
            }  ${"text-center text-3xl md:text-4xl mb-5 font-semibold"}`}
          >
            Apply for Global Green Visa
          </h3>
          <form
            onSubmit={onSubmit}
            className="shadow-md rounded-lg px-7 pt-6 pb-8 m-4 lg:mx-12 xl:mx-auto border-gray border-2 font-Syne "
          >
            <div className="mb-4">
              <label className="text-lg md:text-xl">Email</label>
              <input
                type="email"
                ref={emailInputRef}
                value={email}
                onChange={onChangeEmail}
                placeholder=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="text-lg md:text-xl">Password</label>
              <input
                type="password"
                ref={passwordInputRef}
                value={password}
                onChange={onChangePassword}
                placeholder=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mt-5 ml-[8vh]">
              <button
                className="shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 md:text-xl bg-[#418d89] rounded-sm mt-8 mb-3 py-1"
                onClick={onSubmit}
              >
                Proceed to payment
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
      <>
        {data && (
          <div>
            <h1>Token: {data.register?.jwt}</h1>
            <span>UserID: {data.register.user?.id} </span>
            <span>UserEmail: {data.register.user?.email} </span>
          </div>
        )}
      </>
    </div>
  );
};

export default JoinUs;
