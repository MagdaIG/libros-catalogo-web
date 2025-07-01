const libros = [
  {
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo Mágico",
    sinopsis: "La historia de la familia Buendía a lo largo de varias generaciones.",
    imagen: "assets/img/libros/soledad.png"
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    genero: "Distopía",
    sinopsis: "Una crítica al totalitarismo bajo la vigilancia del Gran Hermano.",
    imagen: "assets/img/libros/1984.png"
  },
  {
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    genero: "Romance",
    sinopsis: "La complicada relación entre Elizabeth Bennet y el Sr. Darcy.",
    imagen: "assets/img/libros/orgullo.png"
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    genero: "Ficción",
    sinopsis: "Una historia poética sobre un pequeño príncipe y sus viajes.",
    imagen: "assets/img/libros/principito.png"
  },
  {
    titulo: "Los Miserables",
    autor: "Victor Hugo",
    genero: "Drama histórico",
    sinopsis: "La redención de Jean Valjean tras cumplir una condena injusta.",
    imagen: "assets/img/libros/miserables.png"
  },
  {
    titulo: "La Piedra Lunar",
    autor: "Wilkie Collins",
    genero: "Misterio",
    sinopsis: "Una joya robada y una investigación llena de giros inesperados.",
    imagen: "assets/img/libros/piedralunar.png"
  },
  {
    titulo: "La Dama de las Camelias",
    autor: "Alexandre Dumas (hijo)",
    genero: "Romance trágico",
    sinopsis: "Un amor imposible entre una cortesana y un joven burgués.",
    imagen: "assets/img/libros/camelias.png"
  },
  {
    titulo: "Historia de dos ciudades",
    autor: "Charles Dickens",
    genero: "Histórico",
    sinopsis: "Una historia de amor y sacrificio durante la Revolución Francesa.",
    imagen: "assets/img/libros/dosciudades.png"
  },
  {
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    genero: "Programación",
    sinopsis: "Una guía para escribir código limpio y mantenible.",
    imagen: "assets/img/libros/cleancode.png"
  }
];

let librosFiltrados = [...libros];

function mostrarLibros(filtrados = librosFiltrados) {
  const contenedor = document.getElementById("lista-libros");
  contenedor.innerHTML = "";

  if (filtrados.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>No se encontraron libros.</p>";
    return;
  }

  filtrados.forEach((libro, index) => {
    contenedor.innerHTML += `
      <div class="col">
        <div class="card h-100 shadow-sm position-relative">
          <img src="${libro.imagen}" class="card-img-top libro-img" alt="${libro.titulo}">
          <button class="btn btn-bookmark position-absolute top-0 end-0 m-2" data-index="${index}" title="Guardar">
            <i class="far fa-bookmark"></i>
          </button>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${libro.titulo}</h5>
            <p class="card-text"><strong>Autor:</strong> ${libro.autor}</p>
            <p class="card-text"><strong>Género:</strong> ${libro.genero}</p>
            <p class="card-text">${libro.sinopsis}</p>
            <div class="mt-auto d-flex justify-content-around gap-2 pt-2">
              <button class="btn btn-outline-success rounded-circle btn-icon" title="Leer">
                <i class="fas fa-book-open"></i>
              </button>
              <button class="btn btn-outline-danger rounded-circle btn-icon btn-favorito" title="Favorito">
                <i class="far fa-heart"></i>
              </button>
              <button class="btn btn-outline-primary rounded-circle btn-icon" title="Préstamo">
                <i class="fas fa-hand-holding"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  activarFavoritos();
  activarBookmarks();
}

function activarFavoritos() {
  document.querySelectorAll(".btn-favorito").forEach(btn => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i");
      icon.classList.toggle("far");
      icon.classList.toggle("fas");
      icon.classList.toggle("text-danger");
    });
  });
}

function activarBookmarks() {
  document.querySelectorAll(".btn-bookmark").forEach(btn => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i");
      icon.classList.toggle("far");
      icon.classList.toggle("fas");
      icon.classList.toggle("text-primary");
    });
  });
}

function buscarLibros() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const resultado = librosFiltrados.filter(libro =>
    libro.titulo.toLowerCase().includes(texto) ||
    libro.autor.toLowerCase().includes(texto) ||
    libro.genero.toLowerCase().includes(texto)
  );
  mostrarLibros(resultado);
}

function filtrarPorGenero() {
  const genero = document.getElementById("filtroGenero").value;
  librosFiltrados = genero
    ? libros.filter(libro => libro.genero === genero)
    : [...libros];
  ordenarPorNombre(); // Reordena luego de filtrar
}

function ordenarPorNombre() {
  const orden = document.getElementById("ordenAlfabetico").value;
  if (orden === "asc") {
    librosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (orden === "desc") {
    librosFiltrados.sort((a, b) => b.titulo.localeCompare(a.titulo));
  }
  mostrarLibros(librosFiltrados);
}

// Validación del formulario de registro
document.addEventListener("DOMContentLoaded", () => {
  mostrarLibros();

  const form = document.getElementById("formRegistro");
  const mensaje = document.getElementById("mensajeExito");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (form.checkValidity()) {
        mensaje.classList.remove("d-none");
        form.classList.remove("was-validated");
        form.reset();
      } else {
        mensaje.classList.add("d-none");
      }

      form.classList.add("was-validated");
    });
  }
});
