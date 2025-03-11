const dataTableDiv = document.getElementById("data-table");

async function fetchData() {
  const apiUrl = "https://api.nbp.pl/api/exchangerates/tables/a?format=json";
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data[0];
}

async function main() {
  const { no, rates } = await fetchData();

  document.getElementById("date").innerHTML = no;

  rates.forEach(renderRate);
}

function renderRate({ code, currency, mid: price }) {
  const el = document.createElement("div");
  el.classList.add("rate");

  el.innerHTML = `
    <div> ${code} </div>
    <div> ${currency} </div>
    <div> ${price} zł </div>
  `;

  dataTableDiv.appendChild(el);
}

main();
