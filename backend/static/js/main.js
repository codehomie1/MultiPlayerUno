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
    this.checkUserSignInStatus();
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

  setUserSignedIn(isSignedIn) {
    this.userIsSignedIn = isSignedIn;
    this.fetchNavBar();
  }

  fetchNavBar() {
    const userIsSignedIn = this.isUserSignedIn();

    // Define the navbar content with conditional rendering
    const navBarContent = `
      <h2> UNO Game </h2>
      <ul>
        <li><a href="/">Home</a></li>
        ${
          userIsSignedIn
            ? `<li><a href="/lobby">Lobby</a></li>
               <li><a href="/games/42">Game 42</a></li>
               <li><a href="#" id="logoutButton">Logout</a></li>`
            : `<li><a href="/auth/sign_up">Sign Up</a></li>
               <li><a href="/auth/sign_in">Sign In</a></li>`
        }
      </ul>
    `;

    this.setSidebarContent(navBarContent);

    if (userIsSignedIn) {
      const logoutButton = this.querySelector("#logoutButton");
      if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
          e.preventDefault();
          this.logoutUser();
        });
      }
    }
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

  async checkUserSignInStatus() {
    try {
      const response = await fetch("/auth/status");
      const data = await response.json();
      this.setUserSignedIn(data.isAuthenticated);
    } catch (error) {
      console.error("Error:", error);
      this.setUserSignedIn(false);
    }
  }

  isUserSignedIn() {
    return this.userIsSignedIn;
  }

  logoutUser() {
    // Make a request to the server's logout endpoint
    fetch("/auth/logout", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          // Successfully logged out, update the state and possibly redirect
          this.setUserSignedIn(false);
          window.location.href = "/landing"; // Redirect to a landing page or login page
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
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
