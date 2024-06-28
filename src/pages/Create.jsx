import React, { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {

  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const clickHandler = (e) =>{
    e.preventDefault();
    axios.post("https://667d39a9297972455f641efb.mockapi.io/crudApp/users", {
      name: name,
      email: email,
    }).then((res)=> console.log(res)).catch((err)=> console.log(err)).then(()=> navigate("/"))

  }
  return (
    <div className="w-full min-h-screen pt-28 dark:bg-zinc-800 bg-zinc-100 dark:text-slate-50 relative">
      <div
        className="hover:cursor-pointer absolute right-10 top-5 px-4 py-2 rounded-xl"
        onClick={handleThemeSwitch}
      >
        {theme === "light" ? (
          <span className="flex items-center border border-slate-700 p-2 rounded-xl text-sm font-medium">
            <MdOutlineDarkMode fontSize={"1.5rem"} style={{ color: "black" }} />
            <span className="ml-2">Dark Mode</span>
          </span>
        ) : (
          <span
            className={`flex items-center border border-slate-200 p-2 rounded-xl text-sm font-medium ${
              theme === "dark" ? "text-slate-50" : null
            } hover:ring ring-offset-inherit ring-blue-400 transition-all duration-150`}
          >
            <MdOutlineLightMode
              fontSize={"1.5rem"}
              style={{ color: "white" }}
            />
            <span className="ml-2">Light Mode</span>
          </span>
        )}
      </div>

      {/* Form */}

      <form method="post" className="flex flex-col gap-5 w-10/12 mx-auto">
        <label htmlFor="name" className="text-lg font-semibold">Name:</label>
        <input className="p-2 text-black bg-slate-300 rounded mb-5" value={name} onChange={(e)=> setName(e.target.value)} type="text" id="name" />
        <label htmlFor="email" className="text-lg font-semibold">Email:</label>
        <input className="p-2 text-black bg-slate-300 rounded" value={email} onChange={(e)=> setEmail(e.target.value)} type="text" id="email" />
        <button className="bg-blue-500 w-fit px-4 py-2 rounded-lg text-white font-semibold mt-10" onClick={(e)=> clickHandler(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Create;
