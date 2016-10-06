  //globale variabelen
	var alleVragenEnAntwoorden = new Array(999);
          //= array waarin alle vragen, gebruiker antwoorden, correcte antwoorden en resultaten (true/false) worden bewaard
  var currentVraagIndex = 0;
          //= dit bepaald op welke index we data moeten zetten voor ons alleVragenEnAntwoorden array. 
          //Het begint op 0, na iedere vraag gaat het +4 omdat we voor iedere vraag 4 nieuwe elementen 
          //in ons array zetten (vraag, antwoord, pc antwoord, true/false)
  var totaalAantalVragen = 0;
          //= int dat bijhoudt hoeveel vragen er in totaal zijn, dit wordt op een bepaalde waarde gezet wanneer een traject start
	var gebruikerPunten = 0;
          //houdt bij hoeveel punten de gebruiker heeft. Voor iedere juiste antwoord gaat dit +5
  var gebruikerNaam = "";
          //string dat naam van gebruiker bijhoudt
  var traject = "";
          //string dat naam van traject bijhoudt, deze naam wordt bepaald bij start van een traject
  /*
  |
  |
  |
  |
  |
  |
  DEEL 1 ==> ALGEMENE SUB-FUNCTIES NODIG VOOR ANDERE FUNCTIES
  |
  |
  |
  |
  |
  |
  V
  */

  //zet de waarde van alle globale variabelen terug op default
  function resetAllGlobalVariables(){
  alleVragenEnAntwoorden = new Array(999); //voldoende plaats voor honderden vragen
  totaalAantalVragen = 0;
  currentVraagIndex = 0;
  gebruikerPunten = 0;
  gebruikerNaam = "";
  traject = "";
  }

  //gebruikt om de invoer na te checken: returned true als invoer mag en anders false;
  function verifieerCorrecteInvoer(gekozenOptie,mogelijkeOptiesRij){
    var correcteInvoer = false;
    for (var i = 0; i < mogelijkeOptiesRij.length && !correcteInvoer; i++){
      if(mogelijkeOptiesRij[i]==gekozenOptie) correcteInvoer = true;
    }
    return correcteInvoer;
  }
  //kijkt na of vraag al gesteld is (zoekt in ons grote array naar dezelfde vraag)
  function verifieerHerhaaldeVraag(vraag){
    var vraagAlGesteld = false;
    for (var i = 0; i < alleVragenEnAntwoorden.length; i+= 4){ //i+=4 omdat een vraag om de 4 elementen in die array wordt gezet (andere 3: antwoord, correct antwoord en resultaat)
      if (alleVragenEnAntwoorden[i] == vraag){
        vraagAlGesteld = true;
      }
    }
    return vraagAlGesteld;
  }
  //gebruikt om antwoord te controleren, te bewaren en score bij te houden 
  function verifieerEnBewaarAntwoord(vraag,gebruikerAntwoord,correctAntwoord,uitTePrintenAntwoord){
    if((gebruikerAntwoord==""||gebruikerAntwoord==" ") && gebruikerAntwoord!="0") gebruikerAntwoord = "-geen antwoord-";
    //zet vraag, gebruiker antwoord en correct antwoord in rij:
    alleVragenEnAntwoorden[currentVraagIndex] = vraag;
    alleVragenEnAntwoorden[currentVraagIndex+1] = gebruikerAntwoord;
    alleVragenEnAntwoorden[currentVraagIndex+2] = correctAntwoord;
    //vergelijk gebruiker antwoord met correct antwoord, dit wordt ons resultaat
    var resultaat = (gebruikerAntwoord.toString().toUpperCase()==correctAntwoord.toString().toUpperCase());
    alleVragenEnAntwoorden[currentVraagIndex+3] = resultaat;
    //optioneel: print ander antwoord uit dan verwacht van gebruiker (met meer informatie dan nodig in gebruiker antwoord, bvb. met populatie van 2 landen die vergeleken werden)
    //dit te printen antwoord wordt bewaard als correct antwoord, maar ondertussen is resultaat al bepaald, dus er kan vanalles geprint worden zonder dat 'result' false is
    if(uitTePrintenAntwoord!=undefined) alleVragenEnAntwoorden[currentVraagIndex+2] = uitTePrintenAntwoord;
    //indien resultaat true is (gebruiker antwoord = correct antwoord), add 5 to score
    if (resultaat==true) gebruikerPunten+=5;
    //we hebben 4 elementen opgeslaan in ons array, daarom moet de index klaar zijn om bij de volgende vraag alweer alle informatie bij te houden
    currentVraagIndex+=4;
  }

  //geeft terug welke vraag de gebruiker op is in de vorm van: Vraag 1/20
  function thisVraag(){
    return "Vraag " + ((currentVraagIndex/4)+1)+"/"+totaalAantalVragen;
  }
  //gebruikt om vorig antwoord af te printen
  function printVorigAntwoord(){
    var uitString = "Traject: " + traject +"\n";
    if(currentVraagIndex>=4){
      uitString += "-------------------------------------------------------"
          + "\n    Vorige vraag: " + alleVragenEnAntwoorden[currentVraagIndex-4]
          + "\n    Je antwoord: " + alleVragenEnAntwoorden[currentVraagIndex-3]
          + "\n    Juiste antwoord: " + alleVragenEnAntwoorden[currentVraagIndex-2]
          + "\n    Je had de vraag " + (alleVragenEnAntwoorden[currentVraagIndex-1]==true?"":"niet ") + "juist!"
          + "\n    --> Score: " + gebruikerPunten
          + "\n-------------------------------------------------------\n";
    }
  return uitString;
  }

  /*
  | cookie/localstorage functies - gebruikt om data te exporteren uit het bestand
  */

  //neemt een array en maakt daarvan een lange string, waarin ieder element gescheiden is door een '|' teken,
  //zo kan de string gemakkelijk terug in array worden gezet na import in ander document
  function generateStringVanArray(inArray){
    var uitString = "";
    var stop = false;
    for (var i = 0; i < inArray.length && !stop; i++){
      if(inArray[i]!=undefined){
        uitString+= inArray[i] + "|";
      }
      else{
        stop = false;
      }
    }
    return uitString;
  }
  //vervangt "\n" door " " in een string (handig als we naar html exporteren --> waar <br> \n vervangt)
  function verwijderLineBreaks(inString){
      var uitString = "";
      for (var i = 0; i < inString.length; i++){
          if(inString.charAt(i) == "\n"){
            uitString += " ";
          }
          else{
            uitString += "" + inString.charAt(i);
          }
      }
      return uitString;
  }

  /*
  | einde cookie/localstorage functions
  */

  /*
  |
  |
  |
  |
  |
  |
  DEEL 2 ==> START VAN PROGRAMMA
  |
  |
  |
  |
  |
  |
  V
  */
  //Start programma --> Dit wordt uitgevoerd wanneer je op Start Brainstorm knop drukt!
  function startProgramma(){
    //zet alle waarden van globale variabelen terug op 0:
    resetAllGlobalVariables();
    //toon keuze mogelijkheden:
  	gebruikerNaam = prompt(("Dit programma kan je op meerdere gebieden testen.\nJe kunt zelf je traject samenstellen of een van ons voorgemaakte trajecten afleggen."
            + "\n\n Gelieve je naam in te typen!"));
    if(gebruikerNaam==""||gebruikerNaam==" "||gebruikerNaam>(-999)) startProgramma(); //zorg dat gebruikerNaam een (niet-lege) string is!
    //toon opties om traject te beginnen...:
  	showOptiesEnStartTraject();
    //na programma is afgelopen:
    confirm(printVorigAntwoord()); //we printen het resultaat van laatste antwoord af, en dan:
    eindigProgramma();
  }

  //Vraag aan gebruiker welk traject hij wil volgen (+ samenstellen optie)
  function showOptiesEnStartTraject(){
    var keuzeTraject = prompt("Gelieve het nummer in te typen dat overeenkomt met de door jou gekozen optie:\n\n"
              + "1. Het wiskunde traject: Test je competenties in rekenen.\n"
              + "2. De analyse test: Vind antwoorden door te analyseren.\n"
              + "3. De kennis quiz: Hoeveel ken jij over de wereld?\n\n"
              + "4. De All-Round brain test afleggen: AANBEVOLEN!!\n"
              + "5. Zelf je eigen traject in elkaar stellen.");

    if(!verifieerCorrecteInvoer(keuzeTraject,[1,2,3,4,5,6])) showOptiesEnStartTraject();
    if(keuzeTraject==1) beginWiskundeTraject();
    if(keuzeTraject==2) beginAnalyseTraject();
    if(keuzeTraject==3) beginWereldKennisTraject();
    if(keuzeTraject==4) beginAllRoundTraject();
    if(keuzeTraject==5) beginEigenTraject();
  }

  //Eindig programma
  function eindigProgramma(){
    // maak string van grote array, sla deze string op in storage
    var cookieString1 = verwijderLineBreaks(generateStringVanArray(alleVragenEnAntwoorden));
    localStorage.setItem('brainStormData', JSON.stringify(cookieString1));
    // punten, aantal vragen en aantal juiste antwoorden opslaan in storage
    var cookieString2 = generateStringVanArray([traject,gebruikerPunten,totaalAantalVragen,gebruikerNaam]);
    localStorage.setItem('brainStormResultaten', JSON.stringify(cookieString2));
    //open scores pagina
    window.open("SCORES_TABLE.html");
  }
  

 
  /*
  |
  |
  |
  |
  |
  |
  DEEL 3 ==> FUNCTIES VAN TRAJECTEN
  |
  |
  |
  |
  |
  |
  V
  */
  /*
  |
  |
  |
  |
  DEEL 3A ==> WISKUNDE TRAJECT
  |
  |
  |
  |
  V
  */

  //Begin voorgeprogrammeerde wiskunde traject
  function beginWiskundeTraject(){
  	confirm("Welkom in de wiskunde traject!\nDruk op 'OK' of 'Volgende' om te beginnen!");
  	traject = "Wiskunde";
    totaalAantalVragen = 12;
    for (var i = 0; i < 3; i++){
      multiplication(1);
      division(1);
      additionAndSubtraction(1);
      toThePowerOf(1);
    }
  }
  
  /*
  |
  FUNCTIONALITEITEN IN DIT TRAJECT
  |
  V
  */

  //Optellen en aftellen functie / aantal = aantal vragen
  function additionAndSubtraction(aantal){
    //zelfde concept als multiplication() en division()
    for (i = 0; i < aantal; i++){
      //vind twee random ints (van 1 cijfer lang en van 2 cijfers lang)
      var randomLongInt = parseInt(Math.random()*1000);
      var randomShortInt = parseInt(Math.random()*100);
      //voeg positieve of negatieve tekens voor beide cijfers in vraag; 0.3 omdat ik meer (+) dan (-) wil
      var posOfNeg1 = (Math.random()>=0.3?1:-1);
      var posOfNeg2 = (Math.random()>=0.5?1:-1);
      //vraag opstellen:
      var vraag = (posOfNeg1==1?"":"-") + randomLongInt + (posOfNeg2==1?" + ":" - ") + randomShortInt;
      //correct antwoord een waarde geven:
      var correctAntwoord = parseInt((posOfNeg1*randomLongInt) + (posOfNeg2*randomShortInt));
      if(verifieerHerhaaldeVraag(vraag)==false){ //verifieer of de vraag al niet is gesteld
          var stelVraag = thisVraag() + ": Optellen en Aftrekken\n\n" //stelVraag is om meer info te tonen dan alleen de vraag van de huidige oefening (bvb. vorig antwoord)
                        + "Gelieve het antwoord in te typen van de volgende probleemstelling:\n\n" + vraag + "\n";
          var gebruikerAntwoord = parseInt(prompt(printVorigAntwoord() + stelVraag));
          //verifieer en bewaar vraag en antwoorden; gebruikerAntwoord>-99999 om te kijken of antwoord wel een nummer is, anders wordt het opgeslaan als "geen antwoord"
          verifieerEnBewaarAntwoord(vraag,(gebruikerAntwoord>(-999999)?gebruikerAntwoord:"-geen antwoord-"),correctAntwoord);
      }
      else{
          i--; //als vraag al is gesteld, generate other question zonder dat we dichter bij 'aantal' vragen komen
      }
    }
  }
  //Vermenigvuldiging functie; zelfde concept als optellen en aftellen functie
  function multiplication(aantal){
  	for (var i = 0; i < aantal; i++){
  		var randomShortInt = parseInt(Math.random()*10)+2;
  		var randomLongInt = parseInt(Math.random()*100)+2;
  		var posOfNeg = (Math.random()>=0.3?1:-1);
  		var vraag = randomShortInt + " x " + (posOfNeg=="1"?"":"-") + randomLongInt;
  		if(verifieerHerhaaldeVraag(vraag)==false){
  	  		var correctAntwoord = randomShortInt * (posOfNeg*randomLongInt);
  	  		var stelVraag = thisVraag() + ": Vermenigvuldiging\n\n" 
                        + "Gelieve het antwoord in te typen van de volgende probleemstelling:\n\n" + vraag + "\n";
  	  		var gebruikerAntwoord = parseInt(prompt(printVorigAntwoord() + stelVraag));
  	  		verifieerEnBewaarAntwoord(vraag,(gebruikerAntwoord>(-999999)?gebruikerAntwoord:"-geen antwoord-"),correctAntwoord);
	  	}
	  	else{
	  		i--; //als vraag al is gesteld, generate other question
	  	}
  	}
  }
  //Delen functie
  function division(aantal){
  	//zelfde concept als multiplication()
  	for (var i = 0; i < aantal; i++){
  		var randomLongInt = parseInt(Math.random()*100)+2;
  		var randomShortInt = parseInt(Math.random()*10)+2;
  		while (randomShortInt == 0){randomShortInt = parseInt(Math.random()*10);}//best niet door 0 delen
  		var vraag = randomLongInt + " / " + randomShortInt;
      var correctAntwoord = parseInt(randomLongInt / randomShortInt);
  		if(verifieerHerhaaldeVraag(vraag)==false){
  	  		var stelVraag = thisVraag() + ": Delen\n\n" 
                        + "LET OP!\nHet antwoord moet een integer zijn, je moet dus geen rekening houden met het decimaal gedeelte:\n\n" + vraag + "\n";
  	  		var gebruikerAntwoord = parseInt(prompt(printVorigAntwoord() + stelVraag));
  	  		verifieerEnBewaarAntwoord(vraag,(gebruikerAntwoord>(-999999)?gebruikerAntwoord:"-geen antwoord-"),correctAntwoord);
	  	}
	  	else{
	  		i--;
	  	}
  	}
  }

  //Nde macht functie
  function toThePowerOf(aantal){
    //zelfde concept als multiplication()
    for (var i = 0; i < aantal; i++){
      var randomInt1 = parseInt(Math.random()*10)+2;
      var randomInt2 = parseInt(Math.random()*10)+2;
      var vraag = randomInt1 + " tot de macht van " + randomInt2;
      var correctAntwoord = Math.pow(randomInt1,randomInt2);
      if(correctAntwoord < 284 && verifieerHerhaaldeVraag(vraag)==false){ //we willen geen super moeilijke vragen
          var stelVraag = thisVraag() + ": Nde Macht\n\n" + "Gelieve het antwoord in te typen van de volgende probleemstelling:\n\n" 
                        + "Wat is " +  vraag + "?\n";
          var gebruikerAntwoord = parseInt(prompt(printVorigAntwoord() + stelVraag));
          verifieerEnBewaarAntwoord(vraag,(gebruikerAntwoord>(-999999)?gebruikerAntwoord:"-geen antwoord-"),correctAntwoord);
      }
      else{
        i--; //herstel een vraag zonder dichter bij aantal vragen te komen
      }
    }
  }

  

  /*
  |
  |
  |
  |
  DEEL 3B ==> KENNIS TRAJECT
  |
  |
  |
  |
  V
  */

  //Begin kennis traject
  function beginWereldKennisTraject(){
  	confirm("Welkom in de wereldkennis quiz!\nDruk op 'OK' of 'Volgende' om te beginnen!");
  	traject = "Kennis";
    totaalAantalVragen = 12;
    for (var i = 0; i < 3; i++){
      hoofdstedenQuiz1(1);
      bevolkingQuiz(1);
      hoofdstedenQuiz2(1);
      oppervlakteQuiz(1);
    }
  }

  /*
  |
  FUNCTIONALITEITEN IN DIT TRAJECT
  |
  V
  */

  //hoofdsteden oefening 1 - main functie
  function hoofdstedenQuiz1(aantal){
  	var hoofdsteden1Array = new Array("Oostenrijk", "Wenen", "Belgie", "Brussel", "Kroatie", "Zagreb", "Tsjechie", "Praag", "Denemarken", "Kopenhagen", "Finland", "Helsinki", "Frankrijk", "Parijs", "Duitsland", "Berlijn", "Griekenland", "Athene", "Hongarije", "Boedapest", "Ierland", "Dublin", "Italie", "Rome", "Malta", "Valletta", "Monaco", "Monaco", "Nederland", "Amsterdam", "Noorwegen", "Oslo", "Polen", "Warschau", "Portugal", "Lissabon", "Roemenie", "Boekarest", "Rusland", "Moskou", "Spanje", "Madrid", "Zweden", "Stockholm", "Zwitserland", "Bern", "Verenigd Koninkrijk", "Londen", "Vaticaanstad", "Vaticaanstad", "China", "Beijing", "India", "New Delhi", "Indonesie", "Jakarta", "Irak", "Bagdad", "Israel", "Jeruzalem", "Japan", "Tokio", "Zuid Korea", "Seoul", "Syrie", "Damascus", "Turkije", "Ankara", "Verenigde Arabische Emiraten", "Abu Dhabi", "Vietnam", "Hanoi", "Congo", "Brazzaville", "Egypte", "Cairo", "Madagaskar", "Antananarivo", "Mozambique", "Maputo", "Zuid-Afrika", "Pretoria", "Zambia", "Lusaka", "Zimbabwe", "Harare");
	
	zoekLandOfHoofdstadEnVraagNaarOvereenkomstigeInformatie(hoofdsteden1Array,aantal,"Wat is de hoofdstad van",0,1); //0 is positie van vraag, 1 = pos. antwoord. Dit betekent: vraag ligt voor antwoord in array ("Oostenrijk?" => "Wenen")
  }
  //hoofdsteden oefening 2 - main functie
  function hoofdstedenQuiz2(aantal){
  	var hoofdsteden2Array = new Array("Oostenrijk", "Wenen", "Belgie", "Brussel", "Kroatie", "Zagreb", "Tsjechie", "Praag", "Denemarken", "Kopenhagen", "Finland", "Helsinki", "Frankrijk", "Parijs", "Duitsland", "Berlijn", "Griekenland", "Athene", "Hongarije", "Boedapest", "Ierland", "Dublin", "Italie", "Rome", "Malta", "Valletta", "Monaco", "Monaco", "Nederland", "Amsterdam", "Noorwegen", "Oslo", "Polen", "Warschau", "Portugal", "Lissabon", "Roemenie", "Boekarest", "Rusland", "Moskou", "Spanje", "Madrid", "Zweden", "Stockholm", "Zwitserland", "Bern", "Verenigd Koninkrijk", "Londen", "Vaticaanstad", "Vaticaanstad", "China", "Beijing", "India", "New Delhi", "Indonesie", "Jakarta", "Irak", "Bagdad", "Israel", "Jeruzalem", "Japan", "Tokio", "Zuid Korea", "Seoul", "Syrie", "Damascus", "Turkije", "Ankara", "Verenigde Arabische Emiraten", "Abu Dhabi", "Vietnam", "Hanoi", "Congo", "Brazzaville", "Egypte", "Cairo", "Madagaskar", "Antananarivo", "Mozambique", "Maputo", "Zuid-Afrika", "Pretoria", "Zambia", "Lusaka", "Zimbabwe", "Harare");
	
	zoekLandOfHoofdstadEnVraagNaarOvereenkomstigeInformatie(hoofdsteden2Array,aantal,"Tot welk land behoort de hoofdstad",1,0); //1 is hier positie van vraag, 0 = pos. antwoord, dus hier staat vraag NA antwoord ("Wenen?" => "Oostenrijk")
  }

  //functie dat voor hoofdsteden-quizzen vragen zal stellen en antwoorden van gebruiker zal nachecken en opslaan 
  //deze functie kiest een land (indexVraag=0) OF hoofdstad (indexVraag=1) uit een ingegeven array en vraagt aan user naar overeenkomstig hoofdstad/land
  function zoekLandOfHoofdstadEnVraagNaarOvereenkomstigeInformatie(inArray,aantalVragen,inVraag,indexVraag,indexAntwoord){
  	if (aantalVragen > inArray.length/2) aantalVragen = inArray.length/2; //er zijn maar zoveel verschillende mogelijke oplossingen
  	for (var i = 0; i < aantalVragen; i++){
  		var randomIndex = parseInt(Math.random()*(inArray.length/2)); //array is opgedeeld in 2 delen: land, hoofdstad, land, hoofdstad...
  		var vraagIndex = (randomIndex*2)+indexVraag;
  		var vraag = inVraag + " " + inArray[vraagIndex] + "?";
  		if(verifieerHerhaaldeVraag(vraag)==false){
          var correctAntwoord = inArray[vraagIndex+(indexAntwoord==0?-1:1)]; //indexAntwoord 0 betekent dat antwoord voor vraag ligt, dus vraagIndex-1; anders ligt het na vraag, dus vraagIndex+1
          var stelVraag = thisVraag() + ": Landen en Hoofdsteden\n\n" + vraag + "\n";
  		    var gebruikerAntwoord = prompt(printVorigAntwoord() + stelVraag);
          verifieerEnBewaarAntwoord(vraag,gebruikerAntwoord,correctAntwoord);
  		}
  		else{
  			i--;
  		}
  	}
  }

  //bevolking quiz main functie
  function bevolkingQuiz(aantal){
	var bevolkingArray = new Array("China",1349,"India",1220,"Verenigde Staten",316,"Indonesie",251,"Brazilie",201,"Rusland",142,"Bangladesh",163,"Japan",127,"Mexico",116,"Nigeria",174,"Ethiopie",93,"Vietnam",92,"Egypte",85,"Duitsland",81,"Turkije",80,"Iran",79,"Thailand",67,"Frankrijk",65,"Verenigd Koninkrijk",63,"Italie",61,"Zuid-Korea",49,"Zuid-Afrika",48,"Spanje",47,"Oekranie",44,"Argentinie",42,"Polen",38,"Marokko",32,"Canada",34,"Noord-Korea",24,"Madagaskar",23,"Australie",22,"Nederland",17,"Zambia",14,"Zimbabwe",13,"Portugal",10.8,"Griekenland",10.7,"Bolivia",10.4,"Belgie",11,"Tsjechie",10,"Zweden",9,"Oostenrijk",8,"Zwitserland",7.9,"Denemarken",5.5,"Ierland",4.8,"Noorwegen",4.7,"Costa Rica",4.6,"Kroatie",4.4,"Swaziland",1.4,"Ijsland",0.3,"Vaticaanstad",0.0008);
	
	vergelijkWaardenVanLanden(bevolkingArray,aantal,"Welk land heeft een groter aantal inwoners","miljoen inwoners");
  }
  //oppervlakte main functie
  function oppervlakteQuiz(aantal){
  	var oppervlakteArray = new Array("Rusland",17000,"Canada",9900,"Verenigde Staten",9600,"China",9500,"Brazilie",8500,"Australie",7700,"India",3200,"Argentinie",2800,"Groenland",2200,"Mexico",2000,"Indonesie",1900,"Iran",1600,"Zuid-Afrika",1200,"Ethiopie",1100,"Egypte",1000,"Mozambique",800,"Afghanistan",650,"Frankrijk",640,"Madagaskar",590,"Thailand",515,"Spanje",505,"Zweden",450,"Irak",435,"Zimbabwe",390,"Japan",375,"Duitsland",360,"Finland",335,"Vietnam",330,"Noorwegen",320,"Polen",310,"Italie",300,"Nieuw-Zeeland",270,"Verenigd Koninkrijk",242,"Griekenland",131,"Noord-Korea",120,"Ijsland",103,"Portugal",92,"Jordanie",89,"Oostenrijk",83,"Ierland",70,"Costa Rica",51,"Slowakije",49,"Denemarken",43,"Zwitserland",41,"Nederland",37,"Belgie",30,"Cyprus",9,"Monaco",0.002,"Vaticaanstad",0.00044);
  	
  	vergelijkWaardenVanLanden(oppervlakteArray,aantal,"Welk land heeft een grotere oppervlakte","duizend m^2");
  }
  //functie dat wordt gebruikt voor de oppervlakte en bevolking oefeningen
  /*deze functie deelt een array in stukken van 2 elementen, de eerste element wordt getoont aan de gebruiker en de tweede element wordt gebruik door 
  computer om antwoord te berekenen; zo kan dit programma de waarde van twee landen bijhouden en vergelijkingen op brengen.
  eenheidVanWaardes is de eenheid van de getallen in array (bvb. aantal inwoners, oppervlakte in m^2).*/
  function vergelijkWaardenVanLanden(inArray,aantalVragen,inVraag,eenheidVanWaardes){
  	for (var i = 0; i < aantalVragen; i++){
	 	  var land1Index = parseInt(Math.random()*inArray.length / 2) * 2; //helft van array elementen zijn landen, andere helft waarden
	  	var land2Index = parseInt(Math.random()*inArray.length / 2) * 2;
	  	while (land2Index==land1Index){land2Index=parseInt(Math.random()*inArray.length / 2) * 2;} //zorg dat we twee zelfde elementen niet vergelijken
	  	var vraag = inVraag + ",\n       " + inArray[land1Index] + " of " + inArray[land2Index] + "?";
      var correctAntwoordIndex = (inArray[land1Index+1]>inArray[land2Index+1]?/*correctAntwoordIndex=*/land1Index:/*OF*/land2Index);
      var foutAntwoordIndex = (land1Index==correctAntwoordIndex?land2Index:land1Index);
      var correctAntwoord = inArray[correctAntwoordIndex];
	  	if(verifieerHerhaaldeVraag(vraag)==false){
  	  		//we willen index van antwoord bijhouden om waarde (dus populatie of oppervlakte van land, bvb.) aan gebruiker te kunnen tonen nadat hij heeft ge-antwoord
  	  		var stelVraag = thisVraag() + ": Landen Vergelijken\n\n" + vraag + "\n";
  	  		var gebruikerAntwoord = prompt(printVorigAntwoord() + stelVraag);
  	  		verifieerEnBewaarAntwoord(vraag,gebruikerAntwoord,correctAntwoord,
	  									/*uitTePrintenAntwoord (optionele parameter): dit antwoord zal worden opgeslaan als antwoord maar niet worden gebruikt bij vergelijking met gebruikerAntwoord*/
	  									correctAntwoord + ("\n       (" + inArray[correctAntwoordIndex+1]+" tegenover "+inArray[foutAntwoordIndex+1]+" " + eenheidVanWaardes + ")"));
	  																		//de bedoeling hiervan is om te kunnen weergeven bvb. "Correct antwoord = Rusland (150 tegenover 50 milj. inwoners)"
	  		}
	  		else{
	  			i--;
	  		}
  	}
  }

  /*
  |
  |
  |
  |
  DEEL 3C ==> ANALYSE TRAJECT
  |
  |
  |
  |
  V
  */

  //begin analyse traject
  function beginAnalyseTraject(){
  	confirm("Welkom in de logica en analyse quiz!\nDruk op 'OK' of 'Volgende' om te beginnen!");
  	traject = "Analyse";
    totaalAantalVragen = 12;
    for (var i = 0; i < 3; i++){
      lengteLijntjesQuiz(1);
      binairNaarDecimaalQuiz(1);
      decimaalNaarBinairQuiz(1);
      virusSimulatieQuiz(1);
    }

  }

  /*
  |
  FUNCTIONALITEITEN IN DIT TRAJECT
  |
  V
  */

  //lengte van lijntjes quiz - gebruiker moet zeggen welke lijn langer is. functie kiest 2 random lijnen uit array en vergelijkt lengte
  function lengteLijntjesQuiz(aantal){
  	var lijntjesArray = new Array("<--------------->",">---------------<","<-------------->",">--------------<",">-------------<",">-------------<","<---------------->",">----------------<",">-----------------<","<----------------->",">------------------<","<------------------>");
  	for (var i = 0; i < aantal; i++){
  		//kies twee random lijnen om lengte te vergelijken met elkaar
	  	var lijn1Index = parseInt(Math.random()*lijntjesArray.length / 2) * 2;
	  	var lijn2Index = parseInt(Math.random()*lijntjesArray.length / 2) * 2;
	  	var vraag = "\nWelke lijn is langer?\n" + lijntjesArray[lijn1Index] + "   of   " + lijntjesArray[lijn2Index];
      var correctAntwoord = "geen";
      if (lijntjesArray[lijn1Index].length>lijntjesArray[lijn2Index].length){correctAntwoord = "lijn 1";}
      else if (lijntjesArray[lijn2Index].length>lijntjesArray[lijn1Index].length){correctAntwoord = "lijn 2";}
	  	if(verifieerHerhaaldeVraag(vraag)==false){	
  	  		var stelVraag = thisVraag() + ": Lengte van lijnen\n\n" + "Gelieve als antwoord te typen:\nlijn 1 / lijn 2 / geen (zonder onnodige spaties):\n" + vraag + "\n";
  	  		var gebruikerAntwoord = prompt(printVorigAntwoord() + stelVraag);
  	  		verifieerEnBewaarAntwoord(vraag,gebruikerAntwoord,correctAntwoord);
	  	}
	  	else{
	  		i--;
	  	}
  	}
  }

  //binair interpreteren vraag main functie
  function binairNaarDecimaalQuiz(aantal){
    var uitVraag = "Wat is de decimale voorstelling van";
    var extraMededeling = "Gelieve het exacte antwoord in te typen, zonder onnodige karakters:"
    vraagBinairOfDecimaal("decimaal",aantal,uitVraag,extraMededeling);
  }
  //decimaal naar binair omzetten vraag main functie
  function decimaalNaarBinairQuiz(aantal){
    var uitVraag = "Wat is de binaire voorstelling van";
    var extraMededeling = "Gelieve het exacte antwoord in te typen, zonder onnodige karakters:"
    vraagBinairOfDecimaal("binair",aantal,uitVraag,extraMededeling);
  }
  //wordt gebruikt om decimaal nummer om te zetten naar binaire vorm
  function naarBinair(input){
    var output = input%2;
    if (input>0){
      output = naarBinair(parseInt(input/2)) + "" + output;
    }
    return parseInt(output);
  }
  //functie die random decimaal nummer en zijn binaire weergave genereert, dit aan de gebruiker vraagt en het antwoord na kijkt en opslaat
  function vraagBinairOfDecimaal(watVinden,aantalVragen,inVraag,extraMededeling){
  	for (var i = 0; i < aantalVragen; i++){
  		var randomDecimaalGetal = parseInt(Math.random()*32)+2;
      //kijken of de gebruiker de decimale of binaire weergave moet vinden
  		var teVragen = (watVinden=="binair"?randomDecimaalGetal:naarBinair(randomDecimaalGetal));
  		var correctAntwoord = (watVinden=="binair"?naarBinair(randomDecimaalGetal):randomDecimaalGetal);
  		var vraag = inVraag + " " + teVragen + "?";
  		if(verifieerHerhaaldeVraag(vraag)==false){
  			var stelVraag = thisVraag() + ": Binair/Decimaal\n\n" + extraMededeling + "\n\n" + vraag + "\n";
  			var gebruikerAntwoord = prompt(printVorigAntwoord() + stelVraag);
  			verifieerEnBewaarAntwoord(vraag,gebruikerAntwoord,correctAntwoord);
  		}
  		else{
  			i--;
  		}
  	}
  }

  /*
  virus simulatie variant:
  |
  |
  |
  */
  function virusSimulatieQuiz(aantalKeer){
    for (var i = 0; i < aantalKeer; i++){
      //vind random aantal straten, huizen en percentage ge-infecteerd uit bepaalde waarden (in arrays)
        var aantalStratenMogelijkheden = [4,5,6];
        var aantalHuizenMogelijkheden = [3,4,5];
        var percentageInfectMogelijkheden = [15,20,25];
        aantalStraten = aantalStratenMogelijkheden[parseInt(Math.random()*3)];
        aantalHuizen = aantalHuizenMogelijkheden[parseInt(Math.random()*3)];
        percentageInfect = percentageInfectMogelijkheden[parseInt(Math.random()*3)];
      //start zombie infectie met deze random waarden
        goZombies(aantalStraten,aantalHuizen,percentageInfect);
    }
  }
  
  function goZombies(aantalStraten,aantalHuizen,percentageInfect){
    //bereken aantalPersonen en aantalTeInfecteren:
    var aantalPersonen = aantalStraten * aantalHuizen;
    var aantalTeInfecteren = Math.round((percentageInfect>100?1:percentageInfect/100)*aantalPersonen);

    //maak straten en huizen, infecteer random huizen, print resultaat uit:
    var inRij = generateHealthyHouses(aantalStraten,aantalHuizen);
    infectRandom(inRij,aantalTeInfecteren);
    var stringPrinted = "";

    var vraag = "Na hoeveel cycli zal ieder huis bewoond zijn door zombies?";
    var gebruikerAntwoord = prompt(printVorigAntwoord() + thisVraag() + ": Zombie infectie\n\n"
                                + "Hieronder zie je een stad met " + aantalStraten + " straten en " + aantalHuizen + " huizen."
                                + "\nDe stad lijdt aan een zombie virus. Een 'Z' betekent dat de familie in het huis ge-infecteerd is. Een '0' betekent gezond."
                                + "\nNa iedere cyclus worden alle rechtstreekse buren van een zombie familie ook ge-infecteerd."
                                + "\n\n" + vraag 
                                + "\n\n" + printAll(inRij,0));

    //begin simulatie, tel aantal cycli tot geen verandering:
    var goOn = true;
    var aantalCycli = 0;
    for(var i = 1; goOn==true; i++){
      if(goOnCycle()==true){
        aantalCycli++;
      }
      else{
        goOn = false;
      }
    }
    //zet aantal cycli als correct antwoord
    var correctAntwoord = aantalCycli;
    //verifieer en bewaar vraag en antwoorden
    verifieerEnBewaarAntwoord(vraag,gebruikerAntwoord,correctAntwoord);

    /*
    //////////////////HIER BEVINDT ZICH EEN VERKORTE AANGEPASTE VERSIE VAN HET VIRUS PROGRAMMA CODE:
            |
            |
            V
    */
            //random int voor random huis en straat te infecteren
            function getRandomInt(min,max){
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            //main functies:
            function generateHealthyHouses(aantalStraten,aantalHuizen){
              //generate arrays
              var rij = new Array(aantalStraten);
              for (var i = 0; i < aantalStraten; i++){
                rij[i] = new Array(aantalHuizen);
              }
              //make all uninfected (=healthy)
              for (var i = 0; i < aantalStraten; i++){
                for (var j = 0; j < aantalHuizen; j++){
                  rij[i][j] = "0";
                }
              }
              return rij;
            }
            function infectRandom(inRij,aantalTeInfecteren){
              for (var i = 0; i < aantalTeInfecteren; i++){
                var randomStraat = getRandomInt(0,inRij.length-1);
                var randomHuis = getRandomInt(0,inRij[0].length-1);
                if(inRij[randomStraat][randomHuis] != "Z"){
                  inRij[randomStraat][randomHuis] = "Z";
                }
                else{
                  i--;
                }
              }
            }
            function generateRoof(inRij){
                var s = "";
                for (var i = 0; i < inRij[0].length; i++){
                  s+= "----";
                }
                return s;
            }
            function printAll(inRij, cyclus){
              var uitString = generateRoof(inRij)+"\n";
              for (var i = 0; i < inRij.length; i++){
                uitString+= "|";
                for (var j = 0; j < inRij[0].length; j++){
                  uitString+= "| " + inRij[i][j] + " |";
                }
                uitString+= "|\n" + generateRoof(inRij) + "\n";
              }
              return uitString + "\nAantal gezonden (0): " + vindAantal(inRij,"0")
                + "\nAantal zombies (Z): " + vindAantal(inRij,"Z");
            }

            function getInfected(inRij,i,j){
              var veranderd = false;
              if (i >= 0 && i < inRij.length && j >= 0 && j < inRij[i].length){
                        inRij[i][j] = "Z";
                        veranderd= true;}
              return veranderd;         
            }
            function copyArray(inRij){
              var uitRij = new Array(inRij.length);
              for (var i = 0; i < inRij.length; i++){
                uitRij[i] = new Array(inRij[0].length);
              }
              for (var i = 0; i < inRij.length; i++){
                for (var j = 0; j < inRij[0].length; j++){
                  uitRij[i][j] = inRij[i][j];
                }
              }
              return uitRij;
            }
            function isZelfde(array1,array2){
              var zelfde = true;
              for (var i = 0; i < array1.length && zelfde; i++){
                for (var j = 0; j < array1[0].length && zelfde; j++){
                  if (array1[i][j]!=array2[i][j]) zelfde = false;
                }
              }
              return zelfde;
            }
            function goOnCycle(){
              var verandering = false;
              var newArray = copyArray(inRij);
              for (var i = 0; i < inRij.length; i++){
                for (var j = 0; j < inRij[0].length; j++){
                  if(inRij[i][j] == "Z"){
                    getInfected(newArray,i,j-1);
                    getInfected(newArray,i,j+1);
                    getInfected(newArray,i-1,j);
                    getInfected(newArray,i+1,j);
                  }
                }
              }
              if(!isZelfde(inRij,newArray)){
                inRij = newArray;
                verandering = true; 
              }
              return verandering;
            }
          
          function vindAantal(inRij,wat){
            var aantal = 0;
            for (var i = 0; i < inRij.length; i++){
              for (var j = 0; j < inRij[0].length; j++){
                if(inRij[i][j]==wat){
                  aantal++;
                }
              }
            }
            return aantal;
          }
        }

/*
  ^
  |
  |
  EIND VIRUS SIMULATIE
  */

  /*
  |
  |
  |
  |
  DEEL 3D ==> ALL-ROUND TRAJECT
  |
  |
  |
  |
  V
  */

function beginAllRoundTraject(){
  	confirm("Welkom in het all-round traject!\nDruk op 'OK' of 'Volgende' om te beginnen!");
  	traject = "All-Round";
    totaalAantalVragen = 14;
    for (var i = 0; i < 1; i++){ //deze for loop is niet nodig in dit geval, maar is wel flexibel (ik kan gemakkelijk het traject 2x zo lang maken)
      lengteLijntjesQuiz(1);
      multiplication(1);
      bevolkingQuiz(1);
      virusSimulatieQuiz(1);
      decimaalNaarBinairQuiz(1);
      hoofdstedenQuiz1(1);
      toThePowerOf(1);
      division(1);
      bevolkingQuiz(1);
      additionAndSubtraction(1);
      hoofdstedenQuiz2(1);
      binairNaarDecimaalQuiz(1);
      oppervlakteQuiz(1);
      virusSimulatieQuiz(1);
    }
  }

  /*
  |
  |
  |
  |
  DEEL 3E ==> EIGEN TRAJECT
  |
  |
  |
  |
  V
  */

  function beginEigenTraject(){
    //0. Variabelen
    var aantalAdditionAndSubtraction = 0;
    var aantalMultiplication = 0;
    var aantalDivision = 0;
    var aantalToThePowerOf = 0;
    var aantalHoofdSteden1 = 0;
    var aantalHoofdSteden2 = 0;
    var aantalBevolking = 0;
    var aantalOppervlakte = 0;
    var aantalLengteLijntjes = 0;
    var aantalBinairNaarDecimaal = 0;
    var aantalDecimaalNaarBinair = 0;
    var aantalVirusSimulatie = 0;

    //1. Laat gebruiker een naam kiezen voor traject, moet een string zijn:
    traject = prompt("Gelieve een naam te kiezen voor je traject:");
    if (traject == "" || traject == " " || traject < (-999)) beginEigenTraject();
    //2. Vraag aan gebruiker welke soort vragen hij wil:
    var wiskundePrompt = (prompt("Wil je een 'wiskunde' gedeelte in je traject?\n\nja/nee")=="ja"?true:false);
    var kennisPrompt = (prompt("Wil je een 'kennis' gedeelte in je traject?\n\nja/nee")=="ja"?true:false);
    var analysePrompt = (prompt("Wil je een 'analyse' gedeelte in je traject?\n\nja/nee")=="ja"?true:false);

    //3. Vraag aan gebruiker welke van de mogelijk vragen hij precies wil:
    //(check telkens op input wel een getal is, vraag anders hernieuw voor aantal van specifieke vraag)
    if(wiskundePrompt==true){
      aantalAdditionAndSubtraction = parseInt(prompt("Hoeveel 'optellen en aftrekken' vragen wil je?"));
      while(!(aantalAdditionAndSubtraction>(-999))){aantalAdditionAndSubtraction = parseInt(prompt("Hoeveel 'optellen en aftrekken' vragen wil je?"));}
      aantalMultiplication = parseInt(prompt("Hoeveel 'vermenigvuldiging' vragen wil je?"));
      while(!(aantalMultiplication>(-999))){parseInt(prompt("Hoeveel 'vermenigvuldiging' vragen wil je?"));}
      aantalDivision = parseInt(prompt("Hoeveel 'delen' vragen wil je?"));
      while(!(aantalDivision>(-999))){parseInt(prompt("Hoeveel 'delen' vragen wil je?"));}
      aantalToThePowerOf = parseInt(prompt("Hoeveel 'Nde macht' vragen wil je?"));
      while(!(aantalToThePowerOf>(-999))){parseInt(prompt("Hoeveel 'Nde macht' vragen wil je?"));}
    }	//aantalVoorBeeld mag negatief zijn, want in mijn functies is er controle op de parameter aantal; als die negatief is, wordt die vraag 0 keer uitgevoerd (aantal=0 dus)
    if(kennisPrompt==true){
      aantalHoofdSteden1 = parseInt(prompt("Hoeveel 'hoofdsteden raden' vragen wil je?"));
      while(!(aantalHoofdSteden1>(-999))){aantalHoofdSteden1 = parseInt(prompt("Hoeveel 'hoofdsteden raden' vragen wil je?"));}
      aantalHoofdSteden2 = parseInt(prompt("Hoeveel 'landen raden' vragen wil je?"));
      while(!(aantalHoofdSteden2>(-999))){aantalHoofdSteden2 = parseInt(prompt("Hoeveel 'landen raden' vragen wil je?"));}
      aantalBevolking = parseInt(prompt("Hoeveel 'bevolking vergelijking' vragen wil je?"));
      while(!(aantalBevolking>(-999))){aantalBevolking = parseInt(prompt("Hoeveel 'bevolking vergelijking' vragen wil je?"));}
      aantalOppervlakte = parseInt(prompt("Hoeveel 'oppervlakte vergelijking' vragen wil je?"));
      while(!(aantalOppervlakte>(-999))){aantalOppervlakte = parseInt(prompt("Hoeveel 'oppervlakte vergelijking' vragen wil je?"));}
    }
    if(analysePrompt==true){
      aantalLengteLijntjes = parseInt(prompt("Hoeveel 'lijntjes vergelijking' vragen wil je?"));
      while(!(aantalLengteLijntjes>(-999))){aantalLengteLijntjes = parseInt(prompt("Hoeveel 'lijntjes vergelijking' vragen wil je?"));}
      aantalBinairNaarDecimaal = parseInt(prompt("Hoeveel 'binair naar decimaal' vragen wil je?"));
      while(!(aantalBinairNaarDecimaal>(-999))){aantalBinairNaarDecimaal = parseInt(prompt("Hoeveel 'binair naar decimaal' vragen wil je?"));}
      aantalDecimaalNaarBinair = parseInt(prompt("Hoeveel 'decimaal naar binair' vragen wil je?"));
      while(!(aantalDecimaalNaarBinair>(-999))){aantalDecimaalNaarBinair = parseInt(prompt("Hoeveel 'decimaal naar binair' vragen wil je?"));}
      aantalVirusSimulatie = parseInt(prompt("Hoeveel 'virus simulatie' vragen wil je?"));
      while(!(aantalVirusSimulatie>(-999))){aantalVirusSimulatie = parseInt(prompt("Hoeveel 'virus simulatie' vragen wil je?"));}
    }

    //4. Begin traject:
    totaalAantalVragen = parseInt(aantalMultiplication+aantalDivision+aantalAdditionAndSubtraction+aantalToThePowerOf+aantalHoofdSteden1+aantalBevolking
                          +aantalHoofdSteden2+aantalOppervlakte+aantalLengteLijntjes+aantalBinairNaarDecimaal+aantalDecimaalNaarBinair+aantalVirusSimulatie);
    if(totaalAantalVragen==0){
      confirm("Fout opgetreden:\n\nJe moet minstens 1 vraag hebben in je traject!\nGelieve opnieuw te proberen!");
      beginEigenTraject();
    }
    confirm("Je traject, " + traject + ", is samengesteld!\n\nDruk op 'OK' of 'Volgende' om eraan te beginnen!");

    multiplication(aantalMultiplication);
    division(aantalDivision);
    additionAndSubtraction(aantalAdditionAndSubtraction);
    toThePowerOf(aantalToThePowerOf);

    hoofdstedenQuiz1(aantalHoofdSteden1);
    bevolkingQuiz(aantalBevolking);
    hoofdstedenQuiz2(aantalHoofdSteden2);
    oppervlakteQuiz(aantalOppervlakte);

    lengteLijntjesQuiz(aantalLengteLijntjes);
    binairNaarDecimaalQuiz(aantalBinairNaarDecimaal);
    decimaalNaarBinairQuiz(aantalDecimaalNaarBinair);
    virusSimulatieQuiz(aantalVirusSimulatie);
  }

      
