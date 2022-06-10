CREATE TABLE users (
    id serial NOT NULL PRIMARY KEY,
    role varchar(16) NOT NULL DEFAULT 'user',
    firstname varchar(32),
    lastname varchar(32),
    username varchar(32) UNIQUE NOT NULL,
    email varchar(64) UNIQUE NOT NULL,
    password varchar(256) NOT NULL,
    passwordsalt varchar(16),
    dateregistered timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role) REFERENCES roles (name)
);