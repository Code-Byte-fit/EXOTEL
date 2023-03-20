module.exports=(sequelize,Datatypes)=>{
    const MiniBar=sequelize.define("MiniBar",{
        MiniBarID:{
            type:Datatypes.STRING,
            allowNull:true,
            primaryKey:true,
          
        },
      
    })


    
    return MiniBar;
}