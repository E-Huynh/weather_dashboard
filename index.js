var currentDay = moment().format('YYYY-MM-DD');
var day1 = moment().add(1, 'day').format('YYYY-MM-DD');
var day2 = moment().add(2, 'day').format('YYYY-MM-DD');
var day3 = moment().add(3, 'day').format('YYYY-MM-DD');
var day4 = moment().add(4, 'day').format('YYYY-MM-DD');
var day5 = moment().add(5, 'day').format('YYYY-MM-DD');

var m = moment()
var d1Values = [];
var d2Values = [];
var d3Values = [];
var d4Values = [];
var d5Values = [];

function getCurrentWeather(location){
    $.ajax({
        //Change this back to dynamic at the end
    url: `http://api.openweathermap.org/data/2.5/weather?q=Salt+Lake+City&mode=JSON&units=imperial&APPID=9c5c1b3cee6e10229e2b0a0786d075e1`,
    method: "GET"
  }).then(function(response) {
      //set API data to an object
      var currentWeather = {
        City: response.name,
        Temperature: response.main.temp,
        Description: response.weather[0].main,
        High: response.main.temp_max,
        Low: response.main.temp_min,
        Humidity: response.main.humidity,
      }
      new CurrentWeatherDisplay(currentWeather);
  });
};

function getFiveDayWeather(location){
    $.ajax({
        //Change this back to dynamic at the end
    url: `http://api.openweathermap.org/data/2.5/forecast?q=Salt+Lake+City&mode=JSON&units=imperial&appid=9c5c1b3cee6e10229e2b0a0786d075e1`,
    method: "GET"
  }).then(function(response) {
    //set API data to an object
    console.log(response);

    for( i = 0; i < response.list.length; i++){
        var APIday = response.list[i].dt_txt.substr(0,10)

        if(day1=== APIday){
            var newTemps = {
                high: response.list[i].main.temp, 
                humidity: response.list[i].main.humidity
            };
            d1Values.push(newTemps);
        }
        else if(day2=== APIday){
            var newTemps = {
                high: response.list[i].main.temp, 
                humidity: response.list[i].main.humidity
            };
            d2Values.push(newTemps);
        }
        else if(day3=== APIday){
            var newTemps = {
                high: response.list[i].main.temp, 
                humidity: response.list[i].main.humidity
            };
            d3Values.push(newTemps);
        }
        else if(day4=== APIday){
            var newTemps = {
                high: response.list[i].main.temp, 
                humidity: response.list[i].main.humidity
            };
            d4Values.push(newTemps);
        }
        else if(day5=== APIday){
            var newTemps = {
                high: response.list[i].main.temp, 
                humidity: response.list[i].main.humidity
            };
            d5Values.push(newTemps);
        }
    }

    console.log(d1Values);
    console.log(d2Values);
    console.log(d3Values);
    console.log(d4Values);
    console.log(d5Values);

  });
};

$("#submitBtn").on("click", function(event){
    event.preventDefault();
    var city = $("#location").val();
    var cityStr = city.replace(/\ /g, '+');
    // getCurrentWeather(cityStr);
    getFiveDayWeather(cityStr);
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
        var k= $(`<p>${[key]}: ${obj[key]}</p>`);
        main.append(k)
    }
    $("#mainDisplay").append(main);
};