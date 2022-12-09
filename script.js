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

  var sortableData;
  var criterio = "Nombre";

  switch (criterio) {
  case "Nombre":
    sortableData = 0;
    break;
  case "Clase":
    sortableData = 1;
    break;
  case "Especialización":
    sortableData = 2;
    break;
  case "Rol":
    sortableData = 3;
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
    case 'Deathknight':
      color = CLASS_COLORS.Deathknight;
      break;
    case 'Druid':
      color = CLASS_COLORS.Druid;
      break;
    case 'Hunter':
      color = CLASS_COLORS.Hunter;
      break;
    case 'Mage':
      color = CLASS_COLORS.Mage;
      break;
    case 'Paladin':
      color = CLASS_COLORS.Paladin;
      break;
    case 'Priest':
      color = CLASS_COLORS.Priest;
      break;
    case 'Rogue':
      color = CLASS_COLORS.Rogue;
      break;
    case 'Shaman':
      color = CLASS_COLORS.Shaman;
      break;
    case 'Warlock':
      color = CLASS_COLORS.Warlock;
      break;
    case 'Warrior':
      color = CLASS_COLORS.Warrior;
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

    for (var j = 0; j < 4; j++) { // iteracion por cada dato del jugador

      var td = document.createElement('td');

      if (j == 0) { // Nombre con link de logs

        var a = document.createElement('a');  
        a.setAttribute('href', LOGS_URL + datos[i][j]);
        a.innerHTML = datos[i][j];
        a.style.color = setColor(datos[i][j+1]);
        td.appendChild(a);

      } else if (j == 1) { // clase con icono

        let className = datos[i][j].toLowerCase();

        if (className == "deathknight") {
          className = className.substring(5,0) + ' ' + className.substring(13,5);
        }

        // tranform the first letter of each word to uppercase
        className = className.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        td.innerHTML = '<img src="img/class/' + datos[i][j].toLowerCase() + '.png" alt="' + datos[i][j] + '" width="20" height="auto">';
        td.appendChild(document.createTextNode(" "+className));

      } else if (j == 2) { // especializacion con icono

        td.innerHTML = '<img src="img/spec/' + datos[i][1].toLowerCase() +"/"+ datos[i][j].toLowerCase() + '.png" alt="' + datos[i][j] + '" width="20" height="auto">';
        td.appendChild(document.createTextNode(" "+datos[i][j]));

      } else {

        td.appendChild(document.createTextNode(datos[i][j]));

      }

      tr.appendChild(td);

    }

    tr.style.color = setColor(datos[i][1]);
    
    tbdy.appendChild(tr);

  }

  tbl.appendChild(tbdy);

};