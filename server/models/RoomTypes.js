module.exports=(sequelize,Datatypes)=>{
    const RoomTypes=sequelize.define("RoomTypes",{
    
        TypeName:{
            type:Datatypes.STRING,
            allowNull:false,
            primaryKey:true,
        },
        NoOfBeds:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        sqFeet:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        BaseCharge:{
            type:Datatypes.FLOAT,
            allowNull:false,
        }
    },
        {
            timestamps: false
        });

        RoomTypes.associate = (models) => {
            RoomTypes.hasMany(models.Rooms, { foreignKey: 'TypeName' });
          };
      
    return RoomTypes;
}