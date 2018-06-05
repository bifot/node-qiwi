[![node-qiwi](https://img.shields.io/npm/v/node-qiwi.svg?style=flat-square)](https://www.npmjs.com/package/node-qiwi/)

# node-qiwi

API for Qiwi Wallet.

## Install

```sh
$ npm i node-qiwi -S
```

## Tests

```sh
$ npm test
```

## Docs

* [constructor(key)](#constructorkey)
* [.getProfile(settings)](#getprofilesettings) ⇒ `[Promise]`
* [.getBalance()](#getbalance) ⇒ `[Promise]`
* [.getHistory(settings)](#gethistorysettings) ⇒ `[Promise]`
* [.getIdentification(body)](#getidentificationbody) ⇒ `[Promise]`
* [.getTransactionsStats(settings)](#gettransactionsstatssettings) ⇒ `[Promise]`
* [.getTransaction(transactionId, settings)](#gettransaction-transactionid-settings) ⇒ `[Promise]`
* [.sendPayment(amount, account, comment)](#sendpaymentamount-account-comment) ⇒ `[Promise]`

### constructor(key)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| key        | string    | yes       | Access token |

```js
const Qiwi = require('node-qiwi')

const wallet = new Qiwi(process.env.TOKEN)
```

Create API's instance.

### .getProfile(settings)

```js
const profile = await wallet.getProfile()
```

Get profile.

### .getBalance()

```js
const balance = await wallet.getBalance()
```

Get balance.

### .getHistory(settings)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| settings   | object    | no        | Settings |
| settings.rows | number | no | Count of rows |
| settings.operation | string | no | Operations type |
| settings.sources | array[string] | no | Operations sources |
| settings.startDate | date    | no       | Start date |
| settings.endDate | date    | no      | End date |

```js
const history = await wallet.getHistory({
  rows: 50,
  operation: 'ALL',
  sources: [
    'QW_RUB'
  ],
  startDate: new Date(),
  endDate: new Date()
})
```

Get history.

### .getIdentification(body)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| body       | object    | yes       | Identification's data |

```js
const identification = await wallet.getIdentification({
  firstName: 'Иван',
  lastName: 'Иванов',
  middleName: 'Иванович',
  birthDate: '1998-02-11',
  passport: 4400111222
})
```

Get identification.

### .getTransactionsStats(settings)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| settings   | object    | yes       | Settings |
| settings.startDate | date    | yes       | Start date |
| settings.endDate | date    | yes       | End date |
| settings.operation | string | no | Operations type |
| settings.sources | array[string] | no | Operations sources |

```js
const stats = await wallet.getTransactionsStats({
  startDate: new Date(),
  endDate: new Date(),
  operation: 'ALL',
  sources: [
    'QW_RUB'
  ]
})
```

Get transaction stats.

### .getTransaction(transactionId, settings)

| Parameter  | Type      | Requried  | Description  |
|:-----------:|:---------:|:---------:|:------------:|
| transactionId | string    | yes       | Transaction's id |
| settings   | object    | no        |  Settings |
| settings.type   | string    | no        | Transaction's type |

```js
const transaction = await wallet.getTransaction('9112223344', {
  type: 'OUT'
})
```

Get transaction.

### .sendPayment(amount, account, comment)

| Parameter  | Type          | Requried  | Description  |
|:-----------:|:-------------:|:---------:|:------------:|
| amount     | number/string | yes       | Transaction amount     |
| account    | number/string | yes       | Recipient's account    |
| comment    | string        | no        | Comment to transaction |

```js
const payment = await wallet.sendPayment(1, 37253676697, 'This is comment')
```

Send payment.

## License

MIT.
