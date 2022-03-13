/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast'
let apiKey = 'd52d0fcd66473532c81adbc2cdd7ccdd'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// A get request based on click event
document.getElementById('generate').addEventListener('click', callApi);

function callApi(e){
  e.preventDefault();
const zip =  document.getElementById('zip').value;
const feeling = document.getElementById('feelings').value;
getWeather(baseURL, zip, apiKey)
    .then(function(data) {
        postData = ('/add', {date:d , temp:data.list[0].main.temp, feeling: feeling})
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
      // appropriately handle the error
    }
}

// api result is sent to the client
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
// server resonds to client(get request)
const updateUI = async() => {
  const request = await fetch("/results");
  try {
      const allData = await request.json();
      console.log(allData);
      // update new entry values
      if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
          document.getElementById('date').innerHTML = allData.date;
          document.getElementById('temp').innerHTML = allData.temp; //+ ' degree C'
          document.getElementById('content').innerHTML = allData.content;
      }
  } catch (error) {
      console.log('error', error);
  }
};