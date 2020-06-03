import {Request,Response, json} from 'express';
import {compile} from 'morgan';
import pool from '../database';

class appointments{

    public async list(req:Request,res:Response){
        await pool.query('select *  from tblappointment inner join tbluser on tbluser.strDNI=tblappointment.strDNI inner join tblstatus on tblstatus.intstatus=tblappointment.intstatus where tblappointment.intstatus=1',function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json(result);
            }
            
        })
    }

    public async getone(req:Request,res:Response){
        const {id}=req.params
        await pool.query('select * from tblappointment inner join tbluser on tbluser.strDNI=tblappointment.strDNI where intappointment=?',[id],function(err,result,field){
            if(err){

            }else{
                res.json(result[0])
            }
        })
    }
    
    public async create(req:Request,res:Response):Promise<void>{
        const {dtdate,strdescription,strDNI}=req.body;
        await pool.query('call sp_date(?,?,?)',[dtdate,strdescription,strDNI],function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json(result[0][0]);
            }
            
        })
    }

    public async update(req:Request,res:Response){
        const {intappointment,dtdate,strdescription,strDNI}=req.body;
        await pool.query('update tblappointment set dtdate=?,strdescription=?,strDNI=? where intappointment=?',[dtdate,strdescription,strDNI,intappointment],function(err,result,fields){
            if(err){
                throw err;
            }else{
                res.json("Se ha actualizado");
            }
            
        })
    }

    public async desactivate(req:Request,res:Response){
        const {intappointment}=req.body;
        await pool.query('update tblappointment set intstatus=0 where intappointment=?',[intappointment],function(err,result,fields){
            if(err){
                throw err;
            }else{
                console.log(result)
                res.json("Se ha desactivado");
            }
            
        })
    }
}

export const date= new appointments();