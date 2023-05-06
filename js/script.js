function verificarSesion() {
    axios({
        method: 'get',
        url: `http://localhost:4200/sesiones/${idSession}`,
    })
        .then(res => {
            if (res.data.codigo == 0) {
                window.open(`login.html`, '_self');
            } else {
                generarArregloUsuarios();
                cargarValores();
            }
        })
}

function generarArregloUsuarios() {
    axios({
        method: 'GET',
        url: 'http://localhost:4200/usuarios/motoristas'
    })
        .then(res => {
            usuarios = res.data;
            generarMotoristas();
        });
}

function menu(valor) {
    let logo = document.getElementById('logo');
    let cerrar = document.getElementById('cerrar');
    let abrir = document.getElementById('abrir');
    let menu = document.getElementById('menu');
    let seccionesCabecera = document.getElementById('secciones-cabecera');
    let cabeceraMenu = document.getElementById('cabecera-menu');

    if (valor == 0) {
        logo.style.display = 'none';
        cerrar.style.display = 'none';
        abrir.style.display = 'block';
        menu.style.width = '63px';
        seccionesCabecera.style.display = 'none';
        cabeceraMenu.style.justifyContent = 'center';
    } else {
        logo.style.display = 'block';
        cerrar.style.display = 'block';
        abrir.style.display = 'none';
        menu.style.width = '230px';
        seccionesCabecera.style.display = 'block';
        cabeceraMenu.style.justifyContent = 'space-between';
    }
}


function cambioSeccion(elemento, tipo, seccion) {
    let objeto = document.getElementById(`${tipo}${seccion}`);
    sectionPrincipal.style.display = 'none';
    Array.from(sections).forEach(section => {
        section.style.display = 'none';
    });
    Array.from(controles).forEach(control => {
        control.classList.remove('fondo-azul');
    });
    elemento.classList.add('fondo-azul');
    objeto.style.display = 'block';
}

function cargarValores() {
    let codigoActualizarCategoria = document.getElementById('selectcodigo-actualizarCategoria');
    let codigoActualizarEmpresa = document.getElementById('selectcodigo-actualizarEmpresa');
    let codigoActualizarProducto = document.getElementById('selectcodigo-actualizarProducto');

    let categoriaAgregarEmpresa = document.getElementById('selectcategoria-agregarEmpresa');
    let empresaAgregarProducto = document.getElementById('selectempresa-agregarProducto');
    let categoriaActualizarEmpresa = document.getElementById('selectcategoria-actualizarEmpresa');
    let empresaActualizarProducto = document.getElementById('selectempresa-actualizarProducto');

    codigoActualizarCategoria.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoActualizarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoActualizarProducto.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';

    let codigoEliminarCategoria = document.getElementById('selectcodigo-eliminarCategoria');
    let codigoEliminarEmpresa = document.getElementById('selectcodigo-eliminarEmpresa');
    let codigoEliminarProducto = document.getElementById('selectcodigo-eliminarProducto');

    let categoriaMostrarEmpresa = document.getElementById('selectcategoria-verEmpresa');
    let empresaMostrarProducto = document.getElementById('selectempresa-verProducto');

    codigoEliminarCategoria.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoEliminarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoEliminarProducto.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    categoriaAgregarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    empresaAgregarProducto.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    categoriaActualizarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    empresaActualizarProducto.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    categoriaMostrarEmpresa.innerHTML = '<option selected value="0"> -- Seleccione una opción -- </option>';
    empresaMostrarProducto.innerHTML = '<option selected value="0"> -- Seleccione una opción -- </option>';

    axios({
        method: 'GET',
        url: 'http://localhost:4200/categorias'
    })
        .then(res => {
            categorias = res.data;
            categorias.forEach(categoria => {
                codigoActualizarCategoria.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                codigoEliminarCategoria.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                categoriaAgregarEmpresa.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                categoriaActualizarEmpresa.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                categoriaMostrarEmpresa.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
            });
        });

    axios({
        method: 'GET',
        url: 'http://localhost:4200/empresas'
    })
        .then(res => {
            empresas = res.data;
            empresas.forEach(empresa => {
                codigoActualizarEmpresa.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                codigoEliminarEmpresa.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                empresaActualizarProducto.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                empresaAgregarProducto.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                empresaMostrarProducto.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
            });
        });

    axios({
        method: 'GET',
        url: 'http://localhost:4200/productos'
    })
        .then(res => {
            productos = res.data;
            productos.forEach(producto => {
                codigoActualizarProducto.innerHTML += `<option value="${producto._id}">${producto._id} - ${producto.nombre}</option>`;
                codigoEliminarProducto.innerHTML += `<option value="${producto._id}">${producto._id} - ${producto.nombre}</option>`;
            });
        });
    let inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach(input => input.value = null);

    let selects = document.getElementsByTagName('select');
    Array.from(selects).forEach(select => select.value = null);

    let textareas = document.getElementsByTagName('textarea');
    Array.from(textareas).forEach(textarea => textarea.value = null);

    let imgs = document.getElementsByClassName('vistaPrevia');
    Array.from(imgs).forEach(img => img.src = '');

    imgs = document.getElementsByClassName('vistaPrevia-banner');
    Array.from(imgs).forEach(img => img.src = '');
}


