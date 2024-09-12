import React, { useState } from "react";
import DataContext from './dataContext'

const DataContextProvider =({children})=>{
    const [messages, setMessages]=useState([]);
    const [contacts, setContacts]= useState([]);
    const [userInfo, setUserInfo] =useState({});
    const [selectedUser, setSelectedUser] =useState("");
    const [toggleAddFriend, setToggleAddFriend ] = useState(false);
    return (
            <DataContext.Provider value={{selectedUser, setSelectedUser,messages, setMessages, userInfo , setUserInfo, contacts, setContacts,toggleAddFriend, setToggleAddFriend}}>
            {children}
            </DataContext.Provider>
        )
};

export default DataContextProvider;