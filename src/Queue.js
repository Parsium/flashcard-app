class Queue {
    constructor(items) {
        this._items = new Array(...items);
    }
    enqueue(item) {
        this._items.push(item);  
    }
    dequeue() {
        return this._items.shift();
    }
    peek() {
        return this._items[0];
    }
    size() {
        return this._items.length;
    }
    toString() {
        let output = "";
        for (var item of this._items) {
            output = output + item + " ";
        }
        return output;
    }
}