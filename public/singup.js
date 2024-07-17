// ***************** LADO "FRONT" Ó "CLIENTE" *****************

// Traemos los datos del formulario
const form = document.getElementById("singupForm");
const closeSession = document.getElementById("btnC");
// Generamos el evento que se acciona al apretar el boton de tipo submit
form.addEventListener("submit", async (e) => {
  // Detiene la recarga automatica al apretar el boton
  e.preventDefault();
  console.log("ingreso");

  // Traigo los datos ingresados en el formulario
  const name = document.getElementById("nameS");
  const email = document.getElementById("emailS");
  const password = document.getElementById("passwordS");
  console.log(email.value);

  // Fetch con metodo POST para conectarnos con el backend y enviar los datos para persistir.
  const res = await fetch("http://localhost:4000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  });

  // Lo siguiente nos dice que si la respuesta por parte del BACK no es OK, se termina la ejecucion.
  if (!res.ok) {
    Swal.fire({
      //Agregamos una alerta con la LIBRERIA SweetAlert
      title: `Error en el registro`,
      icon: "error",
      showConfirmButton: false, //Quitamos el boton de confirmacion.
      timer: 3000, // Timer para que desaparezca automaticamente el alerta.
      background: "#007091", //Cambiamos el color de fondo.
    });
    return;
  } else if (res.ok) {
    Swal.fire({
      //Agregamos una alerta con la LIBRERIA SweetAlert
      title: `Registro Exitoso!`,
      icon: "success",
      showConfirmButton: false, //Quitamos el boton de confirmacion.
      timer: 3000, // Timer para que desaparezca automaticamente el alerta.
      background: "#007091", //Cambiamos el color de fondo.
    });
  }
});

closeSession.addEventListener("click", (e) => {
  document.location.href = "/";
});
