create table author
	(id		        varchar(5), 
	 name		        varchar(50),
	 primary key (id)
	);
create table genre
	(id		        varchar(5), 
	 name		        varchar(50),
         type                   varchar(15),
	 primary key (id)
	);
create table publisher
	(id		        varchar(5), 
	 name		        varchar(200),
         address                varchar(15),
         phone                  varchar(10),
         email                  varchar(230),
         bank_id                varchar(5),
	 primary key (id)
	);

create table book
	(isbn			varchar(13), 
	 title			varchar(500),
         description            varchar(8000), 
	 author_id		varchar(5), 
	 genre_id               varchar(5),
         publisher_id           varchar(5),
         price                  numeric(5,2),
         page_count             numeric(4,0),
         stock                  numeric(4,0),
         rating                 numeric(2,1),
         rating_count           numeric(5,0),
         published_date         varchar(15),
         add_date               varchar(15),
	 primary key (isbn),
	 foreign key (author_id) references author(id),
	 foreign key (genre_id) references genre(id),
         foreign key (publisher_id) references publisher(id)
	);
create table client
	(username		varchar(20),
	email			varchar(40),
	first_name		varchar(10),
	last_name		varchar(10),
	password		varchar(15),
	primary key (username)
	);
create table cart(
	username		varchar(20),
	isbn			varchar(13),
	quantity		numeric(3,0),
	primary key (username, isbn),
	foreign key (username) references client,
	foreign key (isbn) references book
	);
create table status(
	status_id		varchar(5),
	name			varchar(30),
	description		varchar(500),
	primary key (status_id)
	);
create table orders(
	order_number	    	serial,	
	username	        varchar(20),
	order_date		varchar(20),
	primary key (order_number)
	);
create table order_book(
	isbn			varchar(13),
	order_number	    	serial,
	quantity		numeric(3,0),
	primary key (order_number,isbn),
	foreign key (order_number) references client,
	foreign key (isbn) references book
	);
create table recently_viewed(
	position	    	numeric(2),
	username	        varchar(20),
	isbn			varchar(13),
	primary key (username, isbn),
	foreign key (username) references client,
	foreign key (isbn) references book
	);

