import mongoose from 'mongoose'

const PedidoSchema = new mongoose.Schema({
    _id: { type: String }, // Defina explicitamente o _id como String
    preco: {type: Number, required: true},
    pago: {type: Boolean},
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    status: {
        type: String,
        enum: ['em preparo', 'pronto para retirada', 'A caminho', 'Concluido', 'Cancelado', 'aguardando confirmação'],
        required: true
    },
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
export default Pedido;