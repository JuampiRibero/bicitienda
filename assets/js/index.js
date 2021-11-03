// Creación de objeto mediante clases y métodos
class Producto {
    constructor(id, nombre, marca, precio, stock, img) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = parseFloat(precio);
        this.stock = stock;
        this.img = img;

    }
    getPrecio() {
    return this.precio;
    }
}

// Lista de productos y carrito
let productos = JSON.parse(localStorage.getItem('productos')) || [];
let carrito = [];

// Método que retorna la lista de productos
const getAll = () => {
    return productos;
}

// Metodo para agregar un producto a la lista
const create = (producto) => {
    productos.push(producto);
}

// Método para hallar un producto por nombre
const findOne = (id) => {
    const prod = productos.find( prod => prod.id === id);
    if(!prod){
        throw new Error(`No existe el producto con id #${id}`);
    }
    return prod;
}

// Método para modificar un producto
const update = (id, precio) => {
    const prod = findOne(id);
    prod.precio = precio;
}

// Método para eliminar un producto
const remove = (id) => {
    const prod = findOne(id);
    const index = productos.indexOf(prod);
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Crear los productos como instancia de la clase Producto
const producto1 = new Producto(1, 'Oxea Packard', 'Oxea', 86600, 50, src='https://i.ibb.co/MZCfrCp/oxea-packard.png');
const producto2 = new Producto(2, 'Oxea Eikon', 'Oxea', 82000, 50, src='https://i.ibb.co/X2jq1Z5/oxea-eikon.png');
const producto3 = new Producto(3, 'Oxea Talus', 'Oxea', 68100, 50, src='https://i.ibb.co/v4tYDnx/oxea-talus.png');
const producto4 = new Producto(4, 'Oxea Riddich', 'Oxea', 54000, 50, src='https://i.ibb.co/NtfJKm8/oxea-riddich.png');
const producto5 = new Producto(5, 'Oxea Shadane', 'Oxea', 47600, 50, src='https://i.ibb.co/vdZBMYH/oxea-shadane.png');
const producto6 = new Producto(6, 'Oxea Hunter', 'Oxea', 45800, 50, src='https://i.ibb.co/TYxPzdv/oxea-hunter.png');
const producto7 = new Producto(7, 'Oxea Campus', 'Oxea', 51700, 50, src='https://i.ibb.co/ccnJ4kw/oxea-campus.png');
const producto8 = new Producto(8, 'Oxea Plegable', 'Oxea', 49300, 50, src='https://i.ibb.co/Ny2SVsP/oxea-plegable.png');

// Agregar productos a la lista
create(producto1);
create(producto2);
create(producto3);
create(producto4);
create(producto5);
create(producto6);
create(producto7);
create(producto8);

// Catálogo ordenado por precios de menor a mayor, mostrado en consola
var ordenarPrecioVenta = [];
ordenarPrecioVenta = productos.map(item => item);
ordenarPrecioVenta.sort(function(a, b) {
    return a.precio - b.precio;
});
console.log('Lista de precios ordenada de menor a mayor:\n\n', ordenarPrecioVenta);

// Agregar productos al HTML
const cardProductos = document.getElementById('card-producto');

mostrarProductos(productos);

function mostrarProductos(array) {

    cardProductos.innerHTML = '';

    array.forEach((producto) => {
        let div = document.createElement('div');
        div.classList.add('col', 'mb-5');
        div.innerHTML = `
                        <div class='card h-100 border-primary border-3 card-efecto'>
                            <img class='card-img-top' src=${producto.img} alt='${producto.nombre}' title='${producto.nombre}' loading='lazy'>
                            <div class='card-body p-4'>
                                <div class='text-center'>
                                    <h5 class='fw-bolder'>${producto.nombre}</h5>
                                    $${producto.precio}
                                </div>
                            </div>
                            <div class='card-footer p-4 pt-0 border-top-0 bg-transparent'>
                                <div class='text-center'>
                                    <button onclick=agregarAlCarrito(${producto.id}) class='btn btn-outline-dark mt-auto' data-bs-toggle='modal' data-bs-target='#modal-producto'>Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                        `
        cardProductos.appendChild(div);
    })

}

// Agregar productos al carrito (se van cargando en el Local Storage)
let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));

if (carritoLocalStorage) {
    carrito = carritoLocalStorage;
    actualizarCarrito();
}

function agregarAlCarrito(id) {
    const agregarProducto = findOne(id);
    if (agregarProducto) {
        carrito.push(agregarProducto);
    }
    actualizarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar carrito
function actualizarCarrito() {
    
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const subtotal = document.getElementById('subtotal');
    const precioConIva = document.getElementById('precio-con-iva');
    const precioAPagar = document.getElementById('precio-a-pagar');
    const contadorCarrito = document.getElementById('contador-carrito');

    contenedorCarrito.innerHTML = '';

    carrito.forEach((producto) => {
        contenedorCarrito.innerHTML += `
                                        <div class='producto-carrito'>
                                            <img class='card-img-top img-carrito' src=${producto.img} alt='${producto.nombre}' title='${producto.nombre}' loading='lazy'>
                                            <p class='pt-3'>${producto.nombre}</p>
                                            <p class='pt-3'>$${producto.precio}</p>
                                            <button onclick=eliminarProducto(${producto.id}) class='boton-eliminar'><i class='far fa-trash-alt'></i></i></button>
                                        </div>
                                       `
    })
    
    let sumaProductos = carrito.reduce((acum, prod) => acum += prod.precio, 0);
    let ivaProductos = carrito.reduce((acum, prod) => acum += prod.precio * 0.21, 0);
    
    subtotal.innerText = sumaProductos.toFixed(2);
    precioConIva.innerText = ivaProductos.toFixed(2);
    precioConDecimal = sumaProductos + ivaProductos;
    precioAPagar.innerText = precioConDecimal.toFixed(2);
    localStorage.setItem('precioConDecimal', JSON.stringify(precioConDecimal));
    
    contadorCarrito.innerText = carrito.length;
    localStorage.setItem('contadorCarrito', JSON.stringify(carrito.length));
}

// Eliminar producto
function eliminarProducto(id) {
    const sacarProducto = findOne(id);
    const index = carrito.indexOf(sacarProducto);
    carrito.splice(index, 1);
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Eliminar todos los productos
function eliminarTodo() {
    if (confirm('¿Querés vaciar el carrito?')) {
        localStorage.clear(carrito);
        carrito = [];
        actualizarCarrito();
    }
}

// Mostrar en consola en carrito de Local Storage
console.log('Carrito de compras en Local Storage:\n\n', carritoLocalStorage);