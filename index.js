var cityStr = "";
var main = $("#mainDisplay");

function getCurrentWeather(location){
    $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q=Salt+Lake+City&mode=JSON&units=imperial&APPID=9c5c1b3cee6e10229e2b0a0786d075e1`,
    method: "GET"
  }).then(function(response) {
      //Returns API data
      //set variables for data gathered
      var name = response.name;
      var currentTemp = response.main.temp;
      var description = response.weather[0].description;
      var high = response.main.temp_max;
      var low = response.main.temp_min;
      var precip = response.main.humidity;
      console.log(name);
      console.log(description);
      console.log(currentTemp);
      console.log(high);
      console.log(low);
      console.log(precip);
      //makes container for display
      var div = $(`<div>Temperature: ${currentTemp}</div>`);
      main.append(div);
      //appends data to the display
  });
  }
$("#submitBtn").on("click", function(event){
    event.preventDefault();
    var city = $("#location").val();
    cityStr = city.replace(/\ /g, '+');
    getCurrentWeather(cityStr);
});
