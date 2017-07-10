export const shuffle = (array) => {
    const a = array.slice();
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
};

export const url = {
    parse: (query) => {
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }
};
url.params = url.parse(document.location.search.substr(1));

/**
 * 
 * @param {*} any 
 * @param {HTMLElement} doc root
 * @return {Array<Element>}
 */
export const find = (any, doc = document) => {
    return typeof any !== 'string' ? Array.prototype.slice.call(any) :
        any.indexOf("<") === 0 ? html(any) : Array.prototype.slice.call(doc.querySelectorAll(any));
};

/**
 * 
 * @param {String} string html
 * @return {Array<Element>}
 */
export const html = (string) => {
    let div = document.createElement('div');
    div.innerHTML = string;
    return Array.prototype.slice.call(div.childNodes);
};