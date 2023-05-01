const { renameComponents } = require('../../helpers');

module.exports = {
  meta: { fixable: 'code' },
  create: renameComponents(
    { 'FirstName': 'SecondName' }
  )
};