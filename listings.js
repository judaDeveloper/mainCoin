var myselection = {
  id: "",
  info: [],
  loans: [],
  payments: [],
};
var mysearch = {
  type: "clients",
  results: [],
  input: document.getElementById("inputSearch"),
};
mysearch.input.value = "";



function monthName(mon) {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][mon - 1];
}
const getsums = (obj) => {
  let sumz = {
    c: 0,
    a: 0,
    i: 0,
    t: 0,
    p: 0,
    b: 0,
  };
  sumz.c = obj.length;
  for (i = 0; i < sumz.c; ++i) {
    sumz.a += obj[i].amounts[0];
    sumz.i += obj[i].amounts[1];
    sumz.t += obj[i].amounts[2];
    sumz.p += obj[i].amounts[3];
    sumz.b += obj[i].amounts[4];
  }
  return sumz;
};

function getdates(date) {
  let dt = new Date(date);
  let mm = dt.getDate() + "-" + monthName(dt.getMonth() + 1);
  let dd = new Date(date).toLocaleDateString();
  let dx = [mm, dd];
  return dx;
}

/*=============
CURRENTS FILTER 
===============*/
const usersfilter = (nput) => {
  let txt = nput.value.toLowerCase();
  let db = appdata.users.filter((item) => item.clss == "client");
  let arr = db.filter(
    (item) =>
      item.names[0].toLowerCase().indexOf(txt) > -1 ||
      item.names[1].toLowerCase().indexOf(txt) > -1 ||
      item.names[2].toLowerCase().indexOf(txt) > -1 ||
      (item.names[0] + " " + item.names[1]).toLowerCase().indexOf(txt) > -1 ||
      (item.names[2] + " " + item.names[0]).toLowerCase().indexOf(txt) > -1 ||
      (item.names[0] + " " + item.names[2]).toLowerCase().indexOf(txt) > -1 ||
      (item.names[1] + " " + item.names[0]).toLowerCase().indexOf(txt) > -1 ||
      (item.names[2] + " " + item.names[1]).toLowerCase().indexOf(txt) > -1 ||
      (item.names[1] + " " + item.names[2]).toLowerCase().indexOf(txt) > -1 ||
      item.idnumber.toLowerCase().indexOf(txt) > -1 ||
      item.contacts[0].toLowerCase().indexOf(txt) > -1 ||
      item.contacts[1].toLowerCase().indexOf(txt) > -1 ||
      item.email.toLowerCase().indexOf(txt) > -1 ||
      item.location[0].toLowerCase().indexOf(txt) > -1 ||
      item.location[1].toLowerCase().indexOf(txt) > -1 ||
      item.location[2].toLowerCase().indexOf(txt) > -1 ||
      item.krapin.toLowerCase().indexOf(txt) > -1
  );
  return arr;
};

function usersearch(nput) {
  nput.addEventListener("input", function (e) {
    mysearch.results = usersfilter(this);
    if (mysearch.type == "clients") {
      listclients();
    } else if (mysearch.type == "loans") {
      listloans();
    }
  });
}
usersearch(mysearch.input);

/*=============
FETCH CLIENTS 
===============*/
function listclients() {
  let arr = [];
  if (mysearch.input.value !== "") {
    arr = mysearch.results;
  } else {
    arr = appdata.users;
  }
  let data = arr.filter((item) => item.clss == "client");
  let fx = document.createDocumentFragment();
  let grid = document.querySelector(".listings");

  let x = data.length;
  for (i = 0; i < x; ++i) {
    let tr = document.createElement("tr");

    tr.dataset.data = JSON.stringify(data[i]);
    let name = data[i].names[3]
      .toLowerCase()
      .replace(/\b\w/g, (s) => s.toUpperCase());

    tr.innerHTML =
      "<td class='col1'> <p class='tbpic'><img src=" +
      data[i].images[0] +
      " alt=' ' onerror=" +
      "this.src='/assets/svg/user2.svg'" +
      "></p></dt> <td class='col2'>" +
      name +
      "</td><td class='col3'>" +
      data[i].address[0] +
      "</td><td class='col4'>" +
      data[i].contacts[0] +
      "</td>" +
      "<div class='menu'>" +
      `<svg class="btnprofile" viewBox="0 0 16 16" onclick="toggleModals('Profile', '')">
      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    </svg>
    <svg  class="btnrecords" viewBox="0 0 16 16" onclick="document.getElementById('records').style.display='block'">
      <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
    </svg>` +
      "</div>";
    fx.appendChild(tr);
  }

  if (x > 0) {
    grid.classList.add("clients");
  } else {
    grid.classList.remove("clients");
  }
  grid.querySelector("#thead").innerHTML =
    "<th>name</th> <th>town</th> <th>contacts</th>";
  grid.querySelector("#foot").innerHTML =
    "<th>Count</th> <th>" + x + "</th> <th></th>";
  grid.querySelector("#tbody").replaceChildren(fx);
}
listclients();

