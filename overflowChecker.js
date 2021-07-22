
var overflowArr = new Array();
overflowCheck(document.body);
console.log(overflowArr);

function overflowCheck(parent = "") {
    var parentDim = getRectDimensions(parent)
    var childElems = parent.childNodes;

    for (let i = 0; i < childElems.length; i++) {
        var childDim = getRectDimensions(childElems[i])

        if (childDim.width != 0 || childDim.height != 0) {
            if (parentDim.left > childDim.left || parentDim.right < childDim.right || parentDim.top > childDim.top || parentDim.bottom < childDim.bottom) {
                overflowArr.push(
                    {
                        isOverflown: true,
                        parent: parent,
                        element: childElems[i],
                    })
            }

            if (childElems[i].hasChildNodes) {
                overflowCheck(childElems[i])
            }
        }
    }
}

function getRectDimensions(element) {
    const range = document.createRange();
    range.selectNode(element);
    if (range.getBoundingClientRect) {
        var rect = range.getBoundingClientRect();
        if (rect) {
            return rect
        }
    }
}