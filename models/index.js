const CyclicDb = require('@cyclic.sh/dynamodb');
module.exports = CyclicDb(process.env.CYCLIC_DB);
