const tableName = "tasks";
const projectId = "project_id";
const userId = "user_id";

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable("tasks", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "projects",
          key: "id"
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
      },
      title: {
        type: Sequelize.STRING,
        unique: "tenant_name",
        allowNull: false
      },
      summary: {
        type: Sequelize.STRING,
        unique: "tenant_name",
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        unique: "tenant_name",
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        unique: "tenant_name",
        allowNull: false
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      transaction: t
    });

    await queryInterface.addIndex(tableName, [ userId ], { transaction: t });
    await queryInterface.addIndex(tableName, [ projectId ], { transaction: t });
  }),

  down: (queryInterface) => queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.dropTable(tableName, { transaction: t });
  })
};
