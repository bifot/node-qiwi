[![node-qiwi](https://img.shields.io/npm/v/node-qiwi.svg?style=flat-square)](https://www.npmjs.com/package/node-qiwi/)
[![node-qiwi](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# node-qiwi

API for Qiwi Wallet.

## Install

```sh
$ npm i node-qiwi
```

## Tests

```sh
$ npm test
```

## Docs

* [constructor(key)](#constructorkey)
* [.getProfile(settings)](#getprofilesettings) ⇒ `[Promise]`
* [.getBalance()](#getbalance) ⇒ `[Promise]`
* [.getHistory(contractId, settings)](#gethistorycontractid-settings) ⇒ `[Promise]`
* [.getIdentification(contractId, body)](#getidentificationcontractid-body) ⇒ `[Promise]`
* [.getTransactionsStats(contractId, settings)](#gettransactionsstatscontractid-settings) ⇒ `[Promise]`
* [.getTransaction(transactionId, settings)](#gettransaction-transactionid-settings) ⇒ `[Promise]`
* [.sendPayment(amount, account, comment)](#sendpaymentamount-account-comment) ⇒ `[Promise]`

### constructor(key)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| key        | string    | yes       | Access token for call API methods |

Create wallet.

### .getProfile(settings)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| settings   | object    | no        | Extra settings ([see](https://developer.qiwi.com/ru/qiwi-wallet-personal/#profile)) |

Get profile.

### .getBalance()

Get balance of all accounts.

### .getHistory(contractId, settings)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| contractId | string    | yes       | Wallet's contractId |
| settings   | object    | no        | Extra settings ([see](https://developer.qiwi.com/ru/qiwi-wallet-personal/#payments_history)) |

```js
const { contractInfo: { contractId } } = await wallet.getProfile()
const history = await wallet.getHistory(contractId)
```

Get history.

### .getIdentification(contractId, body)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| contractId | string    | yes       | Wallet's contractId |
| body       | object    | yes       | Identification's data |

```js
const identification = await wallet.getIdentification(contractId, {
  firstName: 'Иван',
  lastName: 'Иванов',
  middleName: 'Иванович',
  birthDate: '1998-02-11',
  passport: 4400111222
})
```

Get identification.

### .getTransactionsStats(contractId, settings)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| contractId | string    | yes       | Wallet's contractId |
| settings   | object    | yes       | Extra settings |
| settings.startDate | date    | yes       | Start date |
| settings.endDate | date    | yes       | End date |

```js
const stats = await wallet.getTransactionsStats(contractId, {
  startDate,
  endDate
})
```

Get transaction stats.

### .getTransaction(transactionId, settings)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| transactionId | string    | yes       | Wallet's contractId |
| settings   | object    | no        | Extra settings |

```js
const [ operation ] = await wallet.getHistory(contractId)
const { txnId: transactionId, type } = operation
const transaction = await wallet.getTransaction(transactionId, { type })
```

Get transaction.

### .sendPayment(amount, account, comment)

| Parameter  | Type          | Requried  | Description  |
|:-----------:|:-------------:|:---------:|:------------:|
| amount     | number/string | yes       | Transaction amount     |
| account    | number/string | yes       | Recipient's account    |
| comment    | string        | no        | Comment to transaction |

Send payment.

## License

MIT.
