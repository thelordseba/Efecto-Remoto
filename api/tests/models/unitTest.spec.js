const { Product, conn } = require('../../src/db.js');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists 
} = require('sequelize-test-helpers') 
const UserModel = require('../../src/models/User');
const { expect } = require('chai');
const User = require('../../src/models/User');
const Ngo = require('../../src/models/Ngos');
const Order = require('../../src/models/Order');

describe('Order Model', () => {
  const Order = UserModel(sequelize, dataTypes)
  const order = new Order()
 
  context('properties', () => {
    ;['startDate', 'completionDate', 'transactionAmount', 'status', 
    'rating', 'review', 'paymentStatus', 'PaymentStatusDetail', 'cardExpMonth',
     'cardExpYear', 'lastFourDigits', 'recurringPayment', 'paymentMethodID',
     'paymentTypeId', 'initPoint'].forEach(checkPropertyExists(order))
  })

})

describe('Ngos Model', () => {
  const Ngo = UserModel(sequelize, dataTypes)
  const ngo = new Ngo()
 
  checkModelName(Ngo)('ngo')
 
  context('properties', () => {
    ;['name', 'description', 'url'].forEach(checkPropertyExists(ngo))
  })
  // context('validate', () => {
  //   ;['url'].forEach(checkPropertyExists(ngo))
  // })
})

describe('User Model', () => {
  const User = UserModel(sequelize, dataTypes)
  const user = new User()
 
  checkModelName(User)('user')
 
  context('properties', () => {
    ;['userName', 'firstName', 'lastName', 'isAdmin', 'email', 
    'telephone', 'password', 'gmailId', 'facebookId'].forEach(checkPropertyExists(user))
  })
})

describe('User model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Product.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Product.create({
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Product.create({ name: 'Producto' });
      });
    });
  });
});


