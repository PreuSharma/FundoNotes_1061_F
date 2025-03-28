import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NoteCard from "../NoteCard/NoteCard";
import { getArchiveNotesApiCall } from "../../utils/Api.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./ArchiveContainer.scss";
import { useOutletContext } from "react-router-dom";



export default function ArchiveContainer() {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const { isListView } = useOutletContext();

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  const fetchArchivedNotes = () => {
    getArchiveNotesApiCall()
      .then((res) => {
        setArchivedNotes(res?.data?.data?.data || []);
      })
      .catch((err) => console.error("Error fetching archived notes:", err));
  };

  const updateList = (data, action) => {
    if (action === "unarchive" || action === "delete") {
      setArchivedNotes((prevNotes) => prevNotes.filter((note) => note.id !== data.id));
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };



  return (
    <div className= "sidebar" style={{ display: "flex" }}>
      <SideBar />


     <div className="card" style={{ flex: 1, marginLeft: "20px", padding: "20px" }}>
        {archivedNotes.length > 0 ? (
          isListView ? (
            <div>
              {archivedNotes.map((note) => (
                <div key={note.id} style={{ marginTop:"5rem", marginLeft:"35rem" }}>
                  <NoteCard noteDetails={note} container={"archive"} updateList={updateList} />
                </div>
              ))}
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid-2"
              columnClassName="my-masonry-grid_column"
            >
              {archivedNotes.map((note) => (
                <NoteCard key={note.id} noteDetails={note} container={"archive"} updateList={updateList} />
              ))}
            </Masonry>
          )
        ) : (
          <p>No Archived Notes</p>
        )}
      </div>
    </div>
  );
}
