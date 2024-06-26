import express from 'express'
import db from './db/connection.js';
import customerRouter from './modules/customer/customer.routes.js';
import rentalRouter from './modules/rental/rental.routes.js';
import carRouter from './modules/car/car.routes.js';
const app = express()
const port = 3000
app.use(express.json())
app.use("/customer",customerRouter )
app.use("/car",carRouter)
app.use("/rental",rentalRouter )


app.use('*', (req, res) =>{
  return  res.status(404).send({msg:"Not Found"})
})
db

app.listen(port, () =>{
    console.log(`connection is successfully`)
})