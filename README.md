### CSS变量
CSS变量又称CSS<strong>自定义属性</strong>,是由开发者定义的,所定义的属性可以在其作用域文档中重复使用

### 设置自定义属性
```js
/* 
声明一个自定义属性
1. 属性名以 (--) 两个减号开始 
    --variable-name: variable-value
2. 大小写敏感
    --my-color和 --My-color则是两个变量
element{
    --color: tomato
}
*/
```
自定义属性的声明也就规定了其作用域;<br/><code>element为:root</code>则可以在全局文档中使用<br/>
<code>element为#root</code>则只能在#root下的节点使用

### 使用自定义变量
```js
//css
div{
    color: var(--color)
}
```
使用变量时用var()的函数包裹传递一个自定义的属性名或其他值

### var()函数的参数
```js
var()函数可以接受多个参数/备用值
var(--pre-color, #f00)
var(--pre-color, --color, #f00)
// 第一个参数是自定义属性的名称
// 第二个参数存在则被当作备用值
```
>可以说var只接受两个参数,第一个是自定义属性,不管后续有多少参数都当作一个可以直接备用的值,如果不能解析则继承父级的相关属性


### 自定义属性的继承
自定义属性会根据Dom树继承父节点的自定义属性

```html
<div class="parent_par">
    根节点    
    <!-- 红色 f00 -->
    <div class="parent">
        父节点      
        <!-- 蓝色  blue-->
        <div class="one">
            第一个
            <!-- 绿色 green -->
            <div class="title">
                title
                <!-- 绿色 green -->
            </div>
        </div>
        <div class="two">第二个</div>
        <!-- 蓝色  blue-->
        <div class="three">第三个个</div>
        <!-- 蓝色  blue-->
    </div>
</div>
<!-- 样式设置如下 -->
.parent_par{
    --p_color: #f00;
    color: var(--p_color);
}
.parent_par .parent {
    --p_color: blue;
    color: var(--p_color);
}
.parent_par .parent .one{
    --p_color: green;
    color: var(--p_color);
}
.parent_par .parent .one .title{
    color: var(--p_color);
}
.parent_par .parent .two{
    color: var(--p_color);
}
.parent_par .parent .three{
    color: var(--p_color);
}
```

### 无效值与继承
传统的css是属性和其正确的值绑定,但是自定义属性并没有其正确定的绑定关系,因为浏览器不知道该属性何时被利用也就无法知道属性是否正确,默认所有的自定义属性的值都是正确的<br/>
在var函数调用时,css的上下文关系和属性会导致某些属性值错误导致无效的css语句
<strong>当浏览器遇到无效的var()时则会使用继承或是默认值代替
```js
#root{
    --color: 10px;
    color: var(--color)
}
// 不出意外的上面的color: 10px是不符合css规范的,接下来将会执行:
1. 检查css属性是否为继承属性 
    1.1 是的话则查找父元素是否有相关属性值 有则赋值 无则进行第二步
    1.2 否的话 直接进行第二步
2. 将该属性值设置为默认值 如black 
```

### Javascript如何操作css变量
在JS中操作CSS是经常会用到的方法,CSS变量也受控于JS的操作

```js
// 1. 获取DOM节点上的css变量
Element.style.getPropertyValue("--my-color");

// 2. 获取任意DOM节点上的css变量
getComputedStyle(Element).getPropertyValue("--my-color");

// 3. 修改一个DOM节点上的css变量

Element.style.setProperty("--my-color", "blue");
```

### css变量的应用
CSS变量可以在控制变量和不修改css的基础上使换肤得以实现,JS控制换肤事件动态切换Document的CSS变量
