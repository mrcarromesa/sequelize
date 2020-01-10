// import { Sequelize } from 'sequelize';
import People from '../models/People';
import Users from '../models/Users';

import sequelize from '../database/sequelize';

class PeopleController {
    async index(req, res) {
        const user = await People.findAll({
            include: [
                {
                    model: Users,
                    attributes: {
                        include: [
                            'firstName',
                            'contact_name',
                            /* [
                                Sequelize.fn(
                                    'concat',
                                    Sequelize.col('firstName'),
                                    ' ',
                                    Sequelize.col('lastName')
                                ),
                                'conc',
                            ], */
                        ],
                    },
                },
            ],
        });
        res.status(200).json(user);
    }

    async create(req, res) {
        // console.log(req.body);
        // return;
        const t = sequelize.transaction();

        // console.log(t);
        // return;

        try {
            const people = await Users.create(req.body);

            console.log("Jane's auto-generated ID:", people.id);
            // t.commit();

            return res.status(200).json(people);
        } catch (error) {
            console.log(error);

            // t.rollback();
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

export default new PeopleController();
