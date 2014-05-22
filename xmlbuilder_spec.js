require('./bdd.js')
XMLBuilder = require('./xmlbuilder.js').XMLBuilder

describe('XMLBuilder', function () {
  it('can create a simple tag', function () {
    assert.equal(XMLBuilder.t('foo').toString(), '<foo></foo>')
  })
})
