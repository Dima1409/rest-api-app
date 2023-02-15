const { Unauthorized } = require("http-errors");
const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;

  const { _id } = req.user;
  const uniqueName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, uniqueName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join( "avatars", uniqueName);
    resizeAvatar(resultUpload);
    
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw new Unauthorized(`Not authorized`);
  }
};

const resizeAvatar = async dir => {
  await Jimp.read(dir, (err, res)=>{
    if(err) throw err;
    res.resize(250, 250, Jimp.RESIZE_BEZIER).writeAsync(dir);
  })
}

module.exports = updateAvatar;
