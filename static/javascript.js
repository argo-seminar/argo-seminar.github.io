//document.getElementById("main_table").innerHTML+="HELLOOOOO"

async function readJSONFile() {
  const response = await fetch('./data.json');
  const jsonList = await response.json();
  return jsonList;
}



function buildTable(jsonList) {
  // Create a new HTML table element
  const table = document.createElement('table');

  // Create a header row with column names
  const headerRow = table.insertRow();
  const speakerHeader = headerRow.insertCell();
  const topicHeader = headerRow.insertCell();
  const dateHeader = headerRow.insertCell();
  speakerHeader.innerHTML = "Speaker";
  topicHeader.innerHTML = "Topic";
  dateHeader.innerHTML = "Date";
  speakerHeader.classList.add("columnHeader")
  topicHeader.classList.add("columnHeader")
  dateHeader.classList.add("columnHeader")

  // Add a row for each JSON object
  for (let i = 0; i < jsonList.length; i++) {
    const json = jsonList[i];
    const row = table.insertRow();
    const speakerCell = row.insertCell();
    const topicCell = row.insertCell();
    const dateCell = row.insertCell();
    speakerCell.innerHTML = json.Speaker;
    //topicCell.innerHTML = json.Topic;
    dateCell.innerHTML = json.Date;

    // make clicable topic
    const title = document.createElement('div');
    const abstract = document.createElement('div');
    title.innerHTML = json.Title
    abstract.innerHTML = json.Abstract
    topicCell.appendChild(title)
    topicCell.appendChild(abstract)
    title.classList.add("toggle")
    abstract.classList.add("content")
    abstract.style.display = "none"
    title.onclick = function () {
      console.log("hi")
      if (abstract.style.display === "none") {
        abstract.style.display = "inline";
      } else {
        abstract.style.display = "none";
      }
    }
  }

  // Return the generated HTML table
  return table;
}


readJSONFile().then((jsonList) => {
  const table = buildTable(jsonList.reverse());
  document.getElementById("main_table").appendChild(table);
}).catch((error) => {
  console.error(error);
});