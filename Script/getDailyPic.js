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
      if (jsonResp.error) {
        displayError(jsonResp.error);
      } else displayPicture(jsonResp);
    })
    .catch(function () {
      displayError("Something went wrong! Try again!");
    });
}

function displayError(errorMessage) {
  var errorDiv = document.getElementById("errorDiv");
  errorDiv.innerText = errorMessage;
}

function displayPicture(todaysPicture) {
  var picDiv = document.getElementById("picDiv");

  var dailyPic = document.createElement("img");
  dailyPic.src = todaysPicture.url;

  picDiv.appendChild(dailyPic);
}

function setDateFilter() {
  var pickedDate = document.getElementById("calendar").value;

  if (pickedDate) {
    baseUrl.searchParams.set("date", pickedDate);
  }
}
