// lib/db.js から pool をインポート（DB接続済みのはず）
import { pool } from './lib/db.js';

// TODO: SQL: users テーブルから 5 件取得
// const sql = "SELECT * FROM users LIMIT 5;"
// const sql = "SELECT name, email FROM users LIMIT 5;"

// users テーブルのレコードの件数を取得
// const sql = "SELECT COUNT(id) AS user_count FROM users;"

// users テーブルから email が user1@test.com のユーザーを取得
// const sql = `SELECT name, email 
//                 FROM users 
//                 WHERE email = 'user1@test.com';`

// users テーブルから name に mr を含むユーザーを取得
// const sql = `SELECT name, email 
//                 FROM users 
//                 WHERE name LIKE '%mr%';`

// email が user1@test.com のユーザ id を取得
const userSql = `SELECT id FROM users WHERE email = 'user1@test.com';`
const [userRows] = await pool.query(userSql);
const userId = userRows[0].id;

// feeds に新しいレコードを追加
const sql = `INSERT INTO feeds (user_id, content) 
                VALUES ('${userId}', 'Hello');`

// TODO: SQLクエリー実行:非同期通信
const [rows] = await pool.query(sql)

// 表示
console.table(rows);

// DB切断
pool.end();