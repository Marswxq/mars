# JavaScript 高级程序设计

## 语言基础

### 语法

#### 严格模式

ECMAScript 5 增加了严格模式（strict mode）的概念。
严格模式是一种不同的 JavaScript 解析和执行模型，ECMAScript 3 的一些不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。
要对整个脚本启用严格模式，在脚本开头加上这一行："use strict";

虽然看起来像个没有赋值给任何变量的字符串，但它其实是一个预处理指令。
任何支持的 JavaScript 引擎看到它都会切换到严格模式。
选择这种语法形式的目的是不破坏 ECMAScript 3 语法。

也可以单独指定一个函数在严格模式下执行，只要把这个预处理指令放到函数体开头即可：

```js
function doSomething() {
    "use strict";
    // 函数体
}
```

严格模式会影响 JavaScript 执行的很多方面，因此本书在用到它时会明确指出来。所有现代浏览器都支持严格模式。

### 变量

#### `var`和`let` 区别

1. 暂时性死区

`let`与`var`的另一个重要的区别，就是`let`声明的变量不会在作用域中被提升。

```js
// name会被提升
console.log(name); // undefined
var name = 'Matt';
// age不会被提升
console.log(age); // ReferenceError：age没有定义
let age = 26; 
```

在解析代码时，JavaScript 引擎也会注意出现在块后面的`let`声明，只不过在此之前不能以任何方式来引用未声明的变量。在let声明之前的执行瞬间被称为“暂时性死区”（temporal
dead zone），在此阶段引用任何后面才声明的变量都会抛出ReferenceError。

2. 全局声明与`var`关键字不同，使用`let`在全局作用域中声明的变量不会成为window对象的属性（`var`声明的变量则会）。

```js
var name = 'Matt';
console.log(window.name); // 'Matt' 
let age = 26;
console.log(window.age);  // undefined
```

不过，`let`声明仍然是在全局作用域中发生的，相应变量会在页面的生命周期内存续。因此，为了避免 SyntaxError ，必须确保页面不会重复声明同一个变量。

3. 条件声明在使用`var`声明变量时，由于声明会被提升，JavaScript 引擎会自动将多余的声明在作用域顶部合并为一个声明。因为`let`
   的作用域是块，所以不可能检查前面是否已经使用`let`声明过同名变量，同时也就不可能在没有声明的情况下声明它。

```html

<script>
    var name = 'Nicholas';
    let age = 26;
</script>
<script>
    // 假设脚本不确定页面中是否已经声明了同名变量
    // 那它可以假设还没有声明过
    var name = 'Matt';
    // 这里没问题，因为可以被作为一个提升声明来处理  
    // 不需要检查之前是否声明过同名变量
    let age = 36;
    // 如果age之前声明过，这里会报错
</script>
```

使用`try/catch`语句或`typeof`操作符也不能解决，因为条件块中`let`声明的作用域仅限于该块。

```html

<script>
    // 假设脚本不确定页面中是否已经声明了同名变量
    // 那它可以假设还没有声明过
    if (typeof name === 'undefined') {
        let name;
    }
    // name被限制在if {} 块的作用域内
    // 因此这个赋值形同全局赋值
    name = 'Matt';
    try {
        console.log(age);	 // 如果age没有声明过，则会报错
    } catch (error) {
        let age;
    }
    // age被限制在catch {}块的作用域内
    // 因此这个赋值形同全局赋值
    age = 26;
</script>
```

为此，对于`let`这个新的 ES6 声明关键字，不能依赖条件声明模式。

4. for循环中的`let`声明

在`let`出现之前，`for`循环定义的迭代变量会渗透到循环体外部

```js
for (var i = 0; i < 5; ++i) {
    // 循环逻辑
}
console.log(i); // 5 
```

改成使用`let`之后，这个问题就消失了，因为迭代变量的作用域仅限于`for`循环块内部

```js
for (let i = 0; i < 5; ++i) {
    // 循环逻辑
}
console.log(i); // ReferenceError: i
```

没有定义在使用`var`的时候，最常见的问题就是对迭代变量的奇特声明和修改

```js
for (var i = 0; i < 5; ++i) {
    setTimeout(() => console.log(i), 0)
}
// 你可能以为会输出0、1、2、3、4 
// 实际上会输出5、5、5、5、5 
```

之所以会这样，是因为在退出循环时，迭代变量保存的是导致循环退出的值：5。在之后执行超时逻辑时，所有的 i 都是同一个变量，因而输出的都是同一个最终值。

而在使用`let`声明迭代变量时，JavaScript 引擎在后台会为每个迭代循环声明一个新的迭代变量。每个`setTimeout`
引用的都是不同的变量实例，所以`console.log`输出的是我们期望的值，也就是循环执行过程中每个迭代变量的值。

### 数据类型

ECMAScript有6种简单数据类型（也称为原始类型）：`Undefined`、`Null`、`Boolean`、`Number`、`String`和`Symbol`。

#### `typeof` 操作符

```js
let message = "some string";
console.log(typeof message);    // "string" 
console.log(typeof (message));   // "string" 
console.log(typeof 95);         // "number"
```

| <div style="width: 100pt">类型</div> | <div style="width: 150pt">含义</div> |
|:-----------------------------------|:-----------------------------------|
| undefined                          | 未定义                                |
| boolean                            | 布尔值                                |
| string                             | 字符串                                |
| number                             | 数值                                 |
| object                             | 对象（而不是函数）或null                     |
| function                           | 函数                                 |
| symbol                             | 符号                                 |

#### 模板字面量

使用反引号 ` 标记的内容会保持原有的格式

```js
let myMultiLineString = 'first line\nsecond line';
let myMultiLinetemplateLiteral = `first line
second line`;
console.log(myMultiLineString);
// first line 
// second line" 
console.log(myMultiLinetemplateLiteral);
// first line 
// second line
console.log(myMultiLineString === myMultiLinetemplateLiteral);
// true
```

#### 字符串插值

模板字面量最常用的一个特性是支持字符串插值，也就是可以在一个连续定义中插入一个或多个值。
技术上讲，模板字面量不是字符串，而是一种特殊的 JavaScript 句法表达式，只不过求值后得到的是字符串。
模板字面量在定义时立即求值并转换为字符串实例，任何插入的变量也会从它们最接近的作用域中取值。

字符串插值通过在${}中使用一个 JavaScript 表达式实现：

```js
let value = 5;
let exponent = 'second';
// 以前，字符串插值是这样实现的：
let interpolatedString = value + ' to the ' + exponent + ' power is ' + (value * value);
// 现在，可以用模板字面量这样实现：
let interpolatedTemplateLiteral = `${value} to the ${exponent} power is ${value * value}`;
console.log(interpolatedString);           // 5 to the second power is 25 
console.log(interpolatedTemplateLiteral);  // 5 to the second power is 25 
```

#### 模板字面量标签函数

模板字面量也支持定义标签函数（tag function），而通过标签函数可以自定义插值行为。标签函数会接收被插值记号分隔后的模板和对每个表达式求值的结果。

标签函数本身是一个常规函数，通过前缀到模板字面量来应用自定义行为，如下例所示。标签函数接收到的参数依次是原始字符串数组和对每个表达式求值的结果。
这个函数的返回值是对模板字面量求值得到的字符串。

```js
let a = 6;
let b = 9;

function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
    console.log("strings:", strings);
    console.log("aValExpression:", aValExpression);
    console.log("bValExpression:", bValExpression);
    console.log("sumExpression:", sumExpression);
    return 'foobar';
}

let untaggedResult = `${a} + ${b} = ${a + b}`;
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`;
// strings: , + , = ,
// aValExpression: 6 
// bValExpression: 9 
// sumExpression: 15 
console.log(untaggedResult);
// "6 + 9 = 15" 
console.log(taggedResult);
// "foobar"
```

### 语句

#### for-in 语句

for-in语句是一种严格的迭代语句，用于枚举对象中的非符号键属性，语法如下：`for (property in expression) statement`

```js
for (const a in {a: 1, b: 2}) {
    console.log(a)
}
// a
// b
```

ECMAScript 中对象的属性是无序的，因此`for-in`语句不能保证返回对象属性的顺序。
换句话说， 所有可枚举的属性都会返回一次，但返回的顺序可能会因浏览器而异。

***注意：*** 如果`for-in`循环要迭代的变量是`null`或`undefined`，则不执行循环体。

#### for-of 语句

`for-of`语句是一种严格的迭代语句，用于遍历可迭代对象的元素，语法如下：`for (property of expression) statement`

```js
for (a of [{a: 1, b: 2}, {c: 3, d: 4}]) {
    console.log(JSON.stringify(a))
}
// {"a":1,"b":2}
// {"c":3,"d":4}
```

#### with 语句

`with` 语句的用途是将代码作用域设置为特定的对象，其语法是：`with (expression) statement;`

使用`with`语句的主要场景是针对一个对象反复操作，这时候将代码作用域设置为该对象能提供便利，如下面的例子所示：

```js
let protocol_ = location.protocol;
let hostName = location.hostname;
let url = location.href;
console.log(`protocol_:${protocol_},hostname:${hostName},url:${url}`);
// protocol_:https:,hostname:www.wetools.com,url:https://www.wetools.com/js-run
```

