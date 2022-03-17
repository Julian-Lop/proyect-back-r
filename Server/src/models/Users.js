const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    sequelize.define('users',{
        Username : {
            type: DataTypes.STRING
        },
        Email : {
            type : DataTypes.STRING,
            unique: true
        },
        Password : {
            type : DataTypes.STRING
        }  
    },{
        hooks: {
         beforeCreate: async (users) => {
          if (users.Password) {
           const salt = await bcrypt.genSaltSync(10, 'a');
           users.Password = bcrypt.hashSync(users.Password, salt);
          }
         },
         beforeUpdate:async (users) => {
          if (users.password) {
           const salt = await bcrypt.genSaltSync(10, 'a');
           users.password = bcrypt.hashSync(users.Password, salt);
          }
         }
        },
        instanceMethods: {
         validPassword: (Password) => {
          return bcrypt.compareSync(Password, this.Password);
         }
        }
       })
}