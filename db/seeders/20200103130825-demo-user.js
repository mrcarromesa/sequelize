module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'People',
            [
                {
                    name: 'John',
                    isBetaMember: false,
                    userId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Jane',
                    isBetaMember: false,
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('People', null, {});
    },
};
