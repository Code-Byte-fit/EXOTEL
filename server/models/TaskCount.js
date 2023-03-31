//Nethmi
module.exports = (sequelize, Datatypes) => {
  const TaskCount = sequelize.define("TaskCount", {
    userId: {
      type: Datatypes.INTEGER,
      primaryKey: true,
    },
    taskCount: {
      type: Datatypes.INTEGER,
      defaultValue: 0,
    },
  });

  TaskCount.associate = (models) => {
    TaskCount.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return TaskCount;
};
