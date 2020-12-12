import {Usuario} from "./Usuario";

export class UsuarioLista {
    private lista: Usuario[] = [];

    constructor() {
    }

    // Agregar un usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id: string, nombre: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log(` ==== Actualizando usuario ===`);
        console.log(this.lista);
    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }

    // Por regla de negocio solo puede haber un correo por cuenta
    public getUsuarioPorUsername(username: string) {
        return this.lista.find(usuario => {
            return usuario.nombre === username;
        });
    }

    // Obtener usuarios en una sala en particular
    public getUsuarioEnSala(sala: string) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }

    // Borrar usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter( usuario => {
            return usuario.id != id;
        })
        console.log(this.lista);
        return tempUsuario;
    }
}
