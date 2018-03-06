var um=false;
var col=0;
var back;


fix_header={ 
  'fixed_el': null, 
  'new_table': null, 
  
  bind : function(el, eventName, callback) { 
    if (el) { 
      if (el.addEventListener) { 
        el.addEventListener(eventName, callback, false); 
      } 
      else if (el.attachEvent) { 
        el.attachEvent("on" + eventName, callback); 
      } 
    } 
  }, 
  
  get_position: function(el) { 
    var offsetLeft = 0, offsetTop = 0; 
    do { 
      offsetLeft += el.offsetLeft; 
      offsetTop  += el.offsetTop; 
    } 
    while (el = el.offsetParent); 
    return {x:offsetLeft, y:offsetTop}; 
  }, 
  
  chk_position: function() { 
    var doc = document.documentElement; 
    var body = document.body; 
  
    if (typeof(window.innerWidth) == 'number') { 
      my_width = window.innerWidth; 
      my_height = window.innerHeight; 
    } 
    else if (doc && (doc.clientWidth || doc.clientHeight)) { 
      my_width = doc.clientWidth; 
      my_height = doc.clientHeight; 
    } 
    else if (body && (body.clientWidth || body.clientHeight)) { 
      my_width = body.clientWidth; 
      my_height = body.clientHeight; 
    } 
  
    if (doc.scrollTop) { dy=doc.scrollTop; } else { dy=body.scrollTop; } 
  
    var coord=fix_header.get_position(fix_header.fixed_el); 
  
    // Заголовок таблицы еще на экране или таблица уже не на экране 
    if (coord.y>dy || (coord.y+fix_header.fixed_el.clientHeight)<dy) { 
      fix_header.new_table.style.left='-9999px'; 
    } 
    // Заголовок уже прокручен вверх 
    else { 
      fix_header.new_table.style.left= 
        fix_header.fixed_el.getBoundingClientRect().left+'px'; 
    } 
  }, 
  
  fix: function (id) { 
    var tmp,st; 
    var ftable=document.getElementById(id); 
    if (ftable) { 
      if (this.new_table!=null) { 
        if (this.new_table.parentNode!=undefined) { 
          this.new_table.parentNode.removeChild(this.new_table); 
        } 
        this.new_table=null; 
      } 
      else { 
        this.bind(window,'scroll',this.chk_position); 
        this.bind(window,'resize',this.chk_position); 
      } 
  
      this.fixed_el=ftable; 
  
      tmp=ftable.getElementsByTagName('thead'); 
      if (tmp) { 
        var fthead=tmp[0]; 
  
        new_table=document.createElement('table'); 
  
        for(var i in this.fixed_el.style) { 
          if (this.fixed_el.style[i]!='') { 
            try { 
              new_table.style[i]=this.fixed_el.style[i]; 
            } 
            catch (e) {}; 
          } 
        } 
  
        new_table.id='fixed_'+id; 
        new_table.rules='all'; 
        new_table.border='1'; 
        new_table.style.position='fixed'; 
        new_table.style.left='-9999px'; 
        new_table.style.top='0px'; 
  
        var cln = fthead.cloneNode(true); 
        var cth=cln.getElementsByTagName('th'); 
        var fth=fthead.getElementsByTagName('th'); 
  
        for(var i=0; i<fth.length; i++) { 
          cth[i].style.width=(fth[i].clientWidth)+'px'; 
          cth[i].style.paddingLeft='0'; 
          cth[i].style.paddingRight='0'; 
        } 
        new_table.appendChild(cln); 
  
        this.fixed_el.parentNode.appendChild(new_table); 
        this.new_table=new_table; 
        this.chk_position(); 
      } 
    } 
  } 
}; 


$(function(){
  $(".bi").mask("9999-99-99", {placeholder: "гггг-мм-дд" });
});

