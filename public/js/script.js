function changeContent(content) {
    document.getElementById('demo').innerHTML = content;
}

document.getElementById('demoButton').addEventListener('click', function() {
    changeContent("Hi World");
});
