import React from "react";
import DataContext from './dataContext'

const DataContextProvider =({children})=>{
        return (

            <DataContext.Provider value={{data, setData}}>
            {children}
            </DataContext.Provider>

        )
};

export default DataContextProvider;