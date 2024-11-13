import{conmysql} from '../db.js'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dlace3esz', 
  api_key: '853357716749581',        
  api_secret: 'eFwU8D93mcMIC2xmyTLnih_GH8s'  
})

export const getProductos=
async (req,res) => {
    try {
        const [result]= await conmysql.query(' select * from productos')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error  al consultar productos"})
    }
}

export const getProductosxid=
async(req, res)=>{
    try {
        const [result]=await conmysql.query('select * from productos where prod_id=?', [req.params.id])
        if(result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"PRODUCTO NO ENCONTRADO"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'Error  del lado del servidor'})
    }
}

export const postProducto = async (req, res) => {
    try {
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
        console.log("DATOS RECIBIDOS DEL CUERPO:", req.body);

        let prod_imagen = null; 

        if (req.file) {
            console.log("IMAGEN RECIBIDA:", req.file);
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads', 
                public_id: `${Date.now()}-${req.file.originalname}` 
            });

            console.log("Resultado de la carga en Cloudinary:", uploadResult);
            prod_imagen = uploadResult.secure_url;
        } else {
            console.log("NO SE RECIBIO NINGUNA IMAGEN.");
        }

        const [rows] = await conmysql.query(
            'INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
        );

        console.log("Producto insertado con ID:", rows.insertId);

        res.status(201).json({
            mensaje: 'PRODUCTO GUARDADO CORRECTAMENTE.',
            prod_id: rows.insertId,
            prod_imagen: prod_imagen 
        });


    } catch (error) {
        console.error("ERROR AL CREAR UN PRODUCTO", error);
        return res.status(500).json({ message: 'ERROR DEL LADO DEL SERVIDOR', error: error.message });
    }
};

// Ruta PUT para actualizar un producto
export const putProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen } = req.body;

        let newProd_imagen = prod_imagen; 

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads',
                public_id: `${Date.now()}-${req.file.originalname}` 
            });

            newProd_imagen = uploadResult.secure_url;
        }

        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo = ?, prod_nombre = ?, prod_stock = ?, prod_precio = ?, prod_activo = ?, prod_imagen = ? WHERE prod_id = ?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, newProd_imagen, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        const [rows] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};


export const patchProductos=
async (req,res)=>{
    try {
        const {id}=req.params
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
        console.log(prod_nombre)
        const [result]=await conmysql.query('update productos set prod_codigo = IFNULL(?, prod_codigo), prod_nombre = IFNULL(?, prod_nombre), prod_stock = IFNULL(?, prod_stock), prod_precio = IFNULL(?, prod_precio), prod_activo = IFNULL(?, prod_activo), prod_imagen = IFNULL(?, prod_imagen) WHERE prod_id = ?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Productos no encontrado'
        })
        const[rows]=await conmysql.query('select * from productos where prod_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteProductos=
async(req, res)=>{
    try {
        const[rows]=await conmysql.query(' delete from productos where prod_id=?', [req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No pudo eliminar el productos"
        })
        return res.status(200).json({
            message: "Cliente eliminado correctamente"     
         }); 
    } catch (error) {
        return res.status(500).json({message:"Error al lado del servidor"})
    }
}
