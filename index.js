var currentDay = moment().format('YYYY-MM-DD');
var day1 = moment().add(1, 'day').format('YYYY-MM-DD');
var day2 = moment().add(2, 'day').format('YYYY-MM-DD');
var day3 = moment().add(3, 'day').format('YYYY-MM-DD');
var day4 = moment().add(4, 'day').format('YYYY-MM-DD');
var day5 = moment().add(5, 'day').format('YYYY-MM-DD');
var fiveDayArray = [day1, day2, day3, day4, day5];
var d1maxTemp = 0;
var d2maxTemp = 0;
var d3maxTemp = 0;
var d4maxTemp = 0;
var d5maxTemp = 0;
var d1humidity = 0;
var d2humidity = 0;
var d3humidity = 0;
var d4humidity = 0;
var d5humidity = 0;

var tempArray = [];
var humidityArray = [];

(function init(){
    var cityStr = localStorage.getItem("lastCity");
    getCurrentWeather(cityStr);
    getFiveDayWeather(cityStr);
})();


function getCurrentWeather(location){
    $.ajax({
        //Change this back to dynamic at the end
    url: `http://api.openweathermap.org/data/2.5/weather?q=${location}&mode=JSON&units=imperial&APPID=9c5c1b3cee6e10229e2b0a0786d075e1`,
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
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${location}&mode=JSON&units=imperial&appid=9c5c1b3cee6e10229e2b0a0786d075e1`,
    method: "GET"
  }).then(function(response) {
    //set API data to an object
    console.log(response);

    response.list.forEach( function(e, i){
        var APIday = response.list[i].dt_txt.substr(0,10)


        if(day1 === APIday){
            var checkedTemp = response.list[i].main.temp;
            if(checkedTemp > d1maxTemp){
                d1maxTemp = checkedTemp
                d1humidity = response.list[i].main.humidity;
            } 
        }
        else if(day2 === APIday){
            var checkedTemp = response.list[i].main.temp;
            if(checkedTemp > d2maxTemp){
                d2maxTemp = checkedTemp
                d2humidity = response.list[i].main.humidity;
            }   
        }
        else if(day3 === APIday){
            var checkedTemp = response.list[i].main.temp;
            if(checkedTemp > d3maxTemp){
                d3maxTemp = checkedTemp
                d3humidity = response.list[i].main.humidity;
            }   
        }
        else if(day4 === APIday){
            var checkedTemp = response.list[i].main.temp;
            if(checkedTemp > d4maxTemp){
                d4maxTemp = checkedTemp
                d4humidity = response.list[i].main.humidity;
            }   
        }
        else if(day5 === APIday){
            var checkedTemp = response.list[i].main.temp;
            if(checkedTemp > d5maxTemp){
                d5maxTemp = checkedTemp
                d5humidity = response.list[i].main.humidity;
            }   
        }
    })
    tempArray.push(d1maxTemp, d2maxTemp, d3maxTemp, d4maxTemp, d5maxTemp);
    humidityArray.push(d1humidity, d2humidity, d3humidity, d4humidity, d5humidity);
    console.log(tempArray);
    console.log(humidityArray);
    for( i=0; i<tempArray.length; i++){
        var forcast = $(`<div class="forcast">
            <div>${fiveDayArray[i]}</div>
            <div>img</div>
            <div>High: ${tempArray[i]}°F</div>
            <div>Humidity: ${humidityArray[i]}%</div>
        </div>`);
        $("#forcastDisplay").append(forcast);
    }
  });
};



$("#submitBtn").on("click", function(event){
    event.preventDefault();
    clearDisplayAndArrays();
    var city = $("#location").val();
    var cityStr = city.replace(/\ /g, '+');
    getCurrentWeather(cityStr);
    getFiveDayWeather(cityStr);
    var history = $(`<button class="history" data-cityname="${city}">${city}</button><br>`);
    $("#historyList").append(history);
    localStorage.setItem("lastCity", cityStr);
});

$("#historyList").on("click", "button", function(event){
    event.preventDefault();
    clearDisplayAndArrays();
    var city = this.dataset.cityname;
    var cityStr = city.replace(/\ /g, '+');
    getCurrentWeather(cityStr);
    getFiveDayWeather(cityStr);
    localStorage.setItem("lastCity", cityStr);
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

function clearDisplayAndArrays(){
    $("#forcastDisplay").empty();
    $("#mainDisplay").empty();
    tempArray = [];
    humidityArray = [];
}