const project = "Project";

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
        project, 
        {
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
            name: {
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

    Project.associate = (models) => {
        models.Project.hasMany(models.Task, {
            foreignKey: "project_id",
        })
        models.Project.belongsTo(models.User, {})
    };

    return Project;
}
