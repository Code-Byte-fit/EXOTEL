module.exports=(sequelize,Datatypes)=>{
    const Rooms=sequelize.define("Rooms",{
        RoomNo:{
            type:Datatypes.STRING,
            allowNull:false,
            primaryKey:true,
        },
        Status:{
            type:Datatypes.STRING,
            defaultValue: "open",
            allowNull:false,
        },
        checkIn:{
            type:Datatypes.DATEONLY,
            allowNull:true,
        },
        checkOut:{
            type:Datatypes.DATEONLY,
            allowNull:true,
        }
    },
    {
        timestamps: false
    })
    return Rooms;
}