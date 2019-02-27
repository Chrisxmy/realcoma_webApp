const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require("crypto");
const bluebird = require("bluebird");
const pbkdf2Async = bluebird.promisify(crypto.pbkdf2);
const SALT = 'salt for one punch, which is salty'

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index:true},
    password: { type: String, required: true },
    type: { type: String, required: true ,index:true},
    avatar:{ type: String},
    desc:{ type: String},
    title:{ type: String},
    company: { type: String},
    salary: { type: String}
})

UserSchema.index({ username: 1 ,type:1})

UserSchema.pre('save', function (next) {
    next()
})

const DEFAULT_PROJECTION = { password: 0,__v:0};

const UserModel = mongoose.model('User', UserSchema)


async function createUser({username,password,type},ctx) {
    const user = new UserModel({
        username: username,
        password: password,
        type:type
    })

    user.password = await pbkdf2Async(user.password, SALT, 512, 128, "sha1")
        .then()
        .catch(e => {
            throw new Error("something goes wrong");
        });
    try {
        await user.save()
    } catch(e) {
        ctx.throw(500,'用户名重复',{code:1})
    }

    return user
}

async function findUserById(id) {
    let flow = UserModel.find({_id: id});
    flow.select(DEFAULT_PROJECTION);
    return await flow.catch(e => {
        throw new Error(e);
    });
}

async function updateUserById(userId, update) {
    return await UserModel.findOneAndUpdate({ _id: userId }, update, {
        new: true
    })
        .select(DEFAULT_PROJECTION)
        .catch(e => {
            console.log(e);
            throw new Error(`error updating user by id: ${userId}`);
        });
}

async function findAllUsers() {
    let flow = UserModel.find({});
    flow.select(DEFAULT_PROJECTION);
    return await flow.catch(e => {
        throw new Error(e);
    });
}

async function login({username, password}) {
    password = await pbkdf2Async(password, SALT, 512, 128, "sha1")
        .catch(e => {
            console.log(e);
        });
    const user =  await UserModel.findOne({ username:username, password:password})
        .select(DEFAULT_PROJECTION)
        .catch(e=>{

        })
    return user
}



async function findUsersListByType(type) {
    let flow = UserModel.find({type: type});
    flow.select(DEFAULT_PROJECTION);
    return await flow.catch(e => {
        throw new Error(e);
    });
}




module.exports = {
    model: UserModel,
    createUser,
    findAllUsers,
    findUserById,
    login,
    updateUserById,
    findUsersListByType,
}
