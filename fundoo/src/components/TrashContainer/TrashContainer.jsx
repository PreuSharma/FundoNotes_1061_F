import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NoteCard from "../NoteCard/NoteCard";
import { getTrashNotesApiCall } from "../../utils/Api.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./TrashContainer.scss";
import { useOutletContext } from "react-router-dom";



export default function TrashContainer() {
  const [trashNotes, setTrashNotes] = useState([]);
  const { isListView } = useOutletContext();

  useEffect(() => {
    getTrashNotesApiCall()
      .then((res) => {
        console.log("Trash Notes API Response:", res);
        setTrashNotes(res?.data?.data?.data || []);
      })
      .catch((err) => console.error("Error fetching trash notes:", err));
  }, []);

  const updateList = (updatedNote, action) => {
    if (action === "restore" || action === "deleteForever") {
      setTrashNotes((prevNotes) => prevNotes.filter((note) => note.id !== updatedNote.id));
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  

  return (
    <div style={{ display: "flex" }}>
      <SideBar />


<div style={{ flex: 1, marginLeft: "20px", padding: "20px" }}>
        {trashNotes.length > 0 ? (
          isListView ? (
            <div>
              {trashNotes.map((note) => (
                <div key={note.id} style={{ marginTop:"5rem", marginLeft:"35rem" }}>
                  <NoteCard noteDetails={note} container={"trash"} updateList={updateList} />
                </div>
              ))}
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {trashNotes.map((note) => (
                <NoteCard key={note.id} noteDetails={note} container={"trash"} updateList={updateList} />
              ))}
            </Masonry>
          )
        ) : (
          <p>No Deleted Notes</p>
        )}
      </div>
    </div>

  );
}
