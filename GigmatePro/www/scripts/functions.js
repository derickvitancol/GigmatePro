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