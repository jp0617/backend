import {Request,Response} from 'express';

class indexcontroller{
    public index(req:Request,res:Response){
        res.json({text: 'API is /api/...'})
    }
}

export const indexcontrolle = new indexcontroller();