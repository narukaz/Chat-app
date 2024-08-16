import React, { useState } from "react";
import Inputs from "../inputs/Inputs";

function Reset() {

const [email, setEmail] = useState("");

const [resetError, setResertError] = useState("");

  const handleKeyDownReset = (event) => {
    if (event.key === "Enter") {
      if (!email) {
        return setResertError("input email");
      } else if (email) {
        return setResertError("");
      }
    }
  };
  return (
  
    <div className="mt-[200px]  flex justify-start items-center flex-col gap-3 rounded-xl bg-1f86fc h-[100%] w-full overflow-hidden bg-app-bg">
       
    <h2 className="text-text-muted font-fira text-center">please! Enter email that is <br/> connected with your account</h2>
        
    <Inputs
      value={email}
      handleKeyDown={handleKeyDownReset}
      setValue={setEmail}
      inputType="text"
      placeholder="input email to reset"
      />
    {resetError && (<h3 className="text-text-muted font-fira text-center">{resetError}</h3>)}
      </div>

  );
}

export default Reset;
