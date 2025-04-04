async function loadTSV(filePath) {
    try {
        const response = await fetch(filePath);
        const text = await response.text();

        // Use parseTSV to handle the parsing
        const data = parseTSV(text);

        return data;
    } catch (error) {
        console.error("Error loading TSV file:", error);
        return [];
    }
}

async function displayData() {
    const data = await loadTSV("../data/faqs.tsv"); // Path to your TSV file

    console.log("Parsed Data:", data); // Debugging step to see the structure of data

    const container = document.getElementById("output");
    const title = document.getElementById("category-title");
    const buttons = document.getElementById("category-buttons").getElementsByTagName("button");

    if (!container) {
        console.error("No element with ID 'output' found.");
        return;
    }

    // Group data by category
    const categorizedData = groupByCategory(data);

    if (Object.keys(categorizedData).length === 0) {
        console.log("No categorized data found.");
        return;
    }

    // Create a div for each category's Q&A and hide initially
    Object.keys(categorizedData).forEach(categoryId => {
        const categoryDiv = document.createElement("div");
        categoryDiv.id = `category-${categoryId}`;
        categoryDiv.classList.add("category-content");
        categoryDiv.style.display = "none"; // Initially hide each category's content

        const categoryData = categorizedData[categoryId];
        categoryData.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `<p><strong>${item.Question}</strong><br>${item["Answer"]}</p><br>`;
            categoryDiv.appendChild(div);
        });

        container.appendChild(categoryDiv);
    });

    // Add event listeners to category buttons
    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            const categoryId = button.getAttribute("data-category");
            console.log(categoryId);
            title.innerText = categoryId;


            // Toggle visibility for the selected category
            Object.keys(categorizedData).forEach(catId => {
                const categoryDiv = document.getElementById(`category-${catId}`);
                console.log(categoryDiv);
                categoryDiv.style.display = catId === categoryId ? "block" : "none";
            });
        });
    });
}

// Group data by category
function groupByCategory(data) {
    return data.reduce((acc, item) => {
        const category = item.Category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});
}

// Function to parse TSV text into an array of objects (same as before)
function parseTSV(tsvText) {
    const lines = tsvText.split("\n").map(line => line.trim());  // Trim whitespace
    const headers = lines[0].split("\t").map(header => header.replace(/\r/g, ""));  // Remove \r
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split("\t");
        if (values.length === headers.length) {
            let entry = {};
            headers.forEach((header, index) => {
                entry[header] = values[index];
            });
            data.push(entry);
        }
    }
    return data;
}

// Call the function once the page loads
document.addEventListener("DOMContentLoaded", displayData);
