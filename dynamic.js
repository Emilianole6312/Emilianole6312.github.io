class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

$(document).ready(function () {


    $("#graficar").click(function () {
        //Obtenemos los valores de los puntos que seran los extremos de nuestra recta
        radio = parseInt($("#radio").val());
        
        
        circunferencia = [new Punto(1,radio)];
        p = [1 - radio];
        k = 0;

        while(circunferencia[k].x < circunferencia[k].y){

            newx = circunferencia[k].x + 1;
            newy = circunferencia[k].y;
            newp = p[k] + (2 * newx) + 1;

            if(p[k] >= 0){
                newy -= 1;
                newp -= (2 * newy);
            }

            circunferencia.push(new Punto(newx, newy));
            p.push(newp);
            k += 1;

        }
        
        //Crea la tabla, los encabezados de la columna y los inserta en la tabla
        tabla = $("<table>");
        thead = $("<thead>");
        tr = $("<tr>");
        tr.append($("<th>",{text : "k"}));
        tr.append($("<th>",{text : "Pk"}));
        tr.append($("<th>",{text : "x"}));
        tr.append($("<th>",{text : "y"}));
        tr.append($("<th>",{text : "2x"}));
        tr.append($("<th>",{text : "2y"}));
        thead.append(tr);
        tabla.append(thead);
        

        //Crea el cuerpo de la tabla y verifica si hay una existente
        $("table").remove();
        tbody = $("<tbody>");
        for (let i = 0; i <= k; i++) {
            //Crea e inserta las celdas de k
            tr = $("<tr>");
            tr.append($("<td>", {text : i}));
            
            //Crea e inserta las celdas de Pk
            tr.append($("<td>", {text : p[i]}));
            
            //Crea e inserta las celdas de x
            tr.append($("<td>", {text : circunferencia[i].x}));
            
            //Crea e inserta las celdas de y
            tr.append($("<td>", {text : circunferencia[i].y}));
            
            //Crea e inserta las celdas de 2x
            tr.append($("<td>", { text: (circunferencia[i].x * 2)}));
            
            //Crea e inserta las celdas de 2y
            tr.append($("<td>", { text: (circunferencia[i].y * 2)}));
            

            tbody.append(tr);
        }
        //Inserta el cuerpo de la tabla en la tabla
        tabla.append(tbody)

        //Insterta la tabla en el documento
        $("#divleft").append(tabla);

        $("#micanvas").remove();
        micanvas = $("<canvas>");
        micanvas.attr("id", "micanvas");
        micanvas.attr("width", "1000");
        micanvas.attr("height", "1000");
        $("#divcanvas").append(micanvas);

        micanvas = document.getElementById('micanvas');
        context = micanvas.getContext('2d');
        
        //Dibujamos la cuadricula
        context.beginPath();
        context.lineWidth = 0.1;
        
        for (let i = 0; i <= 100; i++) {
            context.moveTo(i*10, 0);
            context.lineTo(i*10, 1000);
            context.moveTo(0, i * 10);
            context.lineTo(1000, i * 10);
        }
        context.stroke();
        context.closePath();
        
        //Dibuja las guias
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(500, 0);
        context.lineTo(500, 1000);
        context.moveTo(0, 500);
        context.lineTo(1000, 500);
        context.stroke();
        context.closePath();

        circunferencia.forEach(punto => {
            context.fillRect(500 + ((punto.x - 1) * 10), 500 - (punto.y * 10), 10, 10);
            context.fillRect(500 + ((punto.y - 1) * 10), 500 - (punto.x * 10), 10, 10);
            
            context.fillRect(500 - ((punto.x ) * 10), 500 - (punto.y * 10), 10, 10);
            context.fillRect(500 - ((punto.y ) * 10), 500 - (punto.x * 10), 10, 10);
            
            context.fillRect(500 - ((punto.x ) * 10), 500 + ((punto.y - 1) * 10), 10, 10);
            context.fillRect(500 - ((punto.y ) * 10), 500 + ((punto.x - 1) * 10), 10, 10);

            context.fillRect(500 + ((punto.y - 1) * 10), 500 + ((punto.x - 1) * 10), 10, 10);
            context.fillRect(500 + ((punto.x - 1) * 10), 500 + ((punto.y - 1) * 10), 10, 10);

        });
        
    });
});