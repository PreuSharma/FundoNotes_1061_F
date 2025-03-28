import React from "react";
import styles from "./SideBar.module.scss"; 
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate,useLocation  } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.sidebar}>
      <div  className={`${styles.menuItem} ${location.pathname === "/dashboard/notes" ? styles.active : ""}`}
       onClick={() => navigate("/dashboard/notes")}>
        <LightbulbOutlinedIcon className={styles.icon} /> 
      </div>
      <div  className={`${styles.menuItem} ${location.pathname === "/dashboard/reminders" ? styles.active : ""}`}
      onClick={() => navigate("/dashboard/reminders")}>
        <NotificationsOutlinedIcon className={styles.icon} /> 
      </div>
      <div className={styles.menuItem}>
        <EditOutlinedIcon className={styles.icon} /> 
      </div>
      <div  className={`${styles.menuItem} ${location.pathname === "/dashboard/archive" ? styles.active : ""}`}
       onClick={() => navigate("/dashboard/archive")}>
        <ArchiveOutlinedIcon className={styles.icon} /> 
      </div>
      <div  className={`${styles.menuItem} ${location.pathname === "/dashboard/trash" ? styles.active : ""}`}
       onClick={() => navigate("/dashboard/trash")}>
        <DeleteOutlinedIcon className={styles.icon} /> 
      </div>
    </div>
  );
}
