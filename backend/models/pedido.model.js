import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantity: { type: Number, required: true },
    toppings: [{ nome: String }]
});

const PedidoSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Defina explicitamente o _id como String
    preco: { type: Number, required: true },
    pago: { type: Boolean, default: false },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    status: {
        type: String,
        enum: ['em preparo', 'pronto para retirada', 'A caminho', 'Concluido', 'Cancelado', 'aguardando confirmação'],
        default: 'aguardando confirmação', // Define o status padrão
        required: true
    },
    date: { type: Date, default: Date.now, required: true }, // Adiciona o campo date
    items: [ItemSchema] // Adiciona o campo items
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
export default Pedido;