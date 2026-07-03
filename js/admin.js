
document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarCiudades();
        pintarEventos();
        actualizarDashboard();

    }
);


function mostrarEventosCliente() {

    const contenedor =
        document.querySelector(
            ".contenedor-cards"
        );

    if (!contenedor) {
        return;
    }

    const eventos =
        JSON.parse(
            localStorage.getItem(
                "eventos"
            )
        ) || [];

    contenedor.innerHTML = "";

    eventos.forEach((evento) => {

        contenedor.innerHTML += `

            <div class="card">

                <img
                    src="${evento.imagen}"
                    alt="${evento.nombre}"
                >

                <div class="contenido">

                    <span>
                        ${evento.categoria}
                    </span>

                    <h3>
                        ${evento.nombre}
                    </h3>

                    <p>
                        🎤 ${evento.artista}
                    </p>

                    <p>
                        📍 ${evento.ciudad}
                    </p>

                    <p>
                        📅 ${evento.fecha}
                    </p>

                    <h4>
                        $${evento.precio}
                    </h4>

                        <button>
                            Comprar
                        </button>

                </div>

            </div>

        `;

    });

}



async function cargarEventosIniciales() {

    let eventos =
        JSON.parse(
            localStorage.getItem("eventos")
        );

    if (eventos) {
        mostrarEventosCliente();
        return;
    }

    const respuesta =
        await fetch(
            "eventos.json"
        );

    const datos =
        await respuesta.json();

    localStorage.setItem(
        "eventos",
        JSON.stringify(datos)
    );

    mostrarEventosCliente();
}

cargarEventosIniciales();

///////////LOGIN///////////

const botonIngresar =
    document.getElementById("ingresar");

if (botonIngresar) {

    botonIngresar.addEventListener("click", () => {

        const correo =
            document.getElementById("correo").value;

        const contrasena =
            document.getElementById("contrasena").value;

        if (
            correo === "admin@gmail.com" &&
            contrasena === "12345"
        ) {

            localStorage.setItem(
                "sesion",
                "activa"
            );

            window.location.href =
                "../admin.html";
        }
        else {

            alert(
                "Correo o contraseña incorrectos"
            );

        }

    });

}


//////////////////EVENTOS DE ADMINISTRADOR//////////////

// =========================
// VARIABLES
// =========================

