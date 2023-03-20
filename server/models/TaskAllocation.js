//Nethmi
module.exports = (sequelize, Datatypes) => {
  const TaskAllocation = sequelize.define("TaskAllocation", {
    taskNo: {
      type: Datatypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    ReservationNo: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    RoomNo: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    userId: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    TaskType: {
      type: Datatypes.ENUM("laundry", "minibar", "clean"),
      allowNull: false,
    },
    TaskDate: {
      type: Datatypes.DATEONLY,
      allowNull: false,
    },
    TaskTime: {
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
      foreignKey: "ReservationNo",
    });
    TaskAllocation.belongsTo(models.Rooms, { foreignKey: "RoomNo" }); //refer rooms
    TaskAllocation.belongsTo(models.Users, { foreignKey: "userId" }); //refer users
  };

  return TaskAllocation;
};
