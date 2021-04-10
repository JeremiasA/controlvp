const nueva_venta_btn = document.getElementById('nueva_venta_btn');
const borrar_venta_btn = document.getElementById('borrar_venta_btn');
const editar_venta_btn = document.querySelectorAll('.editar');
const inputs_nueva_venta = document.querySelectorAll('.input_nueva_venta');
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


// nueva venta 
nueva_venta_btn.addEventListener('click', (e)=>{
    if(nueva_venta_btn.textContent=="Nueva"){
        e.preventDefault();
        for (const i of inputs_nueva_venta) {
            i.removeAttribute('disabled');  
        }
        inputs_nueva_venta[0].focus()
        nueva_venta_btn.textContent="Guardar";
    }
});


// editar venta
for (const i of editar_venta_btn) {
    i.addEventListener("click", (e) => {
        if (i.textContent == "Editar") {
            e.preventDefault();
            for (const j of i.parentNode.parentNode.parentNode.children) {
                if (j.children[0] != undefined) {
                    j.children[0].removeAttribute("disabled");
                }
            }
            i.textContent = "Guardar";
            //foco en el primer input de la linea
            i.parentNode.parentNode.parentNode.children[1].children[0].focus();
        } else {
            i.textContent = "Editar";
        }
    });
}