//categorías
function agregarCategoria() {
    let nombre = document.getElementById('txtnombre-agregarCategoria');
    let descripcion = document.getElementById('txtdescripcion-agregarCategoria');
    let imagen = document.getElementById('fileimagen-agregarCategoria');

    if (nombre.value == '' || descripcion.value == '' || imagen.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Hay campos vacíos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('imagen', imagen.files[0]);

        axios({
            method: 'POST',
            url: 'http://localhost:4200/categorias',
            data: formData
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('borde-verde');
                modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
                modalBodyAdministrador2.parentNode.classList.remove('borde-amarillo');

                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                cargarValores();
            });
    }
}

function perfilCategoria() {
    let codigo = document.getElementById('selectcodigo-actualizarCategoria');
    let nombre = document.getElementById('txtnombre-actualizarCategoria');
    let descripcion = document.getElementById('txtdescripcion-actualizarCategoria');
    let imagen = document.getElementById('fileimagen-actualizarCategoria-2');

    let filtro = categorias.filter(categoria => categoria._id == codigo.value)[0];

    nombre.value = filtro.nombre;
    descripcion.value = filtro.descripcion;
    imagen.src = filtro.imagen;
}

function actualizarCategoria() {
    let codigo = document.getElementById('selectcodigo-actualizarCategoria');
    let nombre = document.getElementById('txtnombre-actualizarCategoria');
    let descripcion = document.getElementById('txtdescripcion-actualizarCategoria');
    let imagen = document.getElementById('fileimagen-actualizarCategoria');

    if (nombre.value == '' || descripcion.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Hay campos vacíos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos de tipo texto.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {

        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);

        if (imagen.value != '') {
            formData.append('imagen', imagen.files[0]);
        }
        axios({
            method: 'PUT',
            url: `http://localhost:4200/categorias/${codigo.value}`,
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('borde-verde');
                modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                cargarValores();
            });
        cargarValores();
    }
}

function llenarTablaCategoria() {
    let cuerpo = document.getElementById('cuerpo-tablaCategorias');
    cuerpo.innerHTML = '';

    categorias.forEach(categoria => {
        cuerpo.innerHTML +=
            `<tr>
                <th scope="row">${categoria._id}</th>
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion}</td>
            </tr>`;
    });
}

function buscarCategoria(elemento) {
    let cuerpo = document.getElementById('cuerpo-tablaCategorias');
    cuerpo.innerHTML = '';
    if (elemento.value == '') {
        llenarTablaCategoria();
    } else {
        filtro = categorias.filter(categoria => (categoria._id.toUpperCase().includes(elemento.value.toUpperCase()) || categoria.nombre.toUpperCase().includes(elemento.value.toUpperCase()) || categoria.descripcion.toUpperCase().includes(elemento.value.toUpperCase())));

        if (filtro.length != 0) {
            filtro.forEach(categoria => {
                cuerpo.innerHTML +=
                    `<tr>
                    <th scope="row">${categoria._id}</th>
                    <td>${categoria.nombre}</td>
                    <td>${categoria.descripcion}</td>
                </tr>`;
            });
            
        }
    }
}

