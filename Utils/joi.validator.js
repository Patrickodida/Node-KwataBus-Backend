const validateRequest = (schema) => {
    return function(req, res, next){
        const { error, value } = schema.validate(req.body);
        console.log(error, value);
        if(error){
            res.json(error.details[0].message);
        } else{
            next();
        }
    }
};

module.exports = validateRequest;