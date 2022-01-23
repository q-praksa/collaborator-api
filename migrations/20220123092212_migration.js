const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "projects", deps: []
 * createTable() => "Project_Team", deps: [projects, users]
 * addColumn(img) => "users"
 * addColumn(skills) => "users"
 * addColumn(job) => "users"
 * addColumn(address) => "users"
 *
 */

const info = {
  revision: 2,
  name: "migration",
  created: "2022-01-23T09:22:12.575Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "projects",
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
        teamType: {
          type: Sequelize.TEXT,
          field: "teamType",
          defaultValue: "Dedicated",
        },
        startDate: {
          type: Sequelize.DATE,
          field: "startDate",
          defaultValue: Sequelize.Date,
        },
        endDate: { type: Sequelize.DATE, field: "endDate" },
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
      "Project_Team",
      {
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
        projectId: {
          type: Sequelize.UUID,
          field: "projectId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "projects", key: "id" },
          primaryKey: true,
        },
        userId: {
          type: Sequelize.UUID,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "img",
      { type: Sequelize.TEXT, field: "img" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "skills",
      { type: Sequelize.JSON, field: "skills" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "job",
      { type: Sequelize.TEXT, field: "job", defaultValue: "Front-End" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "address",
      { type: Sequelize.TEXT, field: "address" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["users", "img", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["users", "skills", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["users", "job", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["users", "address", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["projects", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Project_Team", { transaction }],
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