/*===============
FETCH LOANS
=================*/
const listloans = () => {
  let data = myselection.loans;
  let grid, thead, tbody, tfoot;

  if (mysearch.type == "loans") {
    grid = document.querySelector(".listings");
    thead = grid.querySelector("#thead");
    tbody = grid.querySelector("#tbody");
    tfoot = grid.querySelector("#foot");

    if (mysearch.input.value !== "") {
      data = appdata.loans.filter((item) =>
        mysearch.results.map((d) => d.cid).includes(item.cid)
      );
    } else {
      data = appdata.loans;
    }
  } else {
    grid = document.querySelector("#recods");
    thead = grid.querySelector("#tbheda");
    tbody = grid.querySelector("#tbdata");
    tfoot = grid.querySelector("#tbfoot");
  }

  let xf = document.createDocumentFragment();
  for (i = 0; i < data.length; ++i) {
    let row = document.createElement("tr");
    let idate = new Date(data[i].dates[0]);
    let days = tofloat(data[i].dates[1]) / 7;
    let dued = new Date(data[i].dates[2]).toLocaleDateString();
    let imon = idate.getDate() + "-" + monthName(idate.getMonth() + 1);

    let wks;
    if (days == 1) {
      wks = "1 week";
    } else {
      wks = days + " weeks";
    }

    let amt = toCurrency(data[i].amounts[0]);
    let sum = toCurrency(data[i].amounts[2]);
    let pay = toCurrency(data[i].amounts[3]);
    let bal = toCurrency(data[i].amounts[4]);
    row.dataset.xdata = JSON.stringify(data[i]);
    row.innerHTML =
      "<td>" +
      imon +
      "</td> <td>" +
      dued +
      "</td> <td>" +
      amt +
      "</td> <td>" +
      sum +
      "</td> <td>" +
      pay +
      "</td> <td>" +
      bal +
      "</td>";
    xf.appendChild(row);
  }
  let sums = getsums(data);

  if (data.length > 0) {
    grid.classList.add("loans");
  } else {
    grid.classList.remove("loans");
  }
  thead.innerHTML = `<tr><th>Date</th> <th>Duedate</th> <th>Amount</th> <th>Total</th> <th>Paid</th> <th>Balance </th> </tr>`;
  tfoot.innerHTML =
    "<tr><th>Count</th> <th>" +
    sums.c +
    "</th> <th></th> <th> Ksh " +
    sums.a +
    "</th> <th> Ksh " +
    sums.t +
    "</th> <th> Ksh " +
    sums.p +
    "</th> <th> Ksh " +
    sums.b +
    "</th></tr>";
  tbody.replaceChildren(xf);
};




