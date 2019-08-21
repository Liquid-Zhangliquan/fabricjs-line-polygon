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


var linePop = function (e) {
    // var content = getContent(e);
    // var layerhandle = layer.open({
    //     title: '修改线段样式',
    //     content: $('.line-pop'),
    //     btn: ["应用", "取消"],
    //     btn1: function (index, layero) {
    //         lineEdit(e)
    //         layer.close(layerhandle)
    //     },
    //     btn2: function (index, layero) {
    //         layer.close(layerhandle)
    //     },
    //     canvel: function (index, layero) {
    //         layer.close(layerhandle)
    //     },
    // })
    if (!task) {
        var layerhandle = layer.open({
            title: '修改线段样式',
            content: $('.line-pop'),
            btn: ["应用", "取消"],
            btn1: function (index, layero) {
                lineEdit(e)
                layer.close(layerhandle)
            },
            btn2: function (index, layero) {
                layer.close(layerhandle)
            },
            canvel: function (index, layero) {
                layer.close(layerhandle)
            },
        })
        task = 1
    } else {
        var layerhandle = layer.open({
            type: 1,
            title: '修改线段样式',
            content: $('.line-pop'),
            btn: ["应用", "取消"],
            btn1: function (index, layero) {
                lineEdit(e)
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

}

function getContent(e) {
    var _line = e.target;
    var color = _line.fill;
    var width = _line.strokeWidth;
    var jscolor = "jscolor {valueElement:null,value:'" + color + "'}";
    var content = '<div>'
    content += '<div class="form-item">'
    content += '<div class="form-label">宽度</div>'
    content += '<input class="form-input" type="text" id="line_width" value="' + width + '">'
    content += '</div>'
    content += '<div class="form-item">'
    content += '<div class="form-label">颜色</div>'
    content += '<button class="' + jscolor + '" id="line_color"></button>'
    content += '</div>'
    content += '<div class="form-item">'
    content += '<div class="form-label">线形</div>'
    content += '<input class="form-radio" type="radio" name="shape" value="直线"><p>直线</p><input class="form-radio" name="shape"  type="radio" value="虚线"><p>虚线</p>'
    content += '</div>'
    content += '</div>'
    return content
}

function lineEdit(e) {
    var _line = e.target;
    var width = $('#line_width').val();
    var color = $('#line_color')[0].style.backgroundColor;
    _line.strokeWidth = width;
    _line.fill = color;
    canvas.renderAll()
}
