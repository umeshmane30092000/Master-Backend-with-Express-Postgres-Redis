import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine"
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthController {


  // register method
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      // password encryption
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      const findUser = await prisma.users.findUnique({
        where: {

          email: payload.email

        },
      })

      if (findUser) {

        return res.status(400).json({
          errors: {
            email: "Email is already taken try with another one"
          }
        })
      }

      const user = await prisma.users.create({
        data: payload
      })
      return res.json({ status: 200, message: "User crested suceesfully", user });

    } catch (error) {
      console.log("error is", error);

      if (error instanceof errors.E_VALIDATION_ERROR) {
        // console.log(error.messages)
        return res.status(401).json({ errors: error.messages });
      } else {
        return res.status(500).json({ status: 500, message: "somethings went wrong please try agaain" });// server error handling
      }

    }
  }

  // login method
  static async login(req, res) {

    try {
      const body = req.body;
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      // finding user with email while login 
      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email
        }
      })

      // if user exist to somethig
      if (findUser) {

        if (!bcrypt.compareSync(payload.password, findUser.password)) {
          return res.status(400).json({
            errors: {
              email: "Invalid credentilas"
            }
          });
        }

        // Issue token to user - jwt
        const payloadData = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          profile: findUser.profile,
        };

        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {

          expiresIn: "365d",

        });



        // we come here when email and password is correct
        res.status(200).json({ message: "Login in successfully", aceess_token: `Bearer  ${token}` });


      }

      return res.status(400).json({
        errors: {
          email: "No User is found with this email"
        }
      })

    } catch (error) {

      console.log("error is", error);

      if (error instanceof errors.E_VALIDATION_ERROR) {
        // console.log(error.messages)
        return res.status(401).json({ errors: error.messages });
      } else {
        return res.status(500).json({ status: 500, message: "somethings went wrong please try agaain" });// server error handling
      }

    }


  }



}

export default AuthController;