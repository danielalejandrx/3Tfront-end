var g_id_cliente="";

function agregar_resultado(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

var raw = JSON.stringify({
  "nombre_resultado": nombre_resultado
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://frontend170.com/api/resultado", requestOptions)
  .then(response => {
    if(response.status == 200){
       location.href ="lista_resultados.html";
    }else{
      alert("Error al ingresar los datos");
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
function obtener_resultados(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com/api/resultado", requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFila)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completarFila (element, index, arr){
  arr[index] = document.querySelector('#tbl_resultados tbody').innerHTML +=
  `<tr>
      <td>${element.id_resultado}</td>
      <td>${element.nombre_resultado}</td>
      <td>${element.fecha_registro}</td>
      <td> 
      <a href='eliminar_resultado.html?id=${element.id_resultado}'> <img src='../img/eliminar_24x24.png'> </a> 
      <a href='actualizar_resultado.html?id=${element.id_resultado}'><img src='../img/actualizar_24x24.png'> </a>
      </td>

  </tr>`
};
function obtenerIDCliente(){
  //Obtenemos la URL de la página actual
  var queryString = window.location.search;
  //Buscamos los parámetros en la URL actual
  var urlParams = new URLSearchParams(queryString);
  //Extraemos el id del Cliente
  var p_id_cliente = urlParams.get('id');
  g_id_cliente = p_id_cliente;

  //Invocamos función para consultar y desplegar los datos del cliente
  obtenerDatosCliente(p_id_cliente);
}
function obtenerIDClienteActualizar(){
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var p_id_cliente = urlParams.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosClienteActualizar(p_id_cliente);
}
function obtenerDatosCliente(p_id_cliente){
  //incorpore aquí las instrucciones para obtener los datos del cliente
  //y mostrarlos en la página


  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com/api/cliente/"+p_id_cliente, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(mostrar_datos_cliente)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function obtenerDatosClienteActualizar(p_id_cliente){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com/api/cliente/"+p_id_cliente, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(mostrar_datos_cliente_actualizar)
  )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
function mostrar_datos_cliente_actualizar(element, index, arr){
//Declaramos variables locales con datos del cliente a actualizar
var id_cliente = element.id_cliente;
var dv = element.dv;
var nombres = element.nombres;
var apellidos = element.apellidos;
var email = element.email;
var celular = element.celular;
var fecha_registro = element.fecha_registro;

//Completamos los input del formulario
document.getElementById("txt_id_cliente").value = id_cliente;
document.getElementById("txt_dv").value = dv;
document.getElementById("txt_nombres").value = nombres;
document.getElementById("txt_apellidos").value = apellidos;
document.getElementById("txt_email").value = email;
document.getElementById("txt_celular").value = celular;
document.getElementById("txt_fecha_registro").value = fecha_registro;


}
function mostrar_datos_cliente(element, index, arr){
  arr[index] = document.querySelector('#cnt_datos_cliente').innerHTML +=
  `<h3> Desea eliminar a este cliente? </h3>
  <div class="alert alert-warning" role="alert"> <b>${element.nombres} ${element.apellidos}</b> </div>
  `
}
function eliminar_cliente(){
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("http://frontend170.com/api/cliente/"+g_id_cliente, requestOptions)
    .then(response => {
      if (response.status = 200){
        alert("Registro eliminado correctamente");
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function actualizarCliente(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email = document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;



var raw = JSON.stringify({
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://frontend170.com/api/cliente/"+g_id_cliente, requestOptions)
  .then(response => {
    if(response.status == 200){
      alert("Registro ingresado correctamente");
    }else{
      alert("Error al ingresar los datos");
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}