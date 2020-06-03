import {Router} from 'express';
import {indexcontrolle} from '../controllers/index.controller';

class indexroutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',indexcontrolle.index);
    }
}

const indexroute = new indexroutes();
export default indexroute.router;