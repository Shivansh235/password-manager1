import  { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid"; // it will generate a unique id to any element.

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  // whenever we change any of the form input this useEffect will run one time for sure.
  useEffect(() => {
    let passwords = localStorage.getItem("passwords"); // it checks in localstorage if any variable passwords exist then get it.
    if (passwords) {
      // if yes then parse as obj to to setpasswordArray now same content go to passwordArray in the form of obj which is present in string in passwords.
      setpasswordArray(JSON.parse(passwords)); //convert string into obj and store in local storage
    }
  }, []);

  const showPassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("Eye.svg")) {
      ref.current.src = "./public/Crosseye.svg";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "./public/Eye.svg";
      passwordref.current.type = "password";
    }
  };

  const copyText = (text) => {
    toast("Copy to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    // basically this function help to copy seprately the different input onclicking
    navigator.clipboard.writeText(text);
  };

  //{ ...form, id: uuidv4() }-> this code is 1st broke the form by operater(...)then give evry content to unique id by uuidv4();
  const savePassword = () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]); // this line says that (...) operator copies all the old items that present in passwordArray and add new item form to it then set it to passwordArray.
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    ); // this line that it converts the above object into string and store it into passwords variable in localstorage
    console.log([...passwordArray, form]); // evry change in form it store the value as it is array.
    setform({ site: "", username: "", password: "" });
    toast("Saved Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const editPassword = (id) => {
    console.log("Edit all the content of that id:", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    console.log("delete all the content of that id:", id);
    const c = confirm("Are you sure to delete the password!");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id)); // filter fun make a new array of content which satisfy the condition.
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id === id))
      );
    }
    toast("Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: [e.target.value] }); // first we will spread the form then put the content of value in name.
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
  <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
</div>

<div className="mycontainer px-4">

  {/* Heading Section */}
  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
    <h1 className="text-blue-700 font-semibold text-3xl sm:text-4xl">
      <span className="text-purple-900">&lt;</span>Pass
      <span className="text-purple-900">OP/&gt;</span>
    </h1>
    <p className="text-blue-700 font-medium text-lg">Your Own Password Manager</p>
  </div>


  {/* Input Fields */}
  <div className="flex flex-col px-4 py-14 gap-4 sm:gap-8 max-w-lg mx-auto">
    <input
      value={form.site}
      onChange={handleChange}
      placeholder="Enter website URL"
      className="rounded-full border-purple-950 w-full px-4 py-2 border-2"
      type="text"
      name="site"
      id="site"
    />


    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <input
        value={form.username || ""}
        onChange={handleChange}
        placeholder="Enter Username"
        className="rounded-full border-purple-950 w-full px-4 py-2 border-2"
        type="text"
        name="username"
        id="username"
      />


      <div className="relative w-full">
        <input
          ref={passwordref}
          value={form.password || ""}
          onChange={handleChange}
          placeholder="Enter Password"
          className="rounded-full border-purple-950 w-full px-4 py-2 border-2"
          type="password"
          name="password"
          id="password"
        />
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={showPassword}
        >
          <img ref={ref} width={22} src="/Eye.svg" alt="Eye" />
        </span>
      </div>
    </div>
  </div>

  {/* Add Password Button */}
  <div
    onClick={savePassword}
    className="flex items-center justify-center gap-2 bg-purple-300 border-2 border-purple-600 rounded-full py-2 px-4 w-fit mx-auto hover:bg-purple-400 cursor-pointer"
  >
    <lord-icon
      src="https://cdn.lordicon.com/sbnjyzil.json"
      trigger="hover"
      stroke="bold"
      state="hover-swirl"
      colors="primary:#4030e8,secondary:#8930e8"
    ></lord-icon>
    <button className="text-blue-700 text-md font-semibold">Add Password</button>
  </div>

  {/* Passwords Table */}
  <div className="passwords mt-8">
    <h2 className="font-bold text-2xl py-2 text-center text-purple-900">Your Passwords</h2>

    {passwordArray.length === 0 ? (
      <div className="text-center text-base text-purple-800">No passwords to show</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-md overflow-hidden mb-4 border border-purple-800">
          <thead className="bg-purple-800 text-blue-300">
            <tr>
              <th className="px-3 sm:px-5 py-2 text-left">Site</th>
              <th className="px-3 sm:px-5 py-2 text-center">Username</th>
              <th className="px-3 sm:px-5 py-2 text-center">Password</th>
              <th className="px-3 sm:px-5 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-purple-100">
            {passwordArray.map((item, index) => (
              <tr key={index}>
                <td className="border border-white px-3 py-2 flex items-center">
                  <a href={item.site} target="_blank" rel="noopener noreferrer">
                    {item.site}
                  </a>
                  <img
                    onClick={() => copyText(item.site)}
                    className="invert hover:bg-green-950 cursor-pointer mx-2 w-5"
                    src="/copy.svg"
                    alt="Copy"
                  />
                </td>

                <td className="border border-white text-center px-3 py-2">
                  <div className="flex justify-center items-center">
                    <span>{item.username}</span>
                    <img
                      onClick={() => copyText(item.username)}
                      className="invert hover:bg-green-950 cursor-pointer mx-2 w-5"
                      src="/copy.svg"
                      alt="Copy"
                    />
                  </div>
                </td>

                <td className="border border-white text-center px-3 py-2">
                  <div className="flex justify-center items-center">
                    <span>{"*".repeat(item.password.length)}</span>
                    <img
                      onClick={() => copyText(item.password)}
                      className="invert hover:bg-green-950 cursor-pointer mx-2 w-5"
                      src="/copy.svg"
                      alt="Copy"
                    />
                  </div>
                </td>

                <td className="border border-white text-center px-3 py-2">
                  <div className="flex justify-center items-center">
                    <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        colors="primary:#4f1091,secondary:#2516c7"
                        style={{ height: "25px", width: "28px" }}
                      ></lord-icon>
                    </span>
                    <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/hwjcdycb.json"
                        trigger="hover"
                        colors="primary:#4f1091,secondary:#2516c7"
                        style={{ height: "25px", width: "28px" }}
                      ></lord-icon>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
    )}
       </div>
       </div>
</>
  )};
export default Manager;