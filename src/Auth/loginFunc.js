// Check if the user is logged in by checking the presence of "userData" in localStorage
export const isLoggedIn = () => {
    let data = localStorage.getItem("userData");
    if (data !== null) {
        return true;
    } else {
        return false;
    }
};

// Get the current user's details if they are logged in
export const getCurrentUserDetails = () => {
    if (isLoggedIn()) {
        const userData = localStorage.getItem("userData");
        const parsedData = JSON.parse(userData);
        return parsedData.user;
    } else {
        return null;
    }
};
