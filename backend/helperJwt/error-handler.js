function errorHandler(err, req, res, next) {
    if (err === 'UnauthorizedError') {
        return res.status(401).json({message: "the use is not authorized"});
    }

    
    if (err === 'ValidationError') {
        return res.status(401).json({message: err});
    }

    return res.status(500).send({message: err});
}

module.exports = errorHandler;
