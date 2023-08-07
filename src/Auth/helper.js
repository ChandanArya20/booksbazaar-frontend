import { getCurrentUserDetails } from "./loginFunc";

export const getUserAddress=async()=>{

  const currentUser=getCurrentUserDetails()
  try {
      if(currentUser){
        const response = await fetch(`http://localhost:8080/api/user/${currentUser.id}/address`);
        if (response.ok) {
              const address = await response.json();
              return address
        } else{
          return null;
        }
      }
    } catch (error) {
      console.error(error)        
    } 
}

export const getWholeUserData=async()=>{

  const currentUser=getCurrentUserDetails()
  try {
      if(currentUser){
        const response = await fetch(`http://localhost:8080/api/user/${currentUser.id}`);
          if (response.ok) {
              const user = await response.json();
              return user
          }else{
            return null;
          }
      }
    } catch (error) {
      console.error(error)        
    } 
}

