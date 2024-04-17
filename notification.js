fetch(
  "https://api.smartrecruiters.com/v1/companies/PublicisGroupe/postings?custom_field.59510507e4b073b05d32008a=ce66ba16-fee6-4f31-8f11-5004e98c64a4&limit=100&offset=0&country=gb"
)
  .then((response) => response.json())
  .then((data) => {
    const jobs = data.content.slice(0, 3); // Get the first three jobs

    // Create a custom element for notification box
    class NotificationBox extends HTMLElement {
      constructor() {
        super();

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: "closed" });

        // Create notification box container
        const notificationBox = document.createElement("div");
        notificationBox.style.position = "fixed";
        notificationBox.style.bottom = "20px";
        notificationBox.style.left = "20px";
        notificationBox.style.width = "400px";
        notificationBox.style.height = "150px";
        notificationBox.style.backgroundColor = "#ffffff";
        notificationBox.style.padding = "10px";
        notificationBox.style.border = "1px solid #007bff";
        notificationBox.style.display = "flex";
        notificationBox.style.flexDirection = "column";
        notificationBox.style.alignItems = "center";
        notificationBox.style.justifyContent = "center";

        // Create title element
        const titleElement = document.createElement("div");
        titleElement.textContent = "Engineering Openings";
        titleElement.style.fontWeight = "bold";
        titleElement.style.marginBottom = "5px";
        titleElement.style.fontSize = "14px";

        // Append title element to notification box
        notificationBox.appendChild(titleElement);

        // Create job list element
        const jobListElement = document.createElement("div");

        // Append job list element to notification box
        notificationBox.appendChild(jobListElement);

        // Append notification box to shadow root
        shadowRoot.appendChild(notificationBox);

        let currentIndex = 0; // Keep track of the current job index

        function displayJob() {
          const job = jobs[currentIndex];
          const jobTitle = job.name;
          const jobLink = `https://www.epsilon.com/jobs?id=${job.id}`;

          jobListElement.innerHTML = ""; // Clear existing job titles

          const jobLinkElement = document.createElement("a");
          jobLinkElement.href = jobLink;
          jobLinkElement.target = "_blank";
          jobLinkElement.textContent = jobTitle;
          jobLinkElement.style.textDecoration = "none";
          jobLinkElement.style.cursor = "pointer";
          jobLinkElement.style.color = "black";
          jobLinkElement.style.fontWeight = "normal";
          jobLinkElement.style.fontSize = "15px";
          jobListElement.appendChild(jobLinkElement);

          // Increment index, or reset to 0 if it exceeds the length of jobs array
          currentIndex = (currentIndex + 1) % jobs.length;
        }

        // Display the first job immediately
        displayJob();

        // Change job every 3 seconds
        setInterval(displayJob, 3000);
      }
    }

    // Define the custom element
    customElements.define("notification-box", NotificationBox);

    // Create an instance of the custom element and append it to the body
    const notificationElement = document.createElement("notification-box");
    document.body.appendChild(notificationElement);
  })
  .catch((error) => console.error("Error fetching data:", error));
