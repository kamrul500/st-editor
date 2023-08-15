
let htmlView = false;
function execCommand(command, value = null) {
    document.execCommand(command, false, value);
}

function applyHeading(heading) {
    if (htmlView) return; // Do not apply heading in HTML view
    document.execCommand('formatBlock', false, '<' + heading + '>');
}



function insertLink() {
    const url = prompt('Enter a URL:');
    if (url) {
        execCommand('createLink', url);
    }
}


function formatAsCode() {

    const code = prompt('Enter code:');
    if (code) {
        const pre = document.createElement('pre');
        pre.textContent = code;
        document.getSelection().getRangeAt(0).insertNode(pre);
    }
}

function clearEditor() {
    const editor = document.getElementById('editor');
    editor.innerHTML = '';
}

function toggleView() {
    const editor = document.getElementById('editor');
    const htmlViewContainer = document.getElementById('html-view');


    if (htmlView) {
        // Switch back to WYSIWYG view
        editor.style.display = 'block';
        htmlViewContainer.style.display = 'none';
        editor.innerHTML = htmlViewContainer.textContent;
    } else {
        // Switch to HTML view
        editor.style.display = 'none';
        htmlViewContainer.style.display = 'block';

        // Format the HTML code with line breaks after each tag
        const formattedHtml = editor.innerHTML.replace(/</g, '\n<');
        htmlViewContainer.textContent = formattedHtml;
    }

    htmlView = !htmlView;
}
$(document).ready(function () {
    // Create the toolbar HTML
    var toolbarHtml = `
        <div id="toolbar">
             <button onclick="execCommand('bold')"><b>B</b></button>
        <button onclick="execCommand('italic')"><i>I</i></button>
        <button onclick="execCommand('underline')"><u>U</u></button>
        <button onclick="execCommand('insertUnorderedList')">&#x2022;</button>
        <button onclick="execCommand('insertOrderedList')">&#35;</button>
        <button onclick="execCommand('justifyLeft')"><div>&#x21e4;</div></button>
        <button onclick="execCommand('justifyCenter')"><div>&#x21e5;</div></button>
        <button onclick="execCommand('justifyRight')"><div>&#x21e2;</div></button>
        <button onclick="execCommand('justifyFull')"><div>&#x21e1;</div></button>
        <button onclick="applyHeading('h1')">H1</button>
        <button onclick="applyHeading('h2')">H2</button>
        <button onclick="applyHeading('h3')">H3</button>
        <button onclick="applyHeading('h4')">H4</button>
        <button onclick="applyHeading('h5')">H5</button>
        <button onclick="applyHeading('h6')">H6</button>
        <button onclick="insertLink()">Link</button>
        <button onclick="formatAsCode()">Code</button>
        <button onclick="clearEditor()">Clear</button>
        <button onclick="toggleView()">Toggle HTML View</button>
        </div>
    `;

    // Find the target element by its ID and append the toolbar
    $("#targetElement").html(toolbarHtml);
});
