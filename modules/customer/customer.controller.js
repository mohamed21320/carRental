
import { ObjectId } from 'mongodb';
import db from './../../db/connection.js';


export const getCustomer = async(req, res,next) =>{

  const data =await db.collection('customers').find().toArray()
return res.status(200).json({msg:"success",data})
}

export const getSpecificCustomer = async(req, res,next) =>{
const{id} = req.params
  const data =await db.collection('customers').find({_id:new ObjectId(id)}).toArray()
return res.status(200).json({msg:"success",data})
}

export const addCustomer = async(req, res, next) => {
    const { name, email, password,phone} = req.body;
const emailExist = await db.collection('customers').findOne({email})
if (emailExist) {
    return res.status(400).json({msg:"email already exist"})
}
    const data =await db.collection('customers').insertOne({ name, email, password, phone})
  return  res.status(200).json({msg:"success",data })
}
// updateCustomer
export const updateCustomer = async(req, res, next) => {
  const { id } = req.params;
  const { name, email} = req.body;
const data = await db.collection('customers').updateOne({_id:new ObjectId(id)},{$set:{name, email}})
if (!data.modifiedCount) {
  return  res.status(400).json({msg:"fail" })
}
return  res.status(200).json({msg:"success" })
}

// deleteCustomer
export const deleteCustomer = async(req, res, next) => {
  const { id } = req.params;
const data = await db.collection('customers').deleteOne({_id:new ObjectId(id)})
console.log(data);
if (!data.deletedCount) {
  return  res.status(400).json({msg:"fail" })
}
return  res.status(200).json({msg:"success" })
}