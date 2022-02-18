const task = "Task";

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        task, 
        {
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                  notNull: true,
                  isNumeric: true,
                  isInt: true,
                  notEmpty: true,
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                  notNull: true,
                  isNumeric: true,
                  isInt: true,
                  notEmpty: true,
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: true,
                  notEmpty: true,
                },
            },
            summary: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: true,
                  notEmpty: true,
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: true,
                  notEmpty: true,
                },
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: true,
                  notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    Task.associate = (models) => {
        models.Task.belongsTo(models.User, {})
        models.Task.belongsTo(models.Project, {})
    };

    return Task;
}
