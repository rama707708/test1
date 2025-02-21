function convertDateFormat(dateString: string = '') {
    // Split date and time
    let [datePart, timePart] = dateString.split(' ');

    // Split the date into day, month, and year
    let [day, month, year] = datePart.split('-');

    // Format the date as MM/DD/YY
    return `${month}/${day}/${year}`;
}
