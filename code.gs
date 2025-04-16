function doGet() {
  return HtmlService.createHtmlOutputFromFile("inicio");

}


function cargarWAlumno() {
  return HtmlService.createHtmlOutputFromFile('login') // nombre del archivo .html sin la extensión
                     .getContent();
}

function cargarWProfesor() {
  return HtmlService.createHtmlOutputFromFile('loginProfesores') // nombre del archivo .html sin la extensión
                     .getContent();
}

function cargarLogout() {
  return HtmlService.createHtmlOutputFromFile('login') // nombre del archivo .html sin la extensión
                     .getContent();
}

function cargarLogoutProfesores() {
  return HtmlService.createHtmlOutputFromFile('loginProfesores') // nombre del archivo .html sin la extensión
                     .getContent();
}

function verificarLogin(email, password) {
  const hoja = SpreadsheetApp.getActive().getSheetByName("ALUMNOS");
  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][2] === email && datos[i][9] === password) {
      return { exito: true, mensaje: "Acceso correcto", nombre: datos[i][1], fila: i + 1 };
    }
  }

  return { exito: false, mensaje: "Email o contraseña incorrectos" };
}

function cargarIndex(nombre) {
  const plantilla = HtmlService.createTemplateFromFile("index");
  plantilla.nombre = nombre;
  return plantilla.evaluate().getContent();  // ATENCIÓN: usamos .getContent()
}

function verificarLoginProfesores(email, password) {
  const hoja = SpreadsheetApp.getActive().getSheetByName("PROFESORES");
  const datos = hoja.getDataRange().getValues();

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][1] === email && datos[i][2] === password) {
      return { exito: true, mensaje: "Acceso correcto", nombre: datos[i][0], fila: i + 1 };
    }
  }

  return { exito: false, mensaje: "Email o contraseña incorrectos" };
}

function cargarIndexProfesores(nombre) {
  const plantilla = HtmlService.createTemplateFromFile("indexProfesores");
  plantilla.nombre = nombre;
  return plantilla.evaluate().getContent();  // ATENCIÓN: usamos .getContent()
}

