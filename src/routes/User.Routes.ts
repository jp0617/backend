import {Router} from 'express';
import {usercontroller} from '../controllers/user.controller';

class UserRoutes{
    public router:Router=Router();
    
    constructor(){
        this.config();
    }
    
    config():void{
        this.router.post('/login',usercontroller.login);
        this.router.post('/register',usercontroller.signup);
        this.router.put('/update',usercontroller.update);
        this.router.put('/updateA/:id',usercontroller.updateOne)
        this.router.post('/registerA',usercontroller.sign)
    }
}
    
const user= new UserRoutes();
export default user.router;