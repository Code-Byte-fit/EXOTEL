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
        BookedFrom:{
            type:Datatypes.DATEONLY,
            allowNull:true,
        },
        BookedTo:{
            type:Datatypes.DATEONLY,
            allowNull:true,
        }
    },
    {
        timestamps: false
    })
    return Rooms;
}