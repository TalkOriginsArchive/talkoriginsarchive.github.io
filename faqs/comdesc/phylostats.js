/* Douglas Theobald, 2004-02-18                     */
/* -/_|:|_|_\-                                      */
/* JavaScript functions to calculate factorials and */
/* P-values for the statistical match of two        */
/* incongruent phylogenetic trees                   */

function
clear()
{
    document.forms[0].trees.value = "";
    document.forms[0].taxa.value = "";
    document.forms[0].mismatches.value = "";
    document.forms[0].outtext.value = "P-value";
}


function
nlogn(N)
{
    return(N * Math.log(N));
}


/* Naive factorial, no bounds checks.
   Will bonk for N > 171
*/
function
Factorial(N)
{
    var i;
    var F;

    if (N == 1 || N == 0)
        return(1.0);

    F = 1.0;
    for (i = Math.round(N); i > 0; --i)
    {
        F *= i;
    }

    return(F);
}


function
DoubleFactNaive(N)
{
    var             i;
    var             DF;

    if (N == -1 || N == 0)
        return(1);

    DF = 1.0;
    for (i = N; i > 0; i = i-2)
    {
        DF *= i;
    }

    return (DF);
}


/* Calculates the Double Factorial, N!!
   http://functions.wolfram.com/GammaBetaErf/Factorial2/06/02/
*/
function
DoubleFactApprox(N)
{
    var DF;
    var twoPI = 2.0 / Math.PI;

    if (N == -1 || N == 0)
        return(1);

    DF = Math.pow(twoPI, (1.0 - Math.cos(Math.PI*N))/4.0);
    DF *= Math.sqrt(Math.PI);
    DF *= Math.pow(N, (N+1)/2.0);
    DF *= Math.exp(-N/2.0);
    DF *= (1.0 + 1.0/(6.0*N) + 1.0/(72.0*N*N));
    /* DF *= (1.0 + 1.0/(6.0*N) + 1.0/(72.0*N*N) - 139/(6480.0*N*N*N)); */

    return(DF);
}

/* Calculates the natural log of the Double Factorial, ln(N!!)
   http://functions.wolfram.com/GammaBetaErf/Factorial2/06/02/0002/
   This is good to six significant digits for N=9
*/
function
LnDoubleFactPlus(N)
{
    var DF;
    var twoPI = 2.0 / Math.PI;
    var sqrN = N*N;
    var cubeN = sqrN*N;
    var quadN = cubeN*N;
    var pentN = quadN*N;
    var series;

    if (N == -1 || N == 0)
        return(0);

    DF = Math.log(twoPI) * ((1.0 - Math.cos(Math.PI*N))/4.0);
    DF += Math.log(Math.PI)/2.0;
    DF += Math.log(N) * ((N+1)/2.0);
    DF -= N/2.0;
    series = 1.0 + 1.0/(6.0 * N);
    series += 1.0 / (72.0 * sqrN);
    series -= 139.0 / (6480.0 * cubeN);
    series -= 571.0 / (155520.0 * quadN);
    /*series -= 163879.0 / (6531840.0 * pentN);*/
    DF += Math.log(series);

    return(DF);
}


/* Stirling eqn
   (2*PI*N)^0.5 * (N/e)^N 
*/
function
Stirling(N)
{
    var F;

    if (N == 1 || N == 0)
        return(1);

    F = Math.sqrt(2.0 * Math.PI * N);
    F *= Math.pow((N / Math.E), N);
    return(F);
}


/* Stirling+ eqn
   (2*PI*N)^0.5 * (N/e)^N * e^(1/12N)    
*/
function
StirlingPlus(N)
{
    var S;

    if (N == 1 || N == 0)
        return(1);

    S = Math.sqrt(2.0 * Math.PI * N);
    S *= Math.pow((N / Math.E), N);
    S *= (1.0 + 1.0/(12.0*N));
    return(S);
}


/* logarithmic version of Stirling+ eqn
   Returns log(N!)
   http://mathworld.wolfram.com/StirlingsSeries.html
*/
function
LnStirlingPlus(N)
{
    var S;
    var cubeN = N*N*N;

    if (N == 1 || N == 0)
        return(0);

    S = Math.log(2.0 * Math.PI)/2.0;
    S += Math.log(N)/2.0;
    S += nlogn(N);
    S -= N;
    S += (1.0 / (12.0 * N));
    S += (1.0 / (360.0 * cubeN));
    S += (1.0 / (1260.0 * cubeN * N * N));
    /* additional terms in series make no contribution at N > 170 */

    return(S);
}


/* calculates N!/M! without doing all the 
   factorial multiplies */
function
Factorial_ratio(N, M)
{
    var i;
    var F;

    if (N > M)
    {
        F = 1.0;
        for (i = Math.round(N); i > Math.round(M); --i)
        {
            F *= i;
        }
        return(F);
    }
    else
    {
        F = 1.0;
        for (i = Math.round(M); i > Math.round(N); --i)
        {
            F *= i;
        }
        return(1.0 / F);
    }
}


