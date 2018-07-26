const app = require('..');
const Main = require('apr-main');

exports.handler = async function() {
  return Main(async () => app());
}
