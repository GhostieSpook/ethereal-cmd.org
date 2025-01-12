let auth0 = null;

async function configureClient() {
    auth0 = await createAuth0Client({
        domain: "ethereal-cmd.org",
        client_id: "dTyeFWsbMPv1AO24B1Iz6gF5Tz3O8GDa",
        redirect_uri: window.location.origin
    });
}

async function login() {
    await auth0.loginWithRedirect();
}

async function logout() {
    auth0.logout({ returnTo: window.location.origin });
}

async function handleAuthCallback() {
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }
}

async function checkAuth() {
    const isAuthenticated = await auth0.isAuthenticated();

    // Update UI based on authentication status
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const userProfile = document.getElementById("user-profile");

    if (isAuthenticated) {
        const user = await auth0.getUser();
        userProfile.textContent = `Welcome, ${user.name}`;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        userProfile.textContent = "";
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await configureClient();
    await handleAuthCallback();
    await checkAuth();
});
