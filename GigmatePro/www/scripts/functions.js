/* THIS FILE CONTAINS THE FUNCTIONS THAT ARE USED IN DIFFERENT PAGES */

//CLASS USED FOR GIGS
class Gig
{

    set Name(value) { this._gigName = value; } get Name() { return this._gigName; }
    set Date(value) { this._gigDate = value; } get Date() { return this._gigDate; }
    set Venue(value) { this._gigVenue = value; } get Venue() { return this._gigVenue; }
    set Creator(value) { this._gigCreator = value; } get Creator() { return this._gigCreator; }
    set GenreID(value) { this._gigGenre = value; } get GenreID() { return this._gigGenre; }
    set ID(value) { this._gigID = value; } get ID() { return this._gigID; }
}

//FUNCTION TO GET THE USER DATA FROM LOGIN
function getUserData() {
    var personInfo = JSON.parse(window.localStorage.getItem("userDetails"));
}


//FUNCTION TO GET THE MUSIC GENRE FOR THE SELECT TAG 
//SELECT BOX VALUE MUST BE document.getElementById(selectbox)
function getGenres(selectBox)
{
    var xhr = $.ajax({
        type: "POST",
        url: "http://192.168.254.11/GigmatesService/Service1.svc/GetGenreList",
        contentType: "application/json; charset=utf-8",
        dataType: "json"

    }).done(function (data) {
        var genreList = data.GetGenreListResult;
        var genreSelect = selectBox;
        window.localStorage.setItem("genreList", genreList);
        var genreList = JSON.parse(data.GetGenreListResult);
        for (var i = 0; i < Object.keys(genreList).length; i++) {
            var opt = document.createElement("option");
            opt.value = genreList[i].ID.toString();
            opt.textContent = genreList[i].Name.toString();
            genreSelect.appendChild(opt);

        }


    }
        ).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message)
        });
}

//FUNCTION TO GET THE SONG BASED ON THE USER ID 
function GetSong(uID){

    var personJSON = { userID: uID };

    var xhr = $.ajax({

        type: "POST",
        url: "http://192.168.254.11/GigmatesService/Service1.svc/GetSongs",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(personJSON)
    }).done(function (data)
        {
            var songList = data.GetSongsResult;
            window.localStorage.setItem("songList", songList);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message);
    });
}

//FUNCTION TO GET THE PERSON TYPES FROM THE DATABASE
function GetPersonTypes()
{
    var xhr = $.ajax(
        {
            type: "POST",
            url: "http://192.168.254.11/GigmatesService/Service1.svc/GetPersonTypes",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function (data)
        {
            window.localStorage.setItem("PersonTypes", data.GetPersonTypesResult);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown)
        {
            alert(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message);
        });
}

// SET THE OPTIONS OF A SELECT BOX FOR THE PERSON TYPES 
//CALL ONLY IF THE PERSONTYPES ARE ALREADY SAVED IN THE LOCALSTORAGE
function GetPersonTypesSelect(selectBox)
{
    var typesJSON = JSON.parse(window.localStorage.getItem("PersonTypes"));
    for (var i = 0; i < Object.keys(typesJSON).length; i++)
    {
        var personOption = document.createElement("option");
        personOption.value = typesJSON[i].ID;
        personOption.innerHTML = typesJSON[i].Name;

        selectBox.appendChild(personOption);
    }
}


function GetUserDataById(uID)
{
    var userJSON = { userID: uID };
    var WCFCall = $.ajax(
        {
            type: "POST",
            url: "http://192.168.254.11/GigmatesService/Service1.svc/GetUserDataByID",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(userJSON)
        }).done(function (data)
        {
            window.localStorage.setItem("userDetails", data.GetUserDataByIDResult);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown)
        {
            alert(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message);
        });
}

//INPUT THE MONTH AND DATE HERE FOR CHECKING RETURNS TRUE IF DATE IS VALID
function CheckDate(date)
{
    return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(date);
}

function determineGenderName(genderID) {
    var genderName;

    if (genderID == "1") {
        genderName = "Male";
    }
    else if (genderID == "2") {
        genderName = "Female";
    }

    return genderName
}

function determineGenre(genreID)
{
    var GenreName = "di nakuha tols";
    var GenreList = window.localStorage.getItem("genreList");
    GenreList = JSON.parse(GenreList);
    for (var i=0; i < Object.keys(GenreList).length; i++)
    {
        if (GenreList[i].ID == genreID)
        {
            GenreName = GenreList[i].Name;
        }
    }

    return GenreName;
}

function determineTypeName(typeID) {
    var userTypeName;

    if (typeID == "1") {
        userTypeName = "Musician";
    }
    else {
        userTypeName = "Creator";
    }

    return userTypeName;
}


//CHECKS IF THE STRING HAS A NUMBER
function hasNumber(testStr)
{
    return /\d/.test(testStr);
}

//CHECKS IF A STRING HAS SPECIAL CHARS  
function hasSpecialChar(testStr)
{

    return /(\!|\ @|\#|\$ |%|\^|\&|\*|\(|\))/.test(testStr)
}

function hasLetter(testStr)
{
    var reg = new RegExp("\D");
    return reg.test(testStr);
}