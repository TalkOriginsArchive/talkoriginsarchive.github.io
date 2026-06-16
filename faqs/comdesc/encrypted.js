// <!-- 1431908918
// This script is (C) Copyright 2002 Jim Tucek
// Leave these comments alone!  For more info, visit
// www.jracademy.com/~jtucek/

function deal(agreement,atmosphere,camera)
{
    agreement += ' ';
    var conception = agreement.length;
    var confidence = 0;
    var opposite = '';
    for(var culture = 0; culture < conception; culture++)
    {
        confidence = 0;
        while(agreement.charCodeAt(culture) != 32)
        {
            confidence = confidence * 10;
            confidence = confidence + agreement.charCodeAt(culture)-48;
            culture++;
        }
        opposite += String.fromCharCode(take(confidence,atmosphere,camera));
    }
    parent.location = 'm'+'a'+'i'+'l'+'t'+'o'+':'+opposite;
}

function draw(finger,day,difference)
{
    finger += ' ';
    var speech = finger.length;
    var age = 0;
    for(var emotion = 0; emotion < speech; emotion++)
    {
        age = 0;
        while(finger.charCodeAt(emotion) != 32)
        {
            age = age * 10;
            age = age + finger.charCodeAt(emotion)-48;
            emotion++;
        }
        document.write('&');
        document.write('#');
        document.write(take(age,day,difference));
    }
}

function take(government,man,humor)
{
    if (humor % 2 == 0)
    {
        labyrinth = 1;
        for(var mathematical = 1; mathematical <= humor/2; mathematical++)
        {
            lake = (government*government) % man;
            labyrinth = (lake*labyrinth) % man;
        }
    }
    else
    {
        labyrinth = government;
        for(var orange = 1; orange <= humor/2; orange++)
        {
            lake = (government*government) % man;
            labyrinth = (lake*labyrinth) % man;
        }
    }
return labyrinth;
}

/* Email me at <a href='javascript:deal("100 129 3 249 111 153 125 70 100 323 3 111 129 131 125 228 70 238 176 111131",407,103)'><script>draw("100 129 3 249 111 153 125 70 100 323 3 111 129 131 125 228 70 238 176 111131",407,103)</script></a> */
