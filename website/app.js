/* Global Variables */
const ZIP = document.getElementById("zip")
const FEELINGS = document.getElementById("feelings")
const DATE = document.getElementById("date")
const TEMP = document.getElementById("temp")
const CONTENT = document.getElementById("content")
// Create a new date instance dynamically with JS
const D_GEN = new Date();

// Personal API Key for OpenWeatherMap API
// api.openweathermap.org/data/2.5/weather?zip={zip code},us&appid={your api key}
const apiKey = "6a29019e7f04bb4a789466b841b44814"

function getWeatherURL() {
    return `https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${ZIP.value},us&appid=${apiKey}`
}

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener("click", onClick)
/* Function called by event listener */
async function onClick() {
    try {
        const newDate = D_GEN.getMonth() + '.' + D_GEN.getDate() + '.' + D_GEN.getFullYear();
        const newFeels = FEELINGS.value;
        updateEntry(newDate, newFeels)
        const newTemp = await getTemp();
        newData = {
            temp: newTemp,
            date: newDate,
            feels: newFeels
        }
        await postData("/addData", newData)
        respData = await getAllData()
        updateEntry(respData.date, respData.feels, respData.temp)
    } catch(err) {
        console.log(err);
    }
}

/* Function to GET Web API Data*/
async function getTemp() {
    try {
        // console.log(getWeatherURL())
        const resp = await fetch(getWeatherURL());
        const data = await resp.json();
        return `${data.main.temp}˚F`;
    } catch(err) {
        console.log(err)
    }
}

/* Function to POST data */
async function postData(url = "", data = {}) {
    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch(err) {
        console.log(err)
    }
}

/* Function to GET Project Data */
async function getAllData() {
    try {
        resp = await fetch("/all");
        return await resp.json();
    } catch(err) {
        console.log(err)
    }
}

// Updates latest entry in UI
function updateEntry(date, content, temp = "") {
    DATE.innerHTML = date;
    CONTENT.innerHTML = content;
    TEMP.innerHTML = temp;
}