上面代码中的每一行都用到了location对象。如果使用with语句，就可以少写一些代码：

```js
with (location) {
    let protocol_ = protocol;
    let hostName = hostname;
    let url = href;
    console.log(`protocol_:${protocol_},hostname:${hostName},url:${url}`);
}
// protocol_:https:,hostname:www.wetools.com,url:https://www.wetools.com/js-run
```

这里，`with`语句用于连接 location 对象。
这意味着在这个语句内部，每个变量首先会被认为是一个局部变量。
如果没有找到该局部变量，则会搜索 location 对象，看它是否有一个同名的属性。
如果有，则该变量会被求值为 location 对象的属性。

***注意：*** 严格模式不允许使用with语句，否则会抛出错误。

#### 函数

不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值。

不指定返回值的函数实际上会返回特殊值`undefined`。

## 变量、作用域、内存

> JavaScript变量可以保存两种类型的值：原始值和引用值。
> 原始值可能是以下6种原始数据类型之一：`Undefined`、`Null`、`Boolean`、`Number`、`String`和`Symbol`。
> 原始值和引用值有以下特点。
> * 原始值大小固定，因此保存在栈内存上。
> * 从一个变量到另一个变量复制原始值会创建该值的第二个副本。
> * 引用值是对象，存储在堆内存上。
> * 包含引用值的变量实际上只包含指向相应对象的一个指针，而不是对象本身。
> * 从一个变量到另一个变量复制引用值只会复制指针，因此结果是两个变量都指向同一个对象。
> * `typeof`操作符可以确定值的原始类型，而`instanceof`操作符用于确保值的引用类型
>
> 任何变量（不管包含的是原始值还是引用值）都存在于某个执行上下文中（也称为作用域）。这个上下文（作用域）决定了变量的生命周期，以及它们可以访问代码的哪些部分。执行上下文可以总结如下。
> * 执行上下文分全局上下文、函数上下文和块级上下文。
> * 代码执行流每进入一个新上下文，都会创建一个作用域链，用于搜索变量和函数。
> * 函数或块的局部上下文不仅可以访问自己作用域内的变量，而且也可以访问任何包含上下文乃至全局上下文中的变量。
> * 全局上下文只能访问全局上下文中的变量和函数，不能直接访问局部上下文中的任何数据。
> * 变量的执行上下文用于确定什么时候释放内存。
>
> JavaScript是使用垃圾回收的编程语言，开发者不需要操心内存分配和回收。JavaScript的垃圾回收程序可以总结如下。
> * 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除。
> * 主流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存。
> * 引用计数是另一种垃圾回收策略，需要记录值被引用了多少次。JavaScript引擎不再使用这种算法，但某些旧版本的IE仍然会受这种算法的影响，原因是JavaScript会访问非原生JavaScript对象（如DOM元素）。
> * 引用计数在代码中存在循环引用时会出现问题。
> * 解除变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。为促进内存回收，全局对象、全局对象的属性和循环引用都应该在不需要时解除引用。

## 基本引用类型

### RegExp

#### 匹配模式的标记

* g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
* i：不区分大小写，表示在查找匹配时忽略pattern和字符串的大小写。
* m：多行模式，表示查找到一行文本末尾时会继续查找。
* y：粘附模式，表示只查找从 lastIndex 开始及之后的字符串。
* u：Unicode 模式，启用 Unicode 匹配。
* s：dotAll 模式，表示元字符.匹配任何字符（包括 \n 或 \r ）。

#### RegExp 实例属性

> 每个 RegExp 实例都有下列属性，提供有关模式的各方面信息。
>* global：布尔值，表示是否设置了g 标记。
>* ignoreCase：布尔值，表示是否设置了i 标记。
>* unicode：布尔值，表示是否设置了u 标记。
>* sticky：布尔值，表示是否设置了y 标记。
>* lastIndex：整数，表示在源字符串中下一次搜索的开始位置，始终从0开始。
>* multiline：布尔值，表示是否设置了m 标记。
>* dotAll：布尔值，表示是否设置了s 标记。
>* source：正则表达式的字面量字符串（不是传给构造函数的模式字符串），没有开头和结尾的斜杠。
>* flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没有前后斜杠）。

### 原始值包装类型

3种特殊的引用类型：Boolean、Number和String。

每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，从而暴露出操作原始值的各种方法。

```js
let s1 = "some text";
let s2 = s1.substring(2);
```

使用`new`调用原始值包装类型的构造函数，与调用同名的转型函数并不一样。

```js
let value = "25";
let number = Number(value);    // 转型函数
console.log(typeof number);    // "number" 
let obj = new Number(value);   // 构造函数
console.log(typeof obj);       // "object"

// 变量number中保存的是一个值为25的原始数值，而变量obj中保存的是一个Number的实例。
```

### Boolean

> Boolean是对应布尔值的引用类型。

 ```js
let falseObject = new Boolean(false);
// falseObject 是一个对象，对象在布尔表达式中都会自动转换为 true
let result = falseObject && true;
console.log(result); // true 

let falseValue = false;
result = falseValue && true;
console.log(result); // false
```

> 除此之外，原始值和引用值（Boolean对象）还有几个区别。
> 首先，`typeof`操作符对原始值返回`boolean`，但对引用值返回`object`。
> 同样，`Boolean`对象是`Boolean`类型的实例，在使用`instaceof`操作符时返回`true`，但对原始值则返回`false`，如下所示：

```js
console.log(typeof falseObject);             // object 
console.log(typeof falseValue);              // boolean 
console.log(falseObject instanceof Boolean); // true 
console.log(falseValue instanceof Boolean);  // false
```

> ***作者原话：理解原始布尔值和Boolean对象之间的区别非常重要，强烈建议永远不要使用后者。***

### Number

> 原始数值在调用`typeof`时始终返回`number`，而`Number`对象则返回`object`。类似地，`Number`对象是`Number`类型的实例，而原始数值不是。

### String

#### 字符串操作方法 `slice`、`substr`、`substring`

```js
let stringValue = "hello world";
console.log(stringValue.slice(3));       // "lo world" 
console.log(stringValue.substring(3));   // "lo world" 
console.log(stringValue.substr(3));      // "lo world" 
console.log(stringValue.slice(3, 7));    // "lo w" 
console.log(stringValue.substring(3, 7)); // "lo w" 
console.log(stringValue.substr(3, 7));   // "lo worl"
```

> 在这个例子中，`slice()`、`substr()`和`substring()`是以相同方式被调用的，而且多数情况下返回的值也相同。
> 如果只传一个参数3，则所有方法都将返回"lo world"，因为"hello"中"l"位置为3。
> 如果传入两个参数3和7，则`slice()`和`substring()`返回"lo w"（因为"world"中"o"在位置7，不包含），而substr()返回"lo worl"
> ，因为第二个参数对它而言表示返回的字符数。
>
> 当某个参数是负值时，这3个方法的行为又有不同。 比如，`slice()`方法将所有负值参数都当成字符串长度加上负参数值。
>
> 而`substr()`方法将第一个负参数值当成字符串长度加上该值，将第二个负参数值转换为0。`substring()`方法会将所有负参数值都转换为0。看下面的例子：

```js
let stringValue = "hello world";
console.log(stringValue.slice(-3));         // "rld" 
console.log(stringValue.substring(-3));     // "hello world" 
console.log(stringValue.substr(-3));        // "rld" 
console.log(stringValue.slice(3, -4));      // "lo w" 
console.log(stringValue.substring(3, -4));  // "hel" 
console.log(stringValue.substr(3, -4));     // "" (empty string)
```

> 这个例子明确演示了3个方法的差异。在给`slice()`和`substr()`
> 传入负参数时，它们的返回结果相同。这是因为-3会被转换为8（长度加上负参数），实际上调用的是`slice(8)`和`substr(8)`。
> 而`substring()`方法返回整个字符串，因为-3会转换为0。
>
> 在第二个参数是负值时，这3个方法各不相同。`slice()`方法将第二个参数转换为7，实际上相当于调用`slice(3, 7)`，因此返回"lo w"。
> 而`substring()`方法会将第二个参数转换为0，相当于调用`substring(3, 0)`，等价于`substring(0, 3)`，
> **这是因为这个方法会将较小的参数作为起点，将较大的参数作为终点**。
> 对`substr()`来说，第二个参数会被转换为0，意味着返回的字符串包含零个字符，因而会返回一个空字符串。

#### 字符串迭代与解构

字符串的原型上暴露了一个`@@iterator`方法，表示可以迭代字符串的每个字符

```js
let message = "abc";
let stringIterator = message[Symbol.iterator]();
console.log(JSON.stringify(stringIterator.next()));  // {value: "a", done: false} 
console.log(JSON.stringify(stringIterator.next()));  // {value: "b", done: false} 
console.log(JSON.stringify(stringIterator.next()));  // {value: "c", done: false} 
console.log(JSON.stringify(stringIterator.next()));  // {value: undefined, done: true}
```

有了这个迭代器之后，字符串就可以通过解构操作符来解构了。比如，可以更方便地把字符串分割为字符数组：

```js
for (const param of "abcde") {
    console.log(param)
}

// a
// b
// c
// d
// e
```

