<h1>Sequelize</h1>

<h3>Referências</h3>

* [Getting Starded](https://sequelize.org/v5/manual/getting-started.html)
* [Migrations](https://sequelize.org/v5/manual/migrations.html)





----


<strong>Instalação</strong>

```bash
yarn add sequelize
```

<strong>Base de dados que podem ser utilizadas com o sequelize</strong>

* Postgres
* MySQL
* MariaDB
* SQLite
* Microsoft SQL Server

<strong>Utilizando um driver</strong>

No link: [Getting Start](https://sequelize.org/master/manual/getting-started.html)
Exibe como instalar o driver, ex.:

```bash
yarn add mysql2
```

<strong>Instalar CLI do sequelize</strong>

```bash
yarn add sequelize-cli
```

<strong>Construir estrutura da base de dados com cli</strong>

```bash
npx sequelize-cli init
```

    Isso irá gerar pastas na raiz do projeto:

* config
* models
* migrations
* seeders

<strong>Mover as pasta para outras pastas do projeto</strong>

* mover as pastas models, seeders, migrations para pasta db/ na raiz do projeto;
* Criar arquivo ```.sequelizerc``` na raiz do projeto;
* Inserir o seguinte:

```js
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
}
```

<strong>Configuração de conexão da base de dados</strong>

* No arquivo ```config/config.js```, já gerado anteriormente, no nó ```"developemente"```
adicionar as informações de acesso a base de dados para realização das migrations e seeders;

<strong>Criar um model/migration</strong>

* Execute o seguinte comando:

```bash
npx sequelize-cli model:generate --name teste --attributes firstName:string,lastName:string,email:string
```

<strong>Mais detalhes:</strong>

* [Entender a cli de criação de models - Creating first Model (and Migration)](https://sequelize.org/master/manual/migrations.html#creating-first-model--and-migration-)
* [Entender o esqueleto da migration - Advance Topics](https://sequelize.org/master/manual/migrations.html#advance-topics)

<strong>Executar Migration</strong>

```bash
npx sequelize-cli db:migrate
```

* Mais detalhes: [Executar Migrations](https://sequelize.org/master/manual/migrations.html#running-migrations)

----

<strong>Configurar acesso a base para aplicação</strong>

* Na pasta src criar a pasta ```database/``` e dentro da pasta ```database/``` criar o arquivo ```sequelize.js```
* no arquivo criado inserir o seguinte código:

```js
import Sequelize from 'sequelize';

export default new Sequelize('base de dados', 'usuario', 'senha', {
    host: 'endereco de host',
    dialect: 'mysql',
});

```
<strong>Agora tudo pronto, vamos começar...</strong>

* Criar pasta ```models/``` dentro da pasta ```src/```
* Nessa pasta será criado os models seguindo o padrão da documentação do sequelize:

```js
//src/models/Users.js

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
```


```js
// src/models/People.js

import { Model, DataTypes } from 'sequelize'; // *1 importa lib do sequelize
import sequelize from '../database/sequelize'; // *2 importa configuração de conexão
import Users from './Users'; // *3 importa referência da chave estrangeira

// Definição em: https://sequelize.org/master/manual/models-definition.html

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

```

------

<strong>Como obter os dados da tabela</strong>

* Utilizar função ```findAll()```, documentação: [Querying](https://sequelize.org/master/manual/querying.html)

* Exemplo de select people realizando join na tabela users:

```js
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
```

* Exemplo simples de crud [Querying](https://sequelize.org/master/manual/getting-started.html#querying):

```js
// Find all users
User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});

// Create a new user
User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
  console.log("Jane's auto-generated ID:", jane.id);
});

// Delete everyone named "Jane"
User.destroy({
  where: {
    firstName: "Jane"
  }
}).then(() => {
  console.log("Done");
});

// Change everyone without a last name to "Doe"
User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
}).then(() => {
  console.log("Done");
});
```
* Uma forma eficaz de update: [```save```](https://sequelize.org/v5/class/lib/model.js~Model.html#instance-method-save) Ex.:

```js
async update(req, res) {
    // Realiza consulta
    const q = await People.findByPk(req.params.id);

    if (q) {
        // Altera o valor do campo
        q.name = 'Novo nome';
    }

    // -- Mágica...  commita
    await q.save();

    return res.json(q);
}
```
