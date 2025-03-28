import React, { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotesApiCall } from "../../utils/Api.jsx"; 
import AddNote from "../AddNote/AddNote.jsx"; 
import { useOutletContext } from "react-router-dom"; 
import Masonry from "react-masonry-css"; 
import "./NotesContainer.scss";
import SideBar from "../SideBar/SideBar.jsx";



export default function NotesContainer() {
  const [notesList, setNotesList] = useState([]); 
  const { searchQuery } = useOutletContext(); 
  const { isListView } = useOutletContext(); 

  useEffect(() => {
    getNotesApiCall().then((res) => {
      const filteredNotes = res?.data?.data?.filter(
        (note) => !note.isArchived && !note.isDeleted
      );
      setNotesList(filteredNotes || []);
    });
  }, [notesList]);


  const handleNotesList = (data, action) => {

    if (action === "add") {
      setNotesList((prevNotes) => [data, ...prevNotes]);
    } 
    else if (action === "archive" || action === "delete") {
      setNotesList((prevNotes) =>
        prevNotes.filter((note) => note.id !== data.id)
      );
    } 
    else if (action === "edit" || action === "colorChange") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? data : note))
      );
      notesList.map((note) => console.log(note.id === data.id));
    }
  };

  const filteredNotes = notesList.filter(
    (note ) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const masonryBreakpoints = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };



  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
      }}
    >

      <SideBar />
      
      <AddNote updateList={handleNotesList} />

      {isListView ? (
        <div className="list-view" style={{ width: "80%", marginLeft: "200px", marginTop: "50px" }}>
          {filteredNotes.map((note) => (
            <div key={note.id} className="list-item">
              <NoteCard noteDetails={note} updateList={handleNotesList} container="notes" />
            </div>
          ))}
        </div>
      ) : (
        // Grid View: Use Masonry for the card layout
        <Masonry
          breakpointCols={masonryBreakpoints}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "80%",
            marginTop: "50px",
            marginLeft: "200px",
          }}
        >
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} container="notes" />
          ))}
        </Masonry>
      )}
    </div>
  );
}
