module.exports = (sequelize, DataTypes) => {
    const RemovedRoomTypes = sequelize.define("RemovedRoomTypes", {
      RoomTypeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      TypeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      View: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NoOfBeds: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sqFeet: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      StandardCharge: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      AddInfo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      
    });

    
    return RemovedRoomTypes;
  };
  