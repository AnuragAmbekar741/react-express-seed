import Router from "express";
import { addCustomerQuery } from "../controllers/customerQueryControllers";
import { payloadValidations } from "../middlewares/validations";
import { createQuerySchema } from "../db/schema";

const router = Router();

router.get("/", (req, res) => res.json({ message: "get" }));
router.get("/:id", (req, res) => res.json({ message: "get/;id" }));
router.post("/", payloadValidations(createQuerySchema), addCustomerQuery);
router.patch("/:id", (req, res) => res.json({ message: "patch" }));

export default router;
