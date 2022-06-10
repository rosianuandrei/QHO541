CREATE TABLE images (
    imageurl text PRIMARY KEY NOT NULL,
    applicationid integer NOT NULL,
    FOREIGN KEY (applicationid) REFERENCES applications (id) ON DELETE CASCADE
);