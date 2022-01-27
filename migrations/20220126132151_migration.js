const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(clientId) => "Timesheets"
 * addColumn(projectId) => "Timesheets"
 * addColumn(userId) => "Timesheets"
 *
 */

const info = {
  revision: 8,
  name: "migration",
  created: "2022-01-26T13:21:51.468Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Timesheets", "clientId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "Timesheets",
      "projectId",
      {
        type: Sequelize.UUID,
        field: "projectId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "projects", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Timesheets",
      "userId",
      {
        type: Sequelize.UUID,
        field: "userId",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "users", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Timesheets", "projectId", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Timesheets", "userId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "Timesheets",
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
