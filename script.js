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
    case 'deathknight':
      color = CLASS_COLORS.Deathknight;
      break;
    case 'druid':
      color = CLASS_COLORS.Druid;
      break;
    case 'hunter':
      color = CLASS_COLORS.Hunter;
      break;
    case 'mage':
      color = CLASS_COLORS.Mage;
      break;
    case 'paladin':
      color = CLASS_COLORS.Paladin;
      break;
    case 'priest':
      color = CLASS_COLORS.Priest;
      break;
    case 'rogue':
      color = CLASS_COLORS.Rogue;
      break;
    case 'shaman':
      color = CLASS_COLORS.Shaman;
      break;
    case 'warlock':
      color = CLASS_COLORS.Warlock;
      break;
    case 'warrior':
      color = CLASS_COLORS.Warrior;
  }
  return color;
};

function titleCase(string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function crearTabla(datos) {

  // Ordenar js obj array por nombre
  datos.sort(this.ordenarPor);
  // Crear tabla
  let tbl = document.getElementsByTagName('table')[0];
  // Hacer que tabla sea ordenable con sorttable.js
  sorttable.makeSortable(tbl);
  // Crear tbody
  let tbdy = document.getElementsByTagName('tbody')[0];
  
  // Iteracion por cada jugador
  for (var i = 0; i < datos.length; i++) {  

    let tr = document.createElement('tr');

    // Get class name
    let className = datos[i][1].toLowerCase();
    if (className == "deathknight") {
      className = className.substring(5,0) + ' ' + className.substring(13,5);
    }

    // Columna 1 - Nombre
    var td = document.createElement('td');
    var a = document.createElement('a');  
    a.setAttribute('href', LOGS_URL + datos[i][0]);
    a.innerHTML = titleCase(datos[i][0]);
    a.style.color = setColor(datos[i][1]);
    td.appendChild(a);
    tr.appendChild(td);

    // Columna 2 - Clase
    var td = document.createElement('td');
    td.innerHTML = '<img src="img/class/' + datos[i][1] + '.png" alt="' + className + '" width="20" height="auto">';
    td.appendChild(document.createTextNode(" " + titleCase(className)));
    tr.appendChild(td);
    
    // Columna 3 - Spec
    var td = document.createElement('td');
    td.innerHTML = '<img src="img/spec/' + datos[i][1] +"/"+ datos[i][2] + '.png" alt="' + datos[i][2] + '" width="20" height="auto">';
    td.appendChild(document.createTextNode(" " + titleCase(datos[i][2])));
    tr.appendChild(td);

    // Columna 4 - Role
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(titleCase(datos[i][3])));
    tr.appendChild(td);

    // Set row color based on class
    tr.style.color = setColor(datos[i][1]);
    
    // Append row to table
    tbdy.appendChild(tr);

  }

  tbl.appendChild(tbdy);

};