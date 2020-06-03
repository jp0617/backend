import {Request,Response, json} from 'express';
import {compile} from 'morgan';
import pool from '../database';
import md5 from 'md5';

class AdminController{
    
    
    public async list(req:Request,res:Response):Promise<void>{
        await pool.query('select *  from tbluser inner join tblrol on tbluser.introl=tblrol.introl where intStatus=1',function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json(result);
            }
            
        })
        
    }
    public async getone(req:Request,res:Response):Promise<void>{
        const id=req.params.id;
        await pool.query('select *  from tbluser inner join tblrol on tbluser.introl=tblrol.introl where strDNI=?',[id],function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json(result[0]);
            }
            
        })
        
    }
    
    public async create(req:Request,res:Response):Promise<void>{
        const {strDNI,strName,strSurname,strPhone,strEmail,strPassword}=req.body;
        const passen=md5(strPassword);
        
        await pool.query(`insert into tbluser(strDNI, strName, strSurname, strPhone, strEmail, strPassword) values (?,?,?,?,?,?)`,[strDNI,strName,strSurname,strPhone,strEmail,passen],function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json({message:"Se guardo correctamente"})
                
            }
        });
        
        
    } 
    
    public async status(req:Request,res:Response):Promise<void>{
        const {strDNI}=req.body
        await pool.query('update tbluser set intstatus=0 where strDNI=?',[strDNI],function(err,result,fields){
            if(err){
                throw err;
            }else{
                console.log(result)
                res.json("Se desactivo correctamente")
            }
        })
    }
    
    public async updatePassword(req:Request,res:Response):Promise<void>{
        const {strDNI}=req.body;
        const passen=md5(md5(md5('12345678')));
        await pool.query('update tbluser set strpassword=? where strDNI=?',[passen,strDNI],function(err){
            if(err){
                throw err;
            }else{
                res.json("Contraseña reseteada")
            }
        })
    }
    
    
    
}

export const admincontroller = new AdminController();