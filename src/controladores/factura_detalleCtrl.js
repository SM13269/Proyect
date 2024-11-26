import { conmysql } from "../db.js";

export const listarFacturaDetalles = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM factura_detalle;");
    res.json({
      Mensaje:
        result.length > 0
          ? "Operación Exitosa"
          : "No hay registros para la consulta",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const listarFacturaDetallesActivas = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM factura_detalle WHERE estado = 1;"
    );
    res.json({
      Mensaje:
        result.length > 0
          ? "Operación Exitosa"
          : "No hay registros para la consulta",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFacturaDetalleID = async (req, res) => {
  try {
    const { FacturaDetalleID } = req.body;

    if (!FacturaDetalleID) {
      return res.status(400).json({
        Mensaje: "Error: El FacturaDetalleID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM factura_detalle WHERE id = ?;",
      [FacturaDetalleID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el detalle de la factura"
          : "No se encontró el detalle de la factura",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDetalleFacturaID = async (req, res) => {
  try {
    const { facturaID } = req.body;

    if (!facturaID) {
      return res.status(400).json({
        Mensaje: "Error: El FacturaID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM factura_detalle WHERE id_factura = ?;",
      [facturaID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el detalle de la factura"
          : "No se encontró el detalle de la factura",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertFacturaDetalle = async (req, res) => {
  try {
    const {
      IdFactura,
      IdProducto,
      Cantidad,
      PrecioUnitario,
      Subtotal,
      Estado,
    } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO factura_detalle (id_factura, id_producto, cantidad, precio_unitario, subtotal, estado) 
      VALUES (?, ?, ?, ?, ?, ?);
      `,
      [IdFactura, IdProducto, Cantidad, PrecioUnitario, Subtotal, Estado]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Se guardó correctamente",
        color: "success",
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó el detalle de la factura",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFacturaDetalle = async (req, res) => {
  try {
    const {
      FacturaDetalleID,
      IdFactura,
      IdProducto,
      Cantidad,
      PrecioUnitario,
      Subtotal,
      Estado,
    } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE factura_detalle 
      SET id_factura = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, subtotal = ?, estado = ? 
      WHERE id = ?;
      `,
      [
        IdFactura,
        IdProducto,
        Cantidad,
        PrecioUnitario,
        Subtotal,
        Estado,
        FacturaDetalleID,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó el detalle de la factura",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se actualizó correctamente",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarFacturaDetalle = async (req, res) => {
  try {
    const { FacturaDetalleID } = req.body;

    if (!FacturaDetalleID) {
      return res.status(400).json({
        Mensaje: "Error: El FacturaDetalleID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM factura_detalle WHERE id = ?;",
      [FacturaDetalleID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó el detalle de la factura",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se eliminó correctamente",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
