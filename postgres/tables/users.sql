BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    age SMALLINT,
    pet VARCHAR(100),
    avatarUrl text DEFAULT 'http://tachyons.io/img/logo.jpg',
    joined TIMESTAMP NOT NULL
);

COMMIT;