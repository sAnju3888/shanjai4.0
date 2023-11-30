import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
  
const pool = mysql.createPool({
       host:process.env.MYSQL_HOST,
       user:process.env.MYSQL_USER,
       password:process.env.MYSQL_PASSWORD,
       database:process.env.MYSQL_DATABASE,
    }).promise()



    
// Fetching columns in a table
export async function getNotes() {
    const [rows] = await pool.query('SELECT * FROM my_posts');
    return rows;
}

export async function getId() {
    const [rows] = await pool.query('SELECT id FROM my_posts');
    return rows;
}

export async function getName() {
    const [rows] = await pool.query('SELECT topicName FROM my_posts');
    return rows;
}

export async function getHeading() {
    const [rows] = await pool.query('SELECT topicHeading FROM my_posts');
    return rows;
}

export async function getContent() {
    const [rows] = await pool.query('SELECT topicContent FROM my_posts');
    return rows;
}

// selecting based on a condition
export async function getNote(id){
    const [rows] = await pool.query('SELECT * FROM my_posts WHERE id=?',[id]);
    return rows[0];
}


// Inserting a new row into a table
export async function createPost(topicName, topicHeading, topicContent){
   const [result] =  await pool.query(`
    INSERT INTO my_posts(topicName, topicHeading, topicContent)
    VALUES(?,?,?)`,[topicName, topicHeading, topicContent]);
    
    const id = result.insertId
    return getNote(id);
}





