# 研发组最终考核错误

# 前端JavaScript

## 1.id获取不对

```JavaScript
console.log(id[id.length-1])
    let num=id[id.length-1]
```

id不能简简单单用切片处理，数字超过10位数会增加

修改方案：进行数组搜寻

万分注意，这里不能for i 全局变量里面有i ，会发生非常意想不到的结果，i=“2”

```JavaScript
function checkNum(str){
    let index=0
    for (j of str){
        if (isNaN(Number(j))){
            index+=1
        }else{
            break
        }
    } 
    return parseInt(str.slice(index))
}
```

## 2.i，k不能使用i--，k--

每次删除的地方不一定一致，i--会导致id重复

修改方案：仅add与addNew添加i++ 与 k++

```JavaScript
function add(){
    ...
    i++
}

function addNew(){
    ...
    k++
}
```

## 3.输入检测机制未完善

解决方案（购物车）：products为商品数组，valueName和valuePrice为商品价格

```JavaScript
  if (valueName=="" || valuePrice==""){
        alert("您未输入商品名或者价格")
        return 
    }
    if (isNaN(Number(valuePrice[0]))){
        alert("您输入的价格不为数字")
        return
    }
    if (products.indexOf(valueName)>=0){
        alert("您添加的商品已存在")
        return
    }
```

## 4.商品加入数组删除未进行

解决方案：在add delete添加即可，不能在purchase添加，不然还是会重复

```JavaScript
let index=products.indexOf(input.value)
products.splice(index,1)
```

## 5.第一列，模板应该使用dispaly：none

解决方案如下：

```CSS
#name1{
    display:none;
}
#price1{
    display: none;
}
#button1{
    display: none;
}
```

```JavaScript
newButton.style.display="block"
newPrice.style.display="block"
newName.style.display="block"
```

## 6.函数完全可以封装，堆叠的太多了

解决方案

购物栏添加

```JavaScript
function addToPurchase(){
     //获取对应的value，并准备好输出
     let valueName=document.getElementById("name").value
     let valuePrice=document.getElementById("price").value
     if (valueName=="" || valuePrice==""){
         alert("您未输入商品名或者价格")
         return 
     }
     if (isNaN(Number(valuePrice[0]))){
         alert("您输入的价格不为数组")
         return
     }
     if (products.indexOf(valueName)>=0){
         alert("您添加的商品已存在")
         return
     }
     add(valueName,valuePrice)
}
```

```JavaScript
function add(valueName,valuePrice){
    //获得商品添加盒子的三个子盒子
    let nameBox=document.getElementById("name-box")
    let priceBox=document.getElementById("price-box")
    let buttonBox=document.getElementById("button-box")
    //对每个进行克隆。cloneNode(true)代表克隆子节点
    let name=document.getElementById("name1")
    let newName=name.cloneNode(true)
    let price=document.getElementById("price1")
    let newPrice=price.cloneNode(true)
    let button=document.getElementById("button1")
    let newButton=button.cloneNode(true)
   
    //设置对应的id，以及盒子里对应的id
    newButton.setAttribute("id","button"+i)
    newButton.firstElementChild.setAttribute("id","change"+i)
    newButton.firstElementChild.nextElementSibling.setAttribute("id","purchase"+i)
    newButton.lastElementChild.setAttribute("id","delete"+i)
    newName.setAttribute("id", "name" + i)
    newPrice.setAttribute("id","price"+i)
    
    i+=1
    //修改添加的值
    newName.setAttribute("value",valueName)
    products.push(valueName)
    newPrice.innerHTML=valuePrice
    //修改样式
    newButton.style.display="block"
    newPrice.style.display="block"
    newName.style.display="block"
    //添加元素
    nameBox.append(newName)
    priceBox.append(newPrice)
    buttonBox.append(newButton)
    //进行post请求
    Post(valueName,valuePrice)
    console.log(`add i=${i},k=${k}`)
}
```

已购买添加

```JavaScript
function purchase(id){
    console.log(checkNum(id))
    let num=checkNum(id)
    //获取对应的id
    let input=document.getElementById("name"+num)
    let price=document.getElementById("price"+num)
    //列表中删除对应的列表，防止重复

    let buttonDelete=document.getElementById("button"+num)
    let button=document.getElementById("buttonPur1")
    let name=document.getElementById("namePur1")
    name.innerHTML=input.value
    //进行前面元素的克隆，可以将前面元素隐藏，来进行获取
    let newName=name.cloneNode(true)
    let newPrice=price.cloneNode(true)
    let newButton=button.cloneNode(true)
    //创建需要购买的一条购物栏
    let nameBox=document.getElementById("name-boxPur")
    let priceBox=document.getElementById("price-boxPur")
    let buttonBox=document.getElementById("button-boxPur")
    //设置购物栏对应子元素的id
    newButton.setAttribute("id","buttonPur"+k)
    newButton.firstElementChild.setAttribute("id","deletePur"+k)
    newName.setAttribute("id", "namePur" + k)
    newPrice.setAttribute("id","pricePur"+k)
    k+=1
    //设置显示格式
    newButton.style.display="block"
    newPrice.style.display="block"
    newName.style.display="block"
    //添加并移除
    
    nameBox.append(newName)
    priceBox.append(newPrice)
    buttonBox.append(newButton)
    input.remove()
    price.remove()
    buttonDelete.remove()
    console.log(`purchase i=${i},k=${k}`)
}
```







# 前端CSS：

## 1.商品与价格未对整齐

### 商品盒子

原来的

![](assets/boxcnXSMnG8pXVkhIDRNeFwkU7f.png)

解决方案：input输入框自带1px的padding，为了美观，应当为价格盒子添上1px的padding

```CSS
.product-box > .name-box > input{
    height:16px;
    text-align: center;
    margin:5px;
    background: transparent;
    outline:none;
    border:none
}
```

### 价格盒子：

原来的

![](assets/boxcnJGT8HP6EfXLomBueM46RVf.png)

解决方案：

```CSS
.product-box > .price-box > p{
    height:16px;
    padding:1px;
    text-align: center;
    margin:5px;
}
```

## 2.溢出部分未设置overflow：scroll

解决方案：设置一下即可

## 3.动态placeholder未固定

解决方案：使用属性required：“required”表示输入框需要输入：

使用valid选择器：

valid选择器:在表单元素的值需要根据指定条件验证时设置指定样式,这个很有用！
input设置了个属性required="required"，该属性指的是表单必须有值，这就是指定条件验证。

```JavaScript
.priceName:hover ~ .textprice,
.priceName:valid ~ .textprice,
.priceName:focus ~ .textprice
{
    transform: translateX(-5px) scale(0.75) translateY(-14px) ;
}
```

一般情况下兄弟选择器还是很好用的，更多选择器看《css选择器世界》

# 前端HTML5

整体命名很乱，搞得写css的时候自己看的眼花缭乱，备注还是要及时打好

## 前端总体

1.总体思路有一定问题，使用三列作为商品添加本身就不怎么对,这种布局只有在三列分别添加东西时比较方便，而三列布局由于嵌套的原因导致添加起来很困难，正常应该是一行一个盒子，盒子里面添加对应的商品名称，商品价格，商品按钮，这样按钮按下去时能够更好的进行寻找。

2.css选择器精通不够，伪类和伪元素掌握较少，导致做的时候很乱



## 了解玩意



* MVC，MVP，MVMM
* Nodejs，npm
* React 
