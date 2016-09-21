var onep=$(".onep")[0]
// alert(onep)
var one1=$(".one1")[0]
// var over1=$(".over1")[0]
//  alert(over1)
// var xyg1=$(".xyg1")[0]

    one1.style.display="block"
onep.onclick=function(){
    one1.style.display="none"
//对象的方法是属于谁的，那么方法里的this 就指向谁
	function game(){//对象的属性
	this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
	         "Q","R","S","T","U","V","W","X","Y","Z"];
	this.img={A:"img/1.png",B:"img/2.png",C:"img/3.png",D:"img/4.png",E:"img/5.png",
	F:"img/6.png",G:"img/7.png",H:"img/8.png",I:"img/9.png",J:"img/10.png",K:"img/11.png",
	L:"img/12.png",M:"img/13.png",N:"img/14.png",O:"img/15.png",P:"img/16.png",Q:"img/17.png",
	R:"img/18.png",S:"img/19.png",T:"img/20.png",U:"img/21.png",V:"img/22.png",W:"img/23.png",X:"img/24.png",Y:"img/25.png",Z:"img/26.png",}
	this.len=3;
	this.currentLetter=[];//存放之后又补上的
	this.currentSpan=[];
	this.clientW=document.documentElement.clientWidth;
	this.clientH=document.documentElement.clientHeight;
	this.t;
	this.speed=1;
	this.step=5;
	this.lifez=$(".lifez")[0]
	this.scroez=$(".scroez")[0]
	this.scroe1z=$(".scroe1z")[0]
	this.gq1=$(".gq1")[0]
	this.over1=$(".over1")[0]
	this.xyg1=$(".xyg1")[0]
// alert(this.scroez)
}
game.prototype={//原型 
	play:function(){//原型的方法
		this._createSpan(this._getRand(this.len));
		this._move();
		this._key();
  },
  _move:function(){ //对象的方法
  	 var that=this;
  	 that.t=setInterval(function(){
       for(var i=0;i<that.currentSpan.length;i++){
       	var tops=that.currentSpan[i].offsetTop+that.speed;
        that.currentSpan[i].style.top=tops+"px"
          if(tops>that.clientH){
	           document.body.removeChild(that.currentSpan[i])
	           that.currentSpan.splice(i,1)
	           that.currentLetter.splice(i,1)
	           that._createSpan(that._getRand(1));//表示每当消掉一个后再增加一个
	           that.lifez.innerHTML--;
	           // lifez.innerHTML=this.lifez.innerHTML;
	           if(that.lifez.innerHTML==0){      
                 clearInterval(that.t)
                 that.over1.style.display="block";
                 that.over1.onclick=function(){
                 that.over1.style.display="none";
                 location.reload();
                   }
			         // alert("game over")
			         // location.reload() 
	           }
           }
        }

  	 },60)
  },
  _key:function(){
  	var that=this
      document.onkeydown=function(e){
      	var e=e||window.event;
      	var key=String.fromCharCode(e.keyCode)
      	for(var i=0;i<that.currentSpan.length;i++){
      		var key=String.fromCharCode(e.keyCode)
      		// if(that.currentSpan[i].className==key){
      		    if(key==that.currentSpan[i].values){
      			document.body.removeChild(that.currentSpan[i])
                that.currentSpan.splice(i,1)
                that.currentLetter.splice(i,1)
                that._createSpan(that._getRand(1));
                if(that.currentLetter.splice(i,1)){
                	that.scroez.innerHTML++;
                	that.scroe1z.innerHTML++
                	if(that.scroe1z.innerHTML>=that.step){
                		// alert("进入下一关")
                    clearInterval(that.t)
                    that.xyg1.style.display="block"
                    document.onkeydown=null 
                    that.xyg1.onclick=function(){
                        that.xyg1.style.display="none"
                        that._next()
                    }
                		// that._next()
                	}
                }
      		}
      	}
      }
  },
  _next:function(){
  	var that=this;
  	clearInterval(that.t)
  	for(var i=0;i<that.currentSpan.length;i++){
  		document.body.removeChild(that.currentSpan[i])
  	}
  	that.currentLetter=[];
  	that.currentSpan=[];
  	that.speed+=2;
  	that.step+=1;
  	that.len+=1;
  	that.scroe1z.innerHTML=0;
  	// that.scroez.innerHTML++;
  	that.gq1.innerHTML++;
  	that._getRand(that.len)
  	that._createSpan(that.currentLetter);
  	that._move(that.currentSpan);
  	that._key(that.currentSpan)
  },
	_getRand:function(num){
       var newarr=[];
       for(var i=0;i<num;i++){
       	var letter=this.arr[Math.floor(Math.random()*this.arr.length)]
       	while(this._checkLetter(letter,this.currentLetter)){
       		letter=this.arr[Math.floor(Math.random()*this.arr.length)]
       		 }
       		this.currentLetter.push(letter);
       		newarr.push(letter);
       }
       return newarr;
	},
	_checkLetter:function(val,arr){
		for(var i=0;i<arr.length;i++){
		if(val==arr[i]){//判断取出的内容与存进去的做比较
			return true 
		    }
	    }
	        return false
	},
	_createSpan:function(arr){
		var newarr=[];
				for(var i=0;i<arr.length;i++){
			  	var span=document.createElement("span")//创建一个新的元素节点
			    // span.src="img/"+arr[i]+".png"
			    // span.className=arr[i];
			  	// span.innerHTML=arr[i]//每一个span都为一个数组中的元素
			  	span.innerHTML="<img src="+this.img[arr[i]]+" style=width:80px;height:70px;>"
			  	span.values=arr[i]
			  	var lefts=(100+Math.random()*(this.clientW-200))//确定放到页面中的span的位置
			  	span.lefts=lefts//把位置 赋给每一个span
			  	while(this._checkPos(span,this.currentSpan)){//用while来循环因为不知道取到多少就会重复，调用避免重复函数
			  		lefts=(100+Math.random()*(this.clientW-200))
			  		span.lefts=lefts
			  	}
			  	newarr.push(span);//找到不重复位置的就放入新数组
			  	this.currentSpan.push(span)//同时放入
			  	
			  	span.style.cssText="position:absolute;left:"+lefts+"px;top:"+Math.random()*30+"px;height:80px;width80px;";
			  	document.body.appendChild(span)//追加
			  	
			  };
			  return newarr
		},
  _checkPos:function(ele,elearr){
  	   for (var i=0;i<elearr.length;i++){
		if(ele.lefts>elearr[i].lefts-100 && ele.lefts<elearr[i].lefts+100){//确定两个元素的位置来排除重复
			return true
		  }
	   }
	return false
    }

  }

var obj=new game();
	obj.play();

}


