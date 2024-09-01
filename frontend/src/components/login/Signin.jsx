import React, { useState, useRef, useContext } from "react";
import Inputs from "../inputs/Inputs";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../context/data/dataContext";
import api from "../../axios/api";

function Signin() {


  const [enter, setEnter] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUserInfo } = useContext(DataContext);

  const handleKeyDownID = (event) => {
    if (event.key === "Enter") {
      if (!email) {
        return setError("input id or username");
      } else if (email) {
        setEnter(true);
        return setError("");
      }
    }
  };

  const handleKeyDownPassword = async (event) => {
    if (event.key === "Enter") {
      if (!email) return setError("input id or username");
      if (!password) {
        return setError("input password");
      } else if (password) {
        api.defaults.withCredentials = true;
         await api.post("/", { email, password })
          .then((res) => {
            console.log(res.data)
            setError("")
            setUserInfo(res.data?.userInfo)
            navigate(res.data.navigate)
          })
          .catch((err) => {
            console.log(err.message)
            const errorMessage =
            err.response.data?.message || "unexpected error has occured";
            setError(errorMessage);
          });
      }
    }
  };

  return (
    <div className="flex justify-center items-start mt-[200px] rounded-xl bg-1f86fc h-[100%] w-full overflow-hidden bg-app-bg">
      <div className="p-2 flex flex-col gap-[20px]">
        <Inputs
          handleKeyDown={handleKeyDownID}
          value={email}
          setValue={setEmail}
          inputType="text"
          placeholder="input email"
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

        {
          <Link to="reset-password" className="text-accent-blue text-center">
            reset password
          </Link>
        }
        {
          <h3 className="text-text-primary text-center">
            Don't have an account?{" "}
            <Link to="sign-up" className="text-accent-blue">
              signup
            </Link>
          </h3>
        }
      </div>
    </div>
  );
}

export default Signin;
