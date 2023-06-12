module.exports=(sequelize,Datatypes)=>{
    const Cashier=sequelize.define("Cashier",{
        employeeId:{
            type:Datatypes.STRING,
            primaryKey: true,
        },
        firstName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        lastName:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        nic:{
            type:Datatypes.INTEGER,
            allowNull:false,
        },
        address:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        email:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        phoneNumber:{
            type:Datatypes.STRING,
            allowNull:false,
        }
    }, {
        timestamps: false
      });
    

    return Cashier;
}