有了这个迭代器之后，字符串就可以通过解构操作符来解构了。比如，可以更方便地把字符串分割为字符数组：

```js
let message = "abcde";
console.log(typeof [...message]); // object
console.log([...message]); // "a", "b", "c", "d", "e"
console.log(JSON.stringify([...message])); // ["a","b","c","d","e"]
```

### 单例内置对象

#### `eval`方法

> `eval()` 方法可能是整个ECMAScript语言中最强大的。
> 这个方法就是一个完整的ECMAScript解释器，它接收一个参数，即一个要执行的ECMAScript（JavaScript）字符串。

> 当解释器发现`eval()`调用时，会将参数解释为实际的 ECMAScript 语句，然后将其插入到该位置。
> 通过`eval()`
> 执行的代码属于该调用所在上下文，被执行的代码与该上下文拥有相同的作用域链。这意味着定义在包含上下文中的变量可以在`eval()`
> 调用内部被引用。

**注意：** 通过`eval()`
定义的任何变量和函数都不会被提升，这是因为在解析代码的时候，它们是被包含在一个字符串中的。它们只是在`eval()`执行的时候才会被创建。

#### window 对象

> 当代码开始执行时，全局上下文中会存在两个内置对象：`Global`和`Math`。其中，`Global`对象在大多数 ECMAScript 实现中无法直接访问。
> 不过，浏览器将其实现为`window`对象。所有全局变量和函数都是`Global`对象的属性。
> `Math`对象包含辅助完成复杂计算的属性和方法。

```js
// 只能在浏览器中才会输出
var color = "red";

function sayColor() {
    console.log(window.color);
}

window.sayColor(); // "red"
```

## 集合引用类型

### 数组

#### 创建数组的两个静态方法

使用 `Array` 构造函数

```js
let colors = new Array();
// 初始定长数组
let colors = new Array(20);
let colors = Array(3);
// 初始值数组
let colors = new Array("red", "blue", "green");
let names = Array("Greg");
```

使用数组字面量（array literal）

```js
let colors = ["red", "blue", "green"];  // 创建一个包含3个元素的数组
let names = [];                         // 创建一个空数组
let values = [1, 2,];                    // 创建一个包含2个元素的数组
```

> **注意:** 与对象一样，在使用数组字面量表示法创建数组不会调用 Array 构造函数。

Array 构造函数还有两个 ES6 新增的用于创建数组的静态方法：`from()`和`of()`。`from()`用于将类数组结构转换为数组实例，而`of()`
用于将一组参数转换为数组实例。

```js
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]  

// 可以使用from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2)
    .set(3, 4);
const s = new Set().add(1)
    .add(2)
    .add(3)
    .add(4);
console.log(Array.from(m)); // [[1, 2], [3, 4]] 
console.log(Array.from(s)); // [1, 2, 3, 4] 

// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);
console.log(a1);        // [1, 2, 3, 4] 
console.log(a1 === a2); // false 

// 可以使用任何可迭代对象
const iter = {
    * [Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
};
console.log(Array.from(iter)); // [1, 2, 3, 4] 

// arguments对象可以被轻松地转换为数组
function getArgsArray() {
    return Array.from(arguments);
}

console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4] 

// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
};
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]
```

> `Array.from()`还接收第二个可选的映射函数参数。
> 这个函数可以直接增强新数组的值，而无须像调用`Array.from().map()`那样先创建一个中间数组。
> 还可以接收第三个可选参数，用于指定映射函数中`this`的值。但这个重写的`this`值在箭头函数中不适用。

```js
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x * this.exponent, {exponent: 2});
const a3 = Array.from(a1, function (x) {
    return x * this.exponent
}, {exponent: 2});
console.log(a2); // NaN,NaN,NaN,NaN
console.log(a3); // 2,4,6,8
```

解读下，第二个参数中的`this`等于第三个参数中的`{exponent: 2}`。

#### 数组空位

> ES6 新增的方法和迭代器与早期 ECMAScript 版本中存在的方法行为不同。ES6
> 新增方法普遍将这些空位当成存在的元素，只不过值为`undefined`

```js
const options = [1, , , , 5];
for (const option of options) {
    console.log(option === undefined);
}
// false 
// true 
// true
// true 
// false 

const a = Array.from([, , ,]); // 使用ES6的Array.from()创建的包含3个空位的数组
for (const val of a) {
    console.log(val === undefined);
}
// true 
// true 
// true

console.log(Array.of(...[, , ,])); // [undefined, undefined, undefined] 

for (const [index, value] of options.entries()) {
    console.log(value);
}
// 1 
// undefined 
// undefined 
// undefined 
// 5
```

> ES6 之前的方法则会忽略这个空位，但具体的行为也会因方法而异

```js
const options = [1, , , , 5];
// map()会跳过空位置
console.log(options.map(() => 6));  // [6, undefined, undefined, undefined, 6] 
// join()视空位置为空字符串
console.log(options.join('-'));     // "1----5"
```

> **注意:** 由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位。
> 如果确实需要空位，则可以显式地用`undefined`值代替。

#### 数组索引

> 要取得或设置数组的值，需要使用中括号并提供相应值的数字索引。

```js
let colors = ["red", "blue", "green"];
// 定义一个字符串数组
alert(colors[0]);                       // 显示第一项
colors[2] = "black";                    // 修改第三项
colors[3] = "brown";                    // 添加第四项
```

> 数组中元素的数量保存在`length`属性中，这个属性始终返回0或大于 0 的值。
> 数组length属性的独特之处在于，它不是只读的。通过修改length属性，可以从数组末尾删除或添加元素。

```js
let colors = ["red", "blue", "green"];
// 创建一个包含3个字符串的数组
colors.length = 2;
console.log(colors[2]);  					// undefined
console.log("arr length:", colors.length);   // 2
colors.length = 4;
console.log(colors[3]); 					// undefined
console.log("arr length:", colors.length);  	// 4
```

#### 检测数组

```js
let colors = ["red", "blue", "green"];

// instanceof 
console.log(value instanceof Array);

// Array.isArray()
console.log(Array.isArray(value));
```

> 使用`instanceof`的问题是假定只有一个全局执行上下文。
> 如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的`Array`构造函数。
> 如果要把数组从一个框架传给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。
>
> 为解决这个问题，ECMAScript 提供了`Array.isArray()`方法。
> 这个方法的目的就是确定一个值是否为数组，而不用管它是在哪个全局执行上下文中创建的。

#### 迭代器方法

> 在 ES6 中，`Array`的原型上暴露了3个用于检索数组内容的方法：`keys()`、`values()`和`entries()`。
> `keys()`返回数组索引的迭代器，`values()`返回数组元素的迭代器，而`entries()`返回索引/值对的迭代器。

```js
const a = ["foo", "bar", "baz", "qux"];
// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());
console.log(aKeys);     // [0, 1, 2, 3] 
console.log(aValues);   // ["foo", "bar", "baz", "qux"] 
console.log(aEntries);  // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

使用 ES6 解构方式在循环中拆分键/值对

```js
const a = ["foo", "bar", "baz", "qux"];
for (const [idx, element] of a.entries()) {
    console.log(idx);
    console.log(element);
}
// 0
// foo
// 1
// bar
// 2
// baz
// 3
// qux
```

#### 迭代方法

* every()：对数组每一项都运行传入的函数，如果对每一项函数都返回true，则这个方法返回true。

```js
const arr = [1, 2, 3, 4, 5];

let everyarr = arr.every((item, index, array) => {
    console.log("item", item);
    console.log("index", index);
    console.log("array", array);
    return item > 0;
})
console.log("everyarr", everyarr)

// item 1
// index 0
// array 1,2,3,4,5
// item 2
// index 1
// array 1,2,3,4,5
// item 3
// index 2
// array 1,2,3,4,5
// item 4
// index 3
// array 1,2,3,4,5
// item 5
// index 4
// array 1,2,3,4,5
// everyarr true
```

* filter()：对数组每一项都运行传入的函数，函数返回true的项会组成数组之后返回。

```js
const arr = [1, 2, 3, 4, 5];

let filterarr = arr.filter((item, index, array) => {
    console.log("item", item);
    console.log("index", index);
    console.log("array", array);
    return item > 2;
})
console.log("filterarr", filterarr)

// item 1
// index 0
// array 1,2,3,4,5
// item 2
// index 1
// array 1,2,3,4,5
// item 3
// index 2
// array 1,2,3,4,5
// item 4
// index 3
// array 1,2,3,4,5
// item 5
// index 4
// array 1,2,3,4,5
// filterarr 3,4,5
```

* forEach()：对数组每一项都运行传入的函数，没有返回值。

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach((item, index, array) => {
    console.log("item", item);
    console.log("index", index);
    console.log("array", array);
    return item > 2;
})

// item 1
// index 0
// array 1,2,3,4,5
// item 2
// index 1
// array 1,2,3,4,5
// item 3
// index 2
// array 1,2,3,4,5
// item 4
// index 3
// array 1,2,3,4,5
// item 5
// index 4
// array 1,2,3,4,5
```

* map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。

