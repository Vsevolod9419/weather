//Дублирующийся код (функции), можно в отдельные функции и вызывать их !

let OP_API = "6dd3fc579925b0ff4c9afa7d057fa6f6";
let ipify_API = "at_ruTSgCCRRScJargKfbfddhNc11BXS";
let temp = document.querySelector(".temp");
let forecast = document.querySelector(".forecast");
let change = document.querySelector(".change");
let inputCity = document.querySelector(".inp-city");
let find = document.querySelector(".find");

let lat;
let lng;
let citi;

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  // если всё хорошо, собираем ссылку
  const { longitude, latitude } = position.coords;
  console.log({ longitude, latitude });
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OP_API}`
  )
    .catch((data) => console.log(data))
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      temp.textContent = data.main.temp.toFixed() + " ℃";
      forecast.textContent = `${data.weather[0].description} in ${data.name}`;
    });
}

function error() {
  //   ipify
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${ipify_API}`)
    .catch((siti) => console.log(siti))
    .then((jsonSiti) => jsonSiti.json())
    .then((siti) => {
      console.log(siti);
      lng = siti.location.lng;
      lat = siti.location.lat;
      citi = siti.location.city;
      console.log(citi);
      func(lat, lng, citi);
    });
}

function func(lat, lng, citi) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${OP_API}`
  )
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      temp.textContent = data.main.temp.toFixed() + " ℃";
      forecast.textContent = `${data.weather[0].description} in ${citi}`;
    })
    .catch(() => {
      inputCity.classList.add("inp-city-view");
      console.log(inputCity.classList);
      change.classList.add("change-inhirit");
      find.classList.add("find-view");
      find.classList.remove("find");
    });
}

change.addEventListener("click", () => {
  change.classList.add("change-inhirit");
  inputCity.classList.add("inp-city-view");
  find.classList.add("find-view");
  find.classList.remove("find");
});

find.addEventListener("click", function funcTown() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${OP_API}`
  )
    .then((jsonTown) => jsonTown.json())
    .then((town) => {
      console.log(town);
      temp.textContent = town.main.temp.toFixed() + " ℃";
      forecast.textContent = `${town.weather[0].description} in ${town.name}`;
    })
    .catch((er) => {
      console.log(er);
    });
});
