async function fetchBloggerFeed() {
    const feedUrl = "https://script.google.com/macros/s/AKfycbxQ0rdJkV7cXsLiDG_PLo9hvReXtmVEzilmKPbTQzbXlIPyIl6tjcAWFlbbuXjWDndl/exec";
    const container = document.getElementById("blog-posts"); // Your blog posts container

    try {
        const response = await fetch(feedUrl);
        const data = await response.json();

        if (data && data.feed && data.feed.entry) {
            const posts = data.feed.entry;
            container.innerHTML = "";

            posts.forEach((post) => {
                const title = post.title.$t;
                const link = post.link.find((l) => l.rel === "alternate").href;
                const publishedDate = new Date(post.published.$t).toLocaleDateString();
                const contentSnippet = post.content.$t.substring(0, 200);

                const postElement = `
                    <div class="blog-post">
                        <h3><a href="${link}" target="_blank">${title}</a></h3>
                        <em>${publishedDate}</em>
                        <p>${contentSnippet}...</p>
                    </div>
                `;
                container.innerHTML += postElement;
            });
        } else {
            container.innerHTML = "<p>No blog posts available.</p>";
        }
    } catch (error) {
        console.error("Error fetching Blogger feed:", error);
        container.innerHTML = "<p>Failed to load blog posts. Please try again later.</p>";
    }
}

document.addEventListener("DOMContentLoaded", fetchBloggerFeed);
