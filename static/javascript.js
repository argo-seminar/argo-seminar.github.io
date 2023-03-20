//document.getElementById("main_table").innerHTML+="HELLOOOOO"

async function readJSONFile(file) {
  const response = await fetch(file);
  const jsonList = await response.json();
  return jsonList;
}



function buildTable(jsonList) {
  // Create a new HTML table element
  const table = document.createElement('table');
  table.classList.add("table")
  table.classList.add("table-bordered")
  table.classList.add("table-striped")

  // Create a header row with column names
  const headerRow = table.insertRow();
  const speakerHeader = document.createElement("th")
  const topicHeader = document.createElement("th")
  const dateHeader = document.createElement("th")
  headerRow.append(speakerHeader)
  headerRow.append(topicHeader)
  headerRow.append(dateHeader)
  speakerHeader.innerHTML = "Speaker";
  topicHeader.innerHTML = "Topic";
  dateHeader.innerHTML = "Date";

  // Add a row for each JSON object
  for (let i = 0; i < jsonList.length; i++) {
    const json = jsonList[i];
    const row = table.insertRow();
    const speakerCell = row.insertCell();
    const topicCell = row.insertCell();
    dateCell = document.createElement("th")
    row.append(dateCell)
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


// Will be used to create a div per person We could add office in the card
function createDivPerson(json) {
  let divPerson = document.createElement("div");
  divPerson.className = "person-div";

  let name = document.createElement("h1");
  name.className = "person-name";
  name.innerHTML = json.name;
  divPerson.appendChild(name);

  let position = document.createElement("h2");
  position.className = "person-position";
  position.innerHTML = json.position;
  divPerson.appendChild(position);

  let pic = document.createElement("img");
  pic.className = "person-pic";
  pic.src = json.pic_url;
  divPerson.appendChild(pic);

  let interests = document.createElement("p");
  interests.className = "person-interests";
  interests.innerHTML = "Interests: " + json.interests;
  divPerson.appendChild(interests);

  return divPerson;
}