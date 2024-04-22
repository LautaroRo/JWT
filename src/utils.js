import jwt from "jsonwebtoken"

const Private_key = "Ezio auditore"

export const generateToken = (user) => {

    const token = jwt.sign({user}, Private_key, {expiresIn:"1h"})


    return token
}

export const authToken = (req,res,next) => {

    const authHeader = req.headers.authorization;

    console.log(authHeader)
    if(!authHeader) return res.send({status: "Validacion negada"})

    console.log(authHeader)

    const token = authHeader.split(" ")[1]

    jwt.verify(token, Private_key, (error,credenciales) => {

        if(error) return res.send({status: "Validacion negada"})

        req.user = credenciales.user
        next()
    })
}