```js
const arr = [1, 2, 3, 4, 5];

let maparr = arr.map((item, index, array) => {
    console.log("item", item);
    console.log("index", index);
    console.log("array", array);
    return item * 2;
})

console.log("maparr", maparr);

// item 1
// index 0
// array 1,2,3,4,5
// item 2
// index 1
// array 1,2,3,4,5
// item 3
// index 2
// array 1,2,3,4,5
// item 4
// index 3
// array 1,2,3,4,5
// item 5
// index 4
// array 1,2,3,4,5
// maparr 2,4,6,8,10
```

* some()：对数组每一项都运行传入的函数，如果有一项函数返回true，则这个方法返回true。

```js
const arr = [1, 2, 3, 4, 5];

let somerarr = arr.some((item, index, array) => {
    console.log("item", item);
    console.log("index", index);
    console.log("array", array);
    return item > 2;
})
console.log("somerarr", somerarr)

//item 1
// index 0
// array 1,2,3,4,5
// item 2
// index 1
// array 1,2,3,4,5
// item 3
// index 2
// array 1,2,3,4,5
// somerarr true
```

**注意：** 这些方法都不改变调用它们的数组。

#### 归并方法

* reduce(): 从数组第一项开始遍历到最后一项。

```js
let values = [1, 2, 3, 4, 5];
let calcprocess;
let sum = values.reduce((prev, cur, index, array) => {
    calcprocess = index === 1 ? `${prev}+${cur}` : calcprocess + `=${prev}+${cur}`;
    console.log(`第${index}次循环，prev值：${prev}，cur值：${cur}，计算过程：${calcprocess}`)
    return prev + cur;
});
console.log("计算结果：", sum);

// 第1次循环，prev值：1，cur值：2，计算过程：1+2
// 第2次循环，prev值：3，cur值：3，计算过程：1+2=3+3
// 第3次循环，prev值：6，cur值：4，计算过程：1+2=3+3=6+4
// 第4次循环，prev值：10，cur值：5，计算过程：1+2=3+3=6+4=10+5
// 计算结果： 15
```

* reduceRight()：从最后一项开始遍历至第一项。

```js
let values = [1, 2, 3, 4, 5];
let calcprocess;
let sum = values.reduceRight((prev, cur, index, array) => {
    calcprocess = index === 3 ? `${prev}+${cur}` : calcprocess + `=${prev}+${cur}`;
    console.log(`第${Math.abs(index - 3)}次循环，prev值：${prev}，cur值：${cur}，计算过程：${calcprocess}`)
    return prev + cur;
});
console.log("计算结果：", sum)

// 第0次循环，prev值：5，cur值：4，计算过程：5+4
// 第1次循环，prev值：9，cur值：3，计算过程：5+4=9+3
// 第2次循环，prev值：12，cur值：2，计算过程：5+4=9+3=12+2
// 第3次循环，prev值：14，cur值：1，计算过程：5+4=9+3=12+2=14+1
// 计算结果： 15
```

### Map

> 作为 ECMAScript 6 的新增特性，`Map`是一种新的集合类型，为这门语言带来了真正的键/值存储机制。
> `Map`的大多数特性都可以通过`Object`类型实现，但二者之间还是存在一些细微的差异。
> 具体实践中使用哪一个，还是值得细细甄别。

使用new关键字和Map构造函数可以创建一个空映射

```js
const m = new Map(); 
```

> 如果想在创建的同时初始化实例，可以给Map构造函数传入一个可迭代对象，需要包含键/值对数组。
> 可迭代对象中的每个键/值对都会按照迭代顺序插入到新映射实例中。

```js
// 使用嵌套数组初始化映射
const m1 = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
console.log("m1's length:", m1.size); 	// 3 
// 使用自定义迭代器初始化映射
const m2 = new Map({
    [Symbol.iterator]: function* () {
        yield ["key1", "val1"];
        yield ["key2", "val2"];
        yield ["key3", "val3"];
    }
});
console.log("m2's length:", m2.size); 	// 3 
// 映射期待的键/值对，无论是否提供
const m3 = new Map([[]]);
console.log(m3.has(undefined));  		// true 
console.log(m3.get(undefined));  		// undefined
```

> 初始化之后，可以使用`set()`方法再添加键/值对。
> 另外，可以使用`get()`和`has()`进行查询，可以通过`size`属性获取映射中的键/值对的数量，还可以使用`delete()`和`clear()`删除值。

```js
const m = new Map();
console.log(m.has("firstName"));			// false 
console.log(m.get("firstName"));			// undefined 
console.log(m.size);              			// 0 
m.set("firstName", "Matt")
    .set("lastName", "Frisbie");
console.log(m.has("firstName")); 			// true 
console.log(m.get("firstName")); 			// Matt 
console.log(m.size);             			// 2 
m.delete("firstName");     					// 只删除这一个键/值对
console.log(m.has("firstName")); 			// false 
console.log(m.has("lastName"));  			// true 
console.log(m.size);             			// 1 
m.clear(); 									// 清除这个映射实例中的所有键/值对
console.log(m.has("firstName")); 			// false 
console.log(m.has("lastName"));  			// false
console.log(m.size);             			// 0

// set()方法返回映射实例，因此可以把多个操作连缀起来，包括初始化声明
const m1 = new Map().set("key1", "val1");
m1.set("key2", "val2")
    .set("key3", "val3");
console.log(m.size); 						// 3
```

> 顺序与迭代
>
> 与`Object`类型的一个主要差异是，`Map`实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作。
>
> 映射实例可以提供一个迭代器（`Iterator`），能以插入顺序生成`[key, value]`形式的数组。
> 可以通过`entries()`方法（或者`Symbol.iterator`属性，它引用`entries()`）取得这个迭代器。

```js
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]]);
console.log(m.entries === m[Symbol.iterator]); // true 
for (let pair of m.entries()) {
    console.log(pair);
}
// [key1,val1] 
// [key2,val2] 
// [key3,val3] 
for (let pair of m[Symbol.iterator]()) {
    console.log(pair);
}
// [key1,val1] 
// [key2,val2] 
// [key3,val3] 
```

> 因为entries()是默认迭代器，所以可以直接对映射实例使用扩展操作，把映射转换为数组：

```js
const m1 = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
console.log([...m1]); // [[key1,val1],[key2,val2],[key3,val3]] 
```

> 如果不使用迭代器，而是使用回调方式，则可以调用映射的`forEach(callback, opt_thisArg)`方法并传入回调，依次迭代每个键/值对。
> 传入的回调接收可选的第二个参数，这个参数用于重写回调内部`this`的值。

```js
// forEach(callback)
const m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
m.forEach((val, key) => console.log(`${key} -> ${val}`));
// key1 -> val1 
// key2 -> val2 
// key3 -> val3 

// forEach(callback, opt_thisArg)
// 创建一个 Map 实例
const fruitMap = new Map([
    ['apple', 3],
    ['banana', 5],
    ['orange', 2]
]);

// 定义一个包含单位信息的对象（用于 thisArg）
const unitHelper = {
    unit: '个',
    printWithUnit: function (value, fruit) {
        console.log(`${fruit}: ${value}${this.unit}`);
    }
};

// 使用 forEach 遍历 Map
fruitMap.forEach(function (value, key) {
    // 这里的 this 由第二个参数 thisArg 决定
    this.printWithUnit(value, key); // 调用 this 中的方法
}, unitHelper); // 传入 thisArg 参数

// 输出结果：
// apple: 3个
// banana: 5个
// orange: 2个
```

> keys()和values()分别返回以插入顺序生成键和值的迭代器：

```js
const m1 = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
for (let key of m1.keys()) {
    alert(key);
}
// key1 
// key2 
// key3 
for (let key of m1.values()) {
    alert(key);
}
// value1 
// value2 
// value3
```

> 键和值在迭代器遍历时是可以修改的，但映射内部的引用则无法修改。
> 当然，这并不妨碍修改作为键或值的对象内部的属性，因为这样并不影响它们在映射实例中的身份。

```js
const m1 = new Map([
    ["key1", "val1"]
]);
// 作为键的字符串原始值是不能修改的
for (let key of m1.keys()) {
    key = "newKey";
    console.log(key); // newKey
    console.log(m1.get("key1")); // val1
}
const keyObj = {id: 1};
const m = new Map([
    [keyObj, "val1"]
]);
// 修改了作为键的对象的属性，但对象在映射内部仍然引用相同的值
for (let key of m.keys()) {
    key.id = "newKey";
    console.log(JSON.stringify(key)); // {id: "newKey"}
    console.log(m.get(keyObj)); // val1
}
console.log(JSON.stringify(keyObj)); // {id: "newKey"}
```

### WeekMap

> ECMAScript 6 新增的“弱映射”（`WeakMap`）是一种新的集合类型，为这门语言带来了增强的键/值对存储机制。
> `WeakMap`是`Map`的“兄弟”类型，其API也是Map的子集。`WeakMap`中的“weak”（弱） ，描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。
>
> `WeakMap`中“weak”表示弱映射的键是“弱弱地拿着”的。
> 意思就是，这些键不属于正式的引用，不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。
> 只要键存在，键/值对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。
>
> 因为`WeakMap`中的键/值对任何时候都可能被销毁，所以没必要提供迭代其键/值对的能力。
> 当然，也用不着像`clear()`这样一次性销毁所有键/值的方法。
> `WeakMap`确实没有这个方法。
> 因为不可能迭代，所以也不可能在不知道对象引用的情况下从弱映射中取得值。
> 即便代码可以访问WeakMap实例，也没办法看到其中的内容。
>
> `WeakMap`实例之所以限制只能用对象作为键，是为了保证只有通过键对象的引用才能取得值。
> 如果允许原始值，那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了。

