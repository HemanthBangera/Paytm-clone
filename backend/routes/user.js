const express = require('express')
const router = express.Router()
const zod = require("zod")
const {User} = require("../db")
const {JWT_SECRET} = require("../config")
const {authMiddleware} = require("../middlewares/middleware")
const jwt = require('jsonwebtoken')
const {Account} = require("../db")

const signupbody = zod.object({
    username : zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

router.post("/signup",async (req,res)=>{
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    
    const { success } = signupbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Invalid credentials."
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
          message: "Email already taken"  
        })
    }
    console.log(req.body.username)
    const user = await User.create({
        username,
        firstname,
        lastname,
        password
    })
    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)
    
    res.json({
        message: "User created successfully",
        token: token,
    })

})

const signinbody = zod.object({
    username : zod.string().email(),
    password: zod.string()
})

router.post("/signin",async (req,res)=>{
    const success = signinbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })

})


// other auth routes

const updateBody = zod.object({
	password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(
        { _id: req.userId },  // Correct: Filter by user ID
        { $set: req.body }    // Correct: Update with request body
    );
    

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk",async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstname:{
                "$regex": filter , "$options": "i"
            }
        },{
            lastname:{
                "$regex": filter , "$options": "i"
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })

})


module.exports = router;