# 设计思路
这里来说下个人对于这个框架和项目的各个方面一些设计思路，不定期更新，想到什么就写什么，欢迎讨论，批评和指正。       
                
## 综述
可以想象如下场景：假设你在一家创业公司，公司里面只有你一个架构师。老板为了省钱，招的其它人都是刚毕业的大学生，体力好能干活有热情<del>会暖床</del>，但没法独立构建项目，也不会考虑代码解耦什么的，他们的任务仅仅是使用框架来写业务逻辑。因此，你所开发的框架，就需要做到能够快速地构建新项目以便于接活，能够让开发者尽可能地专注于业务逻辑以便于节省开发成本，尽可能地封装常用的功能以便于快速开发，这样公司才能赚更多的钱，你也能升职加薪，并且那些小同学们在开发的时候才会称赞你这个架构师很imba而不是在心里默念一句mmp。     
               
所以在设计框架的很多机制的时候，我就是想象以上场景来设计的。总而言之就是，最好是开发人员根本不知道某些机制的存在，他们只要按照开发流程去做，最后<del>惊奇地</del>发现某些机制已经被实现了。例如数据权限控制，以国家标准规范文件管理为例，开发者只需要按照开发流程，写好entity，repository，service和controller，然后再把前端做一遍，最后会发现，他们在开发这个模块的时候，业务逻辑里没有写任何关于数据权限控制的逻辑，但最后却实现了数据权限控制，即不同组织的用户对于相应的国家标准规范文件，有着不同的访问，修改，删除权限。这个就是我个人比较希望达到的结果。     
                    
关于框架的基础技术选择，个人选择的是spring boot作为服务端，react/node.js作为客户端，设计为前后端分离的无状态应用框架。原因其实可以说很多，以下为主要原因：                      
               
* 前后端分离的无状态应用是<del>历史的潮流</del>企业应用开发的大趋势。这样的应用非常适合分布式的微服务架构。                                        
* 个人后端的技术栈是java系，并且既然是做前后端分离的无状态应用，肯定后端选择spring boot<del>不要问我为什么不选spring mvc甚至是struts</del>。不过事实上，一开始我本来后端想用spring cloud来做的，配置中心啦网关啦断路器啦什么的我都搞好了，然后突然觉得一个人搞这么多可能吃不消，因为我当时只会jquery，还不会react和es6，前后端一起学并且只有三个半月的时间并且一人单刷前后端并且还有其他项目任务这种情况很可能会要了朕的老命，所以就换成了spring boot。不过这个项目将来我一定要升级为spring cloud。    
                              
* 前端的话有ng2, react和vue可以选。为什么选了react了呢<del>我才不会说我是因为看上了antd的UI了呢</del>？因为ng2出的时间不长，需要进一步<del>暗中</del>观察，vue的生态圈相比于react来说小了些，所以就选了react。一开始这三个我都试过，个人感觉更喜欢react和vue的写法，而且貌似react和vue的技术栈也差不多。但实际上，UI也是个很重要的问题。个人入react坑有很大原因是因为ant design。对于刚入坑的开发<del>玩家</del>，尤其是后端开发来说，自然是喜欢有一整套漂亮的可靠的UI，这样就能轻松地开发出一个美观的app，不然的话都像一开始学web开发的时候写什么`<input id="username" name="username" type="text" />`之类的，做出来的页面就俩输入框，然后一看“卧槽我学半天就写出来这么个丑东西”从而大受打击，再之后调css还要调半天简直心塞。而ant design的文档非常详细，用户基数也大，所以就不怕踩坑，同时因为它是阿里的官方项目因此不像个人项目哪天他老婆心情不好就放着bug坑了。                
                                     
前端的脚手架用的是：          

https://github.com/OwlAford/easy-react-desktop   
https://github.com/davezuko/react-redux-starter-kit    

这个脚手架的最初的原作者是：             

https://github.com/davezuko             

然后作者说Deprecation Warning，建议使用create-react-app等。。。

好吧应该在2017年4月的时候貌似还没有说这个已经Deprecated。。。           

好在对于这个项目来说，脚手架不是重点。和服务端一样，这个客户端的框架主要提供一个基本CRUD的快速开发，就好比服务端如果换成spring mvc也是照样能用的一样，只要把前端的`src/routes`下面的东西拷到新的脚手架，再配置配置，也是一样能用的              

