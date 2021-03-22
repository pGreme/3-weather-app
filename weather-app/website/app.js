/* Global Variables */
const baseURL  = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',de&mode=json&units=metric&appid=3b6debee59ea729c468a2b11ce0fdb0b&units=metric';

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const city = document.getElementById('city');
const content = document.getElementById('content');


/* Create a new date instance dynamically with JS */
let d = new Date();
let newDate = d.getDate() +'.'+ (d.getMonth()+1) +'.'+ d.getFullYear();

// Wert des Attributs "name" als String
//const cityByCode = json.getString("name"); // "gibt jeweilige Stadt aus"
// JSON.parse - JSON.stringify


/* Event listener to add function to existing HTML DOM element */
document.getElementById("generate").addEventListener("click", generateTemp);

/* Function called by event listener */
function generateTemp(){
        
        const content = document.getElementById('feelings').value;
        let zipCode = document.getElementById('zip').value;
        //prevent empty data
        if (zipCode == '' || content == ''){
          alert("Bitte alle Felder ausfüllen!");
        } else {
        
        getData(baseURL , zipCode , apiKey, city)
        .then(function(data){
            console.log(data)
            postData('/wetterData' , {temp: data.main.temp, city: data.name, date: newDate, content: content});       
        })
        .then(()=>{
          updateUI();
        }) 
}}

/* Function to GET Web API Data*/
const getData = async(baseURL,zipCode,apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
    try {   
    const data = await res.json();
    
    return data;
    }catch (error){  
    console.log("error",error);
    }   
}

/* Function to POST data */

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const alleDaten = await request.json();
      console.log(alleDaten);
    
      date.innerHTML = `Datum: ${alleDaten.date}`;
      temp.innerHTML = `Temperatur: ${alleDaten.temp} °C`;
      content.innerHTML= `Meine Gefühle: ${alleDaten.content}`;

    // after update the text field will be clear
    document.getElementById('feelings').value = '';
    document.getElementById('zip').value = '';

    } catch (error) {
      console.log("error", error);
    }
};

  
