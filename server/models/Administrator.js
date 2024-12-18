module.exports=(sequelize,Datatypes)=>{
    const Administrator=sequelize.define("Administrator",{
        FirstName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        LastName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        BirthDate:{
            type:Datatypes.DATEONLY,
            allowNull:false,
        },
        Country:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Email:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        PhoneNumber:{
            type:Datatypes.STRING,
            allowNull:false,
        },
    })
    return Administrator;
}