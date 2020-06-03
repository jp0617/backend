import mysql from 'mysql';
import keys from './key';

const pool = mysql.createPool(keys.database);

pool.getConnection((err,connection)=>{
    if(err){
        throw err;
        
    }else{
        connection.release();
        console.log('Db is connected');
    }
})

export default pool;