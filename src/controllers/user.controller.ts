import {Request,Response, json} from 'express';
import {compile} from 'morgan';
import pool from '../database';
import md5 from 'md5';

class Usercontroller{
    
    public async login(req:Request,res:Response):Promise<void>{
        const{stremail,strPassword} = req.body
        const passen=md5(strPassword);
        try{
            await pool.query('call sp_login(?,?)',[stremail,passen],function(err,result,fields){
                
                
                res.json(result[0][0]);
                
                
            })
        }catch(err){
            throw err;
        }
    }
    public async sign(req:Request,res:Response){
        const {strDNI,strName,strSurname,strPhone,strEmail,strPassword,intRol}=req.body;
        const passen=md5(strPassword);
        
        await pool.query(`call sp_RegisterA(?,?,?,?,?,?,?)`,[strDNI,strName,strSurname,strPhone,strEmail,passen,intRol],function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json(result[0][0])
                
            }
        });
    }
    public async signup(req:Request,res:Response):Promise<void>{
        const {strDNI,strName,strSurname,strPhone,strEmail,strPassword}=req.body;
        const passen=md5(strPassword);
        
        await pool.query(`call sp_Register(?,?,?,?,?,?)`,[strDNI,strName,strSurname,strPhone,strEmail,passen],function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json(result[0][0])
                
            }
        });
        
        
    }
    
    public async updateOne(req:Request,res:Response){
        const strDNI=req.params.id;
        const {strName,strSurname,strPhone,strEmail,strPassword,intRol}=req.body
        const passen=md5(md5(strPassword));
        await pool.query('update tbluser set strName=?,strSurname=?,strPhone=?,strEmail=?,strPassword=?,introl=? where strDNI=?',[strName,strSurname,strPhone,strEmail,passen,intRol,strDNI],function(err,result){
            if(err){
                throw err;
            }else{
                
                res.json("Se actualizo correctamente") 
            }
        })
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {stroldpassword,strNpassword,strPassword}=req.body;
        const oldpassen=md5(stroldpassword);
        const Npassen=md5(strNpassword);
        await pool.query('call sp_UpdateP(?,?,?)',[oldpassen,Npassen,strPassword],function(err,result){
            if(err){
                throw err;
            }else{
                res.json(result[0][0])
            }
        })
    }
}

export const usercontroller = new Usercontroller();