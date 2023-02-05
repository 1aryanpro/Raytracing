
class Vector {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    mult(n) {
        return new Vector(this.x * n, this.y * n, this.z * n);
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    div(n) {
        return new Vector(this.x / n, this.y / n, this.z / n);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    mag() {
        return sqrt(this.dot(this));
    }
}

var points = [
    [2, 2, -2],
    [2, 2, 2],
    [2, -2, -2],
    [2, -2, 2],
    [-2, 2, -2],
    [-2, 2, 2],
    [-2, -2, -2],
    [-2, -2, 2],
];

var apoints = [...points.map(p => [...p])];

var lines = [
    [0, 1],
    [1, 3],
    [2, 3],
    [0, 2],
    [4, 5],
    [5, 7],
    [6, 7],
    [4, 6],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
];

function findProj(pos, focal) {
    var proj = [];

    apoints.forEach(p => {
        var v = new Vector(...p).sub(pos);
        v = v.div(v.z).mult(focal)
        v.y *= -1;
        v = v.mult(100).add(offset);
        proj.push(v);
    });

    return proj;
}

var pos, focal, viewScale, offset;
function setup() {
    createCanvas(600, 600, P2D);
    background(0);
    pos = new Vector(0, 0, - 4);
    focal = 2;
    viewScale = 100;
    offset = new Vector(width / 2, height / 2);
}


function draw() {
    background(0);
    var proj = findProj(pos, focal);

    apoints = apoints.map((ap, i) => {
        var [ax, ay, az] = ap;
        var [px, py, pz] = points[i];

        return [lerp(ax, px, 0.1), lerp(ay, py, 0.1), lerp(az, pz, 0.1)];
    });

    noStroke();
    proj.forEach(p => {
        // var dist = p.mag();
        // fill(255 * dist/width, 255, 255);
        circle(p.x, p.y, 10);
    })

    stroke(255);
    strokeWeight(2);
    lines.forEach(l => {
        var a = proj[l[0]];
        var b = proj[l[1]];
        line(a.x, a.y, b.x, b.y);
    });
}

function keyPressed() {
    var t = 0.1;
    var s = 0.1;
    switch (keyCode) {
        case 87:
            points = points.map(p => {
                var [x, y, z] = p;
                y += s;
                return [x, y, z];
            });
            break;
        case 65:
            points = points.map(p => {
                var [x, y, z] = p;
                x -= s;
                return [x, y, z];
            });
            break;
        case 83:
            points = points.map(p => {
                var [x, y, z] = p;
                y -= s;
                return [x, y, z];
            });
            break;
        case 68:
            points = points.map(p => {
                var [x, y, z] = p;
                x += s;
                return [x, y, z];
            });
            break;
        case 39:
            points = points.map(p => {
                [a, c, b] = p;
                a = cos(t) * a - sin(t) * b;
                b = sin(t) * a + cos(t) * b;
                return [a, c, b];
            });
            break;
        case 37:
            points = points.map(p => {
                [b, c, a] = p;
                a = cos(t) * a - sin(t) * b;
                b = sin(t) * a + cos(t) * b;
                return [b, c, a];
            });
            break;
        case 38:
            points = points.map(p => {
                [c, a, b] = p;
                a = cos(t) * a - sin(t) * b;
                b = sin(t) * a + cos(t) * b;
                return [c, a, b];
            });
            break;
        case 40:
            points = points.map(p => {
                [c, b, a] = p;
                a = cos(t) * a - sin(t) * b;
                b = sin(t) * a + cos(t) * b;
                return [c, b, a];
            });
            break;

    }
}
