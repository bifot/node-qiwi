const { expect } = require('chai')
const Qiwi = require('../src/Qiwi')

const wallet = new Qiwi(process.env.TOKEN)

describe('QIWI', () => {
  it('GET profile', async () => {
    const profile = await wallet.getProfile()
    const { authInfo, contractInfo, userInfo } = profile

    expect(profile).to.be.a('object').to.have.keys([
      'authInfo',
      'contractInfo',
      'userInfo'
    ])
    expect(authInfo).to.be.a('object').to.have.keys([
      'personId',
      'pinInfo',
      'passInfo',
      'registrationDate',
      'boundEmail',
      'ip',
      'lastLoginDate',
      'mobilePinInfo'
    ])
    expect(contractInfo).to.be.a('object').to.have.keys([
      'contractId',
      'creationDate',
      'features',
      'identificationInfo',
      'blocked'
    ])
    expect(userInfo).to.be.a('object').to.have.keys([
      'defaultPayAccountAlias',
      'defaultPayCurrency',
      'defaultPaySource',
      'firstTxnId',
      'language',
      'operator',
      'phoneHash'
    ])
  })

  it('GET balance', async () => {
    const balance = await wallet.getBalance()

    expect(balance).to.be.a('array')

    balance.forEach((item) => {
      expect(item).to.be.a('object').to.have.keys([
        'alias',
        'fsAlias',
        'title',
        'type',
        'hasBalance',
        'balance',
        'currency'
      ])
    })
  })

  it('GET history', async () => {
    const { contractInfo: { contractId } } = await wallet.getProfile()
    const history = await wallet.getHistory(contractId)

    expect(history).to.be.a('array')

    history.forEach((item) => {
      expect(item).to.be.a('object').to.have.keys([
        'txnId',
        'personId',
        'date',
        'errorCode',
        'error',
        'status',
        'type',
        'statusText',
        'trmTxnId',
        'account',
        'sum',
        'commission',
        'total',
        'provider',
        'source',
        'comment',
        'currencyRate',
        'extras',
        'chequeReady',
        'bankDocumentAvailable',
        'bankDocumentReady',
        'repeatPaymentEnabled',
        'favoritePaymentEnabled',
        'regularPaymentEnabled'
      ])
    })
  })

  it('SEND payment', async () => {
    const payment = await wallet.sendPayment(1, '37253676697', 'This is comment')

    expect(payment).to.be.a('object').to.have.keys([
      'id',
      'terms',
      'fields',
      'sum',
      'transaction',
      'comment',
      'source'
    ])
  })
})
