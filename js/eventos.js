async function cargarEventos() {

    const respuesta =
        await fetch("Conciertos.json");

    const eventos =
        await respuesta.json();

    console.log(eventos);
}

cargarEventos();



async function cargarEventosIniciales() {

    let eventos =
        JSON.parse(
            localStorage.getItem("eventos")
        );

    // Si ya existen eventos, no vuelve a cargarlos
    if (eventos) {
        mostrarEventosCliente();
        return;
    }

    try {

        const respuesta =
            await fetch(
                "Conciertos.json"
            );

        const datos =
            await respuesta.json();

        localStorage.setItem(
            "eventos",
            JSON.stringify(datos)
        );

        mostrarEventosCliente();

    } catch (error) {

        console.log(
            "Error al cargar el JSON",
            error
        );

    }
}


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
                        📍 ${evento.ciudad}
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

cargarEventosIniciales();
////////PANEL LOGIN//////////

const panelAdmin =
    document.getElementById("panelAdmin");

if (panelAdmin) {

    panelAdmin.innerHTML = `

        <h1>Administrador de Eventos</h1>

        <div class="form-evento">

            <input
                type="text"
                id="nombre"
                placeholder="Nombre">

            <input
                type="text"
                id="genero"
                placeholder="Género">

            <input
                type="text"
                id="ciudad"
                placeholder="Ciudad">

            <input
                type="text"
                id="hora"
                placeholder="Hora">

            <input
                type="number"
                id="precio"
                placeholder="Precio">

            <input
                type="text"
                id="imagen"
                placeholder="Ruta de imagen">

            <button id="guardar">
                Crear Evento
            </button>

        </div>

        <h2>Lista de Eventos</h2>

        <div class="lista-admin">

        </div>

    `;

    mostrarEventosAdmin();
}




/////////////////////Eventos////////////////

const contenedor =
    document.querySelector(
        ".contenedor-cards"
    );

function mostrarEventosCliente() {

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

    eventos.forEach(
        (evento) => {

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

        }
    );

}

mostrarEventosCliente();