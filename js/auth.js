let auth0 = null;

window.onload = async () => {
    auth0 = await createAuth0Client({
        domain: "dev-2mx1gr7ts6d14aio.us.auth0.com",
        client_id: "dTyeFWsbMPv1AO24B1Iz6gF5Tz3O8GDa",
    });

    console.log("Auth0 initialized:", auth0); // Debug message

    const isAuthenticated = await auth0.isAuthenticated();
    const loginButton = document.getElementById("login-btn");
    const logoutButton = document.getElementById("logout-btn");

    if (isAuthenticated) {
        // User is logged in
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
        const user = await auth0.getUser();
        document.getElementById("user-profile").textContent = `Welcome, ${user.name}`;
    } else {
        // User is logged out
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
    }
};

// Login function
async function login() {
    try {
        await auth0.loginWithRedirect({
            redirect_uri: window.location.origin,
        });
    } catch (err) {
        console.error("Login failed", err);
    }
}

async function logout() {
    try {
        await auth0.logout({
            returnTo: window.location.origin,
        });
    } catch (err) {
        console.error("Logout failed", err);
    }
}


auth0
  .getIdTokenClaims()
  .then((claims) => console.log("Auth0 Initialized: ", claims))
  .catch((err) => console.error("Error initializing Auth0: ", err));
