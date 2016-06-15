
function getClass(classname,obj){//两个参数 类名，对象
	var obj=obj||document; //第二个参数传入调用第二参数，否则为undefined就执行document
	if(obj.getElementsByClassName){   //判断浏览器是否支持Byclassname,直接返回类数组
		return obj.getElementsByClassName(classname);//classname如果有括号就直接运行了 IE6不支持
	}else{
		var arr=[];//创建数组保存下面的标签
		var alls=document.getElementsByTagName("*");//获取所有标签，页面中所有元素
		for(var i=0;i<alls.length;i++){
			if (checkClass(alls[i].className,classname)) {//alls[i].className是获取数组中的类名，是它的属性；第二个是匹配的类名，即调用的参数
				arr.push(alls[i]);//比较的是类名，取的是元素
			}
		}                      
		return arr;       //获取所有 检测是否符合classname 用数组存
	}
}

function checkClass(search,match){     //调入的类名，匹配的类名
	var brr=search.split(" ");        //字符串分割成数组 “one two three”  box 进行一个一个比  空格分割，匹配
	for(var i=0;i<brr.length;i++){
		if(brr[i]==match){
			return true;
		}
	}
	return false;
}

// 处理getClass的兼容性问题，处理在一个对象下的去找对应的元素


 function getInner(obj,value){     //传入对象obj  value不传是获取，传是设置
 	if(obj.textContent){            //判断浏览器
 		if(value==undefined){      //形参不传值是undefined
 		    return obj.textContent;
 		}else{
			obj.textContent=value;
		}
 	}else{
		if(value==undefined){
		    return obj.innerText;
 		}else{
			obj.innerText=value;
		}
 	}
 }


//获取嵌入式样式 外部样式

function getStyle(obj,style){
	if(obj.currentStyle){
		return obj.currentStyle[style];//在对象中，var obj={name:"lisi"} 1.console.log(obj.name) 2.console.log["name"] 因为obj.currentStyle.width,所以也可以obj.currentStyle["width"],传入的是字符串
	}else{
		return getComputedStyle(obj,null)[style];//火狐
	}
}


//id $("#one")  class $(".one")  tag "div"
function $(search,obj){    //obj指的是对象下找 同classname的obj search字符串
	var obj=obj||document;
	if(typeof(search)=="string"){		
		if(search.charAt(0)=="#"){   //看第一个字符判断类型
			return document.getElementById(search.substr(1));//截取#符号后
		}else if(search.charAt(0)=="."){
			return getClass(search.substr(1),obj);
		}else{
			return obj.getElementsByTagName(search);//传入就是obj，不传就是document调用
		}
	}else if(typeof(search)=="function"){
		window.onload=function(){
			search();
		}
	}
}


//获取子节点
//获取元素节点  元素加文本   a==元素节点 b==元素或者文本(bukong)
//思路：通过父节点获取字节点，所以要先给一个父节点(即调用相关属性的对象)
function  getChilds(obj,type){
	var type=type||"a"; //判断取什么子节点
	var all=obj.childNodes; //获取子节点
	var arr=[];            //获取的子节点存入数组
	for(var i=0;i<all.length;i++){ //循环判断节点是a 还是 b
		if(type=="a"){
			if(all[i].nodeType==1){  //节点类型
			   arr.push(all[i]);
			}
		}else if(type=="b"){
			if(all[i].nodeType==1||(all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*\$/g,""))){//正则去掉括号
				arr.push(all[i]);
			}	
		}
	}
	return arr;
}

//获取第一个子节点
function getFirst(obj){
	return getChilds(obj)[0];
}

//获取最后一个子节点
function getLast(obj){
	return getChilds(obj)[getChilds(obj).length-1];//最后一个子节点
}
function getLastb(obj){
	var nub=getChilds(obj,"b");
	return nub[nub.length-1];  //最后一个子节点,默认形式不是a，针对于getChilds
}

//兄弟

