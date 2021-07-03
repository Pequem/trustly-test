# Trustly Teste

## Install and Run
- Clone this repo
- Run 'npm install'
- Run 'npm start'

## Usage

### POST /

**Request**

Headers

    Content-Type: application/json


body

    {
        "url": "repository url"
    }

    

**Response**

body

    [
        {
            "extension": string,
            "count": number,
            "lines: number,
            "bytes": number
        }
    ]

### cURL Example

```
curl --location --request POST 'localhost' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://github.com/Pequem/Estrutura-de-Dados-1---Compactador"
}'
```

