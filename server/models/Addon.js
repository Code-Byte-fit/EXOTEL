module.exports=(sequelize,Datatypes)=>{
    const Addons=sequelize.define("Addons",{
        AddOnNo:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        AddOn:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Amount:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        AddInfo:{
            type:Datatypes.STRING,
            allowNull:false,
        } },
        {
            timestamps: false
        });

        Addons.associate = (models) => {
            Addons.belongsToMany(models.Reservations, { through: 'ReservationAddOn' });

          };
    return Addons;
}