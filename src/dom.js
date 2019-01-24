import ReactDOM from 'react-dom'
import { JSDOM } from 'jsdom'

const dom = new JSDOM(`
    <!doctype html>
    <html>
        <body>
            <div id="root"></div>
        </body>
    </html>
`);

global.window = dom.window;
global.document = window.document;

export const render = (component, id) => {
    const element = document.createElement("div");
    element.setAttribute("id", id);

    const componentRoot = document.querySelector("#root").appendChild(element);
    ReactDOM.render(component, componentRoot);
}