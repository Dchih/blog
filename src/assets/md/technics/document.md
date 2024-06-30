# document

想实现一个输出直角三角形的效果

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <div class='triangle'></div>

        <script>
            var triangle = document.querySelector('.triangle');
            // 补全代码
            const br = document.createElement('br')
            const asterisk = document.createTextNode('*')

            // function generateRightAngleSequence() {}
            const arr = [1, 2, 3]
            arr.forEach(line => {
                while(line > 0) {
                    line --
                    triangle.appendChild(asterisk)
                    if(line===0) {
                        triangle.appendChild(br)
                    }
                }
            })
        </script>
    </body>
</html>
```

代码执行结果是一个 * 和一个 br 

调试发现当我用变量将DOM节点保存起来的时候，后面添加的asterisk, br  都是同一个DOM节点，只是变换了位置