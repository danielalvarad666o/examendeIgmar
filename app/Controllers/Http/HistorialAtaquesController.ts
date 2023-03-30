import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import historialA from "App/Models/HistorialdeAtaque";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Event from '@ioc:Adonis/Core/Event';

export default class HistorialAtaquesController {
public async guardarAtaques({ request, response }:HttpContextContract){

  const validationSchema = schema.create({
    enfrentamiento_id: schema.string({ trim: true, escape: true }, [
              rules.required()
            ]),
          
            usuario_atacante_id: schema.string({ trim: true, escape: true }, [
              rules.required()
            ]),
            
            usuario_atacado_id: schema.string({ trim: true, escape: true }, [
                rules.required()
              ]),
              tipo_de_ataque: schema.string({ trim: true, escape: true }, [
                rules.required()
              ]),
              
            
      
          });
          try {
            const data = await request.validate({
                schema: validationSchema,
                messages: {
             
      
                  "enfrentamiento_id.required": "el enfrentamiento  es requerido",
                  "usuario_atacante_id.required": "el id del usuario atacante es requerido",
                  "usuario_atacado_id.required": "el enfrentamiento  es requerido",
                  "tipo_de_ataque.required": "el id del usuario atacante es requerido",
        
               
                },
              });  
              const {enfrentamiento_id,usuario_atacante_id,usuario_atacado_id,tipo_de_ataque}=data; 
              const historialAtaque = new historialA(); 
              historialAtaque.usuario_atacante_id=parseInt(usuario_atacante_id);
              historialAtaque.usuario_atacado_id=parseInt(usuario_atacado_id);
              historialAtaque.enfrentamiento_id=parseInt(enfrentamiento_id);
              historialAtaque.tipo_de_ataque=tipo_de_ataque;

              await historialAtaque.save();
              Event.emit('Ataques', historialAtaque);
              
        return response.status(201).json({
            message:"Se a iniciado una partida",
            
        });


          }
          catch(error){
        
            console.error(error);
            return response.status(400).json({
              message: "no se a iniciado la partida",
              data: error,
            });

    }

}

}
