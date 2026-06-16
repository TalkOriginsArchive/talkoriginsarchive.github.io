function drift(){
nruns = simulation.nruns.value; // get value from form with id="simulation"
		                          // with input tag with id="nruns"
halfpopsize = simulation.halfpopsize.value; // likewise

		
simulation.output.value = ""; // clear the output window

goodrunsA = 0;  // track the number of runs which A gets fixed
goodrunsB = 0;  // track the number of runs which B gets fixed
popgenA = 0; // counts number of generations it takes to fix A 
	             // for the average at end of function.
popgenB = 0;
		
for ( jj=1; jj<=nruns; jj++ )
{ pop1NumberA = halfpopsize;
	pop1NumberB = halfpopsize;
			
ii = 0;  // counts generations
  
  do
  { pop2NumberA = 0; // for the next generation
    pop2NumberB = 0;
  
    for ( i=0; i<pop1NumberA; i++ ) // scroll through each A
    { if ( 0.5 > Math.random() )
      {} // No offspring for this individual A
      else
      { pop2NumberA = pop2NumberA + 2;  // Two offspring for this A
      }
    } // end for
        
    for ( i=0; i<pop1NumberB; i++ ) // This time scroll through each B
    { if ( 0.5 > Math.random() )
      {} // No offspring for this individual B
      else
      { pop2NumberB = pop2NumberB + 2;  // Two offspring for this B
      }          
    } // end for
        
    ii++;
    pop1NumberA = pop2NumberA;
    pop1NumberB = pop2NumberB;
        
  } while ( 0!=pop1NumberA && 0!=pop1NumberB );
      
  if ( 0==pop1NumberA && 0==pop1NumberB )
    simulation.output.value += "The population crashed!\n"; 
  else if ( 0==pop1NumberA )
  { simulation.output.value += "B became only lineage in "
                      +  ii + " generations\n";
    popgenB = popgenB + ii;
    goodrunsB++;  
  }
  else
  { simulation.output.value += "A became only lineage in "
                      +  ii + " generations\n";
    popgenA = popgenA + ii;
    goodrunsA++;  
  }        
} // end for (jj)

aave = popgenA / goodrunsA;
bave = popgenB / goodrunsB;
simulation.output.value += "Ave. generations to all A lineage: "
                  + aave + ".\n";
simulation.output.value += "Ave. generations to all B lineage: "
                  + bave + ".\n";
                  
}