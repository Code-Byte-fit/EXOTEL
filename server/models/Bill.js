module.exports=(sequelize,Datatypes)=>{
    const Bill=sequelize.define("Bill",{
        billNumber:{
            type:Datatypes.STRING,
            primaryKey: true,
        },
        grossAmount:{
            type:Datatypes.FLOAT,
            allowNull:false,
        }
    },{
        timestamps: false
    });
    Bill.associate = (models)=>{
        Bill.belongsTo(models.Cashier,{foreignKey: 'employeeId'});
        Bill.belongsTo(models.Reservations, { foreignKey: 'resId' });
        

    }
    return Bill;
}