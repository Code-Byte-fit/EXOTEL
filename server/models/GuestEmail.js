module.exports = (sequelize, DataTypes) => {
    const GuestEmail = sequelize.define('GuestEmail', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    GuestEmail.associate = (models) => {
      GuestEmail.belongsTo(models.Guests, { foreignKey: 'guestId' });
    };
  
    return GuestEmail;
  };