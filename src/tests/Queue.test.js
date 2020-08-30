import React from 'react';
import Queue from '../queue';

test("empty queue has no items", () => {
    const q = new Queue([]);
    expect(q.size()).toBe(0);
});

test("enqueuing item increases queue size by 1", () => {
    const q = new Queue([]);
    q.enqueue(1);
    expect(q.size()).toBe(1);
});

test("dequeuing item decreases queue size by 1", () => {
    const q = new Queue([1]);
    q.dequeue();
    expect(q.size()).toBe(0);
});

test("enqueued item placed at the backmost position", () => {
    const q = new Queue([1,2]);
    q.enqueue(3);

    var item = null;
    while (q.size() >= 1) {
        item = q.dequeue();
    }
    expect(item).toBe(3);
});

test("dequeued item was at the front of the queue", () => {
    const q = new Queue([1,2]);
    var item = q.dequeue();
    expect(item).toBe(1);
});

test("peeking returns front item", () => {
    const q = new Queue([1,2]);
    expect(q.peek()).toBe(1);
});

test("peeking does not remove front item", () => {
    const q = new Queue([1,2]);
    q.peek();
    expect(q.size()).toBe(2);
});