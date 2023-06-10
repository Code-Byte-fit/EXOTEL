module.exports = (sequelize, Datatypes) => {
  const TaskAllocations = sequelize.define(
    "TaskAllocations",
    {
      taskId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      taskDate: {
        type: Datatypes.DATEONLY,
        allowNull: false,
      },
      completeStatus: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  TaskAllocations.associate = (models) => {
    TaskAllocations.belongsTo(models.Reservations, { foreignKey: "Id" });
    TaskAllocations.hasMany(models.Laundry, { foreignKey: "taskId" });
    TaskAllocations.hasMany(models.MiniBarRestock, { foreignKey: "taskId" });
  };
  return TaskAllocations;
};
