let weather = {
  apiKey: "160c1be425c9e13e5a92456f42b57532",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found. Please enter the city name correctly!");
          throw new Error("No weather found. Please enter the city name correctly!");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;

    //Displays City Name
    document.querySelector(".city").innerText = "Weather in " + name;

    //Displays Icons
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";

    //Displays weather descriptions  
    document.querySelector(".description").innerText = description;

    //Displays current temperature
    document.querySelector(".temp").innerText = Math.ceil((temp * 1.8)+32) + "°F";

    //Displays humidity
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";

    //Displays wind speed  
    document.querySelector(".wind").innerText = "Wind speed: " + Math.ceil(speed / 1.609344) + " mph";
    
    //Displays feels like temperature
    document.querySelector(".feelslike").innerText =
      "Feels Like: " + Math.ceil((feels_like * 1.8)+32) + " °F";
    
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/1600x900/?weather" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Salt Lake City");
