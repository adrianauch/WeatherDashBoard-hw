//Variables
var Searchbtn = $(".searchBtn");
var entries = 0;

//API KEY
var APIkey = "ca36ef21da1b73a0964a3f552def14cd";

Searchbtn.on("click", weather);

function weather() {
  //recording User Input
  var UserInput = $(".UserInput").val();
  console.log(UserInput);
  var APIkey = "ca36ef21da1b73a0964a3f552def14cd";
  // API Variables
  //Curent Weather Var
  var urlCurrent =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    UserInput +
    "&Appid=ca36ef21da1b73a0964a3f552def14cd&units=imperial";
  //five day forecast var
  var urlFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    UserInput +
    "&Appid=ca36ef21da1b73a0964a3f552def14cd&units=imperial";

  if (UserInput == "") {
    console.log(UserInput);
  } else {
    //data pull
    $.ajax({
      url: urlCurrent,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //Add in list items
      var cityName = $(".list-grp").addClass("list-group-item");
      cityName.append("<li>" + response.name + "</li>");
      //Setting City in Local Storage
      var savedCity = localStorage.setItem(entries, response.name);
      //What the user has previously saved and add one to form a list
      entries = entries + 1;
      //Current Weather Section
      var currentCity = $(".currentWeather")
        .append("<div>")
        .addClass("weather-body");
      currentCity.empty();

      var CurrentName = currentCity.append("<p>");
      currentCity.append(CurrentName);
      //Add Time:

      //ADD TEMP
      var currentTemp = CurrentName.append("<p>");
      CurrentName.append(currentTemp);
      currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
      // Add Humidity
      currentTemp.append(
        "<p>" + "Humidity: " + response.main.humidity + "%" + "</p>"
      ); // Add Wind
      currentTemp.append(
        "<p>" + "Wind: " + response.main.humidity + " mph" + "</p>"
      );
      //Adding in UV index - Different API Pull
    });
  }
}
