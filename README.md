



[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)



# Twitter-Trends

This api collects twitter trends around the world, or you can collect trends country based 


## API Reference

#### Get all items

```http
GET /
```

| Parameter | Type     | Description                |            |Optional|
| :-------- | :------- | :------------------------- |            |;-------|
| `No Parameter` | `string` | Collects worldwide twitter trend | | False  |
|`Limit`         | `int`    | Limit the data entry             | | True   |


#### Get item

```http
GET /trend/${country}
```

| Parameter | Type     | Description                       |                  |Optional|
| :-------- | :------- | :-------------------------------- |                  |;-------|
| `country` | `string` | Collects twitter trends from selected country |      | False  |
|`Limit`         | `int`    | Limit the data entry                     |      | True   |

```http
GET /getinfo/${country}/${trend}
```
|Parameter | Type | Description |
|:---------|------|-------------|
|`coutry`,`trend`  |`string`|`more info about trend`|

```http
POST /findTrend/:country
```
|Parameter | Type | Description |
|:---------|------|-------------|
|`coutry`,`trend`  |`string`|`more info about trend`|
You have to send json file which you want to find specific trends

## Installation

Install my-project with npm

```bash
  npm install tweet-trend
  cd tweet-trend
```
    
