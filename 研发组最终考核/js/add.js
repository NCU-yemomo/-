let i=2
let k=2
let products=[]
//点击购买发生的事
function purchase(id){
    let num=checkNum(id)
    //获取对应的id
    //列表中删除对应的列表，防止重复
    let input=document.getElementById("name"+num)
    let price=document.getElementById("price"+num)
    let buttonDelete=document.getElementById("button"+num)
    addPur(input.value,price.innerHTML)
    addDelete(input.value)
    input.remove()
    price.remove()
    buttonDelete.remove()
    console.log(`purchase i=${i},k=${k}`)
}
//商品添加
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
     addPost(valueName,valuePrice)
}
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
    addPost(valueName,valuePrice)
    console.log(`add i=${i},k=${k}`)
}
function addPur(input,input2){
    let button=document.getElementById("buttonPur1")
    let name=document.getElementById("namePur1")
    let price=document.getElementById("pricePur1")
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
    newName.innerHTML=input
    newPrice.innerHTML=input2
    newButton.style.display="block"
    newPrice.style.display="block"
    newName.style.display="block"
    //添加并移除
    nameBox.append(newName)
    priceBox.append(newPrice)
    buttonBox.append(newButton)
}
function deletePur(id){
    console.log(checkNum(id))
    let num=checkNum(id)
    //根据得到的num对应的删除
    let namePur=document.getElementById("namePur"+num)
    let pricePur=document.getElementById("pricePur"+num)
    let buttonPur=document.getElementById("buttonPur"+num)
    //对此进行添加
    add(namePur.innerHTML,pricePur.innerHTML)
    //移除
    purDelete(namePur.innerHTML)
    namePur.remove()
    pricePur.remove()
    buttonPur.remove()
    console.log(`deletepur i=${i},k=${k}`)
}
function change(id){
    console.log(checkNum(id))
    let num=checkNum(id)
    let input=document.getElementById("name"+num)
    input.focus();
    console.log(`change i=${i},k=${k}`)
}
function deleteFunc(id){
    console.log(checkNum(id))
    let num=checkNum(id)
    let input=document.getElementById("name"+num)
    let price=document.getElementById("price"+num)
    let button=document.getElementById("button"+num)
    console.log(`deleteFunc i=${i},k=${k}`)
    //列表中删除对应元素
    let index=products.indexOf(input.value)
    products.splice(index,1)
    //*** */
    addDelete(input.value)
    input.remove()
    price.remove()
    button.remove()
    
    
}
async function addPost(name,price){
    let object={
        name:name,
        price:price
    }
    let response=await fetch("http://localhost:8080/add/check",{
        method:'POST',
        headers:{
           "identity":"users"
        },
        body:JSON.stringify(object)
    })
    let json=await response.json()
    console.log(json)
    if (json.msg=="加入成功"){
        console.log("服务器加入成功")
    }else{
        console.log("服务器加入失败")
    }
}
async function addDelete(name){
    let url="http://localhost:8080/add/check?name="+name
    let response=await fetch(url,{
        method:"DELETE",
        headers:{
            "identity":"users"
        },
    })
    let json=await response.json()
    console.log(json)
    if (json.msg=="删除成功"){
        console.log("服务端删除成功")
    }
}
async function purPost(name,price){
    let object={
        name:name,
        price:price
    }
    let response=await fetch("http://localhost:8080/purchase/check",{
        method:'POST',
        headers:{
           "identity":"users"
        },
        body:JSON.stringify(object)
    })
    let json=await response.json()
    console.log(json)
    if (json.msg=="加入成功"){
        console.log("服务器加入成功")
    }else{
        console.log("服务器加入失败")
    }
}
async function purDelete(name){
    let url="http://localhost:8080/purchase/check?name="+name
    let response=await fetch(url,{
        method:"DELETE",
        headers:{
            "identity":"users"
        },
    })
    let json=await response.json()
    console.log(json)
    if (json.msg=="删除成功"){
        console.log("服务端删除成功")
    }
}
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
async function Get(){
    let response=await fetch("http://localhost:8080/normal/check",{
        method:"GET"
    })
    let json=await response.json()
    console.log(json)
    let addlist=json.addlist["列表"]
    let purlist=json.purlist["列表"]
    console.log(addlist)
    for (let n=0;n<addlist.length;n++){
        add(addlist[n].name,addlist[n].price)
    }
    for (let n=0;n<purlist.length;n++){
        addPur(purlist[n].name,purlist[n].price)
    }
}
Get()