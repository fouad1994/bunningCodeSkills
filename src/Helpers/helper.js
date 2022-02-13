
export const removeWhiteSpaces = (con)=>{
    if(!Array.isArray(con)) return con;
    console.log({con})
   return  con.map((obj)=>{
        return Object.keys(obj).reduce(function(acc, key) {
            acc[key.trim()] = typeof obj[key] == 'string'? obj[key].trim() : removeWhiteSpaces(obj[key]);
            return acc;
        }, Array.isArray(obj)? []:{});
    })


}

export const downloadCSV = (fileContents)=>{
    const rows = [
        [...Object.keys(fileContents[0])],
        ...fileContents.map(o=>{
            return Object.values(o)
        })
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}