/* This function solves the MAST P-value eqn using
   the logarithmic form of the Stirling+ eqn when
   needed (N > 171).
   It returns the log(P-value) */
function
ln_MAST_Pval_Stirling(T, N, I)
{
    /* P(2-trees) <= (2^(N-I-2))(N-I-2)!N!/(2[N-I]-3)!(N-I)!I! */
    /* P(k-trees) <= N!/M!(N-M)! * (1/(2M-3)!!)^{k-1} */
    /* (2M-3)!! = 2^(M-2))(M-2)!/(2M-3)!*/
    /* M=N-I */
    var lnPval;

    var M = N - I;
    var M2 = M - 2.0;
    var twoM3 = (2.0 * M) - 3.0;
    var twoM3df, ComNM;
    
    var fact_M2, fact_N, fact_twoM3, fact_M, fact_I;

    if (N < 171)
    {
        fact_N = Math.log(Factorial(N));
    }
    else
    {
        fact_N = LnStirlingPlus(N);
    }

    if (M < 171)
    {
        fact_M = Math.log(Factorial(M));
    }
    else
    {
        fact_M = LnStirlingPlus(M);
    }

    /* I = N - M */
    if (I < 171)
    {
        fact_I = Math.log(Factorial(I));
    }
    else
    {
        fact_I = LnStirlingPlus(I);
    }

    /* N!/M!(N-M)! = N!/M!I! */
    ComNM = fact_N - fact_M - fact_I;

    /* (2M-3)!! = (2M-3)! / 2^(M-2))(M-2)! */
    if (twoM3 < 140)
    {
        twoM3df = Math.log(DoubleFactNaive(twoM3));
    }
    else
    {
        twoM3df = LnDoubleFactPlus(twoM3);
    }

    /* P(k-trees) <= N!/M!(N-M)! * ((2M-3)!!)^{1-k} */
    lnPval = ComNM + ((1-T) * twoM3df);

    return(lnPval);
}


function
Precision(num, precision)
{
    var round_digit, sig_digit, exponent;
    var number;

    number = String(num);

    if (number.match(/e/))
    {
        round_digit = number.charAt(precision+2);
        if (round_digit > 4)
        {
            sig_digit = number.charAt(precision+1);
            ++sig_digit;
            exponent = number.match(/e.*/);
            number = number.slice(0, precision+1) + sig_digit + exponent[0];
        }
        else
        {
            exponent = number.match(/e.*/);
            number = number.slice(0, precision+2) + exponent[0];
        }
        return(number);
    }
    else
    {
        return(number);
    }
}


/*  Answers the question: how probable is
    it to draw by random two N-taxa trees that have
    a MAST of size N-I taxa or larger, or, that 
    mismatch by I branches *or less*.
*/
function
MAST_Pval()
{
    var T = document.forms[0].trees.value;
    var N = document.forms[0].taxa.value;
    var I = document.forms[0].mismatches.value;
    var Pval;

    T = String(T);
    N = String(N);
    I = String(I);

    T = Math.round(Number(T.replace(/,/g, '')));
    N = Math.round(Number(N.replace(/,/g, '')));
    I = Math.round(Number(I.replace(/,/g, '')));

    if (document.forms[0].rooted[1].checked)
    {
        --N;
    }

    if (T < 2)
    {
        document.forms[0].outtext.value =
            "Must specify at least two trees";
        return;
    }

    if (N - I - 2 < 0.0)
    {
        document.forms[0].outtext.value =
            "Taxa must be at least two greater than mismatches";
        return;
    }

    Pval = Math.exp(ln_MAST_Pval_Stirling(T, N, I));

    if (Pval > 1.0)
    {
        Pval = 1.0;
        document.forms[0].outtext.value = Pval;
    }
    else if (isFinite(Pval))
    {
        document.forms[0].outtext.value = Pval;
    }
    else
    {
        Pval = "incalculable";
        document.forms[0].outtext.value = Pval;
    }
}


function
TreeNum()
{
    var N = document.forms[0].taxa.value;
    var trees;
    var text = "";

    N = String(N);
    N = Math.round(Number(N.replace(/,/g, '')));
    if (document.forms[0].rooted[1].checked)
    {
        --N;
    }

    if (N > 140)
    {
        trees = LnDoubleFactPlus(2*N-3);
        if (trees >= Math.log(Number.MAX_VALUE))
        {
            if (isFinite(trees))
            {   /* this displays 1e+100 style numbers larger than MAX_VALUE */
                trees /= Math.log(10.0);
                text = Math.pow(10.0, trees - Math.floor(trees)) + "e+" + Math.floor(trees);
                text = Precision(text, 4);
                document.forms[0].outtext.value = text;
            }
            else
            {
                text = "incalculable (too large)";
                document.forms[0].outtext.value = text;
            }
        }
        else
        {
            text = Precision(Math.exp(trees), 4);
            document.forms[0].outtext.value = text;
        }
    }
    else
    {
        trees = DoubleFactNaive(2*N-3);
        text = Precision(trees, 4);
        document.forms[0].outtext.value = text;
    }
}

function
go(loc)
{
    location.replace(loc);
}
