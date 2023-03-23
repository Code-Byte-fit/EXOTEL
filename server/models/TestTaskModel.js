//Nethmi
module.exports = (sequelize, Datatypes) => {
  const TestTaskModel = sequelize.define("TestTaskModel", {
    taskNo: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    roomNumber: {
      type: Datatypes.STRING,
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
    specialNotes: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return TestTaskModel;
};
