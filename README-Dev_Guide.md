# 开发指南
框架提供了供基本CRUD开发所用的基类和机制，可参考仓库中所提供的framework-example工程      
                        
假如有一个管理国家标准规范文件的需求，即对于公司收录的国家标准文件需要进行基本的增删改查操作，则需要定义标准文件的相关模型和服务，以下叙述将以该国家标准文件管理需求为例（也是framework-example中的例子）：   

## 服务端          
### 文件结构              
实际开发中，文件夹可以按照业务模块来划分，也可以按照代码分层规则划分。framework-example所给出的例子是按照业务模块来划分的，个人也比较倾向这种划分方式。  

对于上述国家标准文件管理需求，可以新建一个包叫做knowledge，在knowledge这个package中再依次建立domain，repository，service，web4个子包，分别对应实体类层，数据访问层，业务逻辑层和控制交互层。  

需要注意的是，以上为个人偏好的划分方式，框架并没有这样的“约定”。因此实际上，包的数量，包名等都可以自行定义。例如，若数据库采用反范式设计，不定义实体类，就无需domain包，若要使用mybatis，可以建立mapper包，将mybatis的mapper文件放到里面。事实上，framework中的system模块就采用了mybatis。  

### 代码分层             
(1) 实体类层     

框架提供了BaseEntity基类供实体类继承，BaseEntity包含一些公共的基本信息包括id，name等。id为string类型，生成策略为uuid，因为个人不喜欢用自增主键。除非有特殊的需求设计，否则实体类都需要继承BaseEntity，才能使用框架的一些特性。   

对于上述国家标准文件管理需求，则可以在knowledge.domain包中定义一个叫Standard的实体类，继承BaseEntity，即:             

`public class Standard extends BaseEntity`       
                      
框架中的配置是自动建表的，无需再在数据库中手动建表。    

(2) 数据访问层                

框架提供了BaseRepository接口供使用spring data jpa的数据访问层来继承。BaseRepository实际上继承了spring data jpa中的JpaRepository，因此包含JpaRepository中的基本的CRUD方法，具体可参考spring data jpa的文档。此外，BaseRepository中提供了执行hql和sql的动态查询方法，可返回List和PageResult，PageResult为分页查询的结果。当然，也可以使用spring data jpa自带的Specification来进行动态条件查询。所以为什么框架还要提供执行hql和sql的动态条件查询方法呢？因为个人认为Specification的方式相比于hql和sql来说实在是不够人性化。            

对于上述国家标准文件管理需求，则可以在knowledge.repository包中定义一个叫StandardRepository的接口，继承BaseRepository，即:         

`public interface StandardRepository extends BaseRepository<Standard>`                                        
                  
如果出现需要多个联表查询，或是反范式设计的情况，可以使用mybatis，无需继承任何类或接口。建议使用注解风格的mybatis mapper，可参考framework中的system模块中的mapper写法。      

(3) 业务逻辑层               

框架提供了BaseService基类，BaseService已标注@Transactional注解进行事务控制，同时提供与数据权限相关的CRUD方法。若实体类已继承BaseEntity并且需要对其进行数据权限控制，则对应的业务逻辑类需要继承BaseService，同时新增实体必须使用BaseService中的saveEntity方法，修改实体必须使用BaseService中的updateEntity方法。        

对于上述国家标准文件管理需求，则可以在knowledge.service中新建一个叫StandardService的业务逻辑类，继承BaseService，即:             
                    
`public class StandardService extends BaseService<Standard>`               

并且在新增国家标准文件和修改国家标准文件时，必须使用`this.saveEntity`和`this.updateEntity`方法，这些方法是从BaseService中继承而来的。        

(4) 控制交互层        

框架提供了BaseController基类，提供了一个统一的服务请求路径/services，即若继承了BaseController，则该类中定义的所有的服务请求路径都在contextPath/services/路径下。若要对请求路径进行功能权限控制，则必须继承BaseController            
框架将请求（request）和应答（response）封装成了两个类Request和Response。框架会将所有的http请求解析成Request类的实例，并且会将Response实例返回给前端。      

