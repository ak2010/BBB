$(document).ready(function()
				  {
					$(document).click(function()
									  {
										if ( !subCalIsOpened && !searchCalIsOpened )
										   return;
										
										if ( subCalIsOpened )
										{
										  $("#subCalendar").hide();
										  subCalIsOpened=false;
										}
										if ( searchCalIsOpened )
										{
										  $("#searchCalendar").hide();
										  searchCalIsOpened=false;
										}
									  });
					$("#subCalendar").click(function( event )
											{
											  event.stopPropagation();
											});
					$("#searchCalendar").click(function( event )
											   {
											     event.stopPropagation();
											   });
					
					$(document).ready(function()
									  {
									    $("#weather").weatherfeed(["AMXX0003"]);
										$(window).load(function()
									   				   {
													   var weather;
													     weather=$(".weatherTemp").html();
														 
														 $("#weatherText").html( weather );
									   				   });
									  });
				  });


function openCatSubs( catId )
{
  $("#menuCat_"+catId).show();
  $("#menuItem_"+catId).addClass("active_temp")
  					   .append("<span></span>");
}

function closeCatSubs( catId )
{
  $("#menuCat_"+catId).hide();
  $("#menuItem_"+catId).removeClass("active_temp")
  					   .children("span")
  					   .remove();
}

function showSubMenu( catId )
{
  $("#menuCat_"+catId).show();
  $("#menuItem_"+catId).addClass("active_temp")
  					   .append("<span></span>");
}

function hideSubMenu( catId )
{
  $("#menuCat_"+catId).hide();
  $("#menuItem_"+catId).removeClass("active_temp")
  					   .children("span")
  					   .remove();
}

function goToIdByScroll( id )
{
  $("html,body").animate({
						  scrollTop:$("#"+id).offset().top
						 },300);
}

function updateNewsViews( id )
{
  $.get("ajax.php",
		{
		 action : 1,
		 id	    : id
		});
}

var activeImageIndex=null,
	img=new Image(),
	isLoading=false;
function loadImageInView( index, scrollToAlbum )
{
  if ( index==activeImageIndex )
     return;
  if ( isLoading==true )
     return;
  
  activeImageIndex=index;
  isLoading=true;
  
  if ( scrollToAlbum )
     goToIdByScroll("photo-album");
  $("#photoViewZoomed").html("<img src='images/loading.gif' style='margin:150px 0 150px 0'>");
  $(".photo_reportaj_salqner").css("margin-top","180px");
  img.src=images[ activeImageIndex ]["path"];
  img.onload=function()
  			 {
			   $("#photoViewZoomed").html("<img src='"+img.src+"'>");
			   isLoading=false;
			   
			   $(".photo_reportaj_salqner").css("margin-top",Math.ceil((img.height-64)/2)+"px");
			 };
}

function loadPrevImage()
{
  if ( activeImageIndex==0 )
     index=imagesNum-1;
  else
    index=activeImageIndex-1;
  
  loadImageInView(index,true);
}

function loadNextImage()
{
  if ( activeImageIndex==(imagesNum-1) )
     index=0;
  else
    index=activeImageIndex+1;
  
  loadImageInView(index,true);
}



//------------------------------sub category search date------------------------------
var subCalIsOpened=false;
function showHideSubCalendar( event )
{
  if ( $("#subCalendar").css("display")=="none" )
  {
    $("#subCalendar").show();
	subCalIsOpened=true;
	
	event.stopPropagation();
  }
  else
  {
    $("#subCalendar").hide();
	subCalIsOpened=false;
	
	event.stopPropagation();
  }
}

function submitDateSearch( date )
{
var url=urlForDateSearch,
	pos,
	href;
  
  pos=url.lastIndexOf("/");
  href=url.substr(0,pos)+"/date/"+date+"/"+url.substr(pos+1);
  
  location.href=href;
}
//------------------------------------------------------------------------------------



//------------------------------search date------------------------------
var searchCalIsOpened=false,
	searchCalValue=null;
function showHideSearchCalendar( event )
{
  if ( $("#searchCalendar").css("display")=="none" )
  {
    $("#searchCalendar").show();
	searchCalIsOpened=true;
	
	event.stopPropagation();
  }
  else
  {
    $("#searchCalendar").hide();
	searchCalIsOpened=false;
	
	event.stopPropagation();
  }
}