// function getPrevious(obj){
// 	var previous=obj.previousSibling;
// 	if(previous==null){
// 		return false;
// 	}else{
// 		while(previous.nodeType==3||previous.nodeType==8){ //如果下一个是文本节点或者是注释节点，不是希望的元素节点
// 			previous=previous.previousSibling  //判断下一个的下一个
// 			if(previous==null){
// 				return false;
// 			}
// 		}
// 		return previous;
// 	}
// }


function getNext(obj,type){
	var type=type||"a"
	var next=obj.nextSibling;
	if(next==null){  //如果根本没有下一个元素，直接返回空
		return false;
	}else if(type=="b"){       //下面对应的是有空格的文本被替换掉空格剩下纯文本再取反,即空文本
		while((next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*\$/g,""))||next.nodeType==8){ 
			next=next.nextSibling  //判断下一个的下一个
			if(next==null){
				return false;
			}
		}
		return next;
	}
}

//将方法插入到某个对象之前
function insertBefore(obj,before){
	var parent=before.parentNode;
	parent.insertBefore(obj,before);
} 
//将方法插入到某个对象之后 没有div也可以放在文本前面 文本节点有空格停止 不能为空，直接返回值
function insertAfter(obj,after){
	var next=getNext(obj,"b");
	var parent=after.parentNode;
	if(next){                     //有值，真
		insertBefore(obj,next)
	}else{
		parent.appendChild(obj);
	}
}

// function scrollTop(obj){
// 	if(){

// 	}else if(){

// 	}
// }
// console.log(document.body.scrollTop);//谷歌存在是这个，不存下是下面的
// 	console.log(document.documentElement.scrollTop);//IE

function addEvent(obj,event,fun){
	if(obj.attachEvent){		
	   obj.attachEvent("on"+event,fun); 
	}else if(obj.addEventListener){
	   obj.addEventListener(event,fun,false);//fun是函数
	}
}
function removeEvent(obj,event,fun){
	if(obj.detachEvent){		
	   obj.detachEvent("on"+event,fun); 
	}else if(obj.removeEventListener){
	   obj.removeEventListener(event,fun,false);
	}
}

//滚轮 若给某个对象添加滚轮效果，鼠标需放在obj上
function mouseWheel(obj,funUp,funDown){
	if(obj.attachEvent){    //判断兼容性             IE
		obj.attachEvent("onmousewheel",scroll);
	}else if(obj.addEventListener){
		obj.addEventListener("mousewheel",scroll,false);
		obj.addEventListener("DOMMouseScroll",scroll,false);
	}
	function scroll(e){    //处理程序即函数的调用
		var ev=e||window.event;  //获取事件对象 IE:window.event; FF:e
		var d=ev.wheelDelta||ev.detail;//d方向  获取滚轮滚动的方向 IE:wheelDelta  FF:detail
		if(d==-120||d==3){   //向下 3,-120  向上 -3，120
			if(funDown){
				funDown();
			}
		}else if(d==120||d==-3){
			if(funUp){
				funUp();
			}
		}
	}
}
/*
elemObject.attachEvent("eventName", functionReference);
eventName 参数的值是表示事件名称的字符串，比如 onmousedown。functionReference 参数是一个不带括号的函数引用
把函数绑定到按键的click事件：document.getElementById("button1").attachEvent("onclick", myFunc);
*/
/*addEventListener第一个参数是一个声明事件类型的字符串(不带"on"前缀)比如"click"，"mousedown"，和"keypress"
把一个函数的引用赋值给一个事件属性的时候，就发生了绑定。函数的引用是指函数的名称，但是不带函数定义中的括号。因此，如果要为一个名为myButton 的按键的点击事件（click）进行绑定，使之激活一个定义为myFunc() 的函数，则其赋值语句如下所示：
document.forms[0].myButton.onclick = myFunc;注意一点：在事件触发的时候，没有办法向事件函数传递参数*/