const id = document.getElementById('id');
const name = document.getElementById('name');
const registrarBut = document.getElementById('registrar');

const idVoto = document.getElementById('idVoto');
const votoBut = document.getElementById('voto');
const votaciones = document.getElementById('votaciones');

const candidatosBut = document.getElementById('candidatos');
const database = firebase.database();

registerCandidate = () => {

    let i = id.value;
    let n = name.value;
    let objectCandidate = {
        nombre: n,
        id: i,

    };
    if(i == ''|| n == ''){

        alert("Llene todos los campos");
    } else {
        console.log(objectCandidate);
        database.ref('candidatos').push().set(objectCandidate);
    }
   
}

candidatos = () =>{

    database.ref('candidatos').on('value', function (data) {
        let value;
        var arrayCandidatos = [];
        data.forEach(
            function(candidato){
                arrayCandidatos.push(candidato.val());
            }
        );
        let na = JSON.stringify(arrayCandidatos);
        alert(na+'\n');

    });


}

urna = () => {

    let voto = idVoto.value;

    if (voto == ''){

        alert("Campo vacio");

    } else {
    database.ref('candidatos').on('value', function (data) {

        var array = [];

        data.forEach(
            function (candidato) {
                array.push(candidato.val());
            }

        );

        var busqueda = array.find(candidato => candidato.id === voto);

        console.log(busqueda);

        if(busqueda !== undefined){

            let objectVotacion = {
                id: busqueda.id,
                name: busqueda.nombre,

            };

            database.ref('votaciones').push().set(objectVotacion);
        } else {
            alert("Candidato no registrado");
        }

    });
    }
}

porcentaje = ()=> {

}

registrarBut.addEventListener('click', registerCandidate);
votoBut.addEventListener('click', urna);
candidatosBut.addEventListener('click',candidatos);
votaciones.addEventListener('click',porcentaje);

