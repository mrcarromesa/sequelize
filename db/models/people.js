module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define(
        'People',
        {
            name: DataTypes.STRING,
            isBetaMember: DataTypes.BOOLEAN,
            userId: DataTypes.INTEGER,
        },
        {}
    );
    People.associate = function(models) {
        // associations can be defined here
    };
    return People;
};
