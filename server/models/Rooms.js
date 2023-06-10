module.exports = (sequelize, Datatypes) => {
  const Rooms = sequelize.define(
    "Rooms",
    {
      RoomNo: {
        type: Datatypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      RoomTypeView: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      floor: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      AddInfo: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      AdditionalCharges: {
        type: Datatypes.FLOAT,
        allowNull: true,
      },
      TotalCharge: {
        type: Datatypes.FLOAT,
        allowNull: true,
      },
      Status: {
        type: Datatypes.ENUM("available", "booked"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      hooks: {
        async afterCreate(room, options) {
          // Generate a new minibar ID
          const lastMiniBar = await sequelize.models.MiniBar.findOne({
            order: [["MiniBarID", "DESC"]],
          });
          const lastMiniBarID = lastMiniBar ? lastMiniBar.MiniBarID : "0";
          const newMiniBarID = String(parseInt(lastMiniBarID) + 1);

          // Create a new minibar instance with the generated ID
          const minibar = await sequelize.models.MiniBar.create({
            MiniBarID: newMiniBarID,
          });

          // Associate the new minibar with the newly created room
          await room.setMinibar(minibar);
        },
      },
    }
  );

  Rooms.associate = (models) => {
    Rooms.belongsToMany(models.Reservations, { through: "ReservationRoom" });
    Rooms.belongsTo(models.RoomTypes, { foreignKey: "RoomTypeID" });
    Rooms.hasOne(sequelize.models.MiniBar, {
      foreignKey: {
        name: "RoomNo",
        unique: true,
      },
      as: "minibar",
    });
  };

  return Rooms;
};
