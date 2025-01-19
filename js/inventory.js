const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIWrTUegBg8MLszZasF6qH5qD7UxjqQqGSe9iKAkylqPLQHdxnydaY0yMpSuE7e4oMik9dZSqsmHij/pub?gid=0&single=true&output=csv";

async function fetchInventoryData() {
  const tableBody = document.querySelector("#inventory-table tbody");

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const csvData = await response.text();
    const rows = csvData.split("\n").slice(1); // Skip the header row

    tableBody.innerHTML = ""; // Clear existing rows

    rows.forEach((row) => {
      if (row.trim()) {
        // Correctly parse rows to handle quotes and commas
        const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((col) =>
          col.replace(/^"|"$/g, "").trim()
        );

        if (columns.length >= 7) { // Adjusted to ensure enough columns
          const itemId = columns[0] || "N/A";
          const itemName = columns[1] || "N/A";
          const variant = columns[2] || "Default"; // Use "Default" if empty
          const type = columns[3] || "N/A";
          const price = columns[4] || "N/A";
          const stock = columns[5] || "N/A";
          const status = columns[6] || "N/A";

          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${itemId}</td>
            <td>${itemName}</td>
            <td>${variant || "Default"}</td>
            <td>${type}</td>
            <td>${price}</td>
            <td>${stock !== "" ? stock : "N/A"}</td>
            <td style="color: ${
              status === "Out of Stock" ? "red" : status === "N/A" ? "gray" : "green"
            };">
              ${status}
            </td>
          `;
          tableBody.appendChild(tr);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    tableBody.innerHTML = `<tr><td colspan="7">Failed to load data.</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", fetchInventoryData);
