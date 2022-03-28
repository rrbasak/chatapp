

// const wind=document.getElementsByClassName('userwindow')
// bbtn.addEventListener('click',()=>{
//     if(wind.style.display=="none"){
//         wind.style.display="block"
//     }
//     else{
//         wind.style.display="none"
//     }
// })
function toggleText(){
    var elms = document.getElementsByClassName("userwindow");
  
    Array.from(elms).forEach((x) => {
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    })
  }
