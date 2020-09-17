var baseUrl = new URL("https://api.nasa.gov/planetary/apod");
var myAPIkey = "Fa9LKzqaJ3DaYg3eVuRv18uwPlQTgcDRId3wQIcx";
var buton = document.getElementById("buton");
var allInfo = document.getElementById("allInfo");
var myLoader = document.getElementById("loaderPosition");

buton.addEventListener("click", getPicOfTheDay);

function getPicOfTheDay() {
  displayLoader(); //loader

  baseUrl.searchParams.set("api_key", myAPIkey);
  setDateFilter();

  fetch(baseUrl.href, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResp) {
      console.log(jsonResp);
      cleanInfoDiv();
      if (jsonResp.msg) {
        displayError(jsonResp.msg);
      } else if (jsonResp.media_type == "image") {
        displayPicVidInfoInHTML(jsonResp);
        displayPicture(jsonResp);
      } else if (jsonResp.media_type == "video") {
        displayPicVidInfoInHTML(jsonResp);
        displayVideo(jsonResp);
      }
    })
    .catch(function () {
      displayError("Something went wrong! Try again!");
    })
    .finally(hideLoader);
}

function cleanInfoDiv() {
  allInfo.innerHTML = `
  <div id="infoDiv"></div>
  <div id="picDiv"></div>
  <div id="vidDiv"></div>

  <div id="errorDiv"></div>`;
}

function displayPicVidInfoInHTML(current) {
  var infoDiv = document.getElementById("infoDiv");

  var theTitle = document.createElement("h1");
  theTitle.innerText = current.title;

  theTitle.style.marginTop = "60px";
  theTitle.style.marginBottom = "20px";
  theTitle.style.color = "rgb(126, 91, 215)";

  var theAuthor = document.createElement("h2");
  theAuthor.innerText = "By " + current.copyright;

  theAuthor.style.color = "rgb(255, 154, 222)";

  if (current.copyright === undefined) {
    theAuthor.innerText = "By Unknown Author";
  }

  var theDate = document.createElement("h3");
  theDate.innerText = current.date;

  theDate.style.marginBottom = "20px";
  theDate.style.fontStyle = "italic";
  theDate.style.color = "rgb(255, 154, 222)";

  var theDetails = document.createElement("p");
  theDetails.innerText = current.explanation;

  theDetails.style.color = "rgb(87, 150, 223)";

  infoDiv.appendChild(theTitle);
  infoDiv.appendChild(theAuthor);
  infoDiv.appendChild(theDate);
  infoDiv.appendChild(theDetails);

  allInfo.appendChild(infoDiv);
}

function displayPicture(todaysPicture) {
  var picDiv = document.getElementById("picDiv");

  var dailyPic = document.createElement("img");
  dailyPic.src = todaysPicture.url;

  dailyPic.style.width = "790px";

  picDiv.appendChild(dailyPic);

  allInfo.appendChild(picDiv);
}

function displayVideo(todaysVideo) {
  var vidDiv = document.getElementById("vidDiv");

  var dailyVid = document.createElement("iframe");
  dailyVid.src = todaysVideo.url;

  dailyVid.style.width = "790px";
  dailyVid.style.height = "454px";
  dailyVid.style.border = "none";

  vidDiv.appendChild(dailyVid);

  allInfo.appendChild(vidDiv);
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

  errorDiv.style.color = "red";
  errorDiv.style.fontWeight = "bold";
}

function displayLoader() {
  container.style.opacity = 0;
  allInfo.style.opacity = 0;
  myLoader.style.display = "block";
}

function hideLoader() {
  container.style.opacity = 1;
  allInfo.style.opacity = 1;
  myLoader.style.display = "none";
}
