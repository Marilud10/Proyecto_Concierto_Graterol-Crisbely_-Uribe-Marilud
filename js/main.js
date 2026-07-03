// NAVBAR
/////////////////////////

const navbar = document.getElementById("navbar");

if (navbar) {

    navbar.innerHTML = `

        <nav class="navbar">

            <div class="logo">
                <h2>Eventix</h2>
            </div>

            <ul class="menu">

                <li>
                    <a href="#proximos">
                        Conciertos
                    </a>
                </li>

                <li>
                    <a href="#">
                        Artistas
                    </a>
                </li>

                <li>
                    <a href="Login/login.html">
                        Iniciar Sesión
                    </a>
                </li>

            </ul>

            <div class="acciones">

                <input
                    type="text"
                    id="buscar"
                    placeholder="Buscar artista..."
                >

            </div>

        </nav>

    `;
}

/////////////////////////
// PROMOCIONES
/////////////////////////

const promociones =
    document.getElementById(
        "promociones"
    );

if (promociones) {

    promociones.innerHTML = `

        <div class="promo morado">

            <h3>Oferta</h3>

            <p>
                15% OFF en entradas VIP.
            </p>

        </div>

        <div class="promo azul">

            <h3>Nuevo</h3>

            <p>
                Paga hasta en 12 cuotas.
            </p>

        </div>

        <div class="promo naranja">

            <h3>VIP</h3>

            <p>
                Acceso prioritario a conciertos.
            </p>

        </div>

    `;

    promociones.classList.add(
        "promociones"
    );
}

/////////////////////////
// HERO
/////////////////////////

const hero =
    document.getElementById(
        "hero"
    );

if (hero) {

    hero.innerHTML = `

        <div class="hero-imagen">

            <img
                src="img/Img-Conciertos/concierto imagen.jpg"
            >

            <div class="hero-info">

                <span>
                    K-POP
                </span>

                <h1>
                    BTS
                </h1>

                <p>
                    Teatro Metropolitano
                </p>

                <button>
                    Comprar - $850
                </button>

            </div>

        </div>

        <div class="eventos-laterales">

            <div class="mini-card">

                <img
                    src="img/marejada.jpg"
                >

                <div>

                    <h4>
                        Marejada
                    </h4>

                    <p>
                        Monterrey
                    </p>

                    <strong>
                        $780
                    </strong>

                </div>

            </div>

            <div class="mini-card">

                <img
                    src="img/flor.jpg"
                >

                <div>

                    <h4>
                        Flor de Tierra
                    </h4>

                    <p>
                        Oaxaca
                    </p>

                    <strong>
                        $450
                    </strong>

                </div>

            </div>

            <div class="mini-card">

                <img
                    src="img/cuerdas.jpg"
                >

                <div>

                    <h4>
                        Cuerdas del Alma
                    </h4>

                    <p>
                        CDMX
                    </p>

                    <strong>
                        $950
                    </strong>

                </div>

            </div>

        </div>

    `;

    hero.classList.add(
        "hero"
    );
}

/////////////////////////
// FOOTER
/////////////////////////

const footer =
    document.getElementById(
        "footer"
    );

if (footer) {

    footer.innerHTML = `

        <div class="footer-logo">

            <h2>
                Eventix
            </h2>

            <p>
                La mejor experiencia para
                encontrar conciertos.
            </p>

        </div>

        <div>

            <h3>
                Explorar
            </h3>

            <a href="#">
                Conciertos
            </a>

            <a href="#">
                Artistas
            </a>

            <a href="#">
                Festivales
            </a>

        </div>

        <div>

            <h3>
                Soporte
            </h3>

            <a href="#">
                Ayuda
            </a>

            <a href="#">
                Contacto
            </a>

            <a href="#">
                Políticas
            </a>

        </div>

    `;
}

/////////////////////////
// BUSCADOR
/////////////////////////

document.addEventListener(
    "input",
    function (e) {

        if (
            e.target.id === "buscar"
        ) {

            const texto =
                e.target.value
                .toLowerCase();

            const cards =
                document.querySelectorAll(
                    ".card"
                );

            cards.forEach((card) => {

                const nombre =
                    card
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

                if (
                    nombre.includes(
                        texto
                    )
                ) {
                    card.style.display =
                        "block";
                }
                else {
                    card.style.display =
                        "none";
                }

            });

        }

    }
);