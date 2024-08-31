'use client'
import "./sidebar.css" 
import { useState, useEffect, useContext } from "react";
import Todolist from "../components/todolist/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFileCirclePlus, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NotesContext } from "../../../context/context";

export default function Sidebar() {
  const {notesId, setNotesId} = useContext(NotesContext)
  const [notes, setNotes] = useState();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [visible, setVisible] = useState(true)


  const getData = async ()=>{
    console.log("pages ",page)
   
    try{
        let responce;
        searchkey ? responce = await axios.get(`http://localhost:3001/api/get-all-notes/${page}/${searchkey}`) 
        :  responce = await axios.get(`http://localhost:3001/api/get-all-notes/${page}`) 

        console.log(responce.data.notes);
        setNotes(responce.data.notes);

        const data = responce.data.total_count;
        const c = Math.ceil(data/5);
        let my_pages = [];
        for(let i=1;i<=c;i++){
          my_pages.push(i);
        }
        setPages(my_pages);
    }catch(err){
      console.log(err);
    }
  }

  function handlePage(arg) {
    console.log(arg.target.innerText);
    setPage(parseInt(arg.target.innerText))
  }

  useEffect(()=>{
    console.log("page ",page)
    getData();
  },[page,notesId,searchkey])

  return (
    <div className="sidebar">
        <div className="sidebarButton">
            <div className={visible ? "create-todo-button" : "create-todo-button display-none"} 
                onClick={()=>{
                  setNotesId("");
                  setVisible(!visible);
                }}
            ><FontAwesomeIcon icon={faFileCirclePlus}/>TODO</div>

            <div className={visible ? "back-button display-none display-hide" : "back-button display-hide"}
                onClick={()=>{
                  setVisible(!visible);
                }}
            ><FontAwesomeIcon icon={faArrowLeftLong} style={{marginRight:"10px"}}/>Back</div>

            <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className={visible ? "search-button" : "search-button display-none"} 
                onClick={()=>{
                  setIsVisible(!isVisible);
                  // setVisible(!visible);
                }}
            />
        </div>
        <div>
          <input 
            type="text" 
            className={isVisible ? "search visible" : "search" } 
            value={searchkey} 
            onChange={(e)=> setSearchkey(e.target.value)}
          />
        </div>
        {
          notes ? notes.map((note)=>{
              return (
                <Todolist 
                  key={note._id} 
                  note={note}
                  visible = {visible}
                  setVisible = {setVisible}
                />
              )
          }) : null

        }
        <div style={{display:"flex"}} className={visible? "" : "display-none"}>
          {
            pages.map((p)=>{
              return <div key={p} value={p} onClick={handlePage} className="pages page-active">{p}</div>
            })
          }
        </div>
    </div>
  )
}
