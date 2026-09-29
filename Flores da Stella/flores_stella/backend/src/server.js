const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


app.use('/api/clientes', clienteRoutes);
app.use('/api/produtos', produtoRoutes); 
app.use('/api/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});