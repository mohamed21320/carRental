import { Router } from "express";
import * as CC from './customer.controller.js';

const router= Router()
router.get('/',CC.getCustomer)
router.get('/:id',CC.getSpecificCustomer)
router.post('/',CC.addCustomer)
router.put('/:id',CC.updateCustomer)
router.delete('/:id',CC.deleteCustomer)

export default router