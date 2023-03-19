module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define(
    "Users",
    {
      userId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      FirstName: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      Country: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      Email: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      PhoneNumber: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Users.hasOne(sequelize.models.UserAccounts, {
    foreignKey: {
      name: "userId",
      unique: true,
    },
    as: "userAccount",
  });

  Users.associate = (models) => {
    Users.hasMany(models.TaskAllocation, { foreignKey: "userId" }); //added
  };

  return Users;
};
