import { conmysql } from "../db.js";

export const listarMesas = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM mesas;");

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

export const getMesaID = async (req, res) => {
  try {
    const { MesaID } = req.body;

    if (!MesaID) {
      return res.status(400).json({
        Mensaje: "Error: El MesaID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query("SELECT * FROM mesas WHERE id = ?;", [
      MesaID,
    ]);

    res.json({
      Mensaje:
        result.length > 0 ? "Se encontró la mesa" : "No se encontró la mesa",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertMesa = async (req, res) => {
  try {
    const { NumeroMesa, Descripcion, Estado } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO mesas (numero_mesa, descripcion, estado) 
      VALUES (?, ?, ?);
      `,
      [NumeroMesa, Descripcion, Estado]
    );

    res.json({
      Mensaje: "Se guardó correctamente",
      id: result.insertId,
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMesa = async (req, res) => {
  try {
    const { MesaID, NumeroMesa, Descripcion, Estado } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE mesas 
      SET numero_mesa = ?, descripcion = ?, estado = ? 
      WHERE id = ?;
      `,
      [NumeroMesa, Descripcion, Estado, MesaID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Mesa no encontrada",
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

export const eliminarMesa = async (req, res) => {
  try {
    const { MesaID } = req.body;

    if (!MesaID) {
      return res.status(400).json({
        Mensaje: "Error: El MesaID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query("DELETE FROM mesas WHERE id = ?;", [
      MesaID,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error al eliminar mesa: no encontrada",
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
