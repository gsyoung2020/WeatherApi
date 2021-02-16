//document.getElementById("nameCity").style.display = "none";

function converter (temp){
  var newTemp = Math.round((temp - 273.15) * 9/5 + 32)
  return newTemp
}

document.getElementById("search").addEventListener("click", async function weather(){
var cityName = document.getElementById("city").value

var key = `12054b7d928ba7809f92f8bf3730e4cc`
await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)
.then(function(resp) { return resp.json() }) // Convert data to json
.then(function(data) {
    console.log('this is the weather',data)
    //document.getElementById("cityz").style.display = "block";
    var lat = data.coord.lat
    var lon = data.coord.lon
var apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${key}`  
var dataTwo = fetch(apiTwo)
.then(function(resp) { return resp.json() })  
.then(function(dataTwo) {
  console.log(dataTwo)
}     
        /*
      var ss = getElementById("cityz")
      ss.style.display = "block";
      var name = document.createTextNode(data.name)
      ss.appendChild(name);
      document.getElementById("info").appendChild(ss)  
      */
)
.catch(function() {
  // catch any errors
})

}
})



/*
function drawWeather (d) {
 
    
  console.log(d.name)
   console.log(d.sys.country)
    console.log(d.weather[0].description)
    console.log(d.coord.lat)
    console.log(d.coord.lon)
    
    fetch('')
    .then()
    .then()
    
    //var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32)
    //document.getElementById('info').innerHTML = fahrenheit + '&deg;';
	//document.getElementById('location').innerHTML = d.name;
*/