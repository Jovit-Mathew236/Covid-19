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

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow'
// };

// fetch("https://api.covid19api.com/summary", requestOptions)
//   .then(res => res.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

$(document).ready(function () {
  init();

  function init() {
    var url = "https://api.covid19api.com/summary";
    $.get(url, function (data) {
      //console.log(data.Countries);

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
