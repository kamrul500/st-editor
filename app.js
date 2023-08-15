
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
    var toolbarContent = `
        
            <div id="toolbar">
             <button onclick="execCommand('bold')"><i class="fa fa-bold"></i></button>
        <button onclick="execCommand('italic')"><i class="fa fa-italic"></i></button>
        <button onclick="execCommand('underline')"><i class="fa fa-underline"></i></button>
        <button onclick="execCommand('insertUnorderedList')"><i class="fa fa-list"></i></button>
        <button onclick="execCommand('insertOrderedList')"><i class="fa fa-list-ol"></i></button>
        <button onclick="execCommand('justifyLeft')"><div><i class="fa fa-align-left"></i></div></button>
        <button onclick="execCommand('justifyCenter')"><div><i class="fa fa-align-center"></i></div></button>
        <button onclick="execCommand('justifyRight')"><div><i class="fa fa-align-right"></i></div></button>
        <button onclick="execCommand('justifyFull')"><div><i class="fa fa-align-justify"></i></div></button>
        <button onclick="applyHeading('h1')">H1</button>
        <button onclick="applyHeading('h2')">H2</button>
        <button onclick="applyHeading('h3')">H3</button>
        <button onclick="applyHeading('h4')">H4</button>
        <button onclick="applyHeading('h5')">H5</button>
        <button onclick="applyHeading('h6')">H6</button>
        <button onclick="applyHeading('p')">p</button>
        <button onclick="insertLink()"><i class="fa fa-link"></i></button> 
        <button onclick="clearEditor()">Clear</button>
        <button onclick="toggleView()"><i class="fa fa-code"></i></button>
       
        </div>
        <div id="editor-container">
            <div id="editor" contenteditable="true"></div>
            <div id="html-view" contenteditable="true"></div>
        </div>
    `;

    // Find the target element by its ID and insert the toolbar content
    $("#st-editor").html(toolbarContent);
});
