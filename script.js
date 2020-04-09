// get date from json
let response = fetch('timezone.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createClock(data);
  });

// create list timezone
function createClock(json) {
  // take timezone from json => arrays
  let data = json.map((item) => {
    return item.utc;
  });

  // concat arrays
  let arrayTimezone = [].concat.apply([], data);

  // first initializate clock
  for (let i = 1; i < arrayTimezone.length; i++) {
    let aestTime = new Date();
    let node = document.createElement('LI');
    node.id = `${arrayTimezone[i]}`;
    let textnode = `${arrayTimezone[i]} - ${aestTime.toLocaleString('en-US', {
      timeZone: `${arrayTimezone[i]}`,
      timeStyle: 'medium',
    })}`;
    node.innerHTML = textnode;
    document.getElementById('timezone').appendChild(node);
  }

  // redrawing time
  // let redrawing = setInterval(redrawingTimer, 1000);
  function redrawingTimer() {

    for(let i = 1; i < arrayTimezone.length; i++) {
    let aestTime = new Date();
    let textnode = `${arrayTimezone[i]} - ${aestTime.toLocaleString('en-US', {
      timeZone: `${arrayTimezone[i]}`,
      timeStyle: 'medium',
    })}`;
    document.getElementById(
      `${arrayTimezone[i]}`
    ).innerHTML = textnode;
    }
  }
}

let myVar = setInterval(myTimer, 1000);
//  myTimer();
function myTimer() {
  let aestTime = new Date();
  let textnode = `${aestTime.toLocaleString('en-US', {
    timeZone: `America/New_York`,
    timeStyle: 'medium',
  })}`;

  // convert time str "14:34:28" => array int [14, 34, 28]
  let convertTime = textnode.split(":").map(x=>parseInt(x));

  // convert time => deg
  let secondDeg = convertTime[2] * 6;
  let minuteDeg =  convertTime[1] * 6 + (convertTime[2] * 0.1);
  let hourDeg = convertTime[0] * 30 + (convertTime[1] * 0.5) + (convertTime[2] * 0.009);

  document.getElementById("secon").style.transform = "rotate("+ secondDeg +"deg) translateZ(0px)";
  document.getElementById("minut").style.transform = "rotate("+ minuteDeg +"deg) translateZ(0px)";
  document.getElementById("hour").style.transform = "rotate("+ hourDeg +"deg) translateZ(0px)";

  document.getElementById("demo").innerHTML = textnode;
 
}