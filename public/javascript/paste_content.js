
let notes = [];
async function load_notes(){const response = await fetch('/notes?raw=true');
notes = await response.json();
console.log(notes);

for(let i=0;i<notes.length;i++){
    if(notes[i].id==indexValue){
        
        document.getElementById('title').textContent = notes[i].topicHeading;
        document.getElementById('content').textContent = notes[i].topicContent;
        
        var imageName = notes[i].topicName ;
        const imageNames = [imageName+".png" , imageName +".jpg"];
        const bucketName = 'cloud_proj_blog';
        const imageUrl = `https://storage.googleapis.com/${bucketName}/${imageName}`;
        const imageElement = document.getElementById('imageDisplay');
        


        for (const imageName of imageNames) {
            const imageUrl = `https://storage.googleapis.com/${bucketName}/${imageName}`;
            
            // Attempt to load the image
            const img = new Image();
            img.onload = function() {
              // Image loaded successfully, set the 'src' attribute
              imageElement.src = imageUrl;
            };
            img.onerror = function() {
              // Image not found, try the next one
              if (imageName === imageNames[imageNames.length - 1]) {
                console.error('No valid image found.');
              }
            };
            img.src = imageUrl;
          }
        
          
        

        
    }
}

}
load_notes();




function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g,"\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if(!results) return null;
    if(!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g," "));
}

// Get the value of the "index" parameter from the URL
var indexValue = getParameterByName('index');


//document.getElementById('result').innerHTML = indexValue;


