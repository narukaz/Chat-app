import React, {useState, useRef, useContext} from "react";
import Inputs from "../inputs/Inputs";
import {Link, useNavigate} from 'react-router-dom'
import DataContext from "../context/data/dataContext";
import api from "../../axios/api";

function Signin() {
  const [enter, setEnter] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const {setLogId} = useContext(DataContext);

  const handleKeyDownID = (event) => {
    if (event.key === "Enter") {
      if (!userId) {
        return setError("input id or username");
      } else if (userId) {
        setEnter(true);
        return setError("");
      }}
  };
  

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      if(!userId) return setError("input id or username");
      if (!password) {
        return setError("input password");
      } else if (password) {

        try {
          api.post('/', {user:userId, password})
          .then((res)=>{
            if (res?.data?.error === false){
                setError('');
                console.log(res.data.message);
                return navigate('home');
            }
            else (setError(res.data.message));
          })
        } catch (error) {
          setError("internal server error")
        }
        
      }}
    //api call, send user data ahead using axios
    };

  return (
    <div className="flex justify-center items-start mt-[200px] rounded-xl bg-1f86fc h-[100%] w-full overflow-hidden bg-app-bg">
      <div className="p-2 flex flex-col gap-[20px]">
        <Inputs
          handleKeyDown={handleKeyDownID}
          value={userId}
          setValue={setUserId}
          inputType="text"
          placeholder="email or username"
        />
        {enter && (
          <Inputs
            value={password}
            handleKeyDown={handleKeyDownPassword}
            setValue={setPassword}
            inputType="password"
            placeholder="password"
          />
        )}
       
        {error && (
          <h3 className="text-text-muted font-fira text-center">{error}</h3>
        )}

        {<Link to="reset-password" className="text-accent-blue text-center">reset password</Link>}
        {<h3 className="text-text-primary text-center">Don't have an account? <Link to="sign-up" className="text-accent-blue">signup</Link></h3>}
        
      </div>
      </div>
  );
}

export default Signin;
