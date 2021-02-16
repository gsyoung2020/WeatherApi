function converter (temp){
    var newTemp = Math.round((temp - 273.15) * 9/5 + 32)
    return newTemp
  }

let hide =document.getElementById('table')
hide.style.display = "none";

let hideInfo =document.getElementById('info')
hideInfo.style.display = "none";

document.getElementById("search").addEventListener("click", async function weather(){

    var cityName = document.getElementById("city").value
    const key = `12054b7d928ba7809f92f8bf3730e4cc`
    
    let currentWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)
    let data = await currentWeather.json()
    console.log(data)
    if (data.cod == 400 ||data.cod == 404 ){
        alert(data.message)
    }

if(hideInfo.style.display == "none"){
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
 


    var lat = data.coord.lat
    var lon = data.coord.lon
    var apiTwo = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${key}`)  
    var dataTwo = await apiTwo.json()
    console.log(dataTwo)
  
    var i  
    var counter= ["0","1","2","3"];

    if(hide.style.display == "none"){
        for ( i = 0; i < counter.length; i++){
            var aquired = [i, converter(dataTwo.daily[i].temp.min), converter(dataTwo.daily[i].temp.max), `<img src=http://openweathermap.org/img/wn/${dataTwo.daily[i].weather[0].icon}@2x.png>`]
            var inner = document.createElement("td")
            console.log(i)
            inner.innerHTML = `${aquired[i]}`
            document.getElementById("true").appendChild(inner)
        }

        for (a = 1; a<8; a++){
            var table = document.createElement("tr")
            table.setAttribute("id", "corner")
            document.getElementById("true").appendChild(table)

        for ( i = 0; i < counter.length; i++){
            var aquired = [a, converter(dataTwo.daily[a].temp.min), converter(dataTwo.daily[a].temp.max), `<img src=http://openweathermap.org/img/wn/${dataTwo.daily[a].weather[0].icon}@2x.png>`]
            var inner = document.createElement("td")
            inner.setAttribute('id','cupHolder')
            console.log(i)
            inner.innerHTML = `${aquired[i]}`
            document.getElementById("true").appendChild(inner)
            }
        }
    } 
    
    if(hide.style.display == "block"){
        for ( i = 0; i < counter.length; i++){
            var aquired = [i, converter(dataTwo.daily[i].temp.min), converter(dataTwo.daily[i].temp.max), `<img src=http://openweathermap.org/img/wn/${dataTwo.daily[i].weather[0].icon}@2x.png>`]
            var inner = document.createElement("td")
            console.log(i)
            inner.innerHTML = `${aquired[i]}`
            document.getElementById("true").replaceChild(inner)
        }

        for (a = 1; a<8; a++){
            var table = document.createElement("tr")
            table.setAttribute("id", "corner")
            document.getElementById("true").replaceChild(table)

        for ( i = 0; i < counter.length; i++){
            var aquired = [a, converter(dataTwo.daily[a].temp.min), converter(dataTwo.daily[a].temp.max), `<img src=http://openweathermap.org/img/wn/${dataTwo.daily[a].weather[0].icon}@2x.png>`]
            var inner = document.createElement("td")
            inner.setAttribute('id','cupHolder')
            console.log(i)
            inner.innerHTML = `${aquired[i]}`
            document.getElementById("true").replaceChild(inner)
            }
        }
    }
     

    hide.style.display = "block";




})

//signed by karen

