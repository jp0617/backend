import {Router} from 'express';
import {date} from '../controllers/appointment.controller';

class appointmentroutes{
    public router:Router=Router();
    
    constructor(){
        this.config();
    }
    
    config():void{
        this.router.get('/',date.list);
        this.router.post('/',date.create);
        this.router.get('/:id',date.getone);
        this.router.put('/',date.update)
        this.router.put('/p',date.desactivate)
        
       
    }
}

const Date = new appointmentroutes();
export default Date.router;