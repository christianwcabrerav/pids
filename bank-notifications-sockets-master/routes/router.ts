import {Request, Response, Router} from 'express';
import Server from "../classes/server";
import {usuariosConectados} from "../sockets/sockets";

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: `Todo esta bien dddd`
    })
})

router.post('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: `POST- listo dddd`
    })
})

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo,
    }

    const server = Server.instance;
    // Para mandar mensaje que se encuentre en una sala en particular
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })
})

// Mandar notificacion al usuario
router.post('/notificacion', (req: Request, res: Response) => {

    const tipoNotificacion = req.body.tipoNotificacion;
    const mensaje = req.body.mensaje;
    const username = req.body.username;
    const numeroNotificacion = req.body.numeroNotificacion;

    const payload = {
        username,
        mensaje,
        tipoNotificacion,
        numeroNotificacion: numeroNotificacion
    }

    const server = Server.instance;

    // Buscando al usuario
    let usuario = usuariosConectados.getUsuarioPorUsername(username);

    if (usuario) {
        server.io.in(usuario.id).emit('mensaje-privado', payload);
    }

    res.json({
        ok: true,
        mensaje: mensaje,
        username: username,
        tipoNotificacion,
        numeroNotificacion
    })
})

export default router;