const nombreEvento = document.querySelector("#nombreEvento");
const artistaEvento = document.querySelector("#artistaEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const ciudadEvento = document.querySelector("#ciudadEvento");
const categoriaEvento = document.querySelector("#categoriaEvento");
const precioEvento = document.querySelector("#precioEvento");
const imagenEvento = document.querySelector("#imagenEvento");

const btnGuardarEvento = document.querySelector("#btnGuardarEvento");

const totalEventos = document.querySelector("#totalEventos");
const eventosPublicados = document.querySelector("#eventosPublicados");
const eventosVendidos = document.querySelector("#eventosVendidos");

const listaEventos = document.querySelector("#listaEventos");

let eventos =
    JSON.parse(
        localStorage.getItem("eventos")
    ) || [];

let editando = false;
let idEditar = -1;

// =========================
// CARGAR CIUDADES
// =========================

async function cargarCiudades() {

    try {

        const respuesta = await fetch(
            "https://api-colombia.com/api/v1/Department"
        );

        const ciudades =
            await respuesta.json();

        ciudadEvento.innerHTML =
            `
            <option value="">
                Seleccione una ciudad
            </option>
        `;

        ciudades.forEach((ciudad) => {

            ciudadEvento.innerHTML += `
                <option
                    value="${ciudad.name || ciudad.nombre}"
                >
                    ${ciudad.name || ciudad.nombre}
                </option>
            `;

        });

    }
    catch {

        ciudadEvento.innerHTML += `
            <option>
                Bogotá
            </option>

            <option>
                Medellín
            </option>

            <option>
                Cali
            </option>
        `;
    }

}

// =========================
// GUARDAR EVENTO
// =========================

btnGuardarEvento.addEventListener(
    "click",
    guardarEvento
);

function guardarEvento() {

    if (
        nombreEvento.value.trim() === "" ||
        artistaEvento.value.trim() === "" ||
        fechaEvento.value === "" ||
        ciudadEvento.value === "" ||
        categoriaEvento.value === "" ||
        precioEvento.value === "" ||
        imagenEvento.files.length === 0
    ) {

        alert(
            "Complete todos los campos"
        );

        return;
    }

    const archivo =
        imagenEvento.files[0];

    const lector =
        new FileReader();

    lector.onload = function () {

        const nuevoEvento = {

            id: Date.now(),

            nombre:
                nombreEvento.value,

            artista:
                artistaEvento.value,

            fecha:
                fechaEvento.value,

            ciudad:
                ciudadEvento.value,

            categoria:
                categoriaEvento.value,

            precio:
                Number(
                    precioEvento.value
                ),

            imagen:
                lector.result,

            publicado: true,
            vendido: false
        };

        eventos.push(
            nuevoEvento
        );

        localStorage.setItem(
            "eventos",
            JSON.stringify(eventos)
        );

        pintarEventos();

        actualizarDashboard();

        limpiarFormulario();

        alert(
            "Evento creado correctamente"
        );

    };

    lector.readAsDataURL(
        archivo
    );

}

// =========================
// PINTAR EVENTOS
// =========================

function pintarEventos() {

    listaEventos.innerHTML = "";

    eventos.forEach((evento, i) => {

        listaEventos.innerHTML += `

            <div class="card-evento">

                <img
                    src="${evento.imagen}"
                    alt="${evento.nombre}"
                >

                <div class="card-contenido">

                    <h3>${evento.nombre}</h3>

                    <p>🎤 ${evento.artista}</p>

                    <p>📍 ${evento.ciudad}</p>

                    <p>🎵 ${evento.categoria}</p>

                    <p>📅 ${evento.fecha}</p>

                    <h4>$${evento.precio}</h4>

                    <div class="acciones-card">

                        <button
                            class="btn-editar"
                            onclick="editarEvento(${i})"
                        >
                            Editar
                        </button>

                        <button
                            class="btn-eliminar"
                            onclick="eliminarEvento(${i})"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            </div>

        `;
    });

}

// =========================
// ELIMINAR EVENTO
// =========================

function eliminarEvento(i) {

    const respuesta = confirm(
        "¿Desea eliminar este concierto?"
    );

    if (!respuesta) {
        return;
    }

    eventos.splice(i, 1);

    localStorage.setItem(
        "eventos",
        JSON.stringify(eventos)
    );

    pintarEventos();
    actualizarDashboard();

}


// =========================
// EDITAR EVENTO
// =========================



function editarEvento(i) {

    const evento = eventos[i];

    nombreEvento.value =
        evento.nombre;

    artistaEvento.value =
        evento.artista;

    fechaEvento.value =
        evento.fecha;

    ciudadEvento.value =
        evento.ciudad;

    categoriaEvento.value =
        evento.categoria;

    precioEvento.value =
        evento.precio;

    editando = true;
    idEditar = i;

    btnGuardarEvento.textContent =
        "Actualizar Evento";
}




// =========================
// DASHBOARD
// =========================

function actualizarDashboard() {

    totalEventos.textContent =
        eventos.length;

    eventosPublicados.textContent =
        eventos.filter(
            evento =>
                evento.publicado
        ).length;

    eventosVendidos.textContent =
        eventos.filter(
            evento =>
                evento.vendido
        ).length;

}

// =========================
// LIMPIAR FORMULARIO
// =========================

function limpiarFormulario() {

    nombreEvento.value = "";
    artistaEvento.value = "";
    fechaEvento.value = "";
    ciudadEvento.selectedIndex = 0;
    categoriaEvento.selectedIndex = 0;
    precioEvento.value = "";
    imagenEvento.value = "";

}

// =========================
// INICIAR
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarCiudades();

        pintarEventos();

        actualizarDashboard();

    }
);




