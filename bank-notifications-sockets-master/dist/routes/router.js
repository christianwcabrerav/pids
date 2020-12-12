"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");
exports.router = express_1.Router();
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: `Todo esta bien dddd`
    });
});
exports.router.post('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: `POST- listo dddd`
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo,
    };
    const server = server_1.default.instance;
    // Para mandar mensaje que se encuentre en una sala en particular
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
// Obtener usuarios y sus nombres
exports.router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: sockets_1.usuariosConectados.getLista()
    });
});
// Mandar notificacion al usuario
exports.router.post('/notificacion', (req, res) => {
    const tipoNotificacion = req.body.tipoNotificacion;
    const mensaje = req.body.mensaje;
    const username = req.body.username;
    const numeroNotificacion = req.body.numeroNotificacion;
    const payload = {
        username,
        mensaje,
        tipoNotificacion,
        numeroNotificacion: numeroNotificacion
    };
    const server = server_1.default.instance;
    // Buscando al usuario
    let usuario = sockets_1.usuariosConectados.getUsuarioPorUsername(username);
    if (usuario) {
        server.io.in(usuario.id).emit('mensaje-privado', payload);
    }
    res.json({
        ok: true,
        mensaje: mensaje,
        username: username,
        tipoNotificacion,
        numeroNotificacion
    });
});
exports.default = exports.router;