Request中包含发起请求的User实例，uri，请求时间和请求参数等内容。框架将http请求解析成Request时，会将参数解析为com.alibaba.fastjson.JSONObject类型存入Request中的params属性里。此外，Request也能够接收通过multipart/form-data发送的文件流存在Request中的files属性里，无需人工手动解析。      

Response中包含三个内容：status，data和message。status表示响应情况，只有ResponseType.SUCCESS和ResponseType.FAILURE两种。data表示返回的数据，必须是com.alibaba.fastjson.JSON的格式，即fastJson的JSONObject和JSONArray两种类型。message表示服务端额外返回的信息，为string类型，可用于前端的报错说明等情况。       

控制交互类中与前端进行交互的方法（即标有@RequestMapping注解的方法），参数有且只有一个，为Request类型；返回值建议统一采用Response类型。      

对于上述国家标准文件管理需求，则可以在knowledge.web中建立StandardController类，继承BaseController，即:        

`public class StandardController extends BaseController`              

一个新增标准文件的交互方法可以写成:            
                               
`public Response addStandard(Request request)`              

一个查询标准文件的交互方法可以写成:                 
                       
`public Response queryStandards(Request request)`                
                             
在控制交互类中，可以进行功能和数据权限控制。功能权限采用的是apache shiro，采用shiro自带的注解`@RequiresPermissions`控制。系统的模块，菜单和功能可在src/resources/structure.json中进行配置。对于上述的国家标准文件的需求，可以定义为： 

```             
{                  
    "id": "4",        
    "code": "KNOWLEDGE",          
    "name": "知识库",        
    "moduleIcon": "global",               
    "modulePath": "/index/global",            
    "menus": [         
        {           
            "id": "4-0",       
            "code": "4-0",      
            "name": "国家标准规范",      
            "menuIcon": "book",        
            "menuPath": "/standard_list",      
            "functions": [      
                {    
                    "id": "4-0-F0",         
                    "code": "4-0-F0",      
                    "name": "新增国家标准",      
                    "functionString": "addStandard"      
                },       
                {               
                    "id": "4-0-F1",              
                    "code": "4-0-F1",           
                    "name": "删除国家标准",              
                    "functionString": "deleteStandard"          
                },                  
                {            
                    "id": "4-0-F2",                
                    "code": "4-0-F2",           
                    "name": "修改国家标准",         
                    "functionString": "editStandard"       
                },            
                {              
                    "id": "4-0-F3",             
                    "code": "4-0-F3",            
                    "name": "查询国家标准",            
                    "functionString": "queryStandards"       
                }             
            ]        
        }          
    ]            
}   
```                              

模块，菜单和功能分别对应系统中的Module, Menu和Function类，其关系为：一个模块对应一或多个菜单，一个菜单对应0或多个功能。因此，对于上述的新增标准文件的功能，在配置好功能之后，若对其进行功能权限控制，可写成：  

```        
@RequiresPermissions("addStandard")     
public Response addStandard(Request request)           
```            

对于数据权限控制，框架提供了一个基于aop的注解`@RequiresAuthorization`，来为基本的CRUD开发提供方便的数据权限控制。在默认情况下，用户可查询，修改和删除自己所拥有的实体信息，可查询但不能修改或删除所在组织的实体信息，无法查询，修改和删除其它组织的实体信息。例如，对于上述的查询标准文件功能，可写作如下形式：

```               
@RequiresAuthorization(                 
    requestType = RequestType.QUERY,                 
    serviceClass = StandardService.class)   
public Response queryStandards(Request request)          
```                      

这表明，用户在查询国家标准文件的时候，可以查到所在组织中所有人之前所添加的国家标准文件信息，可以修改或删除自己之前添加的国家标准文件信息，但不能删除或修改所在组织其他人之前所添加的国家标准文件信息。此外，对于其它组织的其他人之前所添加的国家标准文件信息，该用户查不到，也无法修改或删除。    

`@RequiresAuthorization`的配置参数有：            
              
