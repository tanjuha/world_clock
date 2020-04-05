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
  // var redrawing = setInterval(redrawingTimer, 1000);
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
