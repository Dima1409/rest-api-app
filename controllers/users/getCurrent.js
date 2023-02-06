const getCurrent = async(req, res)=> {
    const { email, subscription} = req.user;
    res.status(200).json({
        status: "success",
        data: {
            user: {
              email,
              subscription,
            },
          },
    })
}

module.exports = getCurrent;