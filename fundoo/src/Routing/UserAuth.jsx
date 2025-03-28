const userAuth = () => {
    return localStorage.getItem("token") !== null;
  };
  
  export default userAuth;
  