$(window).resize(function(){
  fix_header.fix('my_table');
  if ($(window).width() <= '600'){
    if (!um)
    {
    $("tr").each(function(){
      var i=0;var arr = [];
      $("td",this).each(function(){
      arr[i]=$(this).find("div").html();
      i++;
   });
   //var f=$(this).find("td").first().find("span").html();
   var f2=$(this).find("td").first().html();
  // alert(f);
   $(this).find("td").first().html(f2+'<span class="hide"><div>Номер: <span class="edit">'+arr[0]+'</span></div><div class="click">Класс: <span class="edit">'+arr[1]+'</span></div><div class="click">Ученик: <span class="edit">'+arr[2]+'</span></div><div class="datat"><div class="click">Датация: <span class="edit">'+arr[3]+'</span></div></div><div class="click birth">Дата рождения: <span class="edit">'+arr[4]+'</span></div></span>');
});
um=true;}
  }
         else   {
             if (um){
              um=false;
              
              $("tr").each(function(){
                  var i=0;var arr = [];
              $(".hide",this).each(function(){
               
               $(".edit",this).each(function(){
    arr[i]=$(this).html();
    i++;
   });
              }); 
       var o=0;
      $("td",this).each(function(){
          //alert(arr[o]);
    $(this).find(".click").html(arr[o]);
    o++;
   
              });
   //var f=$(this).find("td").first().find("span").html();
  // alert(f);
   });
              $(".hide").remove();
            }}

});

$(window).keydown(function(event){
	//ловим событие нажатия клавиши
	if(event.keyCode == 13) {	//если это Enter
		$('#edit').blur();	//снимаем фокус с поля ввода
	}
});
fix_header.fix('my_table');
jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
	if(this.lengh == 0) return this;
	input = this[0];

	if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	} else if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	}

	return this;
}
jQuery.fn.setCursorPosition = function(position){
	if(this.lengh == 0) return this;
	return $(this).setSelection(position, position);
}
$(function()	{
	$("body").on("click", ".click", function (e) {
	    
		//ловим элемент, по которому кликнули
		var t = e.target || e.srcElement;
		//получаем название тега
		var elm_name = t.type;
		
		//если это инпут - ничего не делаем
		if(elm_name == 'text')	{return false;}
		if(elm_name == 'checkbox')
		{
		   
		   if( $("#edit").attr('checked')) {
		        $("#edit").attr('checked', false);
		         //alert($("#edit").attr('checked'));
		}
		else
		{ $("#edit").attr('checked', true);
		    // alert($("#edit").attr('checked'));
		}
		return true;
		}
if (!$('#edit').length)
{
    fix_header.fix('my_table');
		var val = $(this).html();
		back=val;
		if ($(this).find(".edit").length)
		{val =$(this).find(".edit").html(); }
		var code = '<input type="text" name='+$(this).closest("td").attr('class')+' id="edit" value="'+val+'" />';
		if ($(this).parent().hasClass("birth")||$(this).hasClass("birth"))
		{code = '<input class="bi" type="text" name="birthday" id="edit" value="'+val+'" />';}
		if ($(this).parent().hasClass("datat"))
		
		{if (val=="Да")
		    {code = '<input class="datat" name="datation" type="checkbox" id="edit" checked />';}
		    else
		    {code = '<input class="datat" name="datation" type="checkbox" id="edit" />';}
		}
		
		if ($(this).find(".edit").length)
		{$(this).find(".edit").empty().append(code);}
		else
		{$(this).empty().append(code);}
		if (!$(this).parent().hasClass("datat"))
		{
		
		$('#edit').setCursorPosition(val.length);
}
$(function(){
  
$(".bi").mask("9999-99-99", {placeholder: "гггг-мм-дд" });
});
$('#edit').focus();
fix_header.fix('my_table');
$('#edit').focus(function()	{
    col=0;
   
});
		$('#edit').blur(function()	{
		   
		
			 var val;
			if ($(this).hasClass("datat"))
	        {if ($(this).attr('checked'))
	        {
	            val="1";
	        }
	        else
	        {val="0";}
	            }
	            else
		{	val = $(this).val();
		var er=false;
		if (val=="")
		{if(!$(".error2").length)$(this).parent().append("<span class='error2'>Поле не может быть пустым</span>");;er=true;}
		if ($(this).hasClass("bi")&&val!="")
		{str=val;
 var err=["не корректная дата"]
   str2=str.split("-");
   if(str2.length!=3){return false;}
  
   if(new Date(str)=='Invalid Date'){if(!$(".error2").length)$(this).parent().append("<span class='error2'>Некорректная дата</span>");er=true;}}
		}
		if (!er)
			    
		{
		    
		    var id=$(this).closest("tr").find(".fr").find("div").html();
		    if ($(this).hasClass("datat"))
	        {if ($(this).attr('checked'))
	        {$(this).parent().empty().html("Да");
	            
	        }
	        else
	        {$(this).parent().empty().html("Нет")}
	            }
		var form_data="id="+id+"&chto="+$(this).attr('name')+"&znach="+val;	
		
		$(this).parent().empty().html(val);
		        $.ajax({
            type: "POST", //Метод отправки
            url: "update", //путь до php фаила отправителя
            data: form_data,
            //dataType: 'json',
            success: function() {
          
            },
			error: function(html) {
			   
			}
            });
		    }
		    
		fix_header.fix('my_table');
		});
	}
	});
});
$(window,document).on("click",function(){
    
    if ($('#edit').length)
    if(!$('#edit').is( ":focus" ))
    col++;
		        if(col>1)
		        {col=0;$('#edit').parent().empty().html(back);}
    fix_header.fix('my_table');
});

