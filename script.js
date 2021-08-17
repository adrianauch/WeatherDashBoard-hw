//Variables
var Searchbtn = $(".searchBtn");
var entries = 0;

//API KEY
var APIkey = "ca36ef21da1b73a0964a3f552def14cd";
//Event listener
Searchbtn.on("click", weather);

function weather() {
  //recording User Input
  var UserInput = $(".UserInput").val();
  console.log(UserInput);
  // API Variables
  //Curent Weather Var
  var urlCurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    UserInput +
    "&Appid=" +
    APIkey +
    "&units=imperial";
  //five day forecast var
  var urlFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    UserInput +
    "&Appid=" +
    APIkey +
    "&units=imperial";

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
      var timeUTC = new Date(response.dt * 1000);
      CurrentName.append(
        response.name + " " + timeUTC.toLocaleDateString("en-US")
      );
      CurrentName.append(
        `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`
      );
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
      //can't get this to work
    });
    //Pull Data for 5-Day forecast
    $.ajax({
      url: urlFiveDay,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //these are the different days
      var date = [0, 8, 16, 24, 32];
      //adding to HTML
      var fiveDayWeather = $(".fiveDayCard").addClass("card-body");
      var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
      fiveDayDiv.empty();
      // For each day (next 5 days)
      date.forEach(function (i) {
        //converting time
        var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
        FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
        //appending to the DOM/HTML
        fiveDayDiv.append(
          "<div class=fiveDayColor>" +
            "<p>" +
            FiveDayTimeUTC1 +
            "</p>" +
            `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` +
            "<p>" +
            "Temperature: " +
            response.list[i].main.temp +
            "</p>" +
            "<p>" +
            "Humidity: " +
            response.list[i].main.humidity +
            "%" +
            "</p>" +
            "</div>"
        );
      });
    });
  }
}
//Local Storage
for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  var cityName = $(".list-grp").addClass(".list-group-item");
  cityName.append("<li>" + city + "</li>");
}
