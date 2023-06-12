module.exports=(sequelize,Datatypes)=>{
    const MiniBar=sequelize.define("MiniBar",{
        MiniBarID:{
            type:Datatypes.INTEGER,
            allowNull:true,
            primaryKey:true,
          
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