function nombreCategoria(elemento) {
    let filtro = categorias.filter(categoria => categoria._id == elemento.value)[0];
    document.getElementById('txtcategoria-eliminarCategoria').value = filtro.nombre;
}

function eliminarCategoria() {
    let codigo = document.getElementById('selectcodigo-eliminarCategoria');
    modalBodyAdministrador2.parentNode.classList.add('borde-amarillo');
    modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
    modalBodyAdministrador2.innerHTML =
        `<h5 class="titulo-modal my-4">¿Está seguro que desea eliminar la categoría?</h5>
        <div class="advertencia my-3">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h6 class="subtitulo-modal">Se eliminarán todas las empresas asociadas.</h6>
        <div class="botones-modal mt-4 mb-3">
            <button class="boton boton-blanco borde-rojo" onclick="cerrarModal2();">Cerrar</button>
            <button class="boton boton-blanco borde-verde" onclick="eliminarCat('${codigo.value}');">Aceptar</button>
        </div>`;
    if (codigo.value != '') {
        abrirModal2(); 
    }
}

function eliminarCat(codigo) {
    axios({
        method: 'DELETE',
        url: `http://localhost:4200/categorias/${codigo}`
    })
        .then(res => {
            modalBodyAdministrador2.parentNode.classList.add('borde-verde');
            modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
            modalBodyAdministrador2.parentNode.classList.remove('borde-amarillo');
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                <div class="check my-3">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
            cargarValores();
        });
}

