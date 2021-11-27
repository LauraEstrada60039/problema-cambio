let cantidades = [];
let max = 1000;
let min = 1;
let totalAPagar = Math.round(Math.random() * (max - min) + min);

function muestra_oculta(id_dos){
    document.getElementById('deuda').innerHTML=totalAPagar;
    let div_dos = document.getElementById(id_dos);
    div_dos.style.display = (div_dos.style.display == 'none') ? 'block' : 'none';
}

if (cantidades.length === 0 ) {
    document.getElementById('MensajeCajaVacia').innerHTML='Caja Vacía';
    muestra_oculta('interactuar');
}else {
    document.getElementById('MensajeCajaVacia').innerHTML='';
}

function obtenerValores() {
    //vamos a quitar el footer
    let footer = document.getElementById('footer_id');
    footer.style.display = (footer.style.display == 'block') && 'none';
    //fin de ocultarlo
    var arrayInputs = document.getElementById('denominaciones-cantidad').value;
    if ( arrayInputs === "" || arrayInputs === " " ) {
        alert("No ingresó  la información");
    }else{
        muestra_oculta('interactuar');
        if (arrayInputs[arrayInputs.length-1] === ';' || arrayInputs[arrayInputs.length-1] === ' ') {
            arrayInputs = arrayInputs.split(';'); 
            arrayInputs.splice(arrayInputs.length,1);
        }else {
            arrayInputs = arrayInputs.split(';'); 
        }       
        for (let i = 0; i < arrayInputs.length; i++) {
            const temporal = arrayInputs[i].split(',');
            const arreglo_objeto = new Map ([['denominacion', parseInt(temporal[0])], ['cantidad', parseInt(temporal[1])], ['url', temporal[2]]]);
            const obj = Object.fromEntries(arreglo_objeto);
            cantidades.push(obj);
        }
    }
    if (cantidades.length === 0 ) {
        document.getElementById('MensajeCajaVacia').innerHTML='Caja Vacía';
        muestra_oculta('interactuar');
    }else {
        document.getElementById('MensajeCajaVacia').innerHTML='';
    }
}

function pagarDeuda(){
    let div;
    if (document.getElementById('pagoUsuario').value < totalAPagar ) {
        alert("La cantidad que ingresaste no cubre tú deuda");
    }else {
        let denominacionPago = document.getElementById('pagoUsuario').value;
        let cambio = denominacionPago - totalAPagar;
        document.getElementById('vuelto').innerHTML=cambio;
        for (let i = 0; i < cantidades.length; i++) {
            do {
                if(cantidades[i].denominacion<=cambio){
                    div = document.getElementById("vueltoFor");
                    div.innerHTML += `<div><span>${cantidades[i].denominacion}</span><div><img src="${cantidades[i].url}"/></div></div><br>`;
                    cambio = cambio - cantidades[i].denominacion;
                    cantidades[i].cantidad = cantidades[i].cantidad - 1;
                }
            } while (cantidades[i].denominacion<=cambio);
        }
        if (cambio != 0) {
            div.innerHTML += `<span>Sin cambio, consulte al dueño</span><br>`;
        }
    }
    setTimeout(function(){
        totalAPagar = Math.round(Math.random() * (max - min) + min);
        document.getElementById('deuda').innerHTML=totalAPagar;
        document.getElementById('vuelto').innerHTML="";
        document.getElementById('formulario_dos').reset();
        document.getElementById('vueltoFor').innerHTML = "";
        if (cantidades.length === 0 ) {
            document.getElementById('MensajeCajaVacia').innerHTML='Caja Vacía';
            muestra_oculta('interactuar');
        }else {
            document.getElementById('MensajeInicio').innerHTML='';
        }
    }, 15000);
}
