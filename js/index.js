document.addEventListener("DOMContentLoaded", function () {
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

    githubForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = searchInput.value;

        if (username) {
            // Clear previous results
            userList.innerHTML = "";
            reposList.innerHTML = "";

            // Make a request to the GitHub User Search Endpoint
            fetch(`https://api.github.com/search/users?q=${username}`, {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // Display user information in the user list
                    data.items.forEach((user) => {
                        const userItem = document.createElement("li");
                        userItem.innerHTML = `
                            <a href="${user.html_url}" target="_blank">
                                <img src="${user.avatar_url}" alt="${user.login}">
                                <h3>${user.login}</h3>
                            </a>
                        `;
                        userList.appendChild(userItem);

                        // Add a click event to fetch repositories
                        userItem.addEventListener("click", function () {
                            fetchUserRepos(user.login);
                        });
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    });

    function fetchUserRepos(username) {
        // Make a request to the User Repos Endpoint
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Display user repositories in the repos list
                reposList.innerHTML = "";
                data.forEach((repo) => {
                    const repoItem = document.createElement("li");
                    repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                    reposList.appendChild(repoItem);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
});