function mostrarLogin() {
  return HtmlService.createHtmlOutputFromFile("login")
    .setTitle("Login Escuela de Música")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function generarMensajeAlumnoPorNombre(nombre) {
  const hojaLM = SpreadsheetApp.getActive().getSheetByName("EVALUAR LENGUAJE MUSICAL");
  const hoja1I = SpreadsheetApp.getActive().getSheetByName("EVALUAR 1º INSTRUMENTO");
  const hoja2I = SpreadsheetApp.getActive().getSheetByName("EVALUAR 2º INSTRUMENTO");
  const hojaAL = SpreadsheetApp.getActive().getSheetByName("ALUMNOS")

  let datosLM = hojaLM.getDataRange().getValues();
  let fila = datosLM.findIndex(fila => fila[1] === nombre); // Columna B (índice 1)

  if (fila === -1) return "No se encontraron datos para este alumno.";

  let n = fila + 1; // porque getValues empieza en 0

  let message = "";

  message += "<div class='trimestre'>";
message += "<h4 class='trimestre-titulo' onclick='toggleTrimestre(this)'>1º TRIMESTRE <i class='fas fa-chevron-down flecha'></i></h4>";
message += "<div class='trimestre-contenido'>"; // Contenido oculto al inicio
message += "<hr>";

if(hojaLM.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #CEE3F6;'><b>Lenguaje musical:</b> " + hojaLM.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hojaLM.getRange(n,4).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Ritmo: </b>" + hojaLM.getRange(n,5).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Entonación: </b>" + hojaLM.getRange(n,6).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Dictado: </b>" + hojaLM.getRange(n,7).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Teoría: </b>" + hojaLM.getRange(n,8).getValue();
  message += "<br><b>Faltas:</b> " + hojaLM.getRange(n,9).getValue();
  message += "<br><b>Conducta:</b> " + hojaLM.getRange(n,10).getValue();
  message += "<br><b>Comentario:</b> " + hojaLM.getRange(n,11).getValue() + "</p>";
}

if(hoja1I.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #F2F5A9;'><b>Instrumento: </b>" + hoja1I.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hoja1I.getRange(n,4).getValue();
  message += "<br><b>Faltas:</b> " + hoja1I.getRange(n,5).getValue();
  message += "<br><b>Conducta:</b> " + hoja1I.getRange(n,6).getValue();
  message += "<br><b>Comentario:</b> " + hoja1I.getRange(n,7).getValue() + "</p>";
}

if(hoja2I.getRange(n,3).getValue()!=""){ 
  message += "<p style='background-color: #E1F5A9;'><b>Instrumento: </b>" + hoja2I.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hoja2I.getRange(n,4).getValue();
  message += "<br><b>Faltas:</b> " + hoja2I.getRange(n,5).getValue();
  message += "<br><b>Conducta:</b> " + hoja2I.getRange(n,6).getValue();
  message += "<br><b>Comentario:</b> " + hoja2I.getRange(n,7).getValue() + "</p>";
}

message += "</div>"; // Cierra trimestre-contenido
message += "</div>"; // Cierra trimestre

// Segundo trimestre
message += "<div class='trimestre'>";
message += "<h4 class='trimestre-titulo' onclick='toggleTrimestre(this)'>2º TRIMESTRE <i class='fas fa-chevron-down flecha'></i></h4>";
message += "<div class='trimestre-contenido'>"; // Contenido oculto al inicio
message += "<hr>";

if(hojaLM.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #CEE3F6;'><b>Lenguaje musical:</b> " + hojaLM.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hojaLM.getRange(n,12).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Ritmo: </b>" + hojaLM.getRange(n,13).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Entonación: </b>" + hojaLM.getRange(n,14).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Dictado: </b>" + hojaLM.getRange(n,15).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Teoría: </b>" + hojaLM.getRange(n,16).getValue();
  message += "<br><b>Faltas:</b> " + hojaLM.getRange(n,17).getValue();
  message += "<br><b>Conducta:</b> " + hojaLM.getRange(n,18).getValue();
  message += "<br><b>Comentario:</b> " + hojaLM.getRange(n,19).getValue() + "</p>";
}

if(hoja1I.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #F2F5A9;'><b>Instrumento: </b>" + hoja1I.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hoja1I.getRange(n,8).getValue();
  message += "<br><b>Faltas:</b> " + hoja1I.getRange(n,9).getValue();
  message += "<br><b>Conducta:</b> " + hoja1I.getRange(n,10).getValue();
  message += "<br><b>Comentario:</b> " + hoja1I.getRange(n,11).getValue() + "</p>";
}

if(hoja2I.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #E1F5A9;'><b>Instrumento: </b>" + hoja2I.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hoja2I.getRange(n,8).getValue();
  message += "<br><b>Faltas:</b> " + hoja2I.getRange(n,9).getValue();
  message += "<br><b>Conducta:</b> " + hoja2I.getRange(n,10).getValue();
  message += "<br><b>Comentario:</b> " + hoja2I.getRange(n,11).getValue() + "</p>";
}

message += "</div>"; // Cierra trimestre-contenido
message += "</div>"; // Cierra trimestre

// Tercer trimestre
message += "<div class='trimestre'>";
message += "<h4 class='trimestre-titulo' onclick='toggleTrimestre(this)'>3º TRIMESTRE <i class='fas fa-chevron-down flecha'></i></h4>";
message += "<div class='trimestre-contenido'>"; // Contenido oculto al inicio
message += "<hr>";

if(hojaLM.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #CEE3F6;'><b>Lenguaje musical:</b> " + hojaLM.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hojaLM.getRange(n,20).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Ritmo: </b>" + hojaLM.getRange(n,21).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Entonación: </b>" + hojaLM.getRange(n,22).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Dictado: </b>" + hojaLM.getRange(n,23).getValue();
  message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<b>Teoría: </b>" + hojaLM.getRange(n,24).getValue();
  message += "<br><b>Faltas:</b> " + hojaLM.getRange(n,25).getValue();
  message += "<br><b>Conducta:</b> " + hojaLM.getRange(n,26).getValue();
  message += "<br><b>Comentario:</b> " + hojaLM.getRange(n,27).getValue() + "</p>";
}

if(hoja1I.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #F2F5A9;'><b>Instrumento: </b>" + hoja1I.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hoja1I.getRange(n,12).getValue();
  message += "<br><b>Faltas:</b> " + hoja1I.getRange(n,13).getValue();
  message += "<br><b>Conducta:</b> " + hoja1I.getRange(n,14).getValue();
  message += "<br><b>Comentario:</b> " + hoja1I.getRange(n,15).getValue() + "</p>";
}

if(hoja2I.getRange(n,3).getValue()!="") {
  message += "<p style='background-color: #E1F5A9;'><b>Instrumento: </b>" + hoja2I.getRange(n,3).getValue();
  message += "<br><b>Nota: </b>" + hoja2I.getRange(n,12).getValue();
  message += "<br><b>Faltas:</b> " + hoja2I.getRange(n,13).getValue();
  message += "<br><b>Conducta:</b> " + hoja2I.getRange(n,14).getValue();
  message += "<br><b>Comentario:</b> " + hoja2I.getRange(n,15).getValue() + "</p>";
}

message += "</div>"; // Cierra trimestre-contenido
message += "</div>"; // Cierra trimestre

message += "<p align=right><i>Resultado Promoción: <b>Ordinaria:</b>" + hojaAL.getRange(n,9).getValue() + "</p></i>";
message += "<br>";


  Logger.log(message);
  return message || "No hay información disponible.";
}







function getAlumnos() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ALUMNOS");
  const startRow = 2;
  const startCol = 1; // Columna N
  const numRows = sheet.getLastRow() - startRow + 1;
  const numCols = sheet.getLastColumn() - startCol + 1;

  const headers = sheet.getRange(startRow, startCol, 1, numCols).getValues()[0];
  const rows = sheet.getRange(startRow + 1, startCol, numRows - 1, numCols).getValues();

  return { headers, rows };
}

