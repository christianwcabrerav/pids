INSERT INTO tipo_transaccion(descripcion) values ('Transferencias');
INSERT INTO tipo_transaccion(descripcion) values ('Pago de Servicios');

-- Insertamos la data para el tipo de notificaciones, solo tenemos una que son transferencias
INSERT INTO tipo_notificacion (id_tipo_notificacion, descripcion)
VALUES (1, 'Transferencia Realizada');

INSERT INTO tipo_notificacion (id_tipo_notificacion, descripcion)
VALUES (2, 'Transferencia Recibida');

INSERT INTO tipo_notificacion (id_tipo_notificacion, descripcion)
VALUES (3, 'Oferta tarjeta Recibida');

-- Insertamos la data para el tipo de ofertas
INSERT INTO tipo_oferta(id_tipo_oferta, descripcion)
VALUES (1, 'Tarjeta de Credito');

--Insertamos data a la cuenta bancaria segun los usuarios que tenemos
INSERT INTO cuenta_bancaria(id_cuenta,moneda , neutro, numero_cuenta, saldo, id_usuario)
VALUES (1, 'DOLARES', false, '123456789', 20000, 2);
INSERT INTO cuenta_bancaria(id_cuenta, moneda, neutro, saldo, id_usuario, numero_cuenta)
VALUES (2, 'DOLARES', false, 20000, 3, '123456777');
INSERT INTO cuenta_bancaria(id_cuenta, moneda, neutro, saldo, id_usuario, numero_cuenta)
VALUES (3, 'DOLARES', false, 20000, 4, '123456888');
INSERT INTO cuenta_bancaria(id_cuenta, moneda, neutro, saldo, id_usuario, numero_cuenta)
VALUES (4, 'DOLARES', false, 50000, 2, '123456999');


