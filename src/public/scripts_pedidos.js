const nueva_venta_btn = document.getElementById('nueva_venta_btn');
const nueva_pedido_btn = document.getElementById('nueva_pedido_btn');
const entregada_btn = document.querySelectorAll('.entregada_btn');
const editar_pedido_btn = document.querySelectorAll('.editar_pedido');
const inputs_nueva_venta = document.querySelectorAll('.input_nueva_venta');
const inputs_nueva_pedido = document.querySelectorAll('.input_nueva_pedido');
const input_tabla = document.querySelectorAll('.input_tabla');

//desabilita inputs
for (const i of inputs_nueva_venta) {
    i.value="";  
    i.disabled=true;  
    nueva_venta_btn.textContent="Nueva";
}
for (const j of input_tabla) {
    j.disabled=true;  
    j.textContent="Guardar";
}



// nueva pedido 
nueva_pedido_btn.addEventListener('click', (e)=>{
    if(nueva_pedido_btn.textContent=="Nueva"){
        e.preventDefault();
        for (const i of inputs_nueva_pedido) {
            i.removeAttribute('disabled');  
        }
        inputs_nueva_pedido[0].focus()
        nueva_pedido_btn.textContent="Guardar";
    }
});



// editar pedido
for (const i of editar_pedido_btn) {
    i.addEventListener("click", (e) => {
        if (i.textContent == "...") {
            e.preventDefault();
            for (const j of i.parentNode.parentNode.parentNode.children) {
                if (j.children[0] != undefined) {
                    j.children[0].removeAttribute("disabled");
                }
            }
            i.textContent = "Ok";
            //foco en el primer input de la linea
            i.parentNode.parentNode.parentNode.children[1].children[0].focus();
        } else {
            i.textContent = "...";
        }
    });
}


// entregada
// activar inputs para que envie los datos el form
for (const i of entregada_btn) {
    i.addEventListener("click", (e) => {
        for (const j of i.parentNode.parentNode.parentNode.children) {
            if (j.children[0] != undefined) {
                j.children[0].removeAttribute("disabled");
            }
        };
        i.parentNode.parentNode.parentNode.children[0].setAttribute('action', "/entregada"); //cambia atributo del formulario
    })
};
