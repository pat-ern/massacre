const API_URL = "https://pat-ern.github.io/massacre/jugadores.json";
const LOGS_URL = "https://classic.warcraftlogs.com/character/us/eranikus/"; 
let criterioOrden = "Nombre"; // criterio de ordenamiento inicial (por defecto)

const classColors = { // colores de las clases
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

///////////////////////////// FUNCIONES /////////////////////////////

fetch(API_URL)
  .then(function (response) {
      // response.json() returns a json string,
      // returning it will convert it 
      // to a pure JavaScript 
      // object for the next then's callback
      return response.json();
  })
  .then(function (characters) {
      // characters is a JavaScript object here
      crearTabla(characters.jugador);
  })
  .catch(function (error) {
      console.log('Error during fetch: ' + error.message);
  });

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

function setColor(clase) {
  let color;
  switch (clase) {
    case 'Death Knight':
      color = classColors.Deathknight;
      break;
    case 'Druid':
      color = classColors.Druid;
      break;
    case 'Hunter':
      color = classColors.Hunter;
      break;
    case 'Mage':
      color = classColors.Mage;
      break;
    case 'Paladin':
      color = classColors.Paladin;
      break;
    case 'Priest':
      color = classColors.Priest;
      break;
    case 'Rogue':
      color = classColors.Rogue;
      break;
    case 'Shaman':
      color = classColors.Shaman;
      break;
    case 'Warlock':
      color = classColors.Warlock;
      break;
    case 'Warrior':
      color = classColors.Warrior;
  }
  return color;
};

function crearTabla(datos) {

  datos.sort(this.ordenarPor);
  var tbl = document.getElementsByTagName('table')[0];
  sorttable.makeSortable(tbl);
  var tbdy = document.getElementsByTagName('tbody')[0];
  
  for (var i = 0; i < datos.length; i++) {  // iteracion por cada jugador

    var tr = document.createElement('tr');

    for (var j = 0; j < 6; j++) { // iteracion por cada dato del jugador

      var td = document.createElement('td');

      if (j == 0) { // id en la tabla

        var id;

        if (i < 9) {
          id = "0" + (i+1);
        } else {
          id = i+1;
        }

        td.appendChild(document.createTextNode(id));

      } else if (j == 2) { // clase con icono

        td.innerHTML = '<img src="img/class/' + datos[i][1].replace(/\s/g, "").toLowerCase() + '.png" alt="' + datos[i][1] + '" width="20" height="auto">';
        td.appendChild(document.createTextNode(" "+datos[i][j-1]));

      } else if (j == 3) { // especializacion con icono

        td.innerHTML = '<img src="img/spec/' + datos[i][1].replace(/\s/g, "").toLowerCase() +"/"+ datos[i][2].replace(/\s/g, "").toLowerCase() + '.png" alt="' + datos[i][2] + '" width="20" height="auto">';
        td.appendChild(document.createTextNode(" "+datos[i][j-1]));

      } else if (j == 5) { // logs 

        var a = document.createElement('a');  
        a.setAttribute('href', logsUrl + datos[i][0]);
        a.innerHTML = 'Logs';
        td.appendChild(a);

      }  else {
        td.appendChild(document.createTextNode(datos[i][j-1]));
      }

      tr.appendChild(td);

    }

    tr.style.color = setColor(datos[i][1]);
    
    tbdy.appendChild(tr);

  }

  tbl.appendChild(tbdy);

}