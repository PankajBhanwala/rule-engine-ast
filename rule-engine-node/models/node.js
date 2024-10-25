class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;
        this.value = value;
        this.left = left;
        this.right = right;
    }

    toDict() {
        return {
            type: this.type,
            value: this.value,
            left: this.left ? this.left.toDict() : null,
            right: this.right ? this.right.toDict() : null
        };
    }

    static fromDict(data) {
        if (!data) return null;
        const left = Node.fromDict(data.left);
        const right = Node.fromDict(data.right);
        return new Node(data.type, data.value, left, right);
    }
}

module.exports = Node;