function getEvaluarLenguajeData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUAR LENGUAJE MUSICAL");
  const startRow = 3;
  const startCol = 1; // Columna N
  const numRows = sheet.getLastRow() - startRow + 1;
  const numCols = sheet.getLastColumn() - startCol + 1;

  const headers = sheet.getRange(startRow, startCol, 1, numCols).getValues()[0];
  const rows = sheet.getRange(startRow + 1, startCol, numRows - 1, numCols).getValues();

  return { headers, rows };
}

function getEvaluarInstrumento1() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUAR ALUMNOS LENGUAJE MUSICAL");
  const startRow = 3;
  const startCol = 1; // Columna N
  const numRows = sheet.getLastRow() - startRow + 1;
  const numCols = sheet.getLastColumn() - startCol + 1;

  const headers = sheet.getRange(startRow, startCol, 1, numCols).getValues()[0];
  const rows = sheet.getRange(startRow + 1, startCol, numRows - 1, numCols).getValues();

  return { headers, rows };
}

function getEvaluarInstrumento2() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUAR ALUMNOS LENGUAJE MUSICAL");
  const startRow = 3;
  const startCol = 14; // Columna N
  const numRows = sheet.getLastRow() - startRow + 1;
  const numCols = sheet.getLastColumn() - startCol + 1;

  const headers = sheet.getRange(startRow, startCol, 1, numCols).getValues()[0];
  const rows = sheet.getRange(startRow + 1, startCol, numRows - 1, numCols).getValues();

  return { headers, rows };
}


function getEvaluarLenguajePorTrimestre(trimestre) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUAR LENGUAJE MUSICAL");
  const startRow = 3;
  const startCol = 1;
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  const fullHeaders = sheet.getRange(startRow, startCol, 1, lastCol).getValues()[0];
  const fullData = sheet.getRange(startRow + 1, startCol, lastRow - startRow, lastCol).getValues();

  var colIndicesTrimestre = [];
  for (var i = 0; i < fullHeaders.length; i++) {
    if (fullHeaders[i] && fullHeaders[i].toString().toUpperCase().indexOf(trimestre) !== -1) {
      colIndicesTrimestre.push({ header: fullHeaders[i], i: i });
    }
  }

  // columnas fijas: nombre (col 2) y curso (col 3) => índices 1 y 2
  var colIndicesFijos = [
    { header: fullHeaders[1], i: 1 },
    { header: fullHeaders[2], i: 2 }
  ];

  var allCols = colIndicesFijos.concat(colIndicesTrimestre);

  var filteredHeaders = [];
  for (var j = 0; j < allCols.length; j++) {
    filteredHeaders.push(allCols[j].header);
  }

  var filteredData = [];
  for (var i = 0; i < fullData.length; i++) {
    var rowData = [];
    for (var j = 0; j < allCols.length; j++) {
      rowData.push(fullData[i][allCols[j].i]);
    }
    filteredData.push(rowData);
  }

  return { headers: filteredHeaders, rows: filteredData };
}





