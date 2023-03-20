module.exports=(sequelize,Datatypes)=>{
    const MiniBar=sequelize.define("MiniBar",{
        MinibarId:{
            type:Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
    },
    {
        timestamps: false
        
    });
    MiniBar.associate = (models) =>{
        MiniBar.belongsTo(models.MinibarPackage, { foreignKey: 'PackageName' });
    }
    return MiniBar;
}