CREATE TABLE applications (
    id serial NOT NULL PRIMARY KEY,
    companyname varchar(64) NOT NULL UNIQUE,
    address text NOT NULL,
    dateregistered timestamp DEFAULT CURRENT_TIMESTAMP,
    companynumber integer UNIQUE NOT NULL,
    sic text NOT NULL,
    status varchar(16) NOT NULL DEFAULT 'new',
    userid integer NOT NULL,
    FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE
);