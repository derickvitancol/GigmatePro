/* THIS FILE CONTAINS THE FUNCTIONS THAT ARE USED IN DIFFERENT PAGES */


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
        url: "http://localhost/GigmatesService/Service1.svc/GetGenreList",
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


function GetSong(uID) {

    var personJSON = { userID: uID };

    var xhr = $.ajax({

        type: "POST",
        url: "http://localhost/GigmatesService/Service1.svc/GetSongs",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(personJSON)
    }).done(function (data) {
        
        var songList = JSON.parse(data.GetGenreListResult);
        window.localStorage.setItem("songList", songList);



        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + ' ' + textStatus + ' ' + errorThrown.message);
    });
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