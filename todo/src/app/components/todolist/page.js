'use client'

import { useContext } from "react"
import { NotesContext } from "../../../../context/context"

export default function Todolist(props) {
    const {notesId, setNotesId} = useContext(NotesContext);

    function convertDatetimeToString(datetimeStr) {
        const dateObj = new Date(datetimeStr);
        const day = dateObj.getDate();
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const month = monthNames[dateObj.getMonth()];   
      
        const year = dateObj.getFullYear();   
      
        return `${day} ${month} ${year}`;
      }

    function cropeString(myString) {
        return myString.substr(0,100)
    }

    return (
        <div 
            className={props.visible? "todo" : "todo display-none"} 
            onClick={()=>{
                setNotesId(props.note._id);
                props.setVisible(!props.visible)
            }}
            >
            <h4>{props.note.title}</h4>
            <div>
                <p>{cropeString(props.note.description)}</p>
                <p className="date" style={{marginTop:"10px", fontSize:"12px"}}>{convertDatetimeToString(props.note.updatedAt)}</p>
            </div>
        </div>
    )
}