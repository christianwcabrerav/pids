import {Component, OnInit} from '@angular/core';
import {ConsultaService} from '../../_service/consulta.service';
import {Chart} from 'chart.js';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  tipo: string;
  chart: any;
  pdfSrc = '';

  labelFile: string;
  selectedFiles: FileList; // Api de JS
  currentFileUpload: File; // Api de JS

  imagenData: any;
  imagenEstado = false;

  constructor(private consultaService: ConsultaService, private sanitization: DomSanitizer) {
  }

  ngOnInit() {
    this.tipo = 'line';
    this.dibujar();

    this.consultaService.leerArchivo().subscribe(data => {
      // this.imagenData = data;
      this.convertir(data);
    });
  }

  // Hacemos esta funcion porque no podemos pasarle a un 'href' una arreglo de bytes, tenemos que hacer
  // la respectiva conversion
  convertir(data: any) {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      const x = reader.result;
      this.setear(x);
    };
  }

  setear(x: any) {
    // console.log(x);
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(x);
  }

  cambiar(tipo: string) {

    // Para corregir el bug de la libreria
    if (this.chart) {
      this.chart.destroy();
    }

    this.tipo = tipo;
    this.dibujar();
  }

  private dibujar() {
    this.consultaService.listarResumen().subscribe(data => {
      // console.log(data);

      // La documentacion del plugin para graficos nos pide que tengamos listas independientes
      const arregloCantidad = data.map(resultado => resultado.cantidad);

      // Data en duro para ver otros escenarios con otros arreglos
      const cantidadN = data.map(res => res.cantidad + 1);
      const cantidadA = data.map(res => res.cantidad + 2);

      const arregloFechas = data.map(resultado => resultado.fecha);
      // console.log(arregloCantidad);
      // console.log(arregloFechas);

      // chartjs.org
      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: arregloFechas,
          datasets: [
            {
              label: 'Cantidad',
              data: arregloCantidad,
              borderColor: '#3cba9f',
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
            ,
            {
              label: 'CantidadN',
              data: cantidadN,
              borderColor: 'red',
              fill: false,
              backgroundColor: [
                'rgba(0, 99, 132, 0.2)',
                'rgba(54, 162, 0, 0.2)',
                'rgba(255, 0, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 0, 0, 0.2)',
                'rgba(255, 0, 64, 0.2)'
              ],
            },
            {
              label: 'CantidadA',
              data: cantidadA,
              borderColor: 'blue',
              fill: false,
              backgroundColor: [
                'rgba(0, 99, 132, 0.2)',
                'rgba(54, 162, 0, 0.2)',
                'rgba(255, 0, 0, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 0, 0, 0.2)',
                'rgba(255, 0, 64, 0.2)'
              ],
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
  }

  generarReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      // console.log(data);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.pdfSrc = e.target.result; // Lo cargamos con un ArrayBuffer
      };
      reader.readAsArrayBuffer(data);
    });
  }


  // Vamos a crear un 'href' fantasma y le vamos a pasar la data para que simule la descarga
  // Esto es nada mas que trucos javascript
  descargarReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
      return url;
    });
  }

  selectFile($event: any) {
    console.log($event.target.files);
    this.labelFile = $event.target.files[0].name;
    this.selectedFiles = $event.target.files; // Por el control de HTML5 se pueden subir varias imagenes al mismo tiempo
    // console.log(this.selectedFiles);
  }

  upload() {
    this.currentFileUpload = this.selectedFiles[0];
    console.log(this.currentFileUpload);
    this.consultaService.guardarArchivo(this.currentFileUpload).subscribe(data => {
      console.log(data);
      this.selectedFiles = undefined; // Limpiado la seleccion
    });
  }

  accionImagen(accion: string) {
    if (accion === 'M') {
      this.imagenEstado = true;
    } else {
      this.imagenEstado = false;
    }
  }
}
