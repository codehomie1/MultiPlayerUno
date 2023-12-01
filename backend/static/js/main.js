class MyHeader extends HTMLElement {
  connectedCallback() {
    // Set initial structure for the header, including a dedicated container for the nav bar content
    this.innerHTML = `
      <button id="sidebarToggle" class="openbtn">&#9776;</button>
      <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn">&times;</a>
        <!-- Sidebar content will be injected here -->
      </div>
      <div id="mainContent">
        <!-- The container for nav bar content -->
        <h1>
          UNO Game
        </h1>
      </div>
    `;
    this.addEventListeners();
    this.fetchNavBar();
  }

  addEventListeners() {
    // Event listeners for the sidebar
    const sidebar = this.querySelector("#mySidebar");
    const sidebarToggle = this.querySelector("#sidebarToggle");

    sidebarToggle.addEventListener("click", () => {
      sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
    });

    const closeBtn = sidebar.querySelector(".closebtn");
    closeBtn.addEventListener("click", () => {
      sidebar.style.width = "0";
    });
  }

  fetchNavBar() {
    const userIsSignedIn = this.isUserSignedIn();
    // Define the navbar content
    const navBarContent = `
      <h2> UNO Game </h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/lobby">Lobby</a></li>
        <li><a href="/games/42">Game 42</a></li>
        ${
          userIsSignedIn
            ? '<li><a href="#" id="logoutButton">Logout</a></li>'
            : '<li><a href="/auth/sign_up">Sign Up</a></li>' +
              '<li><a href="/auth/sign_in">Sign In</a></li>'
        }
      </ul>
    `;

    // Add the logout event listener if the logout button is part of the navbar
    const logoutButton = this.querySelector("#logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.logoutUser();
      });
    }

    var finalNavBar = navBarContent;

    fetch(`/users/currentUserInfo`)
      .then((response) => response.json())
      .then((data) => {
        let finalNavBar = navBarContent; // Initialize with the default navbar
        try {
          console.log("Retrieved userId: " + data.userId);
          if (data.userId == void 0) {
            console.log("Nav bar set for someone not logged in.");
          } else {
          }
          // Call setSidebarContent to update the sidebar with the correct navbar
          this.setSidebarContent(finalNavBar);
        } catch (error) {
          console.error(error);
          console.log(
            "Error, resorting to default nav bar (user not logged in)",
          );
          this.setSidebarContent(navBarContent);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setSidebarContent(navBarContent); // Fallback to not logged in nav bar
      });
  }

  // This method updates the sidebar's HTML content
  setSidebarContent(navContent) {
    const sidebarElement = this.querySelector("#mySidebar");
    sidebarElement.innerHTML = `
        <a href="javascript:void(0)" class="closebtn">&times;</a>
        ${navContent}
      `;
    sidebarElement.querySelector(".closebtn").addEventListener("click", () => {
      this.closeNav(); // Call the closeNav method when the close button is clicked
    });
  }

  closeNav() {
    const sidebar = this.querySelector("#mySidebar");
    sidebar.style.width = "0";
  }

  // This method adds a click event listener to the sidebar toggle button
  addEventListeners() {
    const toggleButton = this.querySelector("#sidebarToggle");
    toggleButton.addEventListener("click", () => {
      const sidebar = this.querySelector("#mySidebar");
      sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
    });
  }

  isUserSignedIn() {
    // Implement your check here
    return false; // Update with actual logic, currently only for testing purposes
  }

  logoutUser() {
    // Still need to implement logout logic
    console.log("Logging out...");
    this.render();
  }
}

customElements.define("my-header", MyHeader);

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <footer class="main-footer">
              <p>Copyright &copy; 2023 Team C</p>
          </footer>
      `;
  }
}

customElements.define("my-footer", MyFooter);

document.addEventListener("DOMContentLoaded", () => {
  const findGameButton = document.getElementById("findGameButton");
  if (findGameButton) {
    findGameButton.addEventListener("click", () => {
      console.log("Finding a game...");
    });
  }
});
