import{conmysql} from '../db.js'

export const getPedidos=
    async (req,res) => {
        try {
            const [result]= await conmysql.query(' select * from pedidos')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error  al consultar pedidos"})
        }
    }

export const getPedidosxid = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        
        // Verificar si el id es válido
        if (isNaN(pedidoId)) {
            return res.status(400).json({ message: "El ID debe ser un número" });
        }

        const [result] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [pedidoId]);
        
        if (result.length <= 0) {
            return res.status(404).json({
                cli_id: 0,
                message: "Pedido no encontrado"
            });
        }

        res.json(result[0]);
    } catch (error) {
        console.error("Error en getPedidosxid:", error); // Log del error
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const postPedidos=
async(req, res)=>{
    try {
        //console.log(req.body) ver todos los datos del cliente
        const{cli_id, ped_fecha, usr_id, ped_estado}=req.body
        //console.log(cli_nombre) ver un dato en especifico del cliente
        const [rows]=await conmysql.query('insert into pedidos (cli_id, ped_fecha, usr_id, ped_estado) values(?,?,?,?)',
             [cli_id, ped_fecha, usr_id, ped_estado])
        res.send({
            id:rows.insertId
        })

    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
        
    }
}

export const putPedidos=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_id, ped_fecha, usr_id, ped_estado}=req.body
        console.log(ped_fecha)
        const [result]=await conmysql.query('update pedidos set cli_id=?, ped_fecha=?, usr_id=?, ped_estado=? where ped_id=?',
            [cli_id, ped_fecha, usr_id, ped_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Pedidos no encontrado'
        })
        const[rows]=await conmysql.query('select * from pedidos where ped_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchPedidos=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_id, ped_fecha, usr_id, ped_estado}=req.body
        console.log(ped_fecha)
        const [result]=await conmysql.query('update pedidos set cli_id=IFNULL(?, cli_id), ped_fecha=IFNULL(?, ped_fecha), usr_id=IFNULL(?, usr_id), ped_estado=IFNULL(?, ped_estado) where ped_id=?',
            [cli_id, ped_fecha, usr_id, ped_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Pedido no encontrado'
        })
        const[rows]=await conmysql.query('select * from pedidos where ped_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deletePedidos=
async(req, res)=>{
    try {
        const[rows]=await conmysql.query(' delete from pedidos where ped_id=?', [req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No pudo eliminar el Pedido"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error al lado del servidor"})
    }
}
