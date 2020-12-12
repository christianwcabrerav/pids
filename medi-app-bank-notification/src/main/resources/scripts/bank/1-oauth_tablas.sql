create table oauth_access_token
(
  token_id          varchar(256),
  token             bytea,
  authentication_id varchar(256),
  user_name         varchar(256),
  client_id         varchar(256),
  authentication    bytea,
  refresh_token     varchar(256)
);

alter table oauth_access_token
  owner to postgres;

-- Cuando he ejecutado sale error que la tabla ya existe, y en los modelos si se ve que existe.
-- create table reset_token
-- (
--   id         bigserial    not null
--     constraint reset_token_pkey
--       primary key,
--   expiracion timestamp    not null,
--   token      varchar(255) not null
--     constraint uk_shiutqgqq3m7hdrlmckbk4am6
--       unique,
--   id_usuario integer      not null
--     constraint fkoc8cqwnb1m8ijoboimhcybrl4
--       references usuario
-- );