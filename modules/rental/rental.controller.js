import db from "../../db/connection.js";
import { ObjectId } from 'mongodb';


export const getRental =async (req,res,next) =>{

    const data = await db.collection('rentals').find().toArray();
    return res.status(200).send({msg:"success",data});
}

export const getSpecificRental =async (req,res,next) =>{
const {id} = req.params
    const data = await db.collection('rentals').find({_id:new ObjectId(id)}).toArray();
    return res.status(200).send({msg:"success",data});
}


// addrental //
 export const addRental = async(req,res,next) => {
const{customerId,carId,rentalDate,returnDate} = req.body; 
const customerExist =await db.collection('customers').findOne({_id: new ObjectId(customerId)})
if (!customerExist) {
    return res.status(404).send({msg:"invalid customerId"})   
}

const carExist =await db.collection('cars').findOne({_id: new ObjectId(carId),status: 'available'})
if (!carExist) {
    return res.status(404).send({msg:"invalid carId"})      
}

if (new Date(returnDate)<new Date(rentalDate)) {
    return res.status(404).send({msg:"please returnDate must be greater than rentalDate"})      
}

const data =await db.collection('rentals').insertOne({
    customerId: new ObjectId(customerId),
    carId: new ObjectId(carId),
    returnDate:returnDate,
    rentalDate: rentalDate})

    await db.collection('cars').updateOne({_id: new ObjectId(carId)},{$set:{status: 'rented'}})
    return res.status(404).send({msg:"success"})   
}

// updateRental //
 export const updateRental = async(req, res,next) => {
    const { id } = req.params;
    const { customerId,carId,rentalDate,returnDate} = req.body;
    const data = await db.collection('rentals').updateOne({_id:new ObjectId(id)},{$set:{customerId,carId,rentalDate,returnDate}})
    return res.status(200).send({msg:"success"},data);

}

// deleteRental //
export const deleteRental = async(req, res,next) => {
    const { id } = req.params;
    const data = await db.collection('rentals').findOneAndDelete({_id:new ObjectId(id)})
    console.log(data);
    await db.collection('cars').updateOne({_id:new ObjectId(data.carId)},{$set:{status:"available"}})

    return res.status(200).send({msg:"success"});
}



