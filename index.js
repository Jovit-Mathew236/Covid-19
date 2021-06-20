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
    var url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
    $.get(url, function (data) {
      // console.log(data);

      var url = "https://api.covid19api.com/summary";
      $.get(url, function (dataGlobal) {
        //console.log(dataGlobal);

        // var url = "https://api.covid19api.com/summary";
        // $.get(url,function (stateStatus){
        //   console.log(stateStatus);
        // })

        const selectCountry = document.querySelector("select#select");

        for (eachCountry in data) {
          const singleCountry = data[eachCountry];
          //console.log(singleCountry);
          makeNewOptionBox(singleCountry);

          selectCountry.addEventListener("change", function (e) {
            //console.log(e.target.value);
            if (e.target.value == singleCountry.country) {
              // console.log(singleCountry);
              totalDeaths = singleCountry.deaths;
              totalRecoverd = singleCountry.recovered;
              totalConfirmed = singleCountry.cases;
              newCases = singleCountry.todayCases;
              dateUpdated = singleCountry.updated;
              if (newCases == "0") {
                $("#newCases").html("Zero");
              } else {
                $("#newCases").html(newCases);
              }
              $("#totalDeaths").html(totalDeaths);
              $("#totalRecoverd").html(totalRecoverd);
              $("#totalConfirmed").html(totalConfirmed);
              // Showing date that api modified
              let newDate = new Date(dateUpdated);
              var dateString = `${newDate.toDateString()} ${newDate.toTimeString()}`;

              dateString = dateString.split(" ").slice(0, 5).join(" ");
              // console.log(dateString);
              $("#dateMod").html("Last Updated on : " + dateString);
            }
            if (e.target.value == "global") {
              totalDeaths = dataGlobal.Global.TotalDeaths;
              totalRecoverd = dataGlobal.Global.TotalRecovered;
              totalConfirmed = dataGlobal.Global.TotalConfirmed;
              newCases = dataGlobal.Global.NewConfirmed;
              $("#totalDeaths").html(totalDeaths);
              $("#totalRecoverd").html(totalRecoverd);
              $("#totalConfirmed").html(totalConfirmed);
              $("#newCases").html(newCases);
            }
          });
        }

        function makeNewOptionBox(data) {
          const title = data.country;
          if (typeof title != "undefined") {
            const optionBox = document.createElement("option");
            optionBox.innerHTML = title;
            selectCountry.appendChild(optionBox);
          }
        }
      });
    });
  }
});

// API Covid 19  vaccine Availablity
// NB: Sometimes I feel this API is note correct, so you can check it by console.log() all data

var date = new Date();
var today =
  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

$(document).ready(function () {
  init2();

  function init2() {
    var url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
    $.get(url, function (data) {
      //console.log(data);

      // Making states Option
      const selectState = document.querySelector("select#state");
      for (eachState in data.states) {
        const singleState = data.states[eachState];
        //console.log(singleState);
        makeNewOptionBoxStates(singleState);

        selectState.addEventListener("change", function (e) {
          if (e.target.value == singleState.state_name) {
            //console.log(singleState.state_id);
            callStateId(singleState.state_id);
            $("#district").empty();
            const selDis = ` <option>Select District</option>`;
            $("#district").html(selDis);
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

      // Making district option
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
              const selCent = ` <option>Select Center</option>`;
              $("#center").html(selCent);
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

      // Making Center option
      function callDistrictId(districtId) {
        document
          .querySelector("input#date")
          .addEventListener("change", function (e) {
            // console.log(e.target.value.split("-"));
            const dateFor = e.target.value.split("-");
            $("#center").empty();
            const selCent = ` <option>Select Center</option>`;
            $("#center").html(selCent);
            var url =
              "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" +
              districtId +
              "&date=" +
              dateFor[2] +
              -+dateFor[1] +
              -+dateFor[0];
            $.get(url, function (data) {
              console.log(url);
              manupulateData1(data);
            });
          });
      }

      const selectCenter = document.querySelector("select#center");
      const selectDate = document.querySelector("input#date");

      function manupulateData1(data) {
        for (eachCenter in data.centers) {
          const singleCenter = data.centers[eachCenter];
          //console.log(singleCenter);
          makeNewOptionBoxCenter(singleCenter);

          for (eachSessions in singleCenter.sessions) {
            const singleSession = singleCenter.sessions[eachSessions];
            //console.log(singleSession);

            selectCenter.addEventListener("change", function (e) {
              if (e.target.value == singleCenter.name) {
                //console.log(singleCenter);
                // callCenterId(singleCenter);

                selectDate.addEventListener("change", function (e) {
                  singleCenter.sessions.length = 0;
                });
                if (singleCenter.fee == undefined) {
                  singleCenter.fee = "0";
                }if (singleCenter.fee == paid){
                  singleCenter.fee = "-";
                }

                const result = `
      <h4>Center Details</h4>
      <p>${"Address : " + singleCenter.address}</p>
      <p>${"Block Name : " + singleCenter.block_name}</p>
      <p>${"Center Id : " + singleCenter.center_id}</p>
      <p>${"Dose1 : " + singleSession.available_capacity_dose1}</p>
      <p>${"Dose2 : " + singleSession.available_capacity_dose2}</p>
      <p>${"Date : " + singleSession.date}</p>
      <p>${"Fee Type : " + singleCenter.fee_type}</p>
      <p>${"Fee : " + singleCenter.fee}</p>
      <p>${"Age Limit : " + singleSession.min_age_limit}</p>
      <p>${"From : " + singleCenter.from}</p>
      <p>${"To : " + singleCenter.to}</p>
      <p>${"Slots : " + singleSession.slots}</p>
      <p>${"Vaccine : " + singleSession.vaccine}</p>
      `;
                $("div#result").html(result);
              }
            });
          }
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
