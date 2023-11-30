const table = JSON.parse(document.querySelector("code").textContent);
document.querySelector("code").remove()
console.log("cringe"+table.length);

function check(topicarray,name){
    console.log(name);
    const splitName = name.split('.');
    console.log(splitName);
    for(let i=0;i<table.length;i++){

        if(table[i].topicName==splitName[0]){
            return true;
        }
    }
    return false;
}



document.addEventListener("DOMContentLoaded", function () {
    // Replace 'YOUR_BUCKET_NAME' with your actual GCS bucket name

    const bucketName = 'cloud_proj_blog';
    const container = document.getElementById('image-container');

    // Fetch the list of objects in the bucket
    fetch('https://storage.googleapis.com/storage/v1/b/' + bucketName + '/o')
        .then(response => response.json())
        .then(data => {
            for(let i=0;i<table.length;i++){
                            // Iterate through the items and display images
                
          
                if (data.items[i].contentType.startsWith('image/') && check(table.topicName, data.items[i].name)) {
                    const imageUrl = `https://storage.googleapis.com/${bucketName}/${data.items[i].name}`;
                    
         
                    // Create a container div for each image and its name
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container'); // Add a class for styling if needed

                    // Create an <img> element for the image
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;

                    // Create an <h2> element for the image name
                    const h2Element = document.createElement('h2');
                    h2Element.textContent = data.items[i].name; // Assuming item.name contains the image name

                    h2Element.addEventListener('click', () => {
                        // Navigate to new_page.html with query parameters for the content
                       
                        window.location.href = 'new_page.html?index=' + table[i].id;
                    });

                    // Append the <img> and <h2> elements to the container div
                    imageContainer.appendChild(imgElement);
                    imageContainer.appendChild(h2Element);

                    // Append the container div to the main container
                    container.appendChild(imageContainer);

                }
            
            }

        })
        .catch(error => console.error('Error fetching images:', error));
});


