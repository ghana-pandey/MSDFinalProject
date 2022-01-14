const expressJwt=require('express-jwt')
const config=require('../config.json')
function authJwt(){
    const secret=config.secret
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked

    }).unless({
        path:[
            {url:'/product',methods:['GET','OPTIONS']},
            {url:'/category',methods:['GET','OPTIONS']},
            '/login',
            '/register'
        ]
    })
}
async function isRevoked(req,payoad,done){
    if(!payoad.isOwner){
        done(null,true)
    }
    done();
}
module.exports=authJwt;