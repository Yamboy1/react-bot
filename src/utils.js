export const htmlDecode = input => {
    var d = document.createElement("div");
    d.innerHTML = input;
    return d.textContent;
}

