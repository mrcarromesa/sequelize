import { Sequelize, Model, DataTypes } from 'sequelize'; // *1 importa lib do sequelize
import sequelize from '../database/sequelize'; // *2 importa configuração de conexão

class Users extends Model {} // *1 para utilizar class Model
Users.init(
    {
        firstName: DataTypes.STRING, // *1 para utilizar o DataTypes

        lastName: DataTypes.STRING,

        // Como utilizar campos virtuais: https://sequelize.org/master/class/lib/data-types.js~VIRTUAL.html
        contact_name: {
            // contact_name, Esse campo pode ser utilizando na funcao `findAll({... include:[...]}), nesse caso é um campo que não está na tabela, mas retornará a concatenação de dois campos nesse caso especifico
            type: new DataTypes.VIRTUAL(DataTypes.STRING, ['contact_name']),

            get: function() {
                return `${this.get('firstName')} ${this.get('lastName')}`;
            },
        },
    },
    {
        sequelize, // *2 configuração da conexão;
        modelName: 'Users',
        tableName: 'Users',
    }
);

export default Users;
