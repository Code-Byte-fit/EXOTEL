module.exports = (sequelize, DataTypes) => {
  const Guests = sequelize.define('Guests', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Guests.associate = (models) => {
    Guests.hasMany(models.Reservations, { foreignKey: 'guestId' });
    Guests.hasMany(models.GuestEmail, { foreignKey: 'guestId' });
    Guests.hasMany(models.GuestPhoneNumber, { foreignKey: 'guestId' });
  };

  return Guests;
};
