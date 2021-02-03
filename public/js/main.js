const submit_button = document.getElementById('submit')
const output_status = document.getElementById('output-status')
const output = document.getElementById('output')
const day = document.getElementById('day')
const date = document.getElementById('date')
const status = document.getElementById('status')
const set_date_and_time = ()=>{
    const dayArray = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thurs",
        "Fri",
        "Sat",
    ]
    const monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    const data = new Date()
    const today = dayArray[data.getDay()]
    const today_date = data.getDate()
    const month = monthArr[data.getMonth()]
    day.innerHTML = today
    date.innerHTML = `${today_date} ${month}`
}
const get_info = async()=>{
    const city_name = document.getElementById('city-name').value
    if(city_name === ""){
        output_status.style.color = "red"
        output_status.style.fontWeight = "bold"
        output_status.innerHTML = "Please Enter the city name before search"
        status.innerHTML = ""
        output.innerHTML = ""
    }
    else{
     let api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=e6778392aaeb5d71c756182bb63986e7`
     try{
        const response =  await fetch(api)
        const data = await response.json()
        const temp = (data.main.temp - 273.15).toFixed(2)
        const city = data.name
        const country = data.sys.country
        const temp_status = data.weather[0].main
        if(temp_status == "Clear"){
            status.innerHTML = '<i class = "fas fa-sun" style = "color :  rgb(245, 245, 17)"></i>'
        }else if(temp_status == "Clouds"){
            status.innerHTML = '<i class = "fas fa-cloud" style = "color :  #f1f2f6"></i>'
        }else if(temp_status == "Rain"){
            status.innerHTML = '<i class = "fas fa-cloud-rain" style = "color :  #a4b0be"></i>'
        }else if(temp_status == "Snow" || temp_status == "Mist" || temp_status == "Smoke"){
            status.innerHTML = '<i class="fas fa-thermometer-empty"></i>'
        }else{
            status.innerHTML = '<i class = "fas fa-sun" style = "color :  rgb(245, 245, 17)"></i>'
        }
        const degree = '<sup style = "margin-top: -2px">O</sup>'
        output.innerHTML = `${temp} ${degree} C`
        output_status.innerHTML = `${city}, ${country}`
        output_status.style.color = "white"
        output_status.style.fontWeight = "100"
     }catch{
        output_status.style.color = "red"
        output_status.style.fontWeight = "bold"
        output_status.innerHTML = "Please Enter valid city name"
        status.innerHTML = ""
        output.innerHTML = ""
     }
    }
}
set_date_and_time()
submit_button.addEventListener('click', get_info)