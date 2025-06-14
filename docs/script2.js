
function loadChecking() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NoZWNraW5nP3NpdGU9PHNpdGU+JmtleT08a2V5Pg==")
  .replace(/<site>/g,"projects").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("online-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
        //console.log(`Total fails: ${counter.dataset.failed}`)
        counter.dataset.failed = "0";
        counter.style.display = "flex";
        if(isNaN(result)) {
         counter.textContent = `🟡 You shouldn't be reading this. Report it on https://alonsoaliaga.com/discord`;
         counter.style.backgroundColor = "yellow";
         counter.style.color = "black";
        }else{
         counter.textContent = `🟢 ${result} user${result==1?``:`s`} online checking our cool projects!`;
         //counter.textContent = randomMessage().replace(/{ONLINE}/g,result);
         counter.style.backgroundColor = "green";
        }
     },
     error: function (e) {
      //console.log(`Total fails: ${counter.dataset.failed}`)
      if(counter.style.display != "none") {
        let currentFails = +counter.dataset.failed;
        if(currentFails >= 1){
          counter.style.display = "none"
        }else{
          counter.textContent = `🔴 Check your internet connection!`;
          counter.style.backgroundColor = "#7c0000";
          counter.dataset.failed = `${currentFails + 1}`
        }
      }
     }
   });
 }
}
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NvdW50ZXI/c2l0ZT08c2l0ZT4ma2V5PTxrZXk+")
  .replace(/<site>/g,"projects").replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}
window.addEventListener('DOMContentLoaded',()=>{
    loadCounter();
    setTimeout(()=>{
      loadChecking();
      setInterval(()=>{
        loadChecking();
      },10000)
    },2500)
});