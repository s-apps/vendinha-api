const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://silverio:Idpdx32d@@localhost:3306/vendinha');

const Compras = sequelize.define('compras', {
    compras_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contas_id: {
        type: Sequelize.INTEGER
    },
    data: {
        type: Sequelize.STRING
    },
    descricao: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.FLOAT
    }    
});

exports.create = async (req, res) => {
    const compra = {
        compras_id: req.body.compras_id,
        contas_id: req.body.contas_id,
        data: req.body.data,
        descricao: req.body.descricao,
        valor: req.body.valor
    }

    await Compras.create(compra)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Ocorreram erros'
            });
        });
}

exports.read = async (req, res) => {

    await Compras.findAll().then(compras => {
        res.json(compras);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreram erros'
        });
    });
}

exports.delete = async (req, res) => {
    await Compras.destroy({
        where: {
            compras_id: req.query.compra_id
        }
    }).then((deleted) => {
        if (deleted === 1) {
            res.status(200).json({ message: 'Deletado com sucesso', deleted });
        } else {
            res.status(404).json({ message: 'Registro não encontrado', deleted });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreram erros'
        });        
    })
}