function getEvaluarInstrumentoPorTrimestre(nombreHoja, trimestre) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombreHoja);
  const startRow = 3; // Encabezado
  const startCol = 1;
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  const fullHeaders = sheet.getRange(startRow, startCol, 1, lastCol).getValues()[0];
  const fullData = sheet.getRange(startRow + 1, startCol, lastRow - startRow, lastCol).getValues();

  var colIndicesTrimestre = [];
  for (var i = 0; i < fullHeaders.length; i++) {
    const headerText = fullHeaders[i].toString().trim();
    
    // Verificamos si el encabezado contiene "NOTA" y si el último número del texto es el número del trimestre
    if (headerText.includes("NOTA") && headerText.match(/(\d+)$/)) {
      const lastNumber = headerText.match(/(\d+)$/)[0];  // Extrae el último número
      if (lastNumber === trimestre.toString()) {
        colIndicesTrimestre.push({ header: fullHeaders[i], i: i });
      }
    }
    
    // Aseguramos que solo se añadan las columnas cuyo número de trimestre es al final del encabezado
    const lastWord = headerText.split(" ").pop(); // Tomamos la última palabra del encabezado
    if (lastWord === trimestre.toString()) {
      colIndicesTrimestre.push({ header: fullHeaders[i], i: i });
    }
  }

  var colIndicesFijos = [
    { header: fullHeaders[1], i: 1 }, // Nombre
    { header: fullHeaders[2], i: 2 }  // Curso
  ];

  var allCols = colIndicesFijos.concat(colIndicesTrimestre);

  var filteredHeaders = [];
  for (var j = 0; j < allCols.length; j++) {
    filteredHeaders.push(allCols[j].header);
  }

  var filteredData = [];
  for (var i = 0; i < fullData.length; i++) {
    var rowData = [];
    for (var j = 0; j < allCols.length; j++) {
      rowData.push(fullData[i][allCols[j].i]);
    }
    filteredData.push(rowData);
  }

  return { headers: filteredHeaders, rows: filteredData };
}




function guardarTodosLosDatos(datos) {
  const sheetLenguaje = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUAR LENGUAJE MUSICAL");
  const sheetInst1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUAR 1º INSTRUMENTO");
  const sheetInst2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EVALUAR 2º INSTRUMENTO");

  // Guardar los datos en la hoja correspondiente (aquí puedes agregar la lógica de cuándo va a cada hoja)
  for (let i = 0; i < datos.length; i++) {
    const row = datos[i];
    // Aquí puedes agregar lógica para determinar en qué hoja poner cada fila
    // Por ejemplo, si la primera columna corresponde a "Lenguaje Musical", los guardas en la hoja de Lenguaje
    if (row[0] === "Lenguaje Musical") {
      sheetLenguaje.appendRow(row);
    } else if (row[0] === "1º Instrumento") {
      sheetInst1.appendRow(row);
    } else if (row[0] === "2º Instrumento") {
      sheetInst2.appendRow(row);
    }
  }
}



























function abrirInicio() {
  var hojaDestino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('INCIO APLICACIÓN'); // Cambia 'Nombre de la hoja' por el nombre de la hoja que deseas abrir
  SpreadsheetApp.setActiveSheet(hojaDestino); // Cambia la hoja activa a la hoja destino
}

function abrirAlumnos() {
  var hojaDestino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ALUMNOS'); // Cambia 'Nombre de la hoja' por el nombre de la hoja que deseas abrir
  SpreadsheetApp.setActiveSheet(hojaDestino); // Cambia la hoja activa a la hoja destino
}