* `requestType`：指明请求的种类，共四种，`RequestType.Query`, `RequestType.Add`, `RequestType.Delete`, `RequestType.Edit`；
* `serviceClass`：指明实体所对应的Service类，例如对于Standard类来说，`serviceClass`就是`StandardService`；            
* `queryScope, editScope, deleteScope`：分别指明对于某个实体类来说，查询，修改和删除的权限范围，取值都为以下4中之一：
    - `AuthorizationScope.ALL`：表示权限范围为所有信息    
    - `AuthorizationScope.ORGANIZATION`：表示权限范围为所在组织    
    - `AuthorizationScope.USER`：表示权限范围为用户   
    - `AuthorizationScope.NONE`：表示没有任何权限              
                               
例如，对于国家标准文件这个例子来说，实际的情况可能是这样，客户希望用户能够访问到所有组织所有人所添加的文件，并且修改和删除权限放宽至组织级别，即用户可以查到所有的国家标准文件，能够修改和删除所在组织的文件，不能修改和删除其它组织的文件。该情况下，对应的权限控制注解可写作如下形式：        

```          
@RequiresAuthorization(               
    requestType = RequestType.QUERY,        
    serviceClass = UserService.class,      
    queryScope = AuthorizationScope.ALL,         
    editScope = AuthorizationScope.ORGANIZATION,     
    deleteScope = AuthorizationScope.ORGANIZATION)        
public Response queryStandards(Request request)     
```              

至此，后端开发完毕，后端将发布相应的带有权限控制的rest风格服务供前端调用          
                          
## 客户端               
### 文件结构              
该项目采用react全家桶，采用ES6语法，UI组件源自antd，脚手架引自：   

https://github.com/OwlAford/easy-react-desktop   
https://github.com/davezuko/react-redux-starter-kit    

在此表示感谢                
                
这个脚手架的最初的原作者是：             

https://github.com/davezuko             

文件结构和上述引用的脚手架一致，即页面部分都在`src/routes`中完成。和上文中提到的服务端类似，`src/routes`下的文件夹按照业务模块来进行划分，这是个人比较习惯的一种方式。     

### 开发步骤                
对于基本的CRUD的页面，基本的元素可以简单分为：列表，搜索栏，新增页面，修改页面，查看页面。框架结合redux，将这些元素抽象成了一些公共页面，使开发无需关心如何设置redux的store，state，分页，样式等等，只需要继承这些公共页面即可完成基本CRUD开发。框架所抽象的公共页面元素位于`src/common/basic`中，包括：  

* `AddView`：框架抽象的公共新增页面                 
* `EditView`：框架抽象的公共修改页面              
* `InspectView`：框架抽象的公共查看页面             
* `ListComponent`：框架抽象的公共数据列表组件               
* `SearchComponent`：框架抽象的公共搜索栏组件              
* `OperationComponent`：框架抽象的公共操作栏组件               
* `ListView`：由ListComponent，SearchComponent和OperationComponent组合而成的公共列表页面。                  

以下以上述国家标准文件管理需求为例来进行开发，首先，在`src/routes`下建立文件夹`knowledge`，在文件夹中新建:           
                   
* `StandardAddView.js`         
* `StandardEditView.js`           
* `StandardInspectView.js`         
* `StandardListComponent.js`          
* `StandardSearchComponent.js`                 
* `StandardListView.js`           
                    
这些新建的文件和上述的抽象公共页面是一一对应的。   

#### 新增页面（AddView）               
`StandardAddView`表示新增国家标准文件的页面，可将它定义为一个类，并继承AddView，即：       
                
```
import AddView from 'common/basic/components/AddView;        
export default class StandardAddView extends AddView           
{         
    ...         
}                    
```              
                    
具体写法可参照framework-webclient          

对于继承了AddView的类（在这里就是StandardAddView），需要给类属型`addPath`赋值，`addPath`是用于处理新增请求的后端服务路径      

AddView由一个表单和一个提交按钮组成，如下图所示：        
             
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/AddView.png" />   

在AddView基类中有两个重要方法：      

* `handleValues(values)`的作用是在表单将数据传给服务端之前，对数据进行处理。`values`为一个包含了表单所要提交的数据的object，在用户点击提交按钮后生成，`values`会在经过`handleValues`处理后提交给后端。`handleValues`函数的具体逻辑可以自行定义。            
* `renderForm(formItems, function(addButton))`的作用是渲染表单，其中，formItems为表单项的数组，可参考antd的官方例子。function(addButton)为处理addButton的函数，例如可以调整addButton的位置等。        

