// ***************** LADO "FRONT" Ó "CLIENTE" *****************

// Traemos los datos del formulario
const form = document.getElementById("singupForm");
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
    console.log("!res");
    return;
  }

  // // Lo siguiente nos dice que si hay una respuesta ok y a su vez, si existe un 'redirect' desde el front, lo renderizemos.
  // const resJson = await res.json();
  // console.log(resJson);
  // if (resJson.redirect) {
  //   window.location.href = resJson.redirect; // Para hacer esto tengo que crear un endpoint
  // }
});
