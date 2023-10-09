export const formatDate = (inputDate) => {

    const parts = inputDate.split("-");

    if (parts.length === 3) {
        const [year, month, day] = parts;

        // Get the name of the month based on the numeric value
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const monthName = monthNames[Number(month) - 1]; // Subtract 1 because month array is 0-indexed

        return `${monthName} ${day}, ${year}`;
    }
    return inputDate; // Return as-is if the input format is not as expected
};

export const formatDateForOrderItem = (inputDate) => {

    const parts = inputDate.split("-");
	
    if (parts.length === 3) {
        const [year, month, day] = parts;

        // Get the name of the month based on the numeric value
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const monthName = monthNames[Number(month) - 1]; // Subtract 1 because month array is 0-indexed
        console.log(`${monthName} ${day}`);
        return `${monthName} ${day}`;
    }
    return inputDate; // Return as-is if the input format is not as expected
};
