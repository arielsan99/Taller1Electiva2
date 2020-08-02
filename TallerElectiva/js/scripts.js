var bills = [
  {
    "numero":"345345",
    "fecha_factura":"2017-7-21",
    "tipo_pago":"credito",
    "plazo":"30",
    "valor_total":"234454"
  },
  {
    "numero":"872034",
    "fecha_factura":"2020-6-25",
    "tipo_pago":"contado",
    "plazo":"0",
    "valor_total":"7435246"
  },
  {
    "numero":"293658",
    "fecha_factura":"2018-12-4",
    "tipo_pago":"credito",
    "plazo":"90",
    "valor_total":"932937"
  }
  ]

var abonos = []

function load(){
var body = document.getElementById('body_id')
var select = document.getElementById("select_id")
for(bill of bills){
  var tr = document.createElement("tr")
  var opt = document.createElement("option")
  opt.value=bill["numero"]
  opt.text=bill["numero"]
  select.appendChild(opt)
  loadAbonos(bill)
  for(i in bill){
    var td = document.createElement("td")
    if(i=="valor_total"){
      var text = document.createTextNode("$"+formatear(bill[i]))
    }else {
      var text = document.createTextNode(bill[i]+"")
    }
    td.appendChild(text)
    tr.appendChild(td)
  }
  body.appendChild(tr)
}
  var select = document.getElementById("select_id").value
  document.getElementById('saldo_id').value="$"+formatear(findBill(select)["valor_total"])

}

function loadAbonos(bill) {
  var abono = {"numero_factura":"","abonos":[],"total_abonos":"0","fecha_vencimiento":"00-00-00","saldo":"","observaciones":[]}
  abono["numero_factura"]=bill["numero"]

  var fecha = new Date(bill["fecha_factura"])
  var dias = bill["plazo"]; // Número de días a agregar
  fecha.setMonth(fecha.getMonth() + parseInt(dias)/30+1);
  abono["fecha_vencimiento"] = fecha.getFullYear()+"/"+fecha.getMonth()+"/"+fecha.getDate();
  abono["saldo"]=bill["valor_total"]
  abonos.push(abono)
}

function abonar() {
  var factura = document.getElementById('select_id').value
  var vabono = document.getElementById('abono_id').value.split(',').join('')
  var nsaldo = document.getElementById('nsaldo_id').value.split(',').join('')
  var obv = document.getElementById('observ_id').value
  var abono = findAbono(factura)
  abono["abonos"].push(vabono)
  abono["total_abonos"]=parseInt(abono["total_abonos"])+parseInt(vabono)+""
  abono["saldo"]=parseInt(abono["saldo"])-vabono+""
  abono["observaciones"].push(obv)
  cambiar()
}

function actualizarTablaAbonos(num_factura) {

}

function onlyNums(event){
    const code = window.event ? event.which : event.keyCode;
    if( code < 48 || code > 57 ){
        event.preventDefault();
    }

}

function formatear(dato) {
    return dato.replace(/./g, function(c, i, a) {
  	return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      });
  }

function posKeyPress() {
  var dato = document.getElementById("abono_id")
  var nsaldo = document.getElementById('nsaldo_id')
  var numero_factura = document.getElementById('select_id').value
  var abono = dato.value.split(',').join('')
  if(abono!=""){
    dato.value=formatear(abono)
    var saldo = findAbono(numero_factura)["saldo"]
    nsaldo.value = "$"+formatear((parseInt(saldo)-abono)+"")
  }else{
    nsaldo.value = ""
  }

}

function cambiar() {
  var factura = document.getElementById('select_id').value
  var abono = findAbono(factura)
  console.log(abono);
  document.getElementById('saldo_id').value="$"+formatear(abono["saldo"])
  cancelar()
}

function findBill(num) {
  for (i of bills) {
    if(num==i["numero"]){
      return i
    }
}
}

function carteraEdades(num){
  alert(num)

}

function findAbono(num){
  for (i of abonos) {
    if(num==i["numero_factura"]){
      return i
    }
}
}

function cancelar() {
  document.getElementById('nsaldo_id').value = ""
  document.getElementById("abono_id").value = ""
  document.getElementById("observ_id").value = ""
}
