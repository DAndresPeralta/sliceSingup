const adminForm = document.getElementById("adminForm");
const userForm = document.getElementById("userForm");

adminForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("adminName");
  const password = document.getElementById("adminPassword");
  console.log(email.value);

  const res = await fetch("http://localhost:4000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  if (!res.ok) {
    Swal.fire({
      //Agregamos una alerta con la LIBRERIA SweetAlert
      title: `Credenciales incorrectas`,
      icon: "error",
      showConfirmButton: false, //Quitamos el boton de confirmacion.
      timer: 3000, // Timer para que desaparezca automaticamente el alerta.
      background: "#007091", //Cambiamos el color de fondo.
    });
    return;
  } else if (res.ok) {
    Swal.fire({
      //Agregamos una alerta con la LIBRERIA SweetAlert
      title: `Ingreso`,
      icon: "success",
      showConfirmButton: false, //Quitamos el boton de confirmacion.
      timer: 3000, // Timer para que desaparezca automaticamente el alerta.
      background: "#007091", //Cambiamos el color de fondo.
    });
    // Aca capturamos desde la res del BACK, el endpoint para renderizar el redirect.
    const resJson = await res.json();
    if (resJson) {
      setTimeout(() => {
        window.location.href = resJson.redirect;
      }, 3200);
    }
  }
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
