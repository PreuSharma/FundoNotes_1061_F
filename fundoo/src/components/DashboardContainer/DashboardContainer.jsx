import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function DashboardContainer() {

  const [searchQuery, setSearchQuery] = useState(""); 
  const [isListView, setIsListView] = useState(false); // State for view toggle

  return (
    <div>
       <Header setSearchQuery={setSearchQuery} isListView={isListView} setIsListView={setIsListView}  /> 
       <Outlet context={{ searchQuery , isListView  }} /> 
    </div>
  )
}