#### 修改页面（EditView）                      
`StandardEditView`表示修改国家标准文件的页面，和StandardAddView一样，需要定义为一个类并继承EditView，即：     
                
```
import EditView from 'common/basic/components/EditView;        
export default class StandardEditView extends EditView           
{         
    ...         
}                    
```              
                 
具体写法可参照framework-webclient        

和AddView一样，对于继承了EditView的类（在这里就是StandardEditView），需要给类属型`editPath`赋值，`editPath`是用于处理修改请求的后端服务路径      

EditView也由一个表单和一个提交按钮组成，如下图所示：         
              
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/EditView.png" />   

但与AddView不同的是，既然是修改，那么所有的表单项都是有初始值的。在EditView基类中有三个重要的方法，其中`handleValues(values)`和`renderForm(formItems, function(editButton))`和AddView中的如出一辙，而第三个方法`handleInitValues(initValues)`则是用于在给表单项赋初始值之前，对初始值进行处理。其中，`initValues`为一个包含了表单所有项的初始值的object，在经过`handleInitValues`处理后会赋值给所有表单项。`handleInitValues`的逻辑可以自行定义。   

#### 查看页面（InspectView）                 
`StandardInspectView`表示查看国家标准文件的页面，和前两者一样，需要定义为一个类并继承InspectView，即：      
                
```
import InspectView from 'common/basic/components/InspectView;        
export default class StandardInspectView extends InspectView           
{         
    ...         
}                    
```              
              
具体写法可参照framework-webclient                 

InspectView仅有一个赋有初始值且不能进行修改的表单，如下图所示：     
              
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/InspectView.png" />   

因而，和前两者相比，处理相对简单一些。既然是查看，那么表单同样是有初始值的。和EditView不同的是，InspectView中的所有值是在`this.props.item`里面的，对其进行操作即可。此外，InspectView基类中同样提供了`renderForm(formItems)`方法，由于没有按钮所以没有第二个参数，仅需要对`formItems`进行操作即可。             

#### 数据列表组件（ListComponent)                       
`StandardListComponent`    即为国家标准文件的列表，和之前一样，需要定义为一个类并继承ListComponent，即：        
                
```
import ListComponent from 'common/basic/components/ListComponent;        
export default class StandardListComponent extends ListComponent           
{         
    ...         
}                    
```              
            
具体写法可参照framework-webclient         
                
公共列表组件如下图所示：            
                     
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/ListComponent.png" />   

公共数据列表ListComponent中已经包含了分页，数据传递，数据权限控制等等，同时无需手动render，因此只需给继承的类属型赋值即可，这些类属型如下：         

* `columns`：和antd的table组件中的columns一样的写法，请参照antd             
* `inspectViewTabName`              ：点击“查看”按钮后，弹出的标签页的标题。在这个例子中，可以写成`this.inspectViewTabName = '查看国家标准'`             
* `inspectView`：点击“查看”按钮后，弹出的标签页的内容页面。在这个例子中，可以写成`this.inspectView = StandardInspectView`      
* `editViewTabName`：点击“修改”按钮后，弹出的标签页的标题。在这个例子中，可以写成`this.editViewTabName = '修改国家标准'`     
* `editView`：点击“修改”按钮后，弹出的标签页的内容页面。在这个例子中，可以写成`this.editView = StandardEditView`    
* `deletePath`：点击“删除”按钮后并在出现的对话框中选择“是”之后，前端发送到后端的删除请求路径                

#### 公共搜索栏组件（SearchComponent）                 
`StandardSearchComponent`即为国家标准文件的搜索条件，和之前一样，需要定义为一个类并继承SearchComponent，即：       
                
```
import SearchComponent from 'common/basic/components/SearchComponent;        
export default class StandardSearchComponent extends SearchComponent           
{         
    ...         
}                    
```              
            
具体写法可参照framework-webclient      

公共搜索栏组件如下图所示：                 
                
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/SearchComponent.png" />   

