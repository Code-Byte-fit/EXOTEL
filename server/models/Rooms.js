module.exports=(sequelize,Datatypes)=>{
    const Rooms=sequelize.define("Rooms",{
        RoomNo:{
            type:Datatypes.STRING,
            allowNull:false,
            primaryKey:true,
        },
        View:{
            type:Datatypes.STRING,
            allowNull:true,
        },
        floor:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        AddInfo:{
            type:Datatypes.STRING,
            allowNull:true,
        },
        AdditionalCharges:{
            type:Datatypes.FLOAT,
            allowNull:true,
        },
        BaseCharge:{
            type:Datatypes.FLOAT,
            allowNull:true,
        },
        Status: {
            type: Datatypes.ENUM('available', 'booked'),
            allowNull: false
        }
    },
    {
        timestamps: false
    })

    Rooms.associate = (models) => {
        Rooms.belongsToMany(models.Reservations, { through: 'ReservationRoom' });
        Rooms.belongsTo(models.RoomTypes, { foreignKey: 'TypeName' });
      };

    
    
    return Rooms;
}