function abrirLM() {
  var hojaDestino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EVALUAR LENGUAJE MUSICAL'); // Cambia 'Nombre de la hoja' por el nombre de la hoja que deseas abrir
  SpreadsheetApp.setActiveSheet(hojaDestino); // Cambia la hoja activa a la hoja destino
}

function abrir1I() {
  var hojaDestino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EVALUAR 1º INSTRUMENTO'); // Cambia 'Nombre de la hoja' por el nombre de la hoja que deseas abrir
  SpreadsheetApp.setActiveSheet(hojaDestino); // Cambia la hoja activa a la hoja destino
}

function abrir2I() {
  var hojaDestino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EVALUAR 2º INSTRUMENTO'); // Cambia 'Nombre de la hoja' por el nombre de la hoja que deseas abrir
  SpreadsheetApp.setActiveSheet(hojaDestino); // Cambia la hoja activa a la hoja destino
}

function abrirHorarios() {
  var hojaDestino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HORARIOS'); // Cambia 'Nombre de la hoja' por el nombre de la hoja que deseas abrir
  SpreadsheetApp.setActiveSheet(hojaDestino); // Cambia la hoja activa a la hoja destino
}



function onOpen(e) {
  var startingsheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.getUi().createMenu("MENÚ")
  .addItem('INICIO APLICACIÓN', 'abrirInicio')
  .addItem('ALUMNOS', 'abrirAlumnos')
  .addItem('EVALUAR LENGUAJE MUSICAL', 'abrirLM')
  .addItem('EVALUAR 1º INSTRUMENTO', 'abrir1I')
  .addItem('EVALUAR 2º INSTRUMENTO', 'abrir2I')
  .addToUi();
}





