const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "clients", deps: []
 * createTable() => "refreshTokens", deps: []
 * createTable() => "users", deps: []
 * createTable() => "projects", deps: [clients, users, users]
 * createTable() => "Project_Users", deps: [projects, users]
 * createTable() => "Timesheets", deps: [projects, users]
 *
 */

const info = {
  revision: 1,
  name: "migration",
  created: "2022-02-04T13:42:53.743Z",
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
        fullname: { type: Sequelize.TEXT, field: "fullname" },
        email: {
          type: Sequelize.TEXT,
          field: "email",
          allowNull: false,
          unique: true,
        },
        password: { type: Sequelize.TEXT, field: "password", allowNull: false },
        address: { type: Sequelize.TEXT, field: "address" },
        job: { type: Sequelize.TEXT, field: "job", defaultValue: "Front-End" },
        role: { type: Sequelize.TEXT, field: "role", defaultValue: "user" },
        skills: { type: Sequelize.JSON, field: "skills" },
        img: { type: Sequelize.TEXT, field: "img" },
        status: {
          type: Sequelize.TEXT,
          field: "status",
          defaultValue: "available",
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
      "projects",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          primaryKey: true,
          allowNull: false,
        },
        projectName: {
          type: Sequelize.TEXT,
          field: "projectName",
          allowNull: true,
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
        clientId: {
          type: Sequelize.UUID,
          field: "clientId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "clients", key: "id" },
          allowNull: true,
        },
        lead: {
          type: Sequelize.UUID,
          field: "lead",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "users", key: "id" },
          allowNull: true,
        },
        manager: {
          type: Sequelize.UUID,
          field: "manager",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Project_Users",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          primaryKey: true,
          allowNull: false,
        },
        projectId: {
          type: Sequelize.UUID,
          field: "projectId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "projects", key: "id" },
          unique: "Project_Users_userId_projectId_unique",
        },
        userId: {
          type: Sequelize.UUID,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          unique: "Project_Users_userId_projectId_unique",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Timesheets",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          primaryKey: true,
          allowNull: false,
        },
        timeSpent: {
          type: Sequelize.NUMBER,
          field: "timeSpent",
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          field: "description",
          allowNull: false,
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
        projectId: {
          type: Sequelize.UUID,
          field: "projectId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "projects", key: "id" },
          allowNull: true,
        },
        userId: {
          type: Sequelize.UUID,
          field: "userId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["clients", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["projects", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Project_Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["refreshTokens", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Timesheets", { transaction }],
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
