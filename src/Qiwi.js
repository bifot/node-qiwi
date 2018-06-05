const axios = require('axios')

class Qiwi {
  constructor (key) {
    this.axios = axios.create({
      baseURL: 'https://edge.qiwi.com',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      }
    })
  }

  async getContractId () {
    // Если айди контракта уже записан, то просто возвращаем его
    if (this.contractId) {
      return this.contractId
    }

    const { contractInfo } = await this.getProfile()

    this.contractId = contractInfo.contractId

    return contractInfo.contractId
  }

  async getIdentification (body) {
    try {
      const contractId = await this.getContractId()
      const { data: identification } = await this.axios.post(
        `/identification/v1/persons/${contractId}/identification`,
        body
      )

      return identification
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getHistory (settings) {
    try {
      const contractId = await this.getContractId()
      const { data: history } = await this.axios.get(
        `/payment-history/v1/persons/${contractId}/payments`,
        {
          params: {
            rows: 50,
            ...settings
          }
        }
      )

      return history.data
    } catch (err) {
      throw err
    }
  }

  async getTransactions (settings = {}) {
    try {
      if (!settings.startDate) {
        throw {
          code: 500,
          message: 'startDate is required param'
        }
      } else if (!settings.endDate) {
        throw {
          code: 500,
          message: 'endDate is required param'
        }
      }

      const contractId = await this.getContractId()
      const { data: stats } = await this.axios.get(
        `/payment-history/v1/persons/${contractId}/payments/total`,
        {
          params: settings
        }
      )

      return stats
    } catch (err) {
      throw err
    }
  }

  async getTransaction (transactionId, settings = {}) {
    try {
      if (!settings.type) {
        throw {
          code: 500,
          message: 'type is required param'
        }
      }

      const { data: transaction } = await this.axios.get(
        `/payment-history/v1/transactions/${transactionId}`,
        {
          params: settings
        }
      )

      return transaction
    } catch (err) {
      throw err
    }
  }

  async getProfile (settings) {
    try {
      const { data: profile } = await this.axios.get(
        '/person-profile/v1/profile/current',
        {
          params: settings
        }
      )

      return profile
    } catch (err) {
      throw err
    }
  }

  async getBalance () {
    try {
      const { data } = await this.axios.get('/funding-sources/v1/accounts/current')

      return data.accounts
    } catch (err) {
      throw err
    }
  }

  async sendPayment (amount, account, comment) {
    try {
      const { data: payment } = await this.axios.post(
        '/sinap/api/v2/terms/99/payments',
        {
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
        }
      )

      return payment
    } catch (err) {
      throw err
    }
  }
}

module.exports = Qiwi
