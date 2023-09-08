import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const {setCart, getAllCartItems}=useContext(CartContext)


  const loginUser = (data, next) => {
    console.log("IN UserCOntext-loginUser");
    localStorage.setItem("userData", JSON.stringify(data));
    getAllCartItems()
    setCurrentUser(data.user);
    next();
  };

  const isUserLoggedin = () => {
    let data = localStorage.getItem("userData");
    if(data!=null)
        return true
    else
        return false
  };

  const logoutUser = (next) => {
    console.log("RAm");
    localStorage.removeItem("userData");
    setCurrentUser(null);
    setCart([])
    next();
  };

  const getCurrentUserDetails = () => {
    if (isUserLoggedin()) {
      const userData = localStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      return parsedData.user;
    } else {
      return null;
    }
  };

  useEffect(() => {
    setCurrentUser(getCurrentUserDetails());
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, loginUser,logoutUser, isUserLoggedin, getCurrentUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
