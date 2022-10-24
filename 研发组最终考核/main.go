package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type Product struct {
	Name  string `json:"name"`
	Price string `json:"price"`
}
type Purchase struct {
	Name  string `json:"name"`
	Price string `json:"price"`
}
type products map[string]Product
type purchase map[string]Purchase

var purchaseList = purchase{
	"香蕉": {
		Name:  "香蕉",
		Price: "15",
	},
}

var productsList = products{
	"苹果": {
		Name:  "苹果",
		Price: "15",
	},
}

type addList map[string]interface{}
type purList map[string]interface{}

func getValue(ctx *gin.Context) {
	var list = []Product{}
	var listPur = []Purchase{}
	for i := range productsList {
		list = append(list, productsList[i])
	}
	for i := range purchaseList {
		listPur = append(listPur, purchaseList[i])
	}
	var addlist = addList{"列表": list}
	var purlist = purList{"列表": listPur}
	ctx.JSON(200, gin.H{
		"addlist": addlist,
		"purlist": purlist,
	})
}

func postValue(ctx *gin.Context) {
	var product Product
	err := ctx.BindJSON(&product)
	if err != nil {
		ctx.JSON(400, gin.H{
			"msg": "传入失败",
		})
		//日志输出
		log.Print("Error to request your input")
		return
	}
	_, ok := productsList[product.Name]
	if ok {
		ctx.JSON(400, gin.H{
			"msg": "该商品已存在",
		})
		return
	}
	productsList[product.Name] = product
	ctx.JSON(200, gin.H{
		"msg": "加入成功",
	})
	log.Print(productsList)
	log.Print(purchaseList)

}
func postValuePur(ctx *gin.Context) {
	var purchases Purchase
	err := ctx.BindJSON(&purchases)
	if err != nil {
		ctx.JSON(400, gin.H{
			"msg": "传入失败",
		})
		//日志输出
		log.Print("Error to request your input")
		return
	}
	//不必检测，一般情况下商品那不重复，这里不可能重复
	purchaseList[purchases.Name] = purchases
	ctx.JSON(200, gin.H{
		"msg": "加入成功",
	})
}
func deleteValue(ctx *gin.Context) {
	var name = ctx.Query("name")
	_, ok := productsList[name]
	if !ok {
		ctx.JSON(400, gin.H{
			"msg": "输入的商品不存在",
		})
		log.Print("输入不存在")
		return
	}
	log.Print(name)
	log.Print(productsList)
	log.Print(purchaseList)
	delete(productsList, name)

	ctx.JSON(200, gin.H{
		"msg": "删除成功",
	})

}
func deleteValuePur(ctx *gin.Context) {
	var name = ctx.Query("name")
	_, ok := purchaseList[name]
	if !ok {
		ctx.JSON(400, gin.H{
			"msg": "输入的商品不存在",
		})
		log.Print("输入不存在")
		return
	}
	delete(purchaseList, name)
	ctx.JSON(200, gin.H{
		"msg": "删除成功",
	})
}
func main() {
	engine := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AddAllowHeaders("identity")
	engine.Use(cors.New(config))

	product := engine.Group("/add", checkUser())
	{
		product.POST("/check", postValue)
		product.DELETE("/check", deleteValue)
		//user.DELETE("/test",)
	}
	userNormal := engine.Group("/normal")
	{
		userNormal.GET("/check", getValue)
	}
	purchase := engine.Group("/purchase", checkUser())
	{
		purchase.POST("/check", postValuePur)
		purchase.DELETE("/check", deleteValuePur)
		//user.DELETE("/test",)
	}

	err := engine.Run(":8080")
	if err != nil {
		log.Println("接口传出错误")
	}
}
func checkUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var identity = ctx.Request.Header.Get("identity")
		if identity != "users" {
			ctx.JSON(http.StatusForbidden, gin.H{
				"msg": "forbidden",
			})
			ctx.Abort()
		}
		ctx.Next()
	}

}