### Set

> ECMAScript 6 新增的`Set`是一种新集合类型，为这门语言带来集合数据结构。
> `Set`在很多方面都像是加强的`Map`，这是因为它们的大多数API和行为都是共有的。

**注意：** Set 中元素只会出现一次，即集合中的元素是唯一的。

创建实例

```js
const s = new Set();
```

> 如果想在创建的同时初始化实例，则可以给`Set`构造函数传入一个可迭代对象，其中需要包含插入到新集合实例中的元素。

```js
// 使用数组初始化集合
const s1 = new Set(["val1", "val2", "val3"]);
console.log(s1.size); // 3 

// 使用自定义迭代器初始化集合
const s2 = new Set({
    [Symbol.iterator]: function* () {
        yield "val1";
        yield "val2";
        yield "val3";
    }
});
console.log(s2.size); // 3
```

> 初始化之后，可以使用`add()`增加值，使用`has()`查询，通过`size`取得元素数量，以及使用`delete()`和`clear()`删除元素。

Set 集合的简单遍历

```js
const setstr = new Set(["val1", "val2", "val3", "val1"]);

for (let s of setstr.values()) {
    console.log(s)
}

for (let k of setstr.keys()) {
    console.log(k)
}

for (let en of setstr.entries()) {
    console.log(en)
}
```

## 迭代器与生成器

### 迭代器协议

> 迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。
> 迭代器 API 使用`next()`方法在可迭代对象中遍历数据。
> 每次成功调用`next()`，都会返回一个`IteratorResult`对象，其中包含迭代器返回的下一个值。
> 若不调用`next()`，则无法知道迭代器的当前位置。
>
>`next()`方法返回的迭代器对象`IteratorResult`包含两个属性：done 和 value。done 是一个布尔值，表示是否还可以再次调用`next()`
> 取得下一个值；value 包含可迭代对象的下一个值（ done 为 false ），或者 undefined（ done 为 true ）。`done: true` 状态称为“耗尽”。

### 自定义迭代器

```js
class Counter {
// Counter 的实例应该迭代 limit 次
    constructor(limit) {
        this.count = 1;
        this.limit = limit;
    }

    next() {
        if (this.count <= this.limit) {
            return {done: false, value: this.count++};
        } else {
            return {done: true, value: undefined};
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

let counter = new Counter(3);
for (let i of counter) {
    console.log(i);
}
// 1
// 2
// 3
```

> 为了让一个可迭代对象能够创建多个迭代器，必须每创建一个迭代器就对应一个新计数器。为此，可以把计数器变量放到闭包里，然后通过闭包返回迭代器。

```js
class Counter {
    constructor(limit) {
        this.limit = limit;
    }

    [Symbol.iterator]() {
        let count = 1,
            limit = this.limit;
        return {
            next() {
                if (count <= limit) {
                    return {done: false, value: count++};
                } else {
                    return {done: true, value: undefined};
                }
            }
        };
    }
}

let counter = new Counter(3);
for (let i of counter) {
    console.log(i);
}
// 1
// 2
// 3
for (let i of counter) {
    console.log(i);
}
// 1
// 2
// 3
```

### 生成器

> 生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。
> 只要是可以定义函数的地方，就可以定义生成器。

```js
// 生成器函数声明
function* generatorFn() {
}

// 生成器函数表达式
let generatorFn = function* () {
}
// 作为对象字面量方法的生成器函数
let foo = {
    * generatorFn() {
    }
}

// 作为类实例方法的生成器函数
class Foo {
    * generatorFn() {
    }
}

// 作为类静态方法的生成器函数
class Bar {
    static* generatorFn() {
    }
}
```

> **注意:** 箭头函数不能用来定义生成器函数。
>
> 标识生成器函数的星号不受两侧空格的影响。

```
// 等价的生成器函数：
`function* generatorFnA() {}`
`function *generatorFnB() {}`
`function * generatorFnC() {}`

// 等价的生成器方法：
class Foo {
   *generatorFnD() {}
   * generatorFnE() {}
}
```

## 对象、类与面向对象编程

### 对象

#### 数据属性

> 数据属性包含一个保存数据值的位置。
> 值会从这个位置读取，也会写入到这个位置。数据属性有4个特性描述它们的行为。
> * [[Configurable]]：表示属性是否可以通过`delete`
    删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特性都是
    `true`。
> * [[Enumerable]]：表示属性是否可以通过`for-in`循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是`true`。
> * [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的这个特性都是`true`。
> * [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性 的默认值为`undefined`。

> 要修改属性的默认特性，就必须使用`Object.defineProperty()`方法。
> 这个方法接收 3 个参数： 要给其添加属性的对象、属性的名称和一个描述符对象。
> 最后一个参数，即描述符对象上的属性可以包含：`configurable`、`enumerable`、`writable` 和 `value`，跟相关特性的名称一一对应。
> 根据要修改的特性，可以设置其中一个或多个值。

```js
let person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});
console.log(person.name); // "Nicholas"
person.name = "Greg";
console.log(person.name); // "Nicholas"
```

#### 访问属性

> 访问器属性不包含数据值。
> 相反，它们包含一个获取（getter）函数和一个设置（setter）函数，不 过这两个函数不是必需的。
> 在读取访问器属性时，会调用获取函数，这个函数的责任就是返回一个有效的值。
> 在写入访问器属性时，会调用设置函数并传入新值，这个函数必须决定对数据做出什么修改。
> 访问器属性有 4 个特性描述它们的行为。
>
> * [[Configurable]]：表示属性是否可以通过`delete`删除并重新定义，是否可以修改它的特性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性
    都是`true`。
> * [[Enumerable]]：表示属性是否可以通过`for-in`循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是`true`。
> * [[Get]]：获取函数，在读取属性时调用。默认值为`undefined`。
> * [[Set]]：设置函数，在写入属性时调用。默认值为`undefined`。

```js
let book = {
    year_: 2017,
    edition: 1
};
Object.defineProperty(book, "year", {
    get() {
        return this.year_;
    },
    set(newValue) {
        if (newValue > 2017) {
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    }
});
console.log(book.year_); // 2017
book.year = 2018;
console.log(book.edition); // 2
console.log(book.year); // 2018
console.log(book.year_); // 2018
```

year_ 中的下划线常用来表示该属性并不希望在对象方法的外部被访问。

#### 定义多个属性

> `Object.defineProperties()`方法，它接收两个参数：要为之添加或修改属性的对象和另一个描述符对象，其属性与要添加或修改的属性一一对应。

```js
let book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get() {
            return this.year_;
        },
        set(newValue) {
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
});
```

#### 读取属性的特性

> 使用`Object.getOwnPropertyDescriptor()`方法可以取得指定属性的属性描述符。
> 这个方法接收两个参数：属性所在的对象和要取得其描述符的属性名。
> 返回值是一个对象，对于访问器属性包含configurable、enumerable、get和set属性，对于数据属性包含`configurable`、`enumerable`、
`writable`和`value`属性。

```js
let book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get: function () {
            return this.year_;
        },
        set: function (newValue) {
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
});
let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
console.log(descriptor.value); // 2017
console.log(descriptor.configurable); // false
console.log(typeof descriptor.get); // "undefined"
let descriptor1 = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor1.value); // undefined
console.log(descriptor1.enumerable); // false
console.log(typeof descriptor1.get); // "function"

console.log("getOwnPropertyDescriptors", Object.getOwnPropertyDescriptors(book));
```

#### 合并对象

> `Object.assign()`方法。
> 这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中可枚举（`Object.propertyIsEnumerable()`返回`true`
> ）和自有（`Object.hasOwnProperty()`返回`true`）属性复制到目标对象。
> 以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]
> 取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。
>
> `Object.assign()`实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。
> 此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目标对象。换句话说，不能在两个对象间转移获取函数和设置函数。
>
> 如果赋值期间出错，则操作会中止并退出，同时抛出错误。
> `Object.assign()`没有“回滚”之前赋值的概念，因此它是一个尽力而为、可能只会完成部分复制的方法。

```js
let dest, src, result;
/**
 * 简单复制
 */
dest = {};
src = {id: 'src'};
result = Object.assign(dest, src);
// Object.assign 修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result); // true
console.log(dest !== src); // true
console.log(result); // { id: src }
console.log(dest); // { id: src }
/**
 * 多个源对象
 */
dest = {};
result = Object.assign(dest, {a: 'foo'}, {b: 'bar'});
console.log(result); // { a: foo, b: bar }
/**
 * 获取函数与设置函数
 */
dest = {
    set a(val) {
        console.log(`Invoked dest setter with param ${val}`);
    }
};
src = {
    get a() {
        console.log('Invoked src getter');
        return 'foo';
    }
};
Object.assign(dest, src);
console.log(Object.assign(dest, src));

// 调用 src 的获取方法
// 调用 dest 的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来
console.log(dest); // { set a(val) {...} }
```

#### 对象标识及相等判定

> `Object.is()`，这个方法与`===`很像，但同时也考虑到了边界情形。

```js
// 这些是===符合预期的情况
console.log(true === 1); // false
console.log({} === {}); // false
console.log("2" === 2); // false
// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true
console.log(+0 === 0); // true
console.log(-0 === 0); // true
// 要确定 NaN 的相等性，必须使用极为讨厌的 isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true

console.log(Object.is(true, 1)); // false
console.log(Object.is({}, {})); // false
console.log(Object.is("2", 2)); // false
// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0)); // true
console.log(Object.is(-0, 0)); // false
// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)); // true

// 要检查超过两个值，递归地利用相等性传递即可：
function recursivelyCheckEqual(x, ...rest) {
    return Object.is(x, rest[0]) &&
        (rest.length < 2 || recursivelyCheckEqual(...rest));
}

console.log("递归比较：", recursivelyCheckEqual(1, 1, 1, 2));  // 递归比较： false
```

#### 属性值简写

> 简写属性名只要使用变量名（不用再写冒号）就会自动被解释为同名的属性键。
> 如果没有找到同名变量，则会抛出ReferenceError。

```js
let name = 'Matt';
let person = {
    name: name
};
console.log(person); // { name: 'Matt' }
```

ES6 语法糖等价写法：

```js
let name = 'Matt';
let person = {
    name
};
console.log(person); // { name: 'Matt' }
```

#### 可计算属性

> 在引入可计算属性之前，如果想使用变量的值作为属性，那么必须先声明对象，然后使用中括号语法来添加属性。
> 换句话说，不能在对象字面量中直接动态命名属性。

```js
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let person = {};
person[nameKey] = 'Matt';
person[ageKey] = 27;
person[jobKey] = 'Software engineer';
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```

ES6 在对象字面量中完成动态属性赋值。

```js
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let person = {
    [nameKey]: 'Matt',
    [ageKey]: 27,
    [jobKey]: 'Software engineer'
};
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```

可计算属性本身可以是复杂的表达式，在实例化时再求值。

```js
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let uniqueToken = 0;

function getUniqueKey(key) {
    return `${key}_${uniqueToken++}`;
}

let person = {
    [getUniqueKey(nameKey)]: 'Matt',
    [getUniqueKey(ageKey)]: 27,
    [getUniqueKey(jobKey)]: 'Software engineer'
};
console.log(person); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
```

#### 简写方法名

> 在给对象定义方法时，通常都要写一个方法名、冒号，然后再引用一个匿名函数表达式。

```js
let person = {
    sayName: function (name) {
        console.log(`My name is ${name}`);
    }
};
person.sayName('Matt'); // My name is Matt
```

ES6 等价写法

```js
let person = {
    sayName(name) {
        console.log(`My name is ${name}`);
    }
};
person.sayName('Matt'); // My name is Matt
```

#### 对象解构

```js
// 不使用对象解构
let person = {
    name: 'Matt',
    age: 27
};
let personName = person.name,
    personAge = person.age;
console.log(personName); // Matt
console.log(personAge); // 27
```

解构

```js
// 使用对象解构
let person = {
    name: 'Matt',
    age: 27
};
let {name: personName, age: personAge} = person;
console.log(personName); // Matt
console.log(personAge); // 27
```

等价于

```js
let person = {
    name: 'Matt',
    age: 27
};
let {name, age} = person;
console.log(name); // Matt
console.log(age); // 27
```

### 创建对象

#### 工厂模式

```js
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}

let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```

#### 构造函数模式

> 构造函数名称的首字母都是要大写的，非构造函数则以小写字母开头。

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}