//empresas
function agregarEmpresa() {
    let nombre = document.getElementById('txtnombre-agregarEmpresa');
    let descripcion = document.getElementById('txtdescripcion-agregarEmpresa');
    let direccion = document.getElementById('txtdireccion-agregarEmpresa');
    let telefono = document.getElementById('txttelefono-agregarEmpresa');
    let correo = document.getElementById('txtcorreo-agregarEmpresa');
    let categoria = document.getElementById('selectcategoria-agregarEmpresa');
    let calificacion = document.getElementById('selectcalificacion-agregarEmpresa');
    let imagen = document.getElementById('fileimagen-agregarEmpresa');
    let banner = document.getElementById('filebanner-agregarEmpresa');

    if (nombre.value == '' || descripcion.value == '' || direccion.value == '' || telefono.value == '' || correo.value == '' || categoria.value == '' || calificacion.value == '' || imagen.value == '' || banner.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Hay campos vacíos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expCorreo.test(correo.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Correo inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, ingresa un correo válido.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expTelefono.test(telefono.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Teléfono inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, ingresa un número válido.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('direccion', direccion.value);
        formData.append('telefono', telefono.value);
        formData.append('correo', correo.value);
        formData.append('codigoCategoria', categoria.value);
        formData.append('calificacion', calificacion.value);
        formData.append('banner', banner.files[0]);
        formData.append('logo', imagen.files[0]);
        axios({
            method: 'POST',
            url: 'http://localhost:4200/empresas',
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('borde-verde');
                modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                cargarValores();
            });
    }
}

function perfilEmpresa() {
    let codigo = document.getElementById('selectcodigo-actualizarEmpresa');
    let nombre = document.getElementById('txtnombre-actualizarEmpresa');
    let descripcion = document.getElementById('txtdescripcion-actualizarEmpresa');
    let direccion = document.getElementById('txtdireccion-actualizarEmpresa');
    let telefono = document.getElementById('txttelefono-actualizarEmpresa');
    let correo = document.getElementById('txtcorreo-actualizarEmpresa');
    let categoria = document.getElementById('selectcategoria-actualizarEmpresa');
    let calificacion = document.getElementById('selectcalificacion-actualizarEmpresa');
    let imagen = document.getElementById('fileimagen-actualizarEmpresa-2');
    let banner = document.getElementById('filebanner-actualizarEmpresa-2');

    let filtro = empresas.filter(empresa => empresa._id == codigo.value)[0];

    nombre.value = filtro.nombre;
    descripcion.value = filtro.descripcion;
    direccion.value = filtro.direccion;
    telefono.value = filtro.telefono;
    correo.value = filtro.correo;
    categoria.value = filtro.codigoCategoria;
    calificacion.value = filtro.calificacion;
    imagen.src = filtro.logo;
    banner.src = filtro.banner;
}

function actualizarEmpresa() {
    let codigo = document.getElementById('selectcodigo-actualizarEmpresa');
    let nombre = document.getElementById('txtnombre-actualizarEmpresa');
    let descripcion = document.getElementById('txtdescripcion-actualizarEmpresa');
    let direccion = document.getElementById('txtdireccion-actualizarEmpresa');
    let telefono = document.getElementById('txttelefono-actualizarEmpresa');
    let correo = document.getElementById('txtcorreo-actualizarEmpresa');
    let categoria = document.getElementById('selectcategoria-actualizarEmpresa');
    let calificacion = document.getElementById('selectcalificacion-actualizarEmpresa');
    let imagen = document.getElementById('fileimagen-actualizarEmpresa');
    let banner = document.getElementById('filebanner-actualizarEmpresa');

    if (nombre.value == '' || descripcion.value == '' || direccion.value == '' || telefono.value == '' || correo.value == '' || categoria.value == '' || calificacion.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Hay campos vacíos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos de tipo texto.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expCorreo.test(correo.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Correo inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, ingresa un correo válido.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expTelefono.test(telefono.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Teléfono inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, ingresa un número válido.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('direccion', direccion.value);
        formData.append('telefono', telefono.value);
        formData.append('correo', correo.value);
        formData.append('codigoCategoria', categoria.value);
        formData.append('calificacion', calificacion.value);

        if (imagen.value != '') {
            formData.append('logo', imagen.files[0]);
        }

        if (banner.value != '') {
            formData.append('banner', banner.files[0]);
        }
        
        axios({
            method: 'PUT',
            url: `http://localhost:4200/empresas/${codigo.value}`,
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('borde-verde');
                modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                cargarValores();
            });
    }
}

function llenarTablaEmpresa() {
    let cuerpo = document.getElementById('cuerpo-tablaEmpresas');
    cuerpo.innerHTML = '';

    empresas.forEach(empresa => {
        cuerpo.innerHTML +=
            `<tr>
                <th scope="row">${empresa._id}</th>
                <td>${empresa.nombre}</td>
                <td>${empresa.descripcion}</td>
                <td>${empresa.direccion}</td>
                <td>${empresa.telefono}</td>
                <td>${empresa.correo}</td>
            </tr>`;
    });
}

function buscarEmpresa(elemento) {
    document.getElementById('selectcategoria-verEmpresa').value = 0;
    let cuerpo = document.getElementById('cuerpo-tablaEmpresas');
    cuerpo.innerHTML = '';

    filtro = empresas.filter(empresa => (empresa._id.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.nombre.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.descripcion.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.telefono.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.correo.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.direccion.toUpperCase().includes(elemento.value.toUpperCase())));

    if (filtro.length != 0) {
        filtro.forEach(empresa => {
            cuerpo.innerHTML +=
                `<tr>
                <th scope="row">${empresa._id}</th>
                <td>${empresa.nombre}</td>
                <td>${empresa.descripcion}</td>
                <td>${empresa.direccion}</td>
                <td>${empresa.telefono}</td>
                <td>${empresa.correo}</td>
            </tr>`;
        });
    }
}

function nombreEmpresa(elemento) {
    let filtro = empresas.filter(empresa => empresa._id == elemento.value)[0];
    document.getElementById('txtempresa-eliminarEmpresa').value = filtro.nombre;
}

function eliminarEmpresa() {
    let codigo = document.getElementById('selectcodigo-eliminarEmpresa');
    modalBodyAdministrador2.parentNode.classList.add('borde-amarillo');
    modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
    modalBodyAdministrador2.innerHTML =
        `<h5 class="titulo-modal my-4">¿Está seguro que desea eliminar la empresa?</h5>
        <div class="advertencia my-3">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h6 class="subtitulo-modal">Se eliminarán todos los productos asociados.</h6>
        <div class="botones-modal mt-4 mb-3">
            <button class="boton boton-blanco borde-rojo" onclick="cerrarModal2();">Cerrar</button>
            <button class="boton boton-blanco borde-verde" onclick="eliminarEmp('${codigo.value}');">Aceptar</button>
        </div>`;
    if (codigo.value != '') {
        abrirModal2(); 
    }
}

function eliminarEmp(codigo) {
    axios({
        method: 'DELETE',
        url: `http://localhost:4200/empresas/${codigo}`
    })
        .then(res => {
            modalBodyAdministrador2.parentNode.classList.add('borde-verde');
            modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
            modalBodyAdministrador2.parentNode.classList.remove('borde-amarillo');
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                <div class="check my-3">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
            cargarValores();
        });
}

//Productos
function agregarProducto() {
    let nombre = document.getElementById('txtnombre-agregarProducto');
    let descripcion = document.getElementById('txtdescripcion-agregarProducto');
    let cantidad = document.getElementById('txtcantidad-agregarProducto');
    let precio = document.getElementById('txtprecio-agregarProducto');
    let empresa = document.getElementById('selectempresa-agregarProducto');
    let imagen = document.getElementById('fileimagen-agregarProducto');

    let n = Number(cantidad.value)
    let m = Number(precio.value)

    if (nombre.value == '' || descripcion.value == '' || cantidad.value == '' || precio.value == '' || empresa.value == '' || imagen.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Hay campos vacíos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if ((n % 1 != 0) || n < 1) {
            modalBodyAdministrador2.parentNode.classList.add('borde-rojo');
            modalBodyAdministrador2.parentNode.classList.remove('borde-naranja');
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">¡Cantidad inválida!</h5>
                <div class="error my-3">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <h6 class="subtitulo-modal">Ingrese un entero mayor que 0.</h6>
                <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2();">Aceptar</button>`;
            abrirModal2();
    } else if (m <= 0) {
        modalBodyAdministrador2.parentNode.classList.add('borde-rojo');
        modalBodyAdministrador2.parentNode.classList.remove('borde-naranja');
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Precio inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingrese un número mayor que 0.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2();">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('cantidad', cantidad.value);
        formData.append('precio', precio.value);
        formData.append('imagen', imagen.files[0]);
        formData.append('codigoEmpresa', empresa.value);
        axios({
            method: 'POST',
            url: 'http://localhost:4200/productos',
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('borde-verde');
                modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                cargarValores();
            });
    }
}

function perfilProducto() {
    let codigo = document.getElementById('selectcodigo-actualizarProducto');
    let nombre = document.getElementById('txtnombre-actualizarProducto');
    let descripcion = document.getElementById('txtdescripcion-actualizarProducto');
    let cantidad = document.getElementById('txtcantidad-actualizarProducto');
    let precio = document.getElementById('txtprecio-actualizarProducto');
    let empresa = document.getElementById('selectempresa-actualizarProducto');
    let imagen = document.getElementById('fileimagen-actualizarProducto-2');

    let filtro = productos.filter(producto => producto._id == codigo.value)[0];

    nombre.value = filtro.nombre;
    descripcion.value = filtro.descripcion;
    cantidad.value = filtro.cantidad;
    precio.value = filtro.precio;
    empresa.value = filtro.codigoEmpresa;
    imagen.src = filtro.imagen
}

function actualizarProducto() {
    let codigo = document.getElementById('selectcodigo-actualizarProducto');
    let nombre = document.getElementById('txtnombre-actualizarProducto');
    let descripcion = document.getElementById('txtdescripcion-actualizarProducto');
    let cantidad = document.getElementById('txtcantidad-actualizarProducto');
    let precio = document.getElementById('txtprecio-actualizarProducto');
    let empresa = document.getElementById('selectempresa-actualizarProducto');
    let imagen = document.getElementById('fileimagen-actualizarProducto');

    let n = Number(cantidad.value)
    let m = Number(precio.value)

    if (nombre.value == '' || descripcion.value == '' || cantidad.value == '' || precio.value == '' || empresa.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Hay campos vacíos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos de tipo texto.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if ((n % 1 != 0) || n < 1) {
        modalBodyAdministrador2.parentNode.classList.add('borde-rojo');
        modalBodyAdministrador2.parentNode.classList.remove('borde-naranja');
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Cantidad inválida!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingrese un entero mayor que 0.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2();">Aceptar</button>`;
        abrirModal2();
    } else if (m <= 0) {
        modalBodyAdministrador2.parentNode.classList.add('borde-rojo');
        modalBodyAdministrador2.parentNode.classList.remove('borde-naranja');
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Precio inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingrese un número mayor que 0.</h6>
            <button class="boton boton-blanco borde-rojo my-4" onclick="cerrarModal2();">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('cantidad', cantidad.value);
        formData.append('precio', precio.value);
        formData.append('codigoEmpresa', empresa.value);

        if (imagen.value != '') {
            formData.append('imagen', imagen.files[0]);
        }

        axios({
            method: 'PUT',
            url: `http://localhost:4200/productos/${codigo.value}`,
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('borde-verde');
                modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                cargarValores();
            })
    }
}

function llenarTablaProductos() {
    let cuerpo = document.getElementById('cuerpo-tablaProductos');
    cuerpo.innerHTML = '';

    productos.forEach(producto => {
        cuerpo.innerHTML +=
            `<tr>
                <th scope="row">${producto._id}</th>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio} Lps.</td>
            </tr>`;
    });
}

function buscarProducto(elemento) {
    document.getElementById('selectempresa-verProducto').value = 0;
    let cuerpo = document.getElementById('cuerpo-tablaProductos');
    cuerpo.innerHTML = '';

    filtro = productos.filter(producto => (producto._id.toUpperCase().includes(elemento.value.toUpperCase()) || producto.nombre.toUpperCase().includes(elemento.value.toUpperCase()) || producto.descripcion.toUpperCase().includes(elemento.value.toUpperCase()) || producto.cantidad.toString().includes(elemento.value) || producto.precio.toString().includes(elemento.value)));

    if (filtro.length != 0) {
        filtro.forEach(producto => {
            cuerpo.innerHTML +=
                `<tr>
                <th scope="row">${producto._id}</th>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio} Lps.</td>
            </tr>`;
        });
    }
}

function nombreProducto(elemento) {
    let filtro = productos.filter(producto => producto._id == elemento.value)[0];
    document.getElementById('txtproducto-eliminarProducto').value = filtro.nombre;
}

function eliminarProducto() {
    let codigo = document.getElementById('selectcodigo-eliminarProducto');
    modalBodyAdministrador2.parentNode.classList.add('borde-amarillo');
    modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
    modalBodyAdministrador2.innerHTML =
        `<h5 class="titulo-modal my-4">¿Está seguro que desea eliminar el producto?</h5>
        <div class="advertencia my-3">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h6 class="subtitulo-modal">Esta acción no se puede revertir.</h6>
        <div class="botones-modal mt-4 mb-3">
            <button class="boton boton-blanco borde-rojo" onclick="cerrarModal2();">Cerrar</button>
            <button class="boton boton-blanco borde-verde" onclick="eliminarPro('${codigo.value}');">Aceptar</button>
        </div>`;
    if (codigo.value != '') {
        abrirModal2(); 
    }
}

function eliminarPro(codigo) {
    axios({
        method: 'DELETE',
        url: `http://localhost:4200/productos/${codigo}`
    })
        .then(res => {
            modalBodyAdministrador2.parentNode.classList.add('borde-verde');
            modalBodyAdministrador2.parentNode.classList.remove('borde-rojo');
            modalBodyAdministrador2.parentNode.classList.remove('borde-amarillo')
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                <div class="check my-3">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <button class="boton boton-blanco borde-verde my-4" onclick="cerrarModal2()">Aceptar</button>`;
            cargarValores();
        })
}

function generarOrdenes() {
    let contenidoOrdenes = document.getElementById('contenido-ordenes');
    contenidoOrdenes.classList.remove('borde-naranja');
    contenidoOrdenes.innerHTML = '';

    axios({
        method: 'GET',
        url: 'http://localhost:4200/ordenes/disponibles'
    })
        .then(res => {
            ordenes = res.data;
            ordenes.forEach(elem => {
                contenidoOrdenes.innerHTML +=
                    `<div class="col-12 py-1">
                    <div class="contenedorOrden row borde-azul p-1 radius">
                        <h4 class="col-12 col-sm-4 text-left pt-2">${elem.nombre}</h4>
                        <button class="boton boton-verde col-sm-4 col-12" onclick="abrirModal('${elem._id}');">Asignar</button>
                        <button class="boton boton-naranja col-sm-4 col-12" onclick="verOrden('${elem._id}'); cargarMapa(${elem.envio.coordenadas.longitud}, ${elem.envio.coordenadas.latitud});">Ver orden</button>
                    </div>
                </div>`;
            });
        });
}

function abrirModal(codigo) {
    let selectMotoristas = document.getElementById('selectmotorista');
    selectMotoristas.innerHTML = '';
    usuarios.forEach(usuario => {
        if (usuario.aprobado == true) {
            selectMotoristas.innerHTML +=
                `<option value="${usuario._id}">${usuario.nombre}</option>`;
        }
    });
    orden = ordenes.filter(elem => elem._id == codigo)[0];
    $('#modal').modal('show');
}

function abrirModal2() {
    $('#modal2').modal('show');
}

function cerrarModal() {
    $('#modal').modal('hide');
}

function cerrarModal2() {
    $('#modal2').modal('hide');
    modalBodyAdministrador2.parentNode.classList.remove('borde-verde');
    modalBodyAdministrador2.parentNode.classList.remove('borde-amarillo');
    modalBodyAdministrador2.parentNode.classList.add('borde-rojo');
}

function asignarMotorista() {
    let codigo = document.getElementById('selectmotorista');
    axios({
        method: 'PUT',
        url: `http://localhost:4200/ordenes/${orden._id}`,
        data: {_id: codigo.value}
    })
        .then(res => {
            generarOrdenes();
        });
    $('#modal').modal('hide');
}

function verOrden(codigo) {
    let contenidoOrdenes = document.getElementById('contenido-ordenes');
    orden = ordenes.filter(o => o._id == codigo)[0];
    let entrega = '';
    orden.envio.productos.forEach(producto => {
        entrega += producto.cantidad + ' ' + producto.nombre + '; ';
    });
    contenidoOrdenes.classList.add('borde-naranja');
    contenidoOrdenes.innerHTML =
        `<div class="titulo-detalleOrden borde-naranja radius px-1">
        Detalle de la orden: "${orden.nombre}"
    </div>
    <div class="informacion-cliente borde-naranja radius p-2">
        <div class="titulo-infoCliente borde-naranja radius px-1">
            Información del cliente
        </div>
        <div class="row mt-2">
            <div class="col-12 col-md-6">
                <h6>Nombre:</h6>
                <h6 class="gris pl-5 pb-2">${orden.cliente.nombre}</h6>
            </div>
            <div class="col-12 col-md-6">
                <h6>Correo:</h6>
                <h6 class="gris pl-5 pb-2">${orden.cliente.correo}</h5>
            </div>
            <div class="col-12">
                <h6>Celular:</h6>
                <h6 class="gris pl-5 pb-2">${orden.cliente.celular}</h6>
            </div>
        </div>
    </div>
    <div class="informacion-envio borde-naranja radius p-2">
        <div class="titulo-infoEnvio borde-naranja radius px-1">
            Información del envío
        </div>
        <div class="row mt-2">
            <div class="col-12 col-md-6 row">
                <div class="col-12">
                    <h6>Productos:</h6>
                    <h6 class="gris pl-5 pb-2">${entrega}</h6>
                </div>
                <div class="col-12">
                    <h6>Empresa:</h6>
                    <h6 class="gris pl-5 pb-2">${orden.envio.empresa}</h6>
                </div>
                <div class="col-12">
                    <h6>Total a pagar:</h6>
                    <h6 class="gris pl-5 pb-2">${orden.envio.total.toFixed(2)} Lps.</h6>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <h6>Dirección:</h6>
                <h6 class="gris pl-5 pb-2">${orden.envio.direccion}</h6>
                <div id="mapa" style="width: 100%; height: 200px;" class="borde-verde"></div>
            </div>
        </div>
    </div>
    <div class="p-2">
        <button class="boton boton-naranja float-left boton-asignar" onclick="generarOrdenes();">Atras</button>
        <button class="boton boton-verde float-right boton-asignar" onclick="abrirModal('${codigo}');">Asignar</button>
    </div>`;
}

function generarMotoristas() {
    let contenedorMotoristas = document.getElementById('contenedorMotoristas');
    contenedorMotoristas.innerHTML = '';
    usuarios.forEach(motorista => {
        if (motorista.aprobado == null) {
            contenedorMotoristas.innerHTML +=
                `<div class="col-12 py-1">
                <div class="row borde-azul p-1 radius">
                    <h4 class="col-lg-10 col-md-9 col-sm-8 col-xs-6 text-left pt-2">${motorista.nombre}</h4>
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 acomodar">
                        <div class="text-left mx-2">
                            <i class="fa-solid fa-circle-check check botonesMotorista" onclick="aprobarMotorista('${motorista._id}', true);"></i>
                        </div>
                        <div class="text-right mx-2">
                            <i class="fa-solid fa-circle-xmark error botonesMotorista" onclick="aprobarMotorista('${motorista._id}', false);"></i>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    });
}

function aprobarMotorista(codigo, val) {
    let dato = {aprobado: val};
    axios({
        method: 'PUT',
        url: `http://localhost:4200/usuarios/motoristas/${codigo}`,
        data: dato,
    })
        .then(res => {
            generarArregloUsuarios();
            cargarValores();
        });
}

function listarEmpresasCategoria(elemento) {
    let cuerpo = document.getElementById('cuerpo-tablaEmpresas');
    cuerpo.innerHTML = '';
    if (elemento.value == 0) {
        llenarTablaEmpresa();
    } else {
        filtro = empresas.filter(empresa => (empresa.codigoCategoria == elemento.value));

        if (filtro.length != 0) {
            

            filtro.forEach(empresa => {
                cuerpo.innerHTML +=
                    `<tr>
                    <th scope="row">${empresa._id}</th>
                    <td>${empresa.nombre}</td>
                    <td>${empresa.descripcion}</td>
                    <td>${empresa.direccion}</td>
                    <td>${empresa.telefono}</td>
                    <td>${empresa.correo}</td>
                </tr>`;
            });
        }
    }
}

function listarProductosEmpresa(elemento) {
    let cuerpo = document.getElementById('cuerpo-tablaProductos');
    cuerpo.innerHTML = '';
    if (elemento.value == 0) {
        llenarTablaProductos();
    } else {
        filtro = productos.filter(producto => (producto.codigoEmpresa == elemento.value));

        if (filtro.length != 0) {
            

            filtro.forEach(producto => {
                cuerpo.innerHTML +=
                    `<tr>
                    <th scope="row">${producto._id}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio} Lps.</td>
                </tr>`;
            });
        }
    }
}

function obtenerParametro(valor){
    valor = valor.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    let expresionRegular = "[\\?&]" + valor + "=([^&#]*)";
    let regex = new RegExp(expresionRegular);
    let r = regex.exec( window.location.href );
    if( r == null )
        return "";
    else
        return decodeURIComponent(r[1].replace(/\ + /g, " "));
}

function cerrarSesion() {
    axios({
        method: 'get',
        url: `http://localhost:4200/sesiones/cerrar/${idSession}`
    })
}

function renderImage(elemento) {
    let imagen = document.getElementById(`${elemento.id}-2`);
    imagen.setAttribute('src', URL.createObjectURL(elemento.files[0]));
}


//################################################################
var categorias = [];
var empresas = [];
var productos = [];
var ordenes = [];
var usuarios = [];

var nombreAdmin = obtenerParametro('nom');
var idSession = obtenerParametro('ses');

var orden;

var expCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
var expTelefono = /^\d{4}-\d{4}$/

var sections = document.getElementsByClassName('sections');
var sectionPrincipal = document.getElementById('section-principal');
var controles = document.getElementsByClassName('control');
var modalBodyAdministrador2 = document.getElementById('modal-body-administrador2');

if (idSession.length == 0) {
    idSession = '1';
}

verificarSesion();