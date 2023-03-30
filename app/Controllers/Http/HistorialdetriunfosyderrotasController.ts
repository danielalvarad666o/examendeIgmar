 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import ganadores from "App/Models/Historialdetriunfosyderrota";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Event from '@ioc:Adonis/Core/Event';

export default class HistorialdetriunfosyderrotasController {
    public async ganador({ request, response }:HttpContextContract){
        const validationSchema = schema.create({
            enfrentamiento_id: schema.string({ trim: true, escape: true }, [
                      rules.required()
                    ]),
                  
                    
                    usuario_ganador_id: schema.string({ trim: true, escape: true }, [
                        rules.required()
                      ]),
                      usuario_perdedor_id: schema.string({ trim: true, escape: true }, [
                        rules.required()
                      ]),
                      
                    
              
                  });
                  try {
                    const data = await request.validate({
                        schema: validationSchema,
                        messages: {
                     
              
                          "enfrentamiento_id.required": "el enfrentamiento  es requerido",
                          "usuario_ganador_id.required": "el id del usuario atacante es requerido",
                          "usuario_perdedor_id.required": "el enfrentamiento  es requerido",
                          

                        },
                      });  

                      const {enfrentamiento_id,usuario_ganador_id,usuario_perdedor_id}=data;
                      const ganador=new  ganadores();
                      ganador.enfrentamiento_id=parseInt(enfrentamiento_id);
                      ganador.usuario_ganador_id=parseInt(usuario_ganador_id);
                      ganador.usuario_perdedor_id=parseInt(usuario_perdedor_id);
                    await ganador.save();
                     
                    return response.status(201).json({
                        message:"Se guardo ganador"
                    });
                    }      
                    catch(error){
        
                        console.error(error);
                        return response.status(400).json({
                          message: "no se pudo guaradar el ganador",
                          data: error,
                        });               
                    }

                    }

                    }
