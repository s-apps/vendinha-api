const { Sequelize, Op } = require('sequelize');
const sequelize = new Sequelize('mysql://vendinha:Vendinh@@localhost:3306/vendinha');

const Contas = sequelize.define('contas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    data_nascimento: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    }    
});

exports.create = async (req, res) => {
    const conta = {
        id: req.body.id,
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        data_nascimento: req.body.data_nascimento,
        idade: req.body.idade
    }

    await Contas.create(conta)
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
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const offset = page * size;
    const limit = size;

    await Contas.findAndCountAll({ limit, offset }).then(contas => {
        console.log(contas.length)
        const totalPages = Math.ceil(contas.count / limit);
        const response = {
            totalItems: contas.count,
            totalPages: totalPages,
            limit: limit,
            currentPageNumber: page + 1,
            currentPageSize: contas.rows.length,
            contas: contas.rows
        }
        res.json(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreram erros'
        });
    });
}

exports.readContas = async (req, res) => {
    const contas = await Contas.findAll();
    res.json(contas);
}

exports.readById = async (req, res) => {
    const id = req.query.id;
    const conta = await Contas.findOne({ where: { id } });
    if (conta === null) {
        res.json('Conta não encontrada')
    } else {
        res.json(conta)
    }
}

exports.filter = async (req, res) => {
    const contas = await Contas.findAll({
        where: {
            nome: {
                [Op.like]: `%${req.query.nome}%`
            }
        }
    })
    res.json(contas);
}

exports.update = async (req, res) => {
    const contas = await Contas.update({
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        data_nascimento: req.body.data_nascimento,
        idade: req.body.idade
    },
    {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreram erros'
        });        
    });
}

exports.delete = async (req, res) => {

    await Contas.destroy({
        where: {
            id: req.query.id
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



