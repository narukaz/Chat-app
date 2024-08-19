import React, { useState } from "react";
import DataContext from './dataContext'

const DataContextProvider =({children})=>{
    const [convData, setConvData]=useState({

        manjeet:{conversation:[{sender:true,message:"hey how are you?"},
            {sender:false,message:"i am fine "},
            {sender:false,message:"you tell?"},
            {sender:true,message:"hustling man"},
        
        
        ],

            lastSeen:"12pm"},

        pinky:{conversation:[], lastSeen:"12pm"},
        sandeep:{conversation:[], lastSeen:"12pm"}});
        
        const [LogId, setLogId] = useState(null);
        return (
            <DataContext.Provider value={{convData, setConvData, LogId, setLogId}}>
            {children}
            </DataContext.Provider>
        )
};

export default DataContextProvider;