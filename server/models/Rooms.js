module.exports=(sequelize,Datatypes)=>{
    const Rooms=sequelize.define("Rooms",{
        RoomNo:{
            type:Datatypes.STRING,
            allowNull:false,
            primaryKey:true,
        },
    
        floor:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        sqFeet:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        addInfo:{
            type:Datatypes.STRING,
            allowNull:true,
        },
        Status: {
            type: Datatypes.ENUM('available', 'booked'),
            allowNull: false
        },
        BaseCharge: {
            type: Datatypes.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: false
    })

    Rooms.associate = (models) => {
        Rooms.belongsToMany(models.Reservations, { through: 'ReservationRoom' });
      };;

    
    
    return Rooms;
}