const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIWrTUegBg8MLszZasF6qH5qD7UxjqQqGSe9iKAkylqPLQHdxnydaY0yMpSuE7e4oMik9dZSqsmHij/pub?gid=0&single=true&output=csv";

async function fetchInventoryData() {
  const inStockTable = document.querySelector("#in-stock tbody");
  const lowStockTable = document.querySelector("#low-stock tbody");
  const noStockTable = document.querySelector("#no-stock tbody");

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const csvData = await response.text();
    const rows = csvData.split("\n").slice(1); // Skip the header row

    // Clear existing rows
    inStockTable.innerHTML = "";
    lowStockTable.innerHTML = "";
    noStockTable.innerHTML = "";

    rows.forEach((row) => {
      if (row.trim()) {
        // Properly handle commas in CSV values using regex
        const columns = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g).map((col) =>
          col.replace(/^"|"$/g, "").trim()
        );

        const itemName = columns[0] || "N/A";
        const variant = columns[1] || "Default";
        const type = columns[2] || "N/A";
        const price = columns[3] || "N/A";
        let stock = columns[4] || "0";
        const status = columns[5] || "N/A";

        // Convert stock to integer
        stock = parseInt(stock, 10);

        // Create the table row
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${itemName}</td>
            <td>${variant}</td>
            <td>${type}</td>
            <td>${price}</td>
            <td>${stock}</td>
            <td style="color: ${status.toLowerCase() === "out of stock"
            ? "red"
            : status.toLowerCase() === "in stock"
              ? "green"
              : "gray"
          };">
            ${status}
          </td>
        `;

        // Categorize and append to the appropriate table
        if (stock >= 10) {
          inStockTable.appendChild(tr);
        } else if (stock > 0 && stock < 10) {
          lowStockTable.appendChild(tr);
        } else {
          noStockTable.appendChild(tr);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    inStockTable.innerHTML = `<tr><td colspan="6">Failed to load data.</td></tr>`;
    lowStockTable.innerHTML = `<tr><td colspan="6">Failed to load data.</td></tr>`;
    noStockTable.innerHTML = `<tr><td colspan="6">Failed to load data.</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", fetchInventoryData);
