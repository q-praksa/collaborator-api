const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "refreshTokens", deps: []
 * createTable() => "users", deps: []
 *
 */

const info = {
  revision: 1,
  name: "migration",
  created: "2022-01-23T08:25:46.353Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "refreshTokens",
      {
        value: {
          type: Sequelize.STRING,
          field: "value",
          primaryKey: true,
          allowNull: false,
        },
        expires: {
          type: Sequelize.DATE,
          field: "expires",
          defaultValue: Sequelize.Date,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.TEXT,
          field: "email",
          allowNull: false,
          unique: true,
        },
        password: { type: Sequelize.TEXT, field: "password", allowNull: false },
        role: { type: Sequelize.TEXT, field: "role", defaultValue: "user" },
        age: { type: Sequelize.INTEGER, field: "age" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["refreshTokens", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
