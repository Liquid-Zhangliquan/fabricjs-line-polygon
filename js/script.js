var min = 99;
var max = 999999;
var polygonMode = true;
var pointArray = new Array();
var lineArray = new Array();
var activeLine;
var activeShape = false;
var canvas;
var task;
$(window).load(function () {
    prototypefabric.initCanvas();
    $('#create-polygon').click(function () {
        prototypefabric.polygon.drawPolygon();
    });
});
var prototypefabric = new function () {
    this.initCanvas = function () {
        canvas = window._canvas = new fabric.Canvas('c');
        canvas.setWidth($(window).width());
        canvas.setHeight($(window).height() - $('#nav-bar').height());
        //canvas.selection = false;

        canvas.on('mouse:down', function (options) {
            if (options.target && options.target.id == pointArray[0].id) {
                prototypefabric.polygon.generatePolygon(pointArray);
            }
            if (polygonMode) {
                prototypefabric.polygon.addPoint(options);
            }
        });
        canvas.on('mouse:up', function (options) {

        });
        canvas.on('mouse:move', function (options) {
            if (activeLine && activeLine.class == "line") {
                var pointer = canvas.getPointer(options.e);
                activeLine.set({ x2: pointer.x, y2: pointer.y });

                var points = activeShape.get("points");
                points[pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y
                }
                activeShape.set({
                    points: points
                });
                canvas.renderAll();
            }
            canvas.renderAll();
        });
    };
};

var LineHld = function (e) {
    canvas.hoverCursor = 'pointer';
}

var RemoveLineHld = function (e) {

}


var LinePop = function (e) {
    var layerhandle = layer.open({
        type: 2,
        title: '修改线段样式',
        content: 'editLinePop.html',
        btn: ["应用", "取消"],
        btn1: function (index, layero) {
            var body = layer.getChildFrame('body', index);//通过该对象可以获取iframe中的dom元素
            var w = $(layero).find("iframe")[0].contentWindow;//通过该对象可以获取iframe中的变量，调用iframe中的方法
            var opt = w.getOption();//调用iframe中的方法
            lineEdit(e, opt)
            layer.close(layerhandle)
        },
        btn2: function (index, layero) {
            layer.close(layerhandle)
        },
        canvel: function (index, layero) {
            layer.close(layerhandle)
        },
    })
}

function lineEdit(e, opt) {
    var _line = e.target;
    _line.setColor(opt.color);
    _line.setStroke(opt.color);
    _line.setStrokeWidth(opt.width);
    opt.IsDottedLine === "dottedling" ? _line.setStrokeDashArray([4, 6]) : _line.setStrokeDashArray([0, 0]);
}
