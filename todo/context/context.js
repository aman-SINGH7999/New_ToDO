'use client'
import { createContext, useState } from "react";

export const NotesContext = createContext(null);

function Context({children}){
    const [notesId, setNotesId] = useState("");
    return(
        <NotesContext.Provider value={{notesId, setNotesId}}>
            {children}
        </NotesContext.Provider>
    )
}

export default Context;