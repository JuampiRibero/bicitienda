const URL_JSON = 'assets/db/productos.json'

// Agregar productos al HTML a través de getJSON
$.getJSON(URL_JSON, (response, status) => {

    if (status !== 'success') {
        throw new Error('error')
    }

    for (const producto of response) {

        $('#card-producto').append(
                                    `       
                                    <div class='col mb-5'>
                                        <div class='card h-100 border-primary border-3 card-efecto'>
                                            <img class='card-img-top' src='${producto.img}' alt='${producto.nombre}' title='${producto.nombre}' loading='lazy'>
                                            <div class='card-body p-4'>
                                                <div>
                                                    <h4 class='text-center fw-bolder'>${producto.nombre}</h4>
                                                    <p class='text-center fw-bolder'>$${Intl.NumberFormat("de-DE").format(producto.precio)}</p>
                                                </div>
                                            </div>
                                            <div class='card-footer p-4 pt-0 border-top-0 bg-transparent'>
                                                <div class='text-center'>
                                                    <button type='button' onclick=agregarAlCarrito(${producto.id}) class='btn btn-outline-dark mt-auto btn-abrir-modal-producto'>Agregar al carrito</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `
        )
        productos.push(producto);
    }

    // Animar card productos
    $(".card-efecto").hover(function() {
        $(this).css({
            'transition': 'all 400ms ease',
            'transform': 'translateY(-3%)'
        });
    },
    function() {
        $(this).css({
            'transition': 'all 400ms ease',
            'transform': 'translateY(0%)'
        });
    });

    // Animar modal producto agregado
    $('.btn-abrir-modal-producto').click( () => {
        $('#modal-producto').html('');
        $('#modal-producto')
            .append(
                    `
                    <div class='modal-dialog'>
                        <div class='modal-content'>
                            <div class='modal-body'>
                                <div id='row my-3'>
                                    <div class='col-12'>
                                        <p class='d-flex justify-content-center'><i class='far fa-check-circle fa-5x text-success'></i></p>
                                        <p class='text-center fs-5'>¡Producto agregado al carrito!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
            )
            .fadeIn(500)
            .delay(500)
            .fadeOut(500)
    })

})

const productos = [];

// Agregar productos al carrito (se van cargando en el Local Storage)
let carrito = [];

let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));

if (carritoLocalStorage) {
    carrito = carritoLocalStorage;
    actualizarCarrito();
}

function agregarAlCarrito(idProd) {
    const agregarProducto = carrito.find(prod => prod.id === idProd);
    const {stock} = productos.find(prod => prod.id === idProd);

    if(agregarProducto) {
        if((agregarProducto.cantidad + 1) <= stock) {
            agregarProducto.cantidad +=1;
        }else {
            alert('¡No hay stock!');
        }
    }else if(stock > 0) {
        const agregarProducto = productos.find(prod => prod.id === idProd);
        carrito.push(agregarProducto);
    }else {
        alert('¡No hay stock!');
    }    

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Eliminar productos de a una unidad
function eliminarUnProducto(idProd) {
    const sacarUnProducto = carrito.find(prod => prod.id === idProd);

    sacarUnProducto.cantidad --;

    if(sacarUnProducto.cantidad === 0) {
        const indice = carrito.indexOf(sacarUnProducto);
        carrito.splice(indice, 1);
    }    

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Agregar productos de a una unidad
function agregarUnProducto(idProd) {
    const agregarUnProducto = carrito.find(prod => prod.id === idProd);

    agregarUnProducto.cantidad ++;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Eliminar todos los productos iguales
function eliminarProductoIgual(idProd) {
    const sacarProductoIgual = carrito.find(prod => prod.id === idProd);

    sacarProductoIgual.cantidad = 0;

    if(sacarProductoIgual.cantidad === 0) {
        const indice = carrito.indexOf(sacarProductoIgual);
        carrito.splice(indice, 1);
    }    

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

// Actualizar carrito
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const subtotal = document.getElementById('subtotal');
    const iva = document.getElementById('precio-con-iva');
    const precioAPagar = document.getElementById('precio-a-pagar');
    const contadorCarrito = document.getElementById('contador-carrito');
    contenedorCarrito.innerHTML = '';

    carrito.forEach((producto) => {
        contenedorCarrito.innerHTML += `
                                        <div class='producto-carrito'>
                                            <img class='card-img-top img-carrito' src=${producto.img} alt='${producto.nombre}' title='${producto.nombre}' loading='lazy'>
                                            <p class='pt-3'>${producto.nombre}</p>
                                            <p class='pt-3'>
                                                <i onclick=eliminarUnProducto(${producto.id})><span role="button" class="fas fa-minus-circle me-1"></span></i>${producto.cantidad}<i onclick=agregarUnProducto(${producto.id})><span role="button" class="fas fa-plus-circle ms-1"></span></i>
                                            </p>
                                            <p class='pt-3'>$${Intl.NumberFormat("de-DE").format(producto.precio * producto.cantidad)}</p>
                                            <button onclick=eliminarProductoIgual(${producto.id}) class='boton-eliminar'><i class='far fa-trash-alt'></i></i></button>
                                            <tr>
                                        </div>
                                        `
    })
    
    let sumaProductos = carrito.reduce((acum, prod) => acum + (prod.precio * prod.cantidad), 0);
    let ivaProductos = carrito.reduce((acum, prod) => acum + (prod.precio * prod.cantidad) * 0.21, 0);
    subtotal.innerText = Intl.NumberFormat("de-DE").format(sumaProductos);
    iva.innerText = Intl.NumberFormat("de-DE").format(ivaProductos);
    precioLocalStorage = sumaProductos + ivaProductos;
    precioAPagar.innerText = Intl.NumberFormat("de-DE").format(precioLocalStorage);
    localStorage.setItem('precioLocalStorage', JSON.stringify(precioLocalStorage));
    contadorCarrito.innerText = carrito.reduce((acum, prod) => acum + prod.cantidad, 0);
    localStorage.setItem('contadorCarrito', JSON.stringify(carrito.reduce((acum, prod) => acum + prod.cantidad, 0)));
}

// Finalizar compra
const URL = 'https://api.mercadopago.com/checkout/preferences'

const finalizarCompra = () => {

    const carritoMercadoPago = carrito.map(prod => ({
        category_id: prod.id,
        currency_id: "ARS",
        description: "",
        id: "",
        picture_url: prod.img,
        quantity: prod.cantidad,
        title: prod.nombre,
        unit_price: prod.precio + (prod.precio * 0.21), 
    }))

    fetch(URL, {
        method: "POST",
        headers: {
            Authorization: 'Bearer TEST-6749401201952774-052316-331a4b286472f40790ff1702e7a29e62-292785847',
        },
        body: JSON.stringify({
        items: carritoMercadoPago,
        })
    })
        .then(response => response.json())
        .then(data => {
            window.open(data.init_point, '_blank')
        })
}

// Animar modal carrito
$('#btn-abrir-carrito').click( () => {
    $('#modal-carrito').fadeIn(500)
})

$('#btn-cerrar-carrito').click( () => {
    $('#modal-carrito').fadeOut(500)
})

// Botón back to top
$(window).scroll( () => {
    if($(window).scrollTop() > 300) {
        $('#back-to-top-btn').addClass('show');
    }else {
        $('#back-to-top-btn').removeClass('show');
    }
});

$('#back-to-top-btn').on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});