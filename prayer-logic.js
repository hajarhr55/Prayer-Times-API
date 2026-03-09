const btn = document.getElementById("dropdown-btn");
const menu = document.getElementById("dropdown-menu");
const menuItems = menu.querySelectorAll("a");

btn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    menu.classList.remove("show");
  }
});

let list = ["Riyadh", "Makkah", "Dammam"];
let listAr = ["الرياض", " مكة المكرمة", "الدمام"];

function userClick() {
  menu.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    let html = `
  <a  class="btn" href="#" data-city="${list[i]}"  >${listAr[i]}</a>
  `;
    menu.innerHTML += html;
  }
}

menu.addEventListener("click", function (event) {
  let clickedValue = event.target.dataset.city;
  ("value");
  let clickedcontent = event.target.textContent;
  if (clickedValue) {
    times(clickedValue, clickedcontent);
  }
});
function times(clickedValue, clickedcontent) {
  let BaseURL = "https://api.aladhan.com/v1/timingsByCity";
  let city = clickedValue;
  let country = "Saudi Arabia";

  axios
    .get(`${BaseURL}`, {
      params: {
        city: city,
        country: country,
        method: 4,
      },
    })
    .then((response) => {
      let data = response.data.data.timings;
      let date = response.data.data.date.hijri.date;

      const Sunrise = t12(data.Sunrise);
      const Fajr = t12(data.Fajr);
      const Dhuhr = t12(data.Dhuhr);
      const Asr = t12(data.Asr);
      const Maghrib = t12(data.Maghrib);
      const Isha = t12(data.Isha);
      document.getElementById("times").innerHTML = `
   <tr>
    <th>المواقيت</th>
       <td>${Sunrise}</td>
       <td>${Fajr}</td>
       <td>${Dhuhr}</td>
       <td>${Asr}</td>
       <td>${Maghrib}</td>
       <td>${Isha}</td>
    </tr>
       `;
      document.getElementById("city").innerHTML = `<h3>${clickedcontent}</h3>`;
      document.getElementById("date-time").innerHTML = `
       <span class="date">تاريخ اليوم:</span>
      <span>${date}</span>`;
    });
}

function t12(time) {
  let [hours, minutes] = time.split(`:`);
  let period = hours >= 12 ? "م" : "ص";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${period}`;
}
