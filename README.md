



[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)



# Twitter-Trends

This api collects twitter trends around the world, or you can collect trends country based 


## API Reference

#### Get all items

```http
  GET /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `No Parameter` | `string` | Collects worldwide twitter trend |

#### Get item

```http
  GET /trend/${country}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `country` | `string` | Collects twitter trends from selected country |

```http
GET /getinfo/${country}/${trend}
```
|Parameter | Type | Description |
|:---------|------|-------------|
|`coutry`,`trend`  |`string`|`more info about trend`|



## Installation

Install my-project with npm

```bash
  npm install tweet-trend
  cd tweet-trend
```
    