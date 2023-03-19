module.exports=(sequelize,Datatypes)=>{
    const Logs=sequelize.define("Logs",{
        loginId: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
          },
       
    })
    return Logs;
}