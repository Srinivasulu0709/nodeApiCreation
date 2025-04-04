const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeature');



exports.getAllUsers = async (req,res) => {
    try {
        // EXECUTE QUERY
        const features = new APIFeatures(User.find(), req.query)
          .filter()
          .sort()
          .limitFields()
          .paginate();
        const users = await features.query;
    
        // SEND RESPONSE
        res.status(200).json({
          status: 'success',
          results: users.length,
          data: {
            users
          }
        });
      } catch (err) {
        res.status(404).json({
          status: 'fail',
          message: err
        });
      }
}