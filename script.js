window.onload = function () {
  startInit();
}

var penColour = 'black';
var matrixRows = 16;
var matrixCollumns = 64;
var matrix = [];
var dataResult;
var dataResultForMCU;

function startInit() {
  console.log("startInit()");

  for (var i = 0; i < matrixRows; i++) {
    matrix[i] = [];
    for (var j = 0; j < matrixCollumns; j++) {
      matrix[i][j] = 0;
    }
  }
  console.log(matrix);

  var art = document.getElementById('art');

  for(var i = 0; i < matrixRows; i++)
  {
    tr = document.createElement('div');
    tr.setAttribute('class', 'row');
    for(var j = 0; j < matrixCollumns; j++)
    {
      tc = document.createElement('div');
      tc.setAttribute('class', 'pixel');
      tc.setAttribute('onclick', 'setPixelColour(this)');
      tr.appendChild(tc);
    }
    art.appendChild(tr);
  }
}

function setPenColour(pen) {
  penColour = pen;
}

function setPixelColour(pixel) {
  pixel.style.backgroundColor = penColour;
  var xPos = $(pixel).index();
  var yPos = $(pixel).parent().index();
  
  //alert("Cell index is: " + $(pixel).index() + "\nRow index is: " + $(pixel).parent().index());
  console.log("Cell index is: " + xPos + "\nRow index is: " + yPos);

  if (penColour == 'black') {
    matrix[yPos][xPos] = 1;
  }
  else if (penColour == 'white') {
    matrix[yPos][xPos] = 0;
  }

  console.log("Add pixel");
  console.log(matrix);
  // for (var i = 0; i < matrix.length; i++) {
  //   for (var z = 0; z < matrix[i].length; z++) {
  //     console.log(matrix);
  //   }
  // }
}

function buttonClick()
{
  dataResult = '';
  dataResultForMCU = '{';
  var buf;
  for(var i = 0; i<matrixCollumns; i++ )
  {
    buf = '';
    for (var j = 7; j >= 0; j--)
    {
      buf += matrix[j][i].toString();
    }
    
    // console.log(buf);
    // console.log(parseInt(buf, 2).toString(16));
    if(parseInt(buf,2) <= 0xF)
    {
      dataResult +=0;
      dataResultForMCU +=0;
    }
    dataResult += parseInt(buf, 2).toString(16);

    dataResultForMCU += parseInt(buf, 2).toString(16);
    dataResultForMCU += ',';
  }

  for(var i = 0; i<matrixCollumns; i++ )
  {
    buf = '';
    for (var j = 15; j >= 8; j--)
    {
      buf += matrix[j][i].toString();
    }
    
    // console.log(buf);
    // console.log(parseInt(buf, 2).toString(16));
    if(parseInt(buf,2) <= 0xF)
    {
      dataResult +=0;
      dataResultForMCU +=0;
    }
    dataResult += parseInt(buf, 2).toString(16);

    dataResultForMCU += parseInt(buf, 2).toString(16);
    dataResultForMCU += ',';
  }

  dataResultForMCU += '}';

  console.log(dataResult);
  console.log(dataResultForMCU);
}