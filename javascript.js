function vremenskaPrognoza(){
  $(document).ready(function() {
  let key='11489705b85b85261e66896675ac8c16';
  let url = "https://api.openweathermap.org/data/2.5/forecast";
  let city = document.getElementById("city").value;
  $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      data: {
        q: city, //grad za koji trazimo vremensku prognozu
        appid: key,
        units: "metric", //Za temperaturu u celzijusima
        lang:"hr" //vremenska prognoza se ispisuje na hrvatskom
      },
      success: function(data) {
          let info = ""; //ostavljamo kao prazno jer kasnije dodajemo podatke
          $.each(data.list, function(index, value) { //.list jer se tako zove objekat u jsonu
            let datum=value.dt_txt.split(' ')[1]; //posto u jsonu imamo format 2019-12-19 12:00:00
            let sati= datum.split(':')[0]; //posto u jsonu imamo format 2019-12-19 12:00:00
            if (sati==="12") { //temperatura se ucitava svaka 3 sata tako da je moglo ovdje pisati 6, 9, 12, 15...
              info += "<div id='prognoza'>";
              info +="<h4>  "+ value.dt_txt.split(' ')[0].split("-")[2] + "." + value.dt_txt.split(' ')[0].split("-")[1] + "."  + value.dt_txt.split(' ')[0].split("-")[0] +"</h4>"; //ispis datuma na nas nacin
              info +="<p id='temperatura'>"+ Math.round(value.main.temp) + "&degC"+"</p>"; //ispis temperature u celzijusima
              info += "<p id='tekst'>  " + value.weather[0].description.toUpperCase() + "</p>"; //ispis opisa vremena
              info += "<img src='https://openweathermap.org/img/w/" + value.weather[0].icon + ".png'>"; //ispis slike koja predstavlja vrijeme
              info += "Brzina vjetra" + "</br>" + Math.round(value.wind.speed * 3.6) + "km/h"; //ispis brzine vjetra(u jsonu je u m/s)
              info += "</div>"
              $("#content").html(info); //dodavanje u html
            }
          });
       }
     });
   });
 }
