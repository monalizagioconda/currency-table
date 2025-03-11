async function fetchData() {
  const apiUrl = "https://api.nbp.pl/api/exchangerates/tables/a?format=json";
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data[0];
}

async function main() {
  const obj = await fetchData();
  const tableNum = obj.no;
  const ratesArr = obj.rates;

  document.getElementById("date").innerHTML = tableNum;

  ratesArr.forEach(renderRate);
}

function renderRate(element) {
  const code = element.code;
  const currency = element.currency;
  const price = element.mid;

  addRateContent(code, currency, price, dataTableDiv);
}

const dataTableDiv = document.getElementById("data-table");

function addRateContent(code, currency, price, dataTableDiv) {
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
