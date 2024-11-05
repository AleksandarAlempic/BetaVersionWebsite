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

ListForMendixJavaScriptInnerHtml = [mendixPlatform, javascriptPlatform];
let List;

List = [mendixPlatform, javascriptPlatform, javascriptPlatform1]; 
let ListForDivOfProjects;

ListForDivOfProjects = [divForMendixProjects, divForJavaScriptProjects];
let itterator = 0;

nextButton.addEventListener('click', () => {

   
        List[itterator].style.display = "none";
        ListForDivOfProjects[itterator].style.display = "none";


        if(itterator==0){
            List[itterator+1].style.display = "flex";
            ListForDivOfProjects[itterator+1].style.display = "flex";
            itterator++;
            mendixPlatform.style.marginLeft = "7%";
        nextButton.style.marginTop = "-1%";
        nextButton.style.marginLeft = "2%";
        previousButton.style.marginTop = "-1%";
        previousButton.style.marginLeft = "25%";
        labelForProjects.style.marginLeft = "26%";
                    
        labelForProjects.style.width = "27%";
        labelForPlatform.style.width= "29%";
        labelForPlatform.style.position= "relative";
        labelForPlatform.style.marginTop= "32%";
        labelForPlatform.style.marginLeft= "25%";
        javascriptDiv.style.marginTop = "3%";
        }
        // else if(itterator >0){     CODE EXAMPLE WHEN YOU DECIDE TO SWITCH
     
        else{
            List[itterator-1].style.display = "flex";
            ListForDivOfProjects[itterator-1].style.display = "flex";
            itterator--;
            mendixPlatform.style.marginTop = "0%";
                    nextButton.style.marginTop = "-3%";
                    previousButton.style.marginTop = "-3%";
                    labelForProjects.style.marginLeft = "8%";
                    labelForProjects.style.width = "9%";
                    labelForPlatform.style.width= "9.03%";
                    labelForPlatform.style.marginTop= "10%";
                    labelForPlatform.style.marginLeft= "8%";
                    previousButton.style.marginLeft = "5%";
            
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
    nextButton.style.marginTop = "-1%";
    nextButton.style.marginLeft = "2%";
    previousButton.style.marginTop = "-1%";
    previousButton.style.marginLeft = "25%";
    labelForProjects.style.marginLeft = "26%";
                
    labelForProjects.style.width = "27%";
    labelForPlatform.style.width= "29%";
    labelForPlatform.style.position= "relative";
    labelForPlatform.style.marginTop= "32%";
    labelForPlatform.style.marginLeft= "25%";
    javascriptDiv.style.marginTop = "3%";
    }
    // else if(itterator >0){     CODE EXAMPLE WHEN YOU DECIDE TO SWITCH
 
    else{
        List[itterator-1].style.display = "flex";
        ListForDivOfProjects[itterator-1].style.display = "flex";
        itterator--;
        mendixPlatform.style.marginTop = "0%";
                nextButton.style.marginTop = "-3%";
                previousButton.style.marginTop = "-3%";
                labelForProjects.style.marginLeft = "8%";
                labelForProjects.style.width = "9%";
                labelForPlatform.style.width= "9.03%";
                labelForPlatform.style.marginTop= "10%";
                labelForPlatform.style.marginLeft= "8%";
                previousButton.style.marginLeft = "5%";
        
    }
   

}

)
