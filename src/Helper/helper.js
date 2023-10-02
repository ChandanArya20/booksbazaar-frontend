import { getCurrentUserDetails } from "../Auth/loginFunc";

export const getUserAddress=async()=>{
  const currentUser=getCurrentUserDetails()
    if(currentUser){
      const response = await fetch(`http://localhost:8080/api/user/${currentUser.id}/address`);
      if (response.ok) {
            const address = await response.json();
            return address
      } else{
        return null;
      }
    }
}

export const getWholeUserData=async()=>{
  const currentUser=getCurrentUserDetails()
    if(currentUser){
      const response = await fetch(`http://localhost:8080/api/user/${currentUser.id}`);
        if (response.ok) {
            const user = await response.json();
            return user
        }else{
          return null;
        }
    }
}

export const formatDate=(inputDate)=> {

  const parts = inputDate.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;

    // Get the name of the month based on the numeric value
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[Number(month) - 1]; // Subtract 1 because month array is 0-indexed

    return `${monthName} ${day}, ${year}`;
  }
  return inputDate; // Return as-is if the input format is not as expected
}

export const formatDateForOrderItem=(inputDate)=> {

  const parts = inputDate.split('-');
  if (parts.length === 3) {
    const [month, day] = parts;

    // Get the name of the month based on the numeric value
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[Number(month) - 1]; // Subtract 1 because month array is 0-indexed

    return `${monthName} ${day}`;
  }
  return inputDate; // Return as-is if the input format is not as expected
}