function checkSearchForm()
{
var keywords=$.trim( $("#keywords").attr("value") ),
	url;
  
  if ( keywords=="" && searchCalValue==null )
  {
	showError(searchErrors[0],"keywords");
	return;
  }
  
  if ( searchCalValue==null )
     url=urlForSearchDateSearch.replace("date/{date}/","");
  else
    url=urlForSearchDateSearch.replace("{date}",searchCalValue);
  
  $("#searchForm").attr("action",url)
  				  .submit();
}
//------------------------------------------------------------------------------------



function loadRightBlockPhotoNews( id, page, doScroll )
{
  if ( doScroll )
     goToIdByScroll("rightBlockPhotoCont");
  $("#rightBlockPhoto").html("<div align='center' style='margin:35px 0 0 0'><img src='images/loading.gif'></div>")
  					   .load("ajax.php?action=2&id="+id+"&page="+page,
							 {},
							 function( res )
							 {
							   if ( photoChildrenCount==0 )
							      $("#rightBlockPhoto").parent()
								  					   .remove();
							 });
}

function loadRightBlockVideoNews( id, page, doScroll )
{
  if ( doScroll )
     goToIdByScroll("rightBlockVideoCont");
  $("#rightBlockVideo").html("<div align='center' style='margin:35px 0 0 0'><img src='images/loading.gif'></div>")
  					   .load("ajax.php?action=3&id="+id+"&page="+page,
							 {},
							 function( res )
							 {
							   if ( videoChildrenCount==0 )
							      $("#rightBlockVideo").parent()
								  					   .remove();
							 });
}

function loadRightBlockViewsNews( page, doScroll )
{
  if ( doScroll )
     goToIdByScroll("rightBlockViewsCont");
  $("#rightBlockViews").html("<div align='center' style='margin:35px 0 0 0'><img src='images/loading.gif'></div>")
  					   .load("ajax.php?action=4&page="+page,
							 {},
							 function( res )
							 {
							   if ( viewsChildrenCount==0 )
							      $("#rightBlockViews").parent()
								  					   .remove();
							 });
}

function showError( text, focusElement )
{
	if ( typeof($("#errorDialogBox").get(0))=="undefined" )
	   $("body").append("<div id='errorDialogBox'></div>");
	text="<div align='center' style='margin-top:20px; font-weight:bold; font-size:13px'>"+text+"</div>";
	$("#errorDialogBox").html( text )
						.dialog({
								 draggable : false,
								 resizable : false,
								 modal     : true,
								 close	   : function( event, ui )
								 			 {
											 	if ( focusElement != null )
												   $("#"+focusElement).focus();
											 }
								});
}

//---------------------------------home lrahos---------------------------------
function updateLrahos()
{
  $("#lrahosUpdateTemp").load("ajax.php?action=5&id="+lrLastNewsId+"&loadNews="+(isHomePage ? "1":"0"),
							  {},
							  function( res )
							  {
								if ( isHomePage )
								{
							    var html=$("#lrahosUpdateTemp .loaded_cont").html();
							      $("#homeLrahos .mCSB_container").prepend( html );
							      $("#homeLrahos").mCustomScrollbar("update");
								}
								
							    if ( newNewsNum != 0 )
							    {
								  if ( isHomePage )
								     $("#homeLrahos").mCustomScrollbar("scrollTo","top");
								  
								  titleInterval=window.setInterval("tartiTitle("+newNewsNum+")",800);
								  if ( soundIndex != null )
								     if ( playNewsSounds===true )
								        playNewsMusic( soundIndex );
							    }
							  });
}

var playNewsSounds=true,
	newNewsNum=0,
	soundIndex=null;
function playNewsMusic( index )
{
  if ( playNewsSounds==false )
     return;
  
  if ( canPlayOgg )
	 shamshyanAudio.setAttribute("src",lrahosSongs[index]["ogg_file"]);
  else
	shamshyanAudio.setAttribute("src",lrahosSongs[index]["mp3_file"]);
  
  shamshyanAudio.play();
  soundIndex=null;
}

function turnNewsOnOffMusic( a )
{
var img=$(a).children("img");
  if ( img.attr("src").indexOf("on") != -1 )
  {
	img.attr("src","images/sound_off.jpg");
	playNewsSounds=false;
  }
  else
  {
	img.attr("src","images/sound_on.jpg");
	playNewsSounds=true;
  }
}

