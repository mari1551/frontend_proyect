const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error (Error al obtener los datos):', error);
    alert('Se produjo un error al obtener datos. Inténtalo de nuevo.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de reserva
 * @returns 
 */
async function saveReserva(){
  
  const idReserva = document.querySelector('#id-reserva').value;
  const titular = document.querySelector('#titular').value;
  const tipoReserva = document.querySelector('#tipo').value;
  const lugar = document.querySelector('#lugar').value;
  const fechaDesde = document.querySelector('#fecha-desde').value;
  const fechaHasta = document.querySelector('#fecha-hasta').value;
  //VALIDACION DE FORMULARIO
  if(titular=="" || tipoReserva=="" || lugar=="" || fechaDesde=="" || fechaHasta==""){
    alert("Faltan campos por completar")
    return;
  }
  // Crea un objeto con los datos de la reserva
  const reservaData = {
      titular: titular,
      tipo_reserva: tipoReserva,
      lugar: lugar,
      fecha_desde: fechaDesde,
      fecha_hasta: fechaHasta,
  };
  let result = null;
  // Si hay un idReserva, realiza una petición PUT para actualizar la reserva existente
  if(idReserva!==""){
    result = await fetchData(`${BASEURL}/api/reservaciones/${idReserva}`, 'PUT', reservaData);
  }else{
    // Si no hay idReserva, realiza una petición POST para crear una nueva reserva
    result = await fetchData(`${BASEURL}/api/reservaciones/`, 'POST', reservaData);
  }
  
  const formReserva = document.querySelector('#form-reserva');
  formReserva.reset();
  // Swal.fire({
  //   title: 'Exito!',
  //   text: result.message,
  //   icon: 'success',
  //   confirmButtonText: 'Cerrar'
  // })
  showReservaciones();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showReservaciones(){
  let reservaciones =  await fetchData(BASEURL+'/api/reservaciones/', 'GET');
  console.log("showreservaciones:")
  console.log(reservaciones)
  const tableReservaciones = document.querySelector('#list-table-reservaciones tbody');
  tableReservaciones.innerHTML='';
  reservaciones.forEach((reserva,index) => {
    let tr = `<tr>
                  <td>${reserva.titular}</td>
                  <td>${reserva.tipo_reserva}</td>
                  <td>${reserva.lugar}</td>
                  <td>${reserva.fecha_desde}</td>
                  <td>${reserva.fecha_hasta}</td>
                  <td>
                      <button class="btn-cac" onclick='updateReserva(${reserva.id_reserva})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteReserva(${reserva.id_reserva})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableReservaciones.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
async function deleteReserva(id){
  // Swal.fire({
  //     title: "Esta seguro de eliminar la reserva?",
  //     showCancelButton: true,
  //     confirmButtonText: "Eliminar",
  // }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       let response = await fetchData(`${BASEURL}/api/reservaciones/${id}`, 'DELETE');
  //       showReservaciones();
  //       Swal.fire(response.message, "", "exitoso");
  //     }
  // });
  resp=confirm("Esta seguro que desea eliminar la reserva?")
  if(resp==true){
    let response = await fetchData(`${BASEURL}/api/reservaciones/${id}`, 'DELETE');
    showReservaciones();
    alert("Registro de reserva eliminada satisfactoriamente")
  }
}


/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateReserva(id){
  //Buscamos en el servidor la pelicula de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/reservaciones/${id}`, 'GET');
  const idReserva = document.querySelector('#id-reserva');
  const titular = document.querySelector('#titular');
  const tipoReserva = document.querySelector('#tipo');
  const lugar = document.querySelector('#lugar');
  const fechaDesde = document.querySelector('#fecha-desde');
  const fechaHasta = document.querySelector('#fecha-hasta');

  
  idReserva.value = response.id_reserva;
  titular.value = response.titular;
  tipoReserva.value = response.tipo_reserva;
  lugar.value = response.lugar;
  fechaDesde.value = response.fecha_desde;
  fechaHasta.value = response.fecha_hasta;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveReserva = document.querySelector('#btn-save-reserva');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveReserva.addEventListener('click',saveReserva);
  showReservaciones();
});