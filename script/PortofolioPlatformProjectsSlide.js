let mendixPlatform = document.getElementById("mendixPlatform");
let javascriptPlatform = document.getElementById("javascriptPlatform");
let javascriptPlatform1 = document.getElementById("javascriptPlatform1");

let previousButton = document.getElementById("previousButtonProjects");
let nextButton = document.getElementById("nextButtonProjects");

let divForMendixProjects = document.getElementById("divForMendixProjects");
let divForJavaScriptProjects = document.getElementById("divForJavascriptProjects");

let labelForProjects = document.getElementById("labelForProjects");
let labelForPlatform = document.getElementById("labelPlatform");

let currentPlatform = 0;
let ListForMendixJavaScriptInnerHtml;

let javascriptDiv = document.getElementById("javascriptDiv");
let javascriptDiv1 = document.getElementById("javascriptDiv1");

ListForMendixJavaScriptInnerHtml = [mendixPlatform, javascriptPlatform];
let List;

List = [mendixPlatform, javascriptPlatform, javascriptPlatform1]; 
let ListForDivOfProjects;

ListForDivOfProjects = [divForMendixProjects, divForJavaScriptProjects];
let itterator = 0;


  





const mediaQuery = window.matchMedia('(max-width: 768px)')
// Check if the media query is true
if (mediaQuery.matches) {
  // Then trigger an alert
//   alert('Media Query Matched!');

  nextButton.addEventListener('click', () => {

   
    List[itterator].style.display = "none";
    ListForDivOfProjects[itterator].style.display = "none";


    if(itterator==0){
        
        List[itterator+1].style.display = "flex";
        ListForDivOfProjects[itterator+1].style.display = "inline-block";
        itterator++;
        mendixPlatform.style.marginLeft = "7%";
        mendixPlatform.style.marginTop = "-7%";
        mendixPlatform.style.marginLeft = "17%";
        nextButton.style.marginTop = "51%";
        nextButton.style.marginLeft = "25%";
        previousButton.style.marginTop = "51%";
        previousButton.style.marginLeft = "20%";
        labelForProjects.style.marginLeft = "50%";
                    
        labelForProjects.style.width = "27%";
        labelForPlatform.style.width= "29%";
        labelForPlatform.style.position= "relative";
        labelForPlatform.style.marginTop= "32%";
        labelForPlatform.style.marginLeft= "25%";
        javascriptDiv.style.marginTop = "-10%";
        javascriptDiv1.style.marginTop = "-10%";
        


    }
    // else if(itterator >0){     CODE EXAMPLE WHEN YOU DECIDE TO SWITCH
 
    else{
        List[itterator-1].style.display = "flex";
        ListForDivOfProjects[itterator-1].style.display = "inline-block";
        itterator--;
        mendixPlatform.style.marginTop = "55%";
        nextButton.style.marginTop = "51%";
        previousButton.style.marginTop = "51%";
        labelForProjects.style.marginLeft = "13%";
        labelForProjects.style.width = "12%";
        labelForPlatform.style.width= "19.03%";
        labelForPlatform.style.marginTop= "15%";
        labelForPlatform.style.marginLeft= "13%";
        previousButton.style.marginLeft = "30%";
        nextButton.style.marginLeft = "35%";
        labelForProjects.style.marginLeft = "50%";
       
           


    }
   

}

)

previousButton.addEventListener('click', () => {

   
    List[itterator].style.display = "none";
    ListForDivOfProjects[itterator].style.display = "none";


    if(itterator==0){
        List[itterator+1].style.display = "flex";
        ListForDivOfProjects[itterator+1].style.display = "inline-block";
        itterator++;
        mendixPlatform.style.marginLeft = "7%";
        mendixPlatform.style.marginLeft = "7%";
        mendixPlatform.style.marginLeft = "17%";
        nextButton.style.marginTop = "51%";
        nextButton.style.marginLeft = "25%";
        previousButton.style.marginTop = "51%";
        previousButton.style.marginLeft = "20%";
        labelForProjects.style.marginLeft = "50%";
                    
        labelForProjects.style.width = "27%";
        labelForPlatform.style.width= "29%";
        labelForPlatform.style.position= "relative";
        labelForPlatform.style.marginTop= "32%";
        labelForPlatform.style.marginLeft= "25%";
        javascriptDiv.style.marginTop = "3%";
        javascriptDiv1.style.marginTop = "20%";
    }
    // else if(itterator >0){     CODE EXAMPLE WHEN YOU DECIDE TO SWITCH
 
    else{
        List[itterator-1].style.display = "flex";
        ListForDivOfProjects[itterator-1].style.display = "inline-block";
        itterator--;
           mendixPlatform.style.marginTop = "55%";
        nextButton.style.marginTop = "51%";
        previousButton.style.marginTop = "51%";
        labelForProjects.style.marginLeft = "13%";
        labelForProjects.style.width = "12%";
        labelForPlatform.style.width= "19.03%";
        labelForPlatform.style.marginTop= "15%";
        labelForPlatform.style.marginLeft= "13%";
        previousButton.style.marginLeft = "30%";
        nextButton.style.marginLeft = "35%";
        labelForProjects.style.marginLeft = "50%";
    }
   

}

)
}



