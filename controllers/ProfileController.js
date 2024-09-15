
// Doing  CRUD  on the profile- we get the user form -> req.user because
// in the middleware we stored req.user = user we can get from there

import { errors } from "@vinejs/vine";
import { generateRandomNum, imageValidator } from "../utils/helper.js";
import prisma from "../DB/db.config.js";

class ProfileController {

  static async index(req, res) {

    try {
      const user = req.user;
      return res.json({ status: 200, user });

    } catch (error) {
      res.status(500).json({ message: "Somethig went wrong" });

    }

  };

  // create
  static async store() { }


  // read 
  static async show() { }

  // update

  static async update(req, res) {

    try {
      const { id } = req.params;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          status: 400,
          message: "Profile image required",

        })
      }

      const profile = req.files.profile;
      const message = imageValidator(profile?.size, profile?.mimetype);

      if (message !== null) {
        return res.status(400).json({
          errors: {
            profile: message,
          },
        });
      }

      // image uplad 
      const imgEXt = profile?.name.split(".");
      const imageName = generateRandomNum() + "." + imgEXt[1];
      const uploadPath = process.cwd() + "/public/images/" + imageName;

      profile.mv(uploadPath, (err) => {
        if (err) throw err;

      })

      await prisma.users.update({
        data: {
          profile: imageName,
        },

        where: {
          id: Number(id), // typecastin into string to num
        },
      });

      return res.json({
        status: 200,
        message: "Profile updated sucessfully"
      });

    } catch (error) {
      console.log("The error is ", error);
      return res.status(500).json({
        message: "something went wrong try again"

      })

    }

  };

  //delete

  static async destroy() { }
}

export default ProfileController;