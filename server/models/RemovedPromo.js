module.exports=(sequelize,Datatypes)=>{
    const RemovedPromo=sequelize.define("RemovedPromo",{
        RemPromoCode:{
            type:Datatypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true
        },
        PromoCode:{
            type:Datatypes.STRING,
            allowNull:false
        },
        PromoType:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Value:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        MaxUses:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Status:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Startdate:{
            type:Datatypes.DATEONLY,
            allowNull:false, 
        },
        Enddate:{
            type:Datatypes.DATEONLY,
            allowNull:false, 
        },
        AddInfo:{
            type:Datatypes.STRING,
            allowNull:true,
        } },
        {
            timestamps: false
        });

        RemovedPromo.associate = (models) => {
            RemovedPromo.hasMany(models.Reservations, { foreignKey: 'PromoCode' });
          };
    return RemovedPromo;
}