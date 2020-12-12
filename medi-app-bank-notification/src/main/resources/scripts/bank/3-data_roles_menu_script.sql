-- Poner en nombre de usuario correos que existan para poder usar la funcionalidad de recuperar correo
INSERT INTO usuario(id_usuario, nombre, clave, estado)
values (1, 'admin@gmail.com', '123', '1');
INSERT INTO usuario(id_usuario, nombre, clave, estado)
values (2, 'pedro@gmail.com', '123', '1');
INSERT INTO usuario(id_usuario, nombre, clave, estado)
values (3, 'maria@gmail.com', '123', '1');
INSERT INTO usuario(id_usuario, nombre, clave, estado)
values (4, 'diana@gmail.com', '123', '1');

select *
from usuario;

INSERT INTO Rol (id_rol, nombre, descripcion)
VALUES (1, 'ADMIN', 'Administrador');
INSERT INTO Rol (id_rol, nombre, descripcion)
VALUES (2, 'USER', 'Usuario');
INSERT INTO Rol (id_rol, nombre, descripcion)
VALUES (3, 'DBA', 'Adminsitrador de base de datos');

select *
from rol;

INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 1);
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 3);
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (2, 2);
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (3, 2);
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (4, 2);

select *
from usuario_rol;

select *
from cuenta_bancaria;

INSERT INTO menu (id_menu, nombre, icono, url)
VALUES (1, 'Mis Cuentas', 'credit_card', '/cuenta');
INSERT INTO menu (id_menu, nombre, icono, url)
VALUES (2, 'Transferencia', 'send', '/transferencia');
INSERT INTO menu (id_menu, nombre, icono, url)
VALUES (3, 'Perfil', 'face', '/perfil');
INSERT INTO menu (id_menu, nombre, icono, url)
VALUES (4, 'Usuarios', 'supervisor_account', '/usuarios');
-- INSERT INTO menu (id_menu, nombre, icono, url) VALUES (3, 'Transferencia entre cuentas', 'send', '/transferencia/nuevo');
-- INSERT INTO menu (id_menu, nombre, icono, url) VALUES (4, 'Especialidades', 'star_rate', '/especialidad');
-- INSERT INTO menu (id_menu, nombre, icono, url) VALUES (5, 'Medicos', 'healing', '/medico');
-- INSERT INTO menu (id_menu, nombre, icono, url) VALUES (6, 'Examenes', 'assignment', '/examen');
-- INSERT INTO menu (id_menu, nombre, icono, url) VALUES (7, 'Pacientes', 'accessibility', '/paciente');
-- INSERT INTO menu (id_menu, nombre, icono, url) VALUES (8, 'Reportes', 'assessment', '/reporte');
--
-- select * from menu;
--
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (1, 1);

--Para el usuario administrador
INSERT INTO menu_rol (id_menu, id_rol)
VALUES (4, 1);

--Para los usuarios normales
INSERT INTO menu_rol (id_menu, id_rol)
VALUES (1, 2);
INSERT INTO menu_rol (id_menu, id_rol)
VALUES (2, 2);
INSERT INTO menu_rol (id_menu, id_rol)
VALUES (3, 2);

select *
from menu_rol;
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (5, 1);ve
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (6, 1);
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (7, 1);
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (8, 1);
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (4, 2);
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (5, 2);
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (6, 2);
-- INSERT INTO menu_rol (id_menu, id_rol) VALUES (7, 2);
--
-- select * from menu_rol;
--

-- Opcional
insert into notificacion (id_notificacion, descripcion, fecha_notificacion, id_tipo_notificacion, id_usuario, activo)
values (113, 'Ha ' || 'recibido una transferencia', '2020-11-09 08:55:13.003000', 1, 3, true);
insert into notificacion (id_notificacion, descripcion, fecha_notificacion, id_tipo_notificacion, id_usuario, activo)
values (114, 'Ha ' ||
             'recibido una transferencia', '2020-11-09 08:55:13.003000', 1, 3, true);
-- Necesario
INSERT INTO configuracion (id_configuracion, hacer_transferencias, notificaciones, recibir_transferencias, id_usuario)
values (1, true, true, true, 2);

INSERT INTO configuracion (id_configuracion, hacer_transferencias, notificaciones, recibir_transferencias, id_usuario)
values (2, true, true, true, 3);

INSERT INTO configuracion (id_configuracion, hacer_transferencias, notificaciones, recibir_transferencias, id_usuario)
values (3, true, true, true, 4);

select * from configuracion;

select m.*
from menu_rol mr
         inner join usuario_rol ur on ur.id_rol = mr.id_rol
         inner join menu m on m.id_menu = mr.id_menu
         inner join usuario u on u.id_usuario = ur.id_usuario
where u.nombre = 'juan.1996.jb65@gmail.com';

select cb.*
from cuenta_bancaria cb
         inner join usuario u on cb.id_usuario = u.id_usuario
where u.nombre = 'juan.1996.jb65@gmail.com';