let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName(); // Nicholas
person2.sayName(); // Greg
```

等价于

```js
let Person = function (name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName(); // Nicholas
person2.sayName(); // Greg
console.log(person1 instanceof Object); // true
console.log(person1 instanceof Person); // true
console.log(person2 instanceof Object); // true
console.log(person2 instanceof Person); // true
```

#### 原型模式

> 每个函数都会创建一个`prototype`属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。
> 实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。
> 原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型。

```js
function Person() {
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};
let person1 = new Person();
person1.sayName(); // "Nicholas"
let person2 = new Person();
person2.sayName(); // "Nicholas"
console.log(person1.sayName == person2.sayName); // true
```

等价于

```js
function Person() {
}

Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
let person1 = new Person();
person1.name = "1";
person1.sayName(); // "Nicholas"
```

但是`Person.prototype`被设置为等于一个通过对象字面量创建的新对象。
最终结果是一样的，只有一个问题：这样重写之后，`Person.prototype`的`constructor`属性就不指向`Person`了。
在创建函数时，也会创建它的`prototype`对象，同时会自动给这个原型的`constructor`属性赋值。
而上面的写法完全重写了默认的`prototype`对象，因此其`constructor`属性也指向了完全不同的新对象（`Object`构造函数），不再指向原来的构造函数。
虽然`instanceof`操作符还能可靠地返回值，但我们不能再依靠`constructor`属性来识别类型了。

```js
function Person() {
}

Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};

let person1 = new Person();
person1.sayName(); // "Nicholas"

let friend = new Person();
console.log(friend instanceof Object); // true
console.log(friend instanceof Person); // true
console.log(friend.constructor == Person); // false
console.log(friend.constructor == Object); // true
```

如果`constructor`值非常重要，可以通过`Object.defineProperty()`方法来定义`constructor`属性。

```js
function Person() {
}

Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
// 恢复 constructor 属性
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});

let person1 = new Person();
person1.sayName(); // "Nicholas"

let friend = new Person();
console.log(friend instanceof Object); // true
console.log(friend instanceof Person); // true
console.log(friend.constructor == Person); // true
console.log(friend.constructor == Object); // true
```

> 因为从原型上搜索值的过程是动态的，所以即使实例在修改原型之前已经存在，任何时候对原型对 象所做的修改也会在实例上反映出来。

```js
function Person() {
}

Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
// 恢复 constructor 属性
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});

let person1 = new Person();
person1.sayName(); // "Nicholas"

let friend = new Person();
Person.prototype.sayHi = function () {
    console.log("hi");
};
friend.sayHi(); // "hi"
```

#### 对象迭代

> `Object.values()`和`Object.entries()`接收一个对象，返回它们内容的数组。

```js
const o = {
    foo: 'bar',
    baz: 1,
    qux: {}
};
console.log(Object.values(o));
// ["bar", 1, {}]
console.log(Object.entries((o)));
// [["foo", "bar"], ["baz", 1], ["qux", {}]]
```

**注意：** `Symbol`属性会被忽略

```js
const sym = Symbol('a');
const o = {
    foo: 'bar',
    baz: 1,
    qux: {},
    [sym]: 'zoo'
};
console.log(Object.values(o));
// [ 'bar', 1, {} ]
console.log(Object.entries((o)));
// [["foo", "bar"], ["baz", 1], ["qux", {}]]
```

### 继承

#### 原型链

> 通过原型继承多个引用类型的属性和方法。

```javascript
function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

// 继承 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
    return this.subproperty;
};
let instance = new SubType();
console.log(instance.getSuperValue()); // true
console.log(instance.getSubValue());   // false

// 继承关系
console.log(instance instanceof Object); // true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof SubType); // true

console.log(Object.prototype.isPrototypeOf(instance)); // true
console.log(SuperType.prototype.isPrototypeOf(instance)); // true
console.log(SubType.prototype.isPrototypeOf(instance)); // true
```

#### 盗用构造函数

> 为了解决原型包含引用值导致的继承问题，一种叫作“盗用构造函数”（`constructor stealing`
> ）的技术在开发社区流行起来（这种技术有时也称作“对象伪装”或“经典继承”）。
> 基本思路很简单：在子类 构造函数中调用父类构造函数。
> 因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用`apply()`和`call()`方法以新创建的对象为上下文执行构造函数。

```javascript
function SuperType() {
    this.colors = ["red", "blue", "green"];
}

function SubType() {
    // 继承 SuperType
    SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'black' ]

let instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green' ]
```

##### 传递参数

```javascript
function SuperType(name) {
    this.name = name;
}

function SubType() {
    // 继承 SuperType 并传参
    SuperType.call(this, "Nicholas");
    // 实例属性
    this.age = 29;
}

let instance = new SubType();
console.log(instance.name); // "Nicholas";
console.log(instance.age);  // 29
```

#### 组合继承

> 组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。
> 基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

```javascript
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
    console.log(this.age);
};
let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); 			// [ 'red', 'blue', 'green', 'black' ]
instance1.sayName(); 					// "Nicholas";
instance1.sayAge();						// 29
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors); 			// [ 'red', 'blue', 'green' ]
instance2.sayName(); 					// "Greg";
instance2.sayAge(); 					// 27
```

#### 原型式继承

```javascript
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```

等价于

```javascript
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]
console.log(person);
console.log("yetAnotherPerson:", '\n', yetAnotherPerson);  //  { name: 'Linda' }
console.log("yetAnotherPerson.friends:", '\n', yetAnotherPerson.friends);  //  [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]
```

#### 寄生式继承

> 寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

```javascript
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

