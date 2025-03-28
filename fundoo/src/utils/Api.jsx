import axios from "axios"

export const loginApiCall = (payload) => {
    return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/login', payload,
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log("Login Response:", response.data);
            return response.data; 
        })
        .catch(error => {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            return null; 
        });
};

export const signupApiCall = (payload) => {
    return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', payload)
        .then(response => {
            console.log("Signup Response:", response.data);
            return response.data;  
        })
        .catch(error => {
            console.error("Signup Error:", error.response ? error.response.data : error.message);
            return null; 
        });
};





export const addNoteApiCall = (payload) => {
    return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes', payload, {
        headers: {
            Authorization: localStorage.getItem('token'),
            
        }
    })
    .then(response => {
        console.log("Add Note Response:", response.data);
        return response.data;
    })
    .catch(error => {
        console.log("Add Note Error:", error.response ? error.response.data : error.message);
        throw error;
    });
}

export const getNotesApiCall = () => {
    return axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', {
        headers: {
            Authorization: localStorage.getItem('token'),
           
        }
    })
    .then(response => {
        // console.log("Get Notes Response: ", response.data);
        return response.data;
    })
    .catch(error => {
        console.log("Get Notes Error:", error.response ? error.response.data : error.message);
        throw error;
    });
}



export const archiveNotesApiCall = (payload) => {
    return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes', payload, {
        headers: {
            Authorization: localStorage.getItem('token'),
            
        }
    })
    .then(response => {
        console.log("Archive Response:", response.data);
        return response.data;
    })
    .catch(error => {
        console.log("Archive Error:", error.response ? error.response.data : error.message);
        throw error;
    });
}


export const trashNotesApiCall = (payload) => {
    return axios
      .post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
  };




  export const getArchiveNotesApiCall = () => {
    return axios
      .get(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/getArchiveNotesList",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            
          },
        }
      )
  };



  export const getTrashNotesApiCall = () => {
    return axios
      .get(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            
          },
        }
      )
  };



  
  export const editNotesApiCall = (payload) => {
    return axios
      .post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            
          },
        }
      )
  };



  export const deleteNoteForeverApiCall = (payload) => {
    return axios
      .post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            
          },
        }
      )
  };



  export const restoreNoteApiCall = (payload) => {
    return axios
      .post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            
          },
        }
      )
  };



  export const unarchiveNotesApiCall= (payload) => {
    return axios
      .post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            
          },
        }
      )
  };



  export const changeColorNoteApi= (payload) => {
    return axios
      .post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            
          },
        }
      )
  };






  export const addUpdateReminderNotes = (reminderData) => {
    return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/addUpdateReminderNotes',
      reminderData,
       {
        headers: {
            Authorization: localStorage.getItem('token'),
            
        }
    })
    .then(response => {
        console.log("update reminder notes Response: ", response.data);
        return response.data;
    })
    .catch(error => {
        console.log("update reminder notes Error:", error.response ? error.response.data : error.message);
        throw error;
    });
}





export const removeReminderApi = (noteid) => {
  return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/removeReminderNotes',
    noteid,
     {
      headers: {
          Authorization: localStorage.getItem('token'),
          
      }
  })
  .then(response => {
      console.log("update reminder notes Response: ", response.data);
      return response.data;
  })
  .catch(error => {
      console.log("update reminder notes Error:", error.response ? error.response.data : error.message);
      throw error;
  });
}










export const getReminderNotesApi = () => {
  return axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getReminderNotesList',
  
     {
      headers: {
          Authorization: localStorage.getItem('token'),
          
      }
  })
  .then(response => {
      console.log("Get reminder notes Response: ", response.data);
      return response.data;
  })
  .catch(error => {
      console.log("Get reminder notes Error:", error.response ? error.response.data : error.message);
      throw error;
  });
}
