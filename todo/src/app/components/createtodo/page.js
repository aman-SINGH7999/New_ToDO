'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFileCirclePlus, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { NotesContext } from "../../../../context/context";

export default function Createtodo() {
    const {notesId, setNotesId} = useContext(NotesContext);

    return (
        <div className="sidebarButton">
            <div className="create-todo-button" onClick={()=>setNotesId("")}><FontAwesomeIcon icon={faFileCirclePlus}/>TODO</div>
            <div className="back-button"><FontAwesomeIcon icon={faArrowLeftLong} style={{marginRight:"10px"}}/>Back</div>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-button"/>
        </div>
    )
}