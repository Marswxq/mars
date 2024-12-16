# Vue组件高度宽度

元素：

```html
<div ref="demo"></div> 
```

## 获取demo的高度

```js
this.$refs.demo.offsetHeight;
```

带单位的高度：

```js
window.getComputedStyle(this.$refs.init).height; 
```

## 获取demo的宽度

```js
this.$refs.demo.offsetWidth;
```

