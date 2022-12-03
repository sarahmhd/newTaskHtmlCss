// global variables
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector(".total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let createBtn = document.querySelector("#create");
let search = document.querySelector("#search");
let searchByTitle = document.querySelector("#search-title");
let searchByCategory = document.querySelector("#search-category");
let deleteAll = document.querySelector("#delete-all");
let afterBtn = window.getComputedStyle(deleteAll, "::after");
let tbody = document.querySelector("table tbody");

let inputVals = [];
let tmp;

let id = 1;

// localStorage.clear();

if (localStorage.getItem("input-values")) {
  inputVals = JSON.parse(localStorage.getItem("input-values"));
}

returnData();

price.addEventListener("input", calcTotal);
taxes.addEventListener("input", calcTotal);
ads.addEventListener("input", calcTotal);
discount.addEventListener("input", calcTotal);

price.addEventListener("keyup", finishTyping);
taxes.addEventListener("keyup", finishTyping);
ads.addEventListener("keyup", finishTyping);

// create
createBtn.addEventListener("click", () => {
  let val = {
    idAtt: Math.floor(Math.random() * 100),
    title: title.value,
    price: price.value,
    ads: ads.value ? ads.value : "0",
    taxes: taxes.value ? taxes.value : "0",
    discount: discount.value ? discount.value : "0",
    total: total.textContent,
    count: count.value,
    category: category.value,
  };
  // inputVals.push(val);
  if (title.value != "" && price.value != "" && category.value != "") {
    if (createBtn.textContent == "create") {
      if (count.value != "") {
        for (let i = 1; i <= count.value; i++) {
          inputVals.push(val);
          createTr(inputVals);
          id++;
        }
      } else {
        inputVals.push(val);
        createTr(inputVals);
      }
    } else {
      inputVals[tmp] = val;
      count.disabled = false;
      count.style.opacity = "1";
      addToLocal(inputVals);
      createTr(inputVals);
      createBtn.textContent = "create";
    }
    clearInputsValue();
  }

  addToLocal(inputVals);
});

// delete all items from page and from local storage
deleteAll.addEventListener("click", deleteAllFun);

// search by title
searchByTitle.addEventListener("click", () => {
  if (search.value != "") {
    searchByTitleFunc(search.value.trim());
  }
  search.value = "";
});

// search by category
searchByCategory.addEventListener("click", () => {
  if (search.value != "") {
    searchByCatFunc(search.value.trim());
  }
  search.value = "";
});

// calculate total price
function calcTotal() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.background = "#080842";
  } else {
    total.innerHTML = "";
    total.style.background = "#af1313";
  }
}

// focus on next input after finishing typing
function finishTyping() {
  if (this.value != "") {
    let timeout = setTimeout(() => {
      this.nextElementSibling.focus();
    }, 2000);
  }
}

// create tr of table function
function createTr(inputVals) {
  calcTotal();
  tbody.innerHTML = "";
  id = 1;
  inputVals.forEach((inputVal) => {
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", id);
    let idTd = document.createElement("td");
    idTd.appendChild(document.createTextNode(id));
    idTd.className = "table_id";

    let titleTd = document.createElement("td");
    titleTd.appendChild(document.createTextNode(inputVal.title));
    titleTd.className = "table_title";

    let priceTd = document.createElement("td");
    priceTd.appendChild(document.createTextNode(inputVal.price));
    priceTd.className = "table_price";

    let taxesTd = document.createElement("td");
    taxesTd.appendChild(document.createTextNode(inputVal.taxes));
    taxesTd.className = "table_taxes";

    let adsTd = document.createElement("td");
    adsTd.appendChild(document.createTextNode(inputVal.ads));
    adsTd.className = "table_ads";

    let discountTd = document.createElement("td");
    discountTd.appendChild(document.createTextNode(inputVal.discount));
    discountTd.className = "table_discount";

    let totalTd = document.createElement("td");
    totalTd.appendChild(document.createTextNode(inputVal.total));
    totalTd.className = "table_total";

    let categoryTd = document.createElement("td");
    categoryTd.appendChild(document.createTextNode(inputVal.category));
    categoryTd.className = "table_category";

    let upd = document.createElement("td");
    let updBtn = document.createElement("button");
    updBtn.appendChild(document.createTextNode("update"));
    updBtn.className = "upd";
    upd.appendChild(updBtn);

    let del = document.createElement("td");
    let delBtn = document.createElement("button");
    delBtn.appendChild(document.createTextNode("delete"));
    delBtn.className = "del";
    del.appendChild(delBtn);

    tr.appendChild(idTd);
    tr.appendChild(titleTd);
    tr.appendChild(priceTd);
    tr.appendChild(taxesTd);
    tr.appendChild(adsTd);
    tr.appendChild(discountTd);
    tr.appendChild(totalTd);
    tr.appendChild(categoryTd);
    tr.appendChild(upd);
    tr.appendChild(del);

    tbody.appendChild(tr);
    id++;

    del.addEventListener("click", deleteEl);
    // upd.addEventListener("click", updateEl);
    upd.addEventListener("click", updateEl);

    // display or hidden Delete All Button
    if (inputVals.length >= 1) {
      deleteAll.style.cssText = "display:block;margin:0 auto";
      deleteAll.setAttribute("data-content", `(${inputVals.length})`);
      // console.log(tbody.children.length);
    } else {
      deleteAll.style.cssText = "display:none";
    }
  });
}

// add data to local Storage
function addToLocal(inputVals) {
  localStorage.setItem("input-values", JSON.stringify(inputVals));
}

// clear inputs Value after clicking on create button
function clearInputsValue() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.textContent = "";
  count.value = "";
  category.value = "";
}

// delete all function
function deleteAllFun() {
  id = 1;
  tbody.innerHTML = "";
  localStorage.clear();
  deleteAll.style.cssText = "display:none";
  inputVals = [];
  // deleteAll.removeAttribute("data-content");
}

// search by title function
function searchByTitleFunc(search) {
  // let titles = document.querySelectorAll(".table_title");
  let filterAfterSearch = inputVals.filter((el) => el.title.includes(search));
  createTr(filterAfterSearch);
}

// search by category function
function searchByCatFunc(search) {
  // let titles = document.querySelectorAll(".table_title");
  let filterAfterSearch = inputVals.filter((el) =>
    el.category.includes(search)
  );
  createTr(filterAfterSearch);
}

// delete tr
function deleteEl() {
  this.parentElement.remove();
  id--;
  // delete from local Storage
  deleteElfromLocal(this.parentElement.getAttribute("data-id"));
}
// delete tr from local Storage
function deleteElfromLocal(id) {
  let data = inputVals.filter((el) => el.idAtt != id);
  localStorage.setItem("input-values", JSON.stringify(data));
}

// update tr
function updateEl() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  let elId = this.parentElement.getAttribute("data-id");
  for (let i = 0; i < inputVals.length; i++) {
    if (i == elId - 1) {
      tmp = i;
      fillInputs(inputVals[i]);
    }
  }
}

// fill inputs
function fillInputs(inp) {
  title.value = inp.title;
  price.value = inp.price;
  taxes.value = inp.taxes;
  ads.value = inp.ads;
  category.value = inp.category;

  count.disabled = "true";
  count.style.opacity = "0.4";
  calcTotal();

  createBtn.textContent = "update";
}

function returnData() {
  let data = JSON.parse(localStorage.getItem("input-values"));
  if (data) {
    createTr(inputVals);
  }
  console.log(data);
}
