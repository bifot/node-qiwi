const { expect } = require('chai')
const Qiwi = require('../src/Qiwi')

const wallet = new Qiwi(process.env.TOKEN)

describe('wallet', () => {
  it('get profile', async () => {
    const profile = await wallet.getProfile()

    expect(profile).to.be.a('object')
    // TODO: expect to be json schema...
  })

  it('get identification', async () => {
    const identification = await wallet.getIdentification({
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      birthDate: '1998-02-11',
      passport: '4400111222',
      inn: '1234567890',
      snils: '1234567890',
      oms: '1234567890'
    })

    expect(identification).to.be.a('object')
    // TODO: expect to be json schema...
  })

  it('get history', async () => {
    const history = await wallet.getHistory()

    expect(history).to.be.a('array')
    // TODO: expect to be json schema...
  })

  it('get transactions stats', async () => {
    const startDate = new Date()
    const endDate = new Date()

    startDate.setDate(1)

    const stats = await wallet.getTransactionsStats({
      startDate,
      endDate
    })

    expect(stats).to.be.a('object')
    // TODO: expect to be json schema...
  })

  it('get transaction', async () => {
    const [ transaction ] = await wallet.getHistory()
    const { txnId: transactionId, type } = transaction
    const transactionData = await wallet.getTransaction(transactionId, { type })

    expect(transactionData).to.be.a('object')
    // TODO: expect to be json schema...
  })

  it('get balance', async () => {
    const balance = await wallet.getBalance()

    expect(balance).to.be.a('array')
    // TODO: expect to be json schema...
  })

  it('send payment', async () => {
    const payment = await wallet.sendPayment(1, '37253676697', 'Hello, world!')

    expect(payment).to.be.a('object')
    // TODO: expect to be json schema...
  })
})
