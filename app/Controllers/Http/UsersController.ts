import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext,Request,Response } from "@adonisjs/core/build/standalone";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";
// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UsersController {

public async crearUsuarios ( { request, response }:HttpContext){
    const validationSchema = schema.create({
        nombre: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(255),
        ]),
      
        correo: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(255),
          rules.email(),
          rules.unique({ table: "users", column: "email" }),
        ]),
        contraseña: schema.string({}, [rules.required(), rules.minLength(8)]),
  
      });
      try {
        const data = await request.validate({
          schema: validationSchema,
          messages: {
       

            "nombre.required": "El nombre es requerido",
            "nombre.string": "El nombre debe ser un texto",
            "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
            "nombre.maxLength": "El nombre debe tener como máximo 50 caracteres",
            "correo.required": "El email es requerido",
            "correo.string": "El email debe ser un texto",
            "correo.email": "El email debe ser un email válido",
            "correo.unique": "El email ya está en uso",
  
            "contraseña.required": "La contraseña es requerida",
            "contraseña.string": "La contraseña debe ser un texto",
            "contraseña.minLength":
              "La contraseña debe tener al menos 8 caracteres",
            "contraseña.maxLength":
              "La contraseña debe tener como máximo 50 caracteres",
  
         
          },
        });
        const { nombre, correo, contraseña } = data;
        const user = new User();
        
        user.email=correo;
        user.nombres=nombre;
        
        
        user.password= await Hash.make(contraseña);
        
        await user.save();

        return response.status(201).json({
            message:"Usuario registrado",
            user: user.nombres,
            email: user.email
        });

    }catch(error){
        
        console.error(error);
        return response.status(400).json({
          message: "Error al registrar el usuario",
          data: error,
        });
    }
    


   

}






public async login({ auth, request, response }: HttpContextContract) {
  try {
    // Define el esquema de validación para los datos de entrada
    const validationSchema = schema.create({
      email: schema.string({}, [
        rules.required(),
        rules.email(),
      ]),
      password: schema.string({}, [
        rules.required(),
      ]),
    });

    const { email, password } = await request.validate({
      schema: validationSchema,
    });

    const user = await User.findByOrFail('email', email);

    if (!(await Hash.verify(user.password.toString(), password))) {
      return response.unauthorized('Invalid credentials');
    }

    // Generate token
    const token = await auth.use('api').generate(user);

    return response.ok({
      message: 'Login successful',
      
      token: token.token,
    });
  } catch (error) {
    return response.badRequest({
      message: 'Error during login',
      data: error.message,
    });
  }
}



////////////////////////////////////////////////////////////////////////////////////////
public async logout({ response, auth }: HttpContextContract) {
  try {
    await auth.use("api").revoke();
    return response.status(200).json({
      message: "Sesión cerrada correctamente",
      data: null,
      revoked: true,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      message: "Error al cerrar sesión",
      data: error.message,
    });
  }
}

    
}