之后的话，会把前端的项目用<a href="https://github.com/facebookincubator/create-react-app">create-react-app</a>（facebook的官方脚手架）或<a href="https://github.com/dvajs/dva">dvajs</a><del>我喜欢孙dva</del>（antd的官方脚手架）重构下，待老夫先学习一下。。。然后，为什么貌似dvajs好久没更新了<del>我们也爱dva呦</del>。。。
                 
接下来以服务端和客户端进行分述             
                    
## 服务端
框架主要处理了服务端的以下部分：

* Http消息机制               
* 基础CRUD            
* 权限控制              
* 文件上传             
              
以下按照上述列表内容进行分述                 
              
### Http消息机制
但凡写过spring mvc的同志们对controller的这种写法一定不陌生：   
                 
```
@RequestMapping("/test")
public ModelAndView test(@RequestParam(value = "arg")String arg)
```
               
假如说用spring mvc发布RESTful服务，就是这样：          
                  
```
@RequestMapping("/test")
@ResponseBody
public JSONArray test(@RequestParam(value = "arg")String arg)
```
                                
spring这样做是为了给广大用户足够的自由度。可是在实际开发中，对于Http消息的传递，一般是对参数和返回值有所规定的，不能想发什么就发什么，想返回什么就返回什么，因为当因需求改动而改代码的时候，会造成一定的不便。比如，一开始的时候，有一个“查询商品”的需求，搜索条件为商品号，商品名称，那么按照上面的写法，可以写成：      
                                     
```
@RequestMapping("/queryProducts")
@ResponseBody
public JSONArray queryProducts(
    @RequestParam(value = "productCode")String productCode,
    @RequestParam(value = "productName")String productName)
{
    JSONArray productsJsonArray = productService.queryProducts(productCode, productName);
    return productsJsonArray;
} 
```
                   
然后有一天很不幸，客户说，啊呀我们领导说还想根据商品的发售日期来搜索，并且不仅能搜到基本的商品信息，还能搜到这些商品的销售总额占所有商品的百分比，哎呀领导比较关心财务嘛我们也没有办法啦。。。得，这下controller里搜索条件多了一个，返回也不能只返回个JSONArray，还得返回一个百分比，不仅如此，service也得改。于是乎程序就改成这样：      
                  
```
@RequestMapping("/queryProducts")
@ResponseBody
public JSONObject queryProducts(
    @RequestParam(value = "productCode")String productCode,
    @RequestParam(value = "productCode")String productName,
    @RequestParam(value = "salesDate")String salesDate)
{
    JSONObject productsJson = productService.queryProducts(productCode, productName, salesDate);
    return productsJson; 
}
```

先说一下，个人在不是必要的情况下，会一律使用String类型来表示日期。为什么？这是被该需求坑出来的。。。              
                 
然后回到上面的话题，用户改了个需求，于是导致controller和service中相应的函数的参数和返回值都要改（什么你说你在controller里写业务逻辑？厉害了我的哥。。。）。实质上，这个需求涉及到的仅仅是业务逻辑，应该是service层负责的事情。controller负责的事情应该是Http消息的传输，所以道理上来说，controller是不应该发生改变的。     
              
所以，框架封装了Http消息的请求`Request`类和返回`Response`类。所有的Http请求都会被解析为Request类的实例，而对于基本的返回类型（String啦JSON啦之类的），则一律定义成Response类实例，即controller中基本的交互方法都可以写成：     
                
```
@RequestMapping("自定义的路径")
@ResponseBody
public Response doSomething(Request request)
```
                  
`Request`和`Response`的定义可在framework中的com.sinosteel.framework.core.web中找到。
                
查看`Request`类可得知，前端发送的用户信息会被解析至`user`（类型为com.sinosteel.framework.system.basic.domain.User）中，所有的参数会被解析至`params`（类型为com.alibaba.fastjson.JSONObject）中，所有上传的文件会被解析至`files`（类型为org.springframework.web.multipart.MultipartFile）中。其他信息可参考Request类的定义。                   
                      
在`Response`类中，`status`表示后端处理是否成功；`data`表示后端的返回值，类型为com.alibaba.fastjson.JSON，也就是说，可以是JSONObject，也可以是JSONArray；`message`表示后端返回的额外信息，可以用于向前端返回异常信息等<del>不过因为我犯懒了所以这个异常处理机制没有做。。。</del>           
                    
