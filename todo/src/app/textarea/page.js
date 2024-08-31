'use client'
import { useContext, useState, useEffect } from "react"
import { NotesContext } from "../../../context/context";
import axios from "axios";
import Richtext from "../components/richtext/page";

import "./textarea.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";


export default function Textarea() {
  const {notesId, setNotesId} = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

const handleSave = async ()=>{
    console.log(title, description, notesId)
    try{
      if(notesId){
        const responce = await axios.put(`http://localhost:3001/api/update-note/${notesId}`,{title,description})
        console.log("RESponce : ", responce.data);
        setTitle(responce.data.notes.title);
        setDescription(responce.data.notes.description);
      }else{
        const responce = await axios.post("http://localhost:3001/api/add-note",{title,description});
          setTitle(responce.data.notes.title);
          setDescription(responce.data.notes.description);
          setNotesId(responce.data.notes._id);
      }
      setEdit(!edit);
    }catch(err){
      console.log(err);
    }
}

const handleDelete = async ()=>{
  try{
    const responce = await axios.delete(`http://localhost:3001/api/delete-note/${notesId}`);
    console.log(responce.data);
    setNotesId("");
    
  }catch(err){
    console.log(err);
  }
}

const hendleSelection = ()=>{
  alert("hi")
}

const getData = async ()=>{
  console.log("id = ",notesId)
  try{
    if(notesId){
      const responce = await axios.get(`http://localhost:3001/api/get-one-note/${notesId}`)
      console.log("data ",responce.data.notes)
      setTitle(responce.data.notes.title);
      setDescription(responce.data.notes.description);
    }
  }catch(err){
    console.log("err ",err);
  }
}

useEffect(()=>{
    if(notesId == ""){
      setTitle("");
      setDescription("");
      setEdit(false);
    }else{
      setEdit(true);
    }
    
    getData();
},[notesId]);

    return (
      <div className="textarea">
        <div className="textarea-heading">
          {
            notesId == "" || !edit
            ? <input 
                type="text" 
                placeholder="Enter Title here" 
                value={title} 
                onChange={(e)=> setTitle(e.target.value)} 
                className="inputFild"
                style={{width:"85%"}}
                required />
            : <h3>{title}</h3>
          }
          <div className="icons-update-delete">
            {
              edit 
              ? <FontAwesomeIcon icon={faPencil} className="icon icon-2" onClick={()=>setEdit(!edit)} />
              : <FontAwesomeIcon icon={faFloppyDisk} className="icon icon-2" onClick={handleSave} />
            }
            
            <FontAwesomeIcon icon={faTrashCan} className="icon" onClick={handleDelete} />
          </div>
          
        </div>
        <div>
          <Richtext />
          <hr style={{margin:"10px 0"}} />
          {
            notesId == "" || !edit
            ? <textarea 
                name="" id="" 
                rows="4" 
                placeholder="Enter Description Here" 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="inputFild"></textarea>
            :<p id="ttt" onSelect={hendleSelection}>{description}</p>
          }
        </div>
      </div>
    )
  }