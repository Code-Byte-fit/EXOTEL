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
        });

        RemovedRoom.associate = (models) => {
            RemovedRoom.belongsToMany(models.Reservations, { through: 'ReservationRoom' });
            RemovedRoom.belongsTo(models.RoomTypes, { foreignKey: 'RoomTypeID' });
           


    };



    return RemovedRoom;
}