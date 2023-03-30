// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from "@adonisjs/core/build/standalone";
import Enfrentamineto from "App/Models/Enfrentamiento";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class EnfrentamientosController {

    public async crearEnfrentemiento( { request, response }:HttpContext)

    {
        const validationSchema = schema.create({
            id_usuario1: schema.string({ trim: true, escape: true }, [
              rules.required()
            ]),
          
            id_usuario2: schema.string({ trim: true, escape: true }, [
              rules.required()
            ]),
            
      
          });
          try {
            const data = await request.validate({
              schema: validationSchema,
              messages: {
           
    
                "id_usuario1.required": "el jugador 1 es requerido",
                "id_usuario2.required": "el jugador 2 es requerido",
              
      
             
              },
            });
            const {  id_usuario1, id_usuario2 } = data;
            const enfrentamineto = new Enfrentamineto();
            if(id_usuario1!=id_usuario2)
            {
            enfrentamineto.id_usuario1=parseInt(id_usuario1);
            enfrentamineto.id_usuario2=parseInt(id_usuario2);
             
        await enfrentamineto.save();

        return response.status(201).json({
            message:"Se a iniciado una partida",
            
        });
      }else{
        
        return response.status(401).json({
          message:"no puedes jugar con el mismo usuario",
          
      });
      }
    }catch(error){
        
            console.error(error);
            return response.status(400).json({
              message: "no se a iniciado la partida",
              data: error,
            });

    }
}

}


