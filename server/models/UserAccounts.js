module.exports=(sequelize,Datatypes)=>{
    const UserAccounts=sequelize.define("UserAccounts",{
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

    UserAccounts.associate = (models) => {
        UserAccounts.belongsTo(models.Users, {foreignKey: 'userId'});
      };


    return UserAccounts;
}