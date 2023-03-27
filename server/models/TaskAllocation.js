//Nethmi
module.exports = (sequelize, Datatypes) => {
  const TaskAllocation = sequelize.define("TaskAllocation", {
    taskNo: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
  });

  TaskAllocation.associate = (models) => {
    TaskAllocation.belongsTo(models.Reservations, {
      foreignKey: "ReservationId",
    });
    TaskAllocation.belongsTo(models.Rooms, { foreignKey: "RoomNo" });
    TaskAllocation.belongsTo(models.Users, { foreignKey: "userId" });
  };

  return TaskAllocation;
};
