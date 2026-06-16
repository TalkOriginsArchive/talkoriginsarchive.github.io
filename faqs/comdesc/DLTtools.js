/* This writes out the contact info, linked */
function atsign()
{
    return ("\&#64;");
}

function reverse(string)
{ 
    var backwards = "";
    var i;
    for (i = 0; i < string.length; i++)
    {
        backwards = string.charAt(i) + backwards; // add one at a time to the new string in reverse order 
    }
    return (backwards);
}

function dec2hex(n)
{
    var s = (n.toString(16));
    s = s.toUpperCase();
    return(s);
}

function Unicode(s)
{
    var uni = "";
    var i;
    for(i = 0; i < s.length; i++)
    {
        uni += ("\&#x" + dec2hex(s.charCodeAt(i)) + ";");
    }
    return (uni);
}

function Uno()
{
    if(navigator.appName == "Links")
    {
        
        document.write("<br /><i>My apologies, but the \"Links\" text-only browser has only a partial implementation of JavaScript, so you cannot view email addresses.</i>");
        document.write("<br /><i>Please report this bug to the authors via <a href=\"http://atrey.karlin.mff.cuni.cz/~clock/twibright/links/development.html\">their web page</a>. </i><br />");
        return false;
    }

    var argv = Uno.arguments;

    if(argv.length < 3 || argv.length > 4)
    {
        document.write("<br /><b><big>ERROR: Wrong number of arguments for the \"Uno\" javascript function</big></b><br />");
        return false;
    }

    var mtTag;
    var username  = Unicode(reverse(argv[0]));
    var domain    = Unicode(reverse(argv[1]));
    var extension = Unicode(reverse(argv[2]));
    var address   = username + atsign() + domain + "." + extension;

    var firstHalf  =   "<a href=\""
                     + "\&#x6D;\&#x61;\&#x69;\&#x6C;\&#x74;\&#x6F;\&#x3A;" // maleto:
                     + address
                     + "\"\>";

    if(argv.length == 4)
    {
        var realName  = reverse(argv[3]);
        mtTag = firstHalf
              + realName
              + "\<\/a\>";
    }
    else
    {
        mtTag = firstHalf
              + username
              + " A\<!----\>T "
              + domain
              + " DO<!----\>T "
              + extension
              + "\<\/a\>";
    }
    document.write(mtTag);
}
