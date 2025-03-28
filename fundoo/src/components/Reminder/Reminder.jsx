import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { getReminderNotesApi, removeReminderApi } from "../../utils/Api";
import styles from "./Reminder.module.scss";
import ClearIcon from "@mui/icons-material/Clear";
import SideBar from "../SideBar/SideBar";
import { useOutletContext } from "react-router-dom";



export default function Reminder() {
  const [reminderNotes, setReminderNotes] = useState([]);
  const { isListView } = useOutletContext();

  useEffect(() => {
    fetchReminderNotes();
  }, []);

  const fetchReminderNotes = async () => {
    try {
      const response = await getReminderNotesApi();
      console.log("Reminder Notes:", response.data.data);
      setReminderNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching reminder notes:", error);
    }
  };

  const handleRemoveReminder = async (noteId) => {
    try {
      console.log(noteId);
      await removeReminderApi({ noteIdList: [noteId] });
      setReminderNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, reminder: [] } : note 
        )
      );
      fetchReminderNotes();
    } catch (error) {
      console.error("Failed to remove reminder:", error);
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };



  return (
    <div className={styles.container}>
      <div className={styles.sidebarIcons}>
        <SideBar />
      </div>
      <h2 className={styles.heading}>Reminder Notes</h2>
      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
      >
        {reminderNotes.length > 0 ? (
          reminderNotes.map((note, index) => (
            <div
              key={note.id}
              className={styles.noteCard}
              style={{
                backgroundColor: note.color || "#FFFFFF",
                marginBottom: "10px",
                transform: `translateY(-${index % 2 === 0 ? 5 : 0}px)`, 
              }}
            >
              <h3 className={styles.title}>{note.title}</h3>
              <p className={styles.description}>{note.description}</p>
              {note.reminder?.length > 0 && ( 
                <div className={styles.reminderSection}>
                  <p className={styles.reminderText}>
                    📅 {new Date(note.reminder[0]).toLocaleString()} 
                  </p>
                  <ClearIcon
                    className={styles.removeIcon}
                    onClick={() => handleRemoveReminder(note.id)}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noNotes}>No Reminder Notes</p>
        )}
      </Masonry>
    </div>
  );
}