function createAnother(original) {
    let clone = object(original); // 通过调用函数创建一个新对象
    clone.sayHi = function () { // 以某种方式增强这个对象
        console.log("hi");
    };
    return clone; // 返回这个对象
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // "hi"
```

### 类

#### 类定义

> 与函数类型相似，定义类也有两种主要方式：类声明和类表达式。这两种方式都使用`class`关键字加大括号

```javascript
// 类声明
class Person {
}

// 类表达式
const Animal = class {
};
```

##### 类的构成

> 类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法，但这些都不是必需的。
> 空的类定义照样有效。默认情况下，类定义中的代码都在严格模式下执行。

#### 类构造函数

> `constructor`关键字用于在类定义块内部创建类的构造函数。
> 方法名`constructor`会告诉解释器在使用 new 操作符创建类的新实例时，应该调用这个函数。
> 构造函数的定义不是必需的，不定义构造函数相当于将构造函数定义为空函数。

##### 实例化

> 使用`new`调用类的构造函数创建类实例的过程：
>
> (1) 在内存中创建一个新对象。
>
> (2) 这个新对象内部的`[[Prototype]]`指针被赋值为构造函数的`prototype`属性。
>
> (3) 构造函数内部的`this`被赋值为这个新对象（即`this`指向新对象）。
>
> (4) 执行构造函数内部的代码（给新对象添加属性）。
>
> (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

```javascript
class Animal {
}

class Person {
    constructor() {
        console.log('person ctor');
    }
}

class Vegetable {
    constructor() {
        this.color = 'orange';
    }
}

let a = new Animal();
let p = new Person(); // person ctor
let v = new Vegetable();
console.log(v.color); // orange
```

有参构造

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

let person = new Person("张三", 18);
console.log(`${person.name}今年${person.age}岁了。`); // 张三今年18岁了。

let psn = new Person();
console.log(`${psn.name}今年${psn.age}岁了。`); // undefined今年undefined岁了。
```

#### 继承

```javascript
class Vehicle {
}

// 继承类
class Bus extends Vehicle {
}

let b = new Bus();
console.log(b instanceof Bus); // true
console.log(b instanceof Vehicle); // true
function Person() {
}

// 继承普通构造函数
class Engineer extends Person {
}

let e = new Engineer();
console.log(e instanceof Engineer); // true
console.log(e instanceof Person); // true
```

##### 构造函数、`HomeObject`和`super()`

> 派生类的方法可以通过`super`关键字引用它们的原型。
> 这个关键字只能在派生类中使用，而且仅限于类构造函数、实例方法和静态方法内部。
> 在类构造函数中使用`super`可以调用父类构造函数。

```javascript
class Vehicle {
    constructor() {
        this.hasEngine = true;
    }
}

class Bus extends Vehicle {
    constructor() {
        // 不要在调用 super()之前引用 this，否则会抛出 ReferenceError
        super(); // 相当于 super.constructor()
        console.log(this instanceof Vehicle); // true
        console.log(this); // Bus { hasEngine: true }
    }
}

new Bus();
```

> 在静态方法中可以通过 super 调用继承的类上定义的静态方法

```javascript
class Vehicle {
    static identify() {
        console.log('vehicle');
    }
}

class Bus extends Vehicle {
    static identify() {
        super.identify();
    }
}

Bus.identify(); // vehicle
```

##### 抽象基类

可以通过`new.target`来实现。`new.target`可以保存通过`new`关键字调用的类或函数。

```javascript
// 抽象基类
class Vehicle {
    constructor() {
        console.log(new.target);
        if (new.target === Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
    }
}

// 派生类
class Bus extends Vehicle {
}

new Bus(); // class Bus {}
new Vehicle(); // class Vehicle {}
// Error: Vehicle cannot be directly instantiated
```

> 另外，通过在抽象基类构造函数中进行检查，可以要求派生类必须定义某个方法。
> 因为原型方法在调用类构造函数之前就已经存在了，所以可以通过`this`关键字来检查相应的方法

```javascript
    // 抽象基类
class Vehicle {
    constructor() {
        if (new.target === Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
        if (!this.foo) {
            throw new Error('Inheriting class must define foo()');
        }
        console.log('success!');
    }
}

// 派生类
class Bus extends Vehicle {
    foo() {
    }
}

// 派生类
class Van extends Vehicle {
}

new Bus(); // success!
new Van(); // Error: Inheriting class must define foo()
```

## 代理与反射

### 代理基础

> 代理是目标对象的抽象。
> 它可以用作目标对象的替身，但又完全独立于目标对象。
> 目标对象既可以直接被操作，也可以通过代理来操作。
> 但直接操作会绕过代理施予的行为。

#### 创建空代理

> 在代理对象上执行的所有操作都会无障碍地传播到目标对象。
> 因此，在任何可以使用目标对象的地方，都可以通过同样的方式来使用与之关联的代理对象。

> 代理是使用Proxy构造函数创建的。

```javascript
const target = {
    id: 'target'
};
const handler = {};
const proxy = new Proxy(target, handler);
// id 属性会访问同一个值
console.log(target.id); // target
console.log(proxy.id); // target
// 给目标属性赋值会反映在两个对象上
// 因为两个对象访问的是同一个值
target.id = 'foo';
console.log(target.id); // foo
console.log(proxy.id); // foo
// 给代理属性赋值会反映在两个对象上
// 因为这个赋值会转移到目标对象
proxy.id = 'bar';
console.log(target.id); // bar
console.log(proxy.id); // bar
// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true
console.log(proxy.hasOwnProperty('id')); // true
// Proxy.prototype 是 undefined
// 因此不能使用 instanceof 操作符
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
```

#### 定义捕获器

> 使用代理的主要目的是可以定义捕获器（`trap`）。
> 捕获器就是在处理程序对象中定义的“基本操作的拦截器”。
> 每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种基本操作，可以直接或间接在代理对象上调用。
> 每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对象之前先调用捕获器函数，从而拦截并修改相应的行为。

```javascript
const target = {
    foo: 'bar'
};
const handler = {
    // 捕获器在处理程序对象中以方法名为键
    get() {
        return 'handler override';
    }
};
const proxy = new Proxy(target, handler);
console.log(target.foo); // bar
console.log(proxy.foo); // handler override
console.log(target['foo']); // bar
console.log(proxy['foo']); // handler override
console.log(Object.create(target)['foo']); // bar
console.log(Object.create(proxy)['foo']); // handler override
```

#### 捕获器参数和反射API

> 所有捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。
> 比如，`get()`捕获器会接收到目标对象、要查询的属性和代理对象三个参数。

```javascript
const target = {
    foo: 'bar'
};
const handler = {
    get(trapTarget, property, receiver) {
        console.log(`原始对象target：${trapTarget === target}`);
        console.log(`原始值：${trapTarget.foo}`)
        console.log(`对象属性：${property}`);
        console.log(`代理对象proxy：${receiver === proxy}`);
        trapTarget.foo = 'Proxy_Foo'
        console.log(`赋值后：${trapTarget.foo}`)
    }
};
const proxy = new Proxy(target, handler);
proxy.foo;

// 原始对象target：true
// 原始值：bar
// 对象属性：foo
// 代理对象proxy：true
// 赋值后：Proxy_Foo
```

重建被捕获方法的原始行为

```javascript
const target = {
    foo: 'bar'
};
const handler = {
    get(trapTarget, property, receiver) {
        return trapTarget[property];
    }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar
console.log(target.foo); // bar
```

> 所有捕获器都可以基于自己的参数重建原始操作，但并非所有捕获器行为都像`get()`那么简单。
> 因此，通过手动写码如法炮制的想法是不现实的。
> 实际上，开发者并不需要手动重建原始行为，而是可以通过调用全局`Reflect`对象上（封装了原始行为）的同名方法来轻松重建。
> 处理程序对象中所有可以捕获的方法都有对应的反射（`Reflect`）API 方法。
> 这些方法与捕获器拦截的方法具有相同的名称和函数签名，而且也具有与被拦截方法相同的行为。
> 因此，使用反射 API 也可以像下面这样定义出空代理对象

```javascript
const target = {
    foo: 'bar'
};
const handler = {
    get() {
        return Reflect.get(...arguments);
    }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar
console.log(target.foo); // bar
```

等价于

```javascript
const target = {
    foo: 'bar'
};
const handler = {
    get: Reflect.get
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar
console.log(target.foo); // bar    
```

等价于

```javascript
const target = {
    foo: 'bar'
};
const proxy = new Proxy(target, Reflect);
console.log(proxy.foo); // bar
console.log(target.foo); // bar
```

#### 捕获器不变式

> 每个捕获的方法都知道目标对象上下文、捕获函数签名，而捕获处理程序的行为必须遵循“捕获器不变式”（trap invariant）

#### 可撤销代理

> Proxy 的`revocable()`方法支持撤销代理对象与目标对象的关联。
> 撤销代理的操作是不可逆的。而且，撤销函数（`revoke()`）是幂等的，调用多少次的结果都一样
> 撤销代理之后再调用代理会抛出 TypeError 。

```javascript
const target = {
    foo: 'bar'
};
const handler = {
    get(target, attribute, reciver) {
        return 'intercepted';
    }
};
const {proxy, revoke} = Proxy.revocable(target, handler);
console.log(proxy.foo); // intercepted
console.log(target.foo); // bar
revoke();
console.log(proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

#### 实用反射 API

* 反射 API 与对象 API

> (1) 反射 API 并不限于捕获处理程序；
> (2) 大多数反射 API 方法在 Object 类型上有对应的方法。
> 通常，Object 上的方法适用于通用程序，而反射方法适用于细粒度的对象控制与操作。

* 状态标记

> 很多反射方法返回称作“状态标记”的布尔值，表示意图执行的操作是否成功

```javascript
// 初始代码
const o = {};
try {
    Object.defineProperty(o, 'foo', 'bar');
    console.log('success');
} catch (e) {
    console.log('failure');
}

// failure
```

从上面代码可以看出来，判断代码是通过异常判断的，但是异常并不优雅。
这个时候通过`Reflect.defineProperty()`判断会更精准且优雅，以为其在定义新属性时如果发生问题会返回 false，而不是抛出错误。

```javascript
const o = {};
if (Reflect.defineProperty(o, 'foo', {value: 'bar'})) {
    console.log('success');
} else {
    console.log('failure');
}

// success
```

#### 代理另一个代理

```javascript
const target = {
    foo: 'bar'
};
const firstProxy = new Proxy(target, {
    get() {
        console.log('first proxy');
        return Reflect.get(...arguments);
    }
});
const secondProxy = new Proxy(firstProxy, {
    get() {
        console.log('second proxy');
        return Reflect.get(...arguments);
    }
});
console.log(secondProxy.foo);
// second proxy
// first proxy
// bar
```

### 代理捕获器与反射方法

#### get()

> `get()`捕获器会在获取属性值的操作中被调用。
> 对应的反射 API 方法为`Reflect.get()`。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
    get(target, property, receiver) {
        console.log('get()');
        return Reflect.get(...arguments)
    }
});
proxy.foo;
// get()
```

##### 返回值

> 无限制

##### 拦截的操作

> - proxy.property
> - proxy[property]
> - Object.create(proxy)[property]
> - Reflect.get(proxy, property, receiver)

##### 捕获器处理程序参数

> - target：目标对象。
> - property：引用的目标对象上的字符串键属性。
> - receiver：代理对象或继承代理对象的对象。

##### 捕获器不变式

> 如果`target.property`不可写且不可配置，则处理程序返回的值必须与`target.property`匹配。
> 如果`target.property`不可配置且[[Get]]特性为`undefined`，处理程序的返回值也必须是`undefined`。

#### set()

> `set()`捕获器会在设置属性值的操作中被调用。
> 对应的反射 API 方法为`Reflect.set()`。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
    set(target, property, value, receiver) {
        console.log('set()');
        console.log('property:', property);
        console.log('value:', value);
        return Reflect.set(...arguments)
    }
});
proxy.foo = 'bar';

