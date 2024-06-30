# Reflect

### 使用户可以调用对象的基本方法

```js
const obj = {
    a: 1,
    b: 2,
    get c () {
        return this.a + this.b
    }
}

// Reflect.get(target, key, receiver)
// receiver 为 this 指向
Reflect.get(obj, 'c')	// 3
Reflect.get(obj, 'c', {a: 2, b: 3})	// 5

```

再举一个栗子：

```js
const proxyObj = new Proxy(obj, {
    get(target, key, receiver) {
        console.log(key)
        return target[key]
    }
})
proxyObj.c
// output: c
```

再访问 c 的时候，程序应该也访问到了 this.a 和 this.b, 此时输出应该为

c

a

b

为什么会只输出 c 呢？因为我们访问c返回的是源对象。想要输出 c a b, 可以这样写

```js
const proxyObj = new Proxy(obj, {
    get(target, key, receiver) {
        console.log(key)
        return Reflect.get(target, key, proxyObj)
    }
})
proxyObj.c
// output: 
// c 
// a
// b
```

因为 receiver 决定 this 的指向，故也可

```js
const proxyObj = new Proxy(obj, {
    get(target, key, receiver) {
        console.log(key)
        return Reflect.get(target, key, receiver)
    }
})
proxyObj.c
// output: 
// c 
// a
// b
```

