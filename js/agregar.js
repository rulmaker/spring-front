const $formulario = document.getElementById('product-form');














$formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(
        new FormData(e.target)
    )

    console.log(datos);
    

    $formulario.reset();


    fetch('http://localhost:8080/api/cohorte', {
        //mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ciudad: datos.ciudad,
            numeroCohorte: datos.number,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});

