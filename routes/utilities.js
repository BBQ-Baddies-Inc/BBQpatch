const requireUser=(req, res, next)=>{
    if(!req.user){
        res.status(401)
        next({message: "You need to be logged in!"})
    }else{
        next();
    }
}

module.exports = requireUser