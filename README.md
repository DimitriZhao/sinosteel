# 项目介绍
首先，飞龙骑脸怎么输      

其次，我当时就念了一句诗：苟 毒 爆 一 波      

然后，这是一个以Spring Boot和React/Node.js为基础的个人开发的全栈传统web应用框架            
最后，还是再说一下，这是*个人独立单刷*的*全栈*框架和项目，所以难免有一些疏忽或设计问题，欢迎指教和意见，如若喷请轻喷，请照顾一下准备换工作正在求职的风雨飘摇的90后空巢老人的感受，谢谢              
                  
# 项目演示
地址：http://47.93.233.254:9016

用户名：admin      
密码：admin     

该地址所演示的是一个实际项目，用于北京国冶锐城公司，目前处于测试阶段
             
# 项目截图       
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/framework0.png" />      
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/framework1.png" />  
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/framework2.png" />  
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/framework3.png" />  
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/framework4.png" />       
<img src="https://github.com/DimitriZhao/screenshots/blob/master/sinosteel/framework5.png" />   
                          
# 项目特点
## 服务端：
服务端/客户端完全分离       
无状态应用       
面向服务的结构       
注解风格       
采用JSON格式传输信息         
提供面向对象的实体开发基类        
多ORM用于不同场景     
具有功能权限和数据权限机制        
自定义的数据权限控制注解        
封装了消息，数据分页及缓存等机制          

## 客户端
采用ES6语法   
单页面应用    
面向对象的开发风格      
标签页为主的展示风格    
通用的实体模型展示      
公共的用于文件上传，请求和权限工具             
可进行热部署          

# 技术栈
## 服务端   
基础：spring boot    
ORM：spring data jpa 和 mybatis        
缓存：redis      
权限：apache shiro（无状态应用）    
项目构建：apache maven      

## 客户端
react + ant design + react-redux-router + redux-thunk + webpack + nginx

# 使用说明
该仓库中包含两个文件夹：“server” 和 “client”。“server” 文件夹为服务端项目，“client” 文件夹为客户端项目。两者都可以独立运行

## 服务端
“server” 文件夹中包含 “framework” 和 “framework-example” 两个Java工程。“framework” 是 “framework-example” 的依赖工程  
“framework-example” 是一个基于该框架所开发的项目 

运行服务端：

```             
$ cd framework-example               
$ mvn package              
$ cd framework-example/target               
$ java -jar framework-example-1.0.0.jar       
```                      

## 客户端:
“client” 文件夹是一个可在nodejs环境下运行的react项目 

运行客户端开发模式:  

```            
$ cd framework-webclient
$ npm install             
$ npm run dev            
```                   

部署生产环境:  

```                  
$ cd framework-webclient                 
$ npm install                     
$ npm run build         
```                       

生成的文件位于 dist 文件夹中, 可在nginx中部署                  

# 开发指南
如何使用框架开发，请参考<a href="https://github.com/DimitriZhao/sinosteel/blob/master/README-Dev_Guide.md">开发指南</a>

# 项目引用                 
https://github.com/bodyno/react-starter-kit               
https://github.com/davezuko/react-redux-starter-kit                

**在此表示感谢**           