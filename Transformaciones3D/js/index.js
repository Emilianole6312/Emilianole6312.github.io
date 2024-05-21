import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const axes = true;
const color = 0x0586F7;

$(document).ready(() =>{
    
    //Creacion del renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement );
    
    //Vuelve responsive el canvas
    window.addEventListener('resize',function(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProyectionMatrix;
    });
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update;
    
    camera.position.z = 5;

    //Funcion iterativa
    function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }

    //EJES
    if(axes){
        const axesHelper = new THREE.AxesHelper();
        axesHelper.scale.setLength(100);
        scene.add(axesHelper);
    }

    //Agregar un cubo 
    const pivot = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    pivot.add(cube)
    scene.add(pivot);

    //Agregar objetos
    $("#addObject").click(function () {

        //Creamos un modal para que el usuario seleccione que poliedro quiere agregar
        let divModal = $("<div>");
        divModal.attr("id", "divModal");

        let divBody = $("<div>");
        divBody.attr("id", "bodyModal");

        let titleDiv = $("<h1>");
        titleDiv.text("Agregar poliedro");

        let contentModal = $("<div>");
        contentModal.attr("id","contentModal");

        let pSelPol = $("<p>");
        pSelPol.text("Seleccione el poliedro que desea agregar.")

        let buttonCubo = $("<button>");
        buttonCubo.attr("id","buttonCubo");
        buttonCubo.attr("type","button");
        buttonCubo.addClass("button-select-poliedro")
        buttonCubo.text("Cubo");

        let buttonPrisma = $("<button>");
        buttonPrisma.attr("id","buttonPrisma");
        buttonPrisma.attr("type","button");
        buttonPrisma.addClass("button-select-poliedro")
        buttonPrisma.text("Prisma");
        
        let buttonPiramide = $("<button>");
        buttonPiramide.attr("id","buttonPiramide");
        buttonPiramide.attr("type","button");
        buttonPiramide.addClass("button-select-poliedro")
        buttonPiramide.text("Piramide");

        let buttonDodecaedro= $("<button>");
        buttonDodecaedro.attr("id","buttonDodecaedro");
        buttonDodecaedro.attr("type","button");
        buttonDodecaedro.addClass("button-select-poliedro")
        buttonDodecaedro.text("Dodecaedro")
        
        divBody.append(titleDiv);
        contentModal.append(pSelPol);
        contentModal.append(buttonCubo);
        contentModal.append(buttonPrisma);
        contentModal.append(buttonPiramide);
        contentModal.append(buttonDodecaedro);
        divBody.append(contentModal)
        divModal.append(divBody);
        $("body").append(divModal);

        //Vacia el contenido del modal
        $(".button-select-poliedro").click(function () {
            $("#contentModal").empty();
        });

        //Interfaz para agregar un cubo
        $("#buttonCubo").click(function(){
            //Inputs para los datos del cubo a agregar
            let pTamano = $("<p>");
            pTamano.text("Introduce el tamaño del cubo:")

            let inputTamano = $("<input>")
            inputTamano.attr("type", "number");
            inputTamano.attr("id", "inputTamano");
            inputTamano.val(3);

            let buttonAddCubo = $("<button>");
            buttonAddCubo.attr("type", "button");
            buttonAddCubo.attr("id","buttonAddCubo");
            buttonAddCubo.text("Agregar cubo");

            $("#contentModal").append(pTamano);
            $("#contentModal").append(inputTamano);
            $("#contentModal").append(buttonAddCubo);

            $("#buttonAddCubo").click(function(){
                //Obtiene el tamano del cubo del input
                let tamanoCubo = $("#inputTamano").val();

                //Elimina el modal
                $("#divModal").empty();
                $("#divModal").remove();


                //Agrega el cubo
                const geometry = new THREE.BoxGeometry(tamanoCubo, tamanoCubo, tamanoCubo);
                const material = new THREE.MeshNormalMaterial({ color: color });
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                //Agrega lineas a la forma
                const edges = new THREE.EdgesGeometry(geometry);
                const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
                // scene.add(lines);
            })
        });

        //Interfaz para agregar un poliedro
        $("#buttonPrisma").click(function(){
            let pNumCaras = $("<p>");
            pNumCaras.text("Introduzca el numero de caras que tendra su poliedro:");
            let inputNumCaras = $("<input>");
            inputNumCaras.attr("type","number");
            inputNumCaras.attr("id","inputNumCaras");
            inputNumCaras.val(3);
            // ---Min and max vals

            let pLargo = $("<p>");
            pLargo.text("Introduzca el radio del prisma");
            let inputLargo = $("<input>");
            inputLargo.attr("type","number");
            inputLargo.attr("id","inputLargo");
            inputLargo.val(2);

            let pAltura = $("<p>");
            pAltura.text("Introduzca la Altura");
            let inputAltura = $("<input>")
            inputAltura.attr("type","number");
            inputAltura.attr("id","inputAltura");
            inputAltura.val(3);

            let buttonAddPrisma = $("<button>");
            buttonAddPrisma.attr("type","button");
            buttonAddPrisma.attr("id","buttonAddPrisma");
            buttonAddPrisma.text("Añadir prisma");

            $("#contentModal").append(pNumCaras);
            $("#contentModal").append(inputNumCaras);
            $("#contentModal").append(pLargo);
            $("#contentModal").append(inputLargo);
            $("#contentModal").append(pAltura);
            $("#contentModal").append(inputAltura);
            $("#contentModal").append(buttonAddPrisma);

            $("#buttonAddPrisma").click(function(){
                //Obtiene los datos
                let lados = $("#inputNumCaras").val();
                let largo = $("#inputLargo").val();
                let altura = $("#inputAltura").val();

                //Elimina el modal
                $("#divModal").empty();
                $("#divModal").remove();

                //Agrega el prisma
                const geometry = new THREE.CylinderGeometry(largo, largo, altura, lados);
                const material = new THREE.MeshNormalMaterial({ color: 0xffff00 });
                const cylinder = new THREE.Mesh(geometry, material); 
                scene.add(cylinder);

                //Agrega lineas a la forma
                const edges = new THREE.EdgesGeometry(geometry);
                const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
                // scene.add(lines);
            })
        });

        //Interfaz para agregar un piramide
        $("#buttonPiramide").click(function () {
            let pNumCaras = $("<p>");
            pNumCaras.text("Introduzca el numero de caras que tendra la base de su piramide:");
            let inputNumCaras = $("<input>");
            inputNumCaras.attr("type", "number");
            inputNumCaras.attr("id", "inputNumCaras");
            inputNumCaras.attr("min", "3");
            inputNumCaras.val(3);

            let pLargo = $("<p>");
            pLargo.text("Introduzca el radio de la piramide");
            let inputLargo = $("<input>");
            inputLargo.attr("type", "number");
            inputLargo.attr("id", "inputLargo");
            inputLargo.val(2);

            let pAltura = $("<p>");
            pAltura.text("Introduzca la Altura de la piramide");
            let inputAltura = $("<input>")
            inputAltura.attr("type", "number");
            inputAltura.attr("id", "inputAltura");
            inputAltura.val(3);

            let buttonAddPiramid = $("<button>");
            buttonAddPiramid.attr("type", "button");
            buttonAddPiramid.attr("id", "buttonAddPiramide");
            buttonAddPiramid.text("Añadir prisma");

            $("#contentModal").append(pNumCaras);
            $("#contentModal").append(inputNumCaras);
            $("#contentModal").append(pLargo);
            $("#contentModal").append(inputLargo);
            $("#contentModal").append(pAltura);
            $("#contentModal").append(inputAltura);
            $("#contentModal").append(buttonAddPiramid);

            $("#buttonAddPiramide").click(function () {
                //Obtiene los datos
                let lados = $("#inputNumCaras").val();
                let largo = $("#inputLargo").val();
                let altura = $("#inputAltura").val();

                //Elimina el modal
                $("#divModal").empty();
                $("#divModal").remove();

                //Agrega la piramide
                const geometry = new THREE.CylinderGeometry(0, largo, altura, lados);
                const material = new THREE.MeshNormalMaterial({ color: 0xffff00 });
                const cylinder = new THREE.Mesh(geometry, material);
                scene.add(cylinder);

                //Agrega lineas a la forma
                const edges = new THREE.EdgesGeometry(geometry);
                const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
                // scene.add(lines);
            })
        });

        //Interfaz para agregar un dodecaedro
        $("#buttonDodecaedro").click(function () {
            // console.log("Agrega Dodecaedro");
            //Inputs para los datos del dodecaedro a agregar
            let pTamano = $("<p>");
            pTamano.text("Introduce el tamaño del dodecaedro:");

            let inputTamano = $("<input>");
            inputTamano.attr("type", "number");
            inputTamano.attr("id", "inputTamano");
            inputTamano.val(3);

            let buttonAddDodecaedro = $("<button>");
            buttonAddDodecaedro.attr("type", "button");
            buttonAddDodecaedro.attr("id", "buttonAddDodecaedro");
            buttonAddDodecaedro.text("Agregar Dodecaedro");

            $("#contentModal").append(pTamano);
            $("#contentModal").append(inputTamano);
            $("#contentModal").append(buttonAddDodecaedro);

            //Boton anadir Dodecaedro
            $("#buttonAddDodecaedro").click(function () {
                //Obtiene el tamano del Dodecaedro del input
                let tamanoDodecaedro = $("#inputTamano").val();
                // console.log(tamanoDodecaedro);

                //Elimina el modal
                $("#divModal").empty();
                $("#divModal").remove();


                //Agrega el Dodecaedro
                const geometry = new THREE.DodecahedronGeometry(tamanoDodecaedro);
                const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                //Agrega lineas a la forma
                const edges = new THREE.EdgesGeometry(geometry);
                const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
                // scene.add(lines);
            })
        });
    }); 

    //Transformar Objetos
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    $("canvas").click(function (event) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // console.log(pointer);

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        // console.log("unfor");
        intersects.some(function (element){
            // console.log(element);
            if (element.object.isMesh) {
                // console.log("a")
                //Modal Seleccionar transformacion
                let divModal = $("<div>");
                divModal.attr("id", "divModal");

                let divBody = $("<div>");
                divBody.attr("id", "bodyModal");

                let titleDiv = $("<h2>");
                titleDiv.text("TRANSFORMACION");

                let contentModal = $("<div>");
                contentModal.attr("id", "contentModal");

                let pSelPol = $("<p>");
                pSelPol.text("Seleccione la transformacion que quiere hacer .")

                let buttonRotacion = $("<button>");
                buttonRotacion.attr("id", "buttonRotacion");
                buttonRotacion.attr("type", "button");
                buttonRotacion.addClass("button-select-transformacion");
                buttonRotacion.text("Rotacion");

                let buttonTralacion = $("<button>");
                buttonTralacion.attr("id", "buttonTraslacion");
                buttonTralacion.attr("type", "button");
                buttonTralacion.addClass("button-select-transformacion");
                buttonTralacion.text("Traslacion");

                let buttonEscala = $("<button>");
                buttonEscala.attr("id", "buttonEscala");
                buttonEscala.attr("type", "button");
                buttonEscala.addClass("button-select-transformacion");
                buttonEscala.text("Escala");

                divBody.append(titleDiv);
                contentModal.append(pSelPol);
                contentModal.append(buttonRotacion);
                contentModal.append(buttonTralacion);
                contentModal.append(buttonEscala);
                divBody.append(contentModal);
                divModal.append(divBody);
                $("body").append(divModal);

                //Vacia el contenido del modal
                $(".button-select-transformacion").click(function () {
                    $("#contentModal").empty();
                });


                $("#buttonRotacion").click(function () {
                    
                    let pTamano = $("<h3>");
                    pTamano.text("Rotacion de poliedro");
                    $("#contentModal").append(pTamano);
                    
                    let pEje = $("<p>");
                    pEje.text("¿que eje  quieres rotar?");
                    $("#contentModal").append(pEje);
                    let inputEjeX = $("<input>")
                    inputEjeX.attr("type", "radio");
                    inputEjeX.attr("id", "inputEje");
                    inputEjeX.attr("name", "inputEje");
                    inputEjeX.attr("checked", "true");
                    inputEjeX.val("X");
                    $("#contentModal").append(inputEjeX);
                    $("#contentModal").append("X");
                    
                    let inputEjeY = $("<input>")
                    inputEjeY.attr("type", "radio");
                    inputEjeY.attr("id", "inputEje");
                    inputEjeY.attr("name", "inputEje");
                    inputEjeY.val("Y");
                    $("#contentModal").append(inputEjeY);
                    $("#contentModal").append("Y");
                    
                    let inputEjeZ = $("<input>")
                    inputEjeZ.attr("type", "radio");
                    inputEjeZ.attr("id", "inputEje");
                    inputEjeZ.attr("name", "inputEje");
                    inputEjeZ.val("Z");
                    $("#contentModal").append(inputEjeZ);
                    $("#contentModal").append("Z");
                    $("#contentModal").append("<br>");
                    
                    let pGrados = $("<p>");
                    pGrados.text("Introduzca los grados a rotar");
                    $("#contentModal").append(pGrados);
                    $("#contentModal").append(pGrados);
                    let inputGrados = $("<input>")
                    inputGrados.attr("type", "number");
                    inputGrados.attr("id", "inputGrados");
                    inputGrados.val(90);
                    $("#contentModal").append(inputGrados);
                    $("#contentModal").append("<br>");

                    let pPivote = $("<p>");
                    pPivote.text("Seleccione el punto pivote");
                    $("#contentModal").append(pPivote);
                    // console.log(element.object.geometry.vertices);
                    let indexV = 0;
                    element.object.geometry.vertices.forEach(vertice => {
                        console.log(vertice);
                        let opcionVertice = $("<input>");
                        opcionVertice.attr("type","radio");
                        opcionVertice.attr("name","verticePivote");
                        opcionVertice.val(indexV);
                        indexV++;
                        $("#contentModal").append(opcionVertice);
                        $("#contentModal").append(" X: " + vertice.x + " Y: " + vertice.y + " Z: " + vertice.z);
                        $("#contentModal").append("<br>");
                    });
                    
                    let buttonRotar = $("<button>");
                    buttonRotar.attr("type", "button");
                    buttonRotar.attr("id", "buttonRotate");
                    buttonRotar.text("Rotar");
                    $("#contentModal").append(buttonRotar);
                    

                    $("#buttonRotate").click(function () {
                        //Obtiene los datos de la rotacion
                        let degRotar = $("#inputGrados").val() * (Math.PI/180.0);
                        let eje = $("input[name='inputEje']:checked").val();
                        let rotX = 0;
                        let rotY = 0;
                        let rotZ = 0;
                        let pivote = element.object.geometry.vertices[parseInt($("input[name='verticePivote']:checked").val())];
                        console.log();

                        switch (eje) {
                            case "X":
                                rotX = degRotar;
                                break;
                            case "Y":
                                rotY = degRotar;
                                break;
                            case "Z":
                                rotZ = degRotar;
                                break;
                        }
                        
                        element.object.position.set(pivote.x, pivote.y, pivote.z);
                        element.object.parent.rotation.set(rotX,rotY,rotZ);
                        // element.object.position.set(0, 0, 0);

                        //Eliminar modal
                        $("#divModal").empty();
                        $("#divModal").remove();
                    });
                });

                $("#buttonTraslacion").click(function () {
                    let h3Traslacion = $("<h3>");
                    h3Traslacion.text("Traslacion");
                    $("#contentModal").append(h3Traslacion);

                    let pCoordenadas = $("<p>");
                    pCoordenadas.text("Introduzca el vector al que se trasladara");
                    $("#contentModal").append(pCoordenadas);

                    let inputCoordsX = $("<input>");
                    inputCoordsX.attr("id", "coordX");
                    inputCoordsX.attr("type", "number");
                    inputCoordsX.attr("placeholder", "X");
                    inputCoordsX.val(9);
                    $("#contentModal").append(inputCoordsX);

                    let inputCoordsY = $("<input>");
                    inputCoordsY.attr("id", "coordY");
                    inputCoordsY.attr("type", "number");
                    inputCoordsY.attr("placeholder", "Y");
                    inputCoordsY.val(9);
                    $("#contentModal").append(inputCoordsY);

                    let inputCoordsZ = $("<input>");
                    inputCoordsZ.attr("id", "coordZ");
                    inputCoordsZ.attr("type", "number");
                    inputCoordsZ.attr("placeholder", "Z");
                    inputCoordsZ.val(9);
                    $("#contentModal").append(inputCoordsZ);
                    $("#contentModal").append("<br>");

                    let buttonTrasladar = $("<button>");
                    buttonTrasladar.attr("id", "buttonTrasladar");
                    buttonTrasladar.attr("type", "button");
                    buttonTrasladar.text("Trasladar")
                    $("#contentModal").append(buttonTrasladar);
                    

                    $("#buttonTrasladar").click(function () {
                        // console.log(element.object.position.x);
                        let X = parseInt(element.object.position.x);
                        let Y = parseInt(element.object.position.y);
                        let Z = parseInt(element.object.position.z);
                        let mX = parseInt($("#coordX").val());
                        let mY = parseInt($("#coordY").val());
                        let mZ = parseInt($("#coordZ").val());
                        element.object.position.set(X + mX, Y + mY, Z + mY);

                        //Eliminar modal
                        $("#divModal").empty();
                        $("#divModal").remove();
                    });
                });

                $("#buttonEscala").click(function () {
                    // console.log("Agrega cubo");
                    //Inputs para los datos del cubo a agregar
                    let pEscala = $("<p>");
                    pEscala.text("Introduce la escala a la cual quiere modificar")

                    let inputEscala = $("<input>")
                    inputEscala.attr("type", "number");
                    inputEscala.attr("id", "inputEscala");
                    inputEscala.val(2);

                    let buttonAddEscala = $("<button>");
                    buttonAddEscala.attr("type", "button");
                    buttonAddEscala.attr("id", "buttonAddEscala");
                    buttonAddEscala.text("Escalar");

                    $("#contentModal").append(pEscala);
                    $("#contentModal").append(inputEscala);
                    $("#contentModal").append("<br>");
                    $("#contentModal").append(buttonAddEscala);

                    $("#buttonAddEscala").click(function () {
                        //Obtiene el tamano del cubo del input
                        let tamanoFigura = $("#inputEscala").val() * element.object.scale.x;
                        // console.log(element);

                        element.object.scale.set(tamanoFigura,tamanoFigura,tamanoFigura);
                        //Elimina el modal
                        $("#divModal").empty();
                        $("#divModal").remove();
                    });
                });
                return true;
            }
        })
        console.log(intersects);

    });

    animate();
})

//Lopez Esquivel Emiliano
//Vega Ramirez Alan Francisco 
//Escamilla Escobar Angel Jesus