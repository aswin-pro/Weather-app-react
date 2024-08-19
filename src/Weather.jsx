import axios from "axios"
import { useState } from "react"

//image
import rainimg from "./assets/images/white-rain.webp";
import cloudsimg from "./assets/images/clouds.png";
import mistimg from "./assets/images/mist_339182456.jpg";
import clearimg from "./assets/images/clear-clear.webp";
import defaultimg from "./assets/images/default-1.webp";


function Weather() {

    const [city, setcity] = useState("")
    const [weather, setweather] = useState("")
    const [temerature, settemperature] = useState("")
    const [descrition, setdescription] = useState("")
    const [error, seterror] = useState("")
    const [country, setcountry] = useState("")

    const handlecity = (e) => {
        setcity(e.target.value)
        seterror("")
    }

    const getweater = () => {
        var weatherdata = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d61d1162075b921eff95386598ef95c7`) //promises - resolve reject

        weatherdata.then((sucess) => {
            // console.log(sucess.data)
            setweather(sucess.data.weather[0].main)
            setdescription(sucess.data.weather[0].description)
            settemperature(sucess.data.main.temp)
            setcountry(sucess.data.sys.country)
            seterror("")
        })
            .catch((error) => {
                seterror("Weather data is playing hide-and-seek. Double-check your city name!")
            })
    }

    const backgroundImages={
        rain: rainimg,
        clear: clearimg,
        mist: mistimg,
        clouds: cloudsimg,
        default: defaultimg
    }

    //arrow function
    const getbackgroundimage = (weather) => {   //rain , mist etc...
        return backgroundImages[weather.toLowerCase()] || backgroundImages.default;
    };

    return (
        <>
            <div className="flex flex-col shadow-md w-80 border mx-auto mt-36 p-5 "
                style={{
                    backgroundImage: `url(${getbackgroundimage(weather)})`,
                    backgroundSize: 'cover',  
                    backgroundPosition: 'center', 
                    borderRadius:"7px"
                }}>

                <div className="text-center font-medium">
                    <h1 className="text-2xl font-medium ">Weather Report</h1>
                    <p>I can give a weather report about your city !</p>
                    <div className="flex flex-col gap-1  justify-center items-center mt-3">

                        <input type="text" placeholder="Your city ?" value={city} onChange={handlecity} className="border border-black p-1 focus:outline-none " 
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', // White background with  opacity
                        }}
                        />

                        <button onClick={getweater} className="border border-blue-600 p-1 bg-blue-600 text-white mt-2">Get Report</button>

                    </div>
                    {/* error message  */}
                    <p className="text-red-600 bg-green-100 text-xl font-semibold mt-2 ">{error}</p>
                    
                </div>
                <div className="p-2 mt-1 font-medium">
                    <h1><b>Weather: </b>{weather}</h1>
                    <h1><b>Temperature: </b>{temerature}</h1>
                    <h1><b>Description: </b>{descrition}</h1>
                    <h1><b>Country: </b>{country}</h1>
                </div>
            </div>
        </>
    )
}
export default Weather