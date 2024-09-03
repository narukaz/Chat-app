import React, { useState } from "react";
import DataContext from './dataContext'

const DataContextProvider =({children})=>{
    const [convData, setConvData]=useState([]);
    const [contacts, setContacts]= useState([]);
    const [userInfo, setUserInfo] =useState({});
    const [renderHome, setRenderHome] = useState(false)


        return (
            <DataContext.Provider value={{convData, setConvData, userInfo , setUserInfo, contacts, setContacts,setRenderHome,renderHome }}>
            {children}
            </DataContext.Provider>
        )
};

export default DataContextProvider;