module.exports = (sequelize, DataTypes) => {
    const GuestPhoneNumber = sequelize.define('GuestPhoneNumber', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    GuestPhoneNumber.associate = (models) => {
      GuestPhoneNumber.belongsTo(models.Guests, { foreignKey: 'guestId' });
    };
  
    return GuestPhoneNumber;
  };
  