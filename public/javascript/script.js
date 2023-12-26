const table = JSON.parse(document.querySelector("code").textContent);
document.querySelector("code").remove()
console.log("cringe"+table.length);


async function check(val) {
    const bucketName = 'cloud_proj_blogs';
    const splitName = val.split('.');
    const container = document.getElementById('image-container');

    try {
        const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o`);
        const data = await response.json();

        if (!data || !data.items) {
            console.error('Error fetching data from the bucket.');
            return false;
        }

        for (const item of data.items) {
            let split = item.name.split('.');
            if (split[0] === splitName[0]) {
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Replace 'YOUR_BUCKET_NAME' with your actual GCS bucket name

    const bucketName = 'cloud_proj_blogs';
    const container = document.getElementById('image-container');
    
    for(let i=0;i<table.length;i++){
        // Iterate through the items and display images 
        

        if (check(table[i].topicName)) {
            let img = table[i].topicName + '.jpg';
            const imageUrl = `https://storage.googleapis.com/${bucketName}/${img}`;
            
            
            // Create a container div for each image and its name
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container'); // Add a class for styling if needed

            // Create an <img> element for the image
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;

            // Create an <h2> element for the image name
            const h2Element = document.createElement('h2');
            h2Element.textContent = table[i].topicName; // Assuming item.name contains the image name

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



