BEGIN TRANSACTION;

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL,
    age SMALLINT,
    pet VARCHAR(100)
);

COMMIT;