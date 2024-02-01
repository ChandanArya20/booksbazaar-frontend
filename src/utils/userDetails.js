// Check if the user is logged in by checking the presence of "userData" in localStorage
export const isUserLoggedIn = () => {
    let data = localStorage.getItem("userData");
    if (data !== null) {
        return true;
    } else {
        return false;
    }
};

// Get the current user's details if they are logged in
export const getCurrentUserDetails = () => {
    if (isUserLoggedIn()) {
        const userData = localStorage.getItem("userData");
        const parsedUserData = JSON.parse(userData);
        return parsedUserData;
    } else {
        return null;
    }
};

//fetch all saved address of user  from db
export const getUserAddress = async () => {

    const currentUser = getCurrentUserDetails();

    if (currentUser) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/user/${currentUser.id}/address`
        );
        if (response.ok) {
            const address = await response.json();
            return address;
        } else {
            return null;
        }
    }
};

//fetch all details of the user from db
export const getWholeUserData = async () => {

    const currentUser = getCurrentUserDetails();

    if (currentUser) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/user/${currentUser.id}`
        );
        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            return null;
        }
    }
};