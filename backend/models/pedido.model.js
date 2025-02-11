import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantity: { type: Number, required: true },
    toppings: [{ nome: String }]
});

const PedidoSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    preco: { type: Number, required: true },
    pago: { type: Boolean, default: false },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    status: {
        type: String,
        enum: ['Aguardando Confirmação', 'Em Preparo', 'Pronto para Retirada', 'A caminho', 'Concluído', 'Cancelado'],
        default: 'Aguardando Confirmação', 
    },
    date: { type: Date, default: Date.now, required: true }, 
    items: [ItemSchema] 
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
export default Pedido;