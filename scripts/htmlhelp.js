/* This file is for submit comment feedback page */


function urlhelp()
{ url = prompt ("What is the web address (URL)?","http://");
  if ( url == "http://" || url=="" || url==null ) { focustext(); return; }
	if ( theForm.createTextRange )
	{ if ( theForm.caretPos.text == "" )
	  { site = prompt ("What should the link say","Site name"); }
	  else { site = theForm.caretPos.text; }
	}
	else { site = prompt ("What should the link say","Site name"); }
	if ( site=="Site name" || site=="" || site==null ) { focustext(); return; } 
	insert ( theForm, "<a href=\"" +url +"\">" + site + "</a>"); 
  focustext();
	return;
}
function emphasis()
{ if ( theForm.createTextRange )
  { if ( theForm.caretPos.text == "" )
	  { text = prompt ("Enter text to be italicized.", "text"); }
	  else { text = theForm.caretPos.text; }
	}
	else { text = prompt ("Enter text to be italicized.", "text"); }
  if ( text=="text" || text=="" || text==null ) { focustext(); return; } 
	insert ( theForm, "<em>" + text + "</em>" );
	focustext();
	return;
}
function citation()
{ if ( theForm.createTextRange )
  { if ( theForm.caretPos.text == "" )
    { text = prompt ("Enter text to be italicized.", "source"); }
	  else { text = theForm.caretPos.text; }
	}
	else { text = prompt ("Enter text to be italicized.", "source"); }
  if ( text=="source" || text=="" || text==null ) { focustext(); return; }
	insert ( theForm, "<cite>" + text + "</cite>" );
	focustext();
	return;
}
function strong()
{ if ( theForm.createTextRange )
  { if ( theForm.caretPos.text == "" )
    { text = prompt ("Enter text that is to appear bold.", "text"); }
	  else { text = theForm.caretPos.text; }
	}
	else { text = prompt ("Enter text that is to appear bold.", "text"); }
  if ( text=="text" || text=="" || text==null ) { focustext(); return; }
	insert ( theForm, "<strong>" + text + "</strong>" );
	focustext();
	return;
}
function subscript()
{ if ( theForm.createTextRange )
  { if ( theForm.caretPos.text == "" )
    { text = prompt ("Enter text for subscript.", "text"); }
	  else { text = theForm.caretPos.text; }
	}
	else { text = prompt ("Enter text for subscript.", "text"); }
  if ( text=="text" || text=="" || text==null ) { focustext(); return; }
	insert ( theForm, "<sub>" + text + "</sub>" );
	focustext();
	return;
}
function superscript()
{ if ( theForm.createTextRange )
  { if ( theForm.caretPos.text == "" )
    { text = prompt ("Enter text for superscript.", "text"); }
	  else { text = theForm.caretPos.text; }
	}
	else { text = prompt ("Enter text for superscript.", "text"); }
  if ( text=="text" || text=="" || text==null ) { focustext(); return; }
	insert ( theForm, "<sup>" + text + "</sup>" );
	focustext();
	return;
}
function ltchar()
{ insert ( theForm, "&lt;" );
	focustext();
	return;
}
function gtchar()
{ insert ( theForm, "&gt;" );
	focustext();
	return;
}
function focustext()
{ if (document.URL=="https://web.archive.org/web/20060927100913if_/http://www.talkorigins.org/origins/submit-comment.php")
    document.mainform.comment.focus();
	else document.mainform.response.focus();
  return;
} 

/* Next two functions modified from 
http://www.faqts.com/knowledge_base/view.phtml/aid/1052/fid/130 */
function storeCaret (textEl)
{ if (textEl.createTextRange) 
  {  textEl.caretPos = document.selection.createRange().duplicate(); }
}
function insert (textEl, text) 
{ if (textEl.createTextRange && textEl.caretPos)
	{
    var caretPos = textEl.caretPos;
    caretPos.text =
       caretPos.text.charAt(caretPos.text.length - 1) == ' ' ?
       text + ' ' : text;
		document.selection.empty();
  }
  else append ( text );
}

function append ( text) 
{ if (document.URL=="https://web.archive.org/web/20060927100913if_/http://www.talkorigins.org/origins/submit-comment.php")
  document.mainform.comment.value = document.mainform.comment.value + text;
	else
	document.mainform.response.value = document.mainform.response.value + text;
}

function printtools()
{ document.write("<form action=\"#\" class=\"center\">"
+ "<p><a id=\"tools\" name=\"tools\"></a>HTML Help: "
+"<input type=\"button\" value=\"Make a Link\" "
+"      onclick=\"urlhelp(); return false;\" /> "
+"<input type=\"button\" value=\"Italics for Emphasis\" "
+"       onclick=\"emphasis(); return false;\" /> "
+"<input type=\"button\" value=\"Italics for Citation\" "
+"       onclick=\"citation(); return false;\" /> "
+"<br />"
+"<input type=\"button\" value=\"Bold\" "
+"       onclick=\"strong(); return false;\" /> "
+"<input type=\"button\" value=\"Subscript\" "
+"       onclick=\"subscript(); return false;\" /> "
+"<input type=\"button\" value=\"Superscript\" "
+"       onclick=\"superscript(); return false;\" /> "
+"<br />"
+"Print characters: "
+"<input type=\"button\" value=\"\&lt;\" "
+"       onclick=\"ltchar(); return false;\" /> "
+"<input type=\"button\" value=\"\&gt;\" "
+"       onclick=\"gtchar(); return false;\" /> "
+"</form>");
return;
}

function onLoadFunctions() 
{ 
if (document.URL=="https://web.archive.org/web/20060927100913if_/http://www.talkorigins.org/origins/submit-comment.php")
theForm=document.mainform.comment;
else theForm=document.mainform.response;
                            
 
}


window.onload = onLoadFunctions;  // On the load of page calls the function.

