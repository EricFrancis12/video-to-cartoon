function sortFileNames(array) {
    return array.sort((a, b) => {
        const numberA = parseInt(a.match(/\d+/)[0]);
        const numberB = parseInt(b.match(/\d+/)[0]);
        return numberA - numberB;
    })
}



function formatDate(timestamp) {
    const d = new Date(timestamp);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${month}-${day}-${year}_${hours}_${minutes}_${seconds}`;
}





module.exports = {
    sortFileNames,
    formatDate
};