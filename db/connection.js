import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017")
client.connect().then(() => {
    console.log("server is success")
}).catch(err => {
    console.log({msg:"error connecting",err})
})

const db = client.db("test7")


export default db