function enviarCorreos1() {
  var escuelaLogoUrl = "https://calasparra.org/wp-content/uploads/2020/06/logoEscuelaMusica.jpg";
  var escuelaLogoBlob = UrlFetchApp
                      .fetch(escuelaLogoUrl)
                      .getBlob()
                      .setName("escuelaLogoBlob");
  var escudoUrl="https://calasparra.org/wp-content/uploads/2020/06/escudo-calasparra.png";
  var escudoBlob=UrlFetchApp
                      .fetch(escudoUrl)
                      .getBlob()
                      .setName("escudoBlob");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojaBoletin=ss.getSheetByName("INCIO APLICACIÓN");
  var hojaLM = ss.getSheetByName('EVALUAR LENGUAJE MUSICAL');
  var hojaDatosAlumnos = ss.getSheetByName('ALUMNOS');
  var hoja1I = ss.getSheetByName('EVALUAR 1º INSTRUMENTO');
  var hoja2I = ss.getSheetByName("EVALUAR 2º INSTRUMENTO")
  
  var startRow = hojaBoletin.getRange("d4").getValue();  
  var endRow = hojaBoletin.getRange("d6").getValue();   
  
  for(var n=startRow; n<=endRow; n++) {    
    var emailAddress = hojaDatosAlumnos.getRange(n,3).getValue();
    var message= "<p>Curso "+ hojaBoletin.getRange("f5").getValue() + ". 1º Trimestre</p><p><b>Alumno:</b> " + hojaDatosAlumnos.getRange(n,2).getValue() + "</p>";   

    function formatCell(value) {
    if (typeof value === "string" && value.includes("\n")) {
        return value.replace(/\n/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    }
    return value; // Devuelve el valor original si no tiene saltos de línea
} 
    

    if(hojaLM.getRange(n,3).getValue()!="") {
      message += "<p style='background-color: #CEE3F6;'><b>Lenguaje musical:</b> " + hojaLM.getRange(n,3).getValue() ;
      message += "<br><b>Nota: </b>" + hojaLM.getRange(n,4).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Ritmo: </b>" + hojaLM.getRange(n,5).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Entonación: </b>" + hojaLM.getRange(n,6).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Dictado: </b>" + hojaLM.getRange(n,7).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Teoría: </b>" + hojaLM.getRange(n,8).getValue();
      message += ". <br><b>Faltas:</b> " + hojaLM.getRange(n,9).getValue();
      message += ". <br><b>Conducta:</b> " + hojaLM.getRange(n,10).getValue();
      message += ". <br><b>Comentario:</b> " + hojaLM.getRange(n,11).getValue() + "</p>";      
      message += "<p>-----------------------</p>";
      message += "<p>-----------------------</p>";
    }
      
    
    if(hoja1I.getRange(n,3).getValue()!="") {
      message += "<p style='background-color: #F2F5A9;'><b> " + " Instrumento: " + hoja1I.getRange(n,3).getValue() + "</b>";
      message += "<br><b>Nota: </b>" + hoja1I.getRange(n,4).getValue();
      message += ". <br><b>Faltas:</b> " + hoja1I.getRange(n,5).getValue();
      message += ". <br><b>Conducta:</b> " + hoja1I.getRange(n,6).getValue();
      message += ". <br><b>Comentario:</b> " + hoja1I.getRange(n,7).getValue() + "</p>";      
      message += "<p>-----------------------</p>";
      message += "<p>-----------------------</p>";
    }
      
    if(hoja2I.getRange(n,3).getValue()!=""){ 
      message += "<p style='background-color: #E1F5A9;'><b>" + " Instrumento: " + hoja2I.getRange(n,3).getValue() + "</b>";
      message += "<br><b>Nota:</b> " + hoja2I.getRange(n,4).getValue();
      message += ". <br><b>Faltas:</b> " + hoja2I.getRange(n,5).getValue();
      message += ". <br><b>Conducta:</b> " + hoja2I.getRange(n,6).getValue();      
      message += ". <br><b>Comentario:</b> " + hoja2I.getRange(n,7).getValue() + "</p>";
      message += "<p>-----------------------</p>";
    }    
    

    message += "<p>¡Que paséis una Feliz Navidad!</p>";
    message += "<p>Un saludo, el coordinador de la Escuela de Música</p>";
    
    var asunto = "Boletín de notas Escuela de música de " + hojaDatosAlumnos.getRange(n,2).getValue() ;
   
    //MailApp.sendEmail(emailAddress, subject, message);
    MailApp.sendEmail({
      to: emailAddress,
      subject: asunto,
      htmlBody: "<img src='cid:escuelaLogo'><span style='font-size: 24px'>Escuela Municipal de Música 'José Moreno'</span><img src='cid:escudoLogo'><br>" + message.toString().replace(String.fromCharCode(13), "<br>"),
      inlineImages:{escuelaLogo: escuelaLogoBlob, escudoLogo: escudoBlob}
    })
  }
}



function enviarCorreos2() {
  var escuelaLogoUrl = "https://calasparra.org/wp-content/uploads/2020/06/logoEscuelaMusica.jpg";
  var escuelaLogoBlob = UrlFetchApp
                      .fetch(escuelaLogoUrl)
                      .getBlob()
                      .setName("escuelaLogoBlob");
  var escudoUrl="https://calasparra.org/wp-content/uploads/2020/06/escudo-calasparra.png";
  var escudoBlob=UrlFetchApp
                      .fetch(escudoUrl)
                      .getBlob()
                      .setName("escudoBlob");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojaBoletin=ss.getSheetByName("INCIO APLICACIÓN");
  var hojaLM = ss.getSheetByName('EVALUAR LENGUAJE MUSICAL');
  var hojaDatosAlumnos = ss.getSheetByName('ALUMNOS');
  var hoja1I = ss.getSheetByName('EVALUAR 1º INSTRUMENTO');
  var hoja2I = ss.getSheetByName("EVALUAR 2º INSTRUMENTO")
  
  var startRow = hojaBoletin.getRange("d4").getValue();  
  var endRow = hojaBoletin.getRange("d6").getValue();   
  
  for(var n=startRow; n<=endRow; n++) {    
    var emailAddress = hojaDatosAlumnos.getRange(n,3).getValue();
    var message= "<p>Curso "+ hojaBoletin.getRange("f5").getValue() + ". 2º Trimestre</p><p><b>Alumno:</b> " + hojaDatosAlumnos.getRange(n,2).getValue() + "</p>";   

    function formatCell(value) {
    if (typeof value === "string" && value.includes("\n")) {
        return value.replace(/\n/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    }
    return value; // Devuelve el valor original si no tiene saltos de línea
} 
    

    if(hojaLM.getRange(n,3).getValue()!="") {
      message += "<p style='background-color: #CEE3F6;'><b>Lenguaje musical:</b> " + hojaLM.getRange(n,3).getValue() ;
      message += "<br><b>Nota: </b>" + hojaLM.getRange(n,12).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Ritmo: </b>" + hojaLM.getRange(n,13).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Entonación: </b>" + hojaLM.getRange(n,14).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Dictado: </b>" + hojaLM.getRange(n,15).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Teoría: </b>" + hojaLM.getRange(n,16).getValue();
      message += ". <br><b>Faltas:</b> " + hojaLM.getRange(n,17).getValue();
      message += ". <br><b>Conducta:</b> " + hojaLM.getRange(n,18).getValue();
      message += ". <br><b>Comentario:</b> " + hojaLM.getRange(n,19).getValue() + "</p>";      
      message += "<p>-----------------------</p>";
      message += "<p>-----------------------</p>";
    }
      
    
    if(hoja1I.getRange(n,3).getValue()!="") {
      message += "<p style='background-color: #F2F5A9;'><b> " + " Instrumento: " + hoja1I.getRange(n,3).getValue() + "</b>";
      message += "<br><b>Nota: </b>" + hoja1I.getRange(n,8).getValue();
      message += ". <br><b>Faltas:</b> " + hoja1I.getRange(n,9).getValue();
      message += ". <br><b>Conducta:</b> " + hoja1I.getRange(n,10).getValue();
      message += ". <br><b>Comentario:</b> " + hoja1I.getRange(n,11).getValue() + "</p>";      
      message += "<p>-----------------------</p>";
      message += "<p>-----------------------</p>";
    }
      
    if(hoja2I.getRange(n,3).getValue()!=""){ 
      message += "<p style='background-color: #E1F5A9;'><b>" + " Instrumento: " + hoja2I.getRange(n,3).getValue() + "</b>";
      message += "<br><b>Nota:</b> " + hoja2I.getRange(n,8).getValue();
      message += ". <br><b>Faltas:</b> " + hoja2I.getRange(n,9).getValue();
      message += ". <br><b>Conducta:</b> " + hoja2I.getRange(n,10).getValue();      
      message += ". <br><b>Comentario:</b> " + hoja2I.getRange(n,11).getValue() + "</p>";
      message += "<p>-----------------------</p>";
    }    
    

    message += "<p>¡Feliz Semana Santa!</p>";
    message += "<p>Un saludo, el coordinador de la Escuela de Música</p>";
    
    var asunto = "Boletín de notas Escuela de música de " + hojaDatosAlumnos.getRange(n,2).getValue() ;
   
    //MailApp.sendEmail(emailAddress, subject, message);
    MailApp.sendEmail({
      to: emailAddress,
      subject: asunto,
      htmlBody: "<img src='cid:escuelaLogo'><span style='font-size: 24px'>Escuela Municipal de Música 'José Moreno'</span><img src='cid:escudoLogo'><br>" + message.toString().replace(String.fromCharCode(13), "<br>"),
      inlineImages:{escuelaLogo: escuelaLogoBlob, escudoLogo: escudoBlob}
    })
  }
}




function enviarCorreos3() {
  var escuelaLogoUrl = "https://calasparra.org/wp-content/uploads/2020/06/logoEscuelaMusica.jpg";
  var escuelaLogoBlob = UrlFetchApp
                      .fetch(escuelaLogoUrl)
                      .getBlob()
                      .setName("escuelaLogoBlob");
  var escudoUrl="https://calasparra.org/wp-content/uploads/2020/06/escudo-calasparra.png";
  var escudoBlob=UrlFetchApp
                      .fetch(escudoUrl)
                      .getBlob()
                      .setName("escudoBlob");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojaBoletin=ss.getSheetByName("INCIO APLICACIÓN");
  var hojaLM = ss.getSheetByName('EVALUAR LENGUAJE MUSICAL');
  var hojaDatosAlumnos = ss.getSheetByName('ALUMNOS');
  var hoja1I = ss.getSheetByName('EVALUAR 1º INSTRUMENTO');
  var hoja2I = ss.getSheetByName("EVALUAR 2º INSTRUMENTO")
  
  var startRow = hojaBoletin.getRange("d4").getValue();  
  var endRow = hojaBoletin.getRange("d6").getValue();   
  
  for(var n=startRow; n<=endRow; n++) {    
    var emailAddress = hojaDatosAlumnos.getRange(n,3).getValue();
    var message= "<p>Curso "+ hojaBoletin.getRange("f5").getValue() + ". 3º Trimestre</p><p><b>Alumno:</b> " + hojaDatosAlumnos.getRange(n,2).getValue() + "</p>";   

    function formatCell(value) {
    if (typeof value === "string" && value.includes("\n")) {
        return value.replace(/\n/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    }
    return value; // Devuelve el valor original si no tiene saltos de línea
} 
    

    if(hojaLM.getRange(n,3).getValue()!="") {
      message += "<p style='background-color: #CEE3F6;'><b>Lenguaje musical:</b> " + hojaLM.getRange(n,3).getValue() ;
      message += "<br><b>Nota: </b>" + hojaLM.getRange(n,20).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Ritmo: </b>" + hojaLM.getRange(n,21).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Entonación: </b>" + hojaLM.getRange(n,22).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Dictado: </b>" + hojaLM.getRange(n,23).getValue();
      message += "<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>Teoría: </b>" + hojaLM.getRange(n,24).getValue();
      message += ". <br><b>Faltas:</b> " + hojaLM.getRange(n,25).getValue();
      message += ". <br><b>Conducta:</b> " + hojaLM.getRange(n,26).getValue();
      message += ". <br><b>Comentario:</b> " + hojaLM.getRange(n,27).getValue() + "</p>";      
      message += "<p>-----------------------</p>";
      message += "<p>-----------------------</p>";
    }
      
    
    if(hoja1I.getRange(n,3).getValue()!="") {
      message += "<p style='background-color: #F2F5A9;'><b> " + " Instrumento: " + hoja1I.getRange(n,3).getValue() + "</b>";
      message += "<br><b>Nota: </b>" + hoja1I.getRange(n,12).getValue();
      message += ". <br><b>Faltas:</b> " + hoja1I.getRange(n,13).getValue();
      message += ". <br><b>Conducta:</b> " + hoja1I.getRange(n,14).getValue();
      message += ". <br><b>Comentario:</b> " + hoja1I.getRange(n,15).getValue() + "</p>";      
      message += "<p>-----------------------</p>";
      message += "<p>-----------------------</p>";
    }
      
    if(hoja2I.getRange(n,3).getValue()!=""){ 
      message += "<p style='background-color: #E1F5A9;'><b>" + " Instrumento: " + hoja2I.getRange(n,3).getValue() + "</b>";
      message += "<br><b>Nota:</b> " + hoja2I.getRange(n,12).getValue();
      message += ". <br><b>Faltas:</b> " + hoja2I.getRange(n,13).getValue();
      message += ". <br><b>Conducta:</b> " + hoja2I.getRange(n,14).getValue();      
      message += ". <br><b>Comentario:</b> " + hoja2I.getRange(n,15).getValue() + "</p>";
      message += "<p>-----------------------</p>";
    }    
    

    message += "<p>¡Disfruta de las vacaciones, te lo has ganado!</p>";
    message += "<p>Un saludo, el coordinador de la Escuela de Música</p>";
    
    var asunto = "Boletín de notas Escuela de música de " + hojaDatosAlumnos.getRange(n,2).getValue() ;
   
    //MailApp.sendEmail(emailAddress, subject, message);
    MailApp.sendEmail({
      to: emailAddress,
      subject: asunto,
      htmlBody: "<img src='cid:escuelaLogo'><span style='font-size: 24px'>Escuela Municipal de Música 'José Moreno'</span><img src='cid:escudoLogo'><br>" + message.toString().replace(String.fromCharCode(13), "<br>"),
      inlineImages:{escuelaLogo: escuelaLogoBlob, escudoLogo: escudoBlob}
    })
  }
}
