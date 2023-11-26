class MyHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const userIsSignedIn = this.isUserSignedIn();
    this.innerHTML = `
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/lobby">Lobby</a></li>
        <li><a href="/games/42">Game 42</a></li>
        ${
          userIsSignedIn
            ? `<li><a href="#" id="logoutButton">Logout</a></li>`
            : `<li><a href="/auth/sign_up">Sign Up</a></li>
           <li><a href="/auth/sign_in">Sign In</a></li>`
        }
      </ul>
    `;

    const logoutButton = this.querySelector("#logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.logoutUser();
      });
    }
  }

  isUserSignedIn() {
    // Implement your check here
    return false; // Update with actual logic, currently only for testing purposes
  }

  logoutUser() {
    // Still need to implement logout logic
    console.log("Logging out...");

    // On successful logout, update the header
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

// NEEDS TO BE IMPLEMENTED FULLY
// NOT COMPLETE
// Event listener for 'Find Game' button (if it exists)
document.addEventListener("DOMContentLoaded", () => {
  const findGameButton = document.getElementById("findGameButton");
  if (findGameButton) {
    findGameButton.addEventListener("click", () => {
      // Implement logic for finding a game
      console.log("Finding a game...");
    });
  }
});
