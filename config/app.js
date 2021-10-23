module.exports = {
    jwt:{
        tokens:{
            access:{
                type:'access',
                expiresIn: '4h' // access token works 100 minuts
            },
            refresh:{
                type:'refresh',
                expiresIn:'30d' // refresh token works 30 days
            }
        }
    }
}