const listpayments = () => {
  if (mysearch.input.value !== "") {
    data = appdata.payments.filter((item) =>
      mysearch.results.map((d) => d.cid).includes(item.cid)
    );
  } else {
    data = appdata.payments;
  }

  let th, tb, tf;
  let dv = document.querySelector(".listings");
  th = dv.querySelector("#thead");
  tb = dv.querySelector("#tbody");
  tf = dv.querySelector("#foot");
  let xf = document.createDocumentFragment();

  let total = 0;
  for (i = 0; i < data.length; ++i) {
    let wks;
    let row = document.createElement("tr");
    let date = new Date(data[i].date);
    let amt = toCurrency(data[i].amount);
    total = +data[i].amount;
    row.dataset.xdata = JSON.stringify(data[i]);
    row.innerHTML =
      "<td>" +
      data[i].pid +
      "</td> <td>" +
      date +
      "</td> <td>" +
      data[i].mode +
      "</td> <td>" +
      amt +
      "</td>";
    xf.appendChild(row);
  }
  if (data.length > 0) {
    dv.classList.add("data");
  } else {
    dv.classList.remove("data");
  }
  th.innerHTML = `<tr><th>id</th> <th>Date</th> <th>Amount</th> <th>Mode</th> </tr>`;
  tf.innerHTML =
    "<tr><th>Count</th> <th>" +
    data.length +
    "</th> <th></th> <th> Ksh " +
    total +
    "</th>";
  tb.replaceChildren(xf);
};
listpayments();

function currentprofile() {
  let info = myselection.info;
  document.getElementById("clientphoto").src = info.images[0];
  document.getElementById("cmrcid").textContent = info.cid;
  document.getElementById("cmrid").textContent = info.idnumber;
  document.getElementById("cmrphone").textContent = info.contacts[0];
  document.getElementById("cmrtown").textContent = info.address[1];
  document.getElementById("cmrage").textContent = CalculatorAge(info.birthdate);
  document.getElementById("clientname").textContent = info.names[3]
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
  listloans();
}

function datafilters(x) {
  if (x !== "") {
    if (mysearch.type == "clients") {
      myselection.loans = appdata.loans.filter((item) => item.cid == x);
      myselection.payments = appdata.payments.filter((item) => item.cid == x);
    } else if (mysearch.type == "loans") {
      myselection.loans = appdata.loans.filter((item) => item.lid == x);
      myselection.payments = appdata.payments.filter((item) => item.lid == x);
    }
    document.getElementById("InputSelectedID").value = myselection.id;
  }
}

document.getElementById("tbody").addEventListener("click", function (e) {
  let tr = e.target.closest("tr");
  let data = JSON.parse(tr.dataset.data);
  let x = this.getElementsByTagName("tr");
  for (i = 0; i < x.length; ++i) {
    x[i].className = "";
  }
  if (mysearch.type == "clients") {
    myselection.id = data.cid;
    myselection.info = data;
  } else if (mysearch.type == "loans") {
    myselection.id = data.lid;
    myselection.info = data;
  }

  datafilters(myselection.id);
  tr.className = "rowselected";
  currentprofile();
});

/*==================
    Left Navigation 
====================*/
const fetchlists = (x) => {
  if (x == "home") {
    //dashrecords();
  } else if (x == "clients") {
    listclients();
  } else if (x == "loans") {
    //listloans();
  } else if (x == "requests") {
    // listpayments();
  } else if (x == "payments") {
    listpayments();
  } else if (x == "Reports") {
    // listpayments();
  }
  //document.getElementById("listname").textContent = txt.toUpperCase();
};
document.querySelector(".letfTab").addEventListener("click", function (e) {
  let tab = e.target.closest("label p");
  let txt = tab.textContent.toLowerCase();
  mysearch.type = txt;
  fetchlists(txt);
  document.querySelector(".listings").className = txt;
  //document.getElementById("listname").textContent = txt.toUpperCase();
  document.getElementById("listname").textContent = mysearch.panel.className;
});

const fetchClient = (id) => {
  db.collection("cc_userdata")
    .where("cid", "==", id.value)
    .orderBy("cid")
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id) {
          deleteclient(doc.id);
        }
      });
    });
};

const deleteclient = (cid) => {
  db.collection("cc_userdata")
    .doc(cid)
    .delete()
    .then(() => {
      fetchusers();
      alert("Document successfully deleted!");
    })
    .catch((error) => {
      alert.error("Error removing document: ", error);
    });
};