因此，对于上述的例子，controller里可以这么写：
               
```
@RequestMapping("/queryProducts")
@ResponseBody
public Response queryProducts(Request request)
{
    Response response = new Response();

    try
    {
        response.status = ResponseType.SUCCESS;
        response.data = productService.queryProducts(request.getParams(), request.getUser());
    }
    catch(Exception e)
    {
        response.status = ResponseType.FAILURE;
        response.message = e.message;
    }

    return response;
}
```
                       
当上述例子中的需求改动出现的时候，可以看出来controller是不需要改的，只要改动service即可              

具体的解析机制在framework中的com.sinosteel.framework.core.web.RequestArgumentResolver中，配置在framework中的com.sinosteel.framework.config.web.WebConfig中    
              
当然，这种封装对前端发送的请求是有要求的，前端请求的参数需按如下设置：        
            
* username：用户名，存于客户端的localStorage，不可为空          
* clientDigest：消息摘要，用于验证用户身份，存于客户端的localStorage（当然，想要存到cookie里也行），不可为空            
* params：请求参数组成的js object。可为空          
* files：前端上传的文件信息，可为空              
                      
可参考前端工程framework-webclient中src/utils/FetchUtil.js的写法。如果是文件上传的话，需要使用H5的FormData，普通的请求可以直接用JSON。   

个人认为，为了规范消息传递，便于代码修改，这些限制是有必要的，不然的话前端今天传个int，明天传个String，后端就得跟着改。这是框架封装消息机制的初衷。   
                
对于返回信息来说，不一定必须使用Response（但基本的消息传递最好使用）。比如文件下载，二进制流之类的，可以使用spring自带的ResponseEntity来完成。<del>好吧由于目前没这个需求导致我又懒了只做了文件下载没做其它的。。。</del>
                    
### 基础CRUD
基本的CRUD早在老SSH（spring，struts，hibernate）的年代就有了，很多框架会有比如BaseEntity，BaseDao，BaseService之类的。当然，这个框架也不例外，同样定义了这些base实体和基础CRUD。框架使用的jpa实现是基于hibernate的spring data jpa，不过同时也整合了mybatis（以前还叫ibatis的啊，岁月啊。。。），也就是说，框架是有两个orm共存的，可以同时使用。这是为了不同需求而考虑的，对于范式设计（当然，也可以不那么范式，应该说是实体类映射的表，或者通俗点说就是纵表），可以采用spring data jpa来进行数据库操作，而对于反范式设计（比如横表）或是复杂查询，使用mybatis会更为容易一些。比如有这么个情况，一个图书借阅系统，一个学生可以借多本书，一本书也可以在不同时段被多个学生借（当然，在一本书正在被借阅的时候，其它人是不能借阅的），数据库需要存借阅信息。那么根据以上需求，可以设计成如下样子：    

**注：以下是范式设计，实际项目一般不会设计得这么范式。比如图书Book类，一般会加个字段表明是否正在被借阅（不然按照下面的纯范式设计的话，类似于“查询所有正在被借阅的图书”等类似的需求会要人命的）**
                                       
```
/**
* 图书
* 如果继承框架的BaseEntity的话，就不用写id和name属性，下同
* 这里是为了更清晰地说明数据库设计，因而没有继承BaseEntity
*/
@Entity
@Table(name = "TBL_BOOK")
public class Book extends
{
    @Id
    @GeneratedValue(generator = "uuid") 
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "BOOK_ID")
    private String bookId;

    @Column(name = "BOOK_NAME")
    private String bookName;

    @OneToMany
    @JoinColumn(name = "BOOK_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
    private List<Borrow> borrows; //借书记录，不要吐槽动词加了s。。。
}

/**
* 学生
*/
@Entity
@Table(name = "TBL_STUDENT")
public class Student
{
    @Id
    @GeneratedValue(generator = "uuid") 
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "STUDENT_ID")
    private String studentId;

    @Column(name = "studentName")
    private String studentName;

    @OneToMany
    @JoinColumn(name = "STUDENT_ID", foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT))
    private List<Borrow> borrows;
}

/**
* 借阅记录
*/
@Entity
@Table(name = "TBL_BORROW")
public class Borrow
{
    @Id
    @GeneratedValue(generator = "uuid") 
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "BORROW_ID")
    private String borrowId;

    @Column(name = "BORROW_DATE")
    private String borrowDate;

    @Column(name = "EXPECTED_RETURN_DATE")
    private String expectedReturnDate;

    @Column(name = "ACTUAL_RETURN_DATE")
    private String actualReturnDate;
}
```
                                                
