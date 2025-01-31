import mongoose from 'mongoose'

const PedidoSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    preco: {type: Number, required: true},
    pago: {type: Boolean},
    finalizado: {type: Boolean}
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
export default Pedido;