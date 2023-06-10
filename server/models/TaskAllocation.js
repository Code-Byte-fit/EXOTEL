module.exports = (sequelize, Datatypes) => {
  const TaskAllocations = sequelize.define(
    "TaskAllocations",
    {
      taskId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      taskType: {
        type: Datatypes.ENUM("laundry", "minibar", "clean"),
        allowNull: false,
      },
      taskDate: {
        type: Datatypes.DATEONLY,
        allowNull: false,
      },
      taskTime: {
        type: Datatypes.TIME,
        allowNull: false,
      },
      Notes: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  TaskAllocations.associate = (models) => {
    TaskAllocations.belongsTo(models.Reservations, {
      foreignKey: "ReservationId",
    });
    TaskAllocations.belongsTo(models.Rooms, { foreignKey: "RoomNo" });
    TaskAllocations.belongsTo(models.Users, { foreignKey: "userId" });
    TaskAllocations.hasMany(models.Laundry, { foreignKey: "taskId" });
    TaskAllocations.hasMany(models.MiniBarRestock, { foreignKey: "taskId" });
  };
  return TaskAllocations;
};
