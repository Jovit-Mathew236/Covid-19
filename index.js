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
              console.log(singleDistrict.district_name);
              //callDistrictId(singleDistrict.district_id);
            }
          });
        }
      }

      function makeNewOptionBoxDistrict(data) {
        console.log(data);
        const districtName = data.district_name;
        if (typeof districtName != "undefined") {
          const optionBoxDistrict = document.createElement("option");
          optionBoxDistrict.innerHTML = districtName;
          selectDistrict.appendChild(optionBoxDistrict);
        }
      }
    });
  }
});
