module.exports = (sequelize, DataTypes) => {
    const teste = sequelize.define(
        'teste',
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        {}
    );
    teste.associate = function(models) {
        // associations can be defined here
    };
    return teste;
};
