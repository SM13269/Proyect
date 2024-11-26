import { conmysql } from "../db.js";

export const login = async (req, res) => {
  try {
    const { Usuario, Password } = req.body;

    if (!Usuario) {
      return res.status(400).json({
        Mensaje: "Error: El Usuario es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    if (!Password) {
      return res.status(400).json({
        Mensaje: "Error: La contraseña es requerida",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      `
      SELECT * FROM usuarios 
      WHERE usuario = ? AND contrasena = ?;
      `,
      [Usuario, Password]
    );

    res.json({
      Mensaje: result.length > 0 ? "Se inició Sesión" : "Credenciales erróneas",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM usuarios;");
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

export const getUsuarioID = async (req, res) => {
  try {
    const { UsuarioID } = req.body;

    if (!UsuarioID) {
      return res.status(400).json({
        Mensaje: "Error: El UsuarioID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM usuarios WHERE id = ?;",
      [UsuarioID]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el usuario"
          : "No se encontró el usuario",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertUsuario = async (req, res) => {
  try {
    const { Nombre, usuario, password, Admin } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO usuarios (nombre, usuario, contrasena, es_admin) 
      VALUES (?, ?, ?, ?);
      `,
      [Nombre, usuario, password, Admin]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Se guardó correctamente",
        color: "success",
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó el usuario",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { UsuarioID, Nombre, usuario, password, Admin } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE usuarios 
      SET nombre = ?, usuario = ?, contrasena = ?, es_admin = ? 
      WHERE id = ?;
      `,
      [Nombre, usuario, password, Admin, UsuarioID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó el usuario",
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

export const eliminarUsuario = async (req, res) => {
  try {
    const { UsuarioID } = req.body;

    if (!UsuarioID) {
      return res.status(400).json({
        Mensaje: "Error: El UsuarioID es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM usuarios WHERE id = ?;",
      [UsuarioID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó el usuario",
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
