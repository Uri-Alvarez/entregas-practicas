// URL de la Fake Store API
const API_URL = "https://fakestoreapi.com/products";

// Inicialización del carrito de compras
let carrito = [];

// Función para obtener productos de la API y mostrarlos en la tienda
async function cargarProductos() {
    try {
        const respuesta = await fetch(API_URL);
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// Función para mostrar los productos dinámicamente
function mostrarProductos(productos) {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    productos.forEach((producto) => {
        const productoElemento = document.createElement("div");
        productoElemento.innerHTML = `
            <p><strong>${producto.title}</strong></p>
            <img src="${producto.image}" alt="${producto.title}" width="100">
            <p>Precio: $${producto.price.toFixed(2)}</p>
            <button class="agregar" data-id="${producto.id}">Agregar</button>
        `;
        listaProductos.appendChild(productoElemento);
    });

    document.querySelectorAll(".agregar").forEach((boton) => {
        boton.addEventListener("click", (event) => {
            const idProducto = event.target.dataset.id;
            agregarAlCarrito(productos.find(p => p.id == idProducto));
        });
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let productoEnCarrito = carrito.find(p => p.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        productoEnCarrito.total += producto.price;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.title,
            cantidad: 1,
            precio: producto.price,
            total: producto.price
        });
    }

    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    listaCarrito.innerHTML = "";

    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.total;

        const itemCarrito = document.createElement("div");
        itemCarrito.innerHTML = `
            <p><strong>${producto.nombre}</strong> - ${producto.cantidad} x $${producto.precio.toFixed(2)} = $${producto.total.toFixed(2)}</p>
            <button class="eliminar" data-index="${index}">🗑️ Eliminar</button>
        `;
        listaCarrito.appendChild(itemCarrito);
    });

    totalCarrito.innerText = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            eliminarDelCarrito(index);
        });
    });
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

// Función para procesar la compra
function procesarCompra() {
    const mensajeCompra = document.getElementById("mensaje-compra");

    if (carrito.length === 0) {
        mensajeCompra.innerHTML = `<span style="color: red;">❌ El carrito está vacío.</span>`;
        return;
    }

    let total = carrito.reduce((acc, item) => acc + item.total, 0);
    let contador = 3;

    function cuentaRegresiva() {
        if (contador === 0) {
            mensajeCompra.innerHTML = `✅ Compra realizada con éxito. Total pagado: $${total.toFixed(2)}`;
            setTimeout(() => {
                carrito = [];
                mostrarCarrito();
                mensajeCompra.innerHTML = "";
            }, 2500);
            return;
        }

        mensajeCompra.innerHTML = `⏳ Confirmando compra en <strong>${contador}</strong>...`;
        contador--;

        setTimeout(cuentaRegresiva, 1000);
    }

    cuentaRegresiva();
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pagar").addEventListener("click", procesarCompra);
    cargarProductos();
});
