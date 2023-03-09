module.exports=(sequelize,Datatypes)=>{
    const MiniBar=sequelize.define("MiniBar",{
      MinibarId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },  
        RoomNumber:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        LastRestocked:{
            type:Datatypes.DATEONLY,
            allowNull:false,
        },
        ItemName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Quantity:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        
    })
    return MiniBar;
}