After trying to install all the dependencies required for solid-auth fetcher
I hit a wall after trying to replace crypto with 
[react-native-crypto](https://www.npmjs.com/package/react-native-crypto).

The code regarding webviews is just an attempt to open the code to login
in a browser and them redirect the user to our app via linking API, I don't
know if it works but I suspect it would not. I can't test because it doesn't
compile. 

```
SyntaxError: /home/uo269787/solid-react-native-tests/solid-auth-fetcher/node_modules/parse-asn1/node_modules/pbkdf2/lib/default-encoding.js: Unexpected token (5:36)

  3 | if (global.process && global.process.browser) {
  4 |   defaultEncoding = 'utf-8'
> 5 | } else if (global.process && global."v12.21.0") {
    |                                     ^
  6 |   var pVersionMajor = parseInt("v12.21.0".split('.')[0].slice(1), 10)
  7 |
  8 |   defaultEncoding = pVersionMajor >= 6 ? 'utf-8' : 'binary'
```