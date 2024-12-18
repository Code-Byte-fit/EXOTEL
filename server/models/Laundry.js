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
            timestamps: false,
            hooks: {
                beforeCreate: async (laundry, options) => {
                    const { type,load } = laundry;
                    const item = await sequelize.models.Addons.findOne({ where: { AddOn: type } }); // Find the item by type 
                    if (item) {
                        laundry.charge = item.Charge * load; // Multiply the addon charge and load
                        laundry.addonID = item.addonID; // Set the addonID of the laundry to the addonID of the matching addon
                      }
                    },
                  
            },
              
    });
   Laundry.associate = (models) =>{
        Laundry.belongsTo(models.TaskAllocations, { foreignKey: 'taskId' });
        Laundry.belongsTo(models.Addons, { foreignKey: 'addonID' });
        Laundry.belongsTo(models.Reservations, { foreignKey: 'ReservationId' });
    };
    
    return Laundry;
}