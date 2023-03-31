 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

//import { HttpContext } from '@adonisjs/core/build/standalone'
import Enfrentamineto from 'App/Models/Enfrentamiento'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class EnfrentamientosController {
  public async crearPartida({ auth, request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true, escape: true }, [rules.required()]),
    })
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          'nombre.required': 'nombre',
        },
      })
      const { nombre } = data
      const enfrentamineto = new Enfrentamineto()
      const userId = auth.user!.id
      enfrentamineto.nombre = nombre
      enfrentamineto.id_usuario1 = userId
      enfrentamineto.status=1
      enfrentamineto.save()

      return response.status(201).json({
        message: 'Se a iniciado una partida',
        iduser:userId
      })
    } catch (error) {
      console.error(error)
      return response.status(400).json({
        message: 'no se a iniciado la partida',
        data: error,
      })
    }
  }
  public async partidaslibres({response }: HttpContextContract)
  {
    const jugadoresDisponibles = await Enfrentamineto.query().where('status', 1);
  
    return response.json({
      jugadoresDisponibles
    });
  }

  public async unirte({ response, params, auth }: HttpContextContract)
  {
    const partida = params.id;
   
    const enfrentamiento = await Enfrentamineto.query().where('id', partida).firstOrFail();
  
    const userId = auth.user!.id;
  if (userId!=enfrentamiento.id_usuario1)
  {
    enfrentamiento.id_usuario2 = userId;
    enfrentamiento.status = 0;
  
    await enfrentamiento.save();
  
    return response.json({
      message: "Te has unido a la partida correctamente"
    });
  }else{
    return response.json({
      message: "el suario esta dentro de la partida "
    }); 
  }
  }

  public async partidaenuso({ response, params }: HttpContextContract)
  {
    const partida = params.id;
   
    const enfrentamiento = await Enfrentamineto.query().where('id', partida).firstOrFail();
  
    
  
    enfrentamiento.status = 0;
  
    await enfrentamiento.save();
  
    return response.json({
      message: "la partida esta llena"
    });
  }
  
  
}

