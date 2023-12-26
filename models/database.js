const mysql = require('mysql2'); 


// const connection = mysql.createConnection({
//     host: '34.133.155.116',
//     user: 'root',
//     password: 'root',
//     database: 'blog',
// }).promise();

const connection = mysql.createPool({
    // host:process.env.MYSQL_HOST,
    // user:process.env.MYSQL_USER,
    // password:process.env.MYSQL_PASSWORD,
    // database:process.env.MYSQL_DATABASE,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
 }).promise()

const getNotes = async function getNotes() {
    try {
        const [rows] = await connection.query('SELECT * FROM my_posts');
        return rows;
    } catch (error) {
        console.error('Error executing getNotes query:', error);
        throw error;
    }
};

const createPost = async function createPost(topicName, topicHeading, topicContent) {
    try {
        const [result] = await connection.query(`
            INSERT INTO my_posts(topicName, topicHeading, topicContent)
            VALUES(?,?,?)`, [topicName, topicHeading, topicContent]);

        const id = result.insertId;
        return getNote(id);
    } catch (error) {
        console.error('Error executing createPost query:', error);
        throw error;
    }
};

const getNote = async function getNote(id) {
    try {
        const [rows] = await connection.query('SELECT * FROM my_posts WHERE id=?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error executing getNote query:', error);
        throw error;
    }
};

module.exports = {
    createPost,
    getNotes,
    getNote
};
