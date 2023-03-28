module.exports=(sequelize,Datatypes)=>{
    const Laundry=sequelize.define("Laundry",{
        laundryId: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
          },  
        resNumber:{
                type:Datatypes.STRING,
                allowNull:false,
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
                type:Datatypes.INTEGER,
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


    }
    return Laundry;
}