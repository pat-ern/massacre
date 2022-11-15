var datos  = [
    {
    0: "Arcadio",
    1: "Paladin",
    2: "Holy",
    3: "Healer",
    4: "4055",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/arcadio"},
    {
    0: "Steingrímur",
    1: "Warrior",
    2: "Proteccion",
    3: "Tank",
    4: "4000",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/steingrímur"},
    {
    0: "Kunta",
    1: "Death Knight",
    2: "Frost",
    3: "Tank",
    4: "4000",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/kunta"},
    {
    0: "Magyos",
    1: "Mage",
    2: "Arcane",
    3: "DPS",
    4: "4081",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/magyos"},
    {
    0: "Radamir",
    1: "Hunter",
    2: "Survival",
    3: "DPS",
    4: "3943",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/radamir"},
    {
    0: "Darlune",
    1: "Hunter",
    2: "Survivor",
    3: "DPS",
    4: "4006",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/darlune"},
    {
    0: "Chamorca",
    1: "Shaman",
    2: "Enhancement",
    3: "DPS",
    4: "3977",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/chamorca"},
    {
    0: "Sottile",
    1: "Hunter",
    2: "Survival",
    3: "DPS",
    4: "4006",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/sottile"},
    {
    0: "Virueladmono",
    1: "Priest",
    2: "Discipline",
    3: "Healer",
    4: "3884",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/virueladmono"},
    {
    0: "Vonchanclas",
    1: "Druid",
    2: "Restoration",
    3: "Healer",
    4: "4001",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/vonchanclas"},
    {
    0: "Carnagee",
    1: "Rogue",
    2: "Assassination",
    3: "DPS",
    4: "4000",
    5: "https://classic.warcraftlogs.com/character/us/eranikus/carnagee"},

  ];

  classColors = {
    "Deathknight": "#C41F3B",
    "Druid": "#FF7D0A",
    "Hunter": "#ABD473",
    "Mage": "#69CCF0",
    "Paladin": "#F58CBA",
    "Priest": "#FFFFFF",
    "Rogue": "#FFF569",
    "Shaman": "#0070DE",
    "Warlock": "#9482C9",
    "Warrior": "#C79C6E",
  };


  var queryURL = "https://pat-ern.github.io/massacre_web/jugadores.json";

  fetch(queryURL)
    .then(function (response) {
        // response.json() returns a json string,
        // returning it will convert it 
        // to a pure JavaScript 
        // object for the next then's callback
        return response.json();
        console.log(response);
    })
    .then(function (users) {
        // users is a JavaScript object here
        console.log(users);
    })
    .catch(function (error) {
        console.log('Error during fetch: ' + error.message);
    });


  criterioOrden = "Nombre";

  ordenarPor = (a, b) => {

    switch (criterioOrden) {
    case "Nombre":
      this.sortableData = 0;
      break;
    case "Clase":
      this.sortableData = 1;
      break;
    case "Especialización":
      this.sortableData = 2;
      break;
    case "Rol":
      this.sortableData = 3;
      break;
    case "GS":
      this.sortableData = 4;
      break;
    }

    if (a[sortableData] < b[sortableData]) {
      return -1;
    }
    if (a[sortableData] > b[sortableData]) {
      return 1;
    }
    return 0;
    
  };

  datos.sort(this.ordenarPor);

  function tableCreate() {

    var tbl = document.getElementsByTagName('table')[0];
    sorttable.makeSortable(tbl);
    var tbdy = document.getElementsByTagName('tbody')[0];
    
    for (var i = 0; i < datos.length; i++) {  // iteracion por cada jugador

      var tr = document.createElement('tr');

      for (var j = 0; j < 7; j++) { // iteracion por cada dato del jugador

        var td = document.createElement('td');

        if (j == 0) {
          td.appendChild(document.createTextNode(i+1));
        } else if (j >= 1 && j <= 5) {
          td.appendChild(document.createTextNode(datos[i][j-1]));
        } else if (j == 6) {
          var a = document.createElement('a');  //crea el link
          a.setAttribute('href', datos[i][j-1]);
          a.innerHTML = 'Logs';
          td.appendChild(a);
        } 

        tr.appendChild(td);

      }

      switch (datos[i][1]) {
        case 'Death Knight':
          tr.style.color = classColors.Deathknight;
          break;
        case 'Druid':
          tr.style.color = classColors.Druid;
          break;
        case 'Hunter':
          tr.style.color = classColors.Hunter;
          break;
        case 'Mage':
          tr.style.color = classColors.Mage;
          break;
        case 'Paladin':
          tr.style.color = classColors.Paladin;
          break;
        case 'Priest':
          tr.style.color = classColors.Priest;
          break;
        case 'Rogue':
          tr.style.color = classColors.Rogue;
          break;
        case 'Shaman':
          tr.style.color = classColors.Shaman;
          break;
        case 'Warlock':
          tr.style.color = classColors.Warlock;
          break;
        case 'Warrior':
          tr.style.color = classColors.Warrior;
      }

      tbdy.appendChild(tr);

    }

    tbl.appendChild(tbdy);

  }

  tableCreate();