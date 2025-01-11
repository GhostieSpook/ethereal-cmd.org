document.addEventListener("DOMContentLoaded", async () => {
    const eventsContainer = document.getElementById("events-container");
    const apiKey = "AIzaSyCNB1XuTJaqr5WCr-gaoM0XNN8CAEtntDg"; // Replace with your Google API Key
    const calendarId = "b74cac0dec3263590561ab58ffb0c64e0308d8b66ec79c58f6558023fff4610f@group.calendar.google.com"; // Replace with your Google Calendar ID
    const maxResults = 5; // Number of events to fetch
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&maxResults=${maxResults}&orderBy=startTime&singleEvents=true`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // Clear placeholder text
      eventsContainer.innerHTML = "";
  
      if (data.items && data.items.length > 0) {
        // Loop through the events and display them
        data.items.forEach((event) => {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
  
          const startDate = event.start ? new Date(event.start.dateTime || event.start.date).toLocaleString() : "No Start Date";
          const endDate = event.end && event.end.dateTime ? new Date(event.end.dateTime).toLocaleString() : "No End Date";
  
          eventDiv.innerHTML = `
            <h3>${event.summary || "No Title"}</h3>
            <p><strong>Start:</strong> ${startDate}</p>
            ${endDate ? `<p><strong>End:</strong> ${endDate}</p>` : ""}
            <p>${event.location || "No Location"}</p>
            <p>${event.description || "No Description"}</p>
          `;
  
          eventsContainer.appendChild(eventDiv);
        });
      } else {
        eventsContainer.innerHTML = "<p>No upcoming events found.</p>";
      }
    } catch (error) {
      console.error("Error fetching events:", error.message, error);
      eventsContainer.innerHTML = "<p>Failed to load events. Please try again later.</p>";
    }
  });
  