const rp = require('request-promise')

module.exports = class Qiwi {
  constructor (key) {
    this.key = key
    this.baseUrl = 'https://edge.qiwi.com/'
  }

  handlerError (err) {
    const { message: error } = err.error
    return { error }
  }

  async getProfile (settings) {
    const { baseUrl, key } = this

    try {
      const profile = await rp({
        baseUrl,
        url: '/person-profile/v1/profile/current',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        qs: settings,
        json: true
      })

      return profile
    } catch (err) {
      return this.handlerError(err)
    }
  }

  async getBalance () {
    const { baseUrl, key } = this

    try {
      const { accounts } = await rp({
        baseUrl,
        url: '/funding-sources/v1/accounts/current',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        json: true
      })

      return accounts
    } catch (err) {
      return this.handlerError(err)
    }
  }

  async getHistory (contractId, settings) {
    const { baseUrl, key } = this

    try {
      const { data } = await rp({
        baseUrl,
        url: `/payment-history/v1/persons/${contractId}/payments`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        qs: {
          rows: 50,
          ...settings
        },
        json: true
      })

      return data
    } catch (err) {
      return this.handlerError(err)
    }
  }

  async sendPayment (amount, account, comment) {
    const { baseUrl, key } = this

    try {
      const payment = await rp({
        baseUrl,
        url: '/sinap/api/v2/terms/99/payments',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: {
          id: String(new Date().getTime() * 1000),
          sum: {
            amount,
            currency: '643'
          },
          paymentMethod: {
            type: 'Account',
            accountId: '643'
          },
          fields: {
            account: String(account)
          },
          comment
        },
        json: true
      })

      return payment
    } catch (err) {
      return this.handlerError(err)
    }
  }
}
