const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "clients", deps: []
 * addColumn(clientId) => "projects"
 *
 */

const info = {
  revision: 4,
  name: "migration",
  created: "2022-01-23T09:53:04.995Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "clients",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          primaryKey: true,
          allowNull: false,
        },
        status: {
          type: Sequelize.TEXT,
          field: "status",
          defaultValue: "Active",
        },
        companyName: {
          type: Sequelize.TEXT,
          field: "companyName",
          allowNull: false,
        },
        img: { type: Sequelize.TEXT, field: "img" },
        CEO: { type: Sequelize.TEXT, field: "CEO", allowNull: false },
        region: { type: Sequelize.TEXT, field: "region" },
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
    fn: "addColumn",
    params: [
      "projects",
      "clientId",
      {
        type: Sequelize.UUID,
        field: "clientId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "clients", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["projects", "clientId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["clients", { transaction }],
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
