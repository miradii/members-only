// eslint-disable-next-line no-unused-vars
async function deleteStory(id) {
    try {
        await fetch(`/story/${id}`, {
            method: "delete",
        });

        location.assign("/");
    } catch (error) {
        console.log(error);
    }
}
