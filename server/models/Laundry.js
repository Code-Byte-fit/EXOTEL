module.exports=(sequelize,Datatypes)=>{
    const Laundry=sequelize.define("Laundry",{
        laundryId: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
          },  
        receivedDate:{
                type:Datatypes.DATEONLY,
                allowNull:false,
            },
        returnDate:{
                type:Datatypes.DATEONLY,
                allowNull:false,
            },
        load:{
                type:Datatypes.FLOAT,
                allowNull:false,
            },
        type:{
                type:Datatypes.STRING,
                allowNull:false,
            },
        charge:{
                type:Datatypes.FLOAT,
                // allowNull:false,
            }
        },
        {
            timestamps: false
    });
   Laundry.associate = (models) =>{
        Laundry.belongsTo(models.TaskAllocations, { foreignKey: 'taskId' });
        Laundry.belongsTo(models.Addons, { foreignKey: 'addonID' });
        Laundry.belongsTo(models.Reservations, { foreignKey: 'resNumber' });
    };
    
    return Laundry;
}