else{

    mendixPlatform.style.marginTop = "-80%"; 

nextButton.style.marginTop = "-83%";
previousButton.style.marginLeft= "22%";
previousButton.style.marginTop = "-82%";
labelForProjects.style.marginTop = "-10%";
divForJavaScriptProjects.style.marginTop = "-20%";
javascriptPlatform.style.marginTop = "-53%";

nextButton.addEventListener('click', () => {

   
        List[itterator].style.display = "none";
        ListForDivOfProjects[itterator].style.display = "none";


        if(itterator==0){
            List[itterator+1].style.display = "flex";
            ListForDivOfProjects[itterator+1].style.display = "flex";
            itterator++;
            mendixPlatform.style.marginLeft = "7%";
        nextButton.style.marginTop = "-56%";
        nextButton.style.marginLeft = "2%";
        previousButton.style.marginTop = "-56%";
        previousButton.style.marginLeft = "25%";
        labelForProjects.style.marginLeft = "13%";
        labelForProjects.style.marginTop = "-8%";

        labelForProjects.style.width = "13%";
        labelForPlatform.style.width= "14%";
        labelForPlatform.style.position= "relative";
        labelForPlatform.style.marginTop= "15%";
        labelForPlatform.style.marginLeft= "13%";
        javascriptDiv.style.marginTop = "20%";
        javascriptDiv1.style.marginTop = "20%";
      
        }
        // else if(itterator >0){     CODE EXAMPLE WHEN YOU DECIDE TO SWITCH
     
        else{
            List[itterator-1].style.display = "flex";
            ListForDivOfProjects[itterator-1].style.display = "flex";
            itterator--;
            mendixPlatform.style.marginTop = "-90%";
                    nextButton.style.marginTop = "-93%";
                    previousButton.style.marginTop = "-94%";
                    labelForProjects.style.marginLeft = "8%";
                    labelForProjects.style.width = "9%";
                    labelForPlatform.style.width= "9.03%";
                    labelForPlatform.style.marginTop= "10%";
                    labelForPlatform.style.marginLeft= "8%";
                    previousButton.style.marginLeft = "19%";
                    labelForProjects.style.marginTop = "-12%";
            
        }
       

}

)

previousButton.addEventListener('click', () => {

   
    List[itterator].style.display = "none";
    ListForDivOfProjects[itterator].style.display = "none";


    if(itterator==0){
        List[itterator+1].style.display = "flex";
        ListForDivOfProjects[itterator+1].style.display = "flex";
        itterator++;
        mendixPlatform.style.marginLeft = "7%";
    nextButton.style.marginTop = "-56%";
    nextButton.style.marginLeft = "2%";
    previousButton.style.marginTop = "-56%";
    previousButton.style.marginLeft = "25%";
    labelForProjects.style.marginLeft = "13%";
    labelForProjects.style.marginTop = "-8%";
                
    labelForProjects.style.width = "13%";
    labelForPlatform.style.width= "14%";
    labelForPlatform.style.position= "relative";
    labelForPlatform.style.marginTop= "15%";
    labelForPlatform.style.marginLeft= "13%";
    javascriptDiv.style.marginTop = "20%";
    javascriptDiv1.style.marginTop = "20%";
    }
    // else if(itterator >0){     CODE EXAMPLE WHEN YOU DECIDE TO SWITCH
 
    else{
        List[itterator-1].style.display = "flex";
        ListForDivOfProjects[itterator-1].style.display = "flex";
        itterator--;
        mendixPlatform.style.marginTop = "-90%";
                nextButton.style.marginTop = "-94%";
                previousButton.style.marginTop = "-94%";
                labelForProjects.style.marginLeft = "8%";
                labelForProjects.style.width = "9%";
                labelForPlatform.style.width= "9.03%";
                labelForPlatform.style.marginTop= "10%";
                labelForPlatform.style.marginLeft= "8%";
                previousButton.style.marginLeft = "21%";
                labelForProjects.style.marginTop = "-12%";
        
    }
   

}

)
}
