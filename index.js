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

$(document).ready(function () {
  init();

  function init() {
    var url = "https://api.covid19api.com/summary";
    $.get(url, function (data) {
      //console.log(data);

      const selectElem = document.querySelector("select#select");

      for (eachItem in data.Countries) {
        const singleItem = data.Countries[eachItem];
        // console.log(singleItem);
        makeNewOptionBox(singleItem);

        selectElem.addEventListener("change", function (e) {
          if (e.target.value == singleItem.Country) {
            //console.log(singleItem);
            callData(singleItem);
          }
        });
      }

      function makeNewOptionBox(data) {
        const title = data.Country;
        if (typeof title != "undefined") {
          const optionBox = document.createElement("option");
          optionBox.innerHTML = title;
          selectElem.appendChild(optionBox);
        }
      }

      // tD = '"' + data.Global.TotalDeaths + '"';
      // tR = '"' + data.Global.TotalRecovered + '"';
      // tC = '"' + data.Global.TotalConfirmed + '"';

      // data =`
      // <p>${'"'+data.Global.TotalDeaths+'"'}</p>
      // <p>${'"'+data.Global.TotalRecovered+'"'}</p>
      // <p>${'"'+data.Global.TotalConfirmed+'"'}</p>
      // `
      function callData(cData) {
        tD = '"' + cData.TotalDeaths + '"';
        tR = '"' + cData.TotalRecovered + '"';
        tC = '"' + cData.TotalConfirmed + '"';
        $("#tD").html(tD);
        $("#tR").html(tR);
        $("#tC").html(tC);
      }

      // $("#data").html(data)
    });
  }
});



var date = new Date();
var today = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();


$(document).ready(function () {
  init2();

  function init2() {
    var url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
    $.get(url, function (data) {
      //console.log(data);

      const selectState = document.querySelector("select#state");

      for (eachState in data.states) {
        const singleState = data.states[eachState];
        // console.log(singleCountry);
        makeNewOptionBoxStates(singleState);

        selectState.addEventListener("change", function (e) {
          if (e.target.value == singleState.state_name) {
            //console.log(singleCountry.state_id);
            callStateId(singleState.state_id);
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
          "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+districtData+"&date="+today;
        $.get(url, function (data) {
          //console.log(data);
          manupulateData1(data);
        });
      }

      const selectCenter = document.querySelector("select#center");

      function manupulateData1(data) {
        for (eachCenter in data.sessions) {
          const singleCenter = data.sessions[eachCenter];
          //console.log(singleCenter);
          makeNewOptionBoxCenter(singleCenter);

          selectCenter.addEventListener("change", function (e) {
            if (e.target.value == singleCenter.name) {
              //console.log(singleCenter.address);
              // callCenterId(singleCenter);
              
        const result =`
      <p>${'address:'+singleCenter.address}</p>
      <p>${'address:'+singleCenter.block_name}</p>
      <p>${'address:'+singleCenter.available_capacity_dose1}</p>
      <p>${'address:'+singleCenter.available_capacity_dose2}</p>
      <p>${'address:'+singleCenter.addres}</p>
      <p>${'address:'+singleCenter.addres}</p>
      <p>${'address:'+singleCenter.addres}</p>
      <p>${'address:'+singleCenter.addres}</p>
      <p>${'address:'+singleCenter.addres}</p>
      <p>${'address:'+singleCenter.addres}</p>
      <p>${'address:'+singleCenter.addres}</p>

      `;
      $("div#result").html(result)
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


      // function callCenterId(centerData){
      //   console.log(centerData);
        
      // }
    });
  }
});


// address: "Vizhickathodu PHCVizhickathodu PO Kanjirappally Kottayam"
// available_capacity: 0
// available_capacity_dose1: 0
// available_capacity_dose2: 0
// block_name: "Erumely CHC"
// center_id: 127701
// date: "10-06-2021"
// fee: "0"
// fee_type: "Free"
// from: "09:00:00"
// min_age_limit: 18
// pincode: 686518
// slots: (4) ["09:00AM-10:00AM", "10:00AM-11:00AM", "11:00AM-12:00PM", "12:00PM-02:00PM"]
// to: "14:00:00"
// vaccine: "COVISHIELD"