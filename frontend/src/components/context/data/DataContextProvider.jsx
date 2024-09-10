import React, { useState } from "react";
import DataContext from './dataContext'

const DataContextProvider =({children})=>{
    const [messages, setMessages]=useState([]);
    const [contacts, setContacts]= useState([]);
    const [userInfo, setUserInfo] =useState({});
    const [toggleAddFriend, setToggleAddFriend ] = useState(false);
    return (
            <DataContext.Provider value={{messages, setMessages, userInfo , setUserInfo, contacts, setContacts,toggleAddFriend, setToggleAddFriend   }}>
            {children}
            </DataContext.Provider>
        )
};

export default DataContextProvider;