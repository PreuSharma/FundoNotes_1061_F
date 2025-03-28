import React, { useState } from "react";
import { addNoteApiCall, editNotesApiCall } from "../../utils/Api";
import "./AddNote.scss";
import AddAlertIcon from "@mui/icons-material/AddAlert"; 
import PersonAddIcon from "@mui/icons-material/PersonAdd"; 
import PaletteIcon from "@mui/icons-material/Palette"; 
import ImageIcon from "@mui/icons-material/Image"; 
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert"; 
import UndoIcon from "@mui/icons-material/Undo"; 
import RedoIcon from "@mui/icons-material/Redo";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined"; 




export default function AddNote({updateList,expanded = false,noteDetails = null}) 
{
  
  let [title, setTitle] = useState(noteDetails ? noteDetails.title : "");                  
  let [description, setDescription] = useState(noteDetails ? noteDetails.description : ""); 
  const [isExpanded, setIsExpanded] = useState(expanded);                                   

  const handleAddNote = () => {
    if (isExpanded && !noteDetails) 
    {
      addNoteApiCall({ title, description })                      
        .then((response) => {
          updateList({ title, description }, "add");              
          setTitle("");                                          
          setDescription("");                                 
        })
        .catch((error) => {
          console.log("Add Note Error : ", error);
        });
    }

    if (noteDetails) 
    {
      editNotesApiCall({...noteDetails,title,description,noteId: noteDetails.id})
      .then(()=>  updateList("edit", {...noteDetails,title,description,id: noteDetails.id,}))
    }

    setIsExpanded(!isExpanded);
  };

  const [anchorEl, setAnchorEl] = useState(null);      
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {                      
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {                           
    setAnchorEl(null);
  };



  return (
    <div className="note-container">
      {!isExpanded ? (                                        
        <div className="take-note" onClick={handleAddNote}>  
          <span>Take a note...</span>                         
          <div className="take-note-icons">        
            <IconButton>
              <CheckBoxOutlinedIcon />
            </IconButton>
            <IconButton>
              <BrushOutlinedIcon />
            </IconButton>
            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>
          </div>
        </div>
      ) : (                                                 
        <div className="note-expanded">
          <input                                            
            value={title} 
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle((title = e.target.value))}
          />
          <textarea                                        
            value={description}
            placeholder="Take a note..."
            onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto"; 
              e.target.style.height = e.target.scrollHeight + "px"; 
            }}
            style={{
              width: "100%",
              minHeight: "30px", 
              maxHeight: "300px",
              resize: "none",
              overflow: "hidden", 
              border: "none", 
              outline: "none", 
              background: "transparent",
              fontSize: "16px",
              padding: "5px", 
            }}
          />


          {/* Icons Row */}
          <div className="note-icons-close">
            <div className="note-icons">
              <AddAlertIcon className="icon" />
              <PersonAddIcon className="icon" />
              <PaletteIcon className="icon" />
              <ImageIcon className="icon" />
              <ArchiveIcon className="icon" />
              <MoreVertIcon className="icon" onClick={handleMenuClick} />

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                <MenuItem onClick={handleMenuClose}>Make a Copy</MenuItem>
                <MenuItem onClick={handleMenuClose}>Labels</MenuItem>
              </Menu>

              <UndoIcon className="icon" />
              <RedoIcon className="icon" />
            </div>

            <div className="close-btn">
              <button onClick={handleAddNote}>Close</button>         
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
