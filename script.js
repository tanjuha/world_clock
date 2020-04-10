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
    node.innerHTML +=
      textnode +
      `
    <div class="cityClock">
      <div id=${arrayTimezone[i]}-hour class="hour"></div>
      <div id=${arrayTimezone[i]}-minut class="minut"></div>
      <div id=${arrayTimezone[i]}-secon class="secon"></div>
      <div class="center"></div>
    </div>
    `;
    document.getElementById('timezone').appendChild(node);

    //create clock
    // convert time str "14:34:28" => array int [14, 34, 28]
    let convertTime = textnode.split(':').map((x) => parseInt(x));

    // convert time => deg
    let secondDeg = convertTime[2] * 6;
    let minuteDeg = convertTime[1] * 6 + convertTime[2] * 0.1;
    let hourDeg =
      convertTime[0] * 30 + convertTime[1] * 0.5 + convertTime[2] * 0.009;

    document.getElementById(`${arrayTimezone[i]}-secon`).style.transform =
      'rotate(' + secondDeg + 'deg) translateZ(0px)';
    document.getElementById(`${arrayTimezone[i]}-minut`).style.transform =
      'rotate(' + minuteDeg + 'deg) translateZ(0px)';
    document.getElementById(`${arrayTimezone[i]}-hour`).style.transform =
      'rotate(' + hourDeg + 'deg) translateZ(0px)';
  }

  // redrawing time
  let redrawing = setInterval(redrawingTimer, 3000);
  function redrawingTimer() {
    for (let i = 1; i < arrayTimezone.length; i++) {
      let aestTime = new Date();
      let textnode = `${arrayTimezone[i]} - ${aestTime.toLocaleString('en-US', {
        timeZone: `${arrayTimezone[i]}`,
        timeStyle: 'medium',
      })}`;
      document.getElementById(`${arrayTimezone[i]}`).innerHTML +=
      textnode +
      `
    <div class="cityClock">
      <div id=${arrayTimezone[i]}-hour class="hour"></div>
      <div id=${arrayTimezone[i]}-minut class="minut"></div>
      <div id=${arrayTimezone[i]}-secon class="secon"></div>
      <div class="center"></div>
    </div>
    `;

    //create clock
    // convert time str "14:34:28" => array int [14, 34, 28]
    let convertTime = textnode.split(':').map((x) => parseInt(x));

    // convert time => deg
    let secondDeg = convertTime[2] * 6;
    let minuteDeg = convertTime[1] * 6 + convertTime[2] * 0.1;
    let hourDeg =
      convertTime[0] * 30 + convertTime[1] * 0.5 + convertTime[2] * 0.009;

    document.getElementById(`${arrayTimezone[i]}-secon`).style.transform =
      'rotate(' + secondDeg + 'deg) translateZ(0px)';
    document.getElementById(`${arrayTimezone[i]}-minut`).style.transform =
      'rotate(' + minuteDeg + 'deg) translateZ(0px)';
    document.getElementById(`${arrayTimezone[i]}-hour`).style.transform =
      'rotate(' + hourDeg + 'deg) translateZ(0px)';
    }
  }
}
