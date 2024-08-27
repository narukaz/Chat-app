import React, { useState } from "react";
import DataContext from './dataContext'

const DataContextProvider =({children})=>{
    const [convData, setConvData]=useState([]);
    const [contacts, setContacts]= useState([]);
    const [userInfo, setUserInfo] =useState({});


        return (
            <DataContext.Provider value={{convData, setConvData, userInfo , setUserInfo, contacts, setContacts }}>
            {children}
            </DataContext.Provider>
        )
};

export default DataContextProvider;