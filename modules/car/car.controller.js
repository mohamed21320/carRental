
import db from './../../db/connection.js';
import { ObjectId } from 'mongodb';

export const getCar =async (req,res,next) =>{
const data =await db.collection('cars').find().toArray()
    return res.status(200).send({msg:"success",data});

}

// export const getModelCar =async (req,res,next) =>{
//     const {name} = req.query
// console.log(name.split(','));
//     const data = await db.collection('cars').find(name.split(',')).toArray()
//         return res.status(200).send({msg:"success",data});
// }

export const getSpecificCar =async (req,res,next) =>{
    const {id}=req.params
    const data =await db.collection('cars').find({_id:new ObjectId(id)}).toArray()
        return res.status(200).send({msg:"success",data});
    
    }

export const getAvilableSpecificCar =async (req,res,next) =>{
    const{name} = req.body;
    const data =await db.collection('cars').find({
        status:"available",name
    }).toArray()
        return res.status(200).send({msg:"success",data});
}

export const getRentedSpecificCar =async (req,res,next) =>{
    const{name} = req.body;
    const data =await db.collection('cars').find({ $or: [ { status:"rented"}, {name}]}).toArray()
        return res.status(200).send({msg:"success",data});
}

export const getRentedOrAvilableCar =async (req,res,next) =>{
    const{name} = req.body;
    const data =await db.collection('cars').find({name:name}).toArray()
        return res.status(200).send({msg:"success",data});
}


export const addCar =async (req,res,next) => {
    const {name,model} = req.body;
    if (!name || !model) {
        return res.status(404).send({msg:"invalid name or model"});
        }
    const data=await db.collection("cars").insertOne({name,model,status:"available"})
    return res.status(201).send({msg:"success",data});
}
// updateCar
export const updateCar = async(req, res, next) => {
const {id}=req.params
const{name,model}= req.body

const data=await db.collection("cars").updateOne({_id:new ObjectId(id)},{$set:{name,model}})
if (!data.modifiedCount) {
    res.status(400).send({msg:"Fail"});

}
return res.status(200).send({msg:"success"});
}

// deleteCar
export const deleteCar = async(req, res, next) => {
    const {id}=req.params
    
    const data=await db.collection("cars").deleteOne({_id:new ObjectId(id)})
    if (!data.deletedCount) {
        res.status(400).send({msg:"Fail"});
    
    }
    return res.status(200).send({msg:"success"});
    }
