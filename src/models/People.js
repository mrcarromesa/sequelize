import { Model, DataTypes } from 'sequelize'; // *1 importa lib do sequelize
import sequelize from '../database/sequelize'; // *2 importa configuração de conexão
import Users from './Users'; // *3 importa referência da chave estrangeira

// Definição em https://sequelize.org/master/manual/models-definition.html

class People extends Model {} // *1 para utilizar class Model
People.init(
    {
        name: DataTypes.STRING, // *1 para utilizar o DataTypes
    },
    {
        sequelize, // *2 configuração da conexão;
        modelName: 'people',
        tableName: 'People',
    }
);
// as duas linhas abaixo são necessárias para permitir realizar o "JOIN" quando chamar a função `findAll({ ... inlculed: [...]})`
Users.hasMany(People); // Informa que para cada registro Users pode possuír vários registro People
People.belongsTo(Users); // Informa que cada registro People pode pertencer a um registro User

export default People;
