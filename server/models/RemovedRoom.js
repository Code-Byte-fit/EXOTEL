module.exports = (sequelize, Datatypes) => {
    const RemovedRoom = sequelize.define("RemovedRoom", {
        RemovedRoomNo:{
            type:Datatypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true
        },
        RoomNo: {
            type: Datatypes.STRING,
            allowNull: false,
            
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
            type: Datatypes.ENUM('available', 'booked'),
            allowNull: false
        }
    },
        {
            timestamps: false,
            hooks: {
                async afterCreate(room, options) {
                    // Generate a new minibar ID
                    const lastMiniBar = await sequelize.models.MiniBar.findOne({ order: [['MiniBarID', 'DESC']] });
                    const lastMiniBarID = lastMiniBar ? lastMiniBar.MiniBarID : 0;
                    const newMiniBarID = (lastMiniBarID) + 1;

                    // Create a new minibar instance with the generated ID
                    const minibar = await sequelize.models.MiniBar.create({
                        MiniBarID: newMiniBarID,
                    });

                    // Associate the new minibar with the newly created room
                    await room.setMinibar(minibar);
                },
            },

        });

        RemovedRoom.associate = (models) => {
            RemovedRoom.belongsToMany(models.Reservations, { through: 'ReservationRoom' });
            RemovedRoom.belongsTo(models.RoomTypes, { foreignKey: 'RoomTypeID' });
            RemovedRoom.hasOne(sequelize.models.MiniBar, {
            foreignKey: {
                name: "RemovedRoomNo",
                unique: true
            },
            as: "minibar"
        });


    };



    return RemovedRoom;
}