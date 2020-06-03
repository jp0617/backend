import {Router} from 'express';
import {register} from '../controllers/register.controller';

class RegisterRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        
        this.router.post('/',register.signup);
        
    }
}

const Register= new RegisterRoutes();
export default Register.router;