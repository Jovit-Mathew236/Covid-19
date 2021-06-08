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

      const selectElem2 = document.querySelector("select#state");

      for (eachCountry in data.states) {
        const singleCountry = data.states[eachCountry];
        // console.log(singleItem);
        makeNewOptionBox2(singleCountry);

        selectElem2.addEventListener("change", function (e) {
          if (e.target.value == singleCountry.state_name) {
            console.log(singleCountry.state_id);
            //callData2(singleCountry.state_id);
          }
        });
      }

      function makeNewOptionBox2(data) {
        const title2 = data.state_name;
        if (typeof title2 != "undefined") {
          const optionBox2 = document.createElement("option");
          optionBox2.innerHTML = title2;
          selectElem2.appendChild(optionBox2);
        }
      }

      // // tD = '"' + data.Global.TotalDeaths + '"';
      // // tR = '"' + data.Global.TotalRecovered + '"';
      // // tC = '"' + data.Global.TotalConfirmed + '"';

      // // data =`
      // // <p>${'"'+data.Global.TotalDeaths+'"'}</p>
      // // <p>${'"'+data.Global.TotalRecovered+'"'}</p>
      // // <p>${'"'+data.Global.TotalConfirmed+'"'}</p>
      // // `
      // function callData2(cData2) {
      //   tD = '"' + cData.TotalDeaths + '"';
      //   tR = '"' + cData.TotalRecovered + '"';
      //   tC = '"' + cData.TotalConfirmed + '"';
      //   $("#tD").html(tD);
      //   $("#tR").html(tR);
      //   $("#tC").html(tC);
      // }

      // // $("#data").html(data)
    });
  }
});


$(document).ready(function () {
  init2();

  function init2() {
    var url = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/17";
    $.get(url, function (data) {
      console.log(data);

      // const selectElem2 = document.querySelector("select#state");

      // for (eachCountry in data.states) {
      //   const singleCountry = data.states[eachCountry];
      //   // console.log(singleItem);
      //   makeNewOptionBox2(singleCountry);

      //   selectElem2.addEventListener("change", function (e) {
      //     if (e.target.value == singleCountry.state_name) {
      //       console.log(singleCountry.state_id);
      //       //callData2(singleCountry);
      //     }
      //   });
      // }

      // function makeNewOptionBox2(data) {
      //   const title2 = data.state_name;
      //   if (typeof title2 != "undefined") {
      //     const optionBox2 = document.createElement("option");
      //     optionBox2.innerHTML = title2;
      //     selectElem2.appendChild(optionBox2);
      //   }
      // }

      // // tD = '"' + data.Global.TotalDeaths + '"';
      // // tR = '"' + data.Global.TotalRecovered + '"';
      // // tC = '"' + data.Global.TotalConfirmed + '"';

      // // data =`
      // // <p>${'"'+data.Global.TotalDeaths+'"'}</p>
      // // <p>${'"'+data.Global.TotalRecovered+'"'}</p>
      // // <p>${'"'+data.Global.TotalConfirmed+'"'}</p>
      // // `
      // function callData2(cData2) {
      //   tD = '"' + cData.TotalDeaths + '"';
      //   tR = '"' + cData.TotalRecovered + '"';
      //   tC = '"' + cData.TotalConfirmed + '"';
      //   $("#tD").html(tD);
      //   $("#tR").html(tR);
      //   $("#tC").html(tC);
      // }

      // // $("#data").html(data)
    });
  }
});