/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast'
    // Personal API Key for OpenWeatherMap API
const apiKey = 'd52d0fcd66473532c81adbc2cdd7ccdd&units=imperial'

// Create a new date instance dynamically with JS
let dateNow = new Date();
let newDate = dateNow.getMonth()+'.'+ dateNow.getDate()+'.'+ dateNow.getFullYear();

// A get request based on click event
document.getElementById('generate').addEventListener('click', callApi);

function callApi(e){
  e.preventDefault();
const zip =  document.getElementById('zip').value;
const feeling = document.getElementById('feelings').value;
getWeather(baseURL, zip, apiKey)
    .then(function(data) {
        postData ('/add', {temp:data.list[0].main.temp, date:dateNow , content: feeling})
        updateUI();
    })
};

const getWeather = async(baseURL, zip, apiKey) => {
    
    const res = await fetch(baseURL+ "?zip=" + zip + "&appid=" + apiKey)
    try {
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
    }
}

// client posts data to the server
let postData = async(url = '', data = {}) => {
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          temp: data.temp,
          date: data.date,
          content: data.content
      })
  });
    try {
      const newData = await response.json();
      return newData;
  } catch (error) {
      console.log(error);
  }
};
// server resonds to client(get request) and update UI
const updateUI = async() => {
  const request = await fetch("/results");
  console.log(request)
    try {
      const allData = await request.json();
      console.log(allData);
      // update new entry values
          document.getElementById('date').innerHTML = "Date: " + allData.date;
          document.getElementById('temp').innerHTML = "Temperature: "+ allData.temp;
          document.getElementById('content').innerHTML = "I am feeling "+ allData.content + " today!!";
  } catch (error) {
      console.log('error', error);
      
  }
};