//API key
const key = `12054b7d928ba7809f92f8bf3730e4cc`
// tempreture converter
let t = document.getElementById("true")
let tableBody = document.getElementById('table-body')
let mi,ma,img,da, tableRow;

// function tablePop(pop){
//     for(var i = 0; i < pop; i++) {
        
//     }
// }



function converter(temp) {
    var newTemp = Math.round((temp - 273.15) * 9/5 + 32)
    return newTemp
  }
// hiding the table at the start
let hide =document.getElementById('table')
hide.style.display = "none";
//
let hideInfo = document.getElementById('info')
hideInfo.style.display = "none";

async function weatherFetch(cityName){
 let currentWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)
    let data = await currentWeather.json()
    if (data.cod == 400 || data.cod == 404) {
        alert(data.message)
    } 
        return data;
}
async function weatherFetchTOO (lon, lat){
    var apiTwo = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${key}`)  
    var dataTwo = await apiTwo.json()
    return dataTwo;
}





// adding event listenero search
// @params : click event  
//  find the city name from the first api
// get lat and lon
// cond fetch  get all the city data from the second api
// display the information and being able to change it 

document.getElementById("search").addEventListener("click", async function weather(){

    var cityName = document.getElementById("city").value
    var data = await weatherFetch(cityName);

        if(hideInfo.style.display === "none"){
            var city = document.createElement("P");
            city.setAttribute("id", "cityData")
            city.innerHTML= `<b>City:</b> ${data.name}`;
            document.getElementById("info").appendChild(city);
            var country = document.createElement("P");
            country.setAttribute("id", "countryData")
            country.innerHTML= `<b>Country:</b> ${data.sys.country}`;
            document.getElementById("info").appendChild(country);
            var weather = document.createElement("P");
            weather.setAttribute("id", "weatherData")
            weather.innerHTML= `<b>Current weather:</b> ${data.weather[0].description}`;
            document.getElementById("info").appendChild(weather);   
        } 

//on second search it will change city, country, and current weather discription
    if (hideInfo.style.display == "block") {
        document.getElementById('cityData').innerHTML = `<b>City:</b> ${data.name}`;
        document.getElementById('countryData').innerHTML = `<b>Country:</b> ${data.sys.country}`;
        document.getElementById('weatherData').innerHTML = `<b>Current weather:</b> ${data.weather[0].description}`
    }
    
    hideInfo.style.display = "block";
    
    var lon = data.coord.lon
    var lat = data.coord.lat

    var dataTwo = await weatherFetchTOO(lon,lat);
    console.log(dataTwo,"<>>>>DATA two from event")
    // >>>>>>> dataTwo.daily>>>> array with 8 obj in it 
    console.log(dataTwo.daily.length,"<>>>>>>>>dataTwo daily length")

    for (var i = 0; i < dataTwo.daily.length; i++){//0
      tableRow = document.createElement("tr")
      console.log(i)
      var day = dataTwo.daily[i] // day 0
      let min = converter(day.temp.min)
      let max = converter(day.temp.max)
      let imageSource =`<img src=http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png>`

      mi = document.createElement("td")
      ma = document.createElement("td")
      img = document.createElement("td");
      da = document.createElement("td");

      mi.innerHTML = min
      ma.innerHTML = max
      img.innerHTML = imageSource;
      da.innerHTML = i;
      
      tableRow.appendChild(da)
      tableRow.appendChild(mi)
      tableRow.appendChild(ma);
      tableRow.appendChild(img)
      //put createElements and appends child OUTSIDE of for loop

      // i want to create 4 td for my 4 data which is 
      //param : min, max, image and day = i


      hide.style.display = "block";
     
     
    }
    tableBody.appendChild(tableRow)
})

