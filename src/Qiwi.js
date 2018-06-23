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
    if (this.contractId) {
      return this.contractId
    }

    const { contractInfo } = await this.getProfile()

    this.contractId = contractInfo.contractId

    return contractInfo.contractId
  }

  async getIdentification (body) {
    const contractId = await this.getContractId()
    const { data: identification } = await this.axios.post(
      `/identification/v1/persons/${contractId}/identification`,
      body
    )

    return identification
  }

  async getHistory (settings) {
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
  }

  async getTransactions (settings = {}) {
    if (!settings.startDate) {
      throw new Error('startDate is required param')
    } else if (!settings.endDate) {
      throw new Error('endDate is required param')
    }

    const contractId = await this.getContractId()
    const { data: stats } = await this.axios.get(
      `/payment-history/v1/persons/${contractId}/payments/total`,
      {
        params: settings
      }
    )

    return stats
  }

  async getTransaction (transactionId, settings = {}) {
    if (!settings.type) {
      throw new Error('type is required param')
    }

    const { data: transaction } = await this.axios.get(
      `/payment-history/v1/transactions/${transactionId}`,
      {
        params: settings
      }
    )

    return transaction
  }

  async getProfile (settings) {
    const { data: profile } = await this.axios.get(
      '/person-profile/v1/profile/current',
      {
        params: settings
      }
    )

    return profile
  }

  async getBalance () {
    const { data } = await this.axios.get('/funding-sources/v1/accounts/current')

    return data.accounts
  }

  async sendPayment (amount, account, comment) {
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
  }

  async createWebhook (url, type) {
    const { data } = await this.axios.put('/payment-notifier/v1/hooks', null, {
      params: {
        hookType: 1,
        param: url,
        txnType: type
      }
    })

    return data
  }

  async deleteWebhook (id) {
    const { data } = await this.axios.delete(`/payment-notifier/v1/hooks/${id}`)

    return data
  }

  async getWebhookSecretKey (id) {
    const { data } = await this.axios.get(`/payment-notifier/v1/hooks/${id}/key`)

    return data.key
  }

  async updateWebhookSecretKey (id) {
    const { data } = await this.axios.post(`/payment-notifier/v1/hooks/${id}/newkey`)

    return data.key
  }

  async getActiveWebhooks () {
    const { data } = await this.axios.get('/payment-notifier/v1/hooks/active')

    return data
  }

  async sendWebhookTest () {
    const { data } = await this.axios.get('/payment-notifier/v1/hooks/test')

    return data
  }
}

module.exports = Qiwi
