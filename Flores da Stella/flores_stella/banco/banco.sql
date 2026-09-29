-- Criação do banco de dados (se necessário)
-- CREATE DATABASE flores_stella;

-- Tabela Cliente
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

-- Tabela Produto
CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT DEFAULT 0
);

-- Tabela Pedido
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'Pendente',
    CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

-- Tabela Item_Pedido (Relacionamento N:N)
CREATE TABLE item_pedido (
    id_item SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_produto FOREIGN KEY (id_produto) REFERENCES produto(id_produto) ON DELETE CASCADE
);

-- Dados Iniciais para Teste
INSERT INTO cliente (nome, email, telefone) VALUES 
('Maria Silva', 'maria@email.com', '(48) 99999-1111'),
('João Souza', 'joao@email.com', '(48) 98888-2222');

INSERT INTO produto (nome, descricao, preco, estoque) VALUES 
('Buquê de Rosas Vermelhas', 'Arranjo com 12 rosas vermelhas selecionadas.', 120.00, 15),
('Orquídea Phalaenopsis', 'Vaso de orquídea lilás de longa duração.', 85.50, 10),
('Cesta de Flores do Campo', 'Mix de flores silvestres coloridas.', 95.00, 8);