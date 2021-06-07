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



$(document).ready(function(){
  init()

  function init(){
    var url = "https://api.covid19api.com/summary"
    $.get(url,function(data){
      console.log(data);

      tD = '"'+data.Global.TotalDeaths+'"'
      tR = '"'+data.Global.TotalRecovered+'"'
      tC = '"'+data.Global.TotalConfirmed+'"'
      // data =`
      // <p>${'"'+data.Global.TotalDeaths+'"'}</p>
      // <p>${'"'+data.Global.TotalRecovered+'"'}</p>
      // <p>${'"'+data.Global.TotalConfirmed+'"'}</p>
      // `

      $("#tD").html(tD)
      $("#tR").html(tR)
      $("#tC").html(tC)

      // $("#data").html(data)
    })
  }
})