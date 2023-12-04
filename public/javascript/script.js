
    async function listBucketObjects(name) {
        const bucketName = 'cloud_proj_blog';

        try {
            const response = await fetch(`https://www.googleapis.com/storage/v1/b/${bucketName}/o`);
            if (!response.ok) {
                throw new Error(`Failed to list bucket objects. Status: ${response.status}`);
            }

            const data = await response.json();
            const photoNames = data.items.map(item => item.name);

            console.log(`Bucket Name: ${bucketName}`);
            console.log("Photo Names:");

            for (const [index, photo] of photoNames.entries()) {
                console.log(`  ${index + 1}. ${photo}`);
                let temp = photo.split('.');
                if (temp[0] === name) {
                    console.log(name, temp[0]);
                    return true;
                }
            }

            return false;
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
            return false;
        }
    }

    document.addEventListener("DOMContentLoaded", async function () {
        const table = JSON.parse(document.querySelector("code").textContent);
        document.querySelector("code").remove();
        console.log("cringe" + table.length);

        const container = document.getElementById('image-container');
        const bucketName = 'cloud_proj_blog';

        for (let i = 0; i < table.length; i++) {
            try {
                const existsInBucket = await listBucketObjects(table[i].topicName);

                if (existsInBucket) {
                    let topic = table[i].topicName + '.jpg';
                    let imageUrl = `https://storage.googleapis.com/${bucketName}/${topic}`;

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
            } catch (error) {
                console.error(`An error occurred: ${error.message}`);
            }
        }
    });

