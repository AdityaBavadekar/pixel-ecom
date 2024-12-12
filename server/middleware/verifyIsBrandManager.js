function verifyIsBrandManager(req, res, next) {
    if (req.userType == 'BrandManager') next();
    else res.status(400).json({message:"Action not permitted"})
}

export { verifyIsBrandManager };