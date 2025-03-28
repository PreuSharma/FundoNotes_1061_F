import React from 'react';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import DashboardContainer from './components/DashboardContainer/DashboardContainer';
import NotesContainer from './components/NotesContainer/NotesContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer';
import TrashContainer from './components/TrashContainer/TrashContainer';
import ProtectedRoute from "./Routing/ProtectedRoute";
import userAuth from './Routing/UserAuth';
import Reminder from './components/Reminder/Reminder';



export default function RoutingModule() {

    const route = createBrowserRouter([
        {
            path: "/",
            element: userAuth() ? <Navigate to="/dashboard/notes" replace /> : <Login />,
          },
          {
            path: "/signup",
            element: userAuth() ? <Navigate to="/dashboard/notes" replace /> : <Signup />,
          },
        {
            path:'dashboard',
            element: (
                <ProtectedRoute>  
                    <DashboardContainer />
                </ProtectedRoute>
            ),
            children:[
                {
                    path:'notes',
                    element:<NotesContainer />
                },
                {
                    path:'archive',
                    element:<ArchiveContainer />
                },
                {
                    path:'trash',
                    element:<TrashContainer />
                },
                {
                    path:'reminders',
                    element:<Reminder />
                }
            ]
        }
    ]);
  return (
        <RouterProvider router={route} />
  )
}
