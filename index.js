// Obtención de los elementos del contenedor
var inputNomTar = document.getElementById("input-tarea");
var inputDescTar = document.getElementById("desc-tarea");
var CatTar = document.getElementById("categorias");
var btnAgregar = document.getElementById("btn-agregar");

// Obtención de elementos del área de tareas
var filtroCategorias = document.getElementById("filtro-categorias");
var listaTareas = document.getElementById("lista-tareas");

// Crear elemento de tarea seguro
function crearElementoTarea(nombre, descripcion, categoria) {
    var li = document.createElement("li");
    li.dataset.categoria = categoria;

    // Contenedor principal
    var divPrincipal = document.createElement("div");
    divPrincipal.style.display = "flex";
    divPrincipal.style.justifyContent = "space-between";
    divPrincipal.style.alignItems = "center";

    // Información de la tarea
    var divInfo = document.createElement("div");
    divInfo.style.width = "70%";
    divInfo.style.textAlign = "left";
    divInfo.style.padding = "0.5rem";

    var nombreLabel = document.createElement("i");
    nombreLabel.textContent = "Nombre de la tarea:";

    var nombreEl = document.createElement("strong");
    nombreEl.textContent = nombre;

    var descLabel = document.createElement("i");
    descLabel.textContent = "Descripción de la tarea:";

    var descripcionEl = document.createElement("p");
    descripcionEl.textContent = descripcion;
    descripcionEl.style.display = "-webkit-box";
    descripcionEl.style.webkitLineClamp = "3";
    descripcionEl.style.overflow = "hidden";
    descripcionEl.style.textOverflow = "ellipsis";

    var catLabel = document.createElement("i");
    catLabel.textContent = "Categoría de la tarea:";

    var categoriaEl = document.createElement("span");
    categoriaEl.textContent = categoria;

    divInfo.appendChild(nombreLabel);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(nombreEl);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(descLabel);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(descripcionEl);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(catLabel);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(categoriaEl);

    // Botones
    var divBotones = document.createElement("div");
    divBotones.style.display = "flex";
    divBotones.style.flexDirection = "column";
    divBotones.style.gap = "0.5rem";

    var btnCompletar = document.createElement("button");
    btnCompletar.classList.add("btn-completar");
    btnCompletar.textContent = "Completar";

    var btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.textContent = "Eliminar";

    divBotones.appendChild(btnCompletar);
    divBotones.appendChild(btnEliminar);

    // Añadir info y botones al contenedor principal
    divPrincipal.appendChild(divInfo);
    divPrincipal.appendChild(divBotones);
    li.appendChild(divPrincipal);

    // Eventos
    btnCompletar.addEventListener("click", function() {
        if (li.classList.contains("completada")) {
            li.classList.remove("completada");
        } else {
            li.classList.add("completada");
        }
    });

    btnEliminar.addEventListener("click", function() {
        li.remove();
        actualizarContador();
    });

    return li;
}

// Agregar tarea
function agregarTarea() {
    var nombre = inputNomTar.value.trim();
    var descripcion = inputDescTar.value.trim();
    var categoria = CatTar.value;

    if (nombre !== "" && descripcion !== "" && categoria !== "") {
        var nuevaTarea = crearElementoTarea(nombre, descripcion, categoria);

        // Filtrar según selección actual
        var categoriaFiltro = filtroCategorias.value;
        if (categoriaFiltro === "Todos" || categoriaFiltro === "" || categoriaFiltro === categoria) {
            nuevaTarea.style.display = "";
        } else {
            nuevaTarea.style.display = "none";
        }

        listaTareas.appendChild(nuevaTarea);

        // Limpiar inputs
        inputNomTar.value = "";
        inputDescTar.value = "";
        CatTar.value = "";

        inputNomTar.focus();
        actualizarContador();
    }
}

// Contador de tareas visibles
function actualizarContador() {
    var tareasVisibles = [];
    var hijos = listaTareas.children;
    for (const element of 
    hijos) {
        if (element.style.display !== "none") {
            tareasVisibles.push(element);
        }
    }

    var contador = document.getElementById("contador");
    if (!contador) {
        contador = document.createElement("span");
        contador.id = "contador";
        var h2 = document.querySelector(".tareas-agregadas h2");
        h2.appendChild(document.createElement("br"));
        h2.appendChild(document.createTextNode("Total tareas visibles: "));
        h2.appendChild(contador);
    }
    contador.textContent = tareasVisibles.length;
}

// Eventos de agregar tarea
btnAgregar.addEventListener("click", agregarTarea);

inputNomTar.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        agregarTarea();
    }
});

inputDescTar.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        agregarTarea();
    }
});

// Filtrar por categoría
filtroCategorias.addEventListener("change", function() {
    var categoriaSeleccionada = filtroCategorias.value;
    var tareas = listaTareas.children;

    for (const element of tareas) {
        var tarea = element;
        var cat = tarea.dataset.categoria;

        if (categoriaSeleccionada === "Todos" || categoriaSeleccionada === "" || cat === categoriaSeleccionada) {
            tarea.style.display = "";
        } else {
            tarea.style.display = "none";
        }
    }
    actualizarContador();
});
