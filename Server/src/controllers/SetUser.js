const {Users} = require('../db')

exports.setUser = async (req,res)=>{
    const {id,Username,Email,Location} = req.body
    try {
        if(Username && Email && id){
            await Users.update({
                Username,
                Email,
                Location
            },
            {where:{
                id: id
            }})

            let user = await Users.findOne({where:{id:id}})

            if(user){
               return res.status(201).json({message: 'set user success', useredit:user})
            }else{
               return res.status(400).json({message: 'set user failure', created: false})
            }
        }else{
            return res.status(200).json({message: 'there are empty fields', created: false})
        }
    } catch (error) {
        if(Email && Username)
        return res.status(200).json({message: 'error', created: false})
    }
}