# BigBazar Ecommerce System

It is an AI based Multivendor Ecommerce system.Where customers can buy anything easily,vendors can make a profitable business in a secure environment.

## Acknowledgements

- [Awesome Ui/Ux design](https:#)
- [Fast loading tamplates](https:#)
- [AI based market research facilities](https:#)
- [Faster supply chain procedure](https:#)
- [High Secure accounts](https:#)

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

## Installation

Install my-project with npm

```bash
  cd API
  npm init
  npm start/
  npm run dev
```

## API Reference

#### Users Authentication

##### User registration

```http
  POST /api/auth/register
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `api_key` | `string` | none        |

##### User login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `api_key` | `string` | none        |

We use Cryptojs for encrypting password and JWT tokens,secure variables in `.env` file to make more secure our accounts.
When user send any login request to database a token will be provided to client and they use those tokens for login and other feature activities.

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### const verifyToken = (req, res, next)

Takes token from request header and verifies it.

#### Products

```http
  GET  /api/product
  GET  /api/product/${id}
  PUT  /api/product/${id}
  DEL  /api/product/${id}
  POST /api/product/addproduct
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Orders List

```http
  GET  /api/order/
  GET  /api/order/${id}
  PUT  /api/order/${id}
  DEL  /api/order/${id}
  POST /api/order/addOrder
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Categories

```http
  GET  /api/categories/
  GET  /api/categories/${id}
  PUT  /api/categories/${id}
  DEL  /api/categories/${id}
  POST /api/categories/addcategories
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Reviews

```http
  GET  /api/reviews/
  GET  /api/reviews/${id}
  PUT  /api/reviews/${id}
  DEL  /api/reviews/${id}
  POST /api/reviews/addreviews
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Cart Items

```http
  GET  /api/cartItems/
  GET  /api/cartItems/${id}
  PUT  /api/cartItems/${id}
  DEL  /api/cartItems/${id}
  POST /api/cartItems/addCart
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Search Items

```http
  GET  /api/searchItems/
  GET  /api/searchItems/${id}
  PUT  /api/searchItems/${id}
  DEL  /api/searchItems/${id}
  POST /api/searchItems/addSearchItems
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### _const verifyTokenAndAdmin = (req, res, next) => {}_

This function mainly authorize admin .Admin is superuser of that system and they can edit,update,delete,add,query all elements and administrative works to operate this system fluently.

#### _const verifyTokenAndvendor = (req, res, next) => {}_

Vendors are important users of a ecommerce system .They create shops and showcase their product,sell them to customers .This function mainly authorize vendors and allows them to do their job.Customers and Admins profiles are different from vendors .This function differs them , ensure real vendors and their authorize jobs.

All routes are checked by `middleware` functions. **verifyTokenAndAdmin** and **verifyTokenAndvendor** are `middleware` functions.

## Authors

- [@Md Salah Uddin](https://github.com/MdsalahUddin313)
- [@Shahjalal Mohammad Yakub](https:#)
- [@Sanaullah Said](https://github.com/#)
- [@Farhan Tridip](https://github.com/#)

## Licenses

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![ISC License](https://img.shields.io/badge/license-ICS%20v3-orange.svg)](https://opensource.org/licenses/)
