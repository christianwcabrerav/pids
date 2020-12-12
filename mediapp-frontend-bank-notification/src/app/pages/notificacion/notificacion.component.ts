import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificacionService} from "../../_service/notificacion.service";
import {NotificacionResponse} from "../../_model/notificacion-response";
import {ChatService} from "../../_service/chat.service";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  @ViewChild(MatMenuTrigger) triggerBtn: MatMenuTrigger;

  numeroNotificaciones: number;
  notificaciones: NotificacionResponse[];


  constructor(
    public chatService: ChatService,
    private notificacionService: NotificacionService
  ) {
  }

  ngOnInit() {

    // this.notificacionService.notificacionCambio.subscribe(data => {
    //   this.notificaciones = data;
    // });

    this.notificacionService.obtenerNumeroNotificaciones().subscribe(count => {
      this.numeroNotificaciones = count;
    });

    // this.notificacionService.listar().subscribe(data => {
    //   this.notificaciones = data;
    // });

    this.chatService.getMessagesPrivate().subscribe((msg: any) => {
      console.log(msg);
      this.numeroNotificaciones = msg.numeroNotificacion;

      // this.notificacionService.listar().subscribe(data => {
      //   console.log(data);
      //   this.notificaciones = data;
      // });

    });
  }

  openMatMenuProgrammatically() {
    this.triggerBtn.openMenu();
    this.notificacionService.listar().subscribe(data => {
      this.notificaciones = data;
    });
  }
}
