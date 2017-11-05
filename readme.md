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

### .sendPayment(amount, account, comment)

| Parameter  | Type          | Requried  | Description  | 
|:-----------:|:-------------:|:---------:|:------------:|
| amount     | number/string | yes       | Transaction amount     |
| account    | number/string | yes       | Recipient's account    |
| comment    | string        | no        | Comment to transaction |

Send payment.

## License

MIT.

