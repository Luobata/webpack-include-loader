## Webpack-include-loader

a webpack include loader for some synax not support include like .md

### Installation

```js
npm install --save-dev webpack-include-loader
```

### Demo

```markdown
### Include-loader-demo

webpack include loader

$$('./file/a.md')
```



## Options

| key   | type   | default         | explain                                  |
| ----- | ------ | --------------- | ---------------------------------------- |
| token | RegExp | /\$\$\((.*)\)/g | match the string $$('include file path') |

