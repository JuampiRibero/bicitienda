// Creación de objeto mediante clases y métodos
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.stock = stock;
    }
    getPrecioConIva() {
        return this.precio = this.precio * 1.21;
    }
    getPrecio() {
        return this.precio;
    }
}


// Lista de productos
const productos = [];


// Método que retorna la lista de productos
const getAll = () => {
    return productos;
}


// Metodo para agregar un producto a la lista
const create = (producto) => {
    productos.push(producto);
}


// Método para hallar un producto por nombre
const findOne = (nombre) => {
    nombre = nombre.toLowerCase();
    const prod = productos.find( prod => prod.nombre === nombre);
    if(!prod){
        throw new Error(`No existe ${nombre}`);
    }
    return prod;
}


// Método para modificar un producto
const update = (nombre, precio) => {
    const prod = findOne(nombre);
    prod.precio = precio;
}


// Método para eliminar un producto
const remove = (nombre) => {

    const prod = findOne(nombre);
    const index = productos.indexOf(prod);
    productos.splice(index, 1);
}


// C.R.U.D.
// Crear un nuevo producto como instancia de la clase Producto
const producto1 = new Producto("Bicicleta Oxea Proto", 103400, 50);
const producto2 = new Producto("Bicicleta Oxea Packard", 80200, 50);
const producto3 = new Producto("Bicicleta Oxea Eikon", 76000, 50);


// Agregar producto1, producto2 y producto3 a la lista
create(producto1);
create(producto2);
create(producto3);


// Buscar un producto por su nombre
console.log("Encontrar bicicleta oxea eikon:\n\n", findOne("Bicicleta Oxea Eikon"));


// Actualizar el precio de un producto
// update("Bicicleta Oxea Packard", 85200);


// Eliminar un producto por su nombre
// remove("Bicicleta Oxea Packard");


// Obtener la lista completa de productos
console.log("Lista de bicicletas:\n\n", getAll());


// Catálogo ordenado por precios de menor a mayor, mostrado en consola
var ordenarPrecioVenta = [];

ordenarPrecioVenta = productos.map(item => item);

ordenarPrecioVenta.sort(function(a, b) {
    return a.precio - b.precio;
});
console.log("Lista de precios ordenada de menor a mayor:\n\n", ordenarPrecioVenta);


// Función para correr el algoritmo para interactuar con el usuario
function correr (){

    let usuario = prompt("Bienvenido, ingrese su nombre y apellido");
    let respuesta = prompt("¿Quiere conocer nuestro catálogo de bicicletas Oxea? SI/NO").toUpperCase();

    if(respuesta == "SI"){
        for(let index = 0; index < productos.length; index++){
            alert(`${index+1}. El precio de lista de ${productos[index].nombre} es de $${productos[index].getPrecio()} y el precio final es de $${productos[index].getPrecioConIva()}`);
        }
        alert(`Gracias por su consulta ${usuario}, saludos!`);
        alert(`Ver más salidas de información en consola!`);
    }else{
        alert(`Estimado ${usuario}, cuando quiera conocer nuestro catálogo aquí lo esperamos!`);
    }
    
}


// Función que muestra una impresión del catálogo
function lista () {
    
    document.write(`<h2>CATÁLOGO</h2>`);
    for(const producto of productos){
        document.write(`<ul><li><h3>Nombre: ${producto.nombre}</h3></li>`);
        document.write(`<li><h3>Precio de Lista: $${producto.getPrecio()}</h3></li>`);
        document.write(`<li><h3>Precio de Venta: $${producto.getPrecioConIva()}</h3></li>`);
        document.write(`<li><h3>Stock: ${producto.stock}</h3></li></ul><br>`);
    }

}