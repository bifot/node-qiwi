const rp = require('request-promise')

module.exports = class Qiwi {
  constructor (key) {
    this.key = key
    this.baseUrl = 'https://edge.qiwi.com/'
  }

  handlerError (err) {
    const { code, message } = err

    if (code === 500 && message !== undefined) {
      return { error: message }
    }

    const { error } = err
    return { error }
  }

  async getIdentification (contractId, body) {
    const { baseUrl, key } = this

    try {
      const identification = await rp({
        baseUrl,
        url: `/identification/v1/persons/${contractId}/identification`,
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body,
        json: true
      })

      return identification
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

  async getTransactionsStats (contractId, settings = {}) {
    const { baseUrl, key } = this
    const { startDate, endDate } = settings

    try {
      if (!startDate) {
        throw {
          code: 500,
          message: 'startDate is required param'
        }
      } else if (!endDate) {
        throw {
          code: 500,
          message: 'endDate is required param'
        }
      }

      const stats = await rp({
        baseUrl,
        url: `/payment-history/v1/persons/${contractId}/payments/total`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        qs: settings,
        json: true
      })

      return stats
    } catch (err) {
      return this.handlerError(err)
    }
  }

  async getTransaction (transactionId, settings = {}) {
    const { baseUrl, key } = this
    const { type } = settings

    try {
      if (!type) {
        throw {
          code: 500,
          message: 'type is required param'
        }
      }

      const transaction = await rp({
        baseUrl,
        url: `/payment-history/v1/transactions/${transactionId}`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        qs: settings,
        json: true
      })

      return transaction
    } catch (err) {
      return this.handlerError(err)
    }
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
          id: String(Date.now()),
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
