create table reviews(
	review_id int primary key,
	rating int,
	user_fk int references users(user_id),
	movie int references movies(movie_id)
);

create table users(
	user_id int primary key generated always as identity,
	first_name varchar(128),
	last_name varchar(128),
	username varchar(128) unique,
	password varchar(256),
	email varchar(128) unique		
);

create table movies(
	movie_id int primary key generated always as identity,
	title varchar(128),
	description varchar(256),
	genre int references genres(genre_id)
);

create table genres(
	genre_id int primary key,
	genre varchar(128)
);

-- SELECT
select * from reviews;
select * from users;
select * from movies;
select * from genres;

--DROP
drop table reviews;
drop table users;
drop table movies;
drop table genres;

-- TRUNCATE 
truncate reviews;
truncate users;
truncate movies;
truncate genres;