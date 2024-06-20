## Usage
App uses X_API_KEY token stored in .env file. 
You need to create .env file with token.
Token format: 
```
X_API_KEY = XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX
```

Otherwise, app can't get films info. You can get free token at https://api.kinopoisk.dev/documentation#/.
## Install

```sh
npm install
```



Dev mode:
```sh
npm run dev
```
Prod mode:
```sh
npm install -g serve
npm run build-prod
npx serve dist
```

## Author
* Github: [@mishns](https://github.com/mishns)
