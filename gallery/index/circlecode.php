(function(){
document.cookie="CircleCookieTest=1; path=/";

string = "bid=57&amp;sid=7352&amp;seek="+Math.random()+"&amp;ref=";
string += escape(document.referrer)+"&amp;page="+escape(window.location.href);
string += "&amp;cookie="+(document.cookie?"y":"n");
string += "&amp;java="+(navigator.javaEnabled()?"y":"n")
string += "&amp;res="+screen.width+'x'+screen.height;
string += "&amp;e="+((top.location==self.location)?"a":"b")
string += "&amp;colors="+(((navigator.appName.substring(0,5)=="Micro"))?screen.colorDepth:screen.pixelDepth)

document.write("<a href='http://www.circle.am/?w=7352' target='_top' rel='external'><img src='http://www.circle.am/service/?"+string+"' border='0' alt='Circle.Am: Rating and Statistics for Armenian Web Resources' /><\/a>");
})();