import { Router } from "express";
import * as RC from "./rental.controller.js";

const router= Router()

router.get('/',RC.getRental)
router.get('/:id',RC.getSpecificRental)
router.post('/',RC.addRental)
router.put('/:id',RC.updateRental)
router.delete('/:id',RC.deleteRental)

export default router