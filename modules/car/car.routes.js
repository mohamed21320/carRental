import { Router } from "express";
import * as cC from "./car.controller.js";

const router= Router()

router.get('/',cC.getCar )
router.get('/AvilableSpecificCar',cC.getAvilableSpecificCar)
router.get('/RentedSpecificCar',cC.getRentedSpecificCar)
router.get('/RentedOrAvilableCar',cC.getRentedOrAvilableCar)
router.get('/ModelCar',cC.getModelCar)
router.get('/:id',cC.getSpecificCar )
router.post('/',cC.addCar )
router.put('/:id',cC.updateCar )
router.delete('/:id',cC.deleteCar )


export default router