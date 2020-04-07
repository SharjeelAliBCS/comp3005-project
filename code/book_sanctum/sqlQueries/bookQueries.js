
const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "apqsznwhludbct",
  host: "ec2-35-172-85-250.compute-1.amazonaws.com",
  database: "d66prsg7g28r53",
  password: "161239fa8d874dbc62119103682c4b1e4bd64c313a1535ddcd98f406301a262f",
  port: "5432",
  ssl: true
});

function bookQueries(){

  this.getType = function (name, type){

    return new Promise (function(resolve, reject){
      pool.query(`select id from ${type} where name=$1`,
      [name],
        (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }


  this.addBook = function (row){

    return new Promise (function(resolve, reject){
      pool.query('insert into book values($1, $2, $3, $4, $5, $6, $7, $8, $9, default, false, round( ((random() * 30 + 5)/100)::numeric, 2));',
      [row.isbn13, row.title, row.description, row.author_id, row.genre_id, row.publisher_id, row.price, row.page_count,row.year],
        (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }

  this.addGenre = function (name, type){

    return new Promise (function(resolve, reject){
      pool.query('insert into genre values(default, $1, $2) returning id;',
      [name, type],
        (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }

  this.addAuthor = function (name){

    return new Promise (function(resolve, reject){
      pool.query('insert into author values(default, $1) returning id;',
      [name],
        (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }

  this.addPublisher = function (name, phone, email, id, rn, an, res){

    return new Promise (function(resolve, reject){
      pool.query('insert into publisher values(default, $1, $2, $3, $4, $5, $6);',
      [name, phone, email, id, rn, an],
        (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }
  this.addPubCity = function (code, city, res){

    return new Promise (function(resolve, reject){
      pool.query('insert into address_second values($1, $2);',
      [code, city],
        (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }

  this.addPubAddress = function (region, code, street, unit, res){

    return new Promise (function(resolve, reject){
      pool.query('insert into address_main values(default, $1, $2, $3, $4) returning id;',
      [region, code, street, unit],
        (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }

  this.searchBookByISBN = function (isbn, res){

    return new Promise (function(resolve, reject){
      pool.query("select book.isbn, book.title, book.description, book.price, book.page_count, "+
                 "book.published_year, book.add_date, "+
                 "author.name as author, genre.name as genre, publisher.name as publisher "+
                 "from book "+
                 "inner join author on book.author_id = author.id "+
                 "inner join genre on book.genre_id = genre.id "+
                 "inner join publisher on book.publisher_id = publisher.id "+
                 "where book.isbn = $1;",
                 [isbn], (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        resolve(result.rows);
      })
    });
  }

  this.addBookHistory = function (username, isbn, res){
    console.log("testing add book");
    return new Promise (function(resolve, reject){
      pool.query("insert into view_history values($1, $2, 0)",
                 [username, isbn], (err, result) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        console.log(result.rows) // brianc

        resolve(result.rows);
      })
    });
  }


}

module.exports = bookQueries;
