// Read more option js

const myFunction = () => {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
};

function showMenu() {
  var menu = document.getElementById("navMenu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

// API Calling >>

// Covid 19 status Country wise

$(document).ready(function () {
  init();

  function init() {
    var url = "https://api.covid19api.com/summary";
    $.get(url, function (data) {
      //console.log(data);

      const selectCountry = document.querySelector("select#select");

      for (eachCountry in data.Countries) {
        const singleCountry = data.Countries[eachCountry];
        // console.log(singleCountry);
        makeNewOptionBox(singleCountry);

        selectCountry.addEventListener("change", function (e) {
          if (e.target.value == singleCountry.Country) {
            //console.log(singleCountry);
            callData(singleCountry);
          }
        });
      }

      function makeNewOptionBox(data) {
        const title = data.Country;
        if (typeof title != "undefined") {
          const optionBox = document.createElement("option");
          optionBox.innerHTML = title;
          selectCountry.appendChild(optionBox);
        }
      }

      function callData(cData) {
        totalDeaths = cData.TotalDeaths;
        totalRecoverd = cData.TotalRecovered;
        totalConfirmed = cData.TotalConfirmed;
        $("#totalDeaths").html(totalDeaths);
        $("#totalRecoverd").html(totalRecoverd);
        $("#totalConfirmed").html(totalConfirmed);
      }
    });
  }
});

// API Covid 19  vaccine Availablity

var date = new Date(); 
var today = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

$(document).ready(function () {
  init2();

  function init2() {
    var url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
    $.get(url, function (data) {
      //console.log(data);

      const selectState = document.querySelector("select#state");

      for (eachState in data.states) {
        const singleState = data.states[eachState];
        // console.log(singleState);
        makeNewOptionBoxStates(singleState);

        selectState.addEventListener("change", function (e) {
          if (e.target.value == singleState.state_name) {
            //console.log(singleState.state_id);
            callStateId(singleState.state_id);
            $("#district").empty();
          }
        });
      }

      function makeNewOptionBoxStates(data) {
        const stateName = data.state_name;
        if (typeof stateName != "undefined") {
          const optionBoxState = document.createElement("option");
          optionBoxState.innerHTML = stateName;
          selectState.appendChild(optionBoxState);
        }
      }

      function callStateId(data) {
        var url =
          "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + data;
        $.get(url, function (data) {
          //console.log(data);
          manupulateData(data);
        });
      }

      const selectDistrict = document.querySelector("select#district");

      function manupulateData(data) {
        for (eachDistrict in data.districts) {
          const singleDistrict = data.districts[eachDistrict];
          //console.log(singleDistrict);
          makeNewOptionBoxDistrict(singleDistrict);

          selectDistrict.addEventListener("change", function (e) {
            if (e.target.value == singleDistrict.district_name) {
              //console.log(singleDistrict.district_name);
              callDistrictId(singleDistrict.district_id);
              $("#center").empty();
            }
          });
        }
      }

      function makeNewOptionBoxDistrict(data) {
        //console.log(data);
        const districtName = data.district_name;
        if (typeof districtName != "undefined") {
          const optionBoxDistrict = document.createElement("option");
          optionBoxDistrict.innerHTML = districtName;
          selectDistrict.appendChild(optionBoxDistrict);
          return;
        }
      }

      function callDistrictId(districtData) {
        var url =
          "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
          districtData +
          "&date=" +
          today;
        $.get(url, function (data) {
          //console.log(data);
          manupulateData1(data);
        });
      }

      const selectCenter = document.querySelector("select#center");

      function manupulateData1(data) {
        for (eachCenter in data.sessions) {
          const singleCenter = data.sessions[eachCenter];
          console.log(singleCenter);
          makeNewOptionBoxCenter(singleCenter);

          selectCenter.addEventListener("change", function (e) {
            if (e.target.value == singleCenter.name) {
              //console.log(singleCenter.address);
              // callCenterId(singleCenter);

              const result = `
      <h4>Center Details</h4>
      <p>${"Address : " + singleCenter.address}</p>
      <p>${"Block Name : " + singleCenter.block_name}</p>
      <p>${"Center Id : " + singleCenter.center_id}</p>
      <p>${"Dose1 : " + singleCenter.available_capacity_dose1}</p>
      <p>${"Dose2 : " + singleCenter.available_capacity_dose2}</p>
      <p>${"Date : " + singleCenter.date}</p>
      <p>${"Fee Type : " + singleCenter.fee_type}</p>
      <p>${"Fee : " + singleCenter.fee}</p>
      <p>${"Age Limit : " + singleCenter.min_age_limit}</p>
      <p>${"From : " + singleCenter.from}</p>
      <p>${"To : " + singleCenter.to}</p>
      <p>${"Slots : " + singleCenter.slots}</p>
      <p>${"Vaccine : " + singleCenter.vaccine}</p>
      `;
              $("div#result").html(result);
            }
          });
        }
      }
      function makeNewOptionBoxCenter(data) {
        //console.log(data);
        const centerName = data.name;
        if (typeof centerName != "undefined") {
          const optionBoxCenter = document.createElement("option");
          optionBoxCenter.innerHTML = centerName;
          selectCenter.appendChild(optionBoxCenter);
        }
      }
    });
  }
});
