BEGIN TRANSACTION;
INSERT into users (name, email, entries, age, pet, avatarUrl, joined) values ('dude', 'johnny@gmail.com', '45', '26', 'shiba inu', 'http://tachyons.io/img/logo.jpg', '2017-01-02');
INSERT into login (email, hash) values ('johnny@gmail.com', '$2a$10$/aT1ySO6Ajtapzg7KsgqkuvCXi3zUDAJKL3hTYJoVQYW9/6j7Tz8e');
COMMIT;