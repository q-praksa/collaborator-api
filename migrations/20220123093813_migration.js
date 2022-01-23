const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(manager) => "projects"
 * addColumn(lead) => "projects"
 *
 */

const info = {
  revision: 3,
  name: "migration",
  created: "2022-01-23T09:38:13.653Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "projects",
      "manager",
      {
        type: Sequelize.UUID,
        field: "manager",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        references: { model: "users", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "projects",
      "lead",
      {
        type: Sequelize.UUID,
        field: "lead",
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
    params: ["projects", "manager", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["projects", "lead", { transaction }],
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
