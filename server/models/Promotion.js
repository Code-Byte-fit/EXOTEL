module.exports=(sequelize,Datatypes)=>{
    const Promotion=sequelize.define("Promotion",{
        PromoCode:{
            type:Datatypes.STRING,
            allowNull:false,
            primaryKey:true
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

        Promotion.associate = (models) => {
            Promotion.hasMany(models.Reservations, { foreignKey: 'PromoCode' });
          };
    return Promotion;
}