// set()
// property: foo
// value: bar
```

##### 返回值

> 返回 true 表示成功；返回 false 表示失败

##### 拦截的操作

> - proxy.property = value
> - proxy[property] = value
> - Object.create(proxy)[property] = value
> - Reflect.set(proxy, property, value, receiver)

##### 捕获器处理程序参数

> - target：目标对象。
> - property：引用的目标对象上的字符串键属性。
> - value：要赋给属性的值。
> - receiver：接收最初赋值的对象。

##### 捕获器不变式

> 如果`target.property`不可写且不可配置，则不能修改目标属性的值。
> 如果`target.property`不可配置且[[Set]]特性为`undefined`，则不能修改目标属性的值。

#### has()

> `has()`捕获器会在`in`操作符中被调用。对应的反射 API 方法为`Reflect.has()`。

```javascript
const myTarget = {
    foo: "foo1"
};
const proxy = new Proxy(myTarget, {
    has(target, property) {
        console.log('has()');
        return Reflect.has(...arguments)
    }
});

'foo' in proxy

with (proxy) {
    foo == "123"
}

// has()
// has()
```

##### 返回值

> has()必须返回布尔值，表示属性是否存在。
> 返回非布尔值会被转型为布尔值。

##### 拦截的操作

> - property in proxy
> - property in Object.create(proxy)
> - with(proxy) {(property);}
> - Reflect.has(proxy, property)

##### 捕获器处理程序参数

> - target：目标对象。
> - property：引用的目标对象上的字符串键属性。

##### 捕获器不变式

> 如果`target.property`存在且不可配置，则处理程序必须返回`true`。
> 如果`target.property`存在且目标对象不可扩展，则处理程序必须返回`true`。

#### defineProperty()

> `defineProperty()`捕获器会在`Object.defineProperty()`中被调用。对应的反射 API 方法为`Reflect.defineProperty()`。

##### 返回值

> `defineProperty()`必须返回布尔值，表示属性是否成功定义。
> 返回非布尔值会被转型为布尔值。

##### 拦截的操作

> - Object.defineProperty(proxy, property, descriptor)
> - Reflect.defineProperty(proxy, property, descriptor)

##### 捕获器处理程序参数

> - target：目标对象。
> - property：引用的目标对象上的字符串键属性。
> - descriptor：包含可选的 enumerable、configurable、writable、value、get 和 set 定义的对象。

##### 捕获器不变式

> 如果目标对象不可扩展，则无法定义属性。
> 如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性。
> 如果目标对象有一个不可配置的属性，则不能添加同名的可配置属性。

#### getOwnPropertyDescriptor

> `getOwnPropertyDescriptor()`捕获器会在`Object.getOwnPropertyDescriptor()`中被调用。对应的反射 API 方法为
`Reflect.getOwnPropertyDescriptor()`。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
    getOwnPropertyDescriptor(target, property) {
        console.log(target)
        console.log(property)
        console.log('getOwnPropertyDescriptor()');
        return Reflect.getOwnPropertyDescriptor(...arguments)
    }
});
Object.getOwnPropertyDescriptor(proxy, 'foo');
// getOwnPropertyDescriptor()
```

##### 返回值

> `getOwnPropertyDescriptor()`必须返回对象，或者在属性不存在时返回`undefined`。

##### 拦截的操作

> - Object.getOwnPropertyDescriptor(target, property)
> - Reflect.getOwnPropertyDescriptor(target, property)

##### 捕获器处理程序参数

> - target：目标对象。
> - property：引用的目标对象上的字符串键属性

##### 捕获器不变式

> 如果自有的`target.property`存在且不可配置，则处理程序必须返回一个表示该属性存在的对象。
> 如果自有的`target.property`存在且可配置，则处理程序必须返回表示该属性可配置的对象。
> 如果自有的`target.property`存在且`target`不可扩展，则处理程序必须返回一个表示该属性存在的对象。
> 如果`target.property`不存在且`target`不可扩展，则处理程序必须返回`undefined`表示该属性不存在。
> 如果`target.property`不存在，则处理程序不能返回表示该属性可配置的对象。

#### deleteProperty()

> `deleteProperty()`捕获器会在`delete`操作符中被调用。对应的反射 API 方法为`Reflect.deleteProperty()`。

```javascript
const myTarget = {
    foo: 'bar',
};
const proxy = new Proxy(myTarget, {
    deleteProperty(target, property) {
        console.log('deleteProperty()');
        return Reflect.deleteProperty(...arguments)
    }
});
console.log(`myTarget的foo属性值：${proxy.foo}`)
delete proxy.foo
console.log(`通过proxy删除myTarget的foo属性值：${proxy.foo}`)
// myTarget的foo属性值：bar
// deleteProperty()
// 通过proxy删除myTarget的foo属性值：undefined
```

##### 返回值

> `defineProperty()`必须返回布尔值，表示属性是否成功定义。
> 返回非布尔值会被转型为布尔值。

##### 拦截的操作

> - delete proxy.property
> - delete proxy[property]
> - Reflect.deleteProperty(proxy, property)

##### 捕获器处理程序参数

> - target：目标对象。
> - property：引用的目标对象上的字符串键属性。

##### 捕获器不变式

> 如果自有的`target.property`存在且不可配置，则处理程序不能删除这个属性。

#### wnKeys()

> `ownKeys()`捕获器会在`Object.keys()`及类似方法中被调用。
> 对应的反射 API 方法为`Reflect.ownKeys()`。

```javascript
const myTarget = {};
const proxy = new Proxy(myTarget, {
    ownKeys(target) {
        console.log('ownKeys()');
        return Reflect.ownKeys(...arguments)
    }
});
Object.keys(proxy);
// ownKeys()
```

##### 返回值

> ownKeys()必须返回包含字符串或符号的可枚举对象。

##### 拦截的操作

> - Object.getOwnPropertyNames(proxy)
> - Object.getOwnPropertySymbols(proxy)
> - Object.keys(proxy)
> - Reflect.ownKeys(proxy)

##### 捕获器处理程序参数

> proxy：目标对象。

##### 捕获器不变式

> 返回的可枚举对象必须包含`target`的所有不可配置的自有属性。
> 如果`target`不可扩展，则返回可枚举对象必须准确地包含自有属性键。

#### getPrototypeOf()

> `getPrototypeOf()`捕获器会在`Object.getPrototypeOf()`中被调用。对应的反射 API 方法为`Reflect.getPrototypeOf()`。


























