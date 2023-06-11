module.exports=(sequelize,Datatypes)=>{
    const RemovedUsers=sequelize.define("RemovedUsers",{
        userId:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        FirstName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        LastName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        Role:{
            type:Datatypes.STRING,
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
        }
    },{
        timestamps:false
    })


    RemovedUsers.associate = (models) => {
        RemovedUsers .hasOne(models.RemovedUserAccounts, {foreignKey: {name: "userId",unique: true}});
      };


    
    
    return RemovedUsers ;
}