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

    if (i === '' || n === '') {

        alert("Llene todos los campos");

    } 
    let igual;
    let id2;
    database.ref('candidatos').on('value', function (data){

        data.forEach(function(comprobar){

            let valor = comprobar.val();
             id2 = valor.id;
        });

        
       
    });

    if(id2 === i){

        igual = true;

    } else {
        igual = false;
    }
        

    if(igual === false){
        database.ref('candidatos').push().set(objectCandidate);
    } if(igual === true){
        alert("ya existe un candidato con ese número")
    }


       
        
    

}

candidateView = () => {

    database.ref('candidatos').on('value', function (data) {

        var arrayCandidatos = [];

        data.forEach(function (candidato) {
                let value = candidato.val();
                arrayCandidatos.push(value.id + " " + value.nombre + " " + "\n");
            }
        );

        alert(arrayCandidatos);

    });


}

urn = () => {

    let voto = idVoto.value;

    if (voto == '') {

        alert("Campo vacio");

    } else {

        database.ref('candidatos').on('value',function (data) {

            var array = [];

            data.forEach(
                function (candidato) {
                    array.push(candidato.val());
                }

            );

            var busqueda = array.find(candidato => candidato.id === voto);

            console.log(busqueda);

            if (busqueda !== undefined) {


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

counting = () => {

    var conteo = [];
    var candidatos = []

    database.ref('candidatos').on('value', function (data3) {
        data3.forEach(
            function (buscar) {
                candidatos.push(buscar.val());
            }
        );

        database.ref('votaciones').on('value', function (data) {
            data.forEach(

                function (contar) {

                    conteo.push(contar.val());

                }
            );

            let lista = ' ';
            let total = conteo.length;

            candidatos.forEach(
                function (candidatosVotos) {
                    let votos = 0;

                    conteo.forEach(
                        function (voto) {
                            if (candidatosVotos.id === voto.id) {
                                votos++;
                            }
                        });

                    if (votos !== 0) {
                        let porcentaje = (votos / total) * 100;
                        let porcetajeEntero = Math.round(porcentaje);
                        lista += candidatosVotos.nombre + "  " + "votos: " + porcetajeEntero + "%" + "\n";
                    }
                });

            alert(lista);

        });

    });

}

registrarBut.addEventListener('click', registerCandidate);
votoBut.addEventListener('click', urn);
candidatosBut.addEventListener('click', candidateView);
votaciones.addEventListener('click', counting);