$('.contact').submit(function() {
    $(".error").remove();
$('.answer').html("");
var er=false;
if ($("input[name='class']").val()=="")
{$("input[name='class']").parent().append("<span class='error'>Поле не может быть пустым</span>");er=true;}
if ($("input[name='puple']").val()=="")
{$("input[name='puple']").parent().append("<span class='error'>Поле не может быть пустым</span>");er=true;}
if ($("input[name='birthday']").val()=="")
{$("input[name='birthday']").parent().append("<span class='error'>Поле не может быть пустым</span>");er=true;}

if (er){return false;}


str=$("input[name='birthday']").val();
 var err=["не корректная дата"]
   str2=str.split("-");
   if(str2.length!=3){return false;}
   
   if(new Date(str)=='Invalid Date'){$("input[name='birthday']").parent().append("<span class='error'>Некорректная дата</span>");er=true;}
if (er){return false;}


var form=$(this);
var form_data = $(this).serialize();
//form_data=form_data+"&theme=" + $(this).parent().find(\'h3\').html();
            $.ajax({
            type: "POST", //Метод отправки
            url: "postdata", //путь до php фаила отправителя
            data: form_data,
            //dataType: 'json',
            success: function(html) {
                html=html.substring(8);
                var datat;
                if ($("input[type='checkbox']").attr('checked'))
                {datat="Да"}
                else
                {datat="Нет"}
                   $("table").append('<tr><td><span class="fr"><div>'+html+'</div></span></td><td><div class="click">'+$("input[name='class']").val()+'</div></td><td><div class="click">'+$("input[name='puple']").val()+'</div></td><td class="datat"><div class="click">'+datat+'</div></td><td class="birth"><div class="click">'+$("input[name='birthday']").val()+'</div></td></tr>;');
          if ($(window).width() <= '600'){
              
              var f2=$("table").find("tr").last().find("td").first().html();
  // alert(f);
   $("table").find("tr").last().find("td").first().html(f2+'<span class="hide"><div>Номер: '+html+'</div><div class="click">Класс: <span class="edit">'+$("input[name='class']").val()+'</span></div><div class="click">Ученик: <span class="edit">'+$("input[name='puple']").val()+'</span></div><div class="datat"><div class="click">Датация: <span class="edit">'+datat+'</span></div></div><div class="click birth">Дата рождения: <span class="edit">'+$("input[name='birthday']").val()+'</span></div></span>');

              
          }
            },
			error: function(html) {
			   
                   //код в этом блоке выполняется при успешной отправке сообщения
                   form.find('.answer').html("Возникла ошибка при отправке");;
			}
            });
return false;

});

