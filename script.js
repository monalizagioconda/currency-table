async function startApp() {
  const apiUrl = "https://api.nbp.pl/api/exchangerates/tables/a?format=json"; // kod JSON zwracany przez serwer
  const response = await fetch(apiUrl); // chcemy poczekać aż funkcja fetch sie wykona
  const data = await response.json();
  console.log(data);

  processData(data[0]); // funkcja wykona się dopiero po ściągnięciu data
}
startApp();

function processData(obj) {
  const tableNum = obj.no;
  const ratesArr = obj.rates;

  document.getElementById("date").innerHTML = tableNum;

  const dataTableDiv = document.getElementById("data-table"); // zapamiętana referencja do obiektu

  ratesArr.forEach(element => {
    const code = element.code; // USD
    const currency = element.currency; // dolar amerykański
    const price = element.mid; // 4.1263

    addRateContent(code, currency, price, dataTableDiv);
  });
}

function addRateContent(code, currency, price, dataTableDiv) {
  const el = document.createElement("div"); // dodajemy nowy element div, który narazie jest w pamięci
  el.classList.add("rate"); // przypisujemy mu klasę 'rate'

  el.innerHTML = `
    <div> ${code} </div>
    <div> ${currency} </div>
    <div> ${price} zł </div>
  `; // !!! w innerHTML możemy pisać kod HTML

  dataTableDiv.append(el); // dodanie el do dataTableDiv. Append nie usunie poprzednich el. tylko doda nowy
}
