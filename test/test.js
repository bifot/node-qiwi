const { expect } = require('chai')
const Qiwi = require('../src/Qiwi')

const wallet = new Qiwi(process.env.TOKEN)

describe('QIWI', function () {
  this.timeout(5000)

  it('GET identification', async () => {
    const { contractInfo: { contractId } } = await wallet.getProfile()
    const identification = await wallet.getIdentification(contractId, {
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      birthDate: '1998-02-11',
      passport: 4400111222
    })

    expect(identification)
      .to.be.a('object')
      .to.have.all.keys([
        'id',
        'firstName',
        'middleName',
        'lastName',
        'birthDate',
        'passport',
        'inn',
        'snils',
        'oms',
        'type'
      ])
  })

  it('GET history', async () => {
    const { contractInfo: { contractId } } = await wallet.getProfile()
    const history = await wallet.getHistory(contractId)

    expect(history).to.be.a('array')

    history.forEach((item) => {
      expect(item)
        .to.be.a('object')
        .to.have.keys([
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

  it('GET transactions stats', async () => {
    const startDate = new Date()
    const endDate = new Date()

    startDate.setDate(1)

    const { contractInfo: { contractId } } = await wallet.getProfile()
    const stats = await wallet.getTransactionsStats(contractId, {
      startDate,
      endDate
    })

    expect(stats)
      .to.be.a('object')
      .to.have.all.keys([ 'incomingTotal', 'outgoingTotal' ])
  })

  it('GET transaction', async () => {
    const { contractInfo: { contractId } } = await wallet.getProfile()
    const [ transaction ] = await wallet.getHistory(contractId)
    const { txnId, type } = transaction
    const transactionData = await wallet.getTransaction(txnId, { type })

    expect(transaction)
      .to.be.a('object')
      .to.have.all.keys([
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

  it('GET profile', async () => {
    const profile = await wallet.getProfile()
    const { authInfo, contractInfo, userInfo } = profile

    expect(profile)
      .to.be.a('object')
      .to.have.keys([
        'authInfo',
        'contractInfo',
        'userInfo'
      ])
    expect(authInfo)
      .to.be.a('object')
      .to.have.keys([
        'personId',
        'pinInfo',
        'passInfo',
        'registrationDate',
        'boundEmail',
        'ip',
        'lastLoginDate',
        'mobilePinInfo'
      ])
    expect(contractInfo)
      .to.be.a('object')
      .to.have.keys([
        'contractId',
        'creationDate',
        'features',
        'identificationInfo',
        'blocked'
      ])
    expect(userInfo)
      .to.be.a('object')
      .to.have.keys([
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
      expect(item)
        .to.be.a('object')
        .to.have.keys([
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
