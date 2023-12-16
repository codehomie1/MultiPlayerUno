class MyHeader extends HTMLElement {
  connectedCallback() {
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

  setSidebarContent(navContent) {
    const sidebarElement = this.querySelector("#mySidebar");
    sidebarElement.innerHTML = `
        <a href="javascript:void(0)" class="closebtn">&times;</a>
        ${navContent}
      `;
    sidebarElement.querySelector(".closebtn").addEventListener("click", () => {
      this.closeNav();
    });
  }

  closeNav() {
    const sidebar = this.querySelector("#mySidebar");
    sidebar.style.width = "0";
  }

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
    fetch("/auth/logout", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          this.setUserSignedIn(false);
          window.location.href = "/landing";
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

function redirectToLobby() {
  window.location.href = "/lobby";
}

async function checkLogin() {
  document.querySelector(".error-message").innerHTML = "";
  let msgElement = document.querySelector(".message");
  msgElement.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("/auth/status");
    const data = await response.json();

    const isAuth = data.isAuthenticated;
    if (!isAuth) {
      let errorElement = document.querySelector(".error-message");
      msgElement.innerHTML = "";
      let errorMessageElement = document.createElement("p");
      errorMessageElement.textContent = "Sign in failed. Please try again.";
      errorElement.appendChild(errorMessageElement);

      setTimeout(() => {
        errorElement.innerHTML = "";
      }, 3000);
    }
  } catch (error) {
    console.error("Error fetching authentication status:", error);
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
