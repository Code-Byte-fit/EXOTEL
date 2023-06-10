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
    },
    Identification:{
      type:DataTypes.STRING,
      allowNull:true,
    }
  }, {
    timestamps: false
  });

  Guests.associate = (models) => {
    Guests.hasMany(models.Reservations, { foreignKey: 'guestId' });
  };

  return Guests;
};