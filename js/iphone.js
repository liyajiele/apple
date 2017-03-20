$(function(){
   function erji(){
       var flag=true;
       $(".caidan").on("click",function(){
           if(flag){
               $(".caidan .line_one").css("transform","translate(0,5px) rotate(45deg)");
               $(".caidan .line_two").css("transform","rotate(-45deg)");
               flag=false;
               $(".small_content").css("background","#000");
           }else{
               $(".caidan .line_one").css("transform","translate(0,0) rotate(0)");
               $(".caidan .line_two").css("transform","rotate(0)");
               $(".small_content").css("background","rgba(0,0,0,0.3)");
               flag=true;
            }
           $(".yincang").slideToggle(800);
       })
   }
    erji();

    //设置高度
    window.onresize=function(){
        var clienth=$(window).height()-44;
        var clientw=$(window).width();
        $(".yincang").css("height",clienth);
        if(clientw>765){
            $(".yincang").css("display","none");
            flag=true;
            $(".line_one").css("transform","translate(0,0) rotate(0)");
            $(".line_two").css("transform","translate(0,0) rotate(0)");
        }
    }



    function lunbo(){
//左右按钮
    $(".leftbtn").hover(function(){
        $(".leftbtn span").css({"display":"block"});
    },function(){
        $(".leftbtn span").css({"display":"none"});
    })
    $(".rightbtn").hover(function(){
        $(".rightbtn span").css({"display":"block"});
    },function(){
        $(".rightbtn span").css({"display":"none"});
    })
//左右按钮

//    轮播
    // 清除进程
    var flag_window=true;
    $(window).blur(function(){
        if(flag_window==true){
            clearInterval(t1);
            clearInterval(t2);
            flag_window=false;
            currentTime=0;
        }
    })
    $(window).focus(function(){
        if(flag_window==false){
            t1=setInterval(auto,times);
            t2=setInterval(progress,50);
            flag_window=true;
        }
    })
//    清除进程

    //自动轮播
    var times=3000;
    var t1=setInterval(auto,times);
    var now=0;
    var next=0;
    var flag=true;
    var currentTime=0;
    function auto(){
          next=now+1;
        //console.log(next);
          if(next>$(".bimg").length-1){
              next=0;
          }
          //当前
          $(".bimg").eq(now).css("zIndex",30).animate({width:"80%",height:"80%"});
          //下一张
          $(".bimg").eq(next).css({'z-index':999}).animate({left:0},function(){
              $(this).css({"zIndex":30})
              $(".bimg").eq(now).css({
                  width:"100%",height:"100%",left:"100%","zIndex":999
              })
              now=next;
              currentTime=0;
              if(next==0){
                  flag=false;
              }
          })
      }

    //进度条
    t2=setInterval(progress,50);
    function progress(){
        currentTime+=50;
        var bili=currentTime/times;
        if(bili>1){
            bili=1;
        }
        $(".progress").eq(now).css("width",bili*100+"%");

        if(!flag){
            $(".progress").css("width",0);
            flag=true;
        }
    }

    //点击按钮操作轮播图
    $(".btnbox li").click(function(){
        var index=$(this).index(".btnbox li");
        next=index;
        stop();
    })

    function stop(){
        clearInterval(t1);
        clearInterval(t2);

        $(".btnbox .progress").css("width",0).eq(next).css("width","100%");

        if(now<next){
            //当前这一张

            $(".progress").eq(now).animate({
                width:"80%",height:"80%"
            })

            //下一张的运动方式
            $(".progress").eq(next).animate({
                left:0
            },function(){
                $(".progress").eq(now).css({
                    width:"100%",height:"100%",left:"100%"
                })
                if(next==0){
                    flag=false;
                }
                now=next;
            }).css("zIndex",1);
        }else{
            $(".progress").eq(now).animate({left:"100%"}).css("z-index",1);
            $(".progress").eq(next).css({
                left:0,top:0,width:"80%",height:"80%"
            }).animate({width:"100%",height:"100%"},function(){
                now=next;
            })
        }
    }


        // 左右点击按钮
        $(".rightbtn").click(function () {
            next++;
            if(next>$(".imgbox li").length-1){
                next=0;
                flag=false;
            }
            //当前页面的变化
            $(".imgbox li").eq(now).animate({"width":"80%","height":"80%"}).css("z-index",0);
            //下一张的变化
            $(".imgbox li").eq(next).animate({"left":0},function(){
                $(".imgbox li").eq(now).css({"left":"100%","width":"100%","height":"100%"});
                now=next;
            }).css("z-index",1);
            $(".progress").css("width",0).eq(next).css("width","100%");
            stop();
        })
        $(".leftbtn").click(function () {
            next--;
            if(next<0){
                next=$(".imgbox li").length-1;
                flag=false;
            }
            $(".imgbox li").eq(now).css({"z-index":2});
            $(".imgbox li").eq(now).animate({"left":"100%"});
            $(".imgbox li").eq(next).css({"left":0,"width":"80%","height":"80%","z-index":1});
            $(".imgbox li").eq(next).animate({"width":"100%","height":"100%","zIndex":1},function () {
                now=$(this).index();
            });
            $(".progress").css("width",0).eq(next).css("width","100%");
            stop();
        })


        // 进度条的点击事件
        $(".btnbox li").click(function(){
            next=$(this).index();
            if($(this).index()>now){
                //当前页面的变化
                $(".imgbox li").eq(now).animate({width:"80%",height:"80%"}).css("z-index",0);
                //下一张的变化
                $(".imgbox li").eq($(this).index()).animate({left:0},function(){
                    $(".imgbox li").eq(now).css({left:"100%",width:"100%",height:"100%"});
                    now=$(this).index();
                }).css("z-index",1);
            }else if($(this).index()<now){
                $(".imgbox li").eq(now).animate({left:"100%"});
                $(".imgbox li").eq($(this).index()).css({left:0,width:"80%",height:"80%"});
                $(".imgbox li").eq($(this).index()).animate({width:"100%",height:"100%",zIndex:1},function () {
                    now=$(this).index();
                });
            }else if($(this).index()==now){
                $(".imgbox li").eq(now).css({width:"80%",height:"80%"});
                $(".imgbox li").eq(now).animate({width:"100%",height:"100%"});
            }
            $(".progress").css("width",0).eq($(this).index()).css("width","100%");
            stop();
        })
        function stop(){
            clearInterval(t1);
            clearInterval(t2);
        }
    }lunbo()








})

