const $form = document.getElementById('formulario');
const cohorte = [];

//btener datos

fetch('http://localhost:8080/api/cohorte/all'/* , { mode: 'no-cors' } */)

.then(response => response.json())
.then(productos =>

    productos.forEach(el => {
        if (el === null) {
            el = ""
        } else {
            const productList = document.getElementById('tabla');
            const element = document.createElement('tr');
            element.innerHTML = `
            <tr>
            <td>${el.id}</td>
            <td>${el.ciudad}</td>
            <td>${el.numeroCohorte}</td>

            <td><button id="${el.id}" class="btn btn-danger"
            name="eliminar">Eliminar</button>
            </td>
            <td>
            <button id="${el.id}" type="button" class="btn btn-primary"
            data-toggle="modal" data-target="#exampleModalCenter" name="editar">Editar</button>
            </td>
            </tr>
          `;
            productList.appendChild(element);
        }
    })

   /*   */

);




document.getElementById('tabla').addEventListener('click', function (e) {
    borrar(e.target);
    mostrar(e.target); 
})


function borrar(elemento) {
    const fila = elemento.parentElement.parentElement;

    console.log(fila);

    if (elemento.name === 'eliminar') {

        document.getElementById("tabla").deleteRow(fila.rowIndex);
        fetch('http://localhost:8080/api/cohorte/delete/' + elemento.id, {
            method: 'DELETE'
        })
            .then(res => res)
            .then(res => console.log(res))
        console.log(elemento.id)
    }


}





function mostrar(elemento) {
    if (elemento.name === 'editar') {

        fetch('http://localhost:8080/api/cohorte/' + elemento.id /* , { mode: 'no-cors' } */)

            .then(response => response.json())
            .then(el => {

                const elemento = {
                    "id": el.id,
                    "ciudad": el.ciudad,
                    "numero": el.numeroCohorte,
                    
                };
                if (el === null) {
                    el = ""
                } else {
                    const productList = document.getElementById('tablaModal');
                    const element = document.createElement('tr');
                    element.innerHTML = `
                <tr>
                <td>${el.id}</td>
                <td>${el.ciudad}</td>
                <td>${el.numeroCohorte}</td>
               
               
                </tr>
              `;
                    productList.appendChild(element);
                    cohorte.push(elemento);
                }

                console.log(elemento);
            })

        

    }
}









function borrarFila() {
    document.getElementById('tablaModal').deleteRow(1);
    cohorte.length = 0;
}




//editar

$form.addEventListener('submit', e => {
    let ciudad = document.getElementById('ciudad').value;
    let numero = document.getElementById('numero').value;
    
    let ciudadP, numeroP;
    const elemento = cohorte;
    console.log(elemento)

    if (ciudad === "" && numero === "" ) return alert("Todos los espacios están vacíos");

    if (ciudad === "") {
        ciudadP = elemento[0].ciudad;
    } else {
        ciudadP = ciudad;
    }

    if (numero === "") {
        numeroP = elemento[0].numero;
    } else {
        numeroP = numero;
    }

    



    const data = {
        id: elemento[0].id,
        ciudad: ciudadP,
        numeroCohorte: numeroP,
       
    }
    console.log(data);
    e.preventDefault();

    fetch('http://localhost:8080/api/cohorte', {
        // mode: 'no-cors',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    $form.reset();
})

