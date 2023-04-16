module.exports=(sequelize, Datatypes)=>{
    const Feedback = sequelize.define('Feedback', {
        FeedbackId: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
          },
        hospitality: {
          type: Datatypes.INTEGER,
          allowNull: false
        },
        hygiene: {
          type: Datatypes.INTEGER,
          allowNull: false
          
        },
        food: {
          type: Datatypes.INTEGER,
          allowNull: false
        },
        facilities: {
          type: Datatypes.INTEGER,
          allowNull: false
        },
        rooms: {
          type: Datatypes.INTEGER,
          allowNull: false
        }
      });

      return Feedback;
    };
      