关于hibernate和mybatis之争也是历史悠久了，hibernate作为老牌orm，jpa规范的实现，有着诸多优点。然而当前也有很多互联网公司用的是ssm整合的框架（spring, springmvc, mybatis）。个人认为，应该先去了解两个orm各自的优势和局限，再根据实际的业务需求来做出选择。如果业务能够抽象成实体类来进行逻辑编写的，比如这个图书管理的例子，是可以抽象出来相关业务实体的，那就应该使用jpa，而不是盲目跟风用mybatis，比如如果添加一本图书的话：      
             
jpa：saveEntity，没了                     
mybatis：首先配在mapper里面配置实体类的映射，然后写<insert>标签里面写`INSERT INTO TBL_BOOK......`         

这还不算，假如这时候客户说了“啊呀图书的话我们还需要加个图书的出版日期”，于是乎，实体类就得加一条`private String issueDate`，这时：
               
jpa：还是saveEntity，只要改实体类的定义就完事了            
mybatis：首先改实体类Book，然后在mapper中添加新字段的映射，然后再改掉之前写的<insert>                    
             
用过mybatis的应该知道这是挺烦人的事情。这还是简单的例子，而诸如像一对多，多对多的实体类设计的话，改起来那真是要人命。当然如果用spring boot结合mybatis-spring-boot-starter的话，倒是不用配置实体类映射了，但是sql的修改是不可避免的。实际上我个人觉得道理也很简单，既然都能抽象出
**不复杂的**
业务实体了，就说明一定能够契合jpa规范，那么jpa实现起来就是比mybatis要容易方便，所以在不是极致追求效率的情况下，干嘛不用更合适的工具呢？（什么你说你们公司根本不定义实体类？那建议直接上jdbcTemplate，但是你们真的一个实体类都不定义嘛你确定嘛。。。）      
                    
mybatis这么流行当然不是没有原因的，跟jpa相比，个人认为最大的区别恐怕就是其不囿于jpa，给开发者提供了足够的灵活性了，同时能够进行手动sql调优。当数据表是反范式设计的时候，比如可能大多数人都见过的例子：一个工单表有100左右个字段这种，比如：                  

SHEET_ID，SHEET_CODE，CURRENT_STATUS, CURRENT_HANDLER...等100个字段           

还别说这还真是业务实体，然而过于庞大。我见过的解决方案是jpa只做部分字段的映射，其余交给sql语句，比如这样：            
                             
```
/**
* 跟上面相比，只映射了两个字段, CURRENT_STATUS没有映射
*/
@Entity
@Table(name = "TBL_WORK_SHEET")
public class WorkSheet
{
    @Id
    @GeneratedValue(generator = "uuid") 
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "SHEET_ID")
    private String sheetId;

    @Column(name = "SHEET_CODE")
    private String sheetCode;

    @Column(name = "CURRENT_STATUS")
}
```

但是这样的话，jpa所能做到的事情就很有限，比如根据一个没被映射的字段（例如CURRENT_HANDLER）来返回实体，并且只映射几个字段（比如SHEET_CODE和CURRENT_STATUS），hql就写不了了，只能用NativeQuery写sql，返回值要自己一个一个去映射（因为addEntity的话不返回映射的所有字段是会报错的），但是mybatis就不存在这样的问题，mybatis可以这么写：   
                 
```
@Select
@Results(
{
    @Result(property = "sheetId", column = "SHEET_ID"),
    @Result(property = "sheetCode", column = "SHEET_CODE")
})
```

此外，如果根本不能抽象成业务实体，比如举个工控的例子，同一时间所有PLC点位的数值存储是个横表，也就是是说这么设计的：    
                  
ID，TIME, VALUE1, VALUE2，VALUE3......            
               
当然这也可以做成纵表，这么做的人坟头草都已经两丈高了，都是被后来写各种join给累死的。。。在这种根本不符合jpa的情况下，显然mybatis或jdbcTemplate更为合适
                    

