import { Router } from "express";
import {
  eliminarMesa,
  getMesaID,
  insertMesa,
  listarMesas,
  updateMesa,
} from "../controladores/mesaCtrl.js";
const router = Router();
// armar nuestras rutas

router.get("/listarMesas", listarMesas);
router.post("/getMesaID", getMesaID);
router.post("/insertMesa", insertMesa);
router.post("/updateMesa", updateMesa);
router.post("/eliminarMesa", eliminarMesa);

export default router;