var title=$("title").html(),
	titleTemp="",
	titleCounter=0,
	titleInterval=null;
function tartiTitle( newsNum )
{
var t=$("title").html();
  if ( t==title )
  {
	if ( titleTemp=="" )
	   titleTemp=newsNum+" - *************************";
	
    $("title").html(titleTemp);
	titleCounter++;
  }
  else
  {
    $("title").html(title);
	
	if ( titleCounter==8 )
    {
	  window.clearInterval(titleInterval);
	  titleInterval=null;
	  titleCounter=0;
	  titleTemp="";
    }
  }
}
//-----------------------------------------------------------------------------

function homeCatImOver( index, img )
{
  $(img).attr("src", homeCatIms[index].src );
}

function homeCatImOut( index, img )
{
  $(img).attr("src", homeCatIms[index].src.replace("_hover","") );
}

function startTime()
{
var tm=new Date(),
	h=tm.getHours(),
	m=tm.getMinutes(),
	s=tm.getSeconds();
  h=checkTime(h);
  m=checkTime(m);
  s=checkTime(s);
  document.getElementById('time').innerHTML=h+":"+m+":"+s;
  t=setTimeout('startTime()',500);
}

function checkTime( i )
{
  if ( i<10 )
	 i="0" + i;
  
  return i;
}

var homeShamshyanMainIndex=2,
	homeShamshyanMainNum=3,
	shamshyanMainActive=null;
function listHomeShamshyanMainNews()
{
  if ( shamshyanMainActive==true )
     return false;
  
  $("#homeShamshyanMainImgBorder_"+homeShamshyanMainIndex).css("visibility","hidden");
  $("#homaShamshyanMain_"+homeShamshyanMainIndex).hide();
  
  if ( shamshyanMainActive==null )
     if ( homeShamshyanMainIndex==(homeShamshyanMainNum+1) )
        homeShamshyanMainIndex=2;
     else
       homeShamshyanMainIndex++;
  else
  {
    homeShamshyanMainIndex=shamshyanMainActive;
	shamshyanMainActive=true;
  }
  
  $("#homeShamshyanMainImgBorder_"+homeShamshyanMainIndex).css("visibility","visible");
  $("#homaShamshyanMain_"+homeShamshyanMainIndex).show();
}

function homeShamshyanMainOver( index )
{
  shamshyanMainActive=index;
  listHomeShamshyanMainNews();
}

function homeShamshyanMainOut()
{
  shamshyanMainActive=null;
}



function changeHomeMapMarkers( index, input )
{
  if ( !$(input).is(":checked") )
  {
    $(input).attr("checked","checked");
	return;
  }
  
var first=$("#homeGoogleMapsFone input[type='checkbox']").eq(0),
	second=$("#homeGoogleMapsFone input[type='checkbox']").eq(1);
  
  if ( index==1 )
  {
    first.removeAttr("checked");
	$("#googleMapHome_1").hide();
	$("#googleMapHome_2").show();
  }
  else
  {
    second.removeAttr("checked");
	$("#googleMapHome_2").hide();
	$("#googleMapHome_1").show();
  }
}



$(document).ready(function() {
	$("#news-inner-video-prev").click(function() {
		goToIdByScroll("news-inner-videos");
		
		$(".jcarousel-skin-tango_inner_videos .jcarousel-prev-horizontal").trigger("click");
		
		return false;
	});
	
	$("#news-inner-video-next").click(function() {
		goToIdByScroll("news-inner-videos");
		
		$(".jcarousel-skin-tango_inner_videos .jcarousel-next-horizontal").trigger("click");
		
		return false;
	});
});


function hideTextFromCopy( newsLink ) {
	var body_element = document.getElementsByTagName('body')[0],
		selection = window.getSelection(),
		copyText = selection + ' ©shamshyan.com ' + newsLink,
		newdiv = document.createElement('div');
	
	newdiv.style.position = 'absolute';
	newdiv.style.left = '-1000px';
	body_element.appendChild(newdiv);
	newdiv.innerHTML = copyText;
	selection.selectAllChildren(newdiv);
	window.setTimeout(function() {
		body_element.removeChild(newdiv);
	},0);
}