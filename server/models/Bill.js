module.exports=(sequelize,Datatypes)=>{
    const Bill=sequelize.define("Bill",{
        billID:{
            type:Datatypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true,
        },
        grossAmount:{
            type:Datatypes.FLOAT, 
            allowNull:false,
        }
    },
    {
        timestamps: false
        
    });
    Bill.associate = (models) => {
        Bill.belongsTo(models.DuePayment, { foreignKey: 'ReservationId' });
      };
      
    return Bill;
}

