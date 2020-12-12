import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Usuario} from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    // Lo ponemos aca porque el constructor solo se ejecuta una vez
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log(`Conectado al servidor`);
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log(`Desconectado del servidor`);
      this.socketStatus = false;
    });
  }

  // Dispara un evento al servidor
  emit(evento: string, payload?: any, callback?: Function) {
    // emit('Evento', payload, callback?)
    console.log(`Emitiendo`, evento);
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWs(nombre: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', {nombre}, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWs(this.usuario.nombre);
    }
  }

  getUsuario() {
    return this.usuario;
  }
}
