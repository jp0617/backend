import {Router} from 'express';
import {admincontroller} from '../controllers/admin.controller';

class AdminRoutes{
    public router:Router=Router();
    
    constructor(){
        this.config();
    }
    
    config():void{
        this.router.get('/',admincontroller.list);
        this.router.post('/',admincontroller.create);
        this.router.put('/',admincontroller.status);
        this.router.get('/:id',admincontroller.getone);
        this.router.put('/p',admincontroller.updatePassword)
       
    }
}

const admin= new AdminRoutes();
export default admin.router;