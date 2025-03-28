import React, { useState } from "react";
import styles from "./NoteCard.module.scss";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import AddNote from "../AddNote/AddNote";
import {archiveNotesApiCall,trashNotesApiCall,restoreNoteApiCall,
  deleteNoteForeverApiCall,unarchiveNotesApiCall,changeColorNoteApi,
  addUpdateReminderNotes,} from "../../utils/Api";
import { Popover, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";  // Clock icon for reminder
import ClearIcon from "@mui/icons-material/Clear"; 


export default function NoteCard({noteDetails,container,updateList,...props}) {

  const navigate=useNavigate();
  const [editNote, setEditNote] = useState(false);                 
  const [showIcons, setShowIcons] = useState(false);                
  const [anchorEl, setAnchorEl] = useState(null);                 
  const [showColorPalette, setShowColorPalette] = useState(false);  
  const open = Boolean(anchorEl);
  const [anchorElReminder, setAnchorElReminder] = useState(null); 
  const openReminder = Boolean(anchorElReminder);
  const [showDateTimeInput, setShowDateTimeInput] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [repeat, setRepeat] = useState("");

  const handleReminderClick = (event) => {
    setAnchorElReminder(event.currentTarget);
  };

  const handleReminderClose = () => {
    setAnchorElReminder(null);
    setShowDateTimeInput(false); 
  };

  const handlePickDateTime = () => {
    setShowDateTimeInput(true);
  };

  const handleSaveReminder = async () => {
    if (!dateTime) {
      alert("Please select a date and time!");
      return;
    }

    const reminderData = {
      reminder: new Date(dateTime).toISOString(),
      noteIdList: [noteDetails.id], 
    };

    addUpdateReminderNotes(reminderData)
      .then(() => {
        navigate("/dashboard/reminders") 
        handleReminderClose();
      })
      .catch(() => {
      });
};

  const handleMenuClick = (event) => {                       
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {                                 
    setAnchorEl(null);
  };

  const handleNotesIconsClick = (action, data = null) => {      
    const archivePayload = { noteIdList: [noteDetails.id], isArchived: true };
    const unarchivePayload = {
      noteIdList: [noteDetails.id],
      isArchived: false,
    };
    const trashPayload = { noteIdList: [noteDetails.id], isDeleted: true };
    const restorePayload = { noteIdList: [noteDetails.id], isDeleted: false };
    const deleteForeverPayload = { noteIdList: [noteDetails.id] };

    if (action === "archive") {
      archiveNotesApiCall(archivePayload)                                                     
        .then(() => {
          updateList(noteDetails, 'archive');                                       
        })
        .catch((error) => console.log("Archive Note Error: ", error));
    } 
    
    else if (action === "unarchive") {
      unarchiveNotesApiCall(unarchivePayload)
        .then(() => updateList(noteDetails, 'unarchive'))
        .catch((error) => console.log("Unarchive Note Error: ", error));
    } 
    
    else if (action === "delete") {
      trashNotesApiCall(trashPayload)
        .then(() => updateList(noteDetails, 'delete'))
        .catch((error) => console.log("Trash Note Error: ", error));
    } 
    
    else if (action === "restore") {
      restoreNoteApiCall(restorePayload)
        .then(() => updateList(noteDetails, 'restore'))
        .catch((error) => console.log("Restore Note Error: ", error));
    } 
    
    else if (action === "deleteForever") {
      deleteNoteForeverApiCall(deleteForeverPayload)
        .then(() => updateList(noteDetails, 'deleteForever'))
        .catch((error) => console.log("Delete Forever Note Error: ", error));
    }
    handleMenuClose();       

    if (action === "edit") {                                   
      setEditNote(false);
      updateList( data, action );
    }
  };

  const handleColorChange = (color) => {
    
    const updatedNote = { ...noteDetails, color };                               
    updateList(updatedNote, "colorChange");                                        
  
    changeColorNoteApi({ noteIdList: [noteDetails.id], color })                    
      .then(() => console.log("Color Updated Successfully"))
      .catch((error) => console.error("Color Change API Error: ", error));
  
    setShowColorPalette(false);              
  };
  
  
  

  return (
    <div
      className={styles.noteCard}
      onMouseEnter={() => setShowIcons(true)}                                   
      onMouseLeave={() => setShowIcons(false)}
      style={{ backgroundColor: noteDetails.color || "#FFFFFF" }}               
    >
      <div className={styles.content} onClick={() => setEditNote(true)}>        
        <h3 className={styles.title}>{noteDetails.title}</h3>
        <p className={styles.description}>{noteDetails.description}</p>
        
        
    {noteDetails.reminder && !isNaN(new Date(noteDetails.reminder).getTime()) && (
          <div className={styles.reminder}>
            <AccessTimeIcon className={styles.reminderIcon} />
            {new Date(noteDetails.reminder).toLocaleString()}
            <ClearIcon className={styles.clearReminderIcon} />
          </div>
        )}

      </div>

      {showIcons && (
        <div className={styles.noteIcons}>
          {container === "trash" ? (                                      
            <>
              <RestoreFromTrashIcon
                className={styles.icon}
                onClick={() => handleNotesIconsClick("restore")}
                titleAccess="Restore Note"
              />
              <DeleteForeverIcon                                                 
                className={styles.icon}
                onClick={() => handleNotesIconsClick("deleteForever")}
                titleAccess="Delete Forever"
              />
            </>
          ) : container === "archive" ? (                                  
            <>
              <AddAlertIcon className={styles.icon} 
               onClick={handleReminderClick}
               titleAccess="Set Reminder"
               
               />
              <PersonAddIcon className={styles.icon} />
              <PaletteIcon
                className={styles.icon}
                onClick={() => setShowColorPalette(!showColorPalette)}
                titleAccess="Change Color"
              />
              <ImageIcon className={styles.icon} />
              <UnarchiveIcon
                className={styles.icon}
                onClick={() => handleNotesIconsClick("unarchive")}
                titleAccess="Unarchive Note"
              />
              <MoreVertIcon className={styles.icon} onClick={handleMenuClick} />
            </>
          ) : (                                                       
            <>
              <AddAlertIcon className={styles.icon} 
              
              onClick={handleReminderClick}
              titleAccess="Set Reminder"
              
              />
              <PersonAddIcon className={styles.icon} />
              <PaletteIcon
            className={styles.icon}
            onClick={() => setShowColorPalette(!showColorPalette)}
            titleAccess="Change Color"
          />
              <ImageIcon className={styles.icon}  />
              <ArchiveIcon
                className={styles.icon}
                onClick={() => handleNotesIconsClick("archive")}
                titleAccess="Archive Note"
              />
              <MoreVertIcon className={styles.icon} onClick={handleMenuClick} />
            </>
          )}
        </div>
      )}

      {showColorPalette && (                                                                                                               
              <div className={styles.colorPalette}>
                {["#F6E2DD", "#FFFFFF", "#F39F76", "#FFF8B8", "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC", "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"].map((color) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color, width: "24px", height: "24px", borderRadius: "50%", margin: "4px", cursor: "pointer" }}
                    onClick={() => handleColorChange(color)}                                      
                  ></div>
                ))}
              </div>
            )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={() => handleNotesIconsClick("delete")}>             
          Delete note
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Add label</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add drawing</MenuItem>
        <MenuItem onClick={handleMenuClose}>Make a copy</MenuItem>
        <MenuItem onClick={handleMenuClose}>Show checkboxes</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy to Google Docs</MenuItem>
        <MenuItem onClick={handleMenuClose}>Version history</MenuItem>
      </Menu>



       {/* Reminder Popover */}
       <Popover
        open={openReminder}
        anchorEl={anchorElReminder}
        onClose={handleReminderClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
       {!showDateTimeInput ? (
          <MenuItem onClick={handlePickDateTime} style={{ padding: "15px" }}>
            Pick a date & time
          </MenuItem>
        ) : (
          <div style={{ padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Date-Time Picker */}
            <TextField
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              fullWidth
              size="small"
            />

            {/* Repeat Dropdown */}
            <Select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              displayEmpty
              fullWidth
              size="small"
            >
              <MenuItem value="">Do not repeat</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>

            {/* Save & Close Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <MenuItem onClick={handleReminderClose}>Cancel</MenuItem>
              <MenuItem onClick={handleSaveReminder} style={{ fontWeight: "bold" }}>
                Save
              </MenuItem>
            </div>
          </div>
        )}
        
      </Popover>


      <Modal
        open={editNote}                                       
        onClose={() => setEditNote(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNote                                            
          expanded={true}
          noteDetails={noteDetails}
          updateList={handleNotesIconsClick}
        />
      </Modal>
    </div>
  );
}