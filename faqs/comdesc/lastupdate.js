// last_update = document.lastModified 
// document.write("<small>[Last Update: " + last_update +"]\<\/small>")
/* This prints the date of the last update */
var modDate = new Date(document.lastModified);
var year    = modDate.getYear();

if(year < 1000)
{
    year += 1900;
}

var monthArray = new Array("January",
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
                           "December");

var modString = "<small>[Last Update: "
                + monthArray[modDate.getMonth()]
                + " "
                + modDate.getDate()
                + ", "
                + year
                + "]\<\/small>";

function lastUpdate()
{
    document.write(modString);
}