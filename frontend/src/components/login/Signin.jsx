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
  const { setUser } = useContext(DataContext);

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

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      if (!email) return setError("input id or username");
      if (!password) {
        return setError("input password");
      } else if (password) {
        try {
          api.defaults.withCredentials = true;

          api.post("/", { email, password }).then((res) => {
            if (res?.data?.error === false) {
              setError("");
              console.log(res.data.message);
              // localStorage.setItem("token", res.data.token);
              setUser(res.data.userInfo.user);
              return navigate(res.data.navigate);
            } else setError(res.data.userInfo.message);
          });
        } catch (error) {
          console.log(error.message);
          setError("internal server error");
        }
      }
    }
    //api call, send user data ahead using axios
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
