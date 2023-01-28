module.exports=(sequelize,Datatypes)=>{
    const Users=sequelize.define("Users",{
        userId:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        userName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        email:{
            type:Datatypes.STRING,
            allowNull:false,
        },
    })
    return Users;
}