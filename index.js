function getCurrentWeather(location){
    $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q= ${location} &mode=JSON&units=imperial&APPID=9c5c1b3cee6e10229e2b0a0786d075e1`,
    method: "GET"
  }).then(function(response) {
      //set API data to an object
      var currentWeather = {
        name: response.name,
        currentTemp: response.main.temp,
        description: response.weather[0].description,
        high: response.main.temp_max,
        low: response.main.temp_min,
        precip: response.main.humidity,
      }
      new CurrentWeatherDisplay(currentWeather);
  });
}

$("#submitBtn").on("click", function(event){
    event.preventDefault();
    var city = $("#location").val();
    var cityStr = city.replace(/\ /g, '+');
    getCurrentWeather(cityStr);
});

//Constructor function
function CurrentWeatherDisplay(obj){
    //Removes any existing #current
    $("#current").remove();
    //Creates div#current
    var main = $(`<div id="current">`);
    //Cycles through obj passed in as function
    for (const key in obj) {
        //Creates new <p> with obj key and value
        var k= $(`<p>${[key]} ${obj[key]}</p>`);
        main.append(k)
    }
    $("#mainDisplay").append(main);
}