
// Doing  CRUD  on the profile- we get the user form -> req.user because
// in the middleware we stored req.user = user we can get from there

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

  static async update() { }

  //delete

  static async destroy() { }
}

export default ProfileController;