var cityStr = "";

function getWeather(location){
    $.ajax({
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${location}&mode=JSON&APPID=9c5c1b3cee6e10229e2b0a0786d075e1`,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      //Returns API data
      //set variables for data gathered
      //makes container for display
      //appends data to the display
  });
  }
$("#submitBtn").on("click", function(event){
    event.preventDefault();
    var city = $("#location").val();
    cityStr = city.replace(/\ /g, '+');
    getWeather(cityStr);
});
