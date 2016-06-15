$(function(){

	//地址下拉单
	function down(obj,drop){
		var fa=$(obj)[0];
		var drop=$(drop)[0];

		fa.onmouseover=function(){
			drop.style.display="block";
		}
		fa.onmouseout=function(){
			drop.style.display="none";
		}
	}
	down(".wei",".sys-drop");
	down(".phone",".syt-drop");
	down(".myhome",".syf-drop");
	down("b",".car-drop");



	// 导航侧拉单
	function ce(obj, d) {
        var il = $(obj)[0];
        var linedrop = $(d)[0]
        il.onmouseover = function() {
            linedrop.style.display = "block";
        }
        il.onmousemove = function() {
            linedrop.style.display = "block";
        }
        il.onmouseout = function() {
            linedrop.style.display = "none";
        }

    }
    ce(".dl01", ".dd01")
    ce(".dl02", ".dd02")
    ce(".dl03", ".dd03")
    ce(".dl04", ".dd04")
    ce(".dl05", ".dd05")
    ce(".dl06", ".dd06")
    ce(".dl07", ".dd07")
    ce(".dl08", ".dd08")
    ce(".dl09", ".dd09")
    ce(".dl10", ".dd10")



	// 阳台显示
	var con = $(".btit");
    var exi = $(".bltu");
    var small=$(".small");
    for(var i=0;i<con.length;i++){
    	con[i].index=i;
    	con[i].onmouseover = function() {
           for(var j=0;j<exi.length;j++){
           	small[j].style.display="none";
           	 exi[j].style.display="none";
           	 con[j].style.fontWeight=100;
           	 con[j].style.borderBottom="5px solid #333"
           }
           small[this.index].style.display="block";
           exi[this.index].style.display="block";
           con[this.index].style.fontWeight=400;
           con[this.index].style.borderBottom="5px solid #E5004F"
        }
    }
   

	// banner轮播图
	
	var boss=$(".nav")[0];
	var imgs=$(".pic")
	var lis=$(".circle")
	var l=$(".left")[0];
	var r=$(".right")[0];
	var n=0;
	var next=0;
	var flag=true
	var t=setInterval(move,2000)
	function move(){
		if(!flag){
			return;
		}
		flag=false;
		next=n+1;
		if(next>=imgs.length){
			next=0;
		}
		for(var i=0;i<imgs.length;i++){
			lis[i].style.background="#211616";
		   imgs[i].style.opacity=0;
		}
		lis[next].style.background="#e5004f";
		imgs[n].style.opacity=1;
		imgs[next].style.opacity=0;
		imgs[next].style.zIndex=31;
		animate(imgs[n],{opacity:0},1000);
		animate(imgs[next],{opacity:1},1000,function(){
			flag=true;
		});
		n=next
	}
	function move1(){
		if(!flag){
			return;
		}
		flag=false;
		next=n-1;
		if(next<0){
			next=imgs.length-1;
		}
		for(var i=0;i<imgs.length;i++){
			lis[i].style.background="#211616";
		   imgs[i].style.opacity=0;
		}
		lis[next].style.background="#e5004f";
		imgs[n].style.opacity=1;
		imgs[next].style.opacity=0;
		imgs[next].style.zIndex=31;
		animate(imgs[n],{opacity:0},1000);
		animate(imgs[next],{opacity:1},1000,function(){
			flag=true;
		});
		n=next;
	}
	boss.onmouseover=function(){
		clearInterval(t);
		l.style.display="block";
		r.style.display="block"
	}
	boss.onmouseout=function(){
		t=setInterval(move,2000);
		l.style.display="none";
		r.style.display="none";
	}
	l.onclick=function(){
		move()
	}
	r.onclick=function(){
		move1()
	}
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onmouseover=function(){
			for(var j=0;j<lis.length;j++){
				lis[j].style.background="#211616";
				imgs[n].style.opacity=1;
				imgs[this.index].style.opacity=0;
			}
			lis[this.index].style.background="#e5004f";
			imgs[this.index].style.zIndex=31;
			animate(imgs[n],{opacity:0},800)
			animate(imgs[this.index],{opacity:1},800);
			n=this.index;
			next=this.index;
		}
	}


	//专柜同款
	var tit = $(".hot-red");
    var ex = $(".zd");
    var hs=$(".hot-smal");
    for(var i=0;i<tit.length;i++){
    	tit[i].index=i;
    	tit[i].onmouseover = function() {
           for(var j=0;j<ex.length;j++){
           	 hs[j].style.display="none";
           	 ex[j].style.display="none";
           	 tit[j].style.fontWeight=100;
           	 tit[j].style.borderBottom="3px solid #333"
           }
           hs[this.index].style.display="block";
           ex[this.index].style.display="block";
           tit[this.index].style.fontWeight=400;
           tit[this.index].style.borderBottom="3px solid #E5004F"
        }
    }

	
	// 时尚名品
	function fashion(obj){
		var box=obj;
		var img=$(".bcs-con-sub",obj)
		var pre=$(".pre",obj)[0];
		var nex=$(".next",obj)[0];
		var width=parseInt(getStyle(img[0],"width"));
		var A=0;
		var B=0;
		function dong(){
			B=A+1;
			if(B>=img.length){
				B=0;
			}
			for(var i=0;i<img.length;i++){
				img[i].style.zIndex=0;
			}
			img[B].style.left=width+"px";
			img[B].style.zIndex=10;
			animate(img[A],{left:-width},300);
			animate(img[B],{left:0},300);
			A=B;
		}
		function dong2(){
			B=A-1;
			if(B<0){
				B=img.length-1;
			}
			for(var i=0;i<img.length;i++){
				img[i].style.zIndex=0;
			}
			img[B].style.left=-width+"px";
			img[B].style.zIndex=11;
			animate(img[A],{left:width},300);
			animate(img[B],{left:0},300);
			A=B;
		}

		pre.onclick=function(){
			dong();
		}
		nex.onclick=function(){
			dong2();
			console.log(img[A].style.zIndex)
		}
	}
	var box = $(".fa-bs-scroll");
    for (var i = 0; i < box.length; i++) {
        fashion(box[i]);
    }



	// 时尚名品中间
	function fashion2(obj2){
		var fu=obj2;
		// var fu=$(".fa-mid-in",obj2)[0];
		var pic=$(".fa-mid-pic",obj2)
		var zuo=$(".zuo",obj2)[0];
		var you=$(".you",obj2)[0];
		var wide=parseInt(getStyle(pic[0],"width"));
		var n2=0;
		var next2=0;
		var lies=$(".yuan",obj2);
		function yi(){
			next2=n2+1;
			if(next2>=pic.length){
				next2=0;
			}
			for(var i=0;i<pic.length;i++){
				lies[i].style.background="#ccc";
			}
			lies[next2].style.background="#e5004f";
			pic[next2].style.left=wide+"px";
			animate(pic[n2],{left:-wide},300);
			animate(pic[next2],{left:0},300);
			n2=next2;
		}
		function yi2(){
			next2=n2-1;
			if(next2<0){
				next2=pic.length-1;
			}
			for(var i=0;i<pic.length;i++){
				lies[i].style.background="#ccc";
			}
			lies[next2].style.background="#e5004f";
			pic[next2].style.left=-wide+"px";
			animate(pic[n2],{left:wide},300);
			animate(pic[next2],{left:0},300);
			n2=next2;
		}

		zuo.onclick=function(){
			yi();
		}
		you.onclick=function(){

			yi2();
		}
		for(var i=0;i<pic.length;i++){
			lies[i].index=i;
			lies[i].onmouseover=function(){
				if(this.index==n2){
					return;
				}else if(this.index>n2){
					for(var i=0;i<pic.length;i++){
						lies[i].style.background="#ccc";
					}
					lies[this.index].style.background="#e5004f";
					pic[this.index].style.left=wide+"px";
					animate(pic[n2],{left:-wide},300);
					animate(pic[this.index],{left:0},300);
					n2=this.index;

				}else if(this.index<n2){
					for(var i=0;i<pic.length;i++){
					lies[i].style.background="#ccc";
				}
				lies[this.index].style.background="#e5004f"
				pic[this.index].style.left=-wide+"px";
				animate(pic[n2],{left:wide},300);
				animate(pic[this.index],{left:0},300);
				n2=this.index;

				}
			}
		}

		fu.onmouseover=function(){
			zuo.style.display="block";
			you.style.display="block";
		}
		fu.onmouseout=function(){
			zuo.style.display="none";
			you.style.display="none";
		}
	}
	var fu = $(".fa-mid-in");
    for (var i = 0; i < fu.length; i++) {
        fashion2(fu[i]);
    }
 

 	// 滚动条
 	var floor=$(".fashion-k");
 	var boxes=$(".floor-scroll")[0];
 	var liese=$(".ee");
 	var flag=true;
 	var flag1=true;
 	var sign=true;

 	var ch=document.documentElement.clientHeight;
 	var bh=boxes.offsetHeight;
 	boxes.style.top=(ch-bh)/2+"px";

 	var scrol=document.documentElement.scrollTop?document.documentElement:document.body;

    for(var i=0;i<liese.length;i++){
    	liese[i].index=i;
    	liese[i].onclick=function(){
    		sign=false;
    		var top=floor[this.index].offsetTop;
    		animate(scrol,{scrollTop:top},300,function(){sign=true})
			for(var j=0;j<liese.length;j++){
				liese[j].classList.remove("active");
			}
			liese[this.index].classList.add("active");
			var aa=liese[this.index].getAttribute("name");
			liese[this.index].innerHTML=aa;
    	}
    }
    window.onscroll=function(){
        if(!sign){
            return;//侧栏不随着滚动色块
        }
        for(var i=0;i<liese.length;i++){
            if(scrol.scrollTop>=floor[i].offsetTop-ch+300){     //ch+scrolltop=offsetTop
                 for(var j=0;j<liese.length;j++){
                    liese[j].classList.remove("active");
    			 }
    			 liese[i].classList.add("active");
                 var aa=liese[i].getAttribute("name");
                 liese[i].innerHTML=aa;
            }
        }
        if(scrol.scrollTop>=floor[0].offsetTop-ch+300){
            if(flag){
                    flag=false;
                    animate(boxes,{opacity:1},300,function(){
                        flag1=true;
                    })           
            }                       
        }else{
            if(flag1){
                    flag1=false;
                    animate(boxes,{opacity:0},300,function(){
                    flag=true;
                })                      
           }
        } 

    }



















})