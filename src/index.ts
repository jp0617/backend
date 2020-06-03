import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexroute from './routes/index.routes';
import admin from './routes/admin.routes';
import user from './routes/User.Routes';
import register  from './routes/register.routes';
import  Date  from './routes/appointment.routes';
import path from 'path';


class Server{
    public app:Application;
    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.port||3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    
    routes():void{
        this.app.use(indexroute);
        this.app.use('/api/admin',admin);
        this.app.use('/api/user',user);
        this.app.use('/api/dates',Date)
    }
    
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('server on port',this.app.get('port'));
        })
        this.app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, "../public/index.html")));
    }
}

const serve=new Server ();
serve.start();

