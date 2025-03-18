// Definición de productos disponibles en la tienda
const productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalón", precio: 20, stock: 17 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Vestido", precio: 25, stock: 8 },
    { nombre: "Sudadera", precio: 30, stock: 20 }
];

// Inicialización del carrito de compras
let carrito = [];

/**
 * Muestra la lista de productos disponibles en la tienda y permite su selección.
 */
function mostrarProductos() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        const productoElemento = document.createElement("div");
        productoElemento.innerHTML = `
            <p><strong>${producto.nombre}</strong> - $${producto.precio} (Stock: ${producto.stock})</p>
            <button class="agregar" data-index="${index}">Agregar</button>
        `;
        listaProductos.appendChild(productoElemento);
    });

    document.querySelectorAll(".agregar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            agregarAlCarrito(productos[index].nombre, 1);
        });
    });
}

/**
 * Muestra el contenido actual del carrito de compras.
 */
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    listaCarrito.innerHTML = "";
    
    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.total;

        const itemCarrito = document.createElement("div");
        itemCarrito.innerHTML = `
            <p><strong>${producto.nombre}</strong> - ${producto.cantidad} x $${producto.precio} = $${producto.total}</p>
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

/**
 * Agrega un producto al carrito, validando la disponibilidad de stock.
 * @param {string} productoNombre - Nombre del producto a agregar.
 * @param {number} cantidad - Cantidad del producto a agregar.
 */
function agregarAlCarrito(productoNombre, cantidad) {
    const producto = productos.find(p => p.nombre === productoNombre);
    
    if (!producto || producto.stock < cantidad) {
        alert(`❌ No hay suficiente stock de "${productoNombre}".`);
        return;
    }
    
    let productoEnCarrito = carrito.find(p => p.nombre === productoNombre);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.total += producto.precio * cantidad;
    } else {
        carrito.push({
            nombre: producto.nombre,
            cantidad: cantidad,
            precio: producto.precio,
            total: producto.precio * cantidad
        });
    }
    
    producto.stock -= cantidad;
    
    mostrarProductos();
    mostrarCarrito();
}

/**
 * Elimina un producto del carrito y restablece su stock.
 * @param {number} index - Índice del producto en el carrito.
 */
function eliminarDelCarrito(index) {
    const producto = carrito[index];
    
    productos.find(p => p.nombre === producto.nombre).stock += producto.cantidad;
    
    carrito.splice(index, 1);
    
    mostrarProductos();
    mostrarCarrito();
}

/**
 * Procesa la compra, aplicando descuentos si es necesario y mostrando una cuenta regresiva.
 */
function procesarCompra() {
    const mensajeCompra = document.getElementById("mensaje-compra");

    if (carrito.length === 0) {
        mensajeCompra.innerHTML = `<span style="color: red;">❌ El carrito está vacío.</span>`;
        return;
    }
    
    let total = carrito.reduce((acc, item) => acc + item.total, 0);
    let descuentoAplicado = total > 100 ? total * 0.1 : 0;
    let totalFinal = total - descuentoAplicado;
    let contador = 3;
    
    function cuentaRegresiva() {
        if (contador === 0) {
            let mensajeFinal = `✅ Compra realizada con éxito.<br>`;
            
            if (descuentoAplicado > 0) {
                mensajeFinal += `<strong>Descuento aplicado: $${descuentoAplicado.toFixed(2)}</strong><br>`;
            }
            
            mensajeFinal += `<strong>Total a pagar: $${totalFinal.toFixed(2)}</strong>`;
            mensajeCompra.innerHTML = mensajeFinal;
            
            setTimeout(() => {
                mensajeCompra.innerHTML += `<br> ¡Gracias por su compra!`;
            }, 2000);
            
            setTimeout(() => {
                carrito = [];
                mostrarCarrito();
            }, 2500);
            
            return;
        }
        
        mensajeCompra.innerHTML = `⏳ Confirmando compra en <strong>${contador}</strong>...`;
        contador--;
        
        setTimeout(cuentaRegresiva, 1000);
    }
    
    cuentaRegresiva();
}

// Inicialización del evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const botonProcesar = document.getElementById("pagar");
    if (botonProcesar) {
        botonProcesar.addEventListener("click", procesarCompra);
    }
    mostrarProductos();
});
