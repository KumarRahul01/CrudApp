import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("true");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://667d39a9297972455f641efb.mockapi.io/crudApp/users"
      );
      setLoading('false');
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const deleteHandler = (id) => {
    axios
      .delete(`https://667d39a9297972455f641efb.mockapi.io/crudApp/users/${id}`)
      .then(() => getData());
  };

  const editHandler = (id, name, email) => {
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <div className="w-full min-h-screen pt-28 dark:bg-zinc-800 bg-zinc-100 dark:text-slate-50 relative">
        <div
          className="hover:cursor-pointer absolute right-10 top-5 px-4 py-2 rounded-xl"
          onClick={handleThemeSwitch}
        >
          {theme === "light" ? (
            <span className="flex items-center border border-slate-700 p-2 rounded-xl text-sm font-medium hover:ring ring-offset-inherit ring-yellow-400 transition-all duration-150">
              <MdOutlineDarkMode
                fontSize={"1.5rem"}
                style={{ color: "black" }}
              />
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

        {loading === 'true' ? (
          <>
            <h2 className="text-3xl text-center mt-20">Loading ...</h2>
          </>
        ) : (
          <>
           <h2 className="text-3xl text-center font-semibold mb-8">Users DataBase</h2>
            <table className="w-10/12 text-center mx-auto">
              <thead className="">
                <tr className="bg-slate-400 h-10">
                  <th className="pl-5">User Id</th>
                  <th className="pl-40">User Name</th>
                  <th className="pl-40">User Email</th>
                  <th className="pl-40">Edit User Details</th>
                  <th className="pl-40 pr-5">Remove User</th>
                </tr>
              </thead>
              {users.map((data, i) => {
                return (
                  <>
                    <tbody>
                      <tr className="dark:bg-slate-700 bg-zinc-300" key={i}>
                        <td className="pl-5">{data.id}</td>
                        <td className="pl-40">{data.name}</td>
                        <td className="pl-40">{data.email}</td>
                        <td className="pl-44">
                          <button
                            className="px-3 py-1 bg-blue-500 m-3 rounded-md flex justify-center items-center gap-2 text-white"
                            onClick={() => editHandler(data.id, data.name, data.email)}
                          >
                            <MdModeEdit fontSize={"1.1rem"} /> Edit
                          </button>
                        </td>
                        <td className="pl-44 pr-5">
                          <button
                            className="px-3 py-1 bg-red-500 m-3 rounded-md flex justify-center items-center gap-2 text-white"
                            onClick={() => deleteHandler(data.id)}
                          >
                            <MdDelete fontSize={"1.1rem"} /> Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
          </>
        )}
      </div>

      <div
        className="absolute right-20 bottom-28 cursor-pointer"
        onClick={() => navigate("/create")}
      >
        <IoMdAddCircle fontSize={"2.5rem"} color={["#3B82F6"]} />
      </div>
    </>
  );
};

export default App;
