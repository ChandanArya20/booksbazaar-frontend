
// export const doLogin=(data,next)=>{
//     localStorage.setItem("userData",JSON.stringify(data))
//     next()
// }
export const isLoggedin=()=>{
    let data=localStorage.getItem("userData")
    if(data!=null)
        return true
    else
        return false
}

// export const doLogout=(next)=>{
//     localStorage.removeItem("userData")
//     next()
// }

export const getCurrentUserDetails = () => {
    if (isLoggedin()) {
      const userData = localStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      return parsedData.user;
    } else {
      return null;
    }
  };
  