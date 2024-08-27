import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Inputs from "../inputs/Inputs";
import api from "../../axios/api";

function Signup() {
  const [enter, setEnter] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleKeyDownID = (event) => {

    if (event.key === "Enter") {
     
    }
  };

  const handleKeyDownEmail = (event) => {
    if (event.key === "Enter") {
      
    }
  };

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      if (!userName || !email || !password) return setError("input id or username")
      else{
    
      api.post('/sign-up',{userName,email,password}).then((res)=> {
      if(res.data.error === false) {
        console.log(res.data)
        navigate('/')}
      })
      .catch((error)=>{
       return setError(error.response.data.message);
      }
            
      );
    }}};
        

  return (
    <div className="flex justify-center items-start mt-[200px] rounded-xl bg-1f86fc h-[100%] w-full overflow-hidden bg-app-bg">
      <div className="p-2 flex flex-col gap-[20px]">
        <Inputs
          handleKeyDown={handleKeyDownID}
          value={userName}
          setValue={setUserName}
          inputType="text"
          placeholder="email or username"
        />

        <Inputs
          value={email}
          handleKeyDown={handleKeyDownEmail}
          setValue={setEmail}
          inputType="email"
          placeholder="input email"
        />

        <Inputs
          value={password}
          handleKeyDown={handleKeyDownPassword}
          setValue={setPassword}
          inputType="password"
          placeholder="password"
        />

        {error && (
          <h3 className="text-text-muted font-fira text-center">{error}</h3>
        )}

        {
          <h3 className="text-text-primary text-center">
            Already have an account?{" "}
            <Link to="/" className="text-accent-blue">
              signin
            </Link>
          </h3>
        }
      </div>
    </div>
  );
}

export default Signup;
