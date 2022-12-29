const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

router.put('/:id', async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await user.findByIdAndUpdate(req.params.id,{
                $set: req.body
            })
            res.status(200).json("Account has been updated successfully")
        }catch(err){
            return res.status(500).json(err)

        }
    }else{
        return res.status(400).json({
            message: 'User not found'
        })

    }
})


router.delete('/:id', async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await user.findByIdAndDelete( req.params.id)
            res.status(200).json("Account has been deleted successfully")
        }catch(err){
            return res.status(500).json(err)

        }
    }else{
        return res.status(400).json({
            message: 'User not found'
        })

    }
})

router.get("/:id",async (req,res)=>{
    try{
        const user = await user.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        return res.status(500).json(err)


    }
})

module.exports = router