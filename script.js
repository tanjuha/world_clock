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
  let textnode = `${aestTime.toLocaleString('pt-PT', {
    timeZone: `America/Dawson`,
    timeStyle: 'medium',
  })}`;

  // convert time str "14:34:28" => array int [14, 34, 28]
  let convertTime = textnode.split(":").map(x=>+x);

  console.log(convertTime)
  document.getElementById("demo").innerHTML = textnode;
 
}