和上述的AddView的写法一样，SearchComponent由一个表单和一个搜索提交按钮组成，需要给基类的类属性`queryPath`赋值，表示后端的搜索请求路径，并指定formItems然后使用基类的`renderForm(formItems)`来渲染表单，用法也和上述的AddView相同，这里不再赘述。       

#### 公共操作栏组件（OperationComponent）               
`StandardOperationComponent`即为操作栏，和之前一样，需要定义为一个类并继承OperationComponent，即：     
                
```
import OperationComponent from 'common/basic/components/OperationComponent;        
export default class StandardOperationComponent extends OperationComponent           
{         
    ...         
}                    
```              
            
具体写法可参照framework-webclient     

公共操作栏组件如下图所示：                 
                 
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/OperationComponent.png" />   

其写法比InspectView还要简单，只需要指定以下属性的值即可：     

* `addViewName`：点击“新增”按钮后，弹出的标签页的标题。在这个例子中，可以写成`this.addViewName = '新增国家标准'`      
* `addView`：点击“新增”按钮后，弹出的标签页的内容页面。在这个例子中，可以写成`this.addView = StandardAddView`    
* `deletePath`：点击“删除”按钮后并在出现的对话框中选择“是”之后，前端发送到后端的删除请求路径              

#### 公共列表页面（ListView）                
`StandardListView`即为组合了`StandardSearchComponent`，`StandardOperationComponent`和`StandardListComponent`的列表页面。同样，它需要被定义为一个类，并继承ListView，即：    
                
```
import ListView from 'common/basic/components/ListView;        
export default class StandardListView extends ListView           
{         
    ...         
}                    
```              
            
具体写法可参照framework-webclient          

公共列表页面如下图所示，同时可以看出，它是一个组合了搜索栏，操作栏和列表组件的页面：                
                  
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/ListView.png" />   

可能会有这样的疑问：既然是组合了其它三个组件，为什么还要分开写，写成一个组件不行吗？这是因为我个人出于一定的灵活性考虑，首先，保不齐其他地方也需要列表组件，那么之前所写的ListComponent是可以被复用的。其次，有时候页面可能不需要搜索栏或者操作栏，那么在目前这种情况下，ListView是能够自由组合的：如果不需要，就直接不写就可以了（默认为null，基类的render机制是当定义为null的时候则不进行渲染）。    

继承了ListView的类的操作相对简单一些，只需要指定以下属性的值即可：    

* `name`：redux的store中的模块的名称，这个是必填项            
* `operationComponent`：列表页面的操作栏。在这个例子中，可以写成`this.operationComponent = StandardOperationComponent`               
* `addAuthString`：用户新增信息的权限，需要和后端的`functionString`定义一致。系统会检查用户是否新增权限，如果没有的话，则操作栏的”新增“按钮不显示。在这个例子中，可以写成`this.addAuthString = 'addStandard'`                 
* `deleteString`：用户删除信息的权限，需要和后端的`functionString`定义一致。系统会检查用户是否删除权限，如果没有的话，则操作栏的”删除“按钮不显示。在这个例子中，可以写成`this.deleteAuthString = 'deleteStandard'`             
* `searchComponent`：列表页面的搜索栏。在这个例子中，可以写成`this.searchComponent = StandardSearchComponent`                
* `listComponent`：列表页面的数据列表。在这个例子中，可以写成`this.listComponent = StandardListComponent`              

在上述所有的文件全部编写好之后，在`src/tabsmap.js`中的数组里，添加：     
                      
```            
{                    
    path: '/standard_list',                     
    component: ItemContainer('standard', StandardListView)                   
}     
```                          
                 
其中，`path`需要和之前在服务端所定义的`structure.json`中对应的menu中的`menuPath`一致。`ItemContainer`位于`src/common/basic/containers`中，它所需的第一个参数是对应的redux的store中模块的名称，需要和在ListView中定义的`name`类属型一致。第二个参数是对应的ListView（不是名称，需要import对应的ListView组件）。          

至此，前端相应部分开发完毕，使用者无需关心如何实现权限，分页，设计样式等等令人头疼的问题。      
