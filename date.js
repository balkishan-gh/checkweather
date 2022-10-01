module.exports.capitalizedName = function(name) {
    var firstChar = name.slice(0,1);
    var upperCaseFirstChar = firstChar.toUpperCase();
    var restOfName = name.slice(1, name.length);
    var restOfName = restOfName.toLowerCase();
    var capitalizedName = upperCaseFirstChar + restOfName;
    return capitalizedName;
}

module.exports.getDate = function() {
    const d = new Date();
    const options = {
        hour : "2-digit",
        minute : "2-digit",
        hour12 : false,
        timeZoneName : "short"
    }
    const time = d.toLocaleString("en-US", options);
    return time;
}