module.exports=(sequelize,Datatypes)=>{
    const Payment=sequelize.define("DuePayment",{
        PaymentID:{
            type:Datatypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true,
        },
        BaseValue:{
            type:Datatypes.FLOAT, 
            allowNull:false,
        },
        TotalMinibar:{
            type:Datatypes.FLOAT,
            allowNull:false,
        },
        TotalLaundry:{
            type:Datatypes.FLOAT,
            allowNull:false,
        },
                
        PaymentAmount:{
            type:Datatypes.FLOAT,
            allowNull:false,

        }
    },
    {
        timestamps: false
        
    });
    Payment.associate = (models) => {
        Payment.belongsTo(models.Reservations, { foreignKey: 'ReservationId' });
      };
      
    return Payment;
}

