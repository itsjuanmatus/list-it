import React from 'react';
import Head from 'next/head';

export default function Login() {
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // save access token to session storage
        localStorage.setItem('accessToken', res.access_token);
        // redirect to home page
        window.location.href = '/';
      });
  };
  return (
    <div className="min-h-screen flex bg-black items-center w-full justify-center">
      <Head>
        <title>Login</title>
        <meta name="description" content="List it login" />
      </Head>
      <form
        className="w-full md:w-[30vw] h-screen shadow-lg flex flex-col items-center justify-center gap-y-3 px-5 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="w-full items-start flex flex-col gap-y-1">
          <label className="text-gray-500 font-light"> Email </label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            placeholder="example@listit.com"
            className="w-full border-gray-200 border-solid border-2 rounded-lg p-2
              placeholder-gray-400 placeholder:font-light"
            onChange={handleChange}
          />
        </div>
        <div className="w-full items-start flex flex-col gap-y-1">
          <label className="text-gray-500 font-light"> Password </label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="********"
            className="w-full border-gray-200 border-solid border-2 rounded-lg p-2
            placeholder-gray-400 placeholder:font-light"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Login
        </button>
      </form>
      <div className="hidden lg:flex w-[70vw] flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
          Something will go here
        </h1>
      </div>
    </div>
  );
}
