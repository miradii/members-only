const form = document.querySelector("form");
const storyError = document.querySelector("#story-error");
const topicError = document.querySelector("#topic-error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    storyError.textContent = "";
    topicError.textContent = "";

    //get the values
    const story = form.story.value;
    const topic = form.topic.value;
    try {
        const res = await fetch("/story", {
            method: "POST",
            body: JSON.stringify({
                story,
                topic,
            }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.errors) {
            console.log(data.errors);
            topicError.textContent = data.errors.topic;
            storyError.textContent = data.errors.story;
        }
        if (data.story) {
            console.log(story);
            location.assign("/");
        }
    } catch (error) {
        console.log(error);
    }
});
