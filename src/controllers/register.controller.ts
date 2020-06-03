import {Request,Response, json} from 'express';
import {compile} from 'morgan';
import pool from '../database';
import md5 from 'md5';

class RegisterController{
    
    public async signup(req:Request,res:Response):Promise<void>{
        const {strDNI,strName,strSurname,strPhone,strEmail,strPassword}=req.body;
        const passen=md5(md5(strPassword));
        
        await pool.query(`call sp_InsertUser (?,?,?,?,?,?)`,[strDNI,strName,strSurname,strPhone,strEmail,passen],function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json({message:"Se guardo correctamente"})
                
            }
        });
        
        
    }
}
export const register= new RegisterController();