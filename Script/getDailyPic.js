var baseUrl = new URL("https://api.nasa.gov/planetary/apod");
var myAPIkey = "Fa9LKzqaJ3DaYg3eVuRv18uwPlQTgcDRId3wQIcx";
var buton = document.getElementById("buton");

buton.addEventListener("click", getPicOfTheDay);

function getPicOfTheDay() {
  baseUrl.searchParams.set("api_key", myAPIkey);
  setDateFilter();

  fetch(baseUrl.href, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResp) {
      console.log(jsonResp);
      if (jsonResp.msg) {
        displayError(jsonResp.msg);
      } else if (jsonResp.media_type == "image") {
        displayPicture(jsonResp);
      } else if (jsonResp.media_type == "video") {
        displayVideo(jsonResp);
      }
    })
    .catch(function () {
      displayError("Something went wrong! Try again!");
    });
}

function getInfo(current) {
  var infoDiv = document.getElementById("infoDiv");

  var theTitle = document.createElement("h1");
  theTitle.innerText = current.title;

  var theAuthor = document.createElement("h2");
  theAuthor.innerText = current.copyright;

  var theDate = document.createElement("h3");
  theDate.innerText = current.date;

  var theDetails = document.createElement("p");
  theDetails.innerText = current.explanation;

  infoDiv.appendChild(theTitle);
  infoDiv.appendChild(theAuthor);
  infoDiv.appendChild(theDate);
  infoDiv.appendChild(theDetails);
}

function displayPicture(todaysPicture) {
  var picDiv = document.getElementById("picDiv");

  getInfo(todaysPicture);

  var dailyPic = document.createElement("img");
  dailyPic.src = todaysPicture.url;

  picDiv.appendChild(dailyPic);
}

function displayVideo(todaysVideo) {
  var vidDiv = document.getElementById("vidDiv");

  getInfo(todaysVideo);

  var dailyVid = document.createElement("iframe");
  dailyVid.src = todaysVideo.url;

  vidDiv.appendChild(dailyVid);
}

function setDateFilter() {
  var pickedDate = document.getElementById("calendar").value;

  if (pickedDate) {
    baseUrl.searchParams.set("date", pickedDate);
  }
}

function displayError(errorMessage) {
  var errorDiv = document.getElementById("errorDiv");
  errorDiv.innerText = errorMessage;
}

function empty(currentDiv, currentElement) {
  currentDiv.removeChild(currentElement);
}
