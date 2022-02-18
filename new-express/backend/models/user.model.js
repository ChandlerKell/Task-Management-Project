const user = "User";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        user, 
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: true,
                  notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: true,
                  notEmpty: true,
                },
            },
            password: {
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

    User.associate = (models) => {
        models.User.hasMany(models.Project, {
            foreignKey: "user_id",
        })
        models.User.hasMany(models.Task, {
            foreignKey: "user_id",
        })
    };

    return User;
}
