import { conmysql } from "../db.js";

export const listarFacturas = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM facturas;");
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

export const FacturasActivas = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM facturas WHERE estado = '1';"
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

export const getFacturaID = async (req, res) => {
  try {
    const { FacturaID } = req.body;

    if (!FacturaID) {
      return res.status(400).json({
        Mensaje: "Error: El FacturaID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM facturas WHERE id = ?;",
      [FacturaID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró la factura"
          : "No se encontró la factura",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertFactura = async (req, res) => {
  try {
    const { Fecha, NombreCliente, IdMesa, Total, Estado } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO facturas (fecha, nombreCliente, id_mesa, total, estado) 
      VALUES (?, ?, ?, ?, ?);
      `,
      [Fecha, NombreCliente, IdMesa, Total, Estado]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Se guardó correctamente",
        color: "success",
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó la factura",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTotal = async (req, res) => {
  try {
    const { FacturaID, Total } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE facturas 
      SET total = ? 
      WHERE id = ?;
      `,
      [Total, FacturaID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó la factura",
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

export const updateFactura = async (req, res) => {
  try {
    const { FacturaID, Fecha, NombreCliente, IdMesa, Total, Estado } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE facturas 
      SET fecha = ?, nombreCliente = ?, id_mesa = ?, total = ?, estado = ? 
      WHERE id = ?;
      `,
      [Fecha, NombreCliente, IdMesa, Total, Estado, FacturaID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó la factura",
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

export const eliminarFactura = async (req, res) => {
  try {
    const { FacturaID } = req.body;

    if (!FacturaID) {
      return res.status(400).json({
        Mensaje: "Error: El FacturaID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM facturas WHERE id = ?;",
      [FacturaID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó la factura",
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
