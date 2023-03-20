module.exports = (sequelize, DataTypes) => {
    const Compensation = sequelize.define("Compensation", {
      compId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      resNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      compValue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      compType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        // allowNull:false,
      },
    });
  
    // Define a function to calculate the compensation amount
    Compensation.prototype.calculateAmount = function () {
      const compTypeAmounts = {
        "Broken furniture": 1000,
        "Stains damages to  bedding or linen": 500,
        "Damage to walls or floor": 1500,
        "Broken electronics or appliances": 2000,
        "Plumbing damage": 1000,
        "Smoke damage": 750,
      };
  
      const compValueMultipliers = {
        Low: 0.5,
        Medium: 1,
        High: 1.5,
      };
  
      const compTypeAmount = compTypeAmounts[this.compType] || 0;
      const compValueMultiplier = compValueMultipliers[this.compValue] || 0;
  
      return compTypeAmount * compValueMultiplier;
    };
  
    // Before creating a new compensation record, calculate the amount based on the compValue and compType
    Compensation.beforeCreate((compensation, options) => {
      compensation.amount = compensation.calculateAmount();
    });
  
    return Compensation;
  };
  