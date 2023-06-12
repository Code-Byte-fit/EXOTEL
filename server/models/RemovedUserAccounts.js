module.exports=(sequelize,Datatypes)=>{
    const RemovedUserAccounts=sequelize.define("RemovedUserAccounts",{
        userAccountId:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        userName:{
            type:Datatypes.STRING,
            allowNull:false, 
        },
        password:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        proPic:{
            type:Datatypes.STRING,
            allowNull:true,
        }
    },{
        timestamps: false
    })

    RemovedUserAccounts.associate = (models) => {
        RemovedUserAccounts.belongsTo(models.RemovedUsers, {foreignKey: 'userId'});
      };


    return RemovedUserAccounts;
}