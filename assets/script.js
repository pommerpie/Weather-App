const apiKey = 'b67ee6df6321fffb1285dad68ff9d912'
let searchBtn = $('#searchBtn')
let predetermine = $('.location')
let appendForecast = $('#forecast')


$(document).ready(function(){
    function getWeather(searchName){
        const url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${searchName}&appid=${apiKey}`
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            appendForecast.empty()
            for (let i = 0; i < 40; i += 8) { /* Loops 5 times */
                var icn = data.list[i].weather[0].icon /* Grabs icon name */
                var temp = data.list[i].main.temp /* Min temp*/
                var humid = data.list[i].main.humidity /* Humidity */
                var windSpd = data.list[i].wind.speed /* Wind Speed */
                var icon = "https://openweathermap.org/img/wn/" + icn + "@2x.png" /* Grabs URL and icon */
                var date = data.list[i].dt_txt.split(' ') /* Splits date */
                var formatDate = date[0] /* Grabs date on yyyy */
                var li = $('<li>').addClass("border-2 border-solid p-5")
                var h2 = $('<h3>').text(formatDate)
                var img = $('<img>').attr('src', icon)
                var h4Temp = $('<h4>').text('Temp: ' + temp + '°')    
                var h5Humid = $('<h5>').text('Humidity: ' + humid + '%')
                var h5Wind = $('<h5>').text('Wind speed: ' + windSpd + ' mph')
                li.append(h2, img, h4Temp, h5Humid, h5Wind)
                appendForecast.append(li)
            }
            const weatherSave = {
                date: formatDate,
                icon: icon,
                minTemp: minTemp,
                maxTemp: maxTemp
        } 
            localStorage.setItem(searchName, JSON.stringify(weatherSave)) /* Saves to local storage */
        }
            )
        }
        searchBtn.click(function() {
            const searchName = $('#locSearch').val()
            getWeather(searchName);
           })
         
         predetermine.click(function(){
          const searchName = $(this).attr('id')
             getWeather(searchName);
         })
    })