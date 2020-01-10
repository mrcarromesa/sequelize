import Sequelize from 'sequelize';

export default new Sequelize('sequelize', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql',
});
