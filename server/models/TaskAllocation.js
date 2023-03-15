module.exports = (sequelize, Datatypes) => {
  const TaskAllocation = sequelize.define("TaskAllocation", {
    RoomNumber: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    RoomboyNumber: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    Type: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    Date: {
      type: Datatypes.DATEONLY,
      allowNull: false,
    },
    Time: {
      type: Datatypes.TIME,
      allowNull: false,
    },
    SpecialNotes: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  return TaskAllocation;
};
