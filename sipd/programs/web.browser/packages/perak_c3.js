//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Template = Package['templating-runtime'].Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var c3charts;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/perak_c3/c3/c3.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (window) {                                                                                                   // 1
    'use strict';                                                                                                      // 2
                                                                                                                       // 3
    /*global define, module, exports, require */                                                                       // 4
                                                                                                                       // 5
    var c3 = { version: "0.4.11-rc1" };                                                                                // 6
                                                                                                                       // 7
    var c3_chart_fn,                                                                                                   // 8
        c3_chart_internal_fn,                                                                                          // 9
        c3_chart_internal_axis_fn;                                                                                     // 10
                                                                                                                       // 11
    function API(owner) {                                                                                              // 12
        this.owner = owner;                                                                                            // 13
    }                                                                                                                  // 14
                                                                                                                       // 15
    function inherit(base, derived) {                                                                                  // 16
                                                                                                                       // 17
        if (Object.create) {                                                                                           // 18
            derived.prototype = Object.create(base.prototype);                                                         // 19
        } else {                                                                                                       // 20
            var f = function f() {};                                                                                   // 21
            f.prototype = base.prototype;                                                                              // 22
            derived.prototype = new f();                                                                               // 23
        }                                                                                                              // 24
                                                                                                                       // 25
        derived.prototype.constructor = derived;                                                                       // 26
                                                                                                                       // 27
        return derived;                                                                                                // 28
    }                                                                                                                  // 29
                                                                                                                       // 30
    function Chart(config) {                                                                                           // 31
        var $$ = this.internal = new ChartInternal(this);                                                              // 32
        $$.loadConfig(config);                                                                                         // 33
        $$.init();                                                                                                     // 34
                                                                                                                       // 35
        // bind "this" to nested API                                                                                   // 36
        (function bindThis(fn, target, argThis) {                                                                      // 37
            Object.keys(fn).forEach(function (key) {                                                                   // 38
                target[key] = fn[key].bind(argThis);                                                                   // 39
                if (Object.keys(fn[key]).length > 0) {                                                                 // 40
                    bindThis(fn[key], target[key], argThis);                                                           // 41
                }                                                                                                      // 42
            });                                                                                                        // 43
        })(c3_chart_fn, this, this);                                                                                   // 44
    }                                                                                                                  // 45
                                                                                                                       // 46
    function ChartInternal(api) {                                                                                      // 47
        var $$ = this;                                                                                                 // 48
        $$.d3 = window.d3 ? window.d3 : typeof require !== 'undefined' ? require("d3") : undefined;                    // 49
        $$.api = api;                                                                                                  // 50
        $$.config = $$.getDefaultConfig();                                                                             // 51
        $$.data = {};                                                                                                  // 52
        $$.cache = {};                                                                                                 // 53
        $$.axes = {};                                                                                                  // 54
    }                                                                                                                  // 55
                                                                                                                       // 56
    c3.generate = function (config) {                                                                                  // 57
        return new Chart(config);                                                                                      // 58
    };                                                                                                                 // 59
                                                                                                                       // 60
    c3.chart = {                                                                                                       // 61
        fn: Chart.prototype,                                                                                           // 62
        internal: {                                                                                                    // 63
            fn: ChartInternal.prototype,                                                                               // 64
            axis: {                                                                                                    // 65
                fn: Axis.prototype                                                                                     // 66
            }                                                                                                          // 67
        }                                                                                                              // 68
    };                                                                                                                 // 69
    c3_chart_fn = c3.chart.fn;                                                                                         // 70
    c3_chart_internal_fn = c3.chart.internal.fn;                                                                       // 71
    c3_chart_internal_axis_fn = c3.chart.internal.axis.fn;                                                             // 72
                                                                                                                       // 73
    c3_chart_internal_fn.init = function () {                                                                          // 74
        var $$ = this, config = $$.config;                                                                             // 75
                                                                                                                       // 76
        $$.initParams();                                                                                               // 77
                                                                                                                       // 78
        if (config.data_url) {                                                                                         // 79
            $$.convertUrlToData(config.data_url, config.data_mimeType, config.data_keys, $$.initWithData);             // 80
        }                                                                                                              // 81
        else if (config.data_json) {                                                                                   // 82
            $$.initWithData($$.convertJsonToData(config.data_json, config.data_keys));                                 // 83
        }                                                                                                              // 84
        else if (config.data_rows) {                                                                                   // 85
            $$.initWithData($$.convertRowsToData(config.data_rows));                                                   // 86
        }                                                                                                              // 87
        else if (config.data_columns) {                                                                                // 88
            $$.initWithData($$.convertColumnsToData(config.data_columns));                                             // 89
        }                                                                                                              // 90
        else {                                                                                                         // 91
            throw Error('url or json or rows or columns is required.');                                                // 92
        }                                                                                                              // 93
    };                                                                                                                 // 94
                                                                                                                       // 95
    c3_chart_internal_fn.initParams = function () {                                                                    // 96
        var $$ = this, d3 = $$.d3, config = $$.config;                                                                 // 97
                                                                                                                       // 98
        // MEMO: clipId needs to be unique because it conflicts when multiple charts exist                             // 99
        $$.clipId = "c3-" + (+new Date()) + '-clip',                                                                   // 100
        $$.clipIdForXAxis = $$.clipId + '-xaxis',                                                                      // 101
        $$.clipIdForYAxis = $$.clipId + '-yaxis',                                                                      // 102
        $$.clipIdForGrid = $$.clipId + '-grid',                                                                        // 103
        $$.clipIdForSubchart = $$.clipId + '-subchart',                                                                // 104
        $$.clipPath = $$.getClipPath($$.clipId),                                                                       // 105
        $$.clipPathForXAxis = $$.getClipPath($$.clipIdForXAxis),                                                       // 106
        $$.clipPathForYAxis = $$.getClipPath($$.clipIdForYAxis);                                                       // 107
        $$.clipPathForGrid = $$.getClipPath($$.clipIdForGrid),                                                         // 108
        $$.clipPathForSubchart = $$.getClipPath($$.clipIdForSubchart),                                                 // 109
                                                                                                                       // 110
        $$.dragStart = null;                                                                                           // 111
        $$.dragging = false;                                                                                           // 112
        $$.flowing = false;                                                                                            // 113
        $$.cancelClick = false;                                                                                        // 114
        $$.mouseover = false;                                                                                          // 115
        $$.transiting = false;                                                                                         // 116
                                                                                                                       // 117
        $$.color = $$.generateColor();                                                                                 // 118
        $$.levelColor = $$.generateLevelColor();                                                                       // 119
                                                                                                                       // 120
        $$.dataTimeFormat = config.data_xLocaltime ? d3.time.format : d3.time.format.utc;                              // 121
        $$.axisTimeFormat = config.axis_x_localtime ? d3.time.format : d3.time.format.utc;                             // 122
        $$.defaultAxisTimeFormat = $$.axisTimeFormat.multi([                                                           // 123
            [".%L", function (d) { return d.getMilliseconds(); }],                                                     // 124
            [":%S", function (d) { return d.getSeconds(); }],                                                          // 125
            ["%I:%M", function (d) { return d.getMinutes(); }],                                                        // 126
            ["%I %p", function (d) { return d.getHours(); }],                                                          // 127
            ["%-m/%-d", function (d) { return d.getDay() && d.getDate() !== 1; }],                                     // 128
            ["%-m/%-d", function (d) { return d.getDate() !== 1; }],                                                   // 129
            ["%-m/%-d", function (d) { return d.getMonth(); }],                                                        // 130
            ["%Y/%-m/%-d", function () { return true; }]                                                               // 131
        ]);                                                                                                            // 132
                                                                                                                       // 133
        $$.hiddenTargetIds = [];                                                                                       // 134
        $$.hiddenLegendIds = [];                                                                                       // 135
        $$.focusedTargetIds = [];                                                                                      // 136
        $$.defocusedTargetIds = [];                                                                                    // 137
                                                                                                                       // 138
        $$.xOrient = config.axis_rotated ? "left" : "bottom";                                                          // 139
        $$.yOrient = config.axis_rotated ? (config.axis_y_inner ? "top" : "bottom") : (config.axis_y_inner ? "right" : "left");
        $$.y2Orient = config.axis_rotated ? (config.axis_y2_inner ? "bottom" : "top") : (config.axis_y2_inner ? "left" : "right");
        $$.subXOrient = config.axis_rotated ? "left" : "bottom";                                                       // 142
                                                                                                                       // 143
        $$.isLegendRight = config.legend_position === 'right';                                                         // 144
        $$.isLegendInset = config.legend_position === 'inset';                                                         // 145
        $$.isLegendTop = config.legend_inset_anchor === 'top-left' || config.legend_inset_anchor === 'top-right';      // 146
        $$.isLegendLeft = config.legend_inset_anchor === 'top-left' || config.legend_inset_anchor === 'bottom-left';   // 147
        $$.legendStep = 0;                                                                                             // 148
        $$.legendItemWidth = 0;                                                                                        // 149
        $$.legendItemHeight = 0;                                                                                       // 150
                                                                                                                       // 151
        $$.currentMaxTickWidths = {                                                                                    // 152
            x: 0,                                                                                                      // 153
            y: 0,                                                                                                      // 154
            y2: 0                                                                                                      // 155
        };                                                                                                             // 156
                                                                                                                       // 157
        $$.rotated_padding_left = 30;                                                                                  // 158
        $$.rotated_padding_right = config.axis_rotated && !config.axis_x_show ? 0 : 30;                                // 159
        $$.rotated_padding_top = 5;                                                                                    // 160
                                                                                                                       // 161
        $$.withoutFadeIn = {};                                                                                         // 162
                                                                                                                       // 163
        $$.intervalForObserveInserted = undefined;                                                                     // 164
                                                                                                                       // 165
        $$.axes.subx = d3.selectAll([]); // needs when excluding subchart.js                                           // 166
    };                                                                                                                 // 167
                                                                                                                       // 168
    c3_chart_internal_fn.initChartElements = function () {                                                             // 169
        if (this.initBar) { this.initBar(); }                                                                          // 170
        if (this.initLine) { this.initLine(); }                                                                        // 171
        if (this.initArc) { this.initArc(); }                                                                          // 172
        if (this.initGauge) { this.initGauge(); }                                                                      // 173
        if (this.initText) { this.initText(); }                                                                        // 174
    };                                                                                                                 // 175
                                                                                                                       // 176
    c3_chart_internal_fn.initWithData = function (data) {                                                              // 177
        var $$ = this, d3 = $$.d3, config = $$.config;                                                                 // 178
        var defs, main, binding = true;                                                                                // 179
                                                                                                                       // 180
        $$.axis = new Axis($$);                                                                                        // 181
                                                                                                                       // 182
        if ($$.initPie) { $$.initPie(); }                                                                              // 183
        if ($$.initBrush) { $$.initBrush(); }                                                                          // 184
        if ($$.initZoom) { $$.initZoom(); }                                                                            // 185
                                                                                                                       // 186
        if (!config.bindto) {                                                                                          // 187
            $$.selectChart = d3.selectAll([]);                                                                         // 188
        }                                                                                                              // 189
        else if (typeof config.bindto.node === 'function') {                                                           // 190
            $$.selectChart = config.bindto;                                                                            // 191
        }                                                                                                              // 192
        else {                                                                                                         // 193
            $$.selectChart = d3.select(config.bindto);                                                                 // 194
        }                                                                                                              // 195
        if ($$.selectChart.empty()) {                                                                                  // 196
            $$.selectChart = d3.select(document.createElement('div')).style('opacity', 0);                             // 197
            $$.observeInserted($$.selectChart);                                                                        // 198
            binding = false;                                                                                           // 199
        }                                                                                                              // 200
        $$.selectChart.html("").classed("c3", true);                                                                   // 201
                                                                                                                       // 202
        // Init data as targets                                                                                        // 203
        $$.data.xs = {};                                                                                               // 204
        $$.data.targets = $$.convertDataToTargets(data);                                                               // 205
                                                                                                                       // 206
        if (config.data_filter) {                                                                                      // 207
            $$.data.targets = $$.data.targets.filter(config.data_filter);                                              // 208
        }                                                                                                              // 209
                                                                                                                       // 210
        // Set targets to hide if needed                                                                               // 211
        if (config.data_hide) {                                                                                        // 212
            $$.addHiddenTargetIds(config.data_hide === true ? $$.mapToIds($$.data.targets) : config.data_hide);        // 213
        }                                                                                                              // 214
        if (config.legend_hide) {                                                                                      // 215
            $$.addHiddenLegendIds(config.legend_hide === true ? $$.mapToIds($$.data.targets) : config.legend_hide);    // 216
        }                                                                                                              // 217
                                                                                                                       // 218
        // when gauge, hide legend // TODO: fix                                                                        // 219
        if ($$.hasType('gauge')) {                                                                                     // 220
            config.legend_show = false;                                                                                // 221
        }                                                                                                              // 222
                                                                                                                       // 223
        // Init sizes and scales                                                                                       // 224
        $$.updateSizes();                                                                                              // 225
        $$.updateScales();                                                                                             // 226
                                                                                                                       // 227
        // Set domains for each scale                                                                                  // 228
        $$.x.domain(d3.extent($$.getXDomain($$.data.targets)));                                                        // 229
        $$.y.domain($$.getYDomain($$.data.targets, 'y'));                                                              // 230
        $$.y2.domain($$.getYDomain($$.data.targets, 'y2'));                                                            // 231
        $$.subX.domain($$.x.domain());                                                                                 // 232
        $$.subY.domain($$.y.domain());                                                                                 // 233
        $$.subY2.domain($$.y2.domain());                                                                               // 234
                                                                                                                       // 235
        // Save original x domain for zoom update                                                                      // 236
        $$.orgXDomain = $$.x.domain();                                                                                 // 237
                                                                                                                       // 238
        // Set initialized scales to brush and zoom                                                                    // 239
        if ($$.brush) { $$.brush.scale($$.subX); }                                                                     // 240
        if (config.zoom_enabled) { $$.zoom.scale($$.x); }                                                              // 241
                                                                                                                       // 242
        /*-- Basic Elements --*/                                                                                       // 243
                                                                                                                       // 244
        // Define svgs                                                                                                 // 245
        $$.svg = $$.selectChart.append("svg")                                                                          // 246
            .style("overflow", "hidden")                                                                               // 247
            .on('mouseenter', function () { return config.onmouseover.call($$); })                                     // 248
            .on('mouseleave', function () { return config.onmouseout.call($$); });                                     // 249
                                                                                                                       // 250
        // Define defs                                                                                                 // 251
        defs = $$.svg.append("defs");                                                                                  // 252
        $$.clipChart = $$.appendClip(defs, $$.clipId);                                                                 // 253
        $$.clipXAxis = $$.appendClip(defs, $$.clipIdForXAxis);                                                         // 254
        $$.clipYAxis = $$.appendClip(defs, $$.clipIdForYAxis);                                                         // 255
        $$.clipGrid = $$.appendClip(defs, $$.clipIdForGrid);                                                           // 256
        $$.clipSubchart = $$.appendClip(defs, $$.clipIdForSubchart);                                                   // 257
        $$.updateSvgSize();                                                                                            // 258
                                                                                                                       // 259
        // Define regions                                                                                              // 260
        main = $$.main = $$.svg.append("g").attr("transform", $$.getTranslate('main'));                                // 261
                                                                                                                       // 262
        if ($$.initSubchart) { $$.initSubchart(); }                                                                    // 263
        if ($$.initTooltip) { $$.initTooltip(); }                                                                      // 264
        if ($$.initLegend) { $$.initLegend(); }                                                                        // 265
        if ($$.initTitle) { $$.initTitle(); }                                                                          // 266
                                                                                                                       // 267
        /*-- Main Region --*/                                                                                          // 268
                                                                                                                       // 269
        // text when empty                                                                                             // 270
        main.append("text")                                                                                            // 271
            .attr("class", CLASS.text + ' ' + CLASS.empty)                                                             // 272
            .attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.              // 273
            .attr("dominant-baseline", "middle"); // vertical centering of text at y position in all browsers, except IE.
                                                                                                                       // 275
        // Regions                                                                                                     // 276
        $$.initRegion();                                                                                               // 277
                                                                                                                       // 278
        // Grids                                                                                                       // 279
        $$.initGrid();                                                                                                 // 280
                                                                                                                       // 281
        // Define g for chart area                                                                                     // 282
        main.append('g')                                                                                               // 283
            .attr("clip-path", $$.clipPath)                                                                            // 284
            .attr('class', CLASS.chart);                                                                               // 285
                                                                                                                       // 286
        // Grid lines                                                                                                  // 287
        if (config.grid_lines_front) { $$.initGridLines(); }                                                           // 288
                                                                                                                       // 289
        // Cover whole with rects for events                                                                           // 290
        $$.initEventRect();                                                                                            // 291
                                                                                                                       // 292
        // Define g for chart                                                                                          // 293
        $$.initChartElements();                                                                                        // 294
                                                                                                                       // 295
        // if zoom privileged, insert rect to forefront                                                                // 296
        // TODO: is this needed?                                                                                       // 297
        main.insert('rect', config.zoom_privileged ? null : 'g.' + CLASS.regions)                                      // 298
            .attr('class', CLASS.zoomRect)                                                                             // 299
            .attr('width', $$.width)                                                                                   // 300
            .attr('height', $$.height)                                                                                 // 301
            .style('opacity', 0)                                                                                       // 302
            .on("dblclick.zoom", null);                                                                                // 303
                                                                                                                       // 304
        // Set default extent if defined                                                                               // 305
        if (config.axis_x_extent) { $$.brush.extent($$.getDefaultExtent()); }                                          // 306
                                                                                                                       // 307
        // Add Axis                                                                                                    // 308
        $$.axis.init();                                                                                                // 309
                                                                                                                       // 310
        // Set targets                                                                                                 // 311
        $$.updateTargets($$.data.targets);                                                                             // 312
                                                                                                                       // 313
        // Draw with targets                                                                                           // 314
        if (binding) {                                                                                                 // 315
            $$.updateDimension();                                                                                      // 316
            $$.config.oninit.call($$);                                                                                 // 317
            $$.redraw({                                                                                                // 318
                withTransition: false,                                                                                 // 319
                withTransform: true,                                                                                   // 320
                withUpdateXDomain: true,                                                                               // 321
                withUpdateOrgXDomain: true,                                                                            // 322
                withTransitionForAxis: false                                                                           // 323
            });                                                                                                        // 324
        }                                                                                                              // 325
                                                                                                                       // 326
        // Bind resize event                                                                                           // 327
        $$.bindResize();                                                                                               // 328
                                                                                                                       // 329
        // export element of the chart                                                                                 // 330
        $$.api.element = $$.selectChart.node();                                                                        // 331
    };                                                                                                                 // 332
                                                                                                                       // 333
    c3_chart_internal_fn.smoothLines = function (el, type) {                                                           // 334
        var $$ = this;                                                                                                 // 335
        if (type === 'grid') {                                                                                         // 336
            el.each(function () {                                                                                      // 337
                var g = $$.d3.select(this),                                                                            // 338
                    x1 = g.attr('x1'),                                                                                 // 339
                    x2 = g.attr('x2'),                                                                                 // 340
                    y1 = g.attr('y1'),                                                                                 // 341
                    y2 = g.attr('y2');                                                                                 // 342
                g.attr({                                                                                               // 343
                    'x1': Math.ceil(x1),                                                                               // 344
                    'x2': Math.ceil(x2),                                                                               // 345
                    'y1': Math.ceil(y1),                                                                               // 346
                    'y2': Math.ceil(y2)                                                                                // 347
                });                                                                                                    // 348
            });                                                                                                        // 349
        }                                                                                                              // 350
    };                                                                                                                 // 351
                                                                                                                       // 352
                                                                                                                       // 353
    c3_chart_internal_fn.updateSizes = function () {                                                                   // 354
        var $$ = this, config = $$.config;                                                                             // 355
        var legendHeight = $$.legend ? $$.getLegendHeight() : 0,                                                       // 356
            legendWidth = $$.legend ? $$.getLegendWidth() : 0,                                                         // 357
            legendHeightForBottom = $$.isLegendRight || $$.isLegendInset ? 0 : legendHeight,                           // 358
            hasArc = $$.hasArcType(),                                                                                  // 359
            xAxisHeight = config.axis_rotated || hasArc ? 0 : $$.getHorizontalAxisHeight('x'),                         // 360
            subchartHeight = config.subchart_show && !hasArc ? (config.subchart_size_height + xAxisHeight) : 0;        // 361
                                                                                                                       // 362
        $$.currentWidth = $$.getCurrentWidth();                                                                        // 363
        $$.currentHeight = $$.getCurrentHeight();                                                                      // 364
                                                                                                                       // 365
        // for main                                                                                                    // 366
        $$.margin = config.axis_rotated ? {                                                                            // 367
            top: $$.getHorizontalAxisHeight('y2') + $$.getCurrentPaddingTop(),                                         // 368
            right: hasArc ? 0 : $$.getCurrentPaddingRight(),                                                           // 369
            bottom: $$.getHorizontalAxisHeight('y') + legendHeightForBottom + $$.getCurrentPaddingBottom(),            // 370
            left: subchartHeight + (hasArc ? 0 : $$.getCurrentPaddingLeft())                                           // 371
        } : {                                                                                                          // 372
            top: 4 + $$.getCurrentPaddingTop(), // for top tick text                                                   // 373
            right: hasArc ? 0 : $$.getCurrentPaddingRight(),                                                           // 374
            bottom: xAxisHeight + subchartHeight + legendHeightForBottom + $$.getCurrentPaddingBottom(),               // 375
            left: hasArc ? 0 : $$.getCurrentPaddingLeft()                                                              // 376
        };                                                                                                             // 377
                                                                                                                       // 378
        // for subchart                                                                                                // 379
        $$.margin2 = config.axis_rotated ? {                                                                           // 380
            top: $$.margin.top,                                                                                        // 381
            right: NaN,                                                                                                // 382
            bottom: 20 + legendHeightForBottom,                                                                        // 383
            left: $$.rotated_padding_left                                                                              // 384
        } : {                                                                                                          // 385
            top: $$.currentHeight - subchartHeight - legendHeightForBottom,                                            // 386
            right: NaN,                                                                                                // 387
            bottom: xAxisHeight + legendHeightForBottom,                                                               // 388
            left: $$.margin.left                                                                                       // 389
        };                                                                                                             // 390
                                                                                                                       // 391
        // for legend                                                                                                  // 392
        $$.margin3 = {                                                                                                 // 393
            top: 0,                                                                                                    // 394
            right: NaN,                                                                                                // 395
            bottom: 0,                                                                                                 // 396
            left: 0                                                                                                    // 397
        };                                                                                                             // 398
        if ($$.updateSizeForLegend) { $$.updateSizeForLegend(legendHeight, legendWidth); }                             // 399
                                                                                                                       // 400
        $$.width = $$.currentWidth - $$.margin.left - $$.margin.right;                                                 // 401
        $$.height = $$.currentHeight - $$.margin.top - $$.margin.bottom;                                               // 402
        if ($$.width < 0) { $$.width = 0; }                                                                            // 403
        if ($$.height < 0) { $$.height = 0; }                                                                          // 404
                                                                                                                       // 405
        $$.width2 = config.axis_rotated ? $$.margin.left - $$.rotated_padding_left - $$.rotated_padding_right : $$.width;
        $$.height2 = config.axis_rotated ? $$.height : $$.currentHeight - $$.margin2.top - $$.margin2.bottom;          // 407
        if ($$.width2 < 0) { $$.width2 = 0; }                                                                          // 408
        if ($$.height2 < 0) { $$.height2 = 0; }                                                                        // 409
                                                                                                                       // 410
        // for arc                                                                                                     // 411
        $$.arcWidth = $$.width - ($$.isLegendRight ? legendWidth + 10 : 0);                                            // 412
        $$.arcHeight = $$.height - ($$.isLegendRight ? 0 : 10);                                                        // 413
        if ($$.hasType('gauge')) {                                                                                     // 414
            $$.arcHeight += $$.height - $$.getGaugeLabelHeight();                                                      // 415
        }                                                                                                              // 416
        if ($$.updateRadius) { $$.updateRadius(); }                                                                    // 417
                                                                                                                       // 418
        if ($$.isLegendRight && hasArc) {                                                                              // 419
            $$.margin3.left = $$.arcWidth / 2 + $$.radiusExpanded * 1.1;                                               // 420
        }                                                                                                              // 421
    };                                                                                                                 // 422
                                                                                                                       // 423
    c3_chart_internal_fn.updateTargets = function (targets) {                                                          // 424
        var $$ = this;                                                                                                 // 425
                                                                                                                       // 426
        /*-- Main --*/                                                                                                 // 427
                                                                                                                       // 428
        //-- Text --//                                                                                                 // 429
        $$.updateTargetsForText(targets);                                                                              // 430
                                                                                                                       // 431
        //-- Bar --//                                                                                                  // 432
        $$.updateTargetsForBar(targets);                                                                               // 433
                                                                                                                       // 434
        //-- Line --//                                                                                                 // 435
        $$.updateTargetsForLine(targets);                                                                              // 436
                                                                                                                       // 437
        //-- Arc --//                                                                                                  // 438
        if ($$.hasArcType() && $$.updateTargetsForArc) { $$.updateTargetsForArc(targets); }                            // 439
                                                                                                                       // 440
        /*-- Sub --*/                                                                                                  // 441
                                                                                                                       // 442
        if ($$.updateTargetsForSubchart) { $$.updateTargetsForSubchart(targets); }                                     // 443
                                                                                                                       // 444
        // Fade-in each chart                                                                                          // 445
        $$.showTargets();                                                                                              // 446
    };                                                                                                                 // 447
    c3_chart_internal_fn.showTargets = function () {                                                                   // 448
        var $$ = this;                                                                                                 // 449
        $$.svg.selectAll('.' + CLASS.target).filter(function (d) { return $$.isTargetToShow(d.id); })                  // 450
          .transition().duration($$.config.transition_duration)                                                        // 451
            .style("opacity", 1);                                                                                      // 452
    };                                                                                                                 // 453
                                                                                                                       // 454
    c3_chart_internal_fn.redraw = function (options, transitions) {                                                    // 455
        var $$ = this, main = $$.main, d3 = $$.d3, config = $$.config;                                                 // 456
        var areaIndices = $$.getShapeIndices($$.isAreaType), barIndices = $$.getShapeIndices($$.isBarType), lineIndices = $$.getShapeIndices($$.isLineType);
        var withY, withSubchart, withTransition, withTransitionForExit, withTransitionForAxis,                         // 458
            withTransform, withUpdateXDomain, withUpdateOrgXDomain, withTrimXDomain, withLegend,                       // 459
            withEventRect, withDimension, withUpdateXAxis;                                                             // 460
        var hideAxis = $$.hasArcType();                                                                                // 461
        var drawArea, drawBar, drawLine, xForText, yForText;                                                           // 462
        var duration, durationForExit, durationForAxis;                                                                // 463
        var waitForDraw, flow;                                                                                         // 464
        var targetsToShow = $$.filterTargetsToShow($$.data.targets), tickValues, i, intervalForCulling, xDomainForZoom;
        var xv = $$.xv.bind($$), cx, cy;                                                                               // 466
                                                                                                                       // 467
        options = options || {};                                                                                       // 468
        withY = getOption(options, "withY", true);                                                                     // 469
        withSubchart = getOption(options, "withSubchart", true);                                                       // 470
        withTransition = getOption(options, "withTransition", true);                                                   // 471
        withTransform = getOption(options, "withTransform", false);                                                    // 472
        withUpdateXDomain = getOption(options, "withUpdateXDomain", false);                                            // 473
        withUpdateOrgXDomain = getOption(options, "withUpdateOrgXDomain", false);                                      // 474
        withTrimXDomain = getOption(options, "withTrimXDomain", true);                                                 // 475
        withUpdateXAxis = getOption(options, "withUpdateXAxis", withUpdateXDomain);                                    // 476
        withLegend = getOption(options, "withLegend", false);                                                          // 477
        withEventRect = getOption(options, "withEventRect", true);                                                     // 478
        withDimension = getOption(options, "withDimension", true);                                                     // 479
        withTransitionForExit = getOption(options, "withTransitionForExit", withTransition);                           // 480
        withTransitionForAxis = getOption(options, "withTransitionForAxis", withTransition);                           // 481
                                                                                                                       // 482
        duration = withTransition ? config.transition_duration : 0;                                                    // 483
        durationForExit = withTransitionForExit ? duration : 0;                                                        // 484
        durationForAxis = withTransitionForAxis ? duration : 0;                                                        // 485
                                                                                                                       // 486
        transitions = transitions || $$.axis.generateTransitions(durationForAxis);                                     // 487
                                                                                                                       // 488
        // update legend and transform each g                                                                          // 489
        if (withLegend && config.legend_show) {                                                                        // 490
            $$.updateLegend($$.mapToIds($$.data.targets), options, transitions);                                       // 491
        } else if (withDimension) {                                                                                    // 492
            // need to update dimension (e.g. axis.y.tick.values) because y tick values should change                  // 493
            // no need to update axis in it because they will be updated in redraw()                                   // 494
            $$.updateDimension(true);                                                                                  // 495
        }                                                                                                              // 496
                                                                                                                       // 497
        // MEMO: needed for grids calculation                                                                          // 498
        if ($$.isCategorized() && targetsToShow.length === 0) {                                                        // 499
            $$.x.domain([0, $$.axes.x.selectAll('.tick').size()]);                                                     // 500
        }                                                                                                              // 501
                                                                                                                       // 502
        if (targetsToShow.length) {                                                                                    // 503
            $$.updateXDomain(targetsToShow, withUpdateXDomain, withUpdateOrgXDomain, withTrimXDomain);                 // 504
            if (!config.axis_x_tick_values) {                                                                          // 505
                tickValues = $$.axis.updateXAxisTickValues(targetsToShow);                                             // 506
            }                                                                                                          // 507
        } else {                                                                                                       // 508
            $$.xAxis.tickValues([]);                                                                                   // 509
            $$.subXAxis.tickValues([]);                                                                                // 510
        }                                                                                                              // 511
                                                                                                                       // 512
        if (config.zoom_rescale && !options.flow) {                                                                    // 513
            xDomainForZoom = $$.x.orgDomain();                                                                         // 514
        }                                                                                                              // 515
                                                                                                                       // 516
        $$.y.domain($$.getYDomain(targetsToShow, 'y', xDomainForZoom));                                                // 517
        $$.y2.domain($$.getYDomain(targetsToShow, 'y2', xDomainForZoom));                                              // 518
                                                                                                                       // 519
        if (!config.axis_y_tick_values && config.axis_y_tick_count) {                                                  // 520
            $$.yAxis.tickValues($$.axis.generateTickValues($$.y.domain(), config.axis_y_tick_count));                  // 521
        }                                                                                                              // 522
        if (!config.axis_y2_tick_values && config.axis_y2_tick_count) {                                                // 523
            $$.y2Axis.tickValues($$.axis.generateTickValues($$.y2.domain(), config.axis_y2_tick_count));               // 524
        }                                                                                                              // 525
                                                                                                                       // 526
        // axes                                                                                                        // 527
        $$.axis.redraw(transitions, hideAxis);                                                                         // 528
                                                                                                                       // 529
        // Update axis label                                                                                           // 530
        $$.axis.updateLabels(withTransition);                                                                          // 531
                                                                                                                       // 532
        // show/hide if manual culling needed                                                                          // 533
        if ((withUpdateXDomain || withUpdateXAxis) && targetsToShow.length) {                                          // 534
            if (config.axis_x_tick_culling && tickValues) {                                                            // 535
                for (i = 1; i < tickValues.length; i++) {                                                              // 536
                    if (tickValues.length / i < config.axis_x_tick_culling_max) {                                      // 537
                        intervalForCulling = i;                                                                        // 538
                        break;                                                                                         // 539
                    }                                                                                                  // 540
                }                                                                                                      // 541
                $$.svg.selectAll('.' + CLASS.axisX + ' .tick text').each(function (e) {                                // 542
                    var index = tickValues.indexOf(e);                                                                 // 543
                    if (index >= 0) {                                                                                  // 544
                        d3.select(this).style('display', index % intervalForCulling ? 'none' : 'block');               // 545
                    }                                                                                                  // 546
                });                                                                                                    // 547
            } else {                                                                                                   // 548
                $$.svg.selectAll('.' + CLASS.axisX + ' .tick text').style('display', 'block');                         // 549
            }                                                                                                          // 550
        }                                                                                                              // 551
                                                                                                                       // 552
        // setup drawer - MEMO: these must be called after axis updated                                                // 553
        drawArea = $$.generateDrawArea ? $$.generateDrawArea(areaIndices, false) : undefined;                          // 554
        drawBar = $$.generateDrawBar ? $$.generateDrawBar(barIndices) : undefined;                                     // 555
        drawLine = $$.generateDrawLine ? $$.generateDrawLine(lineIndices, false) : undefined;                          // 556
        xForText = $$.generateXYForText(areaIndices, barIndices, lineIndices, true);                                   // 557
        yForText = $$.generateXYForText(areaIndices, barIndices, lineIndices, false);                                  // 558
                                                                                                                       // 559
        // Update sub domain                                                                                           // 560
        if (withY) {                                                                                                   // 561
            $$.subY.domain($$.getYDomain(targetsToShow, 'y'));                                                         // 562
            $$.subY2.domain($$.getYDomain(targetsToShow, 'y2'));                                                       // 563
        }                                                                                                              // 564
                                                                                                                       // 565
        // xgrid focus                                                                                                 // 566
        $$.updateXgridFocus();                                                                                         // 567
                                                                                                                       // 568
        // Data empty label positioning and text.                                                                      // 569
        main.select("text." + CLASS.text + '.' + CLASS.empty)                                                          // 570
            .attr("x", $$.width / 2)                                                                                   // 571
            .attr("y", $$.height / 2)                                                                                  // 572
            .text(config.data_empty_label_text)                                                                        // 573
          .transition()                                                                                                // 574
            .style('opacity', targetsToShow.length ? 0 : 1);                                                           // 575
                                                                                                                       // 576
        // grid                                                                                                        // 577
        $$.updateGrid(duration);                                                                                       // 578
                                                                                                                       // 579
        // rect for regions                                                                                            // 580
        $$.updateRegion(duration);                                                                                     // 581
                                                                                                                       // 582
        // bars                                                                                                        // 583
        $$.updateBar(durationForExit);                                                                                 // 584
                                                                                                                       // 585
        // lines, areas and cricles                                                                                    // 586
        $$.updateLine(durationForExit);                                                                                // 587
        $$.updateArea(durationForExit);                                                                                // 588
        $$.updateCircle();                                                                                             // 589
                                                                                                                       // 590
        // text                                                                                                        // 591
        if ($$.hasDataLabel()) {                                                                                       // 592
            $$.updateText(durationForExit);                                                                            // 593
        }                                                                                                              // 594
                                                                                                                       // 595
        // title                                                                                                       // 596
        if ($$.redrawTitle) { $$.redrawTitle(); }                                                                      // 597
                                                                                                                       // 598
        // arc                                                                                                         // 599
        if ($$.redrawArc) { $$.redrawArc(duration, durationForExit, withTransform); }                                  // 600
                                                                                                                       // 601
        // subchart                                                                                                    // 602
        if ($$.redrawSubchart) {                                                                                       // 603
            $$.redrawSubchart(withSubchart, transitions, duration, durationForExit, areaIndices, barIndices, lineIndices);
        }                                                                                                              // 605
                                                                                                                       // 606
        // circles for select                                                                                          // 607
        main.selectAll('.' + CLASS.selectedCircles)                                                                    // 608
            .filter($$.isBarType.bind($$))                                                                             // 609
            .selectAll('circle')                                                                                       // 610
            .remove();                                                                                                 // 611
                                                                                                                       // 612
        // event rects will redrawn when flow called                                                                   // 613
        if (config.interaction_enabled && !options.flow && withEventRect) {                                            // 614
            $$.redrawEventRect();                                                                                      // 615
            if ($$.updateZoom) { $$.updateZoom(); }                                                                    // 616
        }                                                                                                              // 617
                                                                                                                       // 618
        // update circleY based on updated parameters                                                                  // 619
        $$.updateCircleY();                                                                                            // 620
                                                                                                                       // 621
        // generate circle x/y functions depending on updated params                                                   // 622
        cx = ($$.config.axis_rotated ? $$.circleY : $$.circleX).bind($$);                                              // 623
        cy = ($$.config.axis_rotated ? $$.circleX : $$.circleY).bind($$);                                              // 624
                                                                                                                       // 625
        if (options.flow) {                                                                                            // 626
            flow = $$.generateFlow({                                                                                   // 627
                targets: targetsToShow,                                                                                // 628
                flow: options.flow,                                                                                    // 629
                duration: options.flow.duration,                                                                       // 630
                drawBar: drawBar,                                                                                      // 631
                drawLine: drawLine,                                                                                    // 632
                drawArea: drawArea,                                                                                    // 633
                cx: cx,                                                                                                // 634
                cy: cy,                                                                                                // 635
                xv: xv,                                                                                                // 636
                xForText: xForText,                                                                                    // 637
                yForText: yForText                                                                                     // 638
            });                                                                                                        // 639
        }                                                                                                              // 640
                                                                                                                       // 641
        if ((duration || flow) && $$.isTabVisible()) { // Only use transition if tab visible. See #938.                // 642
            // transition should be derived from one transition                                                        // 643
            d3.transition().duration(duration).each(function () {                                                      // 644
                var transitionsToWait = [];                                                                            // 645
                                                                                                                       // 646
                // redraw and gather transitions                                                                       // 647
                [                                                                                                      // 648
                    $$.redrawBar(drawBar, true),                                                                       // 649
                    $$.redrawLine(drawLine, true),                                                                     // 650
                    $$.redrawArea(drawArea, true),                                                                     // 651
                    $$.redrawCircle(cx, cy, true),                                                                     // 652
                    $$.redrawText(xForText, yForText, options.flow, true),                                             // 653
                    $$.redrawRegion(true),                                                                             // 654
                    $$.redrawGrid(true),                                                                               // 655
                ].forEach(function (transitions) {                                                                     // 656
                    transitions.forEach(function (transition) {                                                        // 657
                        transitionsToWait.push(transition);                                                            // 658
                    });                                                                                                // 659
                });                                                                                                    // 660
                                                                                                                       // 661
                // Wait for end of transitions to call flow and onrendered callback                                    // 662
                waitForDraw = $$.generateWait();                                                                       // 663
                transitionsToWait.forEach(function (t) {                                                               // 664
                    waitForDraw.add(t);                                                                                // 665
                });                                                                                                    // 666
            })                                                                                                         // 667
            .call(waitForDraw, function () {                                                                           // 668
                if (flow) {                                                                                            // 669
                    flow();                                                                                            // 670
                }                                                                                                      // 671
                if (config.onrendered) {                                                                               // 672
                    config.onrendered.call($$);                                                                        // 673
                }                                                                                                      // 674
            });                                                                                                        // 675
        }                                                                                                              // 676
        else {                                                                                                         // 677
            $$.redrawBar(drawBar);                                                                                     // 678
            $$.redrawLine(drawLine);                                                                                   // 679
            $$.redrawArea(drawArea);                                                                                   // 680
            $$.redrawCircle(cx, cy);                                                                                   // 681
            $$.redrawText(xForText, yForText, options.flow);                                                           // 682
            $$.redrawRegion();                                                                                         // 683
            $$.redrawGrid();                                                                                           // 684
            if (config.onrendered) {                                                                                   // 685
                config.onrendered.call($$);                                                                            // 686
            }                                                                                                          // 687
        }                                                                                                              // 688
                                                                                                                       // 689
        // update fadein condition                                                                                     // 690
        $$.mapToIds($$.data.targets).forEach(function (id) {                                                           // 691
            $$.withoutFadeIn[id] = true;                                                                               // 692
        });                                                                                                            // 693
    };                                                                                                                 // 694
                                                                                                                       // 695
    c3_chart_internal_fn.updateAndRedraw = function (options) {                                                        // 696
        var $$ = this, config = $$.config, transitions;                                                                // 697
        options = options || {};                                                                                       // 698
        // same with redraw                                                                                            // 699
        options.withTransition = getOption(options, "withTransition", true);                                           // 700
        options.withTransform = getOption(options, "withTransform", false);                                            // 701
        options.withLegend = getOption(options, "withLegend", false);                                                  // 702
        // NOT same with redraw                                                                                        // 703
        options.withUpdateXDomain = true;                                                                              // 704
        options.withUpdateOrgXDomain = true;                                                                           // 705
        options.withTransitionForExit = false;                                                                         // 706
        options.withTransitionForTransform = getOption(options, "withTransitionForTransform", options.withTransition);
        // MEMO: this needs to be called before updateLegend and it means this ALWAYS needs to be called)              // 708
        $$.updateSizes();                                                                                              // 709
        // MEMO: called in updateLegend in redraw if withLegend                                                        // 710
        if (!(options.withLegend && config.legend_show)) {                                                             // 711
            transitions = $$.axis.generateTransitions(options.withTransitionForAxis ? config.transition_duration : 0);
            // Update scales                                                                                           // 713
            $$.updateScales();                                                                                         // 714
            $$.updateSvgSize();                                                                                        // 715
            // Update g positions                                                                                      // 716
            $$.transformAll(options.withTransitionForTransform, transitions);                                          // 717
        }                                                                                                              // 718
        // Draw with new sizes & scales                                                                                // 719
        $$.redraw(options, transitions);                                                                               // 720
    };                                                                                                                 // 721
    c3_chart_internal_fn.redrawWithoutRescale = function () {                                                          // 722
        this.redraw({                                                                                                  // 723
            withY: false,                                                                                              // 724
            withSubchart: false,                                                                                       // 725
            withEventRect: false,                                                                                      // 726
            withTransitionForAxis: false                                                                               // 727
        });                                                                                                            // 728
    };                                                                                                                 // 729
                                                                                                                       // 730
    c3_chart_internal_fn.isTimeSeries = function () {                                                                  // 731
        return this.config.axis_x_type === 'timeseries';                                                               // 732
    };                                                                                                                 // 733
    c3_chart_internal_fn.isCategorized = function () {                                                                 // 734
        return this.config.axis_x_type.indexOf('categor') >= 0;                                                        // 735
    };                                                                                                                 // 736
    c3_chart_internal_fn.isCustomX = function () {                                                                     // 737
        var $$ = this, config = $$.config;                                                                             // 738
        return !$$.isTimeSeries() && (config.data_x || notEmpty(config.data_xs));                                      // 739
    };                                                                                                                 // 740
                                                                                                                       // 741
    c3_chart_internal_fn.isTimeSeriesY = function () {                                                                 // 742
        return this.config.axis_y_type === 'timeseries';                                                               // 743
    };                                                                                                                 // 744
                                                                                                                       // 745
    c3_chart_internal_fn.getTranslate = function (target) {                                                            // 746
        var $$ = this, config = $$.config, x, y;                                                                       // 747
        if (target === 'main') {                                                                                       // 748
            x = asHalfPixel($$.margin.left);                                                                           // 749
            y = asHalfPixel($$.margin.top);                                                                            // 750
        } else if (target === 'context') {                                                                             // 751
            x = asHalfPixel($$.margin2.left);                                                                          // 752
            y = asHalfPixel($$.margin2.top);                                                                           // 753
        } else if (target === 'legend') {                                                                              // 754
            x = $$.margin3.left;                                                                                       // 755
            y = $$.margin3.top;                                                                                        // 756
        } else if (target === 'x') {                                                                                   // 757
            x = 0;                                                                                                     // 758
            y = config.axis_rotated ? 0 : $$.height;                                                                   // 759
        } else if (target === 'y') {                                                                                   // 760
            x = 0;                                                                                                     // 761
            y = config.axis_rotated ? $$.height : 0;                                                                   // 762
        } else if (target === 'y2') {                                                                                  // 763
            x = config.axis_rotated ? 0 : $$.width;                                                                    // 764
            y = config.axis_rotated ? 1 : 0;                                                                           // 765
        } else if (target === 'subx') {                                                                                // 766
            x = 0;                                                                                                     // 767
            y = config.axis_rotated ? 0 : $$.height2;                                                                  // 768
        } else if (target === 'arc') {                                                                                 // 769
            x = $$.arcWidth / 2;                                                                                       // 770
            y = $$.arcHeight / 2;                                                                                      // 771
        }                                                                                                              // 772
        return "translate(" + x + "," + y + ")";                                                                       // 773
    };                                                                                                                 // 774
    c3_chart_internal_fn.initialOpacity = function (d) {                                                               // 775
        return d.value !== null && this.withoutFadeIn[d.id] ? 1 : 0;                                                   // 776
    };                                                                                                                 // 777
    c3_chart_internal_fn.initialOpacityForCircle = function (d) {                                                      // 778
        return d.value !== null && this.withoutFadeIn[d.id] ? this.opacityForCircle(d) : 0;                            // 779
    };                                                                                                                 // 780
    c3_chart_internal_fn.opacityForCircle = function (d) {                                                             // 781
        var opacity = this.config.point_show ? 1 : 0;                                                                  // 782
        return isValue(d.value) ? (this.isScatterType(d) ? 0.5 : opacity) : 0;                                         // 783
    };                                                                                                                 // 784
    c3_chart_internal_fn.opacityForText = function () {                                                                // 785
        return this.hasDataLabel() ? 1 : 0;                                                                            // 786
    };                                                                                                                 // 787
    c3_chart_internal_fn.xx = function (d) {                                                                           // 788
        return d ? this.x(d.x) : null;                                                                                 // 789
    };                                                                                                                 // 790
    c3_chart_internal_fn.xv = function (d) {                                                                           // 791
        var $$ = this, value = d.value;                                                                                // 792
        if ($$.isTimeSeries()) {                                                                                       // 793
            value = $$.parseDate(d.value);                                                                             // 794
        }                                                                                                              // 795
        else if ($$.isCategorized() && typeof d.value === 'string') {                                                  // 796
            value = $$.config.axis_x_categories.indexOf(d.value);                                                      // 797
        }                                                                                                              // 798
        return Math.ceil($$.x(value));                                                                                 // 799
    };                                                                                                                 // 800
    c3_chart_internal_fn.yv = function (d) {                                                                           // 801
        var $$ = this,                                                                                                 // 802
            yScale = d.axis && d.axis === 'y2' ? $$.y2 : $$.y;                                                         // 803
        return Math.ceil(yScale(d.value));                                                                             // 804
    };                                                                                                                 // 805
    c3_chart_internal_fn.subxx = function (d) {                                                                        // 806
        return d ? this.subX(d.x) : null;                                                                              // 807
    };                                                                                                                 // 808
                                                                                                                       // 809
    c3_chart_internal_fn.transformMain = function (withTransition, transitions) {                                      // 810
        var $$ = this,                                                                                                 // 811
            xAxis, yAxis, y2Axis;                                                                                      // 812
        if (transitions && transitions.axisX) {                                                                        // 813
            xAxis = transitions.axisX;                                                                                 // 814
        } else {                                                                                                       // 815
            xAxis  = $$.main.select('.' + CLASS.axisX);                                                                // 816
            if (withTransition) { xAxis = xAxis.transition(); }                                                        // 817
        }                                                                                                              // 818
        if (transitions && transitions.axisY) {                                                                        // 819
            yAxis = transitions.axisY;                                                                                 // 820
        } else {                                                                                                       // 821
            yAxis = $$.main.select('.' + CLASS.axisY);                                                                 // 822
            if (withTransition) { yAxis = yAxis.transition(); }                                                        // 823
        }                                                                                                              // 824
        if (transitions && transitions.axisY2) {                                                                       // 825
            y2Axis = transitions.axisY2;                                                                               // 826
        } else {                                                                                                       // 827
            y2Axis = $$.main.select('.' + CLASS.axisY2);                                                               // 828
            if (withTransition) { y2Axis = y2Axis.transition(); }                                                      // 829
        }                                                                                                              // 830
        (withTransition ? $$.main.transition() : $$.main).attr("transform", $$.getTranslate('main'));                  // 831
        xAxis.attr("transform", $$.getTranslate('x'));                                                                 // 832
        yAxis.attr("transform", $$.getTranslate('y'));                                                                 // 833
        y2Axis.attr("transform", $$.getTranslate('y2'));                                                               // 834
        $$.main.select('.' + CLASS.chartArcs).attr("transform", $$.getTranslate('arc'));                               // 835
    };                                                                                                                 // 836
    c3_chart_internal_fn.transformAll = function (withTransition, transitions) {                                       // 837
        var $$ = this;                                                                                                 // 838
        $$.transformMain(withTransition, transitions);                                                                 // 839
        if ($$.config.subchart_show) { $$.transformContext(withTransition, transitions); }                             // 840
        if ($$.legend) { $$.transformLegend(withTransition); }                                                         // 841
    };                                                                                                                 // 842
                                                                                                                       // 843
    c3_chart_internal_fn.updateSvgSize = function () {                                                                 // 844
        var $$ = this,                                                                                                 // 845
            brush = $$.svg.select(".c3-brush .background");                                                            // 846
        $$.svg.attr('width', $$.currentWidth).attr('height', $$.currentHeight);                                        // 847
        $$.svg.selectAll(['#' + $$.clipId, '#' + $$.clipIdForGrid]).select('rect')                                     // 848
            .attr('width', $$.width)                                                                                   // 849
            .attr('height', $$.height);                                                                                // 850
        $$.svg.select('#' + $$.clipIdForXAxis).select('rect')                                                          // 851
            .attr('x', $$.getXAxisClipX.bind($$))                                                                      // 852
            .attr('y', $$.getXAxisClipY.bind($$))                                                                      // 853
            .attr('width', $$.getXAxisClipWidth.bind($$))                                                              // 854
            .attr('height', $$.getXAxisClipHeight.bind($$));                                                           // 855
        $$.svg.select('#' + $$.clipIdForYAxis).select('rect')                                                          // 856
            .attr('x', $$.getYAxisClipX.bind($$))                                                                      // 857
            .attr('y', $$.getYAxisClipY.bind($$))                                                                      // 858
            .attr('width', $$.getYAxisClipWidth.bind($$))                                                              // 859
            .attr('height', $$.getYAxisClipHeight.bind($$));                                                           // 860
        $$.svg.select('#' + $$.clipIdForSubchart).select('rect')                                                       // 861
            .attr('width', $$.width)                                                                                   // 862
            .attr('height', brush.size() ? brush.attr('height') : 0);                                                  // 863
        $$.svg.select('.' + CLASS.zoomRect)                                                                            // 864
            .attr('width', $$.width)                                                                                   // 865
            .attr('height', $$.height);                                                                                // 866
        // MEMO: parent div's height will be bigger than svg when <!DOCTYPE html>                                      // 867
        $$.selectChart.style('max-height', $$.currentHeight + "px");                                                   // 868
    };                                                                                                                 // 869
                                                                                                                       // 870
                                                                                                                       // 871
    c3_chart_internal_fn.updateDimension = function (withoutAxis) {                                                    // 872
        var $$ = this;                                                                                                 // 873
        if (!withoutAxis) {                                                                                            // 874
            if ($$.config.axis_rotated) {                                                                              // 875
                $$.axes.x.call($$.xAxis);                                                                              // 876
                $$.axes.subx.call($$.subXAxis);                                                                        // 877
            } else {                                                                                                   // 878
                $$.axes.y.call($$.yAxis);                                                                              // 879
                $$.axes.y2.call($$.y2Axis);                                                                            // 880
            }                                                                                                          // 881
        }                                                                                                              // 882
        $$.updateSizes();                                                                                              // 883
        $$.updateScales();                                                                                             // 884
        $$.updateSvgSize();                                                                                            // 885
        $$.transformAll(false);                                                                                        // 886
    };                                                                                                                 // 887
                                                                                                                       // 888
    c3_chart_internal_fn.observeInserted = function (selection) {                                                      // 889
        var $$ = this, observer;                                                                                       // 890
        if (typeof MutationObserver === 'undefined') {                                                                 // 891
            window.console.error("MutationObserver not defined.");                                                     // 892
            return;                                                                                                    // 893
        }                                                                                                              // 894
        observer= new MutationObserver(function (mutations) {                                                          // 895
            mutations.forEach(function (mutation) {                                                                    // 896
                if (mutation.type === 'childList' && mutation.previousSibling) {                                       // 897
                    observer.disconnect();                                                                             // 898
                    // need to wait for completion of load because size calculation requires the actual sizes determined after that completion
                    $$.intervalForObserveInserted = window.setInterval(function () {                                   // 900
                        // parentNode will NOT be null when completed                                                  // 901
                        if (selection.node().parentNode) {                                                             // 902
                            window.clearInterval($$.intervalForObserveInserted);                                       // 903
                            $$.updateDimension();                                                                      // 904
                            if ($$.brush) { $$.brush.update(); }                                                       // 905
                            $$.config.oninit.call($$);                                                                 // 906
                            $$.redraw({                                                                                // 907
                                withTransform: true,                                                                   // 908
                                withUpdateXDomain: true,                                                               // 909
                                withUpdateOrgXDomain: true,                                                            // 910
                                withTransition: false,                                                                 // 911
                                withTransitionForTransform: false,                                                     // 912
                                withLegend: true                                                                       // 913
                            });                                                                                        // 914
                            selection.transition().style('opacity', 1);                                                // 915
                        }                                                                                              // 916
                    }, 10);                                                                                            // 917
                }                                                                                                      // 918
            });                                                                                                        // 919
        });                                                                                                            // 920
        observer.observe(selection.node(), {attributes: true, childList: true, characterData: true});                  // 921
    };                                                                                                                 // 922
                                                                                                                       // 923
    c3_chart_internal_fn.bindResize = function () {                                                                    // 924
        var $$ = this, config = $$.config;                                                                             // 925
                                                                                                                       // 926
        $$.resizeFunction = $$.generateResize();                                                                       // 927
                                                                                                                       // 928
        $$.resizeFunction.add(function () {                                                                            // 929
            config.onresize.call($$);                                                                                  // 930
        });                                                                                                            // 931
        if (config.resize_auto) {                                                                                      // 932
            $$.resizeFunction.add(function () {                                                                        // 933
                if ($$.resizeTimeout !== undefined) {                                                                  // 934
                    window.clearTimeout($$.resizeTimeout);                                                             // 935
                }                                                                                                      // 936
                $$.resizeTimeout = window.setTimeout(function () {                                                     // 937
                    delete $$.resizeTimeout;                                                                           // 938
                    $$.api.flush();                                                                                    // 939
                }, 100);                                                                                               // 940
            });                                                                                                        // 941
        }                                                                                                              // 942
        $$.resizeFunction.add(function () {                                                                            // 943
            config.onresized.call($$);                                                                                 // 944
        });                                                                                                            // 945
                                                                                                                       // 946
        if (window.attachEvent) {                                                                                      // 947
            window.attachEvent('onresize', $$.resizeFunction);                                                         // 948
        } else if (window.addEventListener) {                                                                          // 949
            window.addEventListener('resize', $$.resizeFunction, false);                                               // 950
        } else {                                                                                                       // 951
            // fallback to this, if this is a very old browser                                                         // 952
            var wrapper = window.onresize;                                                                             // 953
            if (!wrapper) {                                                                                            // 954
                // create a wrapper that will call all charts                                                          // 955
                wrapper = $$.generateResize();                                                                         // 956
            } else if (!wrapper.add || !wrapper.remove) {                                                              // 957
                // there is already a handler registered, make sure we call it too                                     // 958
                wrapper = $$.generateResize();                                                                         // 959
                wrapper.add(window.onresize);                                                                          // 960
            }                                                                                                          // 961
            // add this graph to the wrapper, we will be removed if the user calls destroy                             // 962
            wrapper.add($$.resizeFunction);                                                                            // 963
            window.onresize = wrapper;                                                                                 // 964
        }                                                                                                              // 965
    };                                                                                                                 // 966
                                                                                                                       // 967
    c3_chart_internal_fn.generateResize = function () {                                                                // 968
        var resizeFunctions = [];                                                                                      // 969
        function callResizeFunctions() {                                                                               // 970
            resizeFunctions.forEach(function (f) {                                                                     // 971
                f();                                                                                                   // 972
            });                                                                                                        // 973
        }                                                                                                              // 974
        callResizeFunctions.add = function (f) {                                                                       // 975
            resizeFunctions.push(f);                                                                                   // 976
        };                                                                                                             // 977
        callResizeFunctions.remove = function (f) {                                                                    // 978
            for (var i = 0; i < resizeFunctions.length; i++) {                                                         // 979
                if (resizeFunctions[i] === f) {                                                                        // 980
                    resizeFunctions.splice(i, 1);                                                                      // 981
                    break;                                                                                             // 982
                }                                                                                                      // 983
            }                                                                                                          // 984
        };                                                                                                             // 985
        return callResizeFunctions;                                                                                    // 986
    };                                                                                                                 // 987
                                                                                                                       // 988
    c3_chart_internal_fn.endall = function (transition, callback) {                                                    // 989
        var n = 0;                                                                                                     // 990
        transition                                                                                                     // 991
            .each(function () { ++n; })                                                                                // 992
            .each("end", function () {                                                                                 // 993
                if (!--n) { callback.apply(this, arguments); }                                                         // 994
            });                                                                                                        // 995
    };                                                                                                                 // 996
    c3_chart_internal_fn.generateWait = function () {                                                                  // 997
        var transitionsToWait = [],                                                                                    // 998
            f = function (transition, callback) {                                                                      // 999
                var timer = setInterval(function () {                                                                  // 1000
                    var done = 0;                                                                                      // 1001
                    transitionsToWait.forEach(function (t) {                                                           // 1002
                        if (t.empty()) {                                                                               // 1003
                            done += 1;                                                                                 // 1004
                            return;                                                                                    // 1005
                        }                                                                                              // 1006
                        try {                                                                                          // 1007
                            t.transition();                                                                            // 1008
                        } catch (e) {                                                                                  // 1009
                            done += 1;                                                                                 // 1010
                        }                                                                                              // 1011
                    });                                                                                                // 1012
                    if (done === transitionsToWait.length) {                                                           // 1013
                        clearInterval(timer);                                                                          // 1014
                        if (callback) { callback(); }                                                                  // 1015
                    }                                                                                                  // 1016
                }, 10);                                                                                                // 1017
            };                                                                                                         // 1018
        f.add = function (transition) {                                                                                // 1019
            transitionsToWait.push(transition);                                                                        // 1020
        };                                                                                                             // 1021
        return f;                                                                                                      // 1022
    };                                                                                                                 // 1023
                                                                                                                       // 1024
    c3_chart_internal_fn.parseDate = function (date) {                                                                 // 1025
        var $$ = this, parsedDate;                                                                                     // 1026
        if (date instanceof Date) {                                                                                    // 1027
            parsedDate = date;                                                                                         // 1028
        } else if (typeof date === 'string') {                                                                         // 1029
            parsedDate = $$.dataTimeFormat($$.config.data_xFormat).parse(date);                                        // 1030
        } else if (typeof date === 'number' || !isNaN(date)) {                                                         // 1031
            parsedDate = new Date(+date);                                                                              // 1032
        }                                                                                                              // 1033
        if (!parsedDate || isNaN(+parsedDate)) {                                                                       // 1034
            window.console.error("Failed to parse x '" + date + "' to Date object");                                   // 1035
        }                                                                                                              // 1036
        return parsedDate;                                                                                             // 1037
    };                                                                                                                 // 1038
                                                                                                                       // 1039
    c3_chart_internal_fn.isTabVisible = function () {                                                                  // 1040
        var hidden;                                                                                                    // 1041
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support                  // 1042
            hidden = "hidden";                                                                                         // 1043
        } else if (typeof document.mozHidden !== "undefined") {                                                        // 1044
            hidden = "mozHidden";                                                                                      // 1045
        } else if (typeof document.msHidden !== "undefined") {                                                         // 1046
            hidden = "msHidden";                                                                                       // 1047
        } else if (typeof document.webkitHidden !== "undefined") {                                                     // 1048
            hidden = "webkitHidden";                                                                                   // 1049
        }                                                                                                              // 1050
                                                                                                                       // 1051
        return document[hidden] ? false : true;                                                                        // 1052
    };                                                                                                                 // 1053
                                                                                                                       // 1054
    c3_chart_internal_fn.getDefaultConfig = function () {                                                              // 1055
        var config = {                                                                                                 // 1056
            bindto: '#chart',                                                                                          // 1057
            size_width: undefined,                                                                                     // 1058
            size_height: undefined,                                                                                    // 1059
            padding_left: undefined,                                                                                   // 1060
            padding_right: undefined,                                                                                  // 1061
            padding_top: undefined,                                                                                    // 1062
            padding_bottom: undefined,                                                                                 // 1063
            resize_auto: true,                                                                                         // 1064
            zoom_enabled: false,                                                                                       // 1065
            zoom_extent: undefined,                                                                                    // 1066
            zoom_privileged: false,                                                                                    // 1067
            zoom_rescale: false,                                                                                       // 1068
            zoom_onzoom: function () {},                                                                               // 1069
            zoom_onzoomstart: function () {},                                                                          // 1070
            zoom_onzoomend: function () {},                                                                            // 1071
            zoom_x_min: undefined,                                                                                     // 1072
            zoom_x_max: undefined,                                                                                     // 1073
            interaction_enabled: true,                                                                                 // 1074
            onmouseover: function () {},                                                                               // 1075
            onmouseout: function () {},                                                                                // 1076
            onresize: function () {},                                                                                  // 1077
            onresized: function () {},                                                                                 // 1078
            oninit: function () {},                                                                                    // 1079
            onrendered: function () {},                                                                                // 1080
            transition_duration: 350,                                                                                  // 1081
            data_x: undefined,                                                                                         // 1082
            data_xs: {},                                                                                               // 1083
            data_xFormat: '%Y-%m-%d',                                                                                  // 1084
            data_xLocaltime: true,                                                                                     // 1085
            data_xSort: true,                                                                                          // 1086
            data_idConverter: function (id) { return id; },                                                            // 1087
            data_names: {},                                                                                            // 1088
            data_classes: {},                                                                                          // 1089
            data_groups: [],                                                                                           // 1090
            data_axes: {},                                                                                             // 1091
            data_type: undefined,                                                                                      // 1092
            data_types: {},                                                                                            // 1093
            data_labels: {},                                                                                           // 1094
            data_order: 'desc',                                                                                        // 1095
            data_regions: {},                                                                                          // 1096
            data_color: undefined,                                                                                     // 1097
            data_colors: {},                                                                                           // 1098
            data_hide: false,                                                                                          // 1099
            data_filter: undefined,                                                                                    // 1100
            data_selection_enabled: false,                                                                             // 1101
            data_selection_grouped: false,                                                                             // 1102
            data_selection_isselectable: function () { return true; },                                                 // 1103
            data_selection_multiple: true,                                                                             // 1104
            data_selection_draggable: false,                                                                           // 1105
            data_onclick: function () {},                                                                              // 1106
            data_onmouseover: function () {},                                                                          // 1107
            data_onmouseout: function () {},                                                                           // 1108
            data_onselected: function () {},                                                                           // 1109
            data_onunselected: function () {},                                                                         // 1110
            data_url: undefined,                                                                                       // 1111
            data_json: undefined,                                                                                      // 1112
            data_rows: undefined,                                                                                      // 1113
            data_columns: undefined,                                                                                   // 1114
            data_mimeType: undefined,                                                                                  // 1115
            data_keys: undefined,                                                                                      // 1116
            // configuration for no plot-able data supplied.                                                           // 1117
            data_empty_label_text: "",                                                                                 // 1118
            // subchart                                                                                                // 1119
            subchart_show: false,                                                                                      // 1120
            subchart_size_height: 60,                                                                                  // 1121
            subchart_axis_x_show: true,                                                                                // 1122
            subchart_onbrush: function () {},                                                                          // 1123
            // color                                                                                                   // 1124
            color_pattern: [],                                                                                         // 1125
            color_threshold: {},                                                                                       // 1126
            // legend                                                                                                  // 1127
            legend_show: true,                                                                                         // 1128
            legend_hide: false,                                                                                        // 1129
            legend_position: 'bottom',                                                                                 // 1130
            legend_inset_anchor: 'top-left',                                                                           // 1131
            legend_inset_x: 10,                                                                                        // 1132
            legend_inset_y: 0,                                                                                         // 1133
            legend_inset_step: undefined,                                                                              // 1134
            legend_item_onclick: undefined,                                                                            // 1135
            legend_item_onmouseover: undefined,                                                                        // 1136
            legend_item_onmouseout: undefined,                                                                         // 1137
            legend_equally: false,                                                                                     // 1138
            legend_padding: 0,                                                                                         // 1139
            legend_item_tile_width: 10,                                                                                // 1140
            legend_item_tile_height: 10,                                                                               // 1141
            // axis                                                                                                    // 1142
            axis_rotated: false,                                                                                       // 1143
            axis_x_show: true,                                                                                         // 1144
            axis_x_type: 'indexed',                                                                                    // 1145
            axis_x_localtime: true,                                                                                    // 1146
            axis_x_categories: [],                                                                                     // 1147
            axis_x_tick_centered: false,                                                                               // 1148
            axis_x_tick_format: undefined,                                                                             // 1149
            axis_x_tick_culling: {},                                                                                   // 1150
            axis_x_tick_culling_max: 10,                                                                               // 1151
            axis_x_tick_count: undefined,                                                                              // 1152
            axis_x_tick_fit: true,                                                                                     // 1153
            axis_x_tick_values: null,                                                                                  // 1154
            axis_x_tick_rotate: 0,                                                                                     // 1155
            axis_x_tick_outer: true,                                                                                   // 1156
            axis_x_tick_multiline: true,                                                                               // 1157
            axis_x_tick_width: null,                                                                                   // 1158
            axis_x_max: undefined,                                                                                     // 1159
            axis_x_min: undefined,                                                                                     // 1160
            axis_x_padding: {},                                                                                        // 1161
            axis_x_height: undefined,                                                                                  // 1162
            axis_x_extent: undefined,                                                                                  // 1163
            axis_x_label: {},                                                                                          // 1164
            axis_y_show: true,                                                                                         // 1165
            axis_y_type: undefined,                                                                                    // 1166
            axis_y_max: undefined,                                                                                     // 1167
            axis_y_min: undefined,                                                                                     // 1168
            axis_y_inverted: false,                                                                                    // 1169
            axis_y_center: undefined,                                                                                  // 1170
            axis_y_inner: undefined,                                                                                   // 1171
            axis_y_label: {},                                                                                          // 1172
            axis_y_tick_format: undefined,                                                                             // 1173
            axis_y_tick_outer: true,                                                                                   // 1174
            axis_y_tick_values: null,                                                                                  // 1175
            axis_y_tick_count: undefined,                                                                              // 1176
            axis_y_tick_time_value: undefined,                                                                         // 1177
            axis_y_tick_time_interval: undefined,                                                                      // 1178
            axis_y_padding: {},                                                                                        // 1179
            axis_y_default: undefined,                                                                                 // 1180
            axis_y2_show: false,                                                                                       // 1181
            axis_y2_max: undefined,                                                                                    // 1182
            axis_y2_min: undefined,                                                                                    // 1183
            axis_y2_inverted: false,                                                                                   // 1184
            axis_y2_center: undefined,                                                                                 // 1185
            axis_y2_inner: undefined,                                                                                  // 1186
            axis_y2_label: {},                                                                                         // 1187
            axis_y2_tick_format: undefined,                                                                            // 1188
            axis_y2_tick_outer: true,                                                                                  // 1189
            axis_y2_tick_values: null,                                                                                 // 1190
            axis_y2_tick_count: undefined,                                                                             // 1191
            axis_y2_padding: {},                                                                                       // 1192
            axis_y2_default: undefined,                                                                                // 1193
            // grid                                                                                                    // 1194
            grid_x_show: false,                                                                                        // 1195
            grid_x_type: 'tick',                                                                                       // 1196
            grid_x_lines: [],                                                                                          // 1197
            grid_y_show: false,                                                                                        // 1198
            // not used                                                                                                // 1199
            // grid_y_type: 'tick',                                                                                    // 1200
            grid_y_lines: [],                                                                                          // 1201
            grid_y_ticks: 10,                                                                                          // 1202
            grid_focus_show: true,                                                                                     // 1203
            grid_lines_front: true,                                                                                    // 1204
            // point - point of each data                                                                              // 1205
            point_show: true,                                                                                          // 1206
            point_r: 2.5,                                                                                              // 1207
            point_sensitivity: 10,                                                                                     // 1208
            point_focus_expand_enabled: true,                                                                          // 1209
            point_focus_expand_r: undefined,                                                                           // 1210
            point_select_r: undefined,                                                                                 // 1211
            // line                                                                                                    // 1212
            line_connectNull: false,                                                                                   // 1213
            line_step_type: 'step',                                                                                    // 1214
            // bar                                                                                                     // 1215
            bar_width: undefined,                                                                                      // 1216
            bar_width_ratio: 0.6,                                                                                      // 1217
            bar_width_max: undefined,                                                                                  // 1218
            bar_zerobased: true,                                                                                       // 1219
            // area                                                                                                    // 1220
            area_zerobased: true,                                                                                      // 1221
            // pie                                                                                                     // 1222
            pie_label_show: true,                                                                                      // 1223
            pie_label_format: undefined,                                                                               // 1224
            pie_label_threshold: 0.05,                                                                                 // 1225
            pie_expand: {},                                                                                            // 1226
            pie_expand_duration: 50,                                                                                   // 1227
            // gauge                                                                                                   // 1228
            gauge_label_show: true,                                                                                    // 1229
            gauge_label_format: undefined,                                                                             // 1230
            gauge_min: 0,                                                                                              // 1231
            gauge_max: 100,                                                                                            // 1232
            gauge_units: undefined,                                                                                    // 1233
            gauge_width: undefined,                                                                                    // 1234
            gauge_expand: {},                                                                                          // 1235
            gauge_expand_duration: 50,                                                                                 // 1236
            // donut                                                                                                   // 1237
            donut_label_show: true,                                                                                    // 1238
            donut_label_format: undefined,                                                                             // 1239
            donut_label_threshold: 0.05,                                                                               // 1240
            donut_width: undefined,                                                                                    // 1241
            donut_title: "",                                                                                           // 1242
            donut_expand: {},                                                                                          // 1243
            donut_expand_duration: 50,                                                                                 // 1244
            // region - region to change style                                                                         // 1245
            regions: [],                                                                                               // 1246
            // tooltip - show when mouseover on each data                                                              // 1247
            tooltip_show: true,                                                                                        // 1248
            tooltip_grouped: true,                                                                                     // 1249
            tooltip_format_title: undefined,                                                                           // 1250
            tooltip_format_name: undefined,                                                                            // 1251
            tooltip_format_value: undefined,                                                                           // 1252
            tooltip_position: undefined,                                                                               // 1253
            tooltip_contents: function (d, defaultTitleFormat, defaultValueFormat, color) {                            // 1254
                return this.getTooltipContent ? this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) : '';
            },                                                                                                         // 1256
            tooltip_init_show: false,                                                                                  // 1257
            tooltip_init_x: 0,                                                                                         // 1258
            tooltip_init_position: {top: '0px', left: '50px'},                                                         // 1259
            tooltip_onshow: function () {},                                                                            // 1260
            tooltip_onhide: function () {},                                                                            // 1261
            // title                                                                                                   // 1262
            title_text: undefined,                                                                                     // 1263
            title_padding: {                                                                                           // 1264
                top: 0,                                                                                                // 1265
                right: 0,                                                                                              // 1266
                bottom: 0,                                                                                             // 1267
                left: 0                                                                                                // 1268
            },                                                                                                         // 1269
            title_position: 'top-center',                                                                              // 1270
        };                                                                                                             // 1271
                                                                                                                       // 1272
        Object.keys(this.additionalConfig).forEach(function (key) {                                                    // 1273
            config[key] = this.additionalConfig[key];                                                                  // 1274
        }, this);                                                                                                      // 1275
                                                                                                                       // 1276
        return config;                                                                                                 // 1277
    };                                                                                                                 // 1278
    c3_chart_internal_fn.additionalConfig = {};                                                                        // 1279
                                                                                                                       // 1280
    c3_chart_internal_fn.loadConfig = function (config) {                                                              // 1281
        var this_config = this.config, target, keys, read;                                                             // 1282
        function find() {                                                                                              // 1283
            var key = keys.shift();                                                                                    // 1284
    //        console.log("key =>", key, ", target =>", target);                                                       // 1285
            if (key && target && typeof target === 'object' && key in target) {                                        // 1286
                target = target[key];                                                                                  // 1287
                return find();                                                                                         // 1288
            }                                                                                                          // 1289
            else if (!key) {                                                                                           // 1290
                return target;                                                                                         // 1291
            }                                                                                                          // 1292
            else {                                                                                                     // 1293
                return undefined;                                                                                      // 1294
            }                                                                                                          // 1295
        }                                                                                                              // 1296
        Object.keys(this_config).forEach(function (key) {                                                              // 1297
            target = config;                                                                                           // 1298
            keys = key.split('_');                                                                                     // 1299
            read = find();                                                                                             // 1300
    //        console.log("CONFIG : ", key, read);                                                                     // 1301
            if (isDefined(read)) {                                                                                     // 1302
                this_config[key] = read;                                                                               // 1303
            }                                                                                                          // 1304
        });                                                                                                            // 1305
    };                                                                                                                 // 1306
                                                                                                                       // 1307
    c3_chart_internal_fn.getScale = function (min, max, forTimeseries) {                                               // 1308
        return (forTimeseries ? this.d3.time.scale() : this.d3.scale.linear()).range([min, max]);                      // 1309
    };                                                                                                                 // 1310
    c3_chart_internal_fn.getX = function (min, max, domain, offset) {                                                  // 1311
        var $$ = this,                                                                                                 // 1312
            scale = $$.getScale(min, max, $$.isTimeSeries()),                                                          // 1313
            _scale = domain ? scale.domain(domain) : scale, key;                                                       // 1314
        // Define customized scale if categorized axis                                                                 // 1315
        if ($$.isCategorized()) {                                                                                      // 1316
            offset = offset || function () { return 0; };                                                              // 1317
            scale = function (d, raw) {                                                                                // 1318
                var v = _scale(d) + offset(d);                                                                         // 1319
                return raw ? v : Math.ceil(v);                                                                         // 1320
            };                                                                                                         // 1321
        } else {                                                                                                       // 1322
            scale = function (d, raw) {                                                                                // 1323
                var v = _scale(d);                                                                                     // 1324
                return raw ? v : Math.ceil(v);                                                                         // 1325
            };                                                                                                         // 1326
        }                                                                                                              // 1327
        // define functions                                                                                            // 1328
        for (key in _scale) {                                                                                          // 1329
            scale[key] = _scale[key];                                                                                  // 1330
        }                                                                                                              // 1331
        scale.orgDomain = function () {                                                                                // 1332
            return _scale.domain();                                                                                    // 1333
        };                                                                                                             // 1334
        // define custom domain() for categorized axis                                                                 // 1335
        if ($$.isCategorized()) {                                                                                      // 1336
            scale.domain = function (domain) {                                                                         // 1337
                if (!arguments.length) {                                                                               // 1338
                    domain = this.orgDomain();                                                                         // 1339
                    return [domain[0], domain[1] + 1];                                                                 // 1340
                }                                                                                                      // 1341
                _scale.domain(domain);                                                                                 // 1342
                return scale;                                                                                          // 1343
            };                                                                                                         // 1344
        }                                                                                                              // 1345
        return scale;                                                                                                  // 1346
    };                                                                                                                 // 1347
    c3_chart_internal_fn.getY = function (min, max, domain) {                                                          // 1348
        var scale = this.getScale(min, max, this.isTimeSeriesY());                                                     // 1349
        if (domain) { scale.domain(domain); }                                                                          // 1350
        return scale;                                                                                                  // 1351
    };                                                                                                                 // 1352
    c3_chart_internal_fn.getYScale = function (id) {                                                                   // 1353
        return this.axis.getId(id) === 'y2' ? this.y2 : this.y;                                                        // 1354
    };                                                                                                                 // 1355
    c3_chart_internal_fn.getSubYScale = function (id) {                                                                // 1356
        return this.axis.getId(id) === 'y2' ? this.subY2 : this.subY;                                                  // 1357
    };                                                                                                                 // 1358
    c3_chart_internal_fn.updateScales = function () {                                                                  // 1359
        var $$ = this, config = $$.config,                                                                             // 1360
            forInit = !$$.x;                                                                                           // 1361
        // update edges                                                                                                // 1362
        $$.xMin = config.axis_rotated ? 1 : 0;                                                                         // 1363
        $$.xMax = config.axis_rotated ? $$.height : $$.width;                                                          // 1364
        $$.yMin = config.axis_rotated ? 0 : $$.height;                                                                 // 1365
        $$.yMax = config.axis_rotated ? $$.width : 1;                                                                  // 1366
        $$.subXMin = $$.xMin;                                                                                          // 1367
        $$.subXMax = $$.xMax;                                                                                          // 1368
        $$.subYMin = config.axis_rotated ? 0 : $$.height2;                                                             // 1369
        $$.subYMax = config.axis_rotated ? $$.width2 : 1;                                                              // 1370
        // update scales                                                                                               // 1371
        $$.x = $$.getX($$.xMin, $$.xMax, forInit ? undefined : $$.x.orgDomain(), function () { return $$.xAxis.tickOffset(); });
        $$.y = $$.getY($$.yMin, $$.yMax, forInit ? config.axis_y_default : $$.y.domain());                             // 1373
        $$.y2 = $$.getY($$.yMin, $$.yMax, forInit ? config.axis_y2_default : $$.y2.domain());                          // 1374
        $$.subX = $$.getX($$.xMin, $$.xMax, $$.orgXDomain, function (d) { return d % 1 ? 0 : $$.subXAxis.tickOffset(); });
        $$.subY = $$.getY($$.subYMin, $$.subYMax, forInit ? config.axis_y_default : $$.subY.domain());                 // 1376
        $$.subY2 = $$.getY($$.subYMin, $$.subYMax, forInit ? config.axis_y2_default : $$.subY2.domain());              // 1377
        // update axes                                                                                                 // 1378
        $$.xAxisTickFormat = $$.axis.getXAxisTickFormat();                                                             // 1379
        $$.xAxisTickValues = $$.axis.getXAxisTickValues();                                                             // 1380
        $$.yAxisTickValues = $$.axis.getYAxisTickValues();                                                             // 1381
        $$.y2AxisTickValues = $$.axis.getY2AxisTickValues();                                                           // 1382
                                                                                                                       // 1383
        $$.xAxis = $$.axis.getXAxis($$.x, $$.xOrient, $$.xAxisTickFormat, $$.xAxisTickValues, config.axis_x_tick_outer);
        $$.subXAxis = $$.axis.getXAxis($$.subX, $$.subXOrient, $$.xAxisTickFormat, $$.xAxisTickValues, config.axis_x_tick_outer);
        $$.yAxis = $$.axis.getYAxis($$.y, $$.yOrient, config.axis_y_tick_format, $$.yAxisTickValues, config.axis_y_tick_outer);
        $$.y2Axis = $$.axis.getYAxis($$.y2, $$.y2Orient, config.axis_y2_tick_format, $$.y2AxisTickValues, config.axis_y2_tick_outer);
                                                                                                                       // 1388
        // Set initialized scales to brush and zoom                                                                    // 1389
        if (!forInit) {                                                                                                // 1390
            if ($$.brush) { $$.brush.scale($$.subX); }                                                                 // 1391
            if (config.zoom_enabled) { $$.zoom.scale($$.x); }                                                          // 1392
        }                                                                                                              // 1393
        // update for arc                                                                                              // 1394
        if ($$.updateArc) { $$.updateArc(); }                                                                          // 1395
    };                                                                                                                 // 1396
                                                                                                                       // 1397
    c3_chart_internal_fn.getYDomainMin = function (targets) {                                                          // 1398
        var $$ = this, config = $$.config,                                                                             // 1399
            ids = $$.mapToIds(targets), ys = $$.getValuesAsIdKeyed(targets),                                           // 1400
            j, k, baseId, idsInGroup, id, hasNegativeValue;                                                            // 1401
        if (config.data_groups.length > 0) {                                                                           // 1402
            hasNegativeValue = $$.hasNegativeValueInTargets(targets);                                                  // 1403
            for (j = 0; j < config.data_groups.length; j++) {                                                          // 1404
                // Determine baseId                                                                                    // 1405
                idsInGroup = config.data_groups[j].filter(function (id) { return ids.indexOf(id) >= 0; });             // 1406
                if (idsInGroup.length === 0) { continue; }                                                             // 1407
                baseId = idsInGroup[0];                                                                                // 1408
                // Consider negative values                                                                            // 1409
                if (hasNegativeValue && ys[baseId]) {                                                                  // 1410
                    ys[baseId].forEach(function (v, i) {                                                               // 1411
                        ys[baseId][i] = v < 0 ? v : 0;                                                                 // 1412
                    });                                                                                                // 1413
                }                                                                                                      // 1414
                // Compute min                                                                                         // 1415
                for (k = 1; k < idsInGroup.length; k++) {                                                              // 1416
                    id = idsInGroup[k];                                                                                // 1417
                    if (! ys[id]) { continue; }                                                                        // 1418
                    ys[id].forEach(function (v, i) {                                                                   // 1419
                        if ($$.axis.getId(id) === $$.axis.getId(baseId) && ys[baseId] && !(hasNegativeValue && +v > 0)) {
                            ys[baseId][i] += +v;                                                                       // 1421
                        }                                                                                              // 1422
                    });                                                                                                // 1423
                }                                                                                                      // 1424
            }                                                                                                          // 1425
        }                                                                                                              // 1426
        return $$.d3.min(Object.keys(ys).map(function (key) { return $$.d3.min(ys[key]); }));                          // 1427
    };                                                                                                                 // 1428
    c3_chart_internal_fn.getYDomainMax = function (targets) {                                                          // 1429
        var $$ = this, config = $$.config,                                                                             // 1430
            ids = $$.mapToIds(targets), ys = $$.getValuesAsIdKeyed(targets),                                           // 1431
            j, k, baseId, idsInGroup, id, hasPositiveValue;                                                            // 1432
        if (config.data_groups.length > 0) {                                                                           // 1433
            hasPositiveValue = $$.hasPositiveValueInTargets(targets);                                                  // 1434
            for (j = 0; j < config.data_groups.length; j++) {                                                          // 1435
                // Determine baseId                                                                                    // 1436
                idsInGroup = config.data_groups[j].filter(function (id) { return ids.indexOf(id) >= 0; });             // 1437
                if (idsInGroup.length === 0) { continue; }                                                             // 1438
                baseId = idsInGroup[0];                                                                                // 1439
                // Consider positive values                                                                            // 1440
                if (hasPositiveValue && ys[baseId]) {                                                                  // 1441
                    ys[baseId].forEach(function (v, i) {                                                               // 1442
                        ys[baseId][i] = v > 0 ? v : 0;                                                                 // 1443
                    });                                                                                                // 1444
                }                                                                                                      // 1445
                // Compute max                                                                                         // 1446
                for (k = 1; k < idsInGroup.length; k++) {                                                              // 1447
                    id = idsInGroup[k];                                                                                // 1448
                    if (! ys[id]) { continue; }                                                                        // 1449
                    ys[id].forEach(function (v, i) {                                                                   // 1450
                        if ($$.axis.getId(id) === $$.axis.getId(baseId) && ys[baseId] && !(hasPositiveValue && +v < 0)) {
                            ys[baseId][i] += +v;                                                                       // 1452
                        }                                                                                              // 1453
                    });                                                                                                // 1454
                }                                                                                                      // 1455
            }                                                                                                          // 1456
        }                                                                                                              // 1457
        return $$.d3.max(Object.keys(ys).map(function (key) { return $$.d3.max(ys[key]); }));                          // 1458
    };                                                                                                                 // 1459
    c3_chart_internal_fn.getYDomain = function (targets, axisId, xDomain) {                                            // 1460
        var $$ = this, config = $$.config,                                                                             // 1461
            targetsByAxisId = targets.filter(function (t) { return $$.axis.getId(t.id) === axisId; }),                 // 1462
            yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId,                       // 1463
            yMin = axisId === 'y2' ? config.axis_y2_min : config.axis_y_min,                                           // 1464
            yMax = axisId === 'y2' ? config.axis_y2_max : config.axis_y_max,                                           // 1465
            yDomainMin = $$.getYDomainMin(yTargets),                                                                   // 1466
            yDomainMax = $$.getYDomainMax(yTargets),                                                                   // 1467
            domain, domainLength, padding, padding_top, padding_bottom,                                                // 1468
            center = axisId === 'y2' ? config.axis_y2_center : config.axis_y_center,                                   // 1469
            yDomainAbs, lengths, diff, ratio, isAllPositive, isAllNegative,                                            // 1470
            isZeroBased = ($$.hasType('bar', yTargets) && config.bar_zerobased) || ($$.hasType('area', yTargets) && config.area_zerobased),
            isInverted = axisId === 'y2' ? config.axis_y2_inverted : config.axis_y_inverted,                           // 1472
            showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated,                                        // 1473
            showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated;                                         // 1474
                                                                                                                       // 1475
        // MEMO: avoid inverting domain unexpectedly                                                                   // 1476
        yDomainMin = isValue(yMin) ? yMin : isValue(yMax) ? (yDomainMin < yMax ? yDomainMin : yMax - 10) : yDomainMin;
        yDomainMax = isValue(yMax) ? yMax : isValue(yMin) ? (yMin < yDomainMax ? yDomainMax : yMin + 10) : yDomainMax;
                                                                                                                       // 1479
        if (yTargets.length === 0) { // use current domain if target of axisId is none                                 // 1480
            return axisId === 'y2' ? $$.y2.domain() : $$.y.domain();                                                   // 1481
        }                                                                                                              // 1482
        if (isNaN(yDomainMin)) { // set minimum to zero when not number                                                // 1483
            yDomainMin = 0;                                                                                            // 1484
        }                                                                                                              // 1485
        if (isNaN(yDomainMax)) { // set maximum to have same value as yDomainMin                                       // 1486
            yDomainMax = yDomainMin;                                                                                   // 1487
        }                                                                                                              // 1488
        if (yDomainMin === yDomainMax) {                                                                               // 1489
            yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0;                                                          // 1490
        }                                                                                                              // 1491
        isAllPositive = yDomainMin >= 0 && yDomainMax >= 0;                                                            // 1492
        isAllNegative = yDomainMin <= 0 && yDomainMax <= 0;                                                            // 1493
                                                                                                                       // 1494
        // Cancel zerobased if axis_*_min / axis_*_max specified                                                       // 1495
        if ((isValue(yMin) && isAllPositive) || (isValue(yMax) && isAllNegative)) {                                    // 1496
            isZeroBased = false;                                                                                       // 1497
        }                                                                                                              // 1498
                                                                                                                       // 1499
        // Bar/Area chart should be 0-based if all positive|negative                                                   // 1500
        if (isZeroBased) {                                                                                             // 1501
            if (isAllPositive) { yDomainMin = 0; }                                                                     // 1502
            if (isAllNegative) { yDomainMax = 0; }                                                                     // 1503
        }                                                                                                              // 1504
                                                                                                                       // 1505
        domainLength = Math.abs(yDomainMax - yDomainMin);                                                              // 1506
        padding = padding_top = padding_bottom = domainLength * 0.1;                                                   // 1507
                                                                                                                       // 1508
        if (typeof center !== 'undefined') {                                                                           // 1509
            yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));                                         // 1510
            yDomainMax = center + yDomainAbs;                                                                          // 1511
            yDomainMin = center - yDomainAbs;                                                                          // 1512
        }                                                                                                              // 1513
        // add padding for data label                                                                                  // 1514
        if (showHorizontalDataLabel) {                                                                                 // 1515
            lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, 'width');                                          // 1516
            diff = diffDomain($$.y.range());                                                                           // 1517
            ratio = [lengths[0] / diff, lengths[1] / diff];                                                            // 1518
            padding_top += domainLength * (ratio[1] / (1 - ratio[0] - ratio[1]));                                      // 1519
            padding_bottom += domainLength * (ratio[0] / (1 - ratio[0] - ratio[1]));                                   // 1520
        } else if (showVerticalDataLabel) {                                                                            // 1521
            lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, 'height');                                         // 1522
            padding_top += $$.axis.convertPixelsToAxisPadding(lengths[1], domainLength);                               // 1523
            padding_bottom += $$.axis.convertPixelsToAxisPadding(lengths[0], domainLength);                            // 1524
        }                                                                                                              // 1525
        if (axisId === 'y' && notEmpty(config.axis_y_padding)) {                                                       // 1526
            padding_top = $$.axis.getPadding(config.axis_y_padding, 'top', padding_top, domainLength);                 // 1527
            padding_bottom = $$.axis.getPadding(config.axis_y_padding, 'bottom', padding_bottom, domainLength);        // 1528
        }                                                                                                              // 1529
        if (axisId === 'y2' && notEmpty(config.axis_y2_padding)) {                                                     // 1530
            padding_top = $$.axis.getPadding(config.axis_y2_padding, 'top', padding_top, domainLength);                // 1531
            padding_bottom = $$.axis.getPadding(config.axis_y2_padding, 'bottom', padding_bottom, domainLength);       // 1532
        }                                                                                                              // 1533
        // Bar/Area chart should be 0-based if all positive|negative                                                   // 1534
        if (isZeroBased) {                                                                                             // 1535
            if (isAllPositive) { padding_bottom = yDomainMin; }                                                        // 1536
            if (isAllNegative) { padding_top = -yDomainMax; }                                                          // 1537
        }                                                                                                              // 1538
        domain = [yDomainMin - padding_bottom, yDomainMax + padding_top];                                              // 1539
        return isInverted ? domain.reverse() : domain;                                                                 // 1540
    };                                                                                                                 // 1541
    c3_chart_internal_fn.getXDomainMin = function (targets) {                                                          // 1542
        var $$ = this, config = $$.config;                                                                             // 1543
        return isDefined(config.axis_x_min) ?                                                                          // 1544
            ($$.isTimeSeries() ? this.parseDate(config.axis_x_min) : config.axis_x_min) :                              // 1545
        $$.d3.min(targets, function (t) { return $$.d3.min(t.values, function (v) { return v.x; }); });                // 1546
    };                                                                                                                 // 1547
    c3_chart_internal_fn.getXDomainMax = function (targets) {                                                          // 1548
        var $$ = this, config = $$.config;                                                                             // 1549
        return isDefined(config.axis_x_max) ?                                                                          // 1550
            ($$.isTimeSeries() ? this.parseDate(config.axis_x_max) : config.axis_x_max) :                              // 1551
        $$.d3.max(targets, function (t) { return $$.d3.max(t.values, function (v) { return v.x; }); });                // 1552
    };                                                                                                                 // 1553
    c3_chart_internal_fn.getXDomainPadding = function (domain) {                                                       // 1554
        var $$ = this, config = $$.config,                                                                             // 1555
            diff = domain[1] - domain[0],                                                                              // 1556
            maxDataCount, padding, paddingLeft, paddingRight;                                                          // 1557
        if ($$.isCategorized()) {                                                                                      // 1558
            padding = 0;                                                                                               // 1559
        } else if ($$.hasType('bar')) {                                                                                // 1560
            maxDataCount = $$.getMaxDataCount();                                                                       // 1561
            padding = maxDataCount > 1 ? (diff / (maxDataCount - 1)) / 2 : 0.5;                                        // 1562
        } else {                                                                                                       // 1563
            padding = diff * 0.01;                                                                                     // 1564
        }                                                                                                              // 1565
        if (typeof config.axis_x_padding === 'object' && notEmpty(config.axis_x_padding)) {                            // 1566
            paddingLeft = isValue(config.axis_x_padding.left) ? config.axis_x_padding.left : padding;                  // 1567
            paddingRight = isValue(config.axis_x_padding.right) ? config.axis_x_padding.right : padding;               // 1568
        } else if (typeof config.axis_x_padding === 'number') {                                                        // 1569
            paddingLeft = paddingRight = config.axis_x_padding;                                                        // 1570
        } else {                                                                                                       // 1571
            paddingLeft = paddingRight = padding;                                                                      // 1572
        }                                                                                                              // 1573
        return {left: paddingLeft, right: paddingRight};                                                               // 1574
    };                                                                                                                 // 1575
    c3_chart_internal_fn.getXDomain = function (targets) {                                                             // 1576
        var $$ = this,                                                                                                 // 1577
            xDomain = [$$.getXDomainMin(targets), $$.getXDomainMax(targets)],                                          // 1578
            firstX = xDomain[0], lastX = xDomain[1],                                                                   // 1579
            padding = $$.getXDomainPadding(xDomain),                                                                   // 1580
            min = 0, max = 0;                                                                                          // 1581
        // show center of x domain if min and max are the same                                                         // 1582
        if ((firstX - lastX) === 0 && !$$.isCategorized()) {                                                           // 1583
            if ($$.isTimeSeries()) {                                                                                   // 1584
                firstX = new Date(firstX.getTime() * 0.5);                                                             // 1585
                lastX = new Date(lastX.getTime() * 1.5);                                                               // 1586
            } else {                                                                                                   // 1587
                firstX = firstX === 0 ? 1 : (firstX * 0.5);                                                            // 1588
                lastX = lastX === 0 ? -1 : (lastX * 1.5);                                                              // 1589
            }                                                                                                          // 1590
        }                                                                                                              // 1591
        if (firstX || firstX === 0) {                                                                                  // 1592
            min = $$.isTimeSeries() ? new Date(firstX.getTime() - padding.left) : firstX - padding.left;               // 1593
        }                                                                                                              // 1594
        if (lastX || lastX === 0) {                                                                                    // 1595
            max = $$.isTimeSeries() ? new Date(lastX.getTime() + padding.right) : lastX + padding.right;               // 1596
        }                                                                                                              // 1597
        return [min, max];                                                                                             // 1598
    };                                                                                                                 // 1599
    c3_chart_internal_fn.updateXDomain = function (targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
        var $$ = this, config = $$.config;                                                                             // 1601
                                                                                                                       // 1602
        if (withUpdateOrgXDomain) {                                                                                    // 1603
            $$.x.domain(domain ? domain : $$.d3.extent($$.getXDomain(targets)));                                       // 1604
            $$.orgXDomain = $$.x.domain();                                                                             // 1605
            if (config.zoom_enabled) { $$.zoom.scale($$.x).updateScaleExtent(); }                                      // 1606
            $$.subX.domain($$.x.domain());                                                                             // 1607
            if ($$.brush) { $$.brush.scale($$.subX); }                                                                 // 1608
        }                                                                                                              // 1609
        if (withUpdateXDomain) {                                                                                       // 1610
            $$.x.domain(domain ? domain : (!$$.brush || $$.brush.empty()) ? $$.orgXDomain : $$.brush.extent());        // 1611
            if (config.zoom_enabled) { $$.zoom.scale($$.x).updateScaleExtent(); }                                      // 1612
        }                                                                                                              // 1613
                                                                                                                       // 1614
        // Trim domain when too big by zoom mousemove event                                                            // 1615
        if (withTrim) { $$.x.domain($$.trimXDomain($$.x.orgDomain())); }                                               // 1616
                                                                                                                       // 1617
        return $$.x.domain();                                                                                          // 1618
    };                                                                                                                 // 1619
    c3_chart_internal_fn.trimXDomain = function (domain) {                                                             // 1620
        var zoomDomain = this.getZoomDomain(),                                                                         // 1621
            min = zoomDomain[0], max = zoomDomain[1];                                                                  // 1622
        if (domain[0] <= min) {                                                                                        // 1623
            domain[1] = +domain[1] + (min - domain[0]);                                                                // 1624
            domain[0] = min;                                                                                           // 1625
        }                                                                                                              // 1626
        if (max <= domain[1]) {                                                                                        // 1627
            domain[0] = +domain[0] - (domain[1] - max);                                                                // 1628
            domain[1] = max;                                                                                           // 1629
        }                                                                                                              // 1630
        return domain;                                                                                                 // 1631
    };                                                                                                                 // 1632
                                                                                                                       // 1633
    c3_chart_internal_fn.isX = function (key) {                                                                        // 1634
        var $$ = this, config = $$.config;                                                                             // 1635
        return (config.data_x && key === config.data_x) || (notEmpty(config.data_xs) && hasValue(config.data_xs, key));
    };                                                                                                                 // 1637
    c3_chart_internal_fn.isNotX = function (key) {                                                                     // 1638
        return !this.isX(key);                                                                                         // 1639
    };                                                                                                                 // 1640
    c3_chart_internal_fn.getXKey = function (id) {                                                                     // 1641
        var $$ = this, config = $$.config;                                                                             // 1642
        return config.data_x ? config.data_x : notEmpty(config.data_xs) ? config.data_xs[id] : null;                   // 1643
    };                                                                                                                 // 1644
    c3_chart_internal_fn.getXValuesOfXKey = function (key, targets) {                                                  // 1645
        var $$ = this,                                                                                                 // 1646
            xValues, ids = targets && notEmpty(targets) ? $$.mapToIds(targets) : [];                                   // 1647
        ids.forEach(function (id) {                                                                                    // 1648
            if ($$.getXKey(id) === key) {                                                                              // 1649
                xValues = $$.data.xs[id];                                                                              // 1650
            }                                                                                                          // 1651
        });                                                                                                            // 1652
        return xValues;                                                                                                // 1653
    };                                                                                                                 // 1654
    c3_chart_internal_fn.getIndexByX = function (x) {                                                                  // 1655
        var $$ = this,                                                                                                 // 1656
            data = $$.filterByX($$.data.targets, x);                                                                   // 1657
        return data.length ? data[0].index : null;                                                                     // 1658
    };                                                                                                                 // 1659
    c3_chart_internal_fn.getXValue = function (id, i) {                                                                // 1660
        var $$ = this;                                                                                                 // 1661
        return id in $$.data.xs && $$.data.xs[id] && isValue($$.data.xs[id][i]) ? $$.data.xs[id][i] : i;               // 1662
    };                                                                                                                 // 1663
    c3_chart_internal_fn.getOtherTargetXs = function () {                                                              // 1664
        var $$ = this,                                                                                                 // 1665
            idsForX = Object.keys($$.data.xs);                                                                         // 1666
        return idsForX.length ? $$.data.xs[idsForX[0]] : null;                                                         // 1667
    };                                                                                                                 // 1668
    c3_chart_internal_fn.getOtherTargetX = function (index) {                                                          // 1669
        var xs = this.getOtherTargetXs();                                                                              // 1670
        return xs && index < xs.length ? xs[index] : null;                                                             // 1671
    };                                                                                                                 // 1672
    c3_chart_internal_fn.addXs = function (xs) {                                                                       // 1673
        var $$ = this;                                                                                                 // 1674
        Object.keys(xs).forEach(function (id) {                                                                        // 1675
            $$.config.data_xs[id] = xs[id];                                                                            // 1676
        });                                                                                                            // 1677
    };                                                                                                                 // 1678
    c3_chart_internal_fn.hasMultipleX = function (xs) {                                                                // 1679
        return this.d3.set(Object.keys(xs).map(function (id) { return xs[id]; })).size() > 1;                          // 1680
    };                                                                                                                 // 1681
    c3_chart_internal_fn.isMultipleX = function () {                                                                   // 1682
        return notEmpty(this.config.data_xs) || !this.config.data_xSort || this.hasType('scatter');                    // 1683
    };                                                                                                                 // 1684
    c3_chart_internal_fn.addName = function (data) {                                                                   // 1685
        var $$ = this, name;                                                                                           // 1686
        if (data) {                                                                                                    // 1687
            name = $$.config.data_names[data.id];                                                                      // 1688
            data.name = name !== undefined ? name : data.id;                                                           // 1689
        }                                                                                                              // 1690
        return data;                                                                                                   // 1691
    };                                                                                                                 // 1692
    c3_chart_internal_fn.getValueOnIndex = function (values, index) {                                                  // 1693
        var valueOnIndex = values.filter(function (v) { return v.index === index; });                                  // 1694
        return valueOnIndex.length ? valueOnIndex[0] : null;                                                           // 1695
    };                                                                                                                 // 1696
    c3_chart_internal_fn.updateTargetX = function (targets, x) {                                                       // 1697
        var $$ = this;                                                                                                 // 1698
        targets.forEach(function (t) {                                                                                 // 1699
            t.values.forEach(function (v, i) {                                                                         // 1700
                v.x = $$.generateTargetX(x[i], t.id, i);                                                               // 1701
            });                                                                                                        // 1702
            $$.data.xs[t.id] = x;                                                                                      // 1703
        });                                                                                                            // 1704
    };                                                                                                                 // 1705
    c3_chart_internal_fn.updateTargetXs = function (targets, xs) {                                                     // 1706
        var $$ = this;                                                                                                 // 1707
        targets.forEach(function (t) {                                                                                 // 1708
            if (xs[t.id]) {                                                                                            // 1709
                $$.updateTargetX([t], xs[t.id]);                                                                       // 1710
            }                                                                                                          // 1711
        });                                                                                                            // 1712
    };                                                                                                                 // 1713
    c3_chart_internal_fn.generateTargetX = function (rawX, id, index) {                                                // 1714
        var $$ = this, x;                                                                                              // 1715
        if ($$.isTimeSeries()) {                                                                                       // 1716
            x = rawX ? $$.parseDate(rawX) : $$.parseDate($$.getXValue(id, index));                                     // 1717
        }                                                                                                              // 1718
        else if ($$.isCustomX() && !$$.isCategorized()) {                                                              // 1719
            x = isValue(rawX) ? +rawX : $$.getXValue(id, index);                                                       // 1720
        }                                                                                                              // 1721
        else {                                                                                                         // 1722
            x = index;                                                                                                 // 1723
        }                                                                                                              // 1724
        return x;                                                                                                      // 1725
    };                                                                                                                 // 1726
    c3_chart_internal_fn.cloneTarget = function (target) {                                                             // 1727
        return {                                                                                                       // 1728
            id : target.id,                                                                                            // 1729
            id_org : target.id_org,                                                                                    // 1730
            values : target.values.map(function (d) {                                                                  // 1731
                return {x: d.x, value: d.value, id: d.id};                                                             // 1732
            })                                                                                                         // 1733
        };                                                                                                             // 1734
    };                                                                                                                 // 1735
    c3_chart_internal_fn.updateXs = function () {                                                                      // 1736
        var $$ = this;                                                                                                 // 1737
        if ($$.data.targets.length) {                                                                                  // 1738
            $$.xs = [];                                                                                                // 1739
            $$.data.targets[0].values.forEach(function (v) {                                                           // 1740
                $$.xs[v.index] = v.x;                                                                                  // 1741
            });                                                                                                        // 1742
        }                                                                                                              // 1743
    };                                                                                                                 // 1744
    c3_chart_internal_fn.getPrevX = function (i) {                                                                     // 1745
        var x = this.xs[i - 1];                                                                                        // 1746
        return typeof x !== 'undefined' ? x : null;                                                                    // 1747
    };                                                                                                                 // 1748
    c3_chart_internal_fn.getNextX = function (i) {                                                                     // 1749
        var x = this.xs[i + 1];                                                                                        // 1750
        return typeof x !== 'undefined' ? x : null;                                                                    // 1751
    };                                                                                                                 // 1752
    c3_chart_internal_fn.getMaxDataCount = function () {                                                               // 1753
        var $$ = this;                                                                                                 // 1754
        return $$.d3.max($$.data.targets, function (t) { return t.values.length; });                                   // 1755
    };                                                                                                                 // 1756
    c3_chart_internal_fn.getMaxDataCountTarget = function (targets) {                                                  // 1757
        var length = targets.length, max = 0, maxTarget;                                                               // 1758
        if (length > 1) {                                                                                              // 1759
            targets.forEach(function (t) {                                                                             // 1760
                if (t.values.length > max) {                                                                           // 1761
                    maxTarget = t;                                                                                     // 1762
                    max = t.values.length;                                                                             // 1763
                }                                                                                                      // 1764
            });                                                                                                        // 1765
        } else {                                                                                                       // 1766
            maxTarget = length ? targets[0] : null;                                                                    // 1767
        }                                                                                                              // 1768
        return maxTarget;                                                                                              // 1769
    };                                                                                                                 // 1770
    c3_chart_internal_fn.getEdgeX = function (targets) {                                                               // 1771
        var $$ = this;                                                                                                 // 1772
        return !targets.length ? [0, 0] : [                                                                            // 1773
            $$.d3.min(targets, function (t) { return t.values[0].x; }),                                                // 1774
            $$.d3.max(targets, function (t) { return t.values[t.values.length - 1].x; })                               // 1775
        ];                                                                                                             // 1776
    };                                                                                                                 // 1777
    c3_chart_internal_fn.mapToIds = function (targets) {                                                               // 1778
        return targets.map(function (d) { return d.id; });                                                             // 1779
    };                                                                                                                 // 1780
    c3_chart_internal_fn.mapToTargetIds = function (ids) {                                                             // 1781
        var $$ = this;                                                                                                 // 1782
        return ids ? (isString(ids) ? [ids] : ids) : $$.mapToIds($$.data.targets);                                     // 1783
    };                                                                                                                 // 1784
    c3_chart_internal_fn.hasTarget = function (targets, id) {                                                          // 1785
        var ids = this.mapToIds(targets), i;                                                                           // 1786
        for (i = 0; i < ids.length; i++) {                                                                             // 1787
            if (ids[i] === id) {                                                                                       // 1788
                return true;                                                                                           // 1789
            }                                                                                                          // 1790
        }                                                                                                              // 1791
        return false;                                                                                                  // 1792
    };                                                                                                                 // 1793
    c3_chart_internal_fn.isTargetToShow = function (targetId) {                                                        // 1794
        return this.hiddenTargetIds.indexOf(targetId) < 0;                                                             // 1795
    };                                                                                                                 // 1796
    c3_chart_internal_fn.isLegendToShow = function (targetId) {                                                        // 1797
        return this.hiddenLegendIds.indexOf(targetId) < 0;                                                             // 1798
    };                                                                                                                 // 1799
    c3_chart_internal_fn.filterTargetsToShow = function (targets) {                                                    // 1800
        var $$ = this;                                                                                                 // 1801
        return targets.filter(function (t) { return $$.isTargetToShow(t.id); });                                       // 1802
    };                                                                                                                 // 1803
    c3_chart_internal_fn.mapTargetsToUniqueXs = function (targets) {                                                   // 1804
        var $$ = this;                                                                                                 // 1805
        var xs = $$.d3.set($$.d3.merge(targets.map(function (t) { return t.values.map(function (v) { return +v.x; }); }))).values();
        return $$.isTimeSeries() ? xs.map(function (x) { return new Date(+x); }) : xs.map(function (x) { return +x; });
    };                                                                                                                 // 1808
    c3_chart_internal_fn.addHiddenTargetIds = function (targetIds) {                                                   // 1809
        this.hiddenTargetIds = this.hiddenTargetIds.concat(targetIds);                                                 // 1810
    };                                                                                                                 // 1811
    c3_chart_internal_fn.removeHiddenTargetIds = function (targetIds) {                                                // 1812
        this.hiddenTargetIds = this.hiddenTargetIds.filter(function (id) { return targetIds.indexOf(id) < 0; });       // 1813
    };                                                                                                                 // 1814
    c3_chart_internal_fn.addHiddenLegendIds = function (targetIds) {                                                   // 1815
        this.hiddenLegendIds = this.hiddenLegendIds.concat(targetIds);                                                 // 1816
    };                                                                                                                 // 1817
    c3_chart_internal_fn.removeHiddenLegendIds = function (targetIds) {                                                // 1818
        this.hiddenLegendIds = this.hiddenLegendIds.filter(function (id) { return targetIds.indexOf(id) < 0; });       // 1819
    };                                                                                                                 // 1820
    c3_chart_internal_fn.getValuesAsIdKeyed = function (targets) {                                                     // 1821
        var ys = {};                                                                                                   // 1822
        targets.forEach(function (t) {                                                                                 // 1823
            ys[t.id] = [];                                                                                             // 1824
            t.values.forEach(function (v) {                                                                            // 1825
                ys[t.id].push(v.value);                                                                                // 1826
            });                                                                                                        // 1827
        });                                                                                                            // 1828
        return ys;                                                                                                     // 1829
    };                                                                                                                 // 1830
    c3_chart_internal_fn.checkValueInTargets = function (targets, checker) {                                           // 1831
        var ids = Object.keys(targets), i, j, values;                                                                  // 1832
        for (i = 0; i < ids.length; i++) {                                                                             // 1833
            values = targets[ids[i]].values;                                                                           // 1834
            for (j = 0; j < values.length; j++) {                                                                      // 1835
                if (checker(values[j].value)) {                                                                        // 1836
                    return true;                                                                                       // 1837
                }                                                                                                      // 1838
            }                                                                                                          // 1839
        }                                                                                                              // 1840
        return false;                                                                                                  // 1841
    };                                                                                                                 // 1842
    c3_chart_internal_fn.hasNegativeValueInTargets = function (targets) {                                              // 1843
        return this.checkValueInTargets(targets, function (v) { return v < 0; });                                      // 1844
    };                                                                                                                 // 1845
    c3_chart_internal_fn.hasPositiveValueInTargets = function (targets) {                                              // 1846
        return this.checkValueInTargets(targets, function (v) { return v > 0; });                                      // 1847
    };                                                                                                                 // 1848
    c3_chart_internal_fn.isOrderDesc = function () {                                                                   // 1849
        var config = this.config;                                                                                      // 1850
        return typeof(config.data_order) === 'string' && config.data_order.toLowerCase() === 'desc';                   // 1851
    };                                                                                                                 // 1852
    c3_chart_internal_fn.isOrderAsc = function () {                                                                    // 1853
        var config = this.config;                                                                                      // 1854
        return typeof(config.data_order) === 'string' && config.data_order.toLowerCase() === 'asc';                    // 1855
    };                                                                                                                 // 1856
    c3_chart_internal_fn.orderTargets = function (targets) {                                                           // 1857
        var $$ = this, config = $$.config, orderAsc = $$.isOrderAsc(), orderDesc = $$.isOrderDesc();                   // 1858
        if (orderAsc || orderDesc) {                                                                                   // 1859
            targets.sort(function (t1, t2) {                                                                           // 1860
                var reducer = function (p, c) { return p + Math.abs(c.value); };                                       // 1861
                var t1Sum = t1.values.reduce(reducer, 0),                                                              // 1862
                    t2Sum = t2.values.reduce(reducer, 0);                                                              // 1863
                return orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum;                                                       // 1864
            });                                                                                                        // 1865
        } else if (isFunction(config.data_order)) {                                                                    // 1866
            targets.sort(config.data_order);                                                                           // 1867
        } // TODO: accept name array for order                                                                         // 1868
        return targets;                                                                                                // 1869
    };                                                                                                                 // 1870
    c3_chart_internal_fn.filterByX = function (targets, x) {                                                           // 1871
        return this.d3.merge(targets.map(function (t) { return t.values; })).filter(function (v) { return v.x - x === 0; });
    };                                                                                                                 // 1873
    c3_chart_internal_fn.filterRemoveNull = function (data) {                                                          // 1874
        return data.filter(function (d) { return isValue(d.value); });                                                 // 1875
    };                                                                                                                 // 1876
    c3_chart_internal_fn.filterByXDomain = function (targets, xDomain) {                                               // 1877
        return targets.map(function (t) {                                                                              // 1878
            return {                                                                                                   // 1879
                id: t.id,                                                                                              // 1880
                id_org: t.id_org,                                                                                      // 1881
                values: t.values.filter(function (v) {                                                                 // 1882
                    return xDomain[0] <= v.x && v.x <= xDomain[1];                                                     // 1883
                })                                                                                                     // 1884
            };                                                                                                         // 1885
        });                                                                                                            // 1886
    };                                                                                                                 // 1887
    c3_chart_internal_fn.hasDataLabel = function () {                                                                  // 1888
        var config = this.config;                                                                                      // 1889
        if (typeof config.data_labels === 'boolean' && config.data_labels) {                                           // 1890
            return true;                                                                                               // 1891
        } else if (typeof config.data_labels === 'object' && notEmpty(config.data_labels)) {                           // 1892
            return true;                                                                                               // 1893
        }                                                                                                              // 1894
        return false;                                                                                                  // 1895
    };                                                                                                                 // 1896
    c3_chart_internal_fn.getDataLabelLength = function (min, max, key) {                                               // 1897
        var $$ = this,                                                                                                 // 1898
            lengths = [0, 0], paddingCoef = 1.3;                                                                       // 1899
        $$.selectChart.select('svg').selectAll('.dummy')                                                               // 1900
            .data([min, max])                                                                                          // 1901
            .enter().append('text')                                                                                    // 1902
            .text(function (d) { return $$.dataLabelFormat(d.id)(d); })                                                // 1903
            .each(function (d, i) {                                                                                    // 1904
                lengths[i] = this.getBoundingClientRect()[key] * paddingCoef;                                          // 1905
            })                                                                                                         // 1906
            .remove();                                                                                                 // 1907
        return lengths;                                                                                                // 1908
    };                                                                                                                 // 1909
    c3_chart_internal_fn.isNoneArc = function (d) {                                                                    // 1910
        return this.hasTarget(this.data.targets, d.id);                                                                // 1911
    },                                                                                                                 // 1912
    c3_chart_internal_fn.isArc = function (d) {                                                                        // 1913
        return 'data' in d && this.hasTarget(this.data.targets, d.data.id);                                            // 1914
    };                                                                                                                 // 1915
    c3_chart_internal_fn.findSameXOfValues = function (values, index) {                                                // 1916
        var i, targetX = values[index].x, sames = [];                                                                  // 1917
        for (i = index - 1; i >= 0; i--) {                                                                             // 1918
            if (targetX !== values[i].x) { break; }                                                                    // 1919
            sames.push(values[i]);                                                                                     // 1920
        }                                                                                                              // 1921
        for (i = index; i < values.length; i++) {                                                                      // 1922
            if (targetX !== values[i].x) { break; }                                                                    // 1923
            sames.push(values[i]);                                                                                     // 1924
        }                                                                                                              // 1925
        return sames;                                                                                                  // 1926
    };                                                                                                                 // 1927
                                                                                                                       // 1928
    c3_chart_internal_fn.findClosestFromTargets = function (targets, pos) {                                            // 1929
        var $$ = this, candidates;                                                                                     // 1930
                                                                                                                       // 1931
        // map to array of closest points of each target                                                               // 1932
        candidates = targets.map(function (target) {                                                                   // 1933
            return $$.findClosest(target.values, pos);                                                                 // 1934
        });                                                                                                            // 1935
                                                                                                                       // 1936
        // decide closest point and return                                                                             // 1937
        return $$.findClosest(candidates, pos);                                                                        // 1938
    };                                                                                                                 // 1939
    c3_chart_internal_fn.findClosest = function (values, pos) {                                                        // 1940
        var $$ = this, minDist = $$.config.point_sensitivity, closest;                                                 // 1941
                                                                                                                       // 1942
        // find mouseovering bar                                                                                       // 1943
        values.filter(function (v) { return v && $$.isBarType(v.id); }).forEach(function (v) {                         // 1944
            var shape = $$.main.select('.' + CLASS.bars + $$.getTargetSelectorSuffix(v.id) + ' .' + CLASS.bar + '-' + v.index).node();
            if (!closest && $$.isWithinBar(shape)) {                                                                   // 1946
                closest = v;                                                                                           // 1947
            }                                                                                                          // 1948
        });                                                                                                            // 1949
                                                                                                                       // 1950
        // find closest point from non-bar                                                                             // 1951
        values.filter(function (v) { return v && !$$.isBarType(v.id); }).forEach(function (v) {                        // 1952
            var d = $$.dist(v, pos);                                                                                   // 1953
            if (d < minDist) {                                                                                         // 1954
                minDist = d;                                                                                           // 1955
                closest = v;                                                                                           // 1956
            }                                                                                                          // 1957
        });                                                                                                            // 1958
                                                                                                                       // 1959
        return closest;                                                                                                // 1960
    };                                                                                                                 // 1961
    c3_chart_internal_fn.dist = function (data, pos) {                                                                 // 1962
        var $$ = this, config = $$.config,                                                                             // 1963
            xIndex = config.axis_rotated ? 1 : 0,                                                                      // 1964
            yIndex = config.axis_rotated ? 0 : 1,                                                                      // 1965
            y = $$.circleY(data, data.index),                                                                          // 1966
            x = $$.x(data.x);                                                                                          // 1967
        return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));                                 // 1968
    };                                                                                                                 // 1969
    c3_chart_internal_fn.convertValuesToStep = function (values) {                                                     // 1970
        var converted = [].concat(values), i;                                                                          // 1971
                                                                                                                       // 1972
        if (!this.isCategorized()) {                                                                                   // 1973
            return values;                                                                                             // 1974
        }                                                                                                              // 1975
                                                                                                                       // 1976
        for (i = values.length + 1; 0 < i; i--) {                                                                      // 1977
            converted[i] = converted[i - 1];                                                                           // 1978
        }                                                                                                              // 1979
                                                                                                                       // 1980
        converted[0] = {                                                                                               // 1981
            x: converted[0].x - 1,                                                                                     // 1982
            value: converted[0].value,                                                                                 // 1983
            id: converted[0].id                                                                                        // 1984
        };                                                                                                             // 1985
        converted[values.length + 1] = {                                                                               // 1986
            x: converted[values.length].x + 1,                                                                         // 1987
            value: converted[values.length].value,                                                                     // 1988
            id: converted[values.length].id                                                                            // 1989
        };                                                                                                             // 1990
                                                                                                                       // 1991
        return converted;                                                                                              // 1992
    };                                                                                                                 // 1993
    c3_chart_internal_fn.updateDataAttributes = function (name, attrs) {                                               // 1994
        var $$ = this, config = $$.config, current = config['data_' + name];                                           // 1995
        if (typeof attrs === 'undefined') { return current; }                                                          // 1996
        Object.keys(attrs).forEach(function (id) {                                                                     // 1997
            current[id] = attrs[id];                                                                                   // 1998
        });                                                                                                            // 1999
        $$.redraw({withLegend: true});                                                                                 // 2000
        return current;                                                                                                // 2001
    };                                                                                                                 // 2002
                                                                                                                       // 2003
    c3_chart_internal_fn.convertUrlToData = function (url, mimeType, keys, done) {                                     // 2004
        var $$ = this, type = mimeType ? mimeType : 'csv';                                                             // 2005
        $$.d3.xhr(url, function (error, data) {                                                                        // 2006
            var d;                                                                                                     // 2007
            if (!data) {                                                                                               // 2008
                throw new Error(error.responseURL + ' ' + error.status + ' (' + error.statusText + ')');               // 2009
            }                                                                                                          // 2010
            if (type === 'json') {                                                                                     // 2011
                d = $$.convertJsonToData(JSON.parse(data.response), keys);                                             // 2012
            } else if (type === 'tsv') {                                                                               // 2013
                d = $$.convertTsvToData(data.response);                                                                // 2014
            } else {                                                                                                   // 2015
                d = $$.convertCsvToData(data.response);                                                                // 2016
            }                                                                                                          // 2017
            done.call($$, d);                                                                                          // 2018
        });                                                                                                            // 2019
    };                                                                                                                 // 2020
    c3_chart_internal_fn.convertXsvToData = function (xsv, parser) {                                                   // 2021
        var rows = parser.parseRows(xsv), d;                                                                           // 2022
        if (rows.length === 1) {                                                                                       // 2023
            d = [{}];                                                                                                  // 2024
            rows[0].forEach(function (id) {                                                                            // 2025
                d[0][id] = null;                                                                                       // 2026
            });                                                                                                        // 2027
        } else {                                                                                                       // 2028
            d = parser.parse(xsv);                                                                                     // 2029
        }                                                                                                              // 2030
        return d;                                                                                                      // 2031
    };                                                                                                                 // 2032
    c3_chart_internal_fn.convertCsvToData = function (csv) {                                                           // 2033
        return this.convertXsvToData(csv, this.d3.csv);                                                                // 2034
    };                                                                                                                 // 2035
    c3_chart_internal_fn.convertTsvToData = function (tsv) {                                                           // 2036
        return this.convertXsvToData(tsv, this.d3.tsv);                                                                // 2037
    };                                                                                                                 // 2038
    c3_chart_internal_fn.convertJsonToData = function (json, keys) {                                                   // 2039
        var $$ = this,                                                                                                 // 2040
            new_rows = [], targetKeys, data;                                                                           // 2041
        if (keys) { // when keys specified, json would be an array that includes objects                               // 2042
            if (keys.x) {                                                                                              // 2043
                targetKeys = keys.value.concat(keys.x);                                                                // 2044
                $$.config.data_x = keys.x;                                                                             // 2045
            } else {                                                                                                   // 2046
                targetKeys = keys.value;                                                                               // 2047
            }                                                                                                          // 2048
            new_rows.push(targetKeys);                                                                                 // 2049
            json.forEach(function (o) {                                                                                // 2050
                var new_row = [];                                                                                      // 2051
                targetKeys.forEach(function (key) {                                                                    // 2052
                    // convert undefined to null because undefined data will be removed in convertDataToTargets()      // 2053
                    var v = isUndefined(o[key]) ? null : o[key];                                                       // 2054
                    new_row.push(v);                                                                                   // 2055
                });                                                                                                    // 2056
                new_rows.push(new_row);                                                                                // 2057
            });                                                                                                        // 2058
            data = $$.convertRowsToData(new_rows);                                                                     // 2059
        } else {                                                                                                       // 2060
            Object.keys(json).forEach(function (key) {                                                                 // 2061
                new_rows.push([key].concat(json[key]));                                                                // 2062
            });                                                                                                        // 2063
            data = $$.convertColumnsToData(new_rows);                                                                  // 2064
        }                                                                                                              // 2065
        return data;                                                                                                   // 2066
    };                                                                                                                 // 2067
    c3_chart_internal_fn.convertRowsToData = function (rows) {                                                         // 2068
        var keys = rows[0], new_row = {}, new_rows = [], i, j;                                                         // 2069
        for (i = 1; i < rows.length; i++) {                                                                            // 2070
            new_row = {};                                                                                              // 2071
            for (j = 0; j < rows[i].length; j++) {                                                                     // 2072
                if (isUndefined(rows[i][j])) {                                                                         // 2073
                    throw new Error("Source data is missing a component at (" + i + "," + j + ")!");                   // 2074
                }                                                                                                      // 2075
                new_row[keys[j]] = rows[i][j];                                                                         // 2076
            }                                                                                                          // 2077
            new_rows.push(new_row);                                                                                    // 2078
        }                                                                                                              // 2079
        return new_rows;                                                                                               // 2080
    };                                                                                                                 // 2081
    c3_chart_internal_fn.convertColumnsToData = function (columns) {                                                   // 2082
        var new_rows = [], i, j, key;                                                                                  // 2083
        for (i = 0; i < columns.length; i++) {                                                                         // 2084
            key = columns[i][0];                                                                                       // 2085
            for (j = 1; j < columns[i].length; j++) {                                                                  // 2086
                if (isUndefined(new_rows[j - 1])) {                                                                    // 2087
                    new_rows[j - 1] = {};                                                                              // 2088
                }                                                                                                      // 2089
                if (isUndefined(columns[i][j])) {                                                                      // 2090
                    throw new Error("Source data is missing a component at (" + i + "," + j + ")!");                   // 2091
                }                                                                                                      // 2092
                new_rows[j - 1][key] = columns[i][j];                                                                  // 2093
            }                                                                                                          // 2094
        }                                                                                                              // 2095
        return new_rows;                                                                                               // 2096
    };                                                                                                                 // 2097
    c3_chart_internal_fn.convertDataToTargets = function (data, appendXs) {                                            // 2098
        var $$ = this, config = $$.config,                                                                             // 2099
            ids = $$.d3.keys(data[0]).filter($$.isNotX, $$),                                                           // 2100
            xs = $$.d3.keys(data[0]).filter($$.isX, $$),                                                               // 2101
            targets;                                                                                                   // 2102
                                                                                                                       // 2103
        // save x for update data by load when custom x and c3.x API                                                   // 2104
        ids.forEach(function (id) {                                                                                    // 2105
            var xKey = $$.getXKey(id);                                                                                 // 2106
                                                                                                                       // 2107
            if ($$.isCustomX() || $$.isTimeSeries()) {                                                                 // 2108
                // if included in input data                                                                           // 2109
                if (xs.indexOf(xKey) >= 0) {                                                                           // 2110
                    $$.data.xs[id] = (appendXs && $$.data.xs[id] ? $$.data.xs[id] : []).concat(                        // 2111
                        data.map(function (d) { return d[xKey]; })                                                     // 2112
                            .filter(isValue)                                                                           // 2113
                            .map(function (rawX, i) { return $$.generateTargetX(rawX, id, i); })                       // 2114
                    );                                                                                                 // 2115
                }                                                                                                      // 2116
                // if not included in input data, find from preloaded data of other id's x                             // 2117
                else if (config.data_x) {                                                                              // 2118
                    $$.data.xs[id] = $$.getOtherTargetXs();                                                            // 2119
                }                                                                                                      // 2120
                // if not included in input data, find from preloaded data                                             // 2121
                else if (notEmpty(config.data_xs)) {                                                                   // 2122
                    $$.data.xs[id] = $$.getXValuesOfXKey(xKey, $$.data.targets);                                       // 2123
                }                                                                                                      // 2124
                // MEMO: if no x included, use same x of current will be used                                          // 2125
            } else {                                                                                                   // 2126
                $$.data.xs[id] = data.map(function (d, i) { return i; });                                              // 2127
            }                                                                                                          // 2128
        });                                                                                                            // 2129
                                                                                                                       // 2130
                                                                                                                       // 2131
        // check x is defined                                                                                          // 2132
        ids.forEach(function (id) {                                                                                    // 2133
            if (!$$.data.xs[id]) {                                                                                     // 2134
                throw new Error('x is not defined for id = "' + id + '".');                                            // 2135
            }                                                                                                          // 2136
        });                                                                                                            // 2137
                                                                                                                       // 2138
        // convert to target                                                                                           // 2139
        targets = ids.map(function (id, index) {                                                                       // 2140
            var convertedId = config.data_idConverter(id);                                                             // 2141
            return {                                                                                                   // 2142
                id: convertedId,                                                                                       // 2143
                id_org: id,                                                                                            // 2144
                values: data.map(function (d, i) {                                                                     // 2145
                    var xKey = $$.getXKey(id), rawX = d[xKey], x = $$.generateTargetX(rawX, id, i),                    // 2146
                        value = d[id] !== null && !isNaN(d[id]) ? +d[id] : null;                                       // 2147
                    // use x as categories if custom x and categorized                                                 // 2148
                    if ($$.isCustomX() && $$.isCategorized() && index === 0 && rawX) {                                 // 2149
                        if (i === 0) { config.axis_x_categories = []; }                                                // 2150
                        config.axis_x_categories.push(rawX);                                                           // 2151
                    }                                                                                                  // 2152
                    // mark as x = undefined if value is undefined and filter to remove after mapped                   // 2153
                    if (isUndefined(d[id]) || $$.data.xs[id].length <= i) {                                            // 2154
                        x = undefined;                                                                                 // 2155
                    }                                                                                                  // 2156
                    return {x: x, value: value, id: convertedId};                                                      // 2157
                }).filter(function (v) { return isDefined(v.x); })                                                     // 2158
            };                                                                                                         // 2159
        });                                                                                                            // 2160
                                                                                                                       // 2161
        // finish targets                                                                                              // 2162
        targets.forEach(function (t) {                                                                                 // 2163
            var i;                                                                                                     // 2164
            // sort values by its x                                                                                    // 2165
            if (config.data_xSort) {                                                                                   // 2166
                t.values = t.values.sort(function (v1, v2) {                                                           // 2167
                    var x1 = v1.x || v1.x === 0 ? v1.x : Infinity,                                                     // 2168
                        x2 = v2.x || v2.x === 0 ? v2.x : Infinity;                                                     // 2169
                    return x1 - x2;                                                                                    // 2170
                });                                                                                                    // 2171
            }                                                                                                          // 2172
            // indexing each value                                                                                     // 2173
            i = 0;                                                                                                     // 2174
            t.values.forEach(function (v) {                                                                            // 2175
                v.index = i++;                                                                                         // 2176
            });                                                                                                        // 2177
            // this needs to be sorted because its index and value.index is identical                                  // 2178
            $$.data.xs[t.id].sort(function (v1, v2) {                                                                  // 2179
                return v1 - v2;                                                                                        // 2180
            });                                                                                                        // 2181
        });                                                                                                            // 2182
                                                                                                                       // 2183
        // cache information about values                                                                              // 2184
        $$.hasNegativeValue = $$.hasNegativeValueInTargets(targets);                                                   // 2185
        $$.hasPositiveValue = $$.hasPositiveValueInTargets(targets);                                                   // 2186
                                                                                                                       // 2187
        // set target types                                                                                            // 2188
        if (config.data_type) {                                                                                        // 2189
            $$.setTargetType($$.mapToIds(targets).filter(function (id) { return ! (id in config.data_types); }), config.data_type);
        }                                                                                                              // 2191
                                                                                                                       // 2192
        // cache as original id keyed                                                                                  // 2193
        targets.forEach(function (d) {                                                                                 // 2194
            $$.addCache(d.id_org, d);                                                                                  // 2195
        });                                                                                                            // 2196
                                                                                                                       // 2197
        return targets;                                                                                                // 2198
    };                                                                                                                 // 2199
                                                                                                                       // 2200
    c3_chart_internal_fn.load = function (targets, args) {                                                             // 2201
        var $$ = this;                                                                                                 // 2202
        if (targets) {                                                                                                 // 2203
            // filter loading targets if needed                                                                        // 2204
            if (args.filter) {                                                                                         // 2205
                targets = targets.filter(args.filter);                                                                 // 2206
            }                                                                                                          // 2207
            // set type if args.types || args.type specified                                                           // 2208
            if (args.type || args.types) {                                                                             // 2209
                targets.forEach(function (t) {                                                                         // 2210
                    var type = args.types && args.types[t.id] ? args.types[t.id] : args.type;                          // 2211
                    $$.setTargetType(t.id, type);                                                                      // 2212
                });                                                                                                    // 2213
            }                                                                                                          // 2214
            // Update/Add data                                                                                         // 2215
            $$.data.targets.forEach(function (d) {                                                                     // 2216
                for (var i = 0; i < targets.length; i++) {                                                             // 2217
                    if (d.id === targets[i].id) {                                                                      // 2218
                        d.values = targets[i].values;                                                                  // 2219
                        targets.splice(i, 1);                                                                          // 2220
                        break;                                                                                         // 2221
                    }                                                                                                  // 2222
                }                                                                                                      // 2223
            });                                                                                                        // 2224
            $$.data.targets = $$.data.targets.concat(targets); // add remained                                         // 2225
        }                                                                                                              // 2226
                                                                                                                       // 2227
        // Set targets                                                                                                 // 2228
        $$.updateTargets($$.data.targets);                                                                             // 2229
                                                                                                                       // 2230
        // Redraw with new targets                                                                                     // 2231
        $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});                            // 2232
                                                                                                                       // 2233
        if (args.done) { args.done(); }                                                                                // 2234
    };                                                                                                                 // 2235
    c3_chart_internal_fn.loadFromArgs = function (args) {                                                              // 2236
        var $$ = this;                                                                                                 // 2237
        if (args.data) {                                                                                               // 2238
            $$.load($$.convertDataToTargets(args.data), args);                                                         // 2239
        }                                                                                                              // 2240
        else if (args.url) {                                                                                           // 2241
            $$.convertUrlToData(args.url, args.mimeType, args.keys, function (data) {                                  // 2242
                $$.load($$.convertDataToTargets(data), args);                                                          // 2243
            });                                                                                                        // 2244
        }                                                                                                              // 2245
        else if (args.json) {                                                                                          // 2246
            $$.load($$.convertDataToTargets($$.convertJsonToData(args.json, args.keys)), args);                        // 2247
        }                                                                                                              // 2248
        else if (args.rows) {                                                                                          // 2249
            $$.load($$.convertDataToTargets($$.convertRowsToData(args.rows)), args);                                   // 2250
        }                                                                                                              // 2251
        else if (args.columns) {                                                                                       // 2252
            $$.load($$.convertDataToTargets($$.convertColumnsToData(args.columns)), args);                             // 2253
        }                                                                                                              // 2254
        else {                                                                                                         // 2255
            $$.load(null, args);                                                                                       // 2256
        }                                                                                                              // 2257
    };                                                                                                                 // 2258
    c3_chart_internal_fn.unload = function (targetIds, done) {                                                         // 2259
        var $$ = this;                                                                                                 // 2260
        if (!done) {                                                                                                   // 2261
            done = function () {};                                                                                     // 2262
        }                                                                                                              // 2263
        // filter existing target                                                                                      // 2264
        targetIds = targetIds.filter(function (id) { return $$.hasTarget($$.data.targets, id); });                     // 2265
        // If no target, call done and return                                                                          // 2266
        if (!targetIds || targetIds.length === 0) {                                                                    // 2267
            done();                                                                                                    // 2268
            return;                                                                                                    // 2269
        }                                                                                                              // 2270
        $$.svg.selectAll(targetIds.map(function (id) { return $$.selectorTarget(id); }))                               // 2271
            .transition()                                                                                              // 2272
            .style('opacity', 0)                                                                                       // 2273
            .remove()                                                                                                  // 2274
            .call($$.endall, done);                                                                                    // 2275
        targetIds.forEach(function (id) {                                                                              // 2276
            // Reset fadein for future load                                                                            // 2277
            $$.withoutFadeIn[id] = false;                                                                              // 2278
            // Remove target's elements                                                                                // 2279
            if ($$.legend) {                                                                                           // 2280
                $$.legend.selectAll('.' + CLASS.legendItem + $$.getTargetSelectorSuffix(id)).remove();                 // 2281
            }                                                                                                          // 2282
            // Remove target                                                                                           // 2283
            $$.data.targets = $$.data.targets.filter(function (t) {                                                    // 2284
                return t.id !== id;                                                                                    // 2285
            });                                                                                                        // 2286
        });                                                                                                            // 2287
    };                                                                                                                 // 2288
                                                                                                                       // 2289
    c3_chart_internal_fn.categoryName = function (i) {                                                                 // 2290
        var config = this.config;                                                                                      // 2291
        return i < config.axis_x_categories.length ? config.axis_x_categories[i] : i;                                  // 2292
    };                                                                                                                 // 2293
                                                                                                                       // 2294
    c3_chart_internal_fn.initEventRect = function () {                                                                 // 2295
        var $$ = this;                                                                                                 // 2296
        $$.main.select('.' + CLASS.chart).append("g")                                                                  // 2297
            .attr("class", CLASS.eventRects)                                                                           // 2298
            .style('fill-opacity', 0);                                                                                 // 2299
    };                                                                                                                 // 2300
    c3_chart_internal_fn.redrawEventRect = function () {                                                               // 2301
        var $$ = this, config = $$.config,                                                                             // 2302
            eventRectUpdate, maxDataCountTarget,                                                                       // 2303
            isMultipleX = $$.isMultipleX();                                                                            // 2304
                                                                                                                       // 2305
        // rects for mouseover                                                                                         // 2306
        var eventRects = $$.main.select('.' + CLASS.eventRects)                                                        // 2307
                .style('cursor', config.zoom_enabled ? config.axis_rotated ? 'ns-resize' : 'ew-resize' : null)         // 2308
                .classed(CLASS.eventRectsMultiple, isMultipleX)                                                        // 2309
                .classed(CLASS.eventRectsSingle, !isMultipleX);                                                        // 2310
                                                                                                                       // 2311
        // clear old rects                                                                                             // 2312
        eventRects.selectAll('.' + CLASS.eventRect).remove();                                                          // 2313
                                                                                                                       // 2314
        // open as public variable                                                                                     // 2315
        $$.eventRect = eventRects.selectAll('.' + CLASS.eventRect);                                                    // 2316
                                                                                                                       // 2317
        if (isMultipleX) {                                                                                             // 2318
            eventRectUpdate = $$.eventRect.data([0]);                                                                  // 2319
            // enter : only one rect will be added                                                                     // 2320
            $$.generateEventRectsForMultipleXs(eventRectUpdate.enter());                                               // 2321
            // update                                                                                                  // 2322
            $$.updateEventRect(eventRectUpdate);                                                                       // 2323
            // exit : not needed because always only one rect exists                                                   // 2324
        }                                                                                                              // 2325
        else {                                                                                                         // 2326
            // Set data and update $$.eventRect                                                                        // 2327
            maxDataCountTarget = $$.getMaxDataCountTarget($$.data.targets);                                            // 2328
            eventRects.datum(maxDataCountTarget ? maxDataCountTarget.values : []);                                     // 2329
            $$.eventRect = eventRects.selectAll('.' + CLASS.eventRect);                                                // 2330
            eventRectUpdate = $$.eventRect.data(function (d) { return d; });                                           // 2331
            // enter                                                                                                   // 2332
            $$.generateEventRectsForSingleX(eventRectUpdate.enter());                                                  // 2333
            // update                                                                                                  // 2334
            $$.updateEventRect(eventRectUpdate);                                                                       // 2335
            // exit                                                                                                    // 2336
            eventRectUpdate.exit().remove();                                                                           // 2337
        }                                                                                                              // 2338
    };                                                                                                                 // 2339
    c3_chart_internal_fn.updateEventRect = function (eventRectUpdate) {                                                // 2340
        var $$ = this, config = $$.config,                                                                             // 2341
            x, y, w, h, rectW, rectX;                                                                                  // 2342
                                                                                                                       // 2343
        // set update selection if null                                                                                // 2344
        eventRectUpdate = eventRectUpdate || $$.eventRect.data(function (d) { return d; });                            // 2345
                                                                                                                       // 2346
        if ($$.isMultipleX()) {                                                                                        // 2347
            // TODO: rotated not supported yet                                                                         // 2348
            x = 0;                                                                                                     // 2349
            y = 0;                                                                                                     // 2350
            w = $$.width;                                                                                              // 2351
            h = $$.height;                                                                                             // 2352
        }                                                                                                              // 2353
        else {                                                                                                         // 2354
            if (($$.isCustomX() || $$.isTimeSeries()) && !$$.isCategorized()) {                                        // 2355
                                                                                                                       // 2356
                // update index for x that is used by prevX and nextX                                                  // 2357
                $$.updateXs();                                                                                         // 2358
                                                                                                                       // 2359
                rectW = function (d) {                                                                                 // 2360
                    var prevX = $$.getPrevX(d.index), nextX = $$.getNextX(d.index);                                    // 2361
                                                                                                                       // 2362
                    // if there this is a single data point make the eventRect full width (or height)                  // 2363
                    if (prevX === null && nextX === null) {                                                            // 2364
                        return config.axis_rotated ? $$.height : $$.width;                                             // 2365
                    }                                                                                                  // 2366
                                                                                                                       // 2367
                    if (prevX === null) { prevX = $$.x.domain()[0]; }                                                  // 2368
                    if (nextX === null) { nextX = $$.x.domain()[1]; }                                                  // 2369
                                                                                                                       // 2370
                    return Math.max(0, ($$.x(nextX) - $$.x(prevX)) / 2);                                               // 2371
                };                                                                                                     // 2372
                rectX = function (d) {                                                                                 // 2373
                    var prevX = $$.getPrevX(d.index), nextX = $$.getNextX(d.index),                                    // 2374
                        thisX = $$.data.xs[d.id][d.index];                                                             // 2375
                                                                                                                       // 2376
                    // if there this is a single data point position the eventRect at 0                                // 2377
                    if (prevX === null && nextX === null) {                                                            // 2378
                        return 0;                                                                                      // 2379
                    }                                                                                                  // 2380
                                                                                                                       // 2381
                    if (prevX === null) { prevX = $$.x.domain()[0]; }                                                  // 2382
                                                                                                                       // 2383
                    return ($$.x(thisX) + $$.x(prevX)) / 2;                                                            // 2384
                };                                                                                                     // 2385
            } else {                                                                                                   // 2386
                rectW = $$.getEventRectWidth();                                                                        // 2387
                rectX = function (d) {                                                                                 // 2388
                    return $$.x(d.x) - (rectW / 2);                                                                    // 2389
                };                                                                                                     // 2390
            }                                                                                                          // 2391
            x = config.axis_rotated ? 0 : rectX;                                                                       // 2392
            y = config.axis_rotated ? rectX : 0;                                                                       // 2393
            w = config.axis_rotated ? $$.width : rectW;                                                                // 2394
            h = config.axis_rotated ? rectW : $$.height;                                                               // 2395
        }                                                                                                              // 2396
                                                                                                                       // 2397
        eventRectUpdate                                                                                                // 2398
            .attr('class', $$.classEvent.bind($$))                                                                     // 2399
            .attr("x", x)                                                                                              // 2400
            .attr("y", y)                                                                                              // 2401
            .attr("width", w)                                                                                          // 2402
            .attr("height", h);                                                                                        // 2403
    };                                                                                                                 // 2404
    c3_chart_internal_fn.generateEventRectsForSingleX = function (eventRectEnter) {                                    // 2405
        var $$ = this, d3 = $$.d3, config = $$.config;                                                                 // 2406
        eventRectEnter.append("rect")                                                                                  // 2407
            .attr("class", $$.classEvent.bind($$))                                                                     // 2408
            .style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null)        // 2409
            .on('mouseover', function (d) {                                                                            // 2410
                var index = d.index;                                                                                   // 2411
                                                                                                                       // 2412
                if ($$.dragging || $$.flowing) { return; } // do nothing while dragging/flowing                        // 2413
                if ($$.hasArcType()) { return; }                                                                       // 2414
                                                                                                                       // 2415
                // Expand shapes for selection                                                                         // 2416
                if (config.point_focus_expand_enabled) { $$.expandCircles(index, null, true); }                        // 2417
                $$.expandBars(index, null, true);                                                                      // 2418
                                                                                                                       // 2419
                // Call event handler                                                                                  // 2420
                $$.main.selectAll('.' + CLASS.shape + '-' + index).each(function (d) {                                 // 2421
                    config.data_onmouseover.call($$.api, d);                                                           // 2422
                });                                                                                                    // 2423
            })                                                                                                         // 2424
            .on('mouseout', function (d) {                                                                             // 2425
                var index = d.index;                                                                                   // 2426
                if (!$$.config) { return; } // chart is destroyed                                                      // 2427
                if ($$.hasArcType()) { return; }                                                                       // 2428
                $$.hideXGridFocus();                                                                                   // 2429
                $$.hideTooltip();                                                                                      // 2430
                // Undo expanded shapes                                                                                // 2431
                $$.unexpandCircles();                                                                                  // 2432
                $$.unexpandBars();                                                                                     // 2433
                // Call event handler                                                                                  // 2434
                $$.main.selectAll('.' + CLASS.shape + '-' + index).each(function (d) {                                 // 2435
                    config.data_onmouseout.call($$.api, d);                                                            // 2436
                });                                                                                                    // 2437
            })                                                                                                         // 2438
            .on('mousemove', function (d) {                                                                            // 2439
                var selectedData, index = d.index,                                                                     // 2440
                    eventRect = $$.svg.select('.' + CLASS.eventRect + '-' + index);                                    // 2441
                                                                                                                       // 2442
                if ($$.dragging || $$.flowing) { return; } // do nothing while dragging/flowing                        // 2443
                if ($$.hasArcType()) { return; }                                                                       // 2444
                                                                                                                       // 2445
                if ($$.isStepType(d) && $$.config.line_step_type === 'step-after' && d3.mouse(this)[0] < $$.x($$.getXValue(d.id, index))) {
                    index -= 1;                                                                                        // 2447
                }                                                                                                      // 2448
                                                                                                                       // 2449
                // Show tooltip                                                                                        // 2450
                selectedData = $$.filterTargetsToShow($$.data.targets).map(function (t) {                              // 2451
                    return $$.addName($$.getValueOnIndex(t.values, index));                                            // 2452
                });                                                                                                    // 2453
                                                                                                                       // 2454
                if (config.tooltip_grouped) {                                                                          // 2455
                    $$.showTooltip(selectedData, this);                                                                // 2456
                    $$.showXGridFocus(selectedData);                                                                   // 2457
                }                                                                                                      // 2458
                                                                                                                       // 2459
                if (config.tooltip_grouped && (!config.data_selection_enabled || config.data_selection_grouped)) {     // 2460
                    return;                                                                                            // 2461
                }                                                                                                      // 2462
                                                                                                                       // 2463
                $$.main.selectAll('.' + CLASS.shape + '-' + index)                                                     // 2464
                    .each(function () {                                                                                // 2465
                        d3.select(this).classed(CLASS.EXPANDED, true);                                                 // 2466
                        if (config.data_selection_enabled) {                                                           // 2467
                            eventRect.style('cursor', config.data_selection_grouped ? 'pointer' : null);               // 2468
                        }                                                                                              // 2469
                        if (!config.tooltip_grouped) {                                                                 // 2470
                            $$.hideXGridFocus();                                                                       // 2471
                            $$.hideTooltip();                                                                          // 2472
                            if (!config.data_selection_grouped) {                                                      // 2473
                                $$.unexpandCircles(index);                                                             // 2474
                                $$.unexpandBars(index);                                                                // 2475
                            }                                                                                          // 2476
                        }                                                                                              // 2477
                    })                                                                                                 // 2478
                    .filter(function (d) {                                                                             // 2479
                        return $$.isWithinShape(this, d);                                                              // 2480
                    })                                                                                                 // 2481
                    .each(function (d) {                                                                               // 2482
                        if (config.data_selection_enabled && (config.data_selection_grouped || config.data_selection_isselectable(d))) {
                            eventRect.style('cursor', 'pointer');                                                      // 2484
                        }                                                                                              // 2485
                        if (!config.tooltip_grouped) {                                                                 // 2486
                            $$.showTooltip([d], this);                                                                 // 2487
                            $$.showXGridFocus([d]);                                                                    // 2488
                            if (config.point_focus_expand_enabled) { $$.expandCircles(index, d.id, true); }            // 2489
                            $$.expandBars(index, d.id, true);                                                          // 2490
                        }                                                                                              // 2491
                    });                                                                                                // 2492
            })                                                                                                         // 2493
            .on('click', function (d) {                                                                                // 2494
                var index = d.index;                                                                                   // 2495
                if ($$.hasArcType() || !$$.toggleShape) { return; }                                                    // 2496
                if ($$.cancelClick) {                                                                                  // 2497
                    $$.cancelClick = false;                                                                            // 2498
                    return;                                                                                            // 2499
                }                                                                                                      // 2500
                if ($$.isStepType(d) && config.line_step_type === 'step-after' && d3.mouse(this)[0] < $$.x($$.getXValue(d.id, index))) {
                    index -= 1;                                                                                        // 2502
                }                                                                                                      // 2503
                $$.main.selectAll('.' + CLASS.shape + '-' + index).each(function (d) {                                 // 2504
                    if (config.data_selection_grouped || $$.isWithinShape(this, d)) {                                  // 2505
                        $$.toggleShape(this, d, index);                                                                // 2506
                        $$.config.data_onclick.call($$.api, d, this);                                                  // 2507
                    }                                                                                                  // 2508
                });                                                                                                    // 2509
            })                                                                                                         // 2510
            .call(                                                                                                     // 2511
                config.data_selection_draggable && $$.drag ? (                                                         // 2512
                    d3.behavior.drag().origin(Object)                                                                  // 2513
                        .on('drag', function () { $$.drag(d3.mouse(this)); })                                          // 2514
                        .on('dragstart', function () { $$.dragstart(d3.mouse(this)); })                                // 2515
                        .on('dragend', function () { $$.dragend(); })                                                  // 2516
                ) : function () {}                                                                                     // 2517
            );                                                                                                         // 2518
    };                                                                                                                 // 2519
                                                                                                                       // 2520
    c3_chart_internal_fn.generateEventRectsForMultipleXs = function (eventRectEnter) {                                 // 2521
        var $$ = this, d3 = $$.d3, config = $$.config;                                                                 // 2522
                                                                                                                       // 2523
        function mouseout() {                                                                                          // 2524
            $$.svg.select('.' + CLASS.eventRect).style('cursor', null);                                                // 2525
            $$.hideXGridFocus();                                                                                       // 2526
            $$.hideTooltip();                                                                                          // 2527
            $$.unexpandCircles();                                                                                      // 2528
            $$.unexpandBars();                                                                                         // 2529
        }                                                                                                              // 2530
                                                                                                                       // 2531
        eventRectEnter.append('rect')                                                                                  // 2532
            .attr('x', 0)                                                                                              // 2533
            .attr('y', 0)                                                                                              // 2534
            .attr('width', $$.width)                                                                                   // 2535
            .attr('height', $$.height)                                                                                 // 2536
            .attr('class', CLASS.eventRect)                                                                            // 2537
            .on('mouseout', function () {                                                                              // 2538
                if (!$$.config) { return; } // chart is destroyed                                                      // 2539
                if ($$.hasArcType()) { return; }                                                                       // 2540
                mouseout();                                                                                            // 2541
            })                                                                                                         // 2542
            .on('mousemove', function () {                                                                             // 2543
                var targetsToShow = $$.filterTargetsToShow($$.data.targets);                                           // 2544
                var mouse, closest, sameXData, selectedData;                                                           // 2545
                                                                                                                       // 2546
                if ($$.dragging) { return; } // do nothing when dragging                                               // 2547
                if ($$.hasArcType(targetsToShow)) { return; }                                                          // 2548
                                                                                                                       // 2549
                mouse = d3.mouse(this);                                                                                // 2550
                closest = $$.findClosestFromTargets(targetsToShow, mouse);                                             // 2551
                                                                                                                       // 2552
                if ($$.mouseover && (!closest || closest.id !== $$.mouseover.id)) {                                    // 2553
                    config.data_onmouseout.call($$.api, $$.mouseover);                                                 // 2554
                    $$.mouseover = undefined;                                                                          // 2555
                }                                                                                                      // 2556
                                                                                                                       // 2557
                if (! closest) {                                                                                       // 2558
                    mouseout();                                                                                        // 2559
                    return;                                                                                            // 2560
                }                                                                                                      // 2561
                                                                                                                       // 2562
                if ($$.isScatterType(closest) || !config.tooltip_grouped) {                                            // 2563
                    sameXData = [closest];                                                                             // 2564
                } else {                                                                                               // 2565
                    sameXData = $$.filterByX(targetsToShow, closest.x);                                                // 2566
                }                                                                                                      // 2567
                                                                                                                       // 2568
                // show tooltip when cursor is close to some point                                                     // 2569
                selectedData = sameXData.map(function (d) {                                                            // 2570
                    return $$.addName(d);                                                                              // 2571
                });                                                                                                    // 2572
                $$.showTooltip(selectedData, this);                                                                    // 2573
                                                                                                                       // 2574
                // expand points                                                                                       // 2575
                if (config.point_focus_expand_enabled) {                                                               // 2576
                    $$.expandCircles(closest.index, closest.id, true);                                                 // 2577
                }                                                                                                      // 2578
                $$.expandBars(closest.index, closest.id, true);                                                        // 2579
                                                                                                                       // 2580
                // Show xgrid focus line                                                                               // 2581
                $$.showXGridFocus(selectedData);                                                                       // 2582
                                                                                                                       // 2583
                // Show cursor as pointer if point is close to mouse position                                          // 2584
                if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {                  // 2585
                    $$.svg.select('.' + CLASS.eventRect).style('cursor', 'pointer');                                   // 2586
                    if (!$$.mouseover) {                                                                               // 2587
                        config.data_onmouseover.call($$.api, closest);                                                 // 2588
                        $$.mouseover = closest;                                                                        // 2589
                    }                                                                                                  // 2590
                }                                                                                                      // 2591
            })                                                                                                         // 2592
            .on('click', function () {                                                                                 // 2593
                var targetsToShow = $$.filterTargetsToShow($$.data.targets);                                           // 2594
                var mouse, closest;                                                                                    // 2595
                if ($$.hasArcType(targetsToShow)) { return; }                                                          // 2596
                                                                                                                       // 2597
                mouse = d3.mouse(this);                                                                                // 2598
                closest = $$.findClosestFromTargets(targetsToShow, mouse);                                             // 2599
                if (! closest) { return; }                                                                             // 2600
                // select if selection enabled                                                                         // 2601
                if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {                  // 2602
                    $$.main.selectAll('.' + CLASS.shapes + $$.getTargetSelectorSuffix(closest.id)).selectAll('.' + CLASS.shape + '-' + closest.index).each(function () {
                        if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {                        // 2604
                            $$.toggleShape(this, closest, closest.index);                                              // 2605
                            $$.config.data_onclick.call($$.api, closest, this);                                        // 2606
                        }                                                                                              // 2607
                    });                                                                                                // 2608
                }                                                                                                      // 2609
            })                                                                                                         // 2610
            .call(                                                                                                     // 2611
                config.data_selection_draggable && $$.drag ? (                                                         // 2612
                    d3.behavior.drag().origin(Object)                                                                  // 2613
                        .on('drag', function () { $$.drag(d3.mouse(this)); })                                          // 2614
                        .on('dragstart', function () { $$.dragstart(d3.mouse(this)); })                                // 2615
                        .on('dragend', function () { $$.dragend(); })                                                  // 2616
                ) : function () {}                                                                                     // 2617
            );                                                                                                         // 2618
    };                                                                                                                 // 2619
    c3_chart_internal_fn.dispatchEvent = function (type, index, mouse) {                                               // 2620
        var $$ = this,                                                                                                 // 2621
            selector = '.' + CLASS.eventRect + (!$$.isMultipleX() ? '-' + index : ''),                                 // 2622
            eventRect = $$.main.select(selector).node(),                                                               // 2623
            box = eventRect.getBoundingClientRect(),                                                                   // 2624
            x = box.left + (mouse ? mouse[0] : 0),                                                                     // 2625
            y = box.top + (mouse ? mouse[1] : 0),                                                                      // 2626
            event = document.createEvent("MouseEvents");                                                               // 2627
                                                                                                                       // 2628
        event.initMouseEvent(type, true, true, window, 0, x, y, x, y,                                                  // 2629
                             false, false, false, false, 0, null);                                                     // 2630
        eventRect.dispatchEvent(event);                                                                                // 2631
    };                                                                                                                 // 2632
                                                                                                                       // 2633
    c3_chart_internal_fn.getCurrentWidth = function () {                                                               // 2634
        var $$ = this, config = $$.config;                                                                             // 2635
        return config.size_width ? config.size_width : $$.getParentWidth();                                            // 2636
    };                                                                                                                 // 2637
    c3_chart_internal_fn.getCurrentHeight = function () {                                                              // 2638
        var $$ = this, config = $$.config,                                                                             // 2639
            h = config.size_height ? config.size_height : $$.getParentHeight();                                        // 2640
        return h > 0 ? h : 320 / ($$.hasType('gauge') ? 2 : 1);                                                        // 2641
    };                                                                                                                 // 2642
    c3_chart_internal_fn.getCurrentPaddingTop = function () {                                                          // 2643
        var $$ = this,                                                                                                 // 2644
            config = $$.config,                                                                                        // 2645
            padding = isValue(config.padding_top) ? config.padding_top : 0;                                            // 2646
        if ($$.title && $$.title.node()) {                                                                             // 2647
            padding += $$.getTitlePadding();                                                                           // 2648
        }                                                                                                              // 2649
        return padding;                                                                                                // 2650
    };                                                                                                                 // 2651
    c3_chart_internal_fn.getCurrentPaddingBottom = function () {                                                       // 2652
        var config = this.config;                                                                                      // 2653
        return isValue(config.padding_bottom) ? config.padding_bottom : 0;                                             // 2654
    };                                                                                                                 // 2655
    c3_chart_internal_fn.getCurrentPaddingLeft = function (withoutRecompute) {                                         // 2656
        var $$ = this, config = $$.config;                                                                             // 2657
        if (isValue(config.padding_left)) {                                                                            // 2658
            return config.padding_left;                                                                                // 2659
        } else if (config.axis_rotated) {                                                                              // 2660
            return !config.axis_x_show ? 1 : Math.max(ceil10($$.getAxisWidthByAxisId('x', withoutRecompute)), 40);     // 2661
        } else if (!config.axis_y_show || config.axis_y_inner) { // && !config.axis_rotated                            // 2662
            return $$.axis.getYAxisLabelPosition().isOuter ? 30 : 1;                                                   // 2663
        } else {                                                                                                       // 2664
            return ceil10($$.getAxisWidthByAxisId('y', withoutRecompute));                                             // 2665
        }                                                                                                              // 2666
    };                                                                                                                 // 2667
    c3_chart_internal_fn.getCurrentPaddingRight = function () {                                                        // 2668
        var $$ = this, config = $$.config,                                                                             // 2669
            defaultPadding = 10, legendWidthOnRight = $$.isLegendRight ? $$.getLegendWidth() + 20 : 0;                 // 2670
        if (isValue(config.padding_right)) {                                                                           // 2671
            return config.padding_right + 1; // 1 is needed not to hide tick line                                      // 2672
        } else if (config.axis_rotated) {                                                                              // 2673
            return defaultPadding + legendWidthOnRight;                                                                // 2674
        } else if (!config.axis_y2_show || config.axis_y2_inner) { // && !config.axis_rotated                          // 2675
            return 2 + legendWidthOnRight + ($$.axis.getY2AxisLabelPosition().isOuter ? 20 : 0);                       // 2676
        } else {                                                                                                       // 2677
            return ceil10($$.getAxisWidthByAxisId('y2')) + legendWidthOnRight;                                         // 2678
        }                                                                                                              // 2679
    };                                                                                                                 // 2680
                                                                                                                       // 2681
    c3_chart_internal_fn.getParentRectValue = function (key) {                                                         // 2682
        var parent = this.selectChart.node(), v;                                                                       // 2683
        while (parent && parent.tagName !== 'BODY') {                                                                  // 2684
            try {                                                                                                      // 2685
                v = parent.getBoundingClientRect()[key];                                                               // 2686
            } catch(e) {                                                                                               // 2687
                if (key === 'width') {                                                                                 // 2688
                    // In IE in certain cases getBoundingClientRect                                                    // 2689
                    // will cause an "unspecified error"                                                               // 2690
                    v = parent.offsetWidth;                                                                            // 2691
                }                                                                                                      // 2692
            }                                                                                                          // 2693
            if (v) {                                                                                                   // 2694
                break;                                                                                                 // 2695
            }                                                                                                          // 2696
            parent = parent.parentNode;                                                                                // 2697
        }                                                                                                              // 2698
        return v;                                                                                                      // 2699
    };                                                                                                                 // 2700
    c3_chart_internal_fn.getParentWidth = function () {                                                                // 2701
        return this.getParentRectValue('width');                                                                       // 2702
    };                                                                                                                 // 2703
    c3_chart_internal_fn.getParentHeight = function () {                                                               // 2704
        var h = this.selectChart.style('height');                                                                      // 2705
        return h.indexOf('px') > 0 ? +h.replace('px', '') : 0;                                                         // 2706
    };                                                                                                                 // 2707
                                                                                                                       // 2708
                                                                                                                       // 2709
    c3_chart_internal_fn.getSvgLeft = function (withoutRecompute) {                                                    // 2710
        var $$ = this, config = $$.config,                                                                             // 2711
            hasLeftAxisRect = config.axis_rotated || (!config.axis_rotated && !config.axis_y_inner),                   // 2712
            leftAxisClass = config.axis_rotated ? CLASS.axisX : CLASS.axisY,                                           // 2713
            leftAxis = $$.main.select('.' + leftAxisClass).node(),                                                     // 2714
            svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : {right: 0},                     // 2715
            chartRect = $$.selectChart.node().getBoundingClientRect(),                                                 // 2716
            hasArc = $$.hasArcType(),                                                                                  // 2717
            svgLeft = svgRect.right - chartRect.left - (hasArc ? 0 : $$.getCurrentPaddingLeft(withoutRecompute));      // 2718
        return svgLeft > 0 ? svgLeft : 0;                                                                              // 2719
    };                                                                                                                 // 2720
                                                                                                                       // 2721
                                                                                                                       // 2722
    c3_chart_internal_fn.getAxisWidthByAxisId = function (id, withoutRecompute) {                                      // 2723
        var $$ = this, position = $$.axis.getLabelPositionById(id);                                                    // 2724
        return $$.axis.getMaxTickWidth(id, withoutRecompute) + (position.isInner ? 20 : 40);                           // 2725
    };                                                                                                                 // 2726
    c3_chart_internal_fn.getHorizontalAxisHeight = function (axisId) {                                                 // 2727
        var $$ = this, config = $$.config, h = 30;                                                                     // 2728
        if (axisId === 'x' && !config.axis_x_show) { return 8; }                                                       // 2729
        if (axisId === 'x' && config.axis_x_height) { return config.axis_x_height; }                                   // 2730
        if (axisId === 'y' && !config.axis_y_show) { return config.legend_show && !$$.isLegendRight && !$$.isLegendInset ? 10 : 1; }
        if (axisId === 'y2' && !config.axis_y2_show) { return $$.rotated_padding_top; }                                // 2732
        // Calculate x axis height when tick rotated                                                                   // 2733
        if (axisId === 'x' && !config.axis_rotated && config.axis_x_tick_rotate) {                                     // 2734
            h = 30 + $$.axis.getMaxTickWidth(axisId) * Math.cos(Math.PI * (90 - config.axis_x_tick_rotate) / 180);     // 2735
        }                                                                                                              // 2736
        return h + ($$.axis.getLabelPositionById(axisId).isInner ? 0 : 10) + (axisId === 'y2' ? -10 : 0);              // 2737
    };                                                                                                                 // 2738
                                                                                                                       // 2739
    c3_chart_internal_fn.getEventRectWidth = function () {                                                             // 2740
        return Math.max(0, this.xAxis.tickInterval());                                                                 // 2741
    };                                                                                                                 // 2742
                                                                                                                       // 2743
    c3_chart_internal_fn.getShapeIndices = function (typeFilter) {                                                     // 2744
        var $$ = this, config = $$.config,                                                                             // 2745
            indices = {}, i = 0, j, k;                                                                                 // 2746
        $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)).forEach(function (d) {                          // 2747
            for (j = 0; j < config.data_groups.length; j++) {                                                          // 2748
                if (config.data_groups[j].indexOf(d.id) < 0) { continue; }                                             // 2749
                for (k = 0; k < config.data_groups[j].length; k++) {                                                   // 2750
                    if (config.data_groups[j][k] in indices) {                                                         // 2751
                        indices[d.id] = indices[config.data_groups[j][k]];                                             // 2752
                        break;                                                                                         // 2753
                    }                                                                                                  // 2754
                }                                                                                                      // 2755
            }                                                                                                          // 2756
            if (isUndefined(indices[d.id])) { indices[d.id] = i++; }                                                   // 2757
        });                                                                                                            // 2758
        indices.__max__ = i - 1;                                                                                       // 2759
        return indices;                                                                                                // 2760
    };                                                                                                                 // 2761
    c3_chart_internal_fn.getShapeX = function (offset, targetsNum, indices, isSub) {                                   // 2762
        var $$ = this, scale = isSub ? $$.subX : $$.x;                                                                 // 2763
        return function (d) {                                                                                          // 2764
            var index = d.id in indices ? indices[d.id] : 0;                                                           // 2765
            return d.x || d.x === 0 ? scale(d.x) - offset * (targetsNum / 2 - index) : 0;                              // 2766
        };                                                                                                             // 2767
    };                                                                                                                 // 2768
    c3_chart_internal_fn.getShapeY = function (isSub) {                                                                // 2769
        var $$ = this;                                                                                                 // 2770
        return function (d) {                                                                                          // 2771
            var scale = isSub ? $$.getSubYScale(d.id) : $$.getYScale(d.id);                                            // 2772
            return scale(d.value);                                                                                     // 2773
        };                                                                                                             // 2774
    };                                                                                                                 // 2775
    c3_chart_internal_fn.getShapeOffset = function (typeFilter, indices, isSub) {                                      // 2776
        var $$ = this,                                                                                                 // 2777
            targets = $$.orderTargets($$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))),                 // 2778
            targetIds = targets.map(function (t) { return t.id; });                                                    // 2779
        return function (d, i) {                                                                                       // 2780
            var scale = isSub ? $$.getSubYScale(d.id) : $$.getYScale(d.id),                                            // 2781
                y0 = scale(0), offset = y0;                                                                            // 2782
            targets.forEach(function (t) {                                                                             // 2783
                var values = $$.isStepType(d) ? $$.convertValuesToStep(t.values) : t.values;                           // 2784
                if (t.id === d.id || indices[t.id] !== indices[d.id]) { return; }                                      // 2785
                if (targetIds.indexOf(t.id) < targetIds.indexOf(d.id)) {                                               // 2786
                    if (values[i].value * d.value >= 0) {                                                              // 2787
                        offset += scale(values[i].value) - y0;                                                         // 2788
                    }                                                                                                  // 2789
                }                                                                                                      // 2790
            });                                                                                                        // 2791
            return offset;                                                                                             // 2792
        };                                                                                                             // 2793
    };                                                                                                                 // 2794
    c3_chart_internal_fn.isWithinShape = function (that, d) {                                                          // 2795
        var $$ = this,                                                                                                 // 2796
            shape = $$.d3.select(that), isWithin;                                                                      // 2797
        if (!$$.isTargetToShow(d.id)) {                                                                                // 2798
            isWithin = false;                                                                                          // 2799
        }                                                                                                              // 2800
        else if (that.nodeName === 'circle') {                                                                         // 2801
            isWithin = $$.isStepType(d) ? $$.isWithinStep(that, $$.getYScale(d.id)(d.value)) : $$.isWithinCircle(that, $$.pointSelectR(d) * 1.5);
        }                                                                                                              // 2803
        else if (that.nodeName === 'path') {                                                                           // 2804
            isWithin = shape.classed(CLASS.bar) ? $$.isWithinBar(that) : true;                                         // 2805
        }                                                                                                              // 2806
        return isWithin;                                                                                               // 2807
    };                                                                                                                 // 2808
                                                                                                                       // 2809
                                                                                                                       // 2810
    c3_chart_internal_fn.getInterpolate = function (d) {                                                               // 2811
        var $$ = this;                                                                                                 // 2812
        return $$.isSplineType(d) ? "cardinal" : $$.isStepType(d) ? $$.config.line_step_type : "linear";               // 2813
    };                                                                                                                 // 2814
                                                                                                                       // 2815
    c3_chart_internal_fn.initLine = function () {                                                                      // 2816
        var $$ = this;                                                                                                 // 2817
        $$.main.select('.' + CLASS.chart).append("g")                                                                  // 2818
            .attr("class", CLASS.chartLines);                                                                          // 2819
    };                                                                                                                 // 2820
    c3_chart_internal_fn.updateTargetsForLine = function (targets) {                                                   // 2821
        var $$ = this, config = $$.config,                                                                             // 2822
            mainLineUpdate, mainLineEnter,                                                                             // 2823
            classChartLine = $$.classChartLine.bind($$),                                                               // 2824
            classLines = $$.classLines.bind($$),                                                                       // 2825
            classAreas = $$.classAreas.bind($$),                                                                       // 2826
            classCircles = $$.classCircles.bind($$),                                                                   // 2827
            classFocus = $$.classFocus.bind($$);                                                                       // 2828
        mainLineUpdate = $$.main.select('.' + CLASS.chartLines).selectAll('.' + CLASS.chartLine)                       // 2829
            .data(targets)                                                                                             // 2830
            .attr('class', function (d) { return classChartLine(d) + classFocus(d); });                                // 2831
        mainLineEnter = mainLineUpdate.enter().append('g')                                                             // 2832
            .attr('class', classChartLine)                                                                             // 2833
            .style('opacity', 0)                                                                                       // 2834
            .style("pointer-events", "none");                                                                          // 2835
        // Lines for each data                                                                                         // 2836
        mainLineEnter.append('g')                                                                                      // 2837
            .attr("class", classLines);                                                                                // 2838
        // Areas                                                                                                       // 2839
        mainLineEnter.append('g')                                                                                      // 2840
            .attr('class', classAreas);                                                                                // 2841
        // Circles for each data point on lines                                                                        // 2842
        mainLineEnter.append('g')                                                                                      // 2843
            .attr("class", function (d) { return $$.generateClass(CLASS.selectedCircles, d.id); });                    // 2844
        mainLineEnter.append('g')                                                                                      // 2845
            .attr("class", classCircles)                                                                               // 2846
            .style("cursor", function (d) { return config.data_selection_isselectable(d) ? "pointer" : null; });       // 2847
        // Update date for selected circles                                                                            // 2848
        targets.forEach(function (t) {                                                                                 // 2849
            $$.main.selectAll('.' + CLASS.selectedCircles + $$.getTargetSelectorSuffix(t.id)).selectAll('.' + CLASS.selectedCircle).each(function (d) {
                d.value = t.values[d.index].value;                                                                     // 2851
            });                                                                                                        // 2852
        });                                                                                                            // 2853
        // MEMO: can not keep same color...                                                                            // 2854
        //mainLineUpdate.exit().remove();                                                                              // 2855
    };                                                                                                                 // 2856
    c3_chart_internal_fn.updateLine = function (durationForExit) {                                                     // 2857
        var $$ = this;                                                                                                 // 2858
        $$.mainLine = $$.main.selectAll('.' + CLASS.lines).selectAll('.' + CLASS.line)                                 // 2859
            .data($$.lineData.bind($$));                                                                               // 2860
        $$.mainLine.enter().append('path')                                                                             // 2861
            .attr('class', $$.classLine.bind($$))                                                                      // 2862
            .style("stroke", $$.color);                                                                                // 2863
        $$.mainLine                                                                                                    // 2864
            .style("opacity", $$.initialOpacity.bind($$))                                                              // 2865
            .style('shape-rendering', function (d) { return $$.isStepType(d) ? 'crispEdges' : ''; })                   // 2866
            .attr('transform', null);                                                                                  // 2867
        $$.mainLine.exit().transition().duration(durationForExit)                                                      // 2868
            .style('opacity', 0)                                                                                       // 2869
            .remove();                                                                                                 // 2870
    };                                                                                                                 // 2871
    c3_chart_internal_fn.redrawLine = function (drawLine, withTransition) {                                            // 2872
        return [                                                                                                       // 2873
            (withTransition ? this.mainLine.transition() : this.mainLine)                                              // 2874
                .attr("d", drawLine)                                                                                   // 2875
                .style("stroke", this.color)                                                                           // 2876
                .style("opacity", 1)                                                                                   // 2877
        ];                                                                                                             // 2878
    };                                                                                                                 // 2879
    c3_chart_internal_fn.generateDrawLine = function (lineIndices, isSub) {                                            // 2880
        var $$ = this, config = $$.config,                                                                             // 2881
            line = $$.d3.svg.line(),                                                                                   // 2882
            getPoints = $$.generateGetLinePoints(lineIndices, isSub),                                                  // 2883
            yScaleGetter = isSub ? $$.getSubYScale : $$.getYScale,                                                     // 2884
            xValue = function (d) { return (isSub ? $$.subxx : $$.xx).call($$, d); },                                  // 2885
            yValue = function (d, i) {                                                                                 // 2886
                return config.data_groups.length > 0 ? getPoints(d, i)[0][1] : yScaleGetter.call($$, d.id)(d.value);   // 2887
            };                                                                                                         // 2888
                                                                                                                       // 2889
        line = config.axis_rotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue);                              // 2890
        if (!config.line_connectNull) { line = line.defined(function (d) { return d.value != null; }); }               // 2891
        return function (d) {                                                                                          // 2892
            var values = config.line_connectNull ? $$.filterRemoveNull(d.values) : d.values,                           // 2893
                x = isSub ? $$.x : $$.subX, y = yScaleGetter.call($$, d.id), x0 = 0, y0 = 0, path;                     // 2894
            if ($$.isLineType(d)) {                                                                                    // 2895
                if (config.data_regions[d.id]) {                                                                       // 2896
                    path = $$.lineWithRegions(values, x, y, config.data_regions[d.id]);                                // 2897
                } else {                                                                                               // 2898
                    if ($$.isStepType(d)) { values = $$.convertValuesToStep(values); }                                 // 2899
                    path = line.interpolate($$.getInterpolate(d))(values);                                             // 2900
                }                                                                                                      // 2901
            } else {                                                                                                   // 2902
                if (values[0]) {                                                                                       // 2903
                    x0 = x(values[0].x);                                                                               // 2904
                    y0 = y(values[0].value);                                                                           // 2905
                }                                                                                                      // 2906
                path = config.axis_rotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;                              // 2907
            }                                                                                                          // 2908
            return path ? path : "M 0 0";                                                                              // 2909
        };                                                                                                             // 2910
    };                                                                                                                 // 2911
    c3_chart_internal_fn.generateGetLinePoints = function (lineIndices, isSub) { // partial duplication of generateGetBarPoints
        var $$ = this, config = $$.config,                                                                             // 2913
            lineTargetsNum = lineIndices.__max__ + 1,                                                                  // 2914
            x = $$.getShapeX(0, lineTargetsNum, lineIndices, !!isSub),                                                 // 2915
            y = $$.getShapeY(!!isSub),                                                                                 // 2916
            lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, !!isSub),                                       // 2917
            yScale = isSub ? $$.getSubYScale : $$.getYScale;                                                           // 2918
        return function (d, i) {                                                                                       // 2919
            var y0 = yScale.call($$, d.id)(0),                                                                         // 2920
                offset = lineOffset(d, i) || y0, // offset is for stacked area chart                                   // 2921
                posX = x(d), posY = y(d);                                                                              // 2922
            // fix posY not to overflow opposite quadrant                                                              // 2923
            if (config.axis_rotated) {                                                                                 // 2924
                if ((0 < d.value && posY < y0) || (d.value < 0 && y0 < posY)) { posY = y0; }                           // 2925
            }                                                                                                          // 2926
            // 1 point that marks the line position                                                                    // 2927
            return [                                                                                                   // 2928
                [posX, posY - (y0 - offset)],                                                                          // 2929
                [posX, posY - (y0 - offset)], // needed for compatibility                                              // 2930
                [posX, posY - (y0 - offset)], // needed for compatibility                                              // 2931
                [posX, posY - (y0 - offset)]  // needed for compatibility                                              // 2932
            ];                                                                                                         // 2933
        };                                                                                                             // 2934
    };                                                                                                                 // 2935
                                                                                                                       // 2936
                                                                                                                       // 2937
    c3_chart_internal_fn.lineWithRegions = function (d, x, y, _regions) {                                              // 2938
        var $$ = this, config = $$.config,                                                                             // 2939
            prev = -1, i, j,                                                                                           // 2940
            s = "M", sWithRegion,                                                                                      // 2941
            xp, yp, dx, dy, dd, diff, diffx2,                                                                          // 2942
            xOffset = $$.isCategorized() ? 0.5 : 0,                                                                    // 2943
            xValue, yValue,                                                                                            // 2944
            regions = [];                                                                                              // 2945
                                                                                                                       // 2946
        function isWithinRegions(x, regions) {                                                                         // 2947
            var i;                                                                                                     // 2948
            for (i = 0; i < regions.length; i++) {                                                                     // 2949
                if (regions[i].start < x && x <= regions[i].end) { return true; }                                      // 2950
            }                                                                                                          // 2951
            return false;                                                                                              // 2952
        }                                                                                                              // 2953
                                                                                                                       // 2954
        // Check start/end of regions                                                                                  // 2955
        if (isDefined(_regions)) {                                                                                     // 2956
            for (i = 0; i < _regions.length; i++) {                                                                    // 2957
                regions[i] = {};                                                                                       // 2958
                if (isUndefined(_regions[i].start)) {                                                                  // 2959
                    regions[i].start = d[0].x;                                                                         // 2960
                } else {                                                                                               // 2961
                    regions[i].start = $$.isTimeSeries() ? $$.parseDate(_regions[i].start) : _regions[i].start;        // 2962
                }                                                                                                      // 2963
                if (isUndefined(_regions[i].end)) {                                                                    // 2964
                    regions[i].end = d[d.length - 1].x;                                                                // 2965
                } else {                                                                                               // 2966
                    regions[i].end = $$.isTimeSeries() ? $$.parseDate(_regions[i].end) : _regions[i].end;              // 2967
                }                                                                                                      // 2968
            }                                                                                                          // 2969
        }                                                                                                              // 2970
                                                                                                                       // 2971
        // Set scales                                                                                                  // 2972
        xValue = config.axis_rotated ? function (d) { return y(d.value); } : function (d) { return x(d.x); };          // 2973
        yValue = config.axis_rotated ? function (d) { return x(d.x); } : function (d) { return y(d.value); };          // 2974
                                                                                                                       // 2975
        // Define svg generator function for region                                                                    // 2976
        function generateM(points) {                                                                                   // 2977
            return 'M' + points[0][0] + ' ' + points[0][1] + ' ' + points[1][0] + ' ' + points[1][1];                  // 2978
        }                                                                                                              // 2979
        if ($$.isTimeSeries()) {                                                                                       // 2980
            sWithRegion = function (d0, d1, j, diff) {                                                                 // 2981
                var x0 = d0.x.getTime(), x_diff = d1.x - d0.x,                                                         // 2982
                    xv0 = new Date(x0 + x_diff * j),                                                                   // 2983
                    xv1 = new Date(x0 + x_diff * (j + diff)),                                                          // 2984
                    points;                                                                                            // 2985
                if (config.axis_rotated) {                                                                             // 2986
                    points = [[y(yp(j)), x(xv0)], [y(yp(j + diff)), x(xv1)]];                                          // 2987
                } else {                                                                                               // 2988
                    points = [[x(xv0), y(yp(j))], [x(xv1), y(yp(j + diff))]];                                          // 2989
                }                                                                                                      // 2990
                return generateM(points);                                                                              // 2991
            };                                                                                                         // 2992
        } else {                                                                                                       // 2993
            sWithRegion = function (d0, d1, j, diff) {                                                                 // 2994
                var points;                                                                                            // 2995
                if (config.axis_rotated) {                                                                             // 2996
                    points = [[y(yp(j), true), x(xp(j))], [y(yp(j + diff), true), x(xp(j + diff))]];                   // 2997
                } else {                                                                                               // 2998
                    points = [[x(xp(j), true), y(yp(j))], [x(xp(j + diff), true), y(yp(j + diff))]];                   // 2999
                }                                                                                                      // 3000
                return generateM(points);                                                                              // 3001
            };                                                                                                         // 3002
        }                                                                                                              // 3003
                                                                                                                       // 3004
        // Generate                                                                                                    // 3005
        for (i = 0; i < d.length; i++) {                                                                               // 3006
                                                                                                                       // 3007
            // Draw as normal                                                                                          // 3008
            if (isUndefined(regions) || ! isWithinRegions(d[i].x, regions)) {                                          // 3009
                s += " " + xValue(d[i]) + " " + yValue(d[i]);                                                          // 3010
            }                                                                                                          // 3011
            // Draw with region // TODO: Fix for horizotal charts                                                      // 3012
            else {                                                                                                     // 3013
                xp = $$.getScale(d[i - 1].x + xOffset, d[i].x + xOffset, $$.isTimeSeries());                           // 3014
                yp = $$.getScale(d[i - 1].value, d[i].value);                                                          // 3015
                                                                                                                       // 3016
                dx = x(d[i].x) - x(d[i - 1].x);                                                                        // 3017
                dy = y(d[i].value) - y(d[i - 1].value);                                                                // 3018
                dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));                                                     // 3019
                diff = 2 / dd;                                                                                         // 3020
                diffx2 = diff * 2;                                                                                     // 3021
                                                                                                                       // 3022
                for (j = diff; j <= 1; j += diffx2) {                                                                  // 3023
                    s += sWithRegion(d[i - 1], d[i], j, diff);                                                         // 3024
                }                                                                                                      // 3025
            }                                                                                                          // 3026
            prev = d[i].x;                                                                                             // 3027
        }                                                                                                              // 3028
                                                                                                                       // 3029
        return s;                                                                                                      // 3030
    };                                                                                                                 // 3031
                                                                                                                       // 3032
                                                                                                                       // 3033
    c3_chart_internal_fn.updateArea = function (durationForExit) {                                                     // 3034
        var $$ = this, d3 = $$.d3;                                                                                     // 3035
        $$.mainArea = $$.main.selectAll('.' + CLASS.areas).selectAll('.' + CLASS.area)                                 // 3036
            .data($$.lineData.bind($$));                                                                               // 3037
        $$.mainArea.enter().append('path')                                                                             // 3038
            .attr("class", $$.classArea.bind($$))                                                                      // 3039
            .style("fill", $$.color)                                                                                   // 3040
            .style("opacity", function () { $$.orgAreaOpacity = +d3.select(this).style('opacity'); return 0; });       // 3041
        $$.mainArea                                                                                                    // 3042
            .style("opacity", $$.orgAreaOpacity);                                                                      // 3043
        $$.mainArea.exit().transition().duration(durationForExit)                                                      // 3044
            .style('opacity', 0)                                                                                       // 3045
            .remove();                                                                                                 // 3046
    };                                                                                                                 // 3047
    c3_chart_internal_fn.redrawArea = function (drawArea, withTransition) {                                            // 3048
        return [                                                                                                       // 3049
            (withTransition ? this.mainArea.transition() : this.mainArea)                                              // 3050
                .attr("d", drawArea)                                                                                   // 3051
                .style("fill", this.color)                                                                             // 3052
                .style("opacity", this.orgAreaOpacity)                                                                 // 3053
        ];                                                                                                             // 3054
    };                                                                                                                 // 3055
    c3_chart_internal_fn.generateDrawArea = function (areaIndices, isSub) {                                            // 3056
        var $$ = this, config = $$.config, area = $$.d3.svg.area(),                                                    // 3057
            getPoints = $$.generateGetAreaPoints(areaIndices, isSub),                                                  // 3058
            yScaleGetter = isSub ? $$.getSubYScale : $$.getYScale,                                                     // 3059
            xValue = function (d) { return (isSub ? $$.subxx : $$.xx).call($$, d); },                                  // 3060
            value0 = function (d, i) {                                                                                 // 3061
                return config.data_groups.length > 0 ? getPoints(d, i)[0][1] : yScaleGetter.call($$, d.id)($$.getAreaBaseValue(d.id));
            },                                                                                                         // 3063
            value1 = function (d, i) {                                                                                 // 3064
                return config.data_groups.length > 0 ? getPoints(d, i)[1][1] : yScaleGetter.call($$, d.id)(d.value);   // 3065
            };                                                                                                         // 3066
                                                                                                                       // 3067
        area = config.axis_rotated ? area.x0(value0).x1(value1).y(xValue) : area.x(xValue).y0(value0).y1(value1);      // 3068
        if (!config.line_connectNull) {                                                                                // 3069
            area = area.defined(function (d) { return d.value !== null; });                                            // 3070
        }                                                                                                              // 3071
                                                                                                                       // 3072
        return function (d) {                                                                                          // 3073
            var values = config.line_connectNull ? $$.filterRemoveNull(d.values) : d.values,                           // 3074
                x0 = 0, y0 = 0, path;                                                                                  // 3075
            if ($$.isAreaType(d)) {                                                                                    // 3076
                if ($$.isStepType(d)) { values = $$.convertValuesToStep(values); }                                     // 3077
                path = area.interpolate($$.getInterpolate(d))(values);                                                 // 3078
            } else {                                                                                                   // 3079
                if (values[0]) {                                                                                       // 3080
                    x0 = $$.x(values[0].x);                                                                            // 3081
                    y0 = $$.getYScale(d.id)(values[0].value);                                                          // 3082
                }                                                                                                      // 3083
                path = config.axis_rotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;                              // 3084
            }                                                                                                          // 3085
            return path ? path : "M 0 0";                                                                              // 3086
        };                                                                                                             // 3087
    };                                                                                                                 // 3088
    c3_chart_internal_fn.getAreaBaseValue = function () {                                                              // 3089
        return 0;                                                                                                      // 3090
    };                                                                                                                 // 3091
    c3_chart_internal_fn.generateGetAreaPoints = function (areaIndices, isSub) { // partial duplication of generateGetBarPoints
        var $$ = this, config = $$.config,                                                                             // 3093
            areaTargetsNum = areaIndices.__max__ + 1,                                                                  // 3094
            x = $$.getShapeX(0, areaTargetsNum, areaIndices, !!isSub),                                                 // 3095
            y = $$.getShapeY(!!isSub),                                                                                 // 3096
            areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, !!isSub),                                       // 3097
            yScale = isSub ? $$.getSubYScale : $$.getYScale;                                                           // 3098
        return function (d, i) {                                                                                       // 3099
            var y0 = yScale.call($$, d.id)(0),                                                                         // 3100
                offset = areaOffset(d, i) || y0, // offset is for stacked area chart                                   // 3101
                posX = x(d), posY = y(d);                                                                              // 3102
            // fix posY not to overflow opposite quadrant                                                              // 3103
            if (config.axis_rotated) {                                                                                 // 3104
                if ((0 < d.value && posY < y0) || (d.value < 0 && y0 < posY)) { posY = y0; }                           // 3105
            }                                                                                                          // 3106
            // 1 point that marks the area position                                                                    // 3107
            return [                                                                                                   // 3108
                [posX, offset],                                                                                        // 3109
                [posX, posY - (y0 - offset)],                                                                          // 3110
                [posX, posY - (y0 - offset)], // needed for compatibility                                              // 3111
                [posX, offset] // needed for compatibility                                                             // 3112
            ];                                                                                                         // 3113
        };                                                                                                             // 3114
    };                                                                                                                 // 3115
                                                                                                                       // 3116
                                                                                                                       // 3117
    c3_chart_internal_fn.updateCircle = function () {                                                                  // 3118
        var $$ = this;                                                                                                 // 3119
        $$.mainCircle = $$.main.selectAll('.' + CLASS.circles).selectAll('.' + CLASS.circle)                           // 3120
            .data($$.lineOrScatterData.bind($$));                                                                      // 3121
        $$.mainCircle.enter().append("circle")                                                                         // 3122
            .attr("class", $$.classCircle.bind($$))                                                                    // 3123
            .attr("r", $$.pointR.bind($$))                                                                             // 3124
            .style("fill", $$.color);                                                                                  // 3125
        $$.mainCircle                                                                                                  // 3126
            .style("opacity", $$.initialOpacityForCircle.bind($$));                                                    // 3127
        $$.mainCircle.exit().remove();                                                                                 // 3128
    };                                                                                                                 // 3129
    c3_chart_internal_fn.redrawCircle = function (cx, cy, withTransition) {                                            // 3130
        var selectedCircles = this.main.selectAll('.' + CLASS.selectedCircle);                                         // 3131
        return [                                                                                                       // 3132
            (withTransition ? this.mainCircle.transition() : this.mainCircle)                                          // 3133
                .style('opacity', this.opacityForCircle.bind(this))                                                    // 3134
                .style("fill", this.color)                                                                             // 3135
                .attr("cx", cx)                                                                                        // 3136
                .attr("cy", cy),                                                                                       // 3137
            (withTransition ? selectedCircles.transition() : selectedCircles)                                          // 3138
                .attr("cx", cx)                                                                                        // 3139
                .attr("cy", cy)                                                                                        // 3140
        ];                                                                                                             // 3141
    };                                                                                                                 // 3142
    c3_chart_internal_fn.circleX = function (d) {                                                                      // 3143
        return d.x || d.x === 0 ? this.x(d.x) : null;                                                                  // 3144
    };                                                                                                                 // 3145
    c3_chart_internal_fn.updateCircleY = function () {                                                                 // 3146
        var $$ = this, lineIndices, getPoints;                                                                         // 3147
        if ($$.config.data_groups.length > 0) {                                                                        // 3148
            lineIndices = $$.getShapeIndices($$.isLineType),                                                           // 3149
            getPoints = $$.generateGetLinePoints(lineIndices);                                                         // 3150
            $$.circleY = function (d, i) {                                                                             // 3151
                return getPoints(d, i)[0][1];                                                                          // 3152
            };                                                                                                         // 3153
        } else {                                                                                                       // 3154
            $$.circleY = function (d) {                                                                                // 3155
                return $$.getYScale(d.id)(d.value);                                                                    // 3156
            };                                                                                                         // 3157
        }                                                                                                              // 3158
    };                                                                                                                 // 3159
    c3_chart_internal_fn.getCircles = function (i, id) {                                                               // 3160
        var $$ = this;                                                                                                 // 3161
        return (id ? $$.main.selectAll('.' + CLASS.circles + $$.getTargetSelectorSuffix(id)) : $$.main).selectAll('.' + CLASS.circle + (isValue(i) ? '-' + i : ''));
    };                                                                                                                 // 3163
    c3_chart_internal_fn.expandCircles = function (i, id, reset) {                                                     // 3164
        var $$ = this,                                                                                                 // 3165
            r = $$.pointExpandedR.bind($$);                                                                            // 3166
        if (reset) { $$.unexpandCircles(); }                                                                           // 3167
        $$.getCircles(i, id)                                                                                           // 3168
            .classed(CLASS.EXPANDED, true)                                                                             // 3169
            .attr('r', r);                                                                                             // 3170
    };                                                                                                                 // 3171
    c3_chart_internal_fn.unexpandCircles = function (i) {                                                              // 3172
        var $$ = this,                                                                                                 // 3173
            r = $$.pointR.bind($$);                                                                                    // 3174
        $$.getCircles(i)                                                                                               // 3175
            .filter(function () { return $$.d3.select(this).classed(CLASS.EXPANDED); })                                // 3176
            .classed(CLASS.EXPANDED, false)                                                                            // 3177
            .attr('r', r);                                                                                             // 3178
    };                                                                                                                 // 3179
    c3_chart_internal_fn.pointR = function (d) {                                                                       // 3180
        var $$ = this, config = $$.config;                                                                             // 3181
        return $$.isStepType(d) ? 0 : (isFunction(config.point_r) ? config.point_r(d) : config.point_r);               // 3182
    };                                                                                                                 // 3183
    c3_chart_internal_fn.pointExpandedR = function (d) {                                                               // 3184
        var $$ = this, config = $$.config;                                                                             // 3185
        return config.point_focus_expand_enabled ? (config.point_focus_expand_r ? config.point_focus_expand_r : $$.pointR(d) * 1.75) : $$.pointR(d);
    };                                                                                                                 // 3187
    c3_chart_internal_fn.pointSelectR = function (d) {                                                                 // 3188
        var $$ = this, config = $$.config;                                                                             // 3189
        return config.point_select_r ? config.point_select_r : $$.pointR(d) * 4;                                       // 3190
    };                                                                                                                 // 3191
    c3_chart_internal_fn.isWithinCircle = function (that, r) {                                                         // 3192
        var d3 = this.d3,                                                                                              // 3193
            mouse = d3.mouse(that), d3_this = d3.select(that),                                                         // 3194
            cx = +d3_this.attr("cx"), cy = +d3_this.attr("cy");                                                        // 3195
        return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < r;                                 // 3196
    };                                                                                                                 // 3197
    c3_chart_internal_fn.isWithinStep = function (that, y) {                                                           // 3198
        return Math.abs(y - this.d3.mouse(that)[1]) < 30;                                                              // 3199
    };                                                                                                                 // 3200
                                                                                                                       // 3201
    c3_chart_internal_fn.initBar = function () {                                                                       // 3202
        var $$ = this;                                                                                                 // 3203
        $$.main.select('.' + CLASS.chart).append("g")                                                                  // 3204
            .attr("class", CLASS.chartBars);                                                                           // 3205
    };                                                                                                                 // 3206
    c3_chart_internal_fn.updateTargetsForBar = function (targets) {                                                    // 3207
        var $$ = this, config = $$.config,                                                                             // 3208
            mainBarUpdate, mainBarEnter,                                                                               // 3209
            classChartBar = $$.classChartBar.bind($$),                                                                 // 3210
            classBars = $$.classBars.bind($$),                                                                         // 3211
            classFocus = $$.classFocus.bind($$);                                                                       // 3212
        mainBarUpdate = $$.main.select('.' + CLASS.chartBars).selectAll('.' + CLASS.chartBar)                          // 3213
            .data(targets)                                                                                             // 3214
            .attr('class', function (d) { return classChartBar(d) + classFocus(d); });                                 // 3215
        mainBarEnter = mainBarUpdate.enter().append('g')                                                               // 3216
            .attr('class', classChartBar)                                                                              // 3217
            .style('opacity', 0)                                                                                       // 3218
            .style("pointer-events", "none");                                                                          // 3219
        // Bars for each data                                                                                          // 3220
        mainBarEnter.append('g')                                                                                       // 3221
            .attr("class", classBars)                                                                                  // 3222
            .style("cursor", function (d) { return config.data_selection_isselectable(d) ? "pointer" : null; });       // 3223
                                                                                                                       // 3224
    };                                                                                                                 // 3225
    c3_chart_internal_fn.updateBar = function (durationForExit) {                                                      // 3226
        var $$ = this,                                                                                                 // 3227
            barData = $$.barData.bind($$),                                                                             // 3228
            classBar = $$.classBar.bind($$),                                                                           // 3229
            initialOpacity = $$.initialOpacity.bind($$),                                                               // 3230
            color = function (d) { return $$.color(d.id); };                                                           // 3231
        $$.mainBar = $$.main.selectAll('.' + CLASS.bars).selectAll('.' + CLASS.bar)                                    // 3232
            .data(barData);                                                                                            // 3233
        $$.mainBar.enter().append('path')                                                                              // 3234
            .attr("class", classBar)                                                                                   // 3235
            .style("stroke", color)                                                                                    // 3236
            .style("fill", color);                                                                                     // 3237
        $$.mainBar                                                                                                     // 3238
            .style("opacity", initialOpacity);                                                                         // 3239
        $$.mainBar.exit().transition().duration(durationForExit)                                                       // 3240
            .style('opacity', 0)                                                                                       // 3241
            .remove();                                                                                                 // 3242
    };                                                                                                                 // 3243
    c3_chart_internal_fn.redrawBar = function (drawBar, withTransition) {                                              // 3244
        return [                                                                                                       // 3245
            (withTransition ? this.mainBar.transition() : this.mainBar)                                                // 3246
                .attr('d', drawBar)                                                                                    // 3247
                .style("fill", this.color)                                                                             // 3248
                .style("opacity", 1)                                                                                   // 3249
        ];                                                                                                             // 3250
    };                                                                                                                 // 3251
    c3_chart_internal_fn.getBarW = function (axis, barTargetsNum) {                                                    // 3252
        var $$ = this, config = $$.config,                                                                             // 3253
            w = typeof config.bar_width === 'number' ? config.bar_width : barTargetsNum ? (axis.tickInterval() * config.bar_width_ratio) / barTargetsNum : 0;
        return config.bar_width_max && w > config.bar_width_max ? config.bar_width_max : w;                            // 3255
    };                                                                                                                 // 3256
    c3_chart_internal_fn.getBars = function (i, id) {                                                                  // 3257
        var $$ = this;                                                                                                 // 3258
        return (id ? $$.main.selectAll('.' + CLASS.bars + $$.getTargetSelectorSuffix(id)) : $$.main).selectAll('.' + CLASS.bar + (isValue(i) ? '-' + i : ''));
    };                                                                                                                 // 3260
    c3_chart_internal_fn.expandBars = function (i, id, reset) {                                                        // 3261
        var $$ = this;                                                                                                 // 3262
        if (reset) { $$.unexpandBars(); }                                                                              // 3263
        $$.getBars(i, id).classed(CLASS.EXPANDED, true);                                                               // 3264
    };                                                                                                                 // 3265
    c3_chart_internal_fn.unexpandBars = function (i) {                                                                 // 3266
        var $$ = this;                                                                                                 // 3267
        $$.getBars(i).classed(CLASS.EXPANDED, false);                                                                  // 3268
    };                                                                                                                 // 3269
    c3_chart_internal_fn.generateDrawBar = function (barIndices, isSub) {                                              // 3270
        var $$ = this, config = $$.config,                                                                             // 3271
            getPoints = $$.generateGetBarPoints(barIndices, isSub);                                                    // 3272
        return function (d, i) {                                                                                       // 3273
            // 4 points that make a bar                                                                                // 3274
            var points = getPoints(d, i);                                                                              // 3275
                                                                                                                       // 3276
            // switch points if axis is rotated, not applicable for sub chart                                          // 3277
            var indexX = config.axis_rotated ? 1 : 0;                                                                  // 3278
            var indexY = config.axis_rotated ? 0 : 1;                                                                  // 3279
                                                                                                                       // 3280
            var path = 'M ' + points[0][indexX] + ',' + points[0][indexY] + ' ' +                                      // 3281
                    'L' + points[1][indexX] + ',' + points[1][indexY] + ' ' +                                          // 3282
                    'L' + points[2][indexX] + ',' + points[2][indexY] + ' ' +                                          // 3283
                    'L' + points[3][indexX] + ',' + points[3][indexY] + ' ' +                                          // 3284
                    'z';                                                                                               // 3285
                                                                                                                       // 3286
            return path;                                                                                               // 3287
        };                                                                                                             // 3288
    };                                                                                                                 // 3289
    c3_chart_internal_fn.generateGetBarPoints = function (barIndices, isSub) {                                         // 3290
        var $$ = this,                                                                                                 // 3291
            axis = isSub ? $$.subXAxis : $$.xAxis,                                                                     // 3292
            barTargetsNum = barIndices.__max__ + 1,                                                                    // 3293
            barW = $$.getBarW(axis, barTargetsNum),                                                                    // 3294
            barX = $$.getShapeX(barW, barTargetsNum, barIndices, !!isSub),                                             // 3295
            barY = $$.getShapeY(!!isSub),                                                                              // 3296
            barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub),                                          // 3297
            yScale = isSub ? $$.getSubYScale : $$.getYScale;                                                           // 3298
        return function (d, i) {                                                                                       // 3299
            var y0 = yScale.call($$, d.id)(0),                                                                         // 3300
                offset = barOffset(d, i) || y0, // offset is for stacked bar chart                                     // 3301
                posX = barX(d), posY = barY(d);                                                                        // 3302
            // fix posY not to overflow opposite quadrant                                                              // 3303
            if ($$.config.axis_rotated) {                                                                              // 3304
                if ((0 < d.value && posY < y0) || (d.value < 0 && y0 < posY)) { posY = y0; }                           // 3305
            }                                                                                                          // 3306
            // 4 points that make a bar                                                                                // 3307
            return [                                                                                                   // 3308
                [posX, offset],                                                                                        // 3309
                [posX, posY - (y0 - offset)],                                                                          // 3310
                [posX + barW, posY - (y0 - offset)],                                                                   // 3311
                [posX + barW, offset]                                                                                  // 3312
            ];                                                                                                         // 3313
        };                                                                                                             // 3314
    };                                                                                                                 // 3315
    c3_chart_internal_fn.isWithinBar = function (that) {                                                               // 3316
        var mouse = this.d3.mouse(that), box = that.getBoundingClientRect(),                                           // 3317
            seg0 = that.pathSegList.getItem(0), seg1 = that.pathSegList.getItem(1),                                    // 3318
            x = Math.min(seg0.x, seg1.x), y = Math.min(seg0.y, seg1.y),                                                // 3319
            w = box.width, h = box.height, offset = 2,                                                                 // 3320
            sx = x - offset, ex = x + w + offset, sy = y + h + offset, ey = y - offset;                                // 3321
        return sx < mouse[0] && mouse[0] < ex && ey < mouse[1] && mouse[1] < sy;                                       // 3322
    };                                                                                                                 // 3323
                                                                                                                       // 3324
    c3_chart_internal_fn.initText = function () {                                                                      // 3325
        var $$ = this;                                                                                                 // 3326
        $$.main.select('.' + CLASS.chart).append("g")                                                                  // 3327
            .attr("class", CLASS.chartTexts);                                                                          // 3328
        $$.mainText = $$.d3.selectAll([]);                                                                             // 3329
    };                                                                                                                 // 3330
    c3_chart_internal_fn.updateTargetsForText = function (targets) {                                                   // 3331
        var $$ = this, mainTextUpdate, mainTextEnter,                                                                  // 3332
            classChartText = $$.classChartText.bind($$),                                                               // 3333
            classTexts = $$.classTexts.bind($$),                                                                       // 3334
            classFocus = $$.classFocus.bind($$);                                                                       // 3335
        mainTextUpdate = $$.main.select('.' + CLASS.chartTexts).selectAll('.' + CLASS.chartText)                       // 3336
            .data(targets)                                                                                             // 3337
            .attr('class', function (d) { return classChartText(d) + classFocus(d); });                                // 3338
        mainTextEnter = mainTextUpdate.enter().append('g')                                                             // 3339
            .attr('class', classChartText)                                                                             // 3340
            .style('opacity', 0)                                                                                       // 3341
            .style("pointer-events", "none");                                                                          // 3342
        mainTextEnter.append('g')                                                                                      // 3343
            .attr('class', classTexts);                                                                                // 3344
    };                                                                                                                 // 3345
    c3_chart_internal_fn.updateText = function (durationForExit) {                                                     // 3346
        var $$ = this, config = $$.config,                                                                             // 3347
            barOrLineData = $$.barOrLineData.bind($$),                                                                 // 3348
            classText = $$.classText.bind($$);                                                                         // 3349
        $$.mainText = $$.main.selectAll('.' + CLASS.texts).selectAll('.' + CLASS.text)                                 // 3350
            .data(barOrLineData);                                                                                      // 3351
        $$.mainText.enter().append('text')                                                                             // 3352
            .attr("class", classText)                                                                                  // 3353
            .attr('text-anchor', function (d) { return config.axis_rotated ? (d.value < 0 ? 'end' : 'start') : 'middle'; })
            .style("stroke", 'none')                                                                                   // 3355
            .style("fill", function (d) { return $$.color(d); })                                                       // 3356
            .style("fill-opacity", 0);                                                                                 // 3357
        $$.mainText                                                                                                    // 3358
            .text(function (d, i, j) { return $$.dataLabelFormat(d.id)(d.value, d.id, i, j); });                       // 3359
        $$.mainText.exit()                                                                                             // 3360
            .transition().duration(durationForExit)                                                                    // 3361
            .style('fill-opacity', 0)                                                                                  // 3362
            .remove();                                                                                                 // 3363
    };                                                                                                                 // 3364
    c3_chart_internal_fn.redrawText = function (xForText, yForText, forFlow, withTransition) {                         // 3365
        return [                                                                                                       // 3366
            (withTransition ? this.mainText.transition() : this.mainText)                                              // 3367
                .attr('x', xForText)                                                                                   // 3368
                .attr('y', yForText)                                                                                   // 3369
                .style("fill", this.color)                                                                             // 3370
                .style("fill-opacity", forFlow ? 0 : this.opacityForText.bind(this))                                   // 3371
        ];                                                                                                             // 3372
    };                                                                                                                 // 3373
    c3_chart_internal_fn.getTextRect = function (text, cls) {                                                          // 3374
        var dummy = this.d3.select('body').append('div').classed('c3', true),                                          // 3375
            svg = dummy.append("svg").style('visibility', 'hidden').style('position', 'fixed').style('top', 0).style('left', 0),
            rect;                                                                                                      // 3377
        svg.selectAll('.dummy')                                                                                        // 3378
            .data([text])                                                                                              // 3379
          .enter().append('text')                                                                                      // 3380
            .classed(cls ? cls : "", true)                                                                             // 3381
            .text(text)                                                                                                // 3382
          .each(function () { rect = this.getBoundingClientRect(); });                                                 // 3383
        dummy.remove();                                                                                                // 3384
        return rect;                                                                                                   // 3385
    };                                                                                                                 // 3386
    c3_chart_internal_fn.generateXYForText = function (areaIndices, barIndices, lineIndices, forX) {                   // 3387
        var $$ = this,                                                                                                 // 3388
            getAreaPoints = $$.generateGetAreaPoints(areaIndices, false),                                              // 3389
            getBarPoints = $$.generateGetBarPoints(barIndices, false),                                                 // 3390
            getLinePoints = $$.generateGetLinePoints(lineIndices, false),                                              // 3391
            getter = forX ? $$.getXForText : $$.getYForText;                                                           // 3392
        return function (d, i) {                                                                                       // 3393
            var getPoints = $$.isAreaType(d) ? getAreaPoints : $$.isBarType(d) ? getBarPoints : getLinePoints;         // 3394
            return getter.call($$, getPoints(d, i), d, this);                                                          // 3395
        };                                                                                                             // 3396
    };                                                                                                                 // 3397
    c3_chart_internal_fn.getXForText = function (points, d, textElement) {                                             // 3398
        var $$ = this,                                                                                                 // 3399
            box = textElement.getBoundingClientRect(), xPos, padding;                                                  // 3400
        if ($$.config.axis_rotated) {                                                                                  // 3401
            padding = $$.isBarType(d) ? 4 : 6;                                                                         // 3402
            xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);                                                    // 3403
        } else {                                                                                                       // 3404
            xPos = $$.hasType('bar') ? (points[2][0] + points[0][0]) / 2 : points[0][0];                               // 3405
        }                                                                                                              // 3406
        // show labels regardless of the domain if value is null                                                       // 3407
        if (d.value === null) {                                                                                        // 3408
            if (xPos > $$.width) {                                                                                     // 3409
                xPos = $$.width - box.width;                                                                           // 3410
            } else if (xPos < 0) {                                                                                     // 3411
                xPos = 4;                                                                                              // 3412
            }                                                                                                          // 3413
        }                                                                                                              // 3414
        return xPos;                                                                                                   // 3415
    };                                                                                                                 // 3416
    c3_chart_internal_fn.getYForText = function (points, d, textElement) {                                             // 3417
        var $$ = this,                                                                                                 // 3418
            box = textElement.getBoundingClientRect(),                                                                 // 3419
            yPos;                                                                                                      // 3420
        if ($$.config.axis_rotated) {                                                                                  // 3421
            yPos = (points[0][0] + points[2][0] + box.height * 0.6) / 2;                                               // 3422
        } else {                                                                                                       // 3423
            yPos = points[2][1];                                                                                       // 3424
            if (d.value < 0  || (d.value === 0 && !$$.hasPositiveValue)) {                                             // 3425
                yPos += box.height;                                                                                    // 3426
                if ($$.isBarType(d) && $$.isSafari()) {                                                                // 3427
                    yPos -= 3;                                                                                         // 3428
                }                                                                                                      // 3429
                else if (!$$.isBarType(d) && $$.isChrome()) {                                                          // 3430
                    yPos += 3;                                                                                         // 3431
                }                                                                                                      // 3432
            } else {                                                                                                   // 3433
                yPos += $$.isBarType(d) ? -3 : -6;                                                                     // 3434
            }                                                                                                          // 3435
        }                                                                                                              // 3436
        // show labels regardless of the domain if value is null                                                       // 3437
        if (d.value === null && !$$.config.axis_rotated) {                                                             // 3438
            if (yPos < box.height) {                                                                                   // 3439
                yPos = box.height;                                                                                     // 3440
            } else if (yPos > this.height) {                                                                           // 3441
                yPos = this.height - 4;                                                                                // 3442
            }                                                                                                          // 3443
        }                                                                                                              // 3444
        return yPos;                                                                                                   // 3445
    };                                                                                                                 // 3446
                                                                                                                       // 3447
    c3_chart_internal_fn.setTargetType = function (targetIds, type) {                                                  // 3448
        var $$ = this, config = $$.config;                                                                             // 3449
        $$.mapToTargetIds(targetIds).forEach(function (id) {                                                           // 3450
            $$.withoutFadeIn[id] = (type === config.data_types[id]);                                                   // 3451
            config.data_types[id] = type;                                                                              // 3452
        });                                                                                                            // 3453
        if (!targetIds) {                                                                                              // 3454
            config.data_type = type;                                                                                   // 3455
        }                                                                                                              // 3456
    };                                                                                                                 // 3457
    c3_chart_internal_fn.hasType = function (type, targets) {                                                          // 3458
        var $$ = this, types = $$.config.data_types, has = false;                                                      // 3459
        targets = targets || $$.data.targets;                                                                          // 3460
        if (targets && targets.length) {                                                                               // 3461
            targets.forEach(function (target) {                                                                        // 3462
                var t = types[target.id];                                                                              // 3463
                if ((t && t.indexOf(type) >= 0) || (!t && type === 'line')) {                                          // 3464
                    has = true;                                                                                        // 3465
                }                                                                                                      // 3466
            });                                                                                                        // 3467
        } else if (Object.keys(types).length) {                                                                        // 3468
            Object.keys(types).forEach(function (id) {                                                                 // 3469
                if (types[id] === type) { has = true; }                                                                // 3470
            });                                                                                                        // 3471
        } else {                                                                                                       // 3472
            has = $$.config.data_type === type;                                                                        // 3473
        }                                                                                                              // 3474
        return has;                                                                                                    // 3475
    };                                                                                                                 // 3476
    c3_chart_internal_fn.hasArcType = function (targets) {                                                             // 3477
        return this.hasType('pie', targets) || this.hasType('donut', targets) || this.hasType('gauge', targets);       // 3478
    };                                                                                                                 // 3479
    c3_chart_internal_fn.isLineType = function (d) {                                                                   // 3480
        var config = this.config, id = isString(d) ? d : d.id;                                                         // 3481
        return !config.data_types[id] || ['line', 'spline', 'area', 'area-spline', 'step', 'area-step'].indexOf(config.data_types[id]) >= 0;
    };                                                                                                                 // 3483
    c3_chart_internal_fn.isStepType = function (d) {                                                                   // 3484
        var id = isString(d) ? d : d.id;                                                                               // 3485
        return ['step', 'area-step'].indexOf(this.config.data_types[id]) >= 0;                                         // 3486
    };                                                                                                                 // 3487
    c3_chart_internal_fn.isSplineType = function (d) {                                                                 // 3488
        var id = isString(d) ? d : d.id;                                                                               // 3489
        return ['spline', 'area-spline'].indexOf(this.config.data_types[id]) >= 0;                                     // 3490
    };                                                                                                                 // 3491
    c3_chart_internal_fn.isAreaType = function (d) {                                                                   // 3492
        var id = isString(d) ? d : d.id;                                                                               // 3493
        return ['area', 'area-spline', 'area-step'].indexOf(this.config.data_types[id]) >= 0;                          // 3494
    };                                                                                                                 // 3495
    c3_chart_internal_fn.isBarType = function (d) {                                                                    // 3496
        var id = isString(d) ? d : d.id;                                                                               // 3497
        return this.config.data_types[id] === 'bar';                                                                   // 3498
    };                                                                                                                 // 3499
    c3_chart_internal_fn.isScatterType = function (d) {                                                                // 3500
        var id = isString(d) ? d : d.id;                                                                               // 3501
        return this.config.data_types[id] === 'scatter';                                                               // 3502
    };                                                                                                                 // 3503
    c3_chart_internal_fn.isPieType = function (d) {                                                                    // 3504
        var id = isString(d) ? d : d.id;                                                                               // 3505
        return this.config.data_types[id] === 'pie';                                                                   // 3506
    };                                                                                                                 // 3507
    c3_chart_internal_fn.isGaugeType = function (d) {                                                                  // 3508
        var id = isString(d) ? d : d.id;                                                                               // 3509
        return this.config.data_types[id] === 'gauge';                                                                 // 3510
    };                                                                                                                 // 3511
    c3_chart_internal_fn.isDonutType = function (d) {                                                                  // 3512
        var id = isString(d) ? d : d.id;                                                                               // 3513
        return this.config.data_types[id] === 'donut';                                                                 // 3514
    };                                                                                                                 // 3515
    c3_chart_internal_fn.isArcType = function (d) {                                                                    // 3516
        return this.isPieType(d) || this.isDonutType(d) || this.isGaugeType(d);                                        // 3517
    };                                                                                                                 // 3518
    c3_chart_internal_fn.lineData = function (d) {                                                                     // 3519
        return this.isLineType(d) ? [d] : [];                                                                          // 3520
    };                                                                                                                 // 3521
    c3_chart_internal_fn.arcData = function (d) {                                                                      // 3522
        return this.isArcType(d.data) ? [d] : [];                                                                      // 3523
    };                                                                                                                 // 3524
    /* not used                                                                                                        // 3525
     function scatterData(d) {                                                                                         // 3526
     return isScatterType(d) ? d.values : [];                                                                          // 3527
     }                                                                                                                 // 3528
     */                                                                                                                // 3529
    c3_chart_internal_fn.barData = function (d) {                                                                      // 3530
        return this.isBarType(d) ? d.values : [];                                                                      // 3531
    };                                                                                                                 // 3532
    c3_chart_internal_fn.lineOrScatterData = function (d) {                                                            // 3533
        return this.isLineType(d) || this.isScatterType(d) ? d.values : [];                                            // 3534
    };                                                                                                                 // 3535
    c3_chart_internal_fn.barOrLineData = function (d) {                                                                // 3536
        return this.isBarType(d) || this.isLineType(d) ? d.values : [];                                                // 3537
    };                                                                                                                 // 3538
                                                                                                                       // 3539
    c3_chart_internal_fn.initGrid = function () {                                                                      // 3540
        var $$ = this, config = $$.config, d3 = $$.d3;                                                                 // 3541
        $$.grid = $$.main.append('g')                                                                                  // 3542
            .attr("clip-path", $$.clipPathForGrid)                                                                     // 3543
            .attr('class', CLASS.grid);                                                                                // 3544
        if (config.grid_x_show) {                                                                                      // 3545
            $$.grid.append("g").attr("class", CLASS.xgrids);                                                           // 3546
        }                                                                                                              // 3547
        if (config.grid_y_show) {                                                                                      // 3548
            $$.grid.append('g').attr('class', CLASS.ygrids);                                                           // 3549
        }                                                                                                              // 3550
        if (config.grid_focus_show) {                                                                                  // 3551
            $$.grid.append('g')                                                                                        // 3552
                .attr("class", CLASS.xgridFocus)                                                                       // 3553
                .append('line')                                                                                        // 3554
                .attr('class', CLASS.xgridFocus);                                                                      // 3555
        }                                                                                                              // 3556
        $$.xgrid = d3.selectAll([]);                                                                                   // 3557
        if (!config.grid_lines_front) { $$.initGridLines(); }                                                          // 3558
    };                                                                                                                 // 3559
    c3_chart_internal_fn.initGridLines = function () {                                                                 // 3560
        var $$ = this, d3 = $$.d3;                                                                                     // 3561
        $$.gridLines = $$.main.append('g')                                                                             // 3562
            .attr("clip-path", $$.clipPathForGrid)                                                                     // 3563
            .attr('class', CLASS.grid + ' ' + CLASS.gridLines);                                                        // 3564
        $$.gridLines.append('g').attr("class", CLASS.xgridLines);                                                      // 3565
        $$.gridLines.append('g').attr('class', CLASS.ygridLines);                                                      // 3566
        $$.xgridLines = d3.selectAll([]);                                                                              // 3567
    };                                                                                                                 // 3568
    c3_chart_internal_fn.updateXGrid = function (withoutUpdate) {                                                      // 3569
        var $$ = this, config = $$.config, d3 = $$.d3,                                                                 // 3570
            xgridData = $$.generateGridData(config.grid_x_type, $$.x),                                                 // 3571
            tickOffset = $$.isCategorized() ? $$.xAxis.tickOffset() : 0;                                               // 3572
                                                                                                                       // 3573
        $$.xgridAttr = config.axis_rotated ? {                                                                         // 3574
            'x1': 0,                                                                                                   // 3575
            'x2': $$.width,                                                                                            // 3576
            'y1': function (d) { return $$.x(d) - tickOffset; },                                                       // 3577
            'y2': function (d) { return $$.x(d) - tickOffset; }                                                        // 3578
        } : {                                                                                                          // 3579
            'x1': function (d) { return $$.x(d) + tickOffset; },                                                       // 3580
            'x2': function (d) { return $$.x(d) + tickOffset; },                                                       // 3581
            'y1': 0,                                                                                                   // 3582
            'y2': $$.height                                                                                            // 3583
        };                                                                                                             // 3584
                                                                                                                       // 3585
        $$.xgrid = $$.main.select('.' + CLASS.xgrids).selectAll('.' + CLASS.xgrid)                                     // 3586
            .data(xgridData);                                                                                          // 3587
        $$.xgrid.enter().append('line').attr("class", CLASS.xgrid);                                                    // 3588
        if (!withoutUpdate) {                                                                                          // 3589
            $$.xgrid.attr($$.xgridAttr)                                                                                // 3590
                .style("opacity", function () { return +d3.select(this).attr(config.axis_rotated ? 'y1' : 'x1') === (config.axis_rotated ? $$.height : 0) ? 0 : 1; });
        }                                                                                                              // 3592
        $$.xgrid.exit().remove();                                                                                      // 3593
    };                                                                                                                 // 3594
                                                                                                                       // 3595
    c3_chart_internal_fn.updateYGrid = function () {                                                                   // 3596
        var $$ = this, config = $$.config,                                                                             // 3597
            gridValues = $$.yAxis.tickValues() || $$.y.ticks(config.grid_y_ticks);                                     // 3598
        $$.ygrid = $$.main.select('.' + CLASS.ygrids).selectAll('.' + CLASS.ygrid)                                     // 3599
            .data(gridValues);                                                                                         // 3600
        $$.ygrid.enter().append('line')                                                                                // 3601
            .attr('class', CLASS.ygrid);                                                                               // 3602
        $$.ygrid.attr("x1", config.axis_rotated ? $$.y : 0)                                                            // 3603
            .attr("x2", config.axis_rotated ? $$.y : $$.width)                                                         // 3604
            .attr("y1", config.axis_rotated ? 0 : $$.y)                                                                // 3605
            .attr("y2", config.axis_rotated ? $$.height : $$.y);                                                       // 3606
        $$.ygrid.exit().remove();                                                                                      // 3607
        $$.smoothLines($$.ygrid, 'grid');                                                                              // 3608
    };                                                                                                                 // 3609
                                                                                                                       // 3610
    c3_chart_internal_fn.gridTextAnchor = function (d) {                                                               // 3611
        return d.position ? d.position : "end";                                                                        // 3612
    };                                                                                                                 // 3613
    c3_chart_internal_fn.gridTextDx = function (d) {                                                                   // 3614
        return d.position === 'start' ? 4 : d.position === 'middle' ? 0 : -4;                                          // 3615
    };                                                                                                                 // 3616
    c3_chart_internal_fn.xGridTextX = function (d) {                                                                   // 3617
        return d.position === 'start' ? -this.height : d.position === 'middle' ? -this.height / 2 : 0;                 // 3618
    };                                                                                                                 // 3619
    c3_chart_internal_fn.yGridTextX = function (d) {                                                                   // 3620
        return d.position === 'start' ? 0 : d.position === 'middle' ? this.width / 2 : this.width;                     // 3621
    };                                                                                                                 // 3622
    c3_chart_internal_fn.updateGrid = function (duration) {                                                            // 3623
        var $$ = this, main = $$.main, config = $$.config,                                                             // 3624
            xgridLine, ygridLine, yv;                                                                                  // 3625
                                                                                                                       // 3626
        // hide if arc type                                                                                            // 3627
        $$.grid.style('visibility', $$.hasArcType() ? 'hidden' : 'visible');                                           // 3628
                                                                                                                       // 3629
        main.select('line.' + CLASS.xgridFocus).style("visibility", "hidden");                                         // 3630
        if (config.grid_x_show) {                                                                                      // 3631
            $$.updateXGrid();                                                                                          // 3632
        }                                                                                                              // 3633
        $$.xgridLines = main.select('.' + CLASS.xgridLines).selectAll('.' + CLASS.xgridLine)                           // 3634
            .data(config.grid_x_lines);                                                                                // 3635
        // enter                                                                                                       // 3636
        xgridLine = $$.xgridLines.enter().append('g')                                                                  // 3637
            .attr("class", function (d) { return CLASS.xgridLine + (d['class'] ? ' ' + d['class'] : ''); });           // 3638
        xgridLine.append('line')                                                                                       // 3639
            .style("opacity", 0);                                                                                      // 3640
        xgridLine.append('text')                                                                                       // 3641
            .attr("text-anchor", $$.gridTextAnchor)                                                                    // 3642
            .attr("transform", config.axis_rotated ? "" : "rotate(-90)")                                               // 3643
            .attr('dx', $$.gridTextDx)                                                                                 // 3644
            .attr('dy', -5)                                                                                            // 3645
            .style("opacity", 0);                                                                                      // 3646
        // udpate                                                                                                      // 3647
        // done in d3.transition() of the end of this function                                                         // 3648
        // exit                                                                                                        // 3649
        $$.xgridLines.exit().transition().duration(duration)                                                           // 3650
            .style("opacity", 0)                                                                                       // 3651
            .remove();                                                                                                 // 3652
                                                                                                                       // 3653
        // Y-Grid                                                                                                      // 3654
        if (config.grid_y_show) {                                                                                      // 3655
            $$.updateYGrid();                                                                                          // 3656
        }                                                                                                              // 3657
        $$.ygridLines = main.select('.' + CLASS.ygridLines).selectAll('.' + CLASS.ygridLine)                           // 3658
            .data(config.grid_y_lines);                                                                                // 3659
        // enter                                                                                                       // 3660
        ygridLine = $$.ygridLines.enter().append('g')                                                                  // 3661
            .attr("class", function (d) { return CLASS.ygridLine + (d['class'] ? ' ' + d['class'] : ''); });           // 3662
        ygridLine.append('line')                                                                                       // 3663
            .style("opacity", 0);                                                                                      // 3664
        ygridLine.append('text')                                                                                       // 3665
            .attr("text-anchor", $$.gridTextAnchor)                                                                    // 3666
            .attr("transform", config.axis_rotated ? "rotate(-90)" : "")                                               // 3667
            .attr('dx', $$.gridTextDx)                                                                                 // 3668
            .attr('dy', -5)                                                                                            // 3669
            .style("opacity", 0);                                                                                      // 3670
        // update                                                                                                      // 3671
        yv = $$.yv.bind($$);                                                                                           // 3672
        $$.ygridLines.select('line')                                                                                   // 3673
          .transition().duration(duration)                                                                             // 3674
            .attr("x1", config.axis_rotated ? yv : 0)                                                                  // 3675
            .attr("x2", config.axis_rotated ? yv : $$.width)                                                           // 3676
            .attr("y1", config.axis_rotated ? 0 : yv)                                                                  // 3677
            .attr("y2", config.axis_rotated ? $$.height : yv)                                                          // 3678
            .style("opacity", 1);                                                                                      // 3679
        $$.ygridLines.select('text')                                                                                   // 3680
          .transition().duration(duration)                                                                             // 3681
            .attr("x", config.axis_rotated ? $$.xGridTextX.bind($$) : $$.yGridTextX.bind($$))                          // 3682
            .attr("y", yv)                                                                                             // 3683
            .text(function (d) { return d.text; })                                                                     // 3684
            .style("opacity", 1);                                                                                      // 3685
        // exit                                                                                                        // 3686
        $$.ygridLines.exit().transition().duration(duration)                                                           // 3687
            .style("opacity", 0)                                                                                       // 3688
            .remove();                                                                                                 // 3689
    };                                                                                                                 // 3690
    c3_chart_internal_fn.redrawGrid = function (withTransition) {                                                      // 3691
        var $$ = this, config = $$.config, xv = $$.xv.bind($$),                                                        // 3692
            lines = $$.xgridLines.select('line'),                                                                      // 3693
            texts = $$.xgridLines.select('text');                                                                      // 3694
        return [                                                                                                       // 3695
            (withTransition ? lines.transition() : lines)                                                              // 3696
                .attr("x1", config.axis_rotated ? 0 : xv)                                                              // 3697
                .attr("x2", config.axis_rotated ? $$.width : xv)                                                       // 3698
                .attr("y1", config.axis_rotated ? xv : 0)                                                              // 3699
                .attr("y2", config.axis_rotated ? xv : $$.height)                                                      // 3700
                .style("opacity", 1),                                                                                  // 3701
            (withTransition ? texts.transition() : texts)                                                              // 3702
                .attr("x", config.axis_rotated ? $$.yGridTextX.bind($$) : $$.xGridTextX.bind($$))                      // 3703
                .attr("y", xv)                                                                                         // 3704
                .text(function (d) { return d.text; })                                                                 // 3705
                .style("opacity", 1)                                                                                   // 3706
        ];                                                                                                             // 3707
    };                                                                                                                 // 3708
    c3_chart_internal_fn.showXGridFocus = function (selectedData) {                                                    // 3709
        var $$ = this, config = $$.config,                                                                             // 3710
            dataToShow = selectedData.filter(function (d) { return d && isValue(d.value); }),                          // 3711
            focusEl = $$.main.selectAll('line.' + CLASS.xgridFocus),                                                   // 3712
            xx = $$.xx.bind($$);                                                                                       // 3713
        if (! config.tooltip_show) { return; }                                                                         // 3714
        // Hide when scatter plot exists                                                                               // 3715
        if ($$.hasType('scatter') || $$.hasArcType()) { return; }                                                      // 3716
        focusEl                                                                                                        // 3717
            .style("visibility", "visible")                                                                            // 3718
            .data([dataToShow[0]])                                                                                     // 3719
            .attr(config.axis_rotated ? 'y1' : 'x1', xx)                                                               // 3720
            .attr(config.axis_rotated ? 'y2' : 'x2', xx);                                                              // 3721
        $$.smoothLines(focusEl, 'grid');                                                                               // 3722
    };                                                                                                                 // 3723
    c3_chart_internal_fn.hideXGridFocus = function () {                                                                // 3724
        this.main.select('line.' + CLASS.xgridFocus).style("visibility", "hidden");                                    // 3725
    };                                                                                                                 // 3726
    c3_chart_internal_fn.updateXgridFocus = function () {                                                              // 3727
        var $$ = this, config = $$.config;                                                                             // 3728
        $$.main.select('line.' + CLASS.xgridFocus)                                                                     // 3729
            .attr("x1", config.axis_rotated ? 0 : -10)                                                                 // 3730
            .attr("x2", config.axis_rotated ? $$.width : -10)                                                          // 3731
            .attr("y1", config.axis_rotated ? -10 : 0)                                                                 // 3732
            .attr("y2", config.axis_rotated ? -10 : $$.height);                                                        // 3733
    };                                                                                                                 // 3734
    c3_chart_internal_fn.generateGridData = function (type, scale) {                                                   // 3735
        var $$ = this,                                                                                                 // 3736
            gridData = [], xDomain, firstYear, lastYear, i,                                                            // 3737
            tickNum = $$.main.select("." + CLASS.axisX).selectAll('.tick').size();                                     // 3738
        if (type === 'year') {                                                                                         // 3739
            xDomain = $$.getXDomain();                                                                                 // 3740
            firstYear = xDomain[0].getFullYear();                                                                      // 3741
            lastYear = xDomain[1].getFullYear();                                                                       // 3742
            for (i = firstYear; i <= lastYear; i++) {                                                                  // 3743
                gridData.push(new Date(i + '-01-01 00:00:00'));                                                        // 3744
            }                                                                                                          // 3745
        } else {                                                                                                       // 3746
            gridData = scale.ticks(10);                                                                                // 3747
            if (gridData.length > tickNum) { // use only int                                                           // 3748
                gridData = gridData.filter(function (d) { return ("" + d).indexOf('.') < 0; });                        // 3749
            }                                                                                                          // 3750
        }                                                                                                              // 3751
        return gridData;                                                                                               // 3752
    };                                                                                                                 // 3753
    c3_chart_internal_fn.getGridFilterToRemove = function (params) {                                                   // 3754
        return params ? function (line) {                                                                              // 3755
            var found = false;                                                                                         // 3756
            [].concat(params).forEach(function (param) {                                                               // 3757
                if ((('value' in param && line.value === param.value) || ('class' in param && line['class'] === param['class']))) {
                    found = true;                                                                                      // 3759
                }                                                                                                      // 3760
            });                                                                                                        // 3761
            return found;                                                                                              // 3762
        } : function () { return true; };                                                                              // 3763
    };                                                                                                                 // 3764
    c3_chart_internal_fn.removeGridLines = function (params, forX) {                                                   // 3765
        var $$ = this, config = $$.config,                                                                             // 3766
            toRemove = $$.getGridFilterToRemove(params),                                                               // 3767
            toShow = function (line) { return !toRemove(line); },                                                      // 3768
            classLines = forX ? CLASS.xgridLines : CLASS.ygridLines,                                                   // 3769
            classLine = forX ? CLASS.xgridLine : CLASS.ygridLine;                                                      // 3770
        $$.main.select('.' + classLines).selectAll('.' + classLine).filter(toRemove)                                   // 3771
            .transition().duration(config.transition_duration)                                                         // 3772
            .style('opacity', 0).remove();                                                                             // 3773
        if (forX) {                                                                                                    // 3774
            config.grid_x_lines = config.grid_x_lines.filter(toShow);                                                  // 3775
        } else {                                                                                                       // 3776
            config.grid_y_lines = config.grid_y_lines.filter(toShow);                                                  // 3777
        }                                                                                                              // 3778
    };                                                                                                                 // 3779
                                                                                                                       // 3780
    c3_chart_internal_fn.initTooltip = function () {                                                                   // 3781
        var $$ = this, config = $$.config, i;                                                                          // 3782
        $$.tooltip = $$.selectChart                                                                                    // 3783
            .style("position", "relative")                                                                             // 3784
          .append("div")                                                                                               // 3785
            .attr('class', CLASS.tooltipContainer)                                                                     // 3786
            .style("position", "absolute")                                                                             // 3787
            .style("pointer-events", "none")                                                                           // 3788
            .style("display", "none");                                                                                 // 3789
        // Show tooltip if needed                                                                                      // 3790
        if (config.tooltip_init_show) {                                                                                // 3791
            if ($$.isTimeSeries() && isString(config.tooltip_init_x)) {                                                // 3792
                config.tooltip_init_x = $$.parseDate(config.tooltip_init_x);                                           // 3793
                for (i = 0; i < $$.data.targets[0].values.length; i++) {                                               // 3794
                    if (($$.data.targets[0].values[i].x - config.tooltip_init_x) === 0) { break; }                     // 3795
                }                                                                                                      // 3796
                config.tooltip_init_x = i;                                                                             // 3797
            }                                                                                                          // 3798
            $$.tooltip.html(config.tooltip_contents.call($$, $$.data.targets.map(function (d) {                        // 3799
                return $$.addName(d.values[config.tooltip_init_x]);                                                    // 3800
            }), $$.axis.getXAxisTickFormat(), $$.getYFormat($$.hasArcType()), $$.color));                              // 3801
            $$.tooltip.style("top", config.tooltip_init_position.top)                                                  // 3802
                .style("left", config.tooltip_init_position.left)                                                      // 3803
                .style("display", "block");                                                                            // 3804
        }                                                                                                              // 3805
    };                                                                                                                 // 3806
    c3_chart_internal_fn.getTooltipContent = function (d, defaultTitleFormat, defaultValueFormat, color) {             // 3807
        var $$ = this, config = $$.config,                                                                             // 3808
            titleFormat = config.tooltip_format_title || defaultTitleFormat,                                           // 3809
            nameFormat = config.tooltip_format_name || function (name) { return name; },                               // 3810
            valueFormat = config.tooltip_format_value || defaultValueFormat,                                           // 3811
            text, i, title, value, name, bgcolor;                                                                      // 3812
        for (i = 0; i < d.length; i++) {                                                                               // 3813
            if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }                                            // 3814
                                                                                                                       // 3815
            if (! text) {                                                                                              // 3816
                title = titleFormat ? titleFormat(d[i].x) : d[i].x;                                                    // 3817
                text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
            }                                                                                                          // 3819
                                                                                                                       // 3820
            value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);                                          // 3821
            if (value !== undefined) {                                                                                 // 3822
                // Skip elements when their name is set to null                                                        // 3823
                if (d[i].name === null) { continue; }                                                                  // 3824
                name = nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index);                                         // 3825
                bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);                                  // 3826
                                                                                                                       // 3827
                text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";                                      // 3828
                text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";    // 3829
                text += "<td class='value'>" + value + "</td>";                                                        // 3830
                text += "</tr>";                                                                                       // 3831
            }                                                                                                          // 3832
        }                                                                                                              // 3833
        return text + "</table>";                                                                                      // 3834
    };                                                                                                                 // 3835
    c3_chart_internal_fn.tooltipPosition = function (dataToShow, tWidth, tHeight, element) {                           // 3836
        var $$ = this, config = $$.config, d3 = $$.d3;                                                                 // 3837
        var svgLeft, tooltipLeft, tooltipRight, tooltipTop, chartRight;                                                // 3838
        var forArc = $$.hasArcType(),                                                                                  // 3839
            mouse = d3.mouse(element);                                                                                 // 3840
      // Determin tooltip position                                                                                     // 3841
        if (forArc) {                                                                                                  // 3842
            tooltipLeft = (($$.width - ($$.isLegendRight ? $$.getLegendWidth() : 0)) / 2) + mouse[0];                  // 3843
            tooltipTop = ($$.height / 2) + mouse[1] + 20;                                                              // 3844
        } else {                                                                                                       // 3845
            svgLeft = $$.getSvgLeft(true);                                                                             // 3846
            if (config.axis_rotated) {                                                                                 // 3847
                tooltipLeft = svgLeft + mouse[0] + 100;                                                                // 3848
                tooltipRight = tooltipLeft + tWidth;                                                                   // 3849
                chartRight = $$.currentWidth - $$.getCurrentPaddingRight();                                            // 3850
                tooltipTop = $$.x(dataToShow[0].x) + 20;                                                               // 3851
            } else {                                                                                                   // 3852
                tooltipLeft = svgLeft + $$.getCurrentPaddingLeft(true) + $$.x(dataToShow[0].x) + 20;                   // 3853
                tooltipRight = tooltipLeft + tWidth;                                                                   // 3854
                chartRight = svgLeft + $$.currentWidth - $$.getCurrentPaddingRight();                                  // 3855
                tooltipTop = mouse[1] + 15;                                                                            // 3856
            }                                                                                                          // 3857
                                                                                                                       // 3858
            if (tooltipRight > chartRight) {                                                                           // 3859
                // 20 is needed for Firefox to keep tooltip width                                                      // 3860
                tooltipLeft -= tooltipRight - chartRight + 20;                                                         // 3861
            }                                                                                                          // 3862
            if (tooltipTop + tHeight > $$.currentHeight) {                                                             // 3863
                tooltipTop -= tHeight + 30;                                                                            // 3864
            }                                                                                                          // 3865
        }                                                                                                              // 3866
        if (tooltipTop < 0) {                                                                                          // 3867
            tooltipTop = 0;                                                                                            // 3868
        }                                                                                                              // 3869
        return {top: tooltipTop, left: tooltipLeft};                                                                   // 3870
    };                                                                                                                 // 3871
    c3_chart_internal_fn.showTooltip = function (selectedData, element) {                                              // 3872
        var $$ = this, config = $$.config;                                                                             // 3873
        var tWidth, tHeight, position;                                                                                 // 3874
        var forArc = $$.hasArcType(),                                                                                  // 3875
            dataToShow = selectedData.filter(function (d) { return d && isValue(d.value); }),                          // 3876
            positionFunction = config.tooltip_position || c3_chart_internal_fn.tooltipPosition;                        // 3877
        if (dataToShow.length === 0 || !config.tooltip_show) {                                                         // 3878
            return;                                                                                                    // 3879
        }                                                                                                              // 3880
        $$.tooltip.html(config.tooltip_contents.call($$, selectedData, $$.axis.getXAxisTickFormat(), $$.getYFormat(forArc), $$.color)).style("display", "block");
                                                                                                                       // 3882
        // Get tooltip dimensions                                                                                      // 3883
        tWidth = $$.tooltip.property('offsetWidth');                                                                   // 3884
        tHeight = $$.tooltip.property('offsetHeight');                                                                 // 3885
                                                                                                                       // 3886
        position = positionFunction.call(this, dataToShow, tWidth, tHeight, element);                                  // 3887
        // Set tooltip                                                                                                 // 3888
        $$.tooltip                                                                                                     // 3889
            .style("top", position.top + "px")                                                                         // 3890
            .style("left", position.left + 'px');                                                                      // 3891
    };                                                                                                                 // 3892
    c3_chart_internal_fn.hideTooltip = function () {                                                                   // 3893
        this.tooltip.style("display", "none");                                                                         // 3894
    };                                                                                                                 // 3895
                                                                                                                       // 3896
    c3_chart_internal_fn.initLegend = function () {                                                                    // 3897
        var $$ = this;                                                                                                 // 3898
        $$.legendItemTextBox = {};                                                                                     // 3899
        $$.legendHasRendered = false;                                                                                  // 3900
        $$.legend = $$.svg.append("g").attr("transform", $$.getTranslate('legend'));                                   // 3901
        if (!$$.config.legend_show) {                                                                                  // 3902
            $$.legend.style('visibility', 'hidden');                                                                   // 3903
            $$.hiddenLegendIds = $$.mapToIds($$.data.targets);                                                         // 3904
            return;                                                                                                    // 3905
        }                                                                                                              // 3906
        // MEMO: call here to update legend box and tranlate for all                                                   // 3907
        // MEMO: translate will be upated by this, so transform not needed in updateLegend()                           // 3908
        $$.updateLegendWithDefaults();                                                                                 // 3909
    };                                                                                                                 // 3910
    c3_chart_internal_fn.updateLegendWithDefaults = function () {                                                      // 3911
        var $$ = this;                                                                                                 // 3912
        $$.updateLegend($$.mapToIds($$.data.targets), {withTransform: false, withTransitionForTransform: false, withTransition: false});
    };                                                                                                                 // 3914
    c3_chart_internal_fn.updateSizeForLegend = function (legendHeight, legendWidth) {                                  // 3915
        var $$ = this, config = $$.config, insetLegendPosition = {                                                     // 3916
            top: $$.isLegendTop ? $$.getCurrentPaddingTop() + config.legend_inset_y + 5.5 : $$.currentHeight - legendHeight - $$.getCurrentPaddingBottom() - config.legend_inset_y,
            left: $$.isLegendLeft ? $$.getCurrentPaddingLeft() + config.legend_inset_x + 0.5 : $$.currentWidth - legendWidth - $$.getCurrentPaddingRight() - config.legend_inset_x + 0.5
        };                                                                                                             // 3919
                                                                                                                       // 3920
        $$.margin3 = {                                                                                                 // 3921
            top: $$.isLegendRight ? 0 : $$.isLegendInset ? insetLegendPosition.top : $$.currentHeight - legendHeight,  // 3922
            right: NaN,                                                                                                // 3923
            bottom: 0,                                                                                                 // 3924
            left: $$.isLegendRight ? $$.currentWidth - legendWidth : $$.isLegendInset ? insetLegendPosition.left : 0   // 3925
        };                                                                                                             // 3926
    };                                                                                                                 // 3927
    c3_chart_internal_fn.transformLegend = function (withTransition) {                                                 // 3928
        var $$ = this;                                                                                                 // 3929
        (withTransition ? $$.legend.transition() : $$.legend).attr("transform", $$.getTranslate('legend'));            // 3930
    };                                                                                                                 // 3931
    c3_chart_internal_fn.updateLegendStep = function (step) {                                                          // 3932
        this.legendStep = step;                                                                                        // 3933
    };                                                                                                                 // 3934
    c3_chart_internal_fn.updateLegendItemWidth = function (w) {                                                        // 3935
        this.legendItemWidth = w;                                                                                      // 3936
    };                                                                                                                 // 3937
    c3_chart_internal_fn.updateLegendItemHeight = function (h) {                                                       // 3938
        this.legendItemHeight = h;                                                                                     // 3939
    };                                                                                                                 // 3940
    c3_chart_internal_fn.getLegendWidth = function () {                                                                // 3941
        var $$ = this;                                                                                                 // 3942
        return $$.config.legend_show ? $$.isLegendRight || $$.isLegendInset ? $$.legendItemWidth * ($$.legendStep + 1) : $$.currentWidth : 0;
    };                                                                                                                 // 3944
    c3_chart_internal_fn.getLegendHeight = function () {                                                               // 3945
        var $$ = this, h = 0;                                                                                          // 3946
        if ($$.config.legend_show) {                                                                                   // 3947
            if ($$.isLegendRight) {                                                                                    // 3948
                h = $$.currentHeight;                                                                                  // 3949
            } else {                                                                                                   // 3950
                h = Math.max(20, $$.legendItemHeight) * ($$.legendStep + 1);                                           // 3951
            }                                                                                                          // 3952
        }                                                                                                              // 3953
        return h;                                                                                                      // 3954
    };                                                                                                                 // 3955
    c3_chart_internal_fn.opacityForLegend = function (legendItem) {                                                    // 3956
        return legendItem.classed(CLASS.legendItemHidden) ? null : 1;                                                  // 3957
    };                                                                                                                 // 3958
    c3_chart_internal_fn.opacityForUnfocusedLegend = function (legendItem) {                                           // 3959
        return legendItem.classed(CLASS.legendItemHidden) ? null : 0.3;                                                // 3960
    };                                                                                                                 // 3961
    c3_chart_internal_fn.toggleFocusLegend = function (targetIds, focus) {                                             // 3962
        var $$ = this;                                                                                                 // 3963
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 3964
        $$.legend.selectAll('.' + CLASS.legendItem)                                                                    // 3965
            .filter(function (id) { return targetIds.indexOf(id) >= 0; })                                              // 3966
            .classed(CLASS.legendItemFocused, focus)                                                                   // 3967
          .transition().duration(100)                                                                                  // 3968
            .style('opacity', function () {                                                                            // 3969
                var opacity = focus ? $$.opacityForLegend : $$.opacityForUnfocusedLegend;                              // 3970
                return opacity.call($$, $$.d3.select(this));                                                           // 3971
            });                                                                                                        // 3972
    };                                                                                                                 // 3973
    c3_chart_internal_fn.revertLegend = function () {                                                                  // 3974
        var $$ = this, d3 = $$.d3;                                                                                     // 3975
        $$.legend.selectAll('.' + CLASS.legendItem)                                                                    // 3976
            .classed(CLASS.legendItemFocused, false)                                                                   // 3977
            .transition().duration(100)                                                                                // 3978
            .style('opacity', function () { return $$.opacityForLegend(d3.select(this)); });                           // 3979
    };                                                                                                                 // 3980
    c3_chart_internal_fn.showLegend = function (targetIds) {                                                           // 3981
        var $$ = this, config = $$.config;                                                                             // 3982
        if (!config.legend_show) {                                                                                     // 3983
            config.legend_show = true;                                                                                 // 3984
            $$.legend.style('visibility', 'visible');                                                                  // 3985
            if (!$$.legendHasRendered) {                                                                               // 3986
                $$.updateLegendWithDefaults();                                                                         // 3987
            }                                                                                                          // 3988
        }                                                                                                              // 3989
        $$.removeHiddenLegendIds(targetIds);                                                                           // 3990
        $$.legend.selectAll($$.selectorLegends(targetIds))                                                             // 3991
            .style('visibility', 'visible')                                                                            // 3992
            .transition()                                                                                              // 3993
            .style('opacity', function () { return $$.opacityForLegend($$.d3.select(this)); });                        // 3994
    };                                                                                                                 // 3995
    c3_chart_internal_fn.hideLegend = function (targetIds) {                                                           // 3996
        var $$ = this, config = $$.config;                                                                             // 3997
        if (config.legend_show && isEmpty(targetIds)) {                                                                // 3998
            config.legend_show = false;                                                                                // 3999
            $$.legend.style('visibility', 'hidden');                                                                   // 4000
        }                                                                                                              // 4001
        $$.addHiddenLegendIds(targetIds);                                                                              // 4002
        $$.legend.selectAll($$.selectorLegends(targetIds))                                                             // 4003
            .style('opacity', 0)                                                                                       // 4004
            .style('visibility', 'hidden');                                                                            // 4005
    };                                                                                                                 // 4006
    c3_chart_internal_fn.clearLegendItemTextBoxCache = function () {                                                   // 4007
        this.legendItemTextBox = {};                                                                                   // 4008
    };                                                                                                                 // 4009
    c3_chart_internal_fn.updateLegend = function (targetIds, options, transitions) {                                   // 4010
        var $$ = this, config = $$.config;                                                                             // 4011
        var xForLegend, xForLegendText, xForLegendRect, yForLegend, yForLegendText, yForLegendRect, x1ForLegendTile, x2ForLegendTile, yForLegendTile;
        var paddingTop = 4, paddingRight = 10, maxWidth = 0, maxHeight = 0, posMin = 10, tileWidth = config.legend_item_tile_width + 5;
        var l, totalLength = 0, offsets = {}, widths = {}, heights = {}, margins = [0], steps = {}, step = 0;          // 4014
        var withTransition, withTransitionForTransform;                                                                // 4015
        var texts, rects, tiles, background;                                                                           // 4016
                                                                                                                       // 4017
        // Skip elements when their name is set to null                                                                // 4018
        targetIds = targetIds.filter(function(id) {                                                                    // 4019
            return !isDefined(config.data_names[id]) || config.data_names[id] !== null;                                // 4020
        });                                                                                                            // 4021
                                                                                                                       // 4022
        options = options || {};                                                                                       // 4023
        withTransition = getOption(options, "withTransition", true);                                                   // 4024
        withTransitionForTransform = getOption(options, "withTransitionForTransform", true);                           // 4025
                                                                                                                       // 4026
        function getTextBox(textElement, id) {                                                                         // 4027
            if (!$$.legendItemTextBox[id]) {                                                                           // 4028
                $$.legendItemTextBox[id] = $$.getTextRect(textElement.textContent, CLASS.legendItem);                  // 4029
            }                                                                                                          // 4030
            return $$.legendItemTextBox[id];                                                                           // 4031
        }                                                                                                              // 4032
                                                                                                                       // 4033
        function updatePositions(textElement, id, index) {                                                             // 4034
            var reset = index === 0, isLast = index === targetIds.length - 1,                                          // 4035
                box = getTextBox(textElement, id),                                                                     // 4036
                itemWidth = box.width + tileWidth + (isLast && !($$.isLegendRight || $$.isLegendInset) ? 0 : paddingRight) + config.legend_padding,
                itemHeight = box.height + paddingTop,                                                                  // 4038
                itemLength = $$.isLegendRight || $$.isLegendInset ? itemHeight : itemWidth,                            // 4039
                areaLength = $$.isLegendRight || $$.isLegendInset ? $$.getLegendHeight() : $$.getLegendWidth(),        // 4040
                margin, maxLength;                                                                                     // 4041
                                                                                                                       // 4042
            // MEMO: care about condifion of step, totalLength                                                         // 4043
            function updateValues(id, withoutStep) {                                                                   // 4044
                if (!withoutStep) {                                                                                    // 4045
                    margin = (areaLength - totalLength - itemLength) / 2;                                              // 4046
                    if (margin < posMin) {                                                                             // 4047
                        margin = (areaLength - itemLength) / 2;                                                        // 4048
                        totalLength = 0;                                                                               // 4049
                        step++;                                                                                        // 4050
                    }                                                                                                  // 4051
                }                                                                                                      // 4052
                steps[id] = step;                                                                                      // 4053
                margins[step] = $$.isLegendInset ? 10 : margin;                                                        // 4054
                offsets[id] = totalLength;                                                                             // 4055
                totalLength += itemLength;                                                                             // 4056
            }                                                                                                          // 4057
                                                                                                                       // 4058
            if (reset) {                                                                                               // 4059
                totalLength = 0;                                                                                       // 4060
                step = 0;                                                                                              // 4061
                maxWidth = 0;                                                                                          // 4062
                maxHeight = 0;                                                                                         // 4063
            }                                                                                                          // 4064
                                                                                                                       // 4065
            if (config.legend_show && !$$.isLegendToShow(id)) {                                                        // 4066
                widths[id] = heights[id] = steps[id] = offsets[id] = 0;                                                // 4067
                return;                                                                                                // 4068
            }                                                                                                          // 4069
                                                                                                                       // 4070
            widths[id] = itemWidth;                                                                                    // 4071
            heights[id] = itemHeight;                                                                                  // 4072
                                                                                                                       // 4073
            if (!maxWidth || itemWidth >= maxWidth) { maxWidth = itemWidth; }                                          // 4074
            if (!maxHeight || itemHeight >= maxHeight) { maxHeight = itemHeight; }                                     // 4075
            maxLength = $$.isLegendRight || $$.isLegendInset ? maxHeight : maxWidth;                                   // 4076
                                                                                                                       // 4077
            if (config.legend_equally) {                                                                               // 4078
                Object.keys(widths).forEach(function (id) { widths[id] = maxWidth; });                                 // 4079
                Object.keys(heights).forEach(function (id) { heights[id] = maxHeight; });                              // 4080
                margin = (areaLength - maxLength * targetIds.length) / 2;                                              // 4081
                if (margin < posMin) {                                                                                 // 4082
                    totalLength = 0;                                                                                   // 4083
                    step = 0;                                                                                          // 4084
                    targetIds.forEach(function (id) { updateValues(id); });                                            // 4085
                }                                                                                                      // 4086
                else {                                                                                                 // 4087
                    updateValues(id, true);                                                                            // 4088
                }                                                                                                      // 4089
            } else {                                                                                                   // 4090
                updateValues(id);                                                                                      // 4091
            }                                                                                                          // 4092
        }                                                                                                              // 4093
                                                                                                                       // 4094
        if ($$.isLegendInset) {                                                                                        // 4095
            step = config.legend_inset_step ? config.legend_inset_step : targetIds.length;                             // 4096
            $$.updateLegendStep(step);                                                                                 // 4097
        }                                                                                                              // 4098
                                                                                                                       // 4099
        if ($$.isLegendRight) {                                                                                        // 4100
            xForLegend = function (id) { return maxWidth * steps[id]; };                                               // 4101
            yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };                                   // 4102
        } else if ($$.isLegendInset) {                                                                                 // 4103
            xForLegend = function (id) { return maxWidth * steps[id] + 10; };                                          // 4104
            yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };                                   // 4105
        } else {                                                                                                       // 4106
            xForLegend = function (id) { return margins[steps[id]] + offsets[id]; };                                   // 4107
            yForLegend = function (id) { return maxHeight * steps[id]; };                                              // 4108
        }                                                                                                              // 4109
        xForLegendText = function (id, i) { return xForLegend(id, i) + 4 + config.legend_item_tile_width; };           // 4110
        yForLegendText = function (id, i) { return yForLegend(id, i) + 9; };                                           // 4111
        xForLegendRect = function (id, i) { return xForLegend(id, i); };                                               // 4112
        yForLegendRect = function (id, i) { return yForLegend(id, i) - 5; };                                           // 4113
        x1ForLegendTile = function (id, i) { return xForLegend(id, i) - 2; };                                          // 4114
        x2ForLegendTile = function (id, i) { return xForLegend(id, i) - 2 + config.legend_item_tile_width; };          // 4115
        yForLegendTile = function (id, i) { return yForLegend(id, i) + 4; };                                           // 4116
                                                                                                                       // 4117
        // Define g for legend area                                                                                    // 4118
        l = $$.legend.selectAll('.' + CLASS.legendItem)                                                                // 4119
            .data(targetIds)                                                                                           // 4120
            .enter().append('g')                                                                                       // 4121
            .attr('class', function (id) { return $$.generateClass(CLASS.legendItem, id); })                           // 4122
            .style('visibility', function (id) { return $$.isLegendToShow(id) ? 'visible' : 'hidden'; })               // 4123
            .style('cursor', 'pointer')                                                                                // 4124
            .on('click', function (id) {                                                                               // 4125
                if (config.legend_item_onclick) {                                                                      // 4126
                    config.legend_item_onclick.call($$, id);                                                           // 4127
                } else {                                                                                               // 4128
                    if ($$.d3.event.altKey) {                                                                          // 4129
                        $$.api.hide();                                                                                 // 4130
                        $$.api.show(id);                                                                               // 4131
                    } else {                                                                                           // 4132
                        $$.api.toggle(id);                                                                             // 4133
                        $$.isTargetToShow(id) ? $$.api.focus(id) : $$.api.revert();                                    // 4134
                    }                                                                                                  // 4135
                }                                                                                                      // 4136
            })                                                                                                         // 4137
            .on('mouseover', function (id) {                                                                           // 4138
                $$.d3.select(this).classed(CLASS.legendItemFocused, true);                                             // 4139
                if (!$$.transiting && $$.isTargetToShow(id)) {                                                         // 4140
                    $$.api.focus(id);                                                                                  // 4141
                }                                                                                                      // 4142
                if (config.legend_item_onmouseover) {                                                                  // 4143
                    config.legend_item_onmouseover.call($$, id);                                                       // 4144
                }                                                                                                      // 4145
            })                                                                                                         // 4146
            .on('mouseout', function (id) {                                                                            // 4147
                $$.d3.select(this).classed(CLASS.legendItemFocused, false);                                            // 4148
                $$.api.revert();                                                                                       // 4149
                if (config.legend_item_onmouseout) {                                                                   // 4150
                    config.legend_item_onmouseout.call($$, id);                                                        // 4151
                }                                                                                                      // 4152
            });                                                                                                        // 4153
        l.append('text')                                                                                               // 4154
            .text(function (id) { return isDefined(config.data_names[id]) ? config.data_names[id] : id; })             // 4155
            .each(function (id, i) { updatePositions(this, id, i); })                                                  // 4156
            .style("pointer-events", "none")                                                                           // 4157
            .attr('x', $$.isLegendRight || $$.isLegendInset ? xForLegendText : -200)                                   // 4158
            .attr('y', $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendText);                                  // 4159
        l.append('rect')                                                                                               // 4160
            .attr("class", CLASS.legendItemEvent)                                                                      // 4161
            .style('fill-opacity', 0)                                                                                  // 4162
            .attr('x', $$.isLegendRight || $$.isLegendInset ? xForLegendRect : -200)                                   // 4163
            .attr('y', $$.isLegendRight || $$.isLegendInset ? -200 : yForLegendRect);                                  // 4164
        l.append('line')                                                                                               // 4165
            .attr('class', CLASS.legendItemTile)                                                                       // 4166
            .style("pointer-events", "none")                                                                           // 4167
            .attr('stroke-width', config.legend_item_tile_height);                                                     // 4168
                                                                                                                       // 4169
        // Set background for inset legend                                                                             // 4170
        background = $$.legend.select('.' + CLASS.legendBackground + ' rect');                                         // 4171
        if ($$.isLegendInset && maxWidth > 0 && background.size() === 0) {                                             // 4172
            background = $$.legend.insert('g', '.' + CLASS.legendItem)                                                 // 4173
                .attr("class", CLASS.legendBackground)                                                                 // 4174
                .append('rect');                                                                                       // 4175
        }                                                                                                              // 4176
                                                                                                                       // 4177
        texts = $$.legend.selectAll('text')                                                                            // 4178
            .data(targetIds)                                                                                           // 4179
            .text(function (id) { return isDefined(config.data_names[id]) ? config.data_names[id] : id; }) // MEMO: needed for update
            .each(function (id, i) { updatePositions(this, id, i); });                                                 // 4181
        (withTransition ? texts.transition() : texts)                                                                  // 4182
            .attr('x', xForLegendText)                                                                                 // 4183
            .attr('y', yForLegendText);                                                                                // 4184
                                                                                                                       // 4185
        rects = $$.legend.selectAll('rect.' + CLASS.legendItemEvent)                                                   // 4186
            .data(targetIds);                                                                                          // 4187
        (withTransition ? rects.transition() : rects)                                                                  // 4188
            .attr('width', function (id) { return widths[id]; })                                                       // 4189
            .attr('height', function (id) { return heights[id]; })                                                     // 4190
            .attr('x', xForLegendRect)                                                                                 // 4191
            .attr('y', yForLegendRect);                                                                                // 4192
                                                                                                                       // 4193
        tiles = $$.legend.selectAll('line.' + CLASS.legendItemTile)                                                    // 4194
                .data(targetIds);                                                                                      // 4195
            (withTransition ? tiles.transition() : tiles)                                                              // 4196
                .style('stroke', $$.color)                                                                             // 4197
                .attr('x1', x1ForLegendTile)                                                                           // 4198
                .attr('y1', yForLegendTile)                                                                            // 4199
                .attr('x2', x2ForLegendTile)                                                                           // 4200
                .attr('y2', yForLegendTile);                                                                           // 4201
                                                                                                                       // 4202
        if (background) {                                                                                              // 4203
            (withTransition ? background.transition() : background)                                                    // 4204
                .attr('height', $$.getLegendHeight() - 12)                                                             // 4205
                .attr('width', maxWidth * (step + 1) + 10);                                                            // 4206
        }                                                                                                              // 4207
                                                                                                                       // 4208
        // toggle legend state                                                                                         // 4209
        $$.legend.selectAll('.' + CLASS.legendItem)                                                                    // 4210
            .classed(CLASS.legendItemHidden, function (id) { return !$$.isTargetToShow(id); });                        // 4211
                                                                                                                       // 4212
        // Update all to reflect change of legend                                                                      // 4213
        $$.updateLegendItemWidth(maxWidth);                                                                            // 4214
        $$.updateLegendItemHeight(maxHeight);                                                                          // 4215
        $$.updateLegendStep(step);                                                                                     // 4216
        // Update size and scale                                                                                       // 4217
        $$.updateSizes();                                                                                              // 4218
        $$.updateScales();                                                                                             // 4219
        $$.updateSvgSize();                                                                                            // 4220
        // Update g positions                                                                                          // 4221
        $$.transformAll(withTransitionForTransform, transitions);                                                      // 4222
        $$.legendHasRendered = true;                                                                                   // 4223
    };                                                                                                                 // 4224
                                                                                                                       // 4225
    c3_chart_internal_fn.initTitle = function () {                                                                     // 4226
        var $$ = this;                                                                                                 // 4227
        $$.title = $$.svg.append("text")                                                                               // 4228
              .text($$.config.title_text)                                                                              // 4229
              .attr("class", $$.CLASS.title);                                                                          // 4230
    };                                                                                                                 // 4231
    c3_chart_internal_fn.redrawTitle = function () {                                                                   // 4232
        var $$ = this;                                                                                                 // 4233
        $$.title                                                                                                       // 4234
              .attr("x", $$.xForTitle.bind($$))                                                                        // 4235
              .attr("y", $$.yForTitle.bind($$));                                                                       // 4236
    };                                                                                                                 // 4237
    c3_chart_internal_fn.xForTitle = function () {                                                                     // 4238
        var $$ = this, config = $$.config, position = config.title_position || 'left', x;                              // 4239
        if (position.indexOf('right') >= 0) {                                                                          // 4240
            x = $$.currentWidth - $$.title.node().getBBox().width - config.title_padding.right;                        // 4241
        } else if (position.indexOf('center') >= 0) {                                                                  // 4242
            x = ($$.currentWidth - $$.title.node().getBBox().width) / 2;                                               // 4243
        } else { // left                                                                                               // 4244
            x = config.title_padding.left;                                                                             // 4245
        }                                                                                                              // 4246
        return x;                                                                                                      // 4247
    };                                                                                                                 // 4248
    c3_chart_internal_fn.yForTitle = function () {                                                                     // 4249
        var $$ = this;                                                                                                 // 4250
        return $$.config.title_padding.top + $$.title.node().getBBox().height;                                         // 4251
    };                                                                                                                 // 4252
    c3_chart_internal_fn.getTitlePadding = function() {                                                                // 4253
        var $$ = this;                                                                                                 // 4254
        return $$.yForTitle() + $$.config.title_padding.bottom;                                                        // 4255
    };                                                                                                                 // 4256
                                                                                                                       // 4257
    function Axis(owner) {                                                                                             // 4258
        API.call(this, owner);                                                                                         // 4259
    }                                                                                                                  // 4260
                                                                                                                       // 4261
    inherit(API, Axis);                                                                                                // 4262
                                                                                                                       // 4263
    Axis.prototype.init = function init() {                                                                            // 4264
                                                                                                                       // 4265
        var $$ = this.owner, config = $$.config, main = $$.main;                                                       // 4266
        $$.axes.x = main.append("g")                                                                                   // 4267
            .attr("class", CLASS.axis + ' ' + CLASS.axisX)                                                             // 4268
            .attr("clip-path", $$.clipPathForXAxis)                                                                    // 4269
            .attr("transform", $$.getTranslate('x'))                                                                   // 4270
            .style("visibility", config.axis_x_show ? 'visible' : 'hidden');                                           // 4271
        $$.axes.x.append("text")                                                                                       // 4272
            .attr("class", CLASS.axisXLabel)                                                                           // 4273
            .attr("transform", config.axis_rotated ? "rotate(-90)" : "")                                               // 4274
            .style("text-anchor", this.textAnchorForXAxisLabel.bind(this));                                            // 4275
        $$.axes.y = main.append("g")                                                                                   // 4276
            .attr("class", CLASS.axis + ' ' + CLASS.axisY)                                                             // 4277
            .attr("clip-path", config.axis_y_inner ? "" : $$.clipPathForYAxis)                                         // 4278
            .attr("transform", $$.getTranslate('y'))                                                                   // 4279
            .style("visibility", config.axis_y_show ? 'visible' : 'hidden');                                           // 4280
        $$.axes.y.append("text")                                                                                       // 4281
            .attr("class", CLASS.axisYLabel)                                                                           // 4282
            .attr("transform", config.axis_rotated ? "" : "rotate(-90)")                                               // 4283
            .style("text-anchor", this.textAnchorForYAxisLabel.bind(this));                                            // 4284
                                                                                                                       // 4285
        $$.axes.y2 = main.append("g")                                                                                  // 4286
            .attr("class", CLASS.axis + ' ' + CLASS.axisY2)                                                            // 4287
            // clip-path?                                                                                              // 4288
            .attr("transform", $$.getTranslate('y2'))                                                                  // 4289
            .style("visibility", config.axis_y2_show ? 'visible' : 'hidden');                                          // 4290
        $$.axes.y2.append("text")                                                                                      // 4291
            .attr("class", CLASS.axisY2Label)                                                                          // 4292
            .attr("transform", config.axis_rotated ? "" : "rotate(-90)")                                               // 4293
            .style("text-anchor", this.textAnchorForY2AxisLabel.bind(this));                                           // 4294
    };                                                                                                                 // 4295
    Axis.prototype.getXAxis = function getXAxis(scale, orient, tickFormat, tickValues, withOuterTick, withoutTransition, withoutRotateTickText) {
        var $$ = this.owner, config = $$.config,                                                                       // 4297
            axisParams = {                                                                                             // 4298
                isCategory: $$.isCategorized(),                                                                        // 4299
                withOuterTick: withOuterTick,                                                                          // 4300
                tickMultiline: config.axis_x_tick_multiline,                                                           // 4301
                tickWidth: config.axis_x_tick_width,                                                                   // 4302
                tickTextRotate: withoutRotateTickText ? 0 : config.axis_x_tick_rotate,                                 // 4303
                withoutTransition: withoutTransition,                                                                  // 4304
            },                                                                                                         // 4305
            axis = c3_axis($$.d3, axisParams).scale(scale).orient(orient);                                             // 4306
                                                                                                                       // 4307
        if ($$.isTimeSeries() && tickValues && typeof tickValues !== "function") {                                     // 4308
            tickValues = tickValues.map(function (v) { return $$.parseDate(v); });                                     // 4309
        }                                                                                                              // 4310
                                                                                                                       // 4311
        // Set tick                                                                                                    // 4312
        axis.tickFormat(tickFormat).tickValues(tickValues);                                                            // 4313
        if ($$.isCategorized()) {                                                                                      // 4314
            axis.tickCentered(config.axis_x_tick_centered);                                                            // 4315
            if (isEmpty(config.axis_x_tick_culling)) {                                                                 // 4316
                config.axis_x_tick_culling = false;                                                                    // 4317
            }                                                                                                          // 4318
        }                                                                                                              // 4319
                                                                                                                       // 4320
        return axis;                                                                                                   // 4321
    };                                                                                                                 // 4322
    Axis.prototype.updateXAxisTickValues = function updateXAxisTickValues(targets, axis) {                             // 4323
        var $$ = this.owner, config = $$.config, tickValues;                                                           // 4324
        if (config.axis_x_tick_fit || config.axis_x_tick_count) {                                                      // 4325
            tickValues = this.generateTickValues($$.mapTargetsToUniqueXs(targets), config.axis_x_tick_count, $$.isTimeSeries());
        }                                                                                                              // 4327
        if (axis) {                                                                                                    // 4328
            axis.tickValues(tickValues);                                                                               // 4329
        } else {                                                                                                       // 4330
            $$.xAxis.tickValues(tickValues);                                                                           // 4331
            $$.subXAxis.tickValues(tickValues);                                                                        // 4332
        }                                                                                                              // 4333
        return tickValues;                                                                                             // 4334
    };                                                                                                                 // 4335
    Axis.prototype.getYAxis = function getYAxis(scale, orient, tickFormat, tickValues, withOuterTick, withoutTransition) {
        var axisParams = {                                                                                             // 4337
            withOuterTick: withOuterTick,                                                                              // 4338
            withoutTransition: withoutTransition,                                                                      // 4339
        },                                                                                                             // 4340
            $$ = this.owner,                                                                                           // 4341
            d3 = $$.d3,                                                                                                // 4342
            config = $$.config,                                                                                        // 4343
            axis = c3_axis(d3, axisParams).scale(scale).orient(orient).tickFormat(tickFormat);                         // 4344
        if ($$.isTimeSeriesY()) {                                                                                      // 4345
            axis.ticks(d3.time[config.axis_y_tick_time_value], config.axis_y_tick_time_interval);                      // 4346
        } else {                                                                                                       // 4347
            axis.tickValues(tickValues);                                                                               // 4348
        }                                                                                                              // 4349
        return axis;                                                                                                   // 4350
    };                                                                                                                 // 4351
    Axis.prototype.getId = function getId(id) {                                                                        // 4352
        var config = this.owner.config;                                                                                // 4353
        return id in config.data_axes ? config.data_axes[id] : 'y';                                                    // 4354
    };                                                                                                                 // 4355
    Axis.prototype.getXAxisTickFormat = function getXAxisTickFormat() {                                                // 4356
        var $$ = this.owner, config = $$.config,                                                                       // 4357
            format = $$.isTimeSeries() ? $$.defaultAxisTimeFormat : $$.isCategorized() ? $$.categoryName : function (v) { return v < 0 ? v.toFixed(0) : v; };
        if (config.axis_x_tick_format) {                                                                               // 4359
            if (isFunction(config.axis_x_tick_format)) {                                                               // 4360
                format = config.axis_x_tick_format;                                                                    // 4361
            } else if ($$.isTimeSeries()) {                                                                            // 4362
                format = function (date) {                                                                             // 4363
                    return date ? $$.axisTimeFormat(config.axis_x_tick_format)(date) : "";                             // 4364
                };                                                                                                     // 4365
            }                                                                                                          // 4366
        }                                                                                                              // 4367
        return isFunction(format) ? function (v) { return format.call($$, v); } : format;                              // 4368
    };                                                                                                                 // 4369
    Axis.prototype.getTickValues = function getTickValues(tickValues, axis) {                                          // 4370
        return tickValues ? tickValues : axis ? axis.tickValues() : undefined;                                         // 4371
    };                                                                                                                 // 4372
    Axis.prototype.getXAxisTickValues = function getXAxisTickValues() {                                                // 4373
        return this.getTickValues(this.owner.config.axis_x_tick_values, this.owner.xAxis);                             // 4374
    };                                                                                                                 // 4375
    Axis.prototype.getYAxisTickValues = function getYAxisTickValues() {                                                // 4376
        return this.getTickValues(this.owner.config.axis_y_tick_values, this.owner.yAxis);                             // 4377
    };                                                                                                                 // 4378
    Axis.prototype.getY2AxisTickValues = function getY2AxisTickValues() {                                              // 4379
        return this.getTickValues(this.owner.config.axis_y2_tick_values, this.owner.y2Axis);                           // 4380
    };                                                                                                                 // 4381
    Axis.prototype.getLabelOptionByAxisId = function getLabelOptionByAxisId(axisId) {                                  // 4382
        var $$ = this.owner, config = $$.config, option;                                                               // 4383
        if (axisId === 'y') {                                                                                          // 4384
            option = config.axis_y_label;                                                                              // 4385
        } else if (axisId === 'y2') {                                                                                  // 4386
            option = config.axis_y2_label;                                                                             // 4387
        } else if (axisId === 'x') {                                                                                   // 4388
            option = config.axis_x_label;                                                                              // 4389
        }                                                                                                              // 4390
        return option;                                                                                                 // 4391
    };                                                                                                                 // 4392
    Axis.prototype.getLabelText = function getLabelText(axisId) {                                                      // 4393
        var option = this.getLabelOptionByAxisId(axisId);                                                              // 4394
        return isString(option) ? option : option ? option.text : null;                                                // 4395
    };                                                                                                                 // 4396
    Axis.prototype.setLabelText = function setLabelText(axisId, text) {                                                // 4397
        var $$ = this.owner, config = $$.config,                                                                       // 4398
            option = this.getLabelOptionByAxisId(axisId);                                                              // 4399
        if (isString(option)) {                                                                                        // 4400
            if (axisId === 'y') {                                                                                      // 4401
                config.axis_y_label = text;                                                                            // 4402
            } else if (axisId === 'y2') {                                                                              // 4403
                config.axis_y2_label = text;                                                                           // 4404
            } else if (axisId === 'x') {                                                                               // 4405
                config.axis_x_label = text;                                                                            // 4406
            }                                                                                                          // 4407
        } else if (option) {                                                                                           // 4408
            option.text = text;                                                                                        // 4409
        }                                                                                                              // 4410
    };                                                                                                                 // 4411
    Axis.prototype.getLabelPosition = function getLabelPosition(axisId, defaultPosition) {                             // 4412
        var option = this.getLabelOptionByAxisId(axisId),                                                              // 4413
            position = (option && typeof option === 'object' && option.position) ? option.position : defaultPosition;  // 4414
        return {                                                                                                       // 4415
            isInner: position.indexOf('inner') >= 0,                                                                   // 4416
            isOuter: position.indexOf('outer') >= 0,                                                                   // 4417
            isLeft: position.indexOf('left') >= 0,                                                                     // 4418
            isCenter: position.indexOf('center') >= 0,                                                                 // 4419
            isRight: position.indexOf('right') >= 0,                                                                   // 4420
            isTop: position.indexOf('top') >= 0,                                                                       // 4421
            isMiddle: position.indexOf('middle') >= 0,                                                                 // 4422
            isBottom: position.indexOf('bottom') >= 0                                                                  // 4423
        };                                                                                                             // 4424
    };                                                                                                                 // 4425
    Axis.prototype.getXAxisLabelPosition = function getXAxisLabelPosition() {                                          // 4426
        return this.getLabelPosition('x', this.owner.config.axis_rotated ? 'inner-top' : 'inner-right');               // 4427
    };                                                                                                                 // 4428
    Axis.prototype.getYAxisLabelPosition = function getYAxisLabelPosition() {                                          // 4429
        return this.getLabelPosition('y', this.owner.config.axis_rotated ? 'inner-right' : 'inner-top');               // 4430
    };                                                                                                                 // 4431
    Axis.prototype.getY2AxisLabelPosition = function getY2AxisLabelPosition() {                                        // 4432
        return this.getLabelPosition('y2', this.owner.config.axis_rotated ? 'inner-right' : 'inner-top');              // 4433
    };                                                                                                                 // 4434
    Axis.prototype.getLabelPositionById = function getLabelPositionById(id) {                                          // 4435
        return id === 'y2' ? this.getY2AxisLabelPosition() : id === 'y' ? this.getYAxisLabelPosition() : this.getXAxisLabelPosition();
    };                                                                                                                 // 4437
    Axis.prototype.textForXAxisLabel = function textForXAxisLabel() {                                                  // 4438
        return this.getLabelText('x');                                                                                 // 4439
    };                                                                                                                 // 4440
    Axis.prototype.textForYAxisLabel = function textForYAxisLabel() {                                                  // 4441
        return this.getLabelText('y');                                                                                 // 4442
    };                                                                                                                 // 4443
    Axis.prototype.textForY2AxisLabel = function textForY2AxisLabel() {                                                // 4444
        return this.getLabelText('y2');                                                                                // 4445
    };                                                                                                                 // 4446
    Axis.prototype.xForAxisLabel = function xForAxisLabel(forHorizontal, position) {                                   // 4447
        var $$ = this.owner;                                                                                           // 4448
        if (forHorizontal) {                                                                                           // 4449
            return position.isLeft ? 0 : position.isCenter ? $$.width / 2 : $$.width;                                  // 4450
        } else {                                                                                                       // 4451
            return position.isBottom ? -$$.height : position.isMiddle ? -$$.height / 2 : 0;                            // 4452
        }                                                                                                              // 4453
    };                                                                                                                 // 4454
    Axis.prototype.dxForAxisLabel = function dxForAxisLabel(forHorizontal, position) {                                 // 4455
        if (forHorizontal) {                                                                                           // 4456
            return position.isLeft ? "0.5em" : position.isRight ? "-0.5em" : "0";                                      // 4457
        } else {                                                                                                       // 4458
            return position.isTop ? "-0.5em" : position.isBottom ? "0.5em" : "0";                                      // 4459
        }                                                                                                              // 4460
    };                                                                                                                 // 4461
    Axis.prototype.textAnchorForAxisLabel = function textAnchorForAxisLabel(forHorizontal, position) {                 // 4462
        if (forHorizontal) {                                                                                           // 4463
            return position.isLeft ? 'start' : position.isCenter ? 'middle' : 'end';                                   // 4464
        } else {                                                                                                       // 4465
            return position.isBottom ? 'start' : position.isMiddle ? 'middle' : 'end';                                 // 4466
        }                                                                                                              // 4467
    };                                                                                                                 // 4468
    Axis.prototype.xForXAxisLabel = function xForXAxisLabel() {                                                        // 4469
        return this.xForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());                      // 4470
    };                                                                                                                 // 4471
    Axis.prototype.xForYAxisLabel = function xForYAxisLabel() {                                                        // 4472
        return this.xForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());                       // 4473
    };                                                                                                                 // 4474
    Axis.prototype.xForY2AxisLabel = function xForY2AxisLabel() {                                                      // 4475
        return this.xForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());                      // 4476
    };                                                                                                                 // 4477
    Axis.prototype.dxForXAxisLabel = function dxForXAxisLabel() {                                                      // 4478
        return this.dxForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());                     // 4479
    };                                                                                                                 // 4480
    Axis.prototype.dxForYAxisLabel = function dxForYAxisLabel() {                                                      // 4481
        return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());                      // 4482
    };                                                                                                                 // 4483
    Axis.prototype.dxForY2AxisLabel = function dxForY2AxisLabel() {                                                    // 4484
        return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());                     // 4485
    };                                                                                                                 // 4486
    Axis.prototype.dyForXAxisLabel = function dyForXAxisLabel() {                                                      // 4487
        var $$ = this.owner, config = $$.config,                                                                       // 4488
            position = this.getXAxisLabelPosition();                                                                   // 4489
        if (config.axis_rotated) {                                                                                     // 4490
            return position.isInner ? "1.2em" : -25 - this.getMaxTickWidth('x');                                       // 4491
        } else {                                                                                                       // 4492
            return position.isInner ? "-0.5em" : config.axis_x_height ? config.axis_x_height - 10 : "3em";             // 4493
        }                                                                                                              // 4494
    };                                                                                                                 // 4495
    Axis.prototype.dyForYAxisLabel = function dyForYAxisLabel() {                                                      // 4496
        var $$ = this.owner,                                                                                           // 4497
            position = this.getYAxisLabelPosition();                                                                   // 4498
        if ($$.config.axis_rotated) {                                                                                  // 4499
            return position.isInner ? "-0.5em" : "3em";                                                                // 4500
        } else {                                                                                                       // 4501
            return position.isInner ? "1.2em" : -10 - ($$.config.axis_y_inner ? 0 : (this.getMaxTickWidth('y') + 10));
        }                                                                                                              // 4503
    };                                                                                                                 // 4504
    Axis.prototype.dyForY2AxisLabel = function dyForY2AxisLabel() {                                                    // 4505
        var $$ = this.owner,                                                                                           // 4506
            position = this.getY2AxisLabelPosition();                                                                  // 4507
        if ($$.config.axis_rotated) {                                                                                  // 4508
            return position.isInner ? "1.2em" : "-2.2em";                                                              // 4509
        } else {                                                                                                       // 4510
            return position.isInner ? "-0.5em" : 15 + ($$.config.axis_y2_inner ? 0 : (this.getMaxTickWidth('y2') + 15));
        }                                                                                                              // 4512
    };                                                                                                                 // 4513
    Axis.prototype.textAnchorForXAxisLabel = function textAnchorForXAxisLabel() {                                      // 4514
        var $$ = this.owner;                                                                                           // 4515
        return this.textAnchorForAxisLabel(!$$.config.axis_rotated, this.getXAxisLabelPosition());                     // 4516
    };                                                                                                                 // 4517
    Axis.prototype.textAnchorForYAxisLabel = function textAnchorForYAxisLabel() {                                      // 4518
        var $$ = this.owner;                                                                                           // 4519
        return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getYAxisLabelPosition());                      // 4520
    };                                                                                                                 // 4521
    Axis.prototype.textAnchorForY2AxisLabel = function textAnchorForY2AxisLabel() {                                    // 4522
        var $$ = this.owner;                                                                                           // 4523
        return this.textAnchorForAxisLabel($$.config.axis_rotated, this.getY2AxisLabelPosition());                     // 4524
    };                                                                                                                 // 4525
    Axis.prototype.getMaxTickWidth = function getMaxTickWidth(id, withoutRecompute) {                                  // 4526
        var $$ = this.owner, config = $$.config,                                                                       // 4527
            maxWidth = 0, targetsToShow, scale, axis, dummy, svg;                                                      // 4528
        if (withoutRecompute && $$.currentMaxTickWidths[id]) {                                                         // 4529
            return $$.currentMaxTickWidths[id];                                                                        // 4530
        }                                                                                                              // 4531
        if ($$.svg) {                                                                                                  // 4532
            targetsToShow = $$.filterTargetsToShow($$.data.targets);                                                   // 4533
            if (id === 'y') {                                                                                          // 4534
                scale = $$.y.copy().domain($$.getYDomain(targetsToShow, 'y'));                                         // 4535
                axis = this.getYAxis(scale, $$.yOrient, config.axis_y_tick_format, $$.yAxisTickValues, false, true);   // 4536
            } else if (id === 'y2') {                                                                                  // 4537
                scale = $$.y2.copy().domain($$.getYDomain(targetsToShow, 'y2'));                                       // 4538
                axis = this.getYAxis(scale, $$.y2Orient, config.axis_y2_tick_format, $$.y2AxisTickValues, false, true);
            } else {                                                                                                   // 4540
                scale = $$.x.copy().domain($$.getXDomain(targetsToShow));                                              // 4541
                axis = this.getXAxis(scale, $$.xOrient, $$.xAxisTickFormat, $$.xAxisTickValues, false, true, true);    // 4542
                this.updateXAxisTickValues(targetsToShow, axis);                                                       // 4543
            }                                                                                                          // 4544
            dummy = $$.d3.select('body').append('div').classed('c3', true);                                            // 4545
            svg = dummy.append("svg").style('visibility', 'hidden').style('position', 'fixed').style('top', 0).style('left', 0),
            svg.append('g').call(axis).each(function () {                                                              // 4547
                $$.d3.select(this).selectAll('text').each(function () {                                                // 4548
                    var box = this.getBoundingClientRect();                                                            // 4549
                    if (maxWidth < box.width) { maxWidth = box.width; }                                                // 4550
                });                                                                                                    // 4551
                dummy.remove();                                                                                        // 4552
            });                                                                                                        // 4553
        }                                                                                                              // 4554
        $$.currentMaxTickWidths[id] = maxWidth <= 0 ? $$.currentMaxTickWidths[id] : maxWidth;                          // 4555
        return $$.currentMaxTickWidths[id];                                                                            // 4556
    };                                                                                                                 // 4557
                                                                                                                       // 4558
    Axis.prototype.updateLabels = function updateLabels(withTransition) {                                              // 4559
        var $$ = this.owner;                                                                                           // 4560
        var axisXLabel = $$.main.select('.' + CLASS.axisX + ' .' + CLASS.axisXLabel),                                  // 4561
            axisYLabel = $$.main.select('.' + CLASS.axisY + ' .' + CLASS.axisYLabel),                                  // 4562
            axisY2Label = $$.main.select('.' + CLASS.axisY2 + ' .' + CLASS.axisY2Label);                               // 4563
        (withTransition ? axisXLabel.transition() : axisXLabel)                                                        // 4564
            .attr("x", this.xForXAxisLabel.bind(this))                                                                 // 4565
            .attr("dx", this.dxForXAxisLabel.bind(this))                                                               // 4566
            .attr("dy", this.dyForXAxisLabel.bind(this))                                                               // 4567
            .text(this.textForXAxisLabel.bind(this));                                                                  // 4568
        (withTransition ? axisYLabel.transition() : axisYLabel)                                                        // 4569
            .attr("x", this.xForYAxisLabel.bind(this))                                                                 // 4570
            .attr("dx", this.dxForYAxisLabel.bind(this))                                                               // 4571
            .attr("dy", this.dyForYAxisLabel.bind(this))                                                               // 4572
            .text(this.textForYAxisLabel.bind(this));                                                                  // 4573
        (withTransition ? axisY2Label.transition() : axisY2Label)                                                      // 4574
            .attr("x", this.xForY2AxisLabel.bind(this))                                                                // 4575
            .attr("dx", this.dxForY2AxisLabel.bind(this))                                                              // 4576
            .attr("dy", this.dyForY2AxisLabel.bind(this))                                                              // 4577
            .text(this.textForY2AxisLabel.bind(this));                                                                 // 4578
    };                                                                                                                 // 4579
    Axis.prototype.getPadding = function getPadding(padding, key, defaultValue, domainLength) {                        // 4580
        if (!isValue(padding[key])) {                                                                                  // 4581
            return defaultValue;                                                                                       // 4582
        }                                                                                                              // 4583
        if (padding.unit === 'ratio') {                                                                                // 4584
            return padding[key] * domainLength;                                                                        // 4585
        }                                                                                                              // 4586
        // assume padding is pixels if unit is not specified                                                           // 4587
        return this.convertPixelsToAxisPadding(padding[key], domainLength);                                            // 4588
    };                                                                                                                 // 4589
    Axis.prototype.convertPixelsToAxisPadding = function convertPixelsToAxisPadding(pixels, domainLength) {            // 4590
        var $$ = this.owner,                                                                                           // 4591
            length = $$.config.axis_rotated ? $$.width : $$.height;                                                    // 4592
        return domainLength * (pixels / length);                                                                       // 4593
    };                                                                                                                 // 4594
    Axis.prototype.generateTickValues = function generateTickValues(values, tickCount, forTimeSeries) {                // 4595
        var tickValues = values, targetCount, start, end, count, interval, i, tickValue;                               // 4596
        if (tickCount) {                                                                                               // 4597
            targetCount = isFunction(tickCount) ? tickCount() : tickCount;                                             // 4598
            // compute ticks according to tickCount                                                                    // 4599
            if (targetCount === 1) {                                                                                   // 4600
                tickValues = [values[0]];                                                                              // 4601
            } else if (targetCount === 2) {                                                                            // 4602
                tickValues = [values[0], values[values.length - 1]];                                                   // 4603
            } else if (targetCount > 2) {                                                                              // 4604
                count = targetCount - 2;                                                                               // 4605
                start = values[0];                                                                                     // 4606
                end = values[values.length - 1];                                                                       // 4607
                interval = (end - start) / (count + 1);                                                                // 4608
                // re-construct unique values                                                                          // 4609
                tickValues = [start];                                                                                  // 4610
                for (i = 0; i < count; i++) {                                                                          // 4611
                    tickValue = +start + interval * (i + 1);                                                           // 4612
                    tickValues.push(forTimeSeries ? new Date(tickValue) : tickValue);                                  // 4613
                }                                                                                                      // 4614
                tickValues.push(end);                                                                                  // 4615
            }                                                                                                          // 4616
        }                                                                                                              // 4617
        if (!forTimeSeries) { tickValues = tickValues.sort(function (a, b) { return a - b; }); }                       // 4618
        return tickValues;                                                                                             // 4619
    };                                                                                                                 // 4620
    Axis.prototype.generateTransitions = function generateTransitions(duration) {                                      // 4621
        var $$ = this.owner, axes = $$.axes;                                                                           // 4622
        return {                                                                                                       // 4623
            axisX: duration ? axes.x.transition().duration(duration) : axes.x,                                         // 4624
            axisY: duration ? axes.y.transition().duration(duration) : axes.y,                                         // 4625
            axisY2: duration ? axes.y2.transition().duration(duration) : axes.y2,                                      // 4626
            axisSubX: duration ? axes.subx.transition().duration(duration) : axes.subx                                 // 4627
        };                                                                                                             // 4628
    };                                                                                                                 // 4629
    Axis.prototype.redraw = function redraw(transitions, isHidden) {                                                   // 4630
        var $$ = this.owner;                                                                                           // 4631
        $$.axes.x.style("opacity", isHidden ? 0 : 1);                                                                  // 4632
        $$.axes.y.style("opacity", isHidden ? 0 : 1);                                                                  // 4633
        $$.axes.y2.style("opacity", isHidden ? 0 : 1);                                                                 // 4634
        $$.axes.subx.style("opacity", isHidden ? 0 : 1);                                                               // 4635
        transitions.axisX.call($$.xAxis);                                                                              // 4636
        transitions.axisY.call($$.yAxis);                                                                              // 4637
        transitions.axisY2.call($$.y2Axis);                                                                            // 4638
        transitions.axisSubX.call($$.subXAxis);                                                                        // 4639
    };                                                                                                                 // 4640
                                                                                                                       // 4641
    c3_chart_internal_fn.getClipPath = function (id) {                                                                 // 4642
        var isIE9 = window.navigator.appVersion.toLowerCase().indexOf("msie 9.") >= 0;                                 // 4643
        return "url(" + (isIE9 ? "" : document.URL.split('#')[0]) + "#" + id + ")";                                    // 4644
    };                                                                                                                 // 4645
    c3_chart_internal_fn.appendClip = function (parent, id) {                                                          // 4646
        return parent.append("clipPath").attr("id", id).append("rect");                                                // 4647
    };                                                                                                                 // 4648
    c3_chart_internal_fn.getAxisClipX = function (forHorizontal) {                                                     // 4649
        // axis line width + padding for left                                                                          // 4650
        var left = Math.max(30, this.margin.left);                                                                     // 4651
        return forHorizontal ? -(1 + left) : -(left - 1);                                                              // 4652
    };                                                                                                                 // 4653
    c3_chart_internal_fn.getAxisClipY = function (forHorizontal) {                                                     // 4654
        return forHorizontal ? -20 : -this.margin.top;                                                                 // 4655
    };                                                                                                                 // 4656
    c3_chart_internal_fn.getXAxisClipX = function () {                                                                 // 4657
        var $$ = this;                                                                                                 // 4658
        return $$.getAxisClipX(!$$.config.axis_rotated);                                                               // 4659
    };                                                                                                                 // 4660
    c3_chart_internal_fn.getXAxisClipY = function () {                                                                 // 4661
        var $$ = this;                                                                                                 // 4662
        return $$.getAxisClipY(!$$.config.axis_rotated);                                                               // 4663
    };                                                                                                                 // 4664
    c3_chart_internal_fn.getYAxisClipX = function () {                                                                 // 4665
        var $$ = this;                                                                                                 // 4666
        return $$.config.axis_y_inner ? -1 : $$.getAxisClipX($$.config.axis_rotated);                                  // 4667
    };                                                                                                                 // 4668
    c3_chart_internal_fn.getYAxisClipY = function () {                                                                 // 4669
        var $$ = this;                                                                                                 // 4670
        return $$.getAxisClipY($$.config.axis_rotated);                                                                // 4671
    };                                                                                                                 // 4672
    c3_chart_internal_fn.getAxisClipWidth = function (forHorizontal) {                                                 // 4673
        var $$ = this,                                                                                                 // 4674
            left = Math.max(30, $$.margin.left),                                                                       // 4675
            right = Math.max(30, $$.margin.right);                                                                     // 4676
        // width + axis line width + padding for left/right                                                            // 4677
        return forHorizontal ? $$.width + 2 + left + right : $$.margin.left + 20;                                      // 4678
    };                                                                                                                 // 4679
    c3_chart_internal_fn.getAxisClipHeight = function (forHorizontal) {                                                // 4680
        // less than 20 is not enough to show the axis label 'outer' without legend                                    // 4681
        return (forHorizontal ? this.margin.bottom : (this.margin.top + this.height)) + 20;                            // 4682
    };                                                                                                                 // 4683
    c3_chart_internal_fn.getXAxisClipWidth = function () {                                                             // 4684
        var $$ = this;                                                                                                 // 4685
        return $$.getAxisClipWidth(!$$.config.axis_rotated);                                                           // 4686
    };                                                                                                                 // 4687
    c3_chart_internal_fn.getXAxisClipHeight = function () {                                                            // 4688
        var $$ = this;                                                                                                 // 4689
        return $$.getAxisClipHeight(!$$.config.axis_rotated);                                                          // 4690
    };                                                                                                                 // 4691
    c3_chart_internal_fn.getYAxisClipWidth = function () {                                                             // 4692
        var $$ = this;                                                                                                 // 4693
        return $$.getAxisClipWidth($$.config.axis_rotated) + ($$.config.axis_y_inner ? 20 : 0);                        // 4694
    };                                                                                                                 // 4695
    c3_chart_internal_fn.getYAxisClipHeight = function () {                                                            // 4696
        var $$ = this;                                                                                                 // 4697
        return $$.getAxisClipHeight($$.config.axis_rotated);                                                           // 4698
    };                                                                                                                 // 4699
                                                                                                                       // 4700
    c3_chart_internal_fn.initPie = function () {                                                                       // 4701
        var $$ = this, d3 = $$.d3, config = $$.config;                                                                 // 4702
        $$.pie = d3.layout.pie().value(function (d) {                                                                  // 4703
            return d.values.reduce(function (a, b) { return a + b.value; }, 0);                                        // 4704
        });                                                                                                            // 4705
        if (!config.data_order) {                                                                                      // 4706
            $$.pie.sort(null);                                                                                         // 4707
        }                                                                                                              // 4708
    };                                                                                                                 // 4709
                                                                                                                       // 4710
    c3_chart_internal_fn.updateRadius = function () {                                                                  // 4711
        var $$ = this, config = $$.config,                                                                             // 4712
            w = config.gauge_width || config.donut_width;                                                              // 4713
        $$.radiusExpanded = Math.min($$.arcWidth, $$.arcHeight) / 2;                                                   // 4714
        $$.radius = $$.radiusExpanded * 0.95;                                                                          // 4715
        $$.innerRadiusRatio = w ? ($$.radius - w) / $$.radius : 0.6;                                                   // 4716
        $$.innerRadius = $$.hasType('donut') || $$.hasType('gauge') ? $$.radius * $$.innerRadiusRatio : 0;             // 4717
    };                                                                                                                 // 4718
                                                                                                                       // 4719
    c3_chart_internal_fn.updateArc = function () {                                                                     // 4720
        var $$ = this;                                                                                                 // 4721
        $$.svgArc = $$.getSvgArc();                                                                                    // 4722
        $$.svgArcExpanded = $$.getSvgArcExpanded();                                                                    // 4723
        $$.svgArcExpandedSub = $$.getSvgArcExpanded(0.98);                                                             // 4724
    };                                                                                                                 // 4725
                                                                                                                       // 4726
    c3_chart_internal_fn.updateAngle = function (d) {                                                                  // 4727
        var $$ = this, config = $$.config,                                                                             // 4728
            found = false, index = 0,                                                                                  // 4729
            gMin = config.gauge_min, gMax = config.gauge_max, gTic, gValue;                                            // 4730
        $$.pie($$.filterTargetsToShow($$.data.targets)).forEach(function (t) {                                         // 4731
            if (! found && t.data.id === d.data.id) {                                                                  // 4732
                found = true;                                                                                          // 4733
                d = t;                                                                                                 // 4734
                d.index = index;                                                                                       // 4735
            }                                                                                                          // 4736
            index++;                                                                                                   // 4737
        });                                                                                                            // 4738
        if (isNaN(d.startAngle)) {                                                                                     // 4739
            d.startAngle = 0;                                                                                          // 4740
        }                                                                                                              // 4741
        if (isNaN(d.endAngle)) {                                                                                       // 4742
            d.endAngle = d.startAngle;                                                                                 // 4743
        }                                                                                                              // 4744
        if ($$.isGaugeType(d.data)) {                                                                                  // 4745
            gTic = (Math.PI) / (gMax - gMin);                                                                          // 4746
            gValue = d.value < gMin ? 0 : d.value < gMax ? d.value - gMin : (gMax - gMin);                             // 4747
            d.startAngle = -1 * (Math.PI / 2);                                                                         // 4748
            d.endAngle = d.startAngle + gTic * gValue;                                                                 // 4749
        }                                                                                                              // 4750
        return found ? d : null;                                                                                       // 4751
    };                                                                                                                 // 4752
                                                                                                                       // 4753
    c3_chart_internal_fn.getSvgArc = function () {                                                                     // 4754
        var $$ = this,                                                                                                 // 4755
            arc = $$.d3.svg.arc().outerRadius($$.radius).innerRadius($$.innerRadius),                                  // 4756
            newArc = function (d, withoutUpdate) {                                                                     // 4757
                var updated;                                                                                           // 4758
                if (withoutUpdate) { return arc(d); } // for interpolate                                               // 4759
                updated = $$.updateAngle(d);                                                                           // 4760
                return updated ? arc(updated) : "M 0 0";                                                               // 4761
            };                                                                                                         // 4762
        // TODO: extends all function                                                                                  // 4763
        newArc.centroid = arc.centroid;                                                                                // 4764
        return newArc;                                                                                                 // 4765
    };                                                                                                                 // 4766
                                                                                                                       // 4767
    c3_chart_internal_fn.getSvgArcExpanded = function (rate) {                                                         // 4768
        var $$ = this,                                                                                                 // 4769
            arc = $$.d3.svg.arc().outerRadius($$.radiusExpanded * (rate ? rate : 1)).innerRadius($$.innerRadius);      // 4770
        return function (d) {                                                                                          // 4771
            var updated = $$.updateAngle(d);                                                                           // 4772
            return updated ? arc(updated) : "M 0 0";                                                                   // 4773
        };                                                                                                             // 4774
    };                                                                                                                 // 4775
                                                                                                                       // 4776
    c3_chart_internal_fn.getArc = function (d, withoutUpdate, force) {                                                 // 4777
        return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";                              // 4778
    };                                                                                                                 // 4779
                                                                                                                       // 4780
                                                                                                                       // 4781
    c3_chart_internal_fn.transformForArcLabel = function (d) {                                                         // 4782
        var $$ = this,                                                                                                 // 4783
            updated = $$.updateAngle(d), c, x, y, h, ratio, translate = "";                                            // 4784
        if (updated && !$$.hasType('gauge')) {                                                                         // 4785
            c = this.svgArc.centroid(updated);                                                                         // 4786
            x = isNaN(c[0]) ? 0 : c[0];                                                                                // 4787
            y = isNaN(c[1]) ? 0 : c[1];                                                                                // 4788
            h = Math.sqrt(x * x + y * y);                                                                              // 4789
            // TODO: ratio should be an option?                                                                        // 4790
            ratio = $$.radius && h ? (36 / $$.radius > 0.375 ? 1.175 - 36 / $$.radius : 0.8) * $$.radius / h : 0;      // 4791
            translate = "translate(" + (x * ratio) +  ',' + (y * ratio) +  ")";                                        // 4792
        }                                                                                                              // 4793
        return translate;                                                                                              // 4794
    };                                                                                                                 // 4795
                                                                                                                       // 4796
    c3_chart_internal_fn.getArcRatio = function (d) {                                                                  // 4797
        var $$ = this,                                                                                                 // 4798
            whole = $$.hasType('gauge') ? Math.PI : (Math.PI * 2);                                                     // 4799
        return d ? (d.endAngle - d.startAngle) / whole : null;                                                         // 4800
    };                                                                                                                 // 4801
                                                                                                                       // 4802
    c3_chart_internal_fn.convertToArcData = function (d) {                                                             // 4803
        return this.addName({                                                                                          // 4804
            id: d.data.id,                                                                                             // 4805
            value: d.value,                                                                                            // 4806
            ratio: this.getArcRatio(d),                                                                                // 4807
            index: d.index                                                                                             // 4808
        });                                                                                                            // 4809
    };                                                                                                                 // 4810
                                                                                                                       // 4811
    c3_chart_internal_fn.textForArcLabel = function (d) {                                                              // 4812
        var $$ = this,                                                                                                 // 4813
            updated, value, ratio, id, format;                                                                         // 4814
        if (! $$.shouldShowArcLabel()) { return ""; }                                                                  // 4815
        updated = $$.updateAngle(d);                                                                                   // 4816
        value = updated ? updated.value : null;                                                                        // 4817
        ratio = $$.getArcRatio(updated);                                                                               // 4818
        id = d.data.id;                                                                                                // 4819
        if (! $$.hasType('gauge') && ! $$.meetsArcLabelThreshold(ratio)) { return ""; }                                // 4820
        format = $$.getArcLabelFormat();                                                                               // 4821
        return format ? format(value, ratio, id) : $$.defaultArcValueFormat(value, ratio);                             // 4822
    };                                                                                                                 // 4823
                                                                                                                       // 4824
    c3_chart_internal_fn.expandArc = function (targetIds) {                                                            // 4825
        var $$ = this, interval;                                                                                       // 4826
                                                                                                                       // 4827
        // MEMO: avoid to cancel transition                                                                            // 4828
        if ($$.transiting) {                                                                                           // 4829
            interval = window.setInterval(function () {                                                                // 4830
                if (!$$.transiting) {                                                                                  // 4831
                    window.clearInterval(interval);                                                                    // 4832
                    if ($$.legend.selectAll('.c3-legend-item-focused').size() > 0) {                                   // 4833
                        $$.expandArc(targetIds);                                                                       // 4834
                    }                                                                                                  // 4835
                }                                                                                                      // 4836
            }, 10);                                                                                                    // 4837
            return;                                                                                                    // 4838
        }                                                                                                              // 4839
                                                                                                                       // 4840
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 4841
                                                                                                                       // 4842
        $$.svg.selectAll($$.selectorTargets(targetIds, '.' + CLASS.chartArc)).each(function (d) {                      // 4843
            if (! $$.shouldExpand(d.data.id)) { return; }                                                              // 4844
            $$.d3.select(this).selectAll('path')                                                                       // 4845
                .transition().duration($$.expandDuration(d.data.id))                                                   // 4846
                .attr("d", $$.svgArcExpanded)                                                                          // 4847
                .transition().duration($$.expandDuration(d.data.id) * 2)                                               // 4848
                .attr("d", $$.svgArcExpandedSub)                                                                       // 4849
                .each(function (d) {                                                                                   // 4850
                    if ($$.isDonutType(d.data)) {                                                                      // 4851
                        // callback here                                                                               // 4852
                    }                                                                                                  // 4853
                });                                                                                                    // 4854
        });                                                                                                            // 4855
    };                                                                                                                 // 4856
                                                                                                                       // 4857
    c3_chart_internal_fn.unexpandArc = function (targetIds) {                                                          // 4858
        var $$ = this;                                                                                                 // 4859
                                                                                                                       // 4860
        if ($$.transiting) { return; }                                                                                 // 4861
                                                                                                                       // 4862
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 4863
                                                                                                                       // 4864
        $$.svg.selectAll($$.selectorTargets(targetIds, '.' + CLASS.chartArc)).selectAll('path')                        // 4865
            .transition().duration(function(d) {                                                                       // 4866
                return $$.expandDuration(d.data.id);                                                                   // 4867
            })                                                                                                         // 4868
            .attr("d", $$.svgArc);                                                                                     // 4869
        $$.svg.selectAll('.' + CLASS.arc)                                                                              // 4870
            .style("opacity", 1);                                                                                      // 4871
    };                                                                                                                 // 4872
                                                                                                                       // 4873
    c3_chart_internal_fn.expandDuration = function (id) {                                                              // 4874
        var $$ = this, config = $$.config;                                                                             // 4875
                                                                                                                       // 4876
        if ($$.isDonutType(id)) {                                                                                      // 4877
            return config.donut_expand_duration;                                                                       // 4878
        } else if ($$.isGaugeType(id)) {                                                                               // 4879
            return config.gauge_expand_duration;                                                                       // 4880
        } else if ($$.isPieType(id)) {                                                                                 // 4881
            return config.pie_expand_duration;                                                                         // 4882
        } else {                                                                                                       // 4883
            return 50;                                                                                                 // 4884
        }                                                                                                              // 4885
                                                                                                                       // 4886
    };                                                                                                                 // 4887
                                                                                                                       // 4888
    c3_chart_internal_fn.shouldExpand = function (id) {                                                                // 4889
        var $$ = this, config = $$.config;                                                                             // 4890
        return ($$.isDonutType(id) && config.donut_expand) ||                                                          // 4891
               ($$.isGaugeType(id) && config.gauge_expand) ||                                                          // 4892
               ($$.isPieType(id) && config.pie_expand);                                                                // 4893
    };                                                                                                                 // 4894
                                                                                                                       // 4895
    c3_chart_internal_fn.shouldShowArcLabel = function () {                                                            // 4896
        var $$ = this, config = $$.config, shouldShow = true;                                                          // 4897
        if ($$.hasType('donut')) {                                                                                     // 4898
            shouldShow = config.donut_label_show;                                                                      // 4899
        } else if ($$.hasType('pie')) {                                                                                // 4900
            shouldShow = config.pie_label_show;                                                                        // 4901
        }                                                                                                              // 4902
        // when gauge, always true                                                                                     // 4903
        return shouldShow;                                                                                             // 4904
    };                                                                                                                 // 4905
                                                                                                                       // 4906
    c3_chart_internal_fn.meetsArcLabelThreshold = function (ratio) {                                                   // 4907
        var $$ = this, config = $$.config,                                                                             // 4908
            threshold = $$.hasType('donut') ? config.donut_label_threshold : config.pie_label_threshold;               // 4909
        return ratio >= threshold;                                                                                     // 4910
    };                                                                                                                 // 4911
                                                                                                                       // 4912
    c3_chart_internal_fn.getArcLabelFormat = function () {                                                             // 4913
        var $$ = this, config = $$.config,                                                                             // 4914
            format = config.pie_label_format;                                                                          // 4915
        if ($$.hasType('gauge')) {                                                                                     // 4916
            format = config.gauge_label_format;                                                                        // 4917
        } else if ($$.hasType('donut')) {                                                                              // 4918
            format = config.donut_label_format;                                                                        // 4919
        }                                                                                                              // 4920
        return format;                                                                                                 // 4921
    };                                                                                                                 // 4922
                                                                                                                       // 4923
    c3_chart_internal_fn.getArcTitle = function () {                                                                   // 4924
        var $$ = this;                                                                                                 // 4925
        return $$.hasType('donut') ? $$.config.donut_title : "";                                                       // 4926
    };                                                                                                                 // 4927
                                                                                                                       // 4928
    c3_chart_internal_fn.updateTargetsForArc = function (targets) {                                                    // 4929
        var $$ = this, main = $$.main,                                                                                 // 4930
            mainPieUpdate, mainPieEnter,                                                                               // 4931
            classChartArc = $$.classChartArc.bind($$),                                                                 // 4932
            classArcs = $$.classArcs.bind($$),                                                                         // 4933
            classFocus = $$.classFocus.bind($$);                                                                       // 4934
        mainPieUpdate = main.select('.' + CLASS.chartArcs).selectAll('.' + CLASS.chartArc)                             // 4935
            .data($$.pie(targets))                                                                                     // 4936
            .attr("class", function (d) { return classChartArc(d) + classFocus(d.data); });                            // 4937
        mainPieEnter = mainPieUpdate.enter().append("g")                                                               // 4938
            .attr("class", classChartArc);                                                                             // 4939
        mainPieEnter.append('g')                                                                                       // 4940
            .attr('class', classArcs);                                                                                 // 4941
        mainPieEnter.append("text")                                                                                    // 4942
            .attr("dy", $$.hasType('gauge') ? "-.1em" : ".35em")                                                       // 4943
            .style("opacity", 0)                                                                                       // 4944
            .style("text-anchor", "middle")                                                                            // 4945
            .style("pointer-events", "none");                                                                          // 4946
        // MEMO: can not keep same color..., but not bad to update color in redraw                                     // 4947
        //mainPieUpdate.exit().remove();                                                                               // 4948
    };                                                                                                                 // 4949
                                                                                                                       // 4950
    c3_chart_internal_fn.initArc = function () {                                                                       // 4951
        var $$ = this;                                                                                                 // 4952
        $$.arcs = $$.main.select('.' + CLASS.chart).append("g")                                                        // 4953
            .attr("class", CLASS.chartArcs)                                                                            // 4954
            .attr("transform", $$.getTranslate('arc'));                                                                // 4955
        $$.arcs.append('text')                                                                                         // 4956
            .attr('class', CLASS.chartArcsTitle)                                                                       // 4957
            .style("text-anchor", "middle")                                                                            // 4958
            .text($$.getArcTitle());                                                                                   // 4959
    };                                                                                                                 // 4960
                                                                                                                       // 4961
    c3_chart_internal_fn.redrawArc = function (duration, durationForExit, withTransform) {                             // 4962
        var $$ = this, d3 = $$.d3, config = $$.config, main = $$.main,                                                 // 4963
            mainArc;                                                                                                   // 4964
        mainArc = main.selectAll('.' + CLASS.arcs).selectAll('.' + CLASS.arc)                                          // 4965
            .data($$.arcData.bind($$));                                                                                // 4966
        mainArc.enter().append('path')                                                                                 // 4967
            .attr("class", $$.classArc.bind($$))                                                                       // 4968
            .style("fill", function (d) { return $$.color(d.data); })                                                  // 4969
            .style("cursor", function (d) { return config.interaction_enabled && config.data_selection_isselectable(d) ? "pointer" : null; })
            .style("opacity", 0)                                                                                       // 4971
            .each(function (d) {                                                                                       // 4972
                if ($$.isGaugeType(d.data)) {                                                                          // 4973
                    d.startAngle = d.endAngle = -1 * (Math.PI / 2);                                                    // 4974
                }                                                                                                      // 4975
                this._current = d;                                                                                     // 4976
            });                                                                                                        // 4977
        mainArc                                                                                                        // 4978
            .attr("transform", function (d) { return !$$.isGaugeType(d.data) && withTransform ? "scale(0)" : ""; })    // 4979
            .style("opacity", function (d) { return d === this._current ? 0 : 1; })                                    // 4980
            .on('mouseover', config.interaction_enabled ? function (d) {                                               // 4981
                var updated, arcData;                                                                                  // 4982
                if ($$.transiting) { // skip while transiting                                                          // 4983
                    return;                                                                                            // 4984
                }                                                                                                      // 4985
                updated = $$.updateAngle(d);                                                                           // 4986
                if (updated) {                                                                                         // 4987
                    arcData = $$.convertToArcData(updated);                                                            // 4988
                    // transitions                                                                                     // 4989
                    $$.expandArc(updated.data.id);                                                                     // 4990
                    $$.api.focus(updated.data.id);                                                                     // 4991
                    $$.toggleFocusLegend(updated.data.id, true);                                                       // 4992
                    $$.config.data_onmouseover(arcData, this);                                                         // 4993
                }                                                                                                      // 4994
            } : null)                                                                                                  // 4995
            .on('mousemove', config.interaction_enabled ? function (d) {                                               // 4996
                var updated = $$.updateAngle(d), arcData, selectedData;                                                // 4997
                if (updated) {                                                                                         // 4998
                    arcData = $$.convertToArcData(updated),                                                            // 4999
                    selectedData = [arcData];                                                                          // 5000
                    $$.showTooltip(selectedData, this);                                                                // 5001
                }                                                                                                      // 5002
            } : null)                                                                                                  // 5003
            .on('mouseout', config.interaction_enabled ? function (d) {                                                // 5004
                var updated, arcData;                                                                                  // 5005
                if ($$.transiting) { // skip while transiting                                                          // 5006
                    return;                                                                                            // 5007
                }                                                                                                      // 5008
                updated = $$.updateAngle(d);                                                                           // 5009
                if (updated) {                                                                                         // 5010
                    arcData = $$.convertToArcData(updated);                                                            // 5011
                    // transitions                                                                                     // 5012
                    $$.unexpandArc(updated.data.id);                                                                   // 5013
                    $$.api.revert();                                                                                   // 5014
                    $$.revertLegend();                                                                                 // 5015
                    $$.hideTooltip();                                                                                  // 5016
                    $$.config.data_onmouseout(arcData, this);                                                          // 5017
                }                                                                                                      // 5018
            } : null)                                                                                                  // 5019
            .on('click', config.interaction_enabled ? function (d, i) {                                                // 5020
                var updated = $$.updateAngle(d), arcData;                                                              // 5021
                if (updated) {                                                                                         // 5022
                    arcData = $$.convertToArcData(updated);                                                            // 5023
                    if ($$.toggleShape) {                                                                              // 5024
                        $$.toggleShape(this, arcData, i);                                                              // 5025
                    }                                                                                                  // 5026
                    $$.config.data_onclick.call($$.api, arcData, this);                                                // 5027
                }                                                                                                      // 5028
            } : null)                                                                                                  // 5029
            .each(function () { $$.transiting = true; })                                                               // 5030
            .transition().duration(duration)                                                                           // 5031
            .attrTween("d", function (d) {                                                                             // 5032
                var updated = $$.updateAngle(d), interpolate;                                                          // 5033
                if (! updated) {                                                                                       // 5034
                    return function () { return "M 0 0"; };                                                            // 5035
                }                                                                                                      // 5036
                //                if (this._current === d) {                                                           // 5037
                //                    this._current = {                                                                // 5038
                //                        startAngle: Math.PI*2,                                                       // 5039
                //                        endAngle: Math.PI*2,                                                         // 5040
                //                    };                                                                               // 5041
                //                }                                                                                    // 5042
                if (isNaN(this._current.startAngle)) {                                                                 // 5043
                    this._current.startAngle = 0;                                                                      // 5044
                }                                                                                                      // 5045
                if (isNaN(this._current.endAngle)) {                                                                   // 5046
                    this._current.endAngle = this._current.startAngle;                                                 // 5047
                }                                                                                                      // 5048
                interpolate = d3.interpolate(this._current, updated);                                                  // 5049
                this._current = interpolate(0);                                                                        // 5050
                return function (t) {                                                                                  // 5051
                    var interpolated = interpolate(t);                                                                 // 5052
                    interpolated.data = d.data; // data.id will be updated by interporator                             // 5053
                    return $$.getArc(interpolated, true);                                                              // 5054
                };                                                                                                     // 5055
            })                                                                                                         // 5056
            .attr("transform", withTransform ? "scale(1)" : "")                                                        // 5057
            .style("fill", function (d) {                                                                              // 5058
                return $$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data.id);                    // 5059
            }) // Where gauge reading color would receive customization.                                               // 5060
            .style("opacity", 1)                                                                                       // 5061
            .call($$.endall, function () {                                                                             // 5062
                $$.transiting = false;                                                                                 // 5063
            });                                                                                                        // 5064
        mainArc.exit().transition().duration(durationForExit)                                                          // 5065
            .style('opacity', 0)                                                                                       // 5066
            .remove();                                                                                                 // 5067
        main.selectAll('.' + CLASS.chartArc).select('text')                                                            // 5068
            .style("opacity", 0)                                                                                       // 5069
            .attr('class', function (d) { return $$.isGaugeType(d.data) ? CLASS.gaugeValue : ''; })                    // 5070
            .text($$.textForArcLabel.bind($$))                                                                         // 5071
            .attr("transform", $$.transformForArcLabel.bind($$))                                                       // 5072
            .style('font-size', function (d) { return $$.isGaugeType(d.data) ? Math.round($$.radius / 5) + 'px' : ''; })
          .transition().duration(duration)                                                                             // 5074
            .style("opacity", function (d) { return $$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? 1 : 0; });  // 5075
        main.select('.' + CLASS.chartArcsTitle)                                                                        // 5076
            .style("opacity", $$.hasType('donut') || $$.hasType('gauge') ? 1 : 0);                                     // 5077
                                                                                                                       // 5078
        if ($$.hasType('gauge')) {                                                                                     // 5079
            $$.arcs.select('.' + CLASS.chartArcsBackground)                                                            // 5080
                .attr("d", function () {                                                                               // 5081
                    var d = {                                                                                          // 5082
                        data: [{value: config.gauge_max}],                                                             // 5083
                        startAngle: -1 * (Math.PI / 2),                                                                // 5084
                        endAngle: Math.PI / 2                                                                          // 5085
                    };                                                                                                 // 5086
                    return $$.getArc(d, true, true);                                                                   // 5087
                });                                                                                                    // 5088
            $$.arcs.select('.' + CLASS.chartArcsGaugeUnit)                                                             // 5089
                .attr("dy", ".75em")                                                                                   // 5090
                .text(config.gauge_label_show ? config.gauge_units : '');                                              // 5091
            $$.arcs.select('.' + CLASS.chartArcsGaugeMin)                                                              // 5092
                .attr("dx", -1 * ($$.innerRadius + (($$.radius - $$.innerRadius) / 2)) + "px")                         // 5093
                .attr("dy", "1.2em")                                                                                   // 5094
                .text(config.gauge_label_show ? config.gauge_min : '');                                                // 5095
            $$.arcs.select('.' + CLASS.chartArcsGaugeMax)                                                              // 5096
                .attr("dx", $$.innerRadius + (($$.radius - $$.innerRadius) / 2) + "px")                                // 5097
                .attr("dy", "1.2em")                                                                                   // 5098
                .text(config.gauge_label_show ? config.gauge_max : '');                                                // 5099
        }                                                                                                              // 5100
    };                                                                                                                 // 5101
    c3_chart_internal_fn.initGauge = function () {                                                                     // 5102
        var arcs = this.arcs;                                                                                          // 5103
        if (this.hasType('gauge')) {                                                                                   // 5104
            arcs.append('path')                                                                                        // 5105
                .attr("class", CLASS.chartArcsBackground);                                                             // 5106
            arcs.append("text")                                                                                        // 5107
                .attr("class", CLASS.chartArcsGaugeUnit)                                                               // 5108
                .style("text-anchor", "middle")                                                                        // 5109
                .style("pointer-events", "none");                                                                      // 5110
            arcs.append("text")                                                                                        // 5111
                .attr("class", CLASS.chartArcsGaugeMin)                                                                // 5112
                .style("text-anchor", "middle")                                                                        // 5113
                .style("pointer-events", "none");                                                                      // 5114
            arcs.append("text")                                                                                        // 5115
                .attr("class", CLASS.chartArcsGaugeMax)                                                                // 5116
                .style("text-anchor", "middle")                                                                        // 5117
                .style("pointer-events", "none");                                                                      // 5118
        }                                                                                                              // 5119
    };                                                                                                                 // 5120
    c3_chart_internal_fn.getGaugeLabelHeight = function () {                                                           // 5121
        return this.config.gauge_label_show ? 20 : 0;                                                                  // 5122
    };                                                                                                                 // 5123
                                                                                                                       // 5124
    c3_chart_internal_fn.initRegion = function () {                                                                    // 5125
        var $$ = this;                                                                                                 // 5126
        $$.region = $$.main.append('g')                                                                                // 5127
            .attr("clip-path", $$.clipPath)                                                                            // 5128
            .attr("class", CLASS.regions);                                                                             // 5129
    };                                                                                                                 // 5130
    c3_chart_internal_fn.updateRegion = function (duration) {                                                          // 5131
        var $$ = this, config = $$.config;                                                                             // 5132
                                                                                                                       // 5133
        // hide if arc type                                                                                            // 5134
        $$.region.style('visibility', $$.hasArcType() ? 'hidden' : 'visible');                                         // 5135
                                                                                                                       // 5136
        $$.mainRegion = $$.main.select('.' + CLASS.regions).selectAll('.' + CLASS.region)                              // 5137
            .data(config.regions);                                                                                     // 5138
        $$.mainRegion.enter().append('g')                                                                              // 5139
            .attr('class', $$.classRegion.bind($$))                                                                    // 5140
          .append('rect')                                                                                              // 5141
            .style("fill-opacity", 0);                                                                                 // 5142
        $$.mainRegion.exit().transition().duration(duration)                                                           // 5143
            .style("opacity", 0)                                                                                       // 5144
            .remove();                                                                                                 // 5145
    };                                                                                                                 // 5146
    c3_chart_internal_fn.redrawRegion = function (withTransition) {                                                    // 5147
        var $$ = this,                                                                                                 // 5148
            regions = $$.mainRegion.selectAll('rect'),                                                                 // 5149
            x = $$.regionX.bind($$),                                                                                   // 5150
            y = $$.regionY.bind($$),                                                                                   // 5151
            w = $$.regionWidth.bind($$),                                                                               // 5152
            h = $$.regionHeight.bind($$);                                                                              // 5153
        return [                                                                                                       // 5154
            (withTransition ? regions.transition() : regions)                                                          // 5155
                .attr("x", x)                                                                                          // 5156
                .attr("y", y)                                                                                          // 5157
                .attr("width", w)                                                                                      // 5158
                .attr("height", h)                                                                                     // 5159
                .style("fill-opacity", function (d) { return isValue(d.opacity) ? d.opacity : 0.1; })                  // 5160
        ];                                                                                                             // 5161
    };                                                                                                                 // 5162
    c3_chart_internal_fn.regionX = function (d) {                                                                      // 5163
        var $$ = this, config = $$.config,                                                                             // 5164
            xPos, yScale = d.axis === 'y' ? $$.y : $$.y2;                                                              // 5165
        if (d.axis === 'y' || d.axis === 'y2') {                                                                       // 5166
            xPos = config.axis_rotated ? ('start' in d ? yScale(d.start) : 0) : 0;                                     // 5167
        } else {                                                                                                       // 5168
            xPos = config.axis_rotated ? 0 : ('start' in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.start) : d.start) : 0);
        }                                                                                                              // 5170
        return xPos;                                                                                                   // 5171
    };                                                                                                                 // 5172
    c3_chart_internal_fn.regionY = function (d) {                                                                      // 5173
        var $$ = this, config = $$.config,                                                                             // 5174
            yPos, yScale = d.axis === 'y' ? $$.y : $$.y2;                                                              // 5175
        if (d.axis === 'y' || d.axis === 'y2') {                                                                       // 5176
            yPos = config.axis_rotated ? 0 : ('end' in d ? yScale(d.end) : 0);                                         // 5177
        } else {                                                                                                       // 5178
            yPos = config.axis_rotated ? ('start' in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.start) : d.start) : 0) : 0;
        }                                                                                                              // 5180
        return yPos;                                                                                                   // 5181
    };                                                                                                                 // 5182
    c3_chart_internal_fn.regionWidth = function (d) {                                                                  // 5183
        var $$ = this, config = $$.config,                                                                             // 5184
            start = $$.regionX(d), end, yScale = d.axis === 'y' ? $$.y : $$.y2;                                        // 5185
        if (d.axis === 'y' || d.axis === 'y2') {                                                                       // 5186
            end = config.axis_rotated ? ('end' in d ? yScale(d.end) : $$.width) : $$.width;                            // 5187
        } else {                                                                                                       // 5188
            end = config.axis_rotated ? $$.width : ('end' in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.end) : d.end) : $$.width);
        }                                                                                                              // 5190
        return end < start ? 0 : end - start;                                                                          // 5191
    };                                                                                                                 // 5192
    c3_chart_internal_fn.regionHeight = function (d) {                                                                 // 5193
        var $$ = this, config = $$.config,                                                                             // 5194
            start = this.regionY(d), end, yScale = d.axis === 'y' ? $$.y : $$.y2;                                      // 5195
        if (d.axis === 'y' || d.axis === 'y2') {                                                                       // 5196
            end = config.axis_rotated ? $$.height : ('start' in d ? yScale(d.start) : $$.height);                      // 5197
        } else {                                                                                                       // 5198
            end = config.axis_rotated ? ('end' in d ? $$.x($$.isTimeSeries() ? $$.parseDate(d.end) : d.end) : $$.height) : $$.height;
        }                                                                                                              // 5200
        return end < start ? 0 : end - start;                                                                          // 5201
    };                                                                                                                 // 5202
    c3_chart_internal_fn.isRegionOnX = function (d) {                                                                  // 5203
        return !d.axis || d.axis === 'x';                                                                              // 5204
    };                                                                                                                 // 5205
                                                                                                                       // 5206
    c3_chart_internal_fn.drag = function (mouse) {                                                                     // 5207
        var $$ = this, config = $$.config, main = $$.main, d3 = $$.d3;                                                 // 5208
        var sx, sy, mx, my, minX, maxX, minY, maxY;                                                                    // 5209
                                                                                                                       // 5210
        if ($$.hasArcType()) { return; }                                                                               // 5211
        if (! config.data_selection_enabled) { return; } // do nothing if not selectable                               // 5212
        if (config.zoom_enabled && ! $$.zoom.altDomain) { return; } // skip if zoomable because of conflict drag dehavior
        if (!config.data_selection_multiple) { return; } // skip when single selection because drag is used for multiple selection
                                                                                                                       // 5215
        sx = $$.dragStart[0];                                                                                          // 5216
        sy = $$.dragStart[1];                                                                                          // 5217
        mx = mouse[0];                                                                                                 // 5218
        my = mouse[1];                                                                                                 // 5219
        minX = Math.min(sx, mx);                                                                                       // 5220
        maxX = Math.max(sx, mx);                                                                                       // 5221
        minY = (config.data_selection_grouped) ? $$.margin.top : Math.min(sy, my);                                     // 5222
        maxY = (config.data_selection_grouped) ? $$.height : Math.max(sy, my);                                         // 5223
                                                                                                                       // 5224
        main.select('.' + CLASS.dragarea)                                                                              // 5225
            .attr('x', minX)                                                                                           // 5226
            .attr('y', minY)                                                                                           // 5227
            .attr('width', maxX - minX)                                                                                // 5228
            .attr('height', maxY - minY);                                                                              // 5229
        // TODO: binary search when multiple xs                                                                        // 5230
        main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape)                                                // 5231
            .filter(function (d) { return config.data_selection_isselectable(d); })                                    // 5232
            .each(function (d, i) {                                                                                    // 5233
                var shape = d3.select(this),                                                                           // 5234
                    isSelected = shape.classed(CLASS.SELECTED),                                                        // 5235
                    isIncluded = shape.classed(CLASS.INCLUDED),                                                        // 5236
                    _x, _y, _w, _h, toggle, isWithin = false, box;                                                     // 5237
                if (shape.classed(CLASS.circle)) {                                                                     // 5238
                    _x = shape.attr("cx") * 1;                                                                         // 5239
                    _y = shape.attr("cy") * 1;                                                                         // 5240
                    toggle = $$.togglePoint;                                                                           // 5241
                    isWithin = minX < _x && _x < maxX && minY < _y && _y < maxY;                                       // 5242
                }                                                                                                      // 5243
                else if (shape.classed(CLASS.bar)) {                                                                   // 5244
                    box = getPathBox(this);                                                                            // 5245
                    _x = box.x;                                                                                        // 5246
                    _y = box.y;                                                                                        // 5247
                    _w = box.width;                                                                                    // 5248
                    _h = box.height;                                                                                   // 5249
                    toggle = $$.togglePath;                                                                            // 5250
                    isWithin = !(maxX < _x || _x + _w < minX) && !(maxY < _y || _y + _h < minY);                       // 5251
                } else {                                                                                               // 5252
                    // line/area selection not supported yet                                                           // 5253
                    return;                                                                                            // 5254
                }                                                                                                      // 5255
                if (isWithin ^ isIncluded) {                                                                           // 5256
                    shape.classed(CLASS.INCLUDED, !isIncluded);                                                        // 5257
                    // TODO: included/unincluded callback here                                                         // 5258
                    shape.classed(CLASS.SELECTED, !isSelected);                                                        // 5259
                    toggle.call($$, !isSelected, shape, d, i);                                                         // 5260
                }                                                                                                      // 5261
            });                                                                                                        // 5262
    };                                                                                                                 // 5263
                                                                                                                       // 5264
    c3_chart_internal_fn.dragstart = function (mouse) {                                                                // 5265
        var $$ = this, config = $$.config;                                                                             // 5266
        if ($$.hasArcType()) { return; }                                                                               // 5267
        if (! config.data_selection_enabled) { return; } // do nothing if not selectable                               // 5268
        $$.dragStart = mouse;                                                                                          // 5269
        $$.main.select('.' + CLASS.chart).append('rect')                                                               // 5270
            .attr('class', CLASS.dragarea)                                                                             // 5271
            .style('opacity', 0.1);                                                                                    // 5272
        $$.dragging = true;                                                                                            // 5273
    };                                                                                                                 // 5274
                                                                                                                       // 5275
    c3_chart_internal_fn.dragend = function () {                                                                       // 5276
        var $$ = this, config = $$.config;                                                                             // 5277
        if ($$.hasArcType()) { return; }                                                                               // 5278
        if (! config.data_selection_enabled) { return; } // do nothing if not selectable                               // 5279
        $$.main.select('.' + CLASS.dragarea)                                                                           // 5280
            .transition().duration(100)                                                                                // 5281
            .style('opacity', 0)                                                                                       // 5282
            .remove();                                                                                                 // 5283
        $$.main.selectAll('.' + CLASS.shape)                                                                           // 5284
            .classed(CLASS.INCLUDED, false);                                                                           // 5285
        $$.dragging = false;                                                                                           // 5286
    };                                                                                                                 // 5287
                                                                                                                       // 5288
    c3_chart_internal_fn.selectPoint = function (target, d, i) {                                                       // 5289
        var $$ = this, config = $$.config,                                                                             // 5290
            cx = (config.axis_rotated ? $$.circleY : $$.circleX).bind($$),                                             // 5291
            cy = (config.axis_rotated ? $$.circleX : $$.circleY).bind($$),                                             // 5292
            r = $$.pointSelectR.bind($$);                                                                              // 5293
        config.data_onselected.call($$.api, d, target.node());                                                         // 5294
        // add selected-circle on low layer g                                                                          // 5295
        $$.main.select('.' + CLASS.selectedCircles + $$.getTargetSelectorSuffix(d.id)).selectAll('.' + CLASS.selectedCircle + '-' + i)
            .data([d])                                                                                                 // 5297
            .enter().append('circle')                                                                                  // 5298
            .attr("class", function () { return $$.generateClass(CLASS.selectedCircle, i); })                          // 5299
            .attr("cx", cx)                                                                                            // 5300
            .attr("cy", cy)                                                                                            // 5301
            .attr("stroke", function () { return $$.color(d); })                                                       // 5302
            .attr("r", function (d) { return $$.pointSelectR(d) * 1.4; })                                              // 5303
            .transition().duration(100)                                                                                // 5304
            .attr("r", r);                                                                                             // 5305
    };                                                                                                                 // 5306
    c3_chart_internal_fn.unselectPoint = function (target, d, i) {                                                     // 5307
        var $$ = this;                                                                                                 // 5308
        $$.config.data_onunselected.call($$.api, d, target.node());                                                    // 5309
        // remove selected-circle from low layer g                                                                     // 5310
        $$.main.select('.' + CLASS.selectedCircles + $$.getTargetSelectorSuffix(d.id)).selectAll('.' + CLASS.selectedCircle + '-' + i)
            .transition().duration(100).attr('r', 0)                                                                   // 5312
            .remove();                                                                                                 // 5313
    };                                                                                                                 // 5314
    c3_chart_internal_fn.togglePoint = function (selected, target, d, i) {                                             // 5315
        selected ? this.selectPoint(target, d, i) : this.unselectPoint(target, d, i);                                  // 5316
    };                                                                                                                 // 5317
    c3_chart_internal_fn.selectPath = function (target, d) {                                                           // 5318
        var $$ = this;                                                                                                 // 5319
        $$.config.data_onselected.call($$, d, target.node());                                                          // 5320
        target.transition().duration(100)                                                                              // 5321
            .style("fill", function () { return $$.d3.rgb($$.color(d)).brighter(0.75); });                             // 5322
    };                                                                                                                 // 5323
    c3_chart_internal_fn.unselectPath = function (target, d) {                                                         // 5324
        var $$ = this;                                                                                                 // 5325
        $$.config.data_onunselected.call($$, d, target.node());                                                        // 5326
        target.transition().duration(100)                                                                              // 5327
            .style("fill", function () { return $$.color(d); });                                                       // 5328
    };                                                                                                                 // 5329
    c3_chart_internal_fn.togglePath = function (selected, target, d, i) {                                              // 5330
        selected ? this.selectPath(target, d, i) : this.unselectPath(target, d, i);                                    // 5331
    };                                                                                                                 // 5332
    c3_chart_internal_fn.getToggle = function (that, d) {                                                              // 5333
        var $$ = this, toggle;                                                                                         // 5334
        if (that.nodeName === 'circle') {                                                                              // 5335
            if ($$.isStepType(d)) {                                                                                    // 5336
                // circle is hidden in step chart, so treat as within the click area                                   // 5337
                toggle = function () {}; // TODO: how to select step chart?                                            // 5338
            } else {                                                                                                   // 5339
                toggle = $$.togglePoint;                                                                               // 5340
            }                                                                                                          // 5341
        }                                                                                                              // 5342
        else if (that.nodeName === 'path') {                                                                           // 5343
            toggle = $$.togglePath;                                                                                    // 5344
        }                                                                                                              // 5345
        return toggle;                                                                                                 // 5346
    };                                                                                                                 // 5347
    c3_chart_internal_fn.toggleShape = function (that, d, i) {                                                         // 5348
        var $$ = this, d3 = $$.d3, config = $$.config,                                                                 // 5349
            shape = d3.select(that), isSelected = shape.classed(CLASS.SELECTED),                                       // 5350
            toggle = $$.getToggle(that, d).bind($$);                                                                   // 5351
                                                                                                                       // 5352
        if (config.data_selection_enabled && config.data_selection_isselectable(d)) {                                  // 5353
            if (!config.data_selection_multiple) {                                                                     // 5354
                $$.main.selectAll('.' + CLASS.shapes + (config.data_selection_grouped ? $$.getTargetSelectorSuffix(d.id) : "")).selectAll('.' + CLASS.shape).each(function (d, i) {
                    var shape = d3.select(this);                                                                       // 5356
                    if (shape.classed(CLASS.SELECTED)) { toggle(false, shape.classed(CLASS.SELECTED, false), d, i); }  // 5357
                });                                                                                                    // 5358
            }                                                                                                          // 5359
            shape.classed(CLASS.SELECTED, !isSelected);                                                                // 5360
            toggle(!isSelected, shape, d, i);                                                                          // 5361
        }                                                                                                              // 5362
    };                                                                                                                 // 5363
                                                                                                                       // 5364
    c3_chart_internal_fn.initBrush = function () {                                                                     // 5365
        var $$ = this, d3 = $$.d3;                                                                                     // 5366
        $$.brush = d3.svg.brush().on("brush", function () { $$.redrawForBrush(); });                                   // 5367
        $$.brush.update = function () {                                                                                // 5368
            if ($$.context) { $$.context.select('.' + CLASS.brush).call(this); }                                       // 5369
            return this;                                                                                               // 5370
        };                                                                                                             // 5371
        $$.brush.scale = function (scale) {                                                                            // 5372
            return $$.config.axis_rotated ? this.y(scale) : this.x(scale);                                             // 5373
        };                                                                                                             // 5374
    };                                                                                                                 // 5375
    c3_chart_internal_fn.initSubchart = function () {                                                                  // 5376
        var $$ = this, config = $$.config,                                                                             // 5377
            context = $$.context = $$.svg.append("g").attr("transform", $$.getTranslate('context'));                   // 5378
                                                                                                                       // 5379
        context.style('visibility', config.subchart_show ? 'visible' : 'hidden');                                      // 5380
                                                                                                                       // 5381
        // Define g for chart area                                                                                     // 5382
        context.append('g')                                                                                            // 5383
            .attr("clip-path", $$.clipPathForSubchart)                                                                 // 5384
            .attr('class', CLASS.chart);                                                                               // 5385
                                                                                                                       // 5386
        // Define g for bar chart area                                                                                 // 5387
        context.select('.' + CLASS.chart).append("g")                                                                  // 5388
            .attr("class", CLASS.chartBars);                                                                           // 5389
                                                                                                                       // 5390
        // Define g for line chart area                                                                                // 5391
        context.select('.' + CLASS.chart).append("g")                                                                  // 5392
            .attr("class", CLASS.chartLines);                                                                          // 5393
                                                                                                                       // 5394
        // Add extent rect for Brush                                                                                   // 5395
        context.append("g")                                                                                            // 5396
            .attr("clip-path", $$.clipPath)                                                                            // 5397
            .attr("class", CLASS.brush)                                                                                // 5398
            .call($$.brush);                                                                                           // 5399
                                                                                                                       // 5400
        // ATTENTION: This must be called AFTER chart added                                                            // 5401
        // Add Axis                                                                                                    // 5402
        $$.axes.subx = context.append("g")                                                                             // 5403
            .attr("class", CLASS.axisX)                                                                                // 5404
            .attr("transform", $$.getTranslate('subx'))                                                                // 5405
            .attr("clip-path", config.axis_rotated ? "" : $$.clipPathForXAxis)                                         // 5406
            .style("visibility", config.subchart_axis_x_show ? 'visible' : 'hidden');                                  // 5407
    };                                                                                                                 // 5408
    c3_chart_internal_fn.updateTargetsForSubchart = function (targets) {                                               // 5409
        var $$ = this, context = $$.context, config = $$.config,                                                       // 5410
            contextLineEnter, contextLineUpdate, contextBarEnter, contextBarUpdate,                                    // 5411
            classChartBar = $$.classChartBar.bind($$),                                                                 // 5412
            classBars = $$.classBars.bind($$),                                                                         // 5413
            classChartLine = $$.classChartLine.bind($$),                                                               // 5414
            classLines = $$.classLines.bind($$),                                                                       // 5415
            classAreas = $$.classAreas.bind($$);                                                                       // 5416
                                                                                                                       // 5417
        if (config.subchart_show) {                                                                                    // 5418
            //-- Bar --//                                                                                              // 5419
            contextBarUpdate = context.select('.' + CLASS.chartBars).selectAll('.' + CLASS.chartBar)                   // 5420
                .data(targets)                                                                                         // 5421
                .attr('class', classChartBar);                                                                         // 5422
            contextBarEnter = contextBarUpdate.enter().append('g')                                                     // 5423
                .style('opacity', 0)                                                                                   // 5424
                .attr('class', classChartBar);                                                                         // 5425
            // Bars for each data                                                                                      // 5426
            contextBarEnter.append('g')                                                                                // 5427
                .attr("class", classBars);                                                                             // 5428
                                                                                                                       // 5429
            //-- Line --//                                                                                             // 5430
            contextLineUpdate = context.select('.' + CLASS.chartLines).selectAll('.' + CLASS.chartLine)                // 5431
                .data(targets)                                                                                         // 5432
                .attr('class', classChartLine);                                                                        // 5433
            contextLineEnter = contextLineUpdate.enter().append('g')                                                   // 5434
                .style('opacity', 0)                                                                                   // 5435
                .attr('class', classChartLine);                                                                        // 5436
            // Lines for each data                                                                                     // 5437
            contextLineEnter.append("g")                                                                               // 5438
                .attr("class", classLines);                                                                            // 5439
            // Area                                                                                                    // 5440
            contextLineEnter.append("g")                                                                               // 5441
                .attr("class", classAreas);                                                                            // 5442
                                                                                                                       // 5443
            //-- Brush --//                                                                                            // 5444
            context.selectAll('.' + CLASS.brush + ' rect')                                                             // 5445
                .attr(config.axis_rotated ? "width" : "height", config.axis_rotated ? $$.width2 : $$.height2);         // 5446
        }                                                                                                              // 5447
    };                                                                                                                 // 5448
    c3_chart_internal_fn.updateBarForSubchart = function (durationForExit) {                                           // 5449
        var $$ = this;                                                                                                 // 5450
        $$.contextBar = $$.context.selectAll('.' + CLASS.bars).selectAll('.' + CLASS.bar)                              // 5451
            .data($$.barData.bind($$));                                                                                // 5452
        $$.contextBar.enter().append('path')                                                                           // 5453
            .attr("class", $$.classBar.bind($$))                                                                       // 5454
            .style("stroke", 'none')                                                                                   // 5455
            .style("fill", $$.color);                                                                                  // 5456
        $$.contextBar                                                                                                  // 5457
            .style("opacity", $$.initialOpacity.bind($$));                                                             // 5458
        $$.contextBar.exit().transition().duration(durationForExit)                                                    // 5459
            .style('opacity', 0)                                                                                       // 5460
            .remove();                                                                                                 // 5461
    };                                                                                                                 // 5462
    c3_chart_internal_fn.redrawBarForSubchart = function (drawBarOnSub, withTransition, duration) {                    // 5463
        (withTransition ? this.contextBar.transition().duration(duration) : this.contextBar)                           // 5464
            .attr('d', drawBarOnSub)                                                                                   // 5465
            .style('opacity', 1);                                                                                      // 5466
    };                                                                                                                 // 5467
    c3_chart_internal_fn.updateLineForSubchart = function (durationForExit) {                                          // 5468
        var $$ = this;                                                                                                 // 5469
        $$.contextLine = $$.context.selectAll('.' + CLASS.lines).selectAll('.' + CLASS.line)                           // 5470
            .data($$.lineData.bind($$));                                                                               // 5471
        $$.contextLine.enter().append('path')                                                                          // 5472
            .attr('class', $$.classLine.bind($$))                                                                      // 5473
            .style('stroke', $$.color);                                                                                // 5474
        $$.contextLine                                                                                                 // 5475
            .style("opacity", $$.initialOpacity.bind($$));                                                             // 5476
        $$.contextLine.exit().transition().duration(durationForExit)                                                   // 5477
            .style('opacity', 0)                                                                                       // 5478
            .remove();                                                                                                 // 5479
    };                                                                                                                 // 5480
    c3_chart_internal_fn.redrawLineForSubchart = function (drawLineOnSub, withTransition, duration) {                  // 5481
        (withTransition ? this.contextLine.transition().duration(duration) : this.contextLine)                         // 5482
            .attr("d", drawLineOnSub)                                                                                  // 5483
            .style('opacity', 1);                                                                                      // 5484
    };                                                                                                                 // 5485
    c3_chart_internal_fn.updateAreaForSubchart = function (durationForExit) {                                          // 5486
        var $$ = this, d3 = $$.d3;                                                                                     // 5487
        $$.contextArea = $$.context.selectAll('.' + CLASS.areas).selectAll('.' + CLASS.area)                           // 5488
            .data($$.lineData.bind($$));                                                                               // 5489
        $$.contextArea.enter().append('path')                                                                          // 5490
            .attr("class", $$.classArea.bind($$))                                                                      // 5491
            .style("fill", $$.color)                                                                                   // 5492
            .style("opacity", function () { $$.orgAreaOpacity = +d3.select(this).style('opacity'); return 0; });       // 5493
        $$.contextArea                                                                                                 // 5494
            .style("opacity", 0);                                                                                      // 5495
        $$.contextArea.exit().transition().duration(durationForExit)                                                   // 5496
            .style('opacity', 0)                                                                                       // 5497
            .remove();                                                                                                 // 5498
    };                                                                                                                 // 5499
    c3_chart_internal_fn.redrawAreaForSubchart = function (drawAreaOnSub, withTransition, duration) {                  // 5500
        (withTransition ? this.contextArea.transition().duration(duration) : this.contextArea)                         // 5501
            .attr("d", drawAreaOnSub)                                                                                  // 5502
            .style("fill", this.color)                                                                                 // 5503
            .style("opacity", this.orgAreaOpacity);                                                                    // 5504
    };                                                                                                                 // 5505
    c3_chart_internal_fn.redrawSubchart = function (withSubchart, transitions, duration, durationForExit, areaIndices, barIndices, lineIndices) {
        var $$ = this, d3 = $$.d3, config = $$.config,                                                                 // 5507
            drawAreaOnSub, drawBarOnSub, drawLineOnSub;                                                                // 5508
                                                                                                                       // 5509
        $$.context.style('visibility', config.subchart_show ? 'visible' : 'hidden');                                   // 5510
                                                                                                                       // 5511
        // subchart                                                                                                    // 5512
        if (config.subchart_show) {                                                                                    // 5513
            // reflect main chart to extent on subchart if zoomed                                                      // 5514
            if (d3.event && d3.event.type === 'zoom') {                                                                // 5515
                $$.brush.extent($$.x.orgDomain()).update();                                                            // 5516
            }                                                                                                          // 5517
            // update subchart elements if needed                                                                      // 5518
            if (withSubchart) {                                                                                        // 5519
                                                                                                                       // 5520
                // extent rect                                                                                         // 5521
                if (!$$.brush.empty()) {                                                                               // 5522
                    $$.brush.extent($$.x.orgDomain()).update();                                                        // 5523
                }                                                                                                      // 5524
                // setup drawer - MEMO: this must be called after axis updated                                         // 5525
                drawAreaOnSub = $$.generateDrawArea(areaIndices, true);                                                // 5526
                drawBarOnSub = $$.generateDrawBar(barIndices, true);                                                   // 5527
                drawLineOnSub = $$.generateDrawLine(lineIndices, true);                                                // 5528
                                                                                                                       // 5529
                $$.updateBarForSubchart(duration);                                                                     // 5530
                $$.updateLineForSubchart(duration);                                                                    // 5531
                $$.updateAreaForSubchart(duration);                                                                    // 5532
                                                                                                                       // 5533
                $$.redrawBarForSubchart(drawBarOnSub, duration, duration);                                             // 5534
                $$.redrawLineForSubchart(drawLineOnSub, duration, duration);                                           // 5535
                $$.redrawAreaForSubchart(drawAreaOnSub, duration, duration);                                           // 5536
            }                                                                                                          // 5537
        }                                                                                                              // 5538
    };                                                                                                                 // 5539
    c3_chart_internal_fn.redrawForBrush = function () {                                                                // 5540
        var $$ = this, x = $$.x;                                                                                       // 5541
        $$.redraw({                                                                                                    // 5542
            withTransition: false,                                                                                     // 5543
            withY: $$.config.zoom_rescale,                                                                             // 5544
            withSubchart: false,                                                                                       // 5545
            withUpdateXDomain: true,                                                                                   // 5546
            withDimension: false                                                                                       // 5547
        });                                                                                                            // 5548
        $$.config.subchart_onbrush.call($$.api, x.orgDomain());                                                        // 5549
    };                                                                                                                 // 5550
    c3_chart_internal_fn.transformContext = function (withTransition, transitions) {                                   // 5551
        var $$ = this, subXAxis;                                                                                       // 5552
        if (transitions && transitions.axisSubX) {                                                                     // 5553
            subXAxis = transitions.axisSubX;                                                                           // 5554
        } else {                                                                                                       // 5555
            subXAxis = $$.context.select('.' + CLASS.axisX);                                                           // 5556
            if (withTransition) { subXAxis = subXAxis.transition(); }                                                  // 5557
        }                                                                                                              // 5558
        $$.context.attr("transform", $$.getTranslate('context'));                                                      // 5559
        subXAxis.attr("transform", $$.getTranslate('subx'));                                                           // 5560
    };                                                                                                                 // 5561
    c3_chart_internal_fn.getDefaultExtent = function () {                                                              // 5562
        var $$ = this, config = $$.config,                                                                             // 5563
            extent = isFunction(config.axis_x_extent) ? config.axis_x_extent($$.getXDomain($$.data.targets)) : config.axis_x_extent;
        if ($$.isTimeSeries()) {                                                                                       // 5565
            extent = [$$.parseDate(extent[0]), $$.parseDate(extent[1])];                                               // 5566
        }                                                                                                              // 5567
        return extent;                                                                                                 // 5568
    };                                                                                                                 // 5569
                                                                                                                       // 5570
    c3_chart_internal_fn.initZoom = function () {                                                                      // 5571
        var $$ = this, d3 = $$.d3, config = $$.config, startEvent;                                                     // 5572
                                                                                                                       // 5573
        $$.zoom = d3.behavior.zoom()                                                                                   // 5574
            .on("zoomstart", function () {                                                                             // 5575
                startEvent = d3.event.sourceEvent;                                                                     // 5576
                $$.zoom.altDomain = d3.event.sourceEvent.altKey ? $$.x.orgDomain() : null;                             // 5577
                config.zoom_onzoomstart.call($$.api, d3.event.sourceEvent);                                            // 5578
            })                                                                                                         // 5579
            .on("zoom", function () {                                                                                  // 5580
                $$.redrawForZoom.call($$);                                                                             // 5581
            })                                                                                                         // 5582
            .on('zoomend', function () {                                                                               // 5583
                var event = d3.event.sourceEvent;                                                                      // 5584
                // if click, do nothing. otherwise, click interaction will be canceled.                                // 5585
                if (event && startEvent.clientX === event.clientX && startEvent.clientY === event.clientY) {           // 5586
                    return;                                                                                            // 5587
                }                                                                                                      // 5588
                $$.redrawEventRect();                                                                                  // 5589
                $$.updateZoom();                                                                                       // 5590
                config.zoom_onzoomend.call($$.api, $$.x.orgDomain());                                                  // 5591
            });                                                                                                        // 5592
        $$.zoom.scale = function (scale) {                                                                             // 5593
            return config.axis_rotated ? this.y(scale) : this.x(scale);                                                // 5594
        };                                                                                                             // 5595
        $$.zoom.orgScaleExtent = function () {                                                                         // 5596
            var extent = config.zoom_extent ? config.zoom_extent : [1, 10];                                            // 5597
            return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];                                 // 5598
        };                                                                                                             // 5599
        $$.zoom.updateScaleExtent = function () {                                                                      // 5600
            var ratio = diffDomain($$.x.orgDomain()) / diffDomain($$.getZoomDomain()),                                 // 5601
                extent = this.orgScaleExtent();                                                                        // 5602
            this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);                                                  // 5603
            return this;                                                                                               // 5604
        };                                                                                                             // 5605
    };                                                                                                                 // 5606
    c3_chart_internal_fn.getZoomDomain = function () {                                                                 // 5607
        var $$ = this, config = $$.config, d3 = $$.d3,                                                                 // 5608
            min = d3.min([$$.orgXDomain[0], config.zoom_x_min]),                                                       // 5609
            max = d3.max([$$.orgXDomain[1], config.zoom_x_max]);                                                       // 5610
        return [min, max];                                                                                             // 5611
    };                                                                                                                 // 5612
    c3_chart_internal_fn.updateZoom = function () {                                                                    // 5613
        var $$ = this, z = $$.config.zoom_enabled ? $$.zoom : function () {};                                          // 5614
        $$.main.select('.' + CLASS.zoomRect).call(z).on("dblclick.zoom", null);                                        // 5615
        $$.main.selectAll('.' + CLASS.eventRect).call(z).on("dblclick.zoom", null);                                    // 5616
    };                                                                                                                 // 5617
    c3_chart_internal_fn.redrawForZoom = function () {                                                                 // 5618
        var $$ = this, d3 = $$.d3, config = $$.config, zoom = $$.zoom, x = $$.x;                                       // 5619
        if (!config.zoom_enabled) {                                                                                    // 5620
            return;                                                                                                    // 5621
        }                                                                                                              // 5622
        if ($$.filterTargetsToShow($$.data.targets).length === 0) {                                                    // 5623
            return;                                                                                                    // 5624
        }                                                                                                              // 5625
        if (d3.event.sourceEvent.type === 'mousemove' && zoom.altDomain) {                                             // 5626
            x.domain(zoom.altDomain);                                                                                  // 5627
            zoom.scale(x).updateScaleExtent();                                                                         // 5628
            return;                                                                                                    // 5629
        }                                                                                                              // 5630
        if ($$.isCategorized() && x.orgDomain()[0] === $$.orgXDomain[0]) {                                             // 5631
            x.domain([$$.orgXDomain[0] - 1e-10, x.orgDomain()[1]]);                                                    // 5632
        }                                                                                                              // 5633
        $$.redraw({                                                                                                    // 5634
            withTransition: false,                                                                                     // 5635
            withY: config.zoom_rescale,                                                                                // 5636
            withSubchart: false,                                                                                       // 5637
            withEventRect: false,                                                                                      // 5638
            withDimension: false                                                                                       // 5639
        });                                                                                                            // 5640
        if (d3.event.sourceEvent.type === 'mousemove') {                                                               // 5641
            $$.cancelClick = true;                                                                                     // 5642
        }                                                                                                              // 5643
        config.zoom_onzoom.call($$.api, x.orgDomain());                                                                // 5644
    };                                                                                                                 // 5645
                                                                                                                       // 5646
    c3_chart_internal_fn.generateColor = function () {                                                                 // 5647
        var $$ = this, config = $$.config, d3 = $$.d3,                                                                 // 5648
            colors = config.data_colors,                                                                               // 5649
            pattern = notEmpty(config.color_pattern) ? config.color_pattern : d3.scale.category10().range(),           // 5650
            callback = config.data_color,                                                                              // 5651
            ids = [];                                                                                                  // 5652
                                                                                                                       // 5653
        return function (d) {                                                                                          // 5654
            var id = d.id || (d.data && d.data.id) || d, color;                                                        // 5655
                                                                                                                       // 5656
            // if callback function is provided                                                                        // 5657
            if (colors[id] instanceof Function) {                                                                      // 5658
                color = colors[id](d);                                                                                 // 5659
            }                                                                                                          // 5660
            // if specified, choose that color                                                                         // 5661
            else if (colors[id]) {                                                                                     // 5662
                color = colors[id];                                                                                    // 5663
            }                                                                                                          // 5664
            // if not specified, choose from pattern                                                                   // 5665
            else {                                                                                                     // 5666
                if (ids.indexOf(id) < 0) { ids.push(id); }                                                             // 5667
                color = pattern[ids.indexOf(id) % pattern.length];                                                     // 5668
                colors[id] = color;                                                                                    // 5669
            }                                                                                                          // 5670
            return callback instanceof Function ? callback(color, d) : color;                                          // 5671
        };                                                                                                             // 5672
    };                                                                                                                 // 5673
    c3_chart_internal_fn.generateLevelColor = function () {                                                            // 5674
        var $$ = this, config = $$.config,                                                                             // 5675
            colors = config.color_pattern,                                                                             // 5676
            threshold = config.color_threshold,                                                                        // 5677
            asValue = threshold.unit === 'value',                                                                      // 5678
            values = threshold.values && threshold.values.length ? threshold.values : [],                              // 5679
            max = threshold.max || 100;                                                                                // 5680
        return notEmpty(config.color_threshold) ? function (value) {                                                   // 5681
            var i, v, color = colors[colors.length - 1];                                                               // 5682
            for (i = 0; i < values.length; i++) {                                                                      // 5683
                v = asValue ? value : (value * 100 / max);                                                             // 5684
                if (v < values[i]) {                                                                                   // 5685
                    color = colors[i];                                                                                 // 5686
                    break;                                                                                             // 5687
                }                                                                                                      // 5688
            }                                                                                                          // 5689
            return color;                                                                                              // 5690
        } : null;                                                                                                      // 5691
    };                                                                                                                 // 5692
                                                                                                                       // 5693
    c3_chart_internal_fn.getYFormat = function (forArc) {                                                              // 5694
        var $$ = this,                                                                                                 // 5695
            formatForY = forArc && !$$.hasType('gauge') ? $$.defaultArcValueFormat : $$.yFormat,                       // 5696
            formatForY2 = forArc && !$$.hasType('gauge') ? $$.defaultArcValueFormat : $$.y2Format;                     // 5697
        return function (v, ratio, id) {                                                                               // 5698
            var format = $$.axis.getId(id) === 'y2' ? formatForY2 : formatForY;                                        // 5699
            return format.call($$, v, ratio);                                                                          // 5700
        };                                                                                                             // 5701
    };                                                                                                                 // 5702
    c3_chart_internal_fn.yFormat = function (v) {                                                                      // 5703
        var $$ = this, config = $$.config,                                                                             // 5704
            format = config.axis_y_tick_format ? config.axis_y_tick_format : $$.defaultValueFormat;                    // 5705
        return format(v);                                                                                              // 5706
    };                                                                                                                 // 5707
    c3_chart_internal_fn.y2Format = function (v) {                                                                     // 5708
        var $$ = this, config = $$.config,                                                                             // 5709
            format = config.axis_y2_tick_format ? config.axis_y2_tick_format : $$.defaultValueFormat;                  // 5710
        return format(v);                                                                                              // 5711
    };                                                                                                                 // 5712
    c3_chart_internal_fn.defaultValueFormat = function (v) {                                                           // 5713
        return isValue(v) ? +v : "";                                                                                   // 5714
    };                                                                                                                 // 5715
    c3_chart_internal_fn.defaultArcValueFormat = function (v, ratio) {                                                 // 5716
        return (ratio * 100).toFixed(1) + '%';                                                                         // 5717
    };                                                                                                                 // 5718
    c3_chart_internal_fn.dataLabelFormat = function (targetId) {                                                       // 5719
        var $$ = this, data_labels = $$.config.data_labels,                                                            // 5720
            format, defaultFormat = function (v) { return isValue(v) ? +v : ""; };                                     // 5721
        // find format according to axis id                                                                            // 5722
        if (typeof data_labels.format === 'function') {                                                                // 5723
            format = data_labels.format;                                                                               // 5724
        } else if (typeof data_labels.format === 'object') {                                                           // 5725
            if (data_labels.format[targetId]) {                                                                        // 5726
                format = data_labels.format[targetId] === true ? defaultFormat : data_labels.format[targetId];         // 5727
            } else {                                                                                                   // 5728
                format = function () { return ''; };                                                                   // 5729
            }                                                                                                          // 5730
        } else {                                                                                                       // 5731
            format = defaultFormat;                                                                                    // 5732
        }                                                                                                              // 5733
        return format;                                                                                                 // 5734
    };                                                                                                                 // 5735
                                                                                                                       // 5736
    c3_chart_internal_fn.hasCaches = function (ids) {                                                                  // 5737
        for (var i = 0; i < ids.length; i++) {                                                                         // 5738
            if (! (ids[i] in this.cache)) { return false; }                                                            // 5739
        }                                                                                                              // 5740
        return true;                                                                                                   // 5741
    };                                                                                                                 // 5742
    c3_chart_internal_fn.addCache = function (id, target) {                                                            // 5743
        this.cache[id] = this.cloneTarget(target);                                                                     // 5744
    };                                                                                                                 // 5745
    c3_chart_internal_fn.getCaches = function (ids) {                                                                  // 5746
        var targets = [], i;                                                                                           // 5747
        for (i = 0; i < ids.length; i++) {                                                                             // 5748
            if (ids[i] in this.cache) { targets.push(this.cloneTarget(this.cache[ids[i]])); }                          // 5749
        }                                                                                                              // 5750
        return targets;                                                                                                // 5751
    };                                                                                                                 // 5752
                                                                                                                       // 5753
    var CLASS = c3_chart_internal_fn.CLASS = {                                                                         // 5754
        target: 'c3-target',                                                                                           // 5755
        chart: 'c3-chart',                                                                                             // 5756
        chartLine: 'c3-chart-line',                                                                                    // 5757
        chartLines: 'c3-chart-lines',                                                                                  // 5758
        chartBar: 'c3-chart-bar',                                                                                      // 5759
        chartBars: 'c3-chart-bars',                                                                                    // 5760
        chartText: 'c3-chart-text',                                                                                    // 5761
        chartTexts: 'c3-chart-texts',                                                                                  // 5762
        chartArc: 'c3-chart-arc',                                                                                      // 5763
        chartArcs: 'c3-chart-arcs',                                                                                    // 5764
        chartArcsTitle: 'c3-chart-arcs-title',                                                                         // 5765
        chartArcsBackground: 'c3-chart-arcs-background',                                                               // 5766
        chartArcsGaugeUnit: 'c3-chart-arcs-gauge-unit',                                                                // 5767
        chartArcsGaugeMax: 'c3-chart-arcs-gauge-max',                                                                  // 5768
        chartArcsGaugeMin: 'c3-chart-arcs-gauge-min',                                                                  // 5769
        selectedCircle: 'c3-selected-circle',                                                                          // 5770
        selectedCircles: 'c3-selected-circles',                                                                        // 5771
        eventRect: 'c3-event-rect',                                                                                    // 5772
        eventRects: 'c3-event-rects',                                                                                  // 5773
        eventRectsSingle: 'c3-event-rects-single',                                                                     // 5774
        eventRectsMultiple: 'c3-event-rects-multiple',                                                                 // 5775
        zoomRect: 'c3-zoom-rect',                                                                                      // 5776
        brush: 'c3-brush',                                                                                             // 5777
        focused: 'c3-focused',                                                                                         // 5778
        defocused: 'c3-defocused',                                                                                     // 5779
        region: 'c3-region',                                                                                           // 5780
        regions: 'c3-regions',                                                                                         // 5781
        title: 'c3-title',                                                                                             // 5782
        tooltipContainer: 'c3-tooltip-container',                                                                      // 5783
        tooltip: 'c3-tooltip',                                                                                         // 5784
        tooltipName: 'c3-tooltip-name',                                                                                // 5785
        shape: 'c3-shape',                                                                                             // 5786
        shapes: 'c3-shapes',                                                                                           // 5787
        line: 'c3-line',                                                                                               // 5788
        lines: 'c3-lines',                                                                                             // 5789
        bar: 'c3-bar',                                                                                                 // 5790
        bars: 'c3-bars',                                                                                               // 5791
        circle: 'c3-circle',                                                                                           // 5792
        circles: 'c3-circles',                                                                                         // 5793
        arc: 'c3-arc',                                                                                                 // 5794
        arcs: 'c3-arcs',                                                                                               // 5795
        area: 'c3-area',                                                                                               // 5796
        areas: 'c3-areas',                                                                                             // 5797
        empty: 'c3-empty',                                                                                             // 5798
        text: 'c3-text',                                                                                               // 5799
        texts: 'c3-texts',                                                                                             // 5800
        gaugeValue: 'c3-gauge-value',                                                                                  // 5801
        grid: 'c3-grid',                                                                                               // 5802
        gridLines: 'c3-grid-lines',                                                                                    // 5803
        xgrid: 'c3-xgrid',                                                                                             // 5804
        xgrids: 'c3-xgrids',                                                                                           // 5805
        xgridLine: 'c3-xgrid-line',                                                                                    // 5806
        xgridLines: 'c3-xgrid-lines',                                                                                  // 5807
        xgridFocus: 'c3-xgrid-focus',                                                                                  // 5808
        ygrid: 'c3-ygrid',                                                                                             // 5809
        ygrids: 'c3-ygrids',                                                                                           // 5810
        ygridLine: 'c3-ygrid-line',                                                                                    // 5811
        ygridLines: 'c3-ygrid-lines',                                                                                  // 5812
        axis: 'c3-axis',                                                                                               // 5813
        axisX: 'c3-axis-x',                                                                                            // 5814
        axisXLabel: 'c3-axis-x-label',                                                                                 // 5815
        axisY: 'c3-axis-y',                                                                                            // 5816
        axisYLabel: 'c3-axis-y-label',                                                                                 // 5817
        axisY2: 'c3-axis-y2',                                                                                          // 5818
        axisY2Label: 'c3-axis-y2-label',                                                                               // 5819
        legendBackground: 'c3-legend-background',                                                                      // 5820
        legendItem: 'c3-legend-item',                                                                                  // 5821
        legendItemEvent: 'c3-legend-item-event',                                                                       // 5822
        legendItemTile: 'c3-legend-item-tile',                                                                         // 5823
        legendItemHidden: 'c3-legend-item-hidden',                                                                     // 5824
        legendItemFocused: 'c3-legend-item-focused',                                                                   // 5825
        dragarea: 'c3-dragarea',                                                                                       // 5826
        EXPANDED: '_expanded_',                                                                                        // 5827
        SELECTED: '_selected_',                                                                                        // 5828
        INCLUDED: '_included_'                                                                                         // 5829
    };                                                                                                                 // 5830
    c3_chart_internal_fn.generateClass = function (prefix, targetId) {                                                 // 5831
        return " " + prefix + " " + prefix + this.getTargetSelectorSuffix(targetId);                                   // 5832
    };                                                                                                                 // 5833
    c3_chart_internal_fn.classText = function (d) {                                                                    // 5834
        return this.generateClass(CLASS.text, d.index);                                                                // 5835
    };                                                                                                                 // 5836
    c3_chart_internal_fn.classTexts = function (d) {                                                                   // 5837
        return this.generateClass(CLASS.texts, d.id);                                                                  // 5838
    };                                                                                                                 // 5839
    c3_chart_internal_fn.classShape = function (d) {                                                                   // 5840
        return this.generateClass(CLASS.shape, d.index);                                                               // 5841
    };                                                                                                                 // 5842
    c3_chart_internal_fn.classShapes = function (d) {                                                                  // 5843
        return this.generateClass(CLASS.shapes, d.id);                                                                 // 5844
    };                                                                                                                 // 5845
    c3_chart_internal_fn.classLine = function (d) {                                                                    // 5846
        return this.classShape(d) + this.generateClass(CLASS.line, d.id);                                              // 5847
    };                                                                                                                 // 5848
    c3_chart_internal_fn.classLines = function (d) {                                                                   // 5849
        return this.classShapes(d) + this.generateClass(CLASS.lines, d.id);                                            // 5850
    };                                                                                                                 // 5851
    c3_chart_internal_fn.classCircle = function (d) {                                                                  // 5852
        return this.classShape(d) + this.generateClass(CLASS.circle, d.index);                                         // 5853
    };                                                                                                                 // 5854
    c3_chart_internal_fn.classCircles = function (d) {                                                                 // 5855
        return this.classShapes(d) + this.generateClass(CLASS.circles, d.id);                                          // 5856
    };                                                                                                                 // 5857
    c3_chart_internal_fn.classBar = function (d) {                                                                     // 5858
        return this.classShape(d) + this.generateClass(CLASS.bar, d.index);                                            // 5859
    };                                                                                                                 // 5860
    c3_chart_internal_fn.classBars = function (d) {                                                                    // 5861
        return this.classShapes(d) + this.generateClass(CLASS.bars, d.id);                                             // 5862
    };                                                                                                                 // 5863
    c3_chart_internal_fn.classArc = function (d) {                                                                     // 5864
        return this.classShape(d.data) + this.generateClass(CLASS.arc, d.data.id);                                     // 5865
    };                                                                                                                 // 5866
    c3_chart_internal_fn.classArcs = function (d) {                                                                    // 5867
        return this.classShapes(d.data) + this.generateClass(CLASS.arcs, d.data.id);                                   // 5868
    };                                                                                                                 // 5869
    c3_chart_internal_fn.classArea = function (d) {                                                                    // 5870
        return this.classShape(d) + this.generateClass(CLASS.area, d.id);                                              // 5871
    };                                                                                                                 // 5872
    c3_chart_internal_fn.classAreas = function (d) {                                                                   // 5873
        return this.classShapes(d) + this.generateClass(CLASS.areas, d.id);                                            // 5874
    };                                                                                                                 // 5875
    c3_chart_internal_fn.classRegion = function (d, i) {                                                               // 5876
        return this.generateClass(CLASS.region, i) + ' ' + ('class' in d ? d['class'] : '');                           // 5877
    };                                                                                                                 // 5878
    c3_chart_internal_fn.classEvent = function (d) {                                                                   // 5879
        return this.generateClass(CLASS.eventRect, d.index);                                                           // 5880
    };                                                                                                                 // 5881
    c3_chart_internal_fn.classTarget = function (id) {                                                                 // 5882
        var $$ = this;                                                                                                 // 5883
        var additionalClassSuffix = $$.config.data_classes[id], additionalClass = '';                                  // 5884
        if (additionalClassSuffix) {                                                                                   // 5885
            additionalClass = ' ' + CLASS.target + '-' + additionalClassSuffix;                                        // 5886
        }                                                                                                              // 5887
        return $$.generateClass(CLASS.target, id) + additionalClass;                                                   // 5888
    };                                                                                                                 // 5889
    c3_chart_internal_fn.classFocus = function (d) {                                                                   // 5890
        return this.classFocused(d) + this.classDefocused(d);                                                          // 5891
    };                                                                                                                 // 5892
    c3_chart_internal_fn.classFocused = function (d) {                                                                 // 5893
        return ' ' + (this.focusedTargetIds.indexOf(d.id) >= 0 ? CLASS.focused : '');                                  // 5894
    };                                                                                                                 // 5895
    c3_chart_internal_fn.classDefocused = function (d) {                                                               // 5896
        return ' ' + (this.defocusedTargetIds.indexOf(d.id) >= 0 ? CLASS.defocused : '');                              // 5897
    };                                                                                                                 // 5898
    c3_chart_internal_fn.classChartText = function (d) {                                                               // 5899
        return CLASS.chartText + this.classTarget(d.id);                                                               // 5900
    };                                                                                                                 // 5901
    c3_chart_internal_fn.classChartLine = function (d) {                                                               // 5902
        return CLASS.chartLine + this.classTarget(d.id);                                                               // 5903
    };                                                                                                                 // 5904
    c3_chart_internal_fn.classChartBar = function (d) {                                                                // 5905
        return CLASS.chartBar + this.classTarget(d.id);                                                                // 5906
    };                                                                                                                 // 5907
    c3_chart_internal_fn.classChartArc = function (d) {                                                                // 5908
        return CLASS.chartArc + this.classTarget(d.data.id);                                                           // 5909
    };                                                                                                                 // 5910
    c3_chart_internal_fn.getTargetSelectorSuffix = function (targetId) {                                               // 5911
        return targetId || targetId === 0 ? ('-' + targetId).replace(/[\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, '-') : '';
    };                                                                                                                 // 5913
    c3_chart_internal_fn.selectorTarget = function (id, prefix) {                                                      // 5914
        return (prefix || '') + '.' + CLASS.target + this.getTargetSelectorSuffix(id);                                 // 5915
    };                                                                                                                 // 5916
    c3_chart_internal_fn.selectorTargets = function (ids, prefix) {                                                    // 5917
        var $$ = this;                                                                                                 // 5918
        ids = ids || [];                                                                                               // 5919
        return ids.length ? ids.map(function (id) { return $$.selectorTarget(id, prefix); }) : null;                   // 5920
    };                                                                                                                 // 5921
    c3_chart_internal_fn.selectorLegend = function (id) {                                                              // 5922
        return '.' + CLASS.legendItem + this.getTargetSelectorSuffix(id);                                              // 5923
    };                                                                                                                 // 5924
    c3_chart_internal_fn.selectorLegends = function (ids) {                                                            // 5925
        var $$ = this;                                                                                                 // 5926
        return ids && ids.length ? ids.map(function (id) { return $$.selectorLegend(id); }) : null;                    // 5927
    };                                                                                                                 // 5928
                                                                                                                       // 5929
    var isValue = c3_chart_internal_fn.isValue = function (v) {                                                        // 5930
        return v || v === 0;                                                                                           // 5931
    },                                                                                                                 // 5932
        isFunction = c3_chart_internal_fn.isFunction = function (o) {                                                  // 5933
            return typeof o === 'function';                                                                            // 5934
        },                                                                                                             // 5935
        isString = c3_chart_internal_fn.isString = function (o) {                                                      // 5936
            return typeof o === 'string';                                                                              // 5937
        },                                                                                                             // 5938
        isUndefined = c3_chart_internal_fn.isUndefined = function (v) {                                                // 5939
            return typeof v === 'undefined';                                                                           // 5940
        },                                                                                                             // 5941
        isDefined = c3_chart_internal_fn.isDefined = function (v) {                                                    // 5942
            return typeof v !== 'undefined';                                                                           // 5943
        },                                                                                                             // 5944
        ceil10 = c3_chart_internal_fn.ceil10 = function (v) {                                                          // 5945
            return Math.ceil(v / 10) * 10;                                                                             // 5946
        },                                                                                                             // 5947
        asHalfPixel = c3_chart_internal_fn.asHalfPixel = function (n) {                                                // 5948
            return Math.ceil(n) + 0.5;                                                                                 // 5949
        },                                                                                                             // 5950
        diffDomain = c3_chart_internal_fn.diffDomain = function (d) {                                                  // 5951
            return d[1] - d[0];                                                                                        // 5952
        },                                                                                                             // 5953
        isEmpty = c3_chart_internal_fn.isEmpty = function (o) {                                                        // 5954
            return !o || (isString(o) && o.length === 0) || (typeof o === 'object' && Object.keys(o).length === 0);    // 5955
        },                                                                                                             // 5956
        notEmpty = c3_chart_internal_fn.notEmpty = function (o) {                                                      // 5957
            return Object.keys(o).length > 0;                                                                          // 5958
        },                                                                                                             // 5959
        getOption = c3_chart_internal_fn.getOption = function (options, key, defaultValue) {                           // 5960
            return isDefined(options[key]) ? options[key] : defaultValue;                                              // 5961
        },                                                                                                             // 5962
        hasValue = c3_chart_internal_fn.hasValue = function (dict, value) {                                            // 5963
            var found = false;                                                                                         // 5964
            Object.keys(dict).forEach(function (key) {                                                                 // 5965
                if (dict[key] === value) { found = true; }                                                             // 5966
            });                                                                                                        // 5967
            return found;                                                                                              // 5968
        },                                                                                                             // 5969
        getPathBox = c3_chart_internal_fn.getPathBox = function (path) {                                               // 5970
            var box = path.getBoundingClientRect(),                                                                    // 5971
                items = [path.pathSegList.getItem(0), path.pathSegList.getItem(1)],                                    // 5972
                minX = items[0].x, minY = Math.min(items[0].y, items[1].y);                                            // 5973
            return {x: minX, y: minY, width: box.width, height: box.height};                                           // 5974
        };                                                                                                             // 5975
                                                                                                                       // 5976
    c3_chart_fn.focus = function (targetIds) {                                                                         // 5977
        var $$ = this.internal, candidates;                                                                            // 5978
                                                                                                                       // 5979
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 5980
        candidates = $$.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))),                    // 5981
                                                                                                                       // 5982
        this.revert();                                                                                                 // 5983
        this.defocus();                                                                                                // 5984
        candidates.classed(CLASS.focused, true).classed(CLASS.defocused, false);                                       // 5985
        if ($$.hasArcType()) {                                                                                         // 5986
            $$.expandArc(targetIds);                                                                                   // 5987
        }                                                                                                              // 5988
        $$.toggleFocusLegend(targetIds, true);                                                                         // 5989
                                                                                                                       // 5990
        $$.focusedTargetIds = targetIds;                                                                               // 5991
        $$.defocusedTargetIds = $$.defocusedTargetIds.filter(function (id) {                                           // 5992
            return targetIds.indexOf(id) < 0;                                                                          // 5993
        });                                                                                                            // 5994
    };                                                                                                                 // 5995
                                                                                                                       // 5996
    c3_chart_fn.defocus = function (targetIds) {                                                                       // 5997
        var $$ = this.internal, candidates;                                                                            // 5998
                                                                                                                       // 5999
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 6000
        candidates = $$.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))),                    // 6001
                                                                                                                       // 6002
        candidates.classed(CLASS.focused, false).classed(CLASS.defocused, true);                                       // 6003
        if ($$.hasArcType()) {                                                                                         // 6004
            $$.unexpandArc(targetIds);                                                                                 // 6005
        }                                                                                                              // 6006
        $$.toggleFocusLegend(targetIds, false);                                                                        // 6007
                                                                                                                       // 6008
        $$.focusedTargetIds = $$.focusedTargetIds.filter(function (id) {                                               // 6009
            return targetIds.indexOf(id) < 0;                                                                          // 6010
        });                                                                                                            // 6011
        $$.defocusedTargetIds = targetIds;                                                                             // 6012
    };                                                                                                                 // 6013
                                                                                                                       // 6014
    c3_chart_fn.revert = function (targetIds) {                                                                        // 6015
        var $$ = this.internal, candidates;                                                                            // 6016
                                                                                                                       // 6017
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 6018
        candidates = $$.svg.selectAll($$.selectorTargets(targetIds)); // should be for all targets                     // 6019
                                                                                                                       // 6020
        candidates.classed(CLASS.focused, false).classed(CLASS.defocused, false);                                      // 6021
        if ($$.hasArcType()) {                                                                                         // 6022
            $$.unexpandArc(targetIds);                                                                                 // 6023
        }                                                                                                              // 6024
        if ($$.config.legend_show) {                                                                                   // 6025
            $$.showLegend(targetIds.filter($$.isLegendToShow.bind($$)));                                               // 6026
            $$.legend.selectAll($$.selectorLegends(targetIds))                                                         // 6027
                .filter(function () {                                                                                  // 6028
                    return $$.d3.select(this).classed(CLASS.legendItemFocused);                                        // 6029
                })                                                                                                     // 6030
                .classed(CLASS.legendItemFocused, false);                                                              // 6031
        }                                                                                                              // 6032
                                                                                                                       // 6033
        $$.focusedTargetIds = [];                                                                                      // 6034
        $$.defocusedTargetIds = [];                                                                                    // 6035
    };                                                                                                                 // 6036
                                                                                                                       // 6037
    c3_chart_fn.show = function (targetIds, options) {                                                                 // 6038
        var $$ = this.internal, targets;                                                                               // 6039
                                                                                                                       // 6040
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 6041
        options = options || {};                                                                                       // 6042
                                                                                                                       // 6043
        $$.removeHiddenTargetIds(targetIds);                                                                           // 6044
        targets = $$.svg.selectAll($$.selectorTargets(targetIds));                                                     // 6045
                                                                                                                       // 6046
        targets.transition()                                                                                           // 6047
            .style('opacity', 1, 'important')                                                                          // 6048
            .call($$.endall, function () {                                                                             // 6049
                targets.style('opacity', null).style('opacity', 1);                                                    // 6050
            });                                                                                                        // 6051
                                                                                                                       // 6052
        if (options.withLegend) {                                                                                      // 6053
            $$.showLegend(targetIds);                                                                                  // 6054
        }                                                                                                              // 6055
                                                                                                                       // 6056
        $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});                            // 6057
    };                                                                                                                 // 6058
                                                                                                                       // 6059
    c3_chart_fn.hide = function (targetIds, options) {                                                                 // 6060
        var $$ = this.internal, targets;                                                                               // 6061
                                                                                                                       // 6062
        targetIds = $$.mapToTargetIds(targetIds);                                                                      // 6063
        options = options || {};                                                                                       // 6064
                                                                                                                       // 6065
        $$.addHiddenTargetIds(targetIds);                                                                              // 6066
        targets = $$.svg.selectAll($$.selectorTargets(targetIds));                                                     // 6067
                                                                                                                       // 6068
        targets.transition()                                                                                           // 6069
            .style('opacity', 0, 'important')                                                                          // 6070
            .call($$.endall, function () {                                                                             // 6071
                targets.style('opacity', null).style('opacity', 0);                                                    // 6072
            });                                                                                                        // 6073
                                                                                                                       // 6074
        if (options.withLegend) {                                                                                      // 6075
            $$.hideLegend(targetIds);                                                                                  // 6076
        }                                                                                                              // 6077
                                                                                                                       // 6078
        $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});                            // 6079
    };                                                                                                                 // 6080
                                                                                                                       // 6081
    c3_chart_fn.toggle = function (targetIds, options) {                                                               // 6082
        var that = this, $$ = this.internal;                                                                           // 6083
        $$.mapToTargetIds(targetIds).forEach(function (targetId) {                                                     // 6084
            $$.isTargetToShow(targetId) ? that.hide(targetId, options) : that.show(targetId, options);                 // 6085
        });                                                                                                            // 6086
    };                                                                                                                 // 6087
                                                                                                                       // 6088
    c3_chart_fn.zoom = function (domain) {                                                                             // 6089
        var $$ = this.internal;                                                                                        // 6090
        if (domain) {                                                                                                  // 6091
            if ($$.isTimeSeries()) {                                                                                   // 6092
                domain = domain.map(function (x) { return $$.parseDate(x); });                                         // 6093
            }                                                                                                          // 6094
            $$.brush.extent(domain);                                                                                   // 6095
            $$.redraw({withUpdateXDomain: true, withY: $$.config.zoom_rescale});                                       // 6096
            $$.config.zoom_onzoom.call(this, $$.x.orgDomain());                                                        // 6097
        }                                                                                                              // 6098
        return $$.brush.extent();                                                                                      // 6099
    };                                                                                                                 // 6100
    c3_chart_fn.zoom.enable = function (enabled) {                                                                     // 6101
        var $$ = this.internal;                                                                                        // 6102
        $$.config.zoom_enabled = enabled;                                                                              // 6103
        $$.updateAndRedraw();                                                                                          // 6104
    };                                                                                                                 // 6105
    c3_chart_fn.unzoom = function () {                                                                                 // 6106
        var $$ = this.internal;                                                                                        // 6107
        $$.brush.clear().update();                                                                                     // 6108
        $$.redraw({withUpdateXDomain: true});                                                                          // 6109
    };                                                                                                                 // 6110
                                                                                                                       // 6111
    c3_chart_fn.zoom.max = function (max) {                                                                            // 6112
        var $$ = this.internal, config = $$.config, d3 = $$.d3;                                                        // 6113
        if (max === 0 || max) {                                                                                        // 6114
            config.zoom_x_max = d3.max([$$.orgXDomain[1], max]);                                                       // 6115
        }                                                                                                              // 6116
        else {                                                                                                         // 6117
            return config.zoom_x_max;                                                                                  // 6118
        }                                                                                                              // 6119
    };                                                                                                                 // 6120
                                                                                                                       // 6121
    c3_chart_fn.zoom.min = function (min) {                                                                            // 6122
        var $$ = this.internal, config = $$.config, d3 = $$.d3;                                                        // 6123
        if (min === 0 || min) {                                                                                        // 6124
            config.zoom_x_min = d3.min([$$.orgXDomain[0], min]);                                                       // 6125
        }                                                                                                              // 6126
        else {                                                                                                         // 6127
            return config.zoom_x_min;                                                                                  // 6128
        }                                                                                                              // 6129
    };                                                                                                                 // 6130
                                                                                                                       // 6131
    c3_chart_fn.zoom.range = function (range) {                                                                        // 6132
        if (arguments.length) {                                                                                        // 6133
            if (isDefined(range.max)) { this.domain.max(range.max); }                                                  // 6134
            if (isDefined(range.min)) { this.domain.min(range.min); }                                                  // 6135
        } else {                                                                                                       // 6136
            return {                                                                                                   // 6137
                max: this.domain.max(),                                                                                // 6138
                min: this.domain.min()                                                                                 // 6139
            };                                                                                                         // 6140
        }                                                                                                              // 6141
    };                                                                                                                 // 6142
                                                                                                                       // 6143
    c3_chart_fn.load = function (args) {                                                                               // 6144
        var $$ = this.internal, config = $$.config;                                                                    // 6145
        // update xs if specified                                                                                      // 6146
        if (args.xs) {                                                                                                 // 6147
            $$.addXs(args.xs);                                                                                         // 6148
        }                                                                                                              // 6149
        // update classes if exists                                                                                    // 6150
        if ('classes' in args) {                                                                                       // 6151
            Object.keys(args.classes).forEach(function (id) {                                                          // 6152
                config.data_classes[id] = args.classes[id];                                                            // 6153
            });                                                                                                        // 6154
        }                                                                                                              // 6155
        // update categories if exists                                                                                 // 6156
        if ('categories' in args && $$.isCategorized()) {                                                              // 6157
            config.axis_x_categories = args.categories;                                                                // 6158
        }                                                                                                              // 6159
        // update axes if exists                                                                                       // 6160
        if ('axes' in args) {                                                                                          // 6161
            Object.keys(args.axes).forEach(function (id) {                                                             // 6162
                config.data_axes[id] = args.axes[id];                                                                  // 6163
            });                                                                                                        // 6164
        }                                                                                                              // 6165
        // update colors if exists                                                                                     // 6166
        if ('colors' in args) {                                                                                        // 6167
            Object.keys(args.colors).forEach(function (id) {                                                           // 6168
                config.data_colors[id] = args.colors[id];                                                              // 6169
            });                                                                                                        // 6170
        }                                                                                                              // 6171
        // use cache if exists                                                                                         // 6172
        if ('cacheIds' in args && $$.hasCaches(args.cacheIds)) {                                                       // 6173
            $$.load($$.getCaches(args.cacheIds), args.done);                                                           // 6174
            return;                                                                                                    // 6175
        }                                                                                                              // 6176
        // unload if needed                                                                                            // 6177
        if ('unload' in args) {                                                                                        // 6178
            // TODO: do not unload if target will load (included in url/rows/columns)                                  // 6179
            $$.unload($$.mapToTargetIds((typeof args.unload === 'boolean' && args.unload) ? null : args.unload), function () {
                $$.loadFromArgs(args);                                                                                 // 6181
            });                                                                                                        // 6182
        } else {                                                                                                       // 6183
            $$.loadFromArgs(args);                                                                                     // 6184
        }                                                                                                              // 6185
    };                                                                                                                 // 6186
                                                                                                                       // 6187
    c3_chart_fn.unload = function (args) {                                                                             // 6188
        var $$ = this.internal;                                                                                        // 6189
        args = args || {};                                                                                             // 6190
        if (args instanceof Array) {                                                                                   // 6191
            args = {ids: args};                                                                                        // 6192
        } else if (typeof args === 'string') {                                                                         // 6193
            args = {ids: [args]};                                                                                      // 6194
        }                                                                                                              // 6195
        $$.unload($$.mapToTargetIds(args.ids), function () {                                                           // 6196
            $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});                        // 6197
            if (args.done) { args.done(); }                                                                            // 6198
        });                                                                                                            // 6199
    };                                                                                                                 // 6200
                                                                                                                       // 6201
    c3_chart_fn.flow = function (args) {                                                                               // 6202
        var $$ = this.internal,                                                                                        // 6203
            targets, data, notfoundIds = [], orgDataCount = $$.getMaxDataCount(),                                      // 6204
            dataCount, domain, baseTarget, baseValue, length = 0, tail = 0, diff, to;                                  // 6205
                                                                                                                       // 6206
        if (args.json) {                                                                                               // 6207
            data = $$.convertJsonToData(args.json, args.keys);                                                         // 6208
        }                                                                                                              // 6209
        else if (args.rows) {                                                                                          // 6210
            data = $$.convertRowsToData(args.rows);                                                                    // 6211
        }                                                                                                              // 6212
        else if (args.columns) {                                                                                       // 6213
            data = $$.convertColumnsToData(args.columns);                                                              // 6214
        }                                                                                                              // 6215
        else {                                                                                                         // 6216
            return;                                                                                                    // 6217
        }                                                                                                              // 6218
        targets = $$.convertDataToTargets(data, true);                                                                 // 6219
                                                                                                                       // 6220
        // Update/Add data                                                                                             // 6221
        $$.data.targets.forEach(function (t) {                                                                         // 6222
            var found = false, i, j;                                                                                   // 6223
            for (i = 0; i < targets.length; i++) {                                                                     // 6224
                if (t.id === targets[i].id) {                                                                          // 6225
                    found = true;                                                                                      // 6226
                                                                                                                       // 6227
                    if (t.values[t.values.length - 1]) {                                                               // 6228
                        tail = t.values[t.values.length - 1].index + 1;                                                // 6229
                    }                                                                                                  // 6230
                    length = targets[i].values.length;                                                                 // 6231
                                                                                                                       // 6232
                    for (j = 0; j < length; j++) {                                                                     // 6233
                        targets[i].values[j].index = tail + j;                                                         // 6234
                        if (!$$.isTimeSeries()) {                                                                      // 6235
                            targets[i].values[j].x = tail + j;                                                         // 6236
                        }                                                                                              // 6237
                    }                                                                                                  // 6238
                    t.values = t.values.concat(targets[i].values);                                                     // 6239
                                                                                                                       // 6240
                    targets.splice(i, 1);                                                                              // 6241
                    break;                                                                                             // 6242
                }                                                                                                      // 6243
            }                                                                                                          // 6244
            if (!found) { notfoundIds.push(t.id); }                                                                    // 6245
        });                                                                                                            // 6246
                                                                                                                       // 6247
        // Append null for not found targets                                                                           // 6248
        $$.data.targets.forEach(function (t) {                                                                         // 6249
            var i, j;                                                                                                  // 6250
            for (i = 0; i < notfoundIds.length; i++) {                                                                 // 6251
                if (t.id === notfoundIds[i]) {                                                                         // 6252
                    tail = t.values[t.values.length - 1].index + 1;                                                    // 6253
                    for (j = 0; j < length; j++) {                                                                     // 6254
                        t.values.push({                                                                                // 6255
                            id: t.id,                                                                                  // 6256
                            index: tail + j,                                                                           // 6257
                            x: $$.isTimeSeries() ? $$.getOtherTargetX(tail + j) : tail + j,                            // 6258
                            value: null                                                                                // 6259
                        });                                                                                            // 6260
                    }                                                                                                  // 6261
                }                                                                                                      // 6262
            }                                                                                                          // 6263
        });                                                                                                            // 6264
                                                                                                                       // 6265
        // Generate null values for new target                                                                         // 6266
        if ($$.data.targets.length) {                                                                                  // 6267
            targets.forEach(function (t) {                                                                             // 6268
                var i, missing = [];                                                                                   // 6269
                for (i = $$.data.targets[0].values[0].index; i < tail; i++) {                                          // 6270
                    missing.push({                                                                                     // 6271
                        id: t.id,                                                                                      // 6272
                        index: i,                                                                                      // 6273
                        x: $$.isTimeSeries() ? $$.getOtherTargetX(i) : i,                                              // 6274
                        value: null                                                                                    // 6275
                    });                                                                                                // 6276
                }                                                                                                      // 6277
                t.values.forEach(function (v) {                                                                        // 6278
                    v.index += tail;                                                                                   // 6279
                    if (!$$.isTimeSeries()) {                                                                          // 6280
                        v.x += tail;                                                                                   // 6281
                    }                                                                                                  // 6282
                });                                                                                                    // 6283
                t.values = missing.concat(t.values);                                                                   // 6284
            });                                                                                                        // 6285
        }                                                                                                              // 6286
        $$.data.targets = $$.data.targets.concat(targets); // add remained                                             // 6287
                                                                                                                       // 6288
        // check data count because behavior needs to change when it's only one                                        // 6289
        dataCount = $$.getMaxDataCount();                                                                              // 6290
        baseTarget = $$.data.targets[0];                                                                               // 6291
        baseValue = baseTarget.values[0];                                                                              // 6292
                                                                                                                       // 6293
        // Update length to flow if needed                                                                             // 6294
        if (isDefined(args.to)) {                                                                                      // 6295
            length = 0;                                                                                                // 6296
            to = $$.isTimeSeries() ? $$.parseDate(args.to) : args.to;                                                  // 6297
            baseTarget.values.forEach(function (v) {                                                                   // 6298
                if (v.x < to) { length++; }                                                                            // 6299
            });                                                                                                        // 6300
        } else if (isDefined(args.length)) {                                                                           // 6301
            length = args.length;                                                                                      // 6302
        }                                                                                                              // 6303
                                                                                                                       // 6304
        // If only one data, update the domain to flow from left edge of the chart                                     // 6305
        if (!orgDataCount) {                                                                                           // 6306
            if ($$.isTimeSeries()) {                                                                                   // 6307
                if (baseTarget.values.length > 1) {                                                                    // 6308
                    diff = baseTarget.values[baseTarget.values.length - 1].x - baseValue.x;                            // 6309
                } else {                                                                                               // 6310
                    diff = baseValue.x - $$.getXDomain($$.data.targets)[0];                                            // 6311
                }                                                                                                      // 6312
            } else {                                                                                                   // 6313
                diff = 1;                                                                                              // 6314
            }                                                                                                          // 6315
            domain = [baseValue.x - diff, baseValue.x];                                                                // 6316
            $$.updateXDomain(null, true, true, false, domain);                                                         // 6317
        } else if (orgDataCount === 1) {                                                                               // 6318
            if ($$.isTimeSeries()) {                                                                                   // 6319
                diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;                          // 6320
                domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];                               // 6321
                $$.updateXDomain(null, true, true, false, domain);                                                     // 6322
            }                                                                                                          // 6323
        }                                                                                                              // 6324
                                                                                                                       // 6325
        // Set targets                                                                                                 // 6326
        $$.updateTargets($$.data.targets);                                                                             // 6327
                                                                                                                       // 6328
        // Redraw with new targets                                                                                     // 6329
        $$.redraw({                                                                                                    // 6330
            flow: {                                                                                                    // 6331
                index: baseValue.index,                                                                                // 6332
                length: length,                                                                                        // 6333
                duration: isValue(args.duration) ? args.duration : $$.config.transition_duration,                      // 6334
                done: args.done,                                                                                       // 6335
                orgDataCount: orgDataCount,                                                                            // 6336
            },                                                                                                         // 6337
            withLegend: true,                                                                                          // 6338
            withTransition: orgDataCount > 1,                                                                          // 6339
            withTrimXDomain: false,                                                                                    // 6340
            withUpdateXAxis: true,                                                                                     // 6341
        });                                                                                                            // 6342
    };                                                                                                                 // 6343
                                                                                                                       // 6344
    c3_chart_internal_fn.generateFlow = function (args) {                                                              // 6345
        var $$ = this, config = $$.config, d3 = $$.d3;                                                                 // 6346
                                                                                                                       // 6347
        return function () {                                                                                           // 6348
            var targets = args.targets,                                                                                // 6349
                flow = args.flow,                                                                                      // 6350
                drawBar = args.drawBar,                                                                                // 6351
                drawLine = args.drawLine,                                                                              // 6352
                drawArea = args.drawArea,                                                                              // 6353
                cx = args.cx,                                                                                          // 6354
                cy = args.cy,                                                                                          // 6355
                xv = args.xv,                                                                                          // 6356
                xForText = args.xForText,                                                                              // 6357
                yForText = args.yForText,                                                                              // 6358
                duration = args.duration;                                                                              // 6359
                                                                                                                       // 6360
            var translateX, scaleX = 1, transform,                                                                     // 6361
                flowIndex = flow.index,                                                                                // 6362
                flowLength = flow.length,                                                                              // 6363
                flowStart = $$.getValueOnIndex($$.data.targets[0].values, flowIndex),                                  // 6364
                flowEnd = $$.getValueOnIndex($$.data.targets[0].values, flowIndex + flowLength),                       // 6365
                orgDomain = $$.x.domain(), domain,                                                                     // 6366
                durationForFlow = flow.duration || duration,                                                           // 6367
                done = flow.done || function () {},                                                                    // 6368
                wait = $$.generateWait();                                                                              // 6369
                                                                                                                       // 6370
            var xgrid = $$.xgrid || d3.selectAll([]),                                                                  // 6371
                xgridLines = $$.xgridLines || d3.selectAll([]),                                                        // 6372
                mainRegion = $$.mainRegion || d3.selectAll([]),                                                        // 6373
                mainText = $$.mainText || d3.selectAll([]),                                                            // 6374
                mainBar = $$.mainBar || d3.selectAll([]),                                                              // 6375
                mainLine = $$.mainLine || d3.selectAll([]),                                                            // 6376
                mainArea = $$.mainArea || d3.selectAll([]),                                                            // 6377
                mainCircle = $$.mainCircle || d3.selectAll([]);                                                        // 6378
                                                                                                                       // 6379
            // set flag                                                                                                // 6380
            $$.flowing = true;                                                                                         // 6381
                                                                                                                       // 6382
            // remove head data after rendered                                                                         // 6383
            $$.data.targets.forEach(function (d) {                                                                     // 6384
                d.values.splice(0, flowLength);                                                                        // 6385
            });                                                                                                        // 6386
                                                                                                                       // 6387
            // update x domain to generate axis elements for flow                                                      // 6388
            domain = $$.updateXDomain(targets, true, true);                                                            // 6389
            // update elements related to x scale                                                                      // 6390
            if ($$.updateXGrid) { $$.updateXGrid(true); }                                                              // 6391
                                                                                                                       // 6392
            // generate transform to flow                                                                              // 6393
            if (!flow.orgDataCount) { // if empty                                                                      // 6394
                if ($$.data.targets[0].values.length !== 1) {                                                          // 6395
                    translateX = $$.x(orgDomain[0]) - $$.x(domain[0]);                                                 // 6396
                } else {                                                                                               // 6397
                    if ($$.isTimeSeries()) {                                                                           // 6398
                        flowStart = $$.getValueOnIndex($$.data.targets[0].values, 0);                                  // 6399
                        flowEnd = $$.getValueOnIndex($$.data.targets[0].values, $$.data.targets[0].values.length - 1);
                        translateX = $$.x(flowStart.x) - $$.x(flowEnd.x);                                              // 6401
                    } else {                                                                                           // 6402
                        translateX = diffDomain(domain) / 2;                                                           // 6403
                    }                                                                                                  // 6404
                }                                                                                                      // 6405
            } else if (flow.orgDataCount === 1 || flowStart.x === flowEnd.x) {                                         // 6406
                translateX = $$.x(orgDomain[0]) - $$.x(domain[0]);                                                     // 6407
            } else {                                                                                                   // 6408
                if ($$.isTimeSeries()) {                                                                               // 6409
                    translateX = ($$.x(orgDomain[0]) - $$.x(domain[0]));                                               // 6410
                } else {                                                                                               // 6411
                    translateX = ($$.x(flowStart.x) - $$.x(flowEnd.x));                                                // 6412
                }                                                                                                      // 6413
            }                                                                                                          // 6414
            scaleX = (diffDomain(orgDomain) / diffDomain(domain));                                                     // 6415
            transform = 'translate(' + translateX + ',0) scale(' + scaleX + ',1)';                                     // 6416
                                                                                                                       // 6417
            $$.hideXGridFocus();                                                                                       // 6418
                                                                                                                       // 6419
            d3.transition().ease('linear').duration(durationForFlow).each(function () {                                // 6420
                wait.add($$.axes.x.transition().call($$.xAxis));                                                       // 6421
                wait.add(mainBar.transition().attr('transform', transform));                                           // 6422
                wait.add(mainLine.transition().attr('transform', transform));                                          // 6423
                wait.add(mainArea.transition().attr('transform', transform));                                          // 6424
                wait.add(mainCircle.transition().attr('transform', transform));                                        // 6425
                wait.add(mainText.transition().attr('transform', transform));                                          // 6426
                wait.add(mainRegion.filter($$.isRegionOnX).transition().attr('transform', transform));                 // 6427
                wait.add(xgrid.transition().attr('transform', transform));                                             // 6428
                wait.add(xgridLines.transition().attr('transform', transform));                                        // 6429
            })                                                                                                         // 6430
            .call(wait, function () {                                                                                  // 6431
                var i, shapes = [], texts = [], eventRects = [];                                                       // 6432
                                                                                                                       // 6433
                // remove flowed elements                                                                              // 6434
                if (flowLength) {                                                                                      // 6435
                    for (i = 0; i < flowLength; i++) {                                                                 // 6436
                        shapes.push('.' + CLASS.shape + '-' + (flowIndex + i));                                        // 6437
                        texts.push('.' + CLASS.text + '-' + (flowIndex + i));                                          // 6438
                        eventRects.push('.' + CLASS.eventRect + '-' + (flowIndex + i));                                // 6439
                    }                                                                                                  // 6440
                    $$.svg.selectAll('.' + CLASS.shapes).selectAll(shapes).remove();                                   // 6441
                    $$.svg.selectAll('.' + CLASS.texts).selectAll(texts).remove();                                     // 6442
                    $$.svg.selectAll('.' + CLASS.eventRects).selectAll(eventRects).remove();                           // 6443
                    $$.svg.select('.' + CLASS.xgrid).remove();                                                         // 6444
                }                                                                                                      // 6445
                                                                                                                       // 6446
                // draw again for removing flowed elements and reverting attr                                          // 6447
                xgrid                                                                                                  // 6448
                    .attr('transform', null)                                                                           // 6449
                    .attr($$.xgridAttr);                                                                               // 6450
                xgridLines                                                                                             // 6451
                    .attr('transform', null);                                                                          // 6452
                xgridLines.select('line')                                                                              // 6453
                    .attr("x1", config.axis_rotated ? 0 : xv)                                                          // 6454
                    .attr("x2", config.axis_rotated ? $$.width : xv);                                                  // 6455
                xgridLines.select('text')                                                                              // 6456
                    .attr("x", config.axis_rotated ? $$.width : 0)                                                     // 6457
                    .attr("y", xv);                                                                                    // 6458
                mainBar                                                                                                // 6459
                    .attr('transform', null)                                                                           // 6460
                    .attr("d", drawBar);                                                                               // 6461
                mainLine                                                                                               // 6462
                    .attr('transform', null)                                                                           // 6463
                    .attr("d", drawLine);                                                                              // 6464
                mainArea                                                                                               // 6465
                    .attr('transform', null)                                                                           // 6466
                    .attr("d", drawArea);                                                                              // 6467
                mainCircle                                                                                             // 6468
                    .attr('transform', null)                                                                           // 6469
                    .attr("cx", cx)                                                                                    // 6470
                    .attr("cy", cy);                                                                                   // 6471
                mainText                                                                                               // 6472
                    .attr('transform', null)                                                                           // 6473
                    .attr('x', xForText)                                                                               // 6474
                    .attr('y', yForText)                                                                               // 6475
                    .style('fill-opacity', $$.opacityForText.bind($$));                                                // 6476
                mainRegion                                                                                             // 6477
                    .attr('transform', null);                                                                          // 6478
                mainRegion.select('rect').filter($$.isRegionOnX)                                                       // 6479
                    .attr("x", $$.regionX.bind($$))                                                                    // 6480
                    .attr("width", $$.regionWidth.bind($$));                                                           // 6481
                                                                                                                       // 6482
                if (config.interaction_enabled) {                                                                      // 6483
                    $$.redrawEventRect();                                                                              // 6484
                }                                                                                                      // 6485
                                                                                                                       // 6486
                // callback for end of flow                                                                            // 6487
                done();                                                                                                // 6488
                                                                                                                       // 6489
                $$.flowing = false;                                                                                    // 6490
            });                                                                                                        // 6491
        };                                                                                                             // 6492
    };                                                                                                                 // 6493
                                                                                                                       // 6494
    c3_chart_fn.selected = function (targetId) {                                                                       // 6495
        var $$ = this.internal, d3 = $$.d3;                                                                            // 6496
        return d3.merge(                                                                                               // 6497
            $$.main.selectAll('.' + CLASS.shapes + $$.getTargetSelectorSuffix(targetId)).selectAll('.' + CLASS.shape)  // 6498
                .filter(function () { return d3.select(this).classed(CLASS.SELECTED); })                               // 6499
                .map(function (d) { return d.map(function (d) { var data = d.__data__; return data.data ? data.data : data; }); })
        );                                                                                                             // 6501
    };                                                                                                                 // 6502
    c3_chart_fn.select = function (ids, indices, resetOther) {                                                         // 6503
        var $$ = this.internal, d3 = $$.d3, config = $$.config;                                                        // 6504
        if (! config.data_selection_enabled) { return; }                                                               // 6505
        $$.main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape).each(function (d, i) {                      // 6506
            var shape = d3.select(this), id = d.data ? d.data.id : d.id,                                               // 6507
                toggle = $$.getToggle(this, d).bind($$),                                                               // 6508
                isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,                            // 6509
                isTargetIndex = !indices || indices.indexOf(i) >= 0,                                                   // 6510
                isSelected = shape.classed(CLASS.SELECTED);                                                            // 6511
            // line/area selection not supported yet                                                                   // 6512
            if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {                                              // 6513
                return;                                                                                                // 6514
            }                                                                                                          // 6515
            if (isTargetId && isTargetIndex) {                                                                         // 6516
                if (config.data_selection_isselectable(d) && !isSelected) {                                            // 6517
                    toggle(true, shape.classed(CLASS.SELECTED, true), d, i);                                           // 6518
                }                                                                                                      // 6519
            } else if (isDefined(resetOther) && resetOther) {                                                          // 6520
                if (isSelected) {                                                                                      // 6521
                    toggle(false, shape.classed(CLASS.SELECTED, false), d, i);                                         // 6522
                }                                                                                                      // 6523
            }                                                                                                          // 6524
        });                                                                                                            // 6525
    };                                                                                                                 // 6526
    c3_chart_fn.unselect = function (ids, indices) {                                                                   // 6527
        var $$ = this.internal, d3 = $$.d3, config = $$.config;                                                        // 6528
        if (! config.data_selection_enabled) { return; }                                                               // 6529
        $$.main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape).each(function (d, i) {                      // 6530
            var shape = d3.select(this), id = d.data ? d.data.id : d.id,                                               // 6531
                toggle = $$.getToggle(this, d).bind($$),                                                               // 6532
                isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,                            // 6533
                isTargetIndex = !indices || indices.indexOf(i) >= 0,                                                   // 6534
                isSelected = shape.classed(CLASS.SELECTED);                                                            // 6535
            // line/area selection not supported yet                                                                   // 6536
            if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {                                              // 6537
                return;                                                                                                // 6538
            }                                                                                                          // 6539
            if (isTargetId && isTargetIndex) {                                                                         // 6540
                if (config.data_selection_isselectable(d)) {                                                           // 6541
                    if (isSelected) {                                                                                  // 6542
                        toggle(false, shape.classed(CLASS.SELECTED, false), d, i);                                     // 6543
                    }                                                                                                  // 6544
                }                                                                                                      // 6545
            }                                                                                                          // 6546
        });                                                                                                            // 6547
    };                                                                                                                 // 6548
                                                                                                                       // 6549
    c3_chart_fn.transform = function (type, targetIds) {                                                               // 6550
        var $$ = this.internal,                                                                                        // 6551
            options = ['pie', 'donut'].indexOf(type) >= 0 ? {withTransform: true} : null;                              // 6552
        $$.transformTo(targetIds, type, options);                                                                      // 6553
    };                                                                                                                 // 6554
                                                                                                                       // 6555
    c3_chart_internal_fn.transformTo = function (targetIds, type, optionsForRedraw) {                                  // 6556
        var $$ = this,                                                                                                 // 6557
            withTransitionForAxis = !$$.hasArcType(),                                                                  // 6558
            options = optionsForRedraw || {withTransitionForAxis: withTransitionForAxis};                              // 6559
        options.withTransitionForTransform = false;                                                                    // 6560
        $$.transiting = false;                                                                                         // 6561
        $$.setTargetType(targetIds, type);                                                                             // 6562
        $$.updateTargets($$.data.targets); // this is needed when transforming to arc                                  // 6563
        $$.updateAndRedraw(options);                                                                                   // 6564
    };                                                                                                                 // 6565
                                                                                                                       // 6566
    c3_chart_fn.groups = function (groups) {                                                                           // 6567
        var $$ = this.internal, config = $$.config;                                                                    // 6568
        if (isUndefined(groups)) { return config.data_groups; }                                                        // 6569
        config.data_groups = groups;                                                                                   // 6570
        $$.redraw();                                                                                                   // 6571
        return config.data_groups;                                                                                     // 6572
    };                                                                                                                 // 6573
                                                                                                                       // 6574
    c3_chart_fn.xgrids = function (grids) {                                                                            // 6575
        var $$ = this.internal, config = $$.config;                                                                    // 6576
        if (! grids) { return config.grid_x_lines; }                                                                   // 6577
        config.grid_x_lines = grids;                                                                                   // 6578
        $$.redrawWithoutRescale();                                                                                     // 6579
        return config.grid_x_lines;                                                                                    // 6580
    };                                                                                                                 // 6581
    c3_chart_fn.xgrids.add = function (grids) {                                                                        // 6582
        var $$ = this.internal;                                                                                        // 6583
        return this.xgrids($$.config.grid_x_lines.concat(grids ? grids : []));                                         // 6584
    };                                                                                                                 // 6585
    c3_chart_fn.xgrids.remove = function (params) { // TODO: multiple                                                  // 6586
        var $$ = this.internal;                                                                                        // 6587
        $$.removeGridLines(params, true);                                                                              // 6588
    };                                                                                                                 // 6589
                                                                                                                       // 6590
    c3_chart_fn.ygrids = function (grids) {                                                                            // 6591
        var $$ = this.internal, config = $$.config;                                                                    // 6592
        if (! grids) { return config.grid_y_lines; }                                                                   // 6593
        config.grid_y_lines = grids;                                                                                   // 6594
        $$.redrawWithoutRescale();                                                                                     // 6595
        return config.grid_y_lines;                                                                                    // 6596
    };                                                                                                                 // 6597
    c3_chart_fn.ygrids.add = function (grids) {                                                                        // 6598
        var $$ = this.internal;                                                                                        // 6599
        return this.ygrids($$.config.grid_y_lines.concat(grids ? grids : []));                                         // 6600
    };                                                                                                                 // 6601
    c3_chart_fn.ygrids.remove = function (params) { // TODO: multiple                                                  // 6602
        var $$ = this.internal;                                                                                        // 6603
        $$.removeGridLines(params, false);                                                                             // 6604
    };                                                                                                                 // 6605
                                                                                                                       // 6606
    c3_chart_fn.regions = function (regions) {                                                                         // 6607
        var $$ = this.internal, config = $$.config;                                                                    // 6608
        if (!regions) { return config.regions; }                                                                       // 6609
        config.regions = regions;                                                                                      // 6610
        $$.redrawWithoutRescale();                                                                                     // 6611
        return config.regions;                                                                                         // 6612
    };                                                                                                                 // 6613
    c3_chart_fn.regions.add = function (regions) {                                                                     // 6614
        var $$ = this.internal, config = $$.config;                                                                    // 6615
        if (!regions) { return config.regions; }                                                                       // 6616
        config.regions = config.regions.concat(regions);                                                               // 6617
        $$.redrawWithoutRescale();                                                                                     // 6618
        return config.regions;                                                                                         // 6619
    };                                                                                                                 // 6620
    c3_chart_fn.regions.remove = function (options) {                                                                  // 6621
        var $$ = this.internal, config = $$.config,                                                                    // 6622
            duration, classes, regions;                                                                                // 6623
                                                                                                                       // 6624
        options = options || {};                                                                                       // 6625
        duration = $$.getOption(options, "duration", config.transition_duration);                                      // 6626
        classes = $$.getOption(options, "classes", [CLASS.region]);                                                    // 6627
                                                                                                                       // 6628
        regions = $$.main.select('.' + CLASS.regions).selectAll(classes.map(function (c) { return '.' + c; }));        // 6629
        (duration ? regions.transition().duration(duration) : regions)                                                 // 6630
            .style('opacity', 0)                                                                                       // 6631
            .remove();                                                                                                 // 6632
                                                                                                                       // 6633
        config.regions = config.regions.filter(function (region) {                                                     // 6634
            var found = false;                                                                                         // 6635
            if (!region['class']) {                                                                                    // 6636
                return true;                                                                                           // 6637
            }                                                                                                          // 6638
            region['class'].split(' ').forEach(function (c) {                                                          // 6639
                if (classes.indexOf(c) >= 0) { found = true; }                                                         // 6640
            });                                                                                                        // 6641
            return !found;                                                                                             // 6642
        });                                                                                                            // 6643
                                                                                                                       // 6644
        return config.regions;                                                                                         // 6645
    };                                                                                                                 // 6646
                                                                                                                       // 6647
    c3_chart_fn.data = function (targetIds) {                                                                          // 6648
        var targets = this.internal.data.targets;                                                                      // 6649
        return typeof targetIds === 'undefined' ? targets : targets.filter(function (t) {                              // 6650
            return [].concat(targetIds).indexOf(t.id) >= 0;                                                            // 6651
        });                                                                                                            // 6652
    };                                                                                                                 // 6653
    c3_chart_fn.data.shown = function (targetIds) {                                                                    // 6654
        return this.internal.filterTargetsToShow(this.data(targetIds));                                                // 6655
    };                                                                                                                 // 6656
    c3_chart_fn.data.values = function (targetId) {                                                                    // 6657
        var targets, values = null;                                                                                    // 6658
        if (targetId) {                                                                                                // 6659
            targets = this.data(targetId);                                                                             // 6660
            values = targets[0] ? targets[0].values.map(function (d) { return d.value; }) : null;                      // 6661
        }                                                                                                              // 6662
        return values;                                                                                                 // 6663
    };                                                                                                                 // 6664
    c3_chart_fn.data.names = function (names) {                                                                        // 6665
        this.internal.clearLegendItemTextBoxCache();                                                                   // 6666
        return this.internal.updateDataAttributes('names', names);                                                     // 6667
    };                                                                                                                 // 6668
    c3_chart_fn.data.colors = function (colors) {                                                                      // 6669
        return this.internal.updateDataAttributes('colors', colors);                                                   // 6670
    };                                                                                                                 // 6671
    c3_chart_fn.data.axes = function (axes) {                                                                          // 6672
        return this.internal.updateDataAttributes('axes', axes);                                                       // 6673
    };                                                                                                                 // 6674
                                                                                                                       // 6675
    c3_chart_fn.category = function (i, category) {                                                                    // 6676
        var $$ = this.internal, config = $$.config;                                                                    // 6677
        if (arguments.length > 1) {                                                                                    // 6678
            config.axis_x_categories[i] = category;                                                                    // 6679
            $$.redraw();                                                                                               // 6680
        }                                                                                                              // 6681
        return config.axis_x_categories[i];                                                                            // 6682
    };                                                                                                                 // 6683
    c3_chart_fn.categories = function (categories) {                                                                   // 6684
        var $$ = this.internal, config = $$.config;                                                                    // 6685
        if (!arguments.length) { return config.axis_x_categories; }                                                    // 6686
        config.axis_x_categories = categories;                                                                         // 6687
        $$.redraw();                                                                                                   // 6688
        return config.axis_x_categories;                                                                               // 6689
    };                                                                                                                 // 6690
                                                                                                                       // 6691
    // TODO: fix                                                                                                       // 6692
    c3_chart_fn.color = function (id) {                                                                                // 6693
        var $$ = this.internal;                                                                                        // 6694
        return $$.color(id); // more patterns                                                                          // 6695
    };                                                                                                                 // 6696
                                                                                                                       // 6697
    c3_chart_fn.x = function (x) {                                                                                     // 6698
        var $$ = this.internal;                                                                                        // 6699
        if (arguments.length) {                                                                                        // 6700
            $$.updateTargetX($$.data.targets, x);                                                                      // 6701
            $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});                                          // 6702
        }                                                                                                              // 6703
        return $$.data.xs;                                                                                             // 6704
    };                                                                                                                 // 6705
    c3_chart_fn.xs = function (xs) {                                                                                   // 6706
        var $$ = this.internal;                                                                                        // 6707
        if (arguments.length) {                                                                                        // 6708
            $$.updateTargetXs($$.data.targets, xs);                                                                    // 6709
            $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});                                          // 6710
        }                                                                                                              // 6711
        return $$.data.xs;                                                                                             // 6712
    };                                                                                                                 // 6713
                                                                                                                       // 6714
    c3_chart_fn.axis = function () {};                                                                                 // 6715
    c3_chart_fn.axis.labels = function (labels) {                                                                      // 6716
        var $$ = this.internal;                                                                                        // 6717
        if (arguments.length) {                                                                                        // 6718
            Object.keys(labels).forEach(function (axisId) {                                                            // 6719
                $$.axis.setLabelText(axisId, labels[axisId]);                                                          // 6720
            });                                                                                                        // 6721
            $$.axis.updateLabels();                                                                                    // 6722
        }                                                                                                              // 6723
        // TODO: return some values?                                                                                   // 6724
    };                                                                                                                 // 6725
    c3_chart_fn.axis.max = function (max) {                                                                            // 6726
        var $$ = this.internal, config = $$.config;                                                                    // 6727
        if (arguments.length) {                                                                                        // 6728
            if (typeof max === 'object') {                                                                             // 6729
                if (isValue(max.x)) { config.axis_x_max = max.x; }                                                     // 6730
                if (isValue(max.y)) { config.axis_y_max = max.y; }                                                     // 6731
                if (isValue(max.y2)) { config.axis_y2_max = max.y2; }                                                  // 6732
            } else {                                                                                                   // 6733
                config.axis_y_max = config.axis_y2_max = max;                                                          // 6734
            }                                                                                                          // 6735
            $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});                                          // 6736
        } else {                                                                                                       // 6737
            return {                                                                                                   // 6738
                x: config.axis_x_max,                                                                                  // 6739
                y: config.axis_y_max,                                                                                  // 6740
                y2: config.axis_y2_max                                                                                 // 6741
            };                                                                                                         // 6742
        }                                                                                                              // 6743
    };                                                                                                                 // 6744
    c3_chart_fn.axis.min = function (min) {                                                                            // 6745
        var $$ = this.internal, config = $$.config;                                                                    // 6746
        if (arguments.length) {                                                                                        // 6747
            if (typeof min === 'object') {                                                                             // 6748
                if (isValue(min.x)) { config.axis_x_min = min.x; }                                                     // 6749
                if (isValue(min.y)) { config.axis_y_min = min.y; }                                                     // 6750
                if (isValue(min.y2)) { config.axis_y2_min = min.y2; }                                                  // 6751
            } else {                                                                                                   // 6752
                config.axis_y_min = config.axis_y2_min = min;                                                          // 6753
            }                                                                                                          // 6754
            $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});                                          // 6755
        } else {                                                                                                       // 6756
            return {                                                                                                   // 6757
                x: config.axis_x_min,                                                                                  // 6758
                y: config.axis_y_min,                                                                                  // 6759
                y2: config.axis_y2_min                                                                                 // 6760
            };                                                                                                         // 6761
        }                                                                                                              // 6762
    };                                                                                                                 // 6763
    c3_chart_fn.axis.range = function (range) {                                                                        // 6764
        if (arguments.length) {                                                                                        // 6765
            if (isDefined(range.max)) { this.axis.max(range.max); }                                                    // 6766
            if (isDefined(range.min)) { this.axis.min(range.min); }                                                    // 6767
        } else {                                                                                                       // 6768
            return {                                                                                                   // 6769
                max: this.axis.max(),                                                                                  // 6770
                min: this.axis.min()                                                                                   // 6771
            };                                                                                                         // 6772
        }                                                                                                              // 6773
    };                                                                                                                 // 6774
                                                                                                                       // 6775
    c3_chart_fn.legend = function () {};                                                                               // 6776
    c3_chart_fn.legend.show = function (targetIds) {                                                                   // 6777
        var $$ = this.internal;                                                                                        // 6778
        $$.showLegend($$.mapToTargetIds(targetIds));                                                                   // 6779
        $$.updateAndRedraw({withLegend: true});                                                                        // 6780
    };                                                                                                                 // 6781
    c3_chart_fn.legend.hide = function (targetIds) {                                                                   // 6782
        var $$ = this.internal;                                                                                        // 6783
        $$.hideLegend($$.mapToTargetIds(targetIds));                                                                   // 6784
        $$.updateAndRedraw({withLegend: true});                                                                        // 6785
    };                                                                                                                 // 6786
                                                                                                                       // 6787
    c3_chart_fn.resize = function (size) {                                                                             // 6788
        var $$ = this.internal, config = $$.config;                                                                    // 6789
        config.size_width = size ? size.width : null;                                                                  // 6790
        config.size_height = size ? size.height : null;                                                                // 6791
        this.flush();                                                                                                  // 6792
    };                                                                                                                 // 6793
                                                                                                                       // 6794
    c3_chart_fn.flush = function () {                                                                                  // 6795
        var $$ = this.internal;                                                                                        // 6796
        $$.updateAndRedraw({withLegend: true, withTransition: false, withTransitionForTransform: false});              // 6797
    };                                                                                                                 // 6798
                                                                                                                       // 6799
    c3_chart_fn.destroy = function () {                                                                                // 6800
        var $$ = this.internal;                                                                                        // 6801
                                                                                                                       // 6802
        window.clearInterval($$.intervalForObserveInserted);                                                           // 6803
                                                                                                                       // 6804
        if ($$.resizeTimeout !== undefined) {                                                                          // 6805
            window.clearTimeout($$.resizeTimeout);                                                                     // 6806
        }                                                                                                              // 6807
                                                                                                                       // 6808
        if (window.detachEvent) {                                                                                      // 6809
            window.detachEvent('onresize', $$.resizeFunction);                                                         // 6810
        } else if (window.removeEventListener) {                                                                       // 6811
            window.removeEventListener('resize', $$.resizeFunction);                                                   // 6812
        } else {                                                                                                       // 6813
            var wrapper = window.onresize;                                                                             // 6814
            // check if no one else removed our wrapper and remove our resizeFunction from it                          // 6815
            if (wrapper && wrapper.add && wrapper.remove) {                                                            // 6816
                wrapper.remove($$.resizeFunction);                                                                     // 6817
            }                                                                                                          // 6818
        }                                                                                                              // 6819
                                                                                                                       // 6820
        $$.selectChart.classed('c3', false).html("");                                                                  // 6821
                                                                                                                       // 6822
        // MEMO: this is needed because the reference of some elements will not be released, then memory leak will happen.
        Object.keys($$).forEach(function (key) {                                                                       // 6824
            $$[key] = null;                                                                                            // 6825
        });                                                                                                            // 6826
                                                                                                                       // 6827
        return null;                                                                                                   // 6828
    };                                                                                                                 // 6829
                                                                                                                       // 6830
    c3_chart_fn.tooltip = function () {};                                                                              // 6831
    c3_chart_fn.tooltip.show = function (args) {                                                                       // 6832
        var $$ = this.internal, index, mouse;                                                                          // 6833
                                                                                                                       // 6834
        // determine mouse position on the chart                                                                       // 6835
        if (args.mouse) {                                                                                              // 6836
            mouse = args.mouse;                                                                                        // 6837
        }                                                                                                              // 6838
                                                                                                                       // 6839
        // determine focus data                                                                                        // 6840
        if (args.data) {                                                                                               // 6841
            if ($$.isMultipleX()) {                                                                                    // 6842
                // if multiple xs, target point will be determined by mouse                                            // 6843
                mouse = [$$.x(args.data.x), $$.getYScale(args.data.id)(args.data.value)];                              // 6844
                index = null;                                                                                          // 6845
            } else {                                                                                                   // 6846
                // TODO: when tooltip_grouped = false                                                                  // 6847
                index = isValue(args.data.index) ? args.data.index : $$.getIndexByX(args.data.x);                      // 6848
            }                                                                                                          // 6849
        }                                                                                                              // 6850
        else if (typeof args.x !== 'undefined') {                                                                      // 6851
            index = $$.getIndexByX(args.x);                                                                            // 6852
        }                                                                                                              // 6853
        else if (typeof args.index !== 'undefined') {                                                                  // 6854
            index = args.index;                                                                                        // 6855
        }                                                                                                              // 6856
                                                                                                                       // 6857
        // emulate mouse events to show                                                                                // 6858
        $$.dispatchEvent('mouseover', index, mouse);                                                                   // 6859
        $$.dispatchEvent('mousemove', index, mouse);                                                                   // 6860
                                                                                                                       // 6861
        this.config.tooltip_onshow.call($$, args.data);                                                                // 6862
    };                                                                                                                 // 6863
    c3_chart_fn.tooltip.hide = function () {                                                                           // 6864
        // TODO: get target data by checking the state of focus                                                        // 6865
        this.internal.dispatchEvent('mouseout', 0);                                                                    // 6866
                                                                                                                       // 6867
        this.config.tooltip_onhide.call(this);                                                                         // 6868
    };                                                                                                                 // 6869
                                                                                                                       // 6870
    // Features:                                                                                                       // 6871
    // 1. category axis                                                                                                // 6872
    // 2. ceil values of translate/x/y to int for half pixel antialiasing                                              // 6873
    // 3. multiline tick text                                                                                          // 6874
    var tickTextCharSize;                                                                                              // 6875
    function c3_axis(d3, params) {                                                                                     // 6876
        var scale = d3.scale.linear(), orient = "bottom", innerTickSize = 6, outerTickSize, tickPadding = 3, tickValues = null, tickFormat, tickArguments;
                                                                                                                       // 6878
        var tickOffset = 0, tickCulling = true, tickCentered;                                                          // 6879
                                                                                                                       // 6880
        params = params || {};                                                                                         // 6881
        outerTickSize = params.withOuterTick ? 6 : 0;                                                                  // 6882
                                                                                                                       // 6883
        function axisX(selection, x) {                                                                                 // 6884
            selection.attr("transform", function (d) {                                                                 // 6885
                return "translate(" + Math.ceil(x(d) + tickOffset) + ", 0)";                                           // 6886
            });                                                                                                        // 6887
        }                                                                                                              // 6888
        function axisY(selection, y) {                                                                                 // 6889
            selection.attr("transform", function (d) {                                                                 // 6890
                return "translate(0," + Math.ceil(y(d)) + ")";                                                         // 6891
            });                                                                                                        // 6892
        }                                                                                                              // 6893
        function scaleExtent(domain) {                                                                                 // 6894
            var start = domain[0], stop = domain[domain.length - 1];                                                   // 6895
            return start < stop ? [ start, stop ] : [ stop, start ];                                                   // 6896
        }                                                                                                              // 6897
        function generateTicks(scale) {                                                                                // 6898
            var i, domain, ticks = [];                                                                                 // 6899
            if (scale.ticks) {                                                                                         // 6900
                return scale.ticks.apply(scale, tickArguments);                                                        // 6901
            }                                                                                                          // 6902
            domain = scale.domain();                                                                                   // 6903
            for (i = Math.ceil(domain[0]); i < domain[1]; i++) {                                                       // 6904
                ticks.push(i);                                                                                         // 6905
            }                                                                                                          // 6906
            if (ticks.length > 0 && ticks[0] > 0) {                                                                    // 6907
                ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));                                                       // 6908
            }                                                                                                          // 6909
            return ticks;                                                                                              // 6910
        }                                                                                                              // 6911
        function copyScale() {                                                                                         // 6912
            var newScale = scale.copy(), domain;                                                                       // 6913
            if (params.isCategory) {                                                                                   // 6914
                domain = scale.domain();                                                                               // 6915
                newScale.domain([domain[0], domain[1] - 1]);                                                           // 6916
            }                                                                                                          // 6917
            return newScale;                                                                                           // 6918
        }                                                                                                              // 6919
        function textFormatted(v) {                                                                                    // 6920
            var formatted = tickFormat ? tickFormat(v) : v;                                                            // 6921
            return typeof formatted !== 'undefined' ? formatted : '';                                                  // 6922
        }                                                                                                              // 6923
        function getSizeFor1Char(tick) {                                                                               // 6924
            if (tickTextCharSize) {                                                                                    // 6925
                return tickTextCharSize;                                                                               // 6926
            }                                                                                                          // 6927
            var size = {                                                                                               // 6928
                h: 11.5,                                                                                               // 6929
                w: 5.5                                                                                                 // 6930
            };                                                                                                         // 6931
            tick.select('text').text(textFormatted).each(function (d) {                                                // 6932
                var box = this.getBoundingClientRect(),                                                                // 6933
                    text = textFormatted(d),                                                                           // 6934
                    h = box.height,                                                                                    // 6935
                    w = text ? (box.width / text.length) : undefined;                                                  // 6936
                if (h && w) {                                                                                          // 6937
                    size.h = h;                                                                                        // 6938
                    size.w = w;                                                                                        // 6939
                }                                                                                                      // 6940
            }).text('');                                                                                               // 6941
            tickTextCharSize = size;                                                                                   // 6942
            return size;                                                                                               // 6943
        }                                                                                                              // 6944
        function transitionise(selection) {                                                                            // 6945
            return params.withoutTransition ? selection : d3.transition(selection);                                    // 6946
        }                                                                                                              // 6947
        function axis(g) {                                                                                             // 6948
            g.each(function () {                                                                                       // 6949
                var g = axis.g = d3.select(this);                                                                      // 6950
                                                                                                                       // 6951
                var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = copyScale();                           // 6952
                                                                                                                       // 6953
                var ticks = tickValues ? tickValues : generateTicks(scale1),                                           // 6954
                    tick = g.selectAll(".tick").data(ticks, scale1),                                                   // 6955
                    tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", 1e-6),      // 6956
                    // MEMO: No exit transition. The reason is this transition affects max tick width calculation because old tick will be included in the ticks.
                    tickExit = tick.exit().remove(),                                                                   // 6958
                    tickUpdate = transitionise(tick).style("opacity", 1),                                              // 6959
                    tickTransform, tickX, tickY;                                                                       // 6960
                                                                                                                       // 6961
                var range = scale.rangeExtent ? scale.rangeExtent() : scaleExtent(scale.range()),                      // 6962
                    path = g.selectAll(".domain").data([ 0 ]),                                                         // 6963
                    pathUpdate = (path.enter().append("path").attr("class", "domain"), transitionise(path));           // 6964
                tickEnter.append("line");                                                                              // 6965
                tickEnter.append("text");                                                                              // 6966
                                                                                                                       // 6967
                var lineEnter = tickEnter.select("line"),                                                              // 6968
                    lineUpdate = tickUpdate.select("line"),                                                            // 6969
                    textEnter = tickEnter.select("text"),                                                              // 6970
                    textUpdate = tickUpdate.select("text");                                                            // 6971
                                                                                                                       // 6972
                if (params.isCategory) {                                                                               // 6973
                    tickOffset = Math.ceil((scale1(1) - scale1(0)) / 2);                                               // 6974
                    tickX = tickCentered ? 0 : tickOffset;                                                             // 6975
                    tickY = tickCentered ? tickOffset : 0;                                                             // 6976
                } else {                                                                                               // 6977
                    tickOffset = tickX = 0;                                                                            // 6978
                }                                                                                                      // 6979
                                                                                                                       // 6980
                var text, tspan, sizeFor1Char = getSizeFor1Char(g.select('.tick')), counts = [];                       // 6981
                var tickLength = Math.max(innerTickSize, 0) + tickPadding,                                             // 6982
                    isVertical = orient === 'left' || orient === 'right';                                              // 6983
                                                                                                                       // 6984
                // this should be called only when category axis                                                       // 6985
                function splitTickText(d, maxWidth) {                                                                  // 6986
                    var tickText = textFormatted(d),                                                                   // 6987
                        subtext, spaceIndex, textWidth, splitted = [];                                                 // 6988
                                                                                                                       // 6989
                    if (Object.prototype.toString.call(tickText) === "[object Array]") {                               // 6990
                        return tickText;                                                                               // 6991
                    }                                                                                                  // 6992
                                                                                                                       // 6993
                    if (!maxWidth || maxWidth <= 0) {                                                                  // 6994
                        maxWidth = isVertical ? 95 : params.isCategory ? (Math.ceil(scale1(ticks[1]) - scale1(ticks[0])) - 12) : 110;
                    }                                                                                                  // 6996
                                                                                                                       // 6997
                    function split(splitted, text) {                                                                   // 6998
                        spaceIndex = undefined;                                                                        // 6999
                        for (var i = 1; i < text.length; i++) {                                                        // 7000
                            if (text.charAt(i) === ' ') {                                                              // 7001
                                spaceIndex = i;                                                                        // 7002
                            }                                                                                          // 7003
                            subtext = text.substr(0, i + 1);                                                           // 7004
                            textWidth = sizeFor1Char.w * subtext.length;                                               // 7005
                            // if text width gets over tick width, split by space index or crrent index                // 7006
                            if (maxWidth < textWidth) {                                                                // 7007
                                return split(                                                                          // 7008
                                    splitted.concat(text.substr(0, spaceIndex ? spaceIndex : i)),                      // 7009
                                    text.slice(spaceIndex ? spaceIndex + 1 : i)                                        // 7010
                                );                                                                                     // 7011
                            }                                                                                          // 7012
                        }                                                                                              // 7013
                        return splitted.concat(text);                                                                  // 7014
                    }                                                                                                  // 7015
                                                                                                                       // 7016
                    return split(splitted, tickText + "");                                                             // 7017
                }                                                                                                      // 7018
                                                                                                                       // 7019
                function tspanDy(d, i) {                                                                               // 7020
                    var dy = sizeFor1Char.h;                                                                           // 7021
                    if (i === 0) {                                                                                     // 7022
                        if (orient === 'left' || orient === 'right') {                                                 // 7023
                            dy = -((counts[d.index] - 1) * (sizeFor1Char.h / 2) - 3);                                  // 7024
                        } else {                                                                                       // 7025
                            dy = ".71em";                                                                              // 7026
                        }                                                                                              // 7027
                    }                                                                                                  // 7028
                    return dy;                                                                                         // 7029
                }                                                                                                      // 7030
                                                                                                                       // 7031
                function tickSize(d) {                                                                                 // 7032
                    var tickPosition = scale(d) + (tickCentered ? 0 : tickOffset);                                     // 7033
                    return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;                     // 7034
                }                                                                                                      // 7035
                                                                                                                       // 7036
                text = tick.select("text");                                                                            // 7037
                tspan = text.selectAll('tspan')                                                                        // 7038
                    .data(function (d, i) {                                                                            // 7039
                        var splitted = params.tickMultiline ? splitTickText(d, params.tickWidth) : [].concat(textFormatted(d));
                        counts[i] = splitted.length;                                                                   // 7041
                        return splitted.map(function (s) {                                                             // 7042
                            return { index: i, splitted: s };                                                          // 7043
                        });                                                                                            // 7044
                    });                                                                                                // 7045
                tspan.enter().append('tspan');                                                                         // 7046
                tspan.exit().remove();                                                                                 // 7047
                tspan.text(function (d) { return d.splitted; });                                                       // 7048
                                                                                                                       // 7049
                var rotate = params.tickTextRotate;                                                                    // 7050
                                                                                                                       // 7051
                function textAnchorForText(rotate) {                                                                   // 7052
                    if (!rotate) {                                                                                     // 7053
                        return 'middle';                                                                               // 7054
                    }                                                                                                  // 7055
                    return rotate > 0 ? "start" : "end";                                                               // 7056
                }                                                                                                      // 7057
                function textTransform(rotate) {                                                                       // 7058
                    if (!rotate) {                                                                                     // 7059
                        return '';                                                                                     // 7060
                    }                                                                                                  // 7061
                    return "rotate(" + rotate + ")";                                                                   // 7062
                }                                                                                                      // 7063
                function dxForText(rotate) {                                                                           // 7064
                    if (!rotate) {                                                                                     // 7065
                        return 0;                                                                                      // 7066
                    }                                                                                                  // 7067
                    return 8 * Math.sin(Math.PI * (rotate / 180));                                                     // 7068
                }                                                                                                      // 7069
                function yForText(rotate) {                                                                            // 7070
                    if (!rotate) {                                                                                     // 7071
                        return tickLength;                                                                             // 7072
                    }                                                                                                  // 7073
                    return 11.5 - 2.5 * (rotate / 15) * (rotate > 0 ? 1 : -1);                                         // 7074
                }                                                                                                      // 7075
                                                                                                                       // 7076
                switch (orient) {                                                                                      // 7077
                case "bottom":                                                                                         // 7078
                    {                                                                                                  // 7079
                        tickTransform = axisX;                                                                         // 7080
                        lineEnter.attr("y2", innerTickSize);                                                           // 7081
                        textEnter.attr("y", tickLength);                                                               // 7082
                        lineUpdate.attr("x1", tickX).attr("x2", tickX).attr("y2", tickSize);                           // 7083
                        textUpdate.attr("x", 0).attr("y", yForText(rotate))                                            // 7084
                            .style("text-anchor", textAnchorForText(rotate))                                           // 7085
                            .attr("transform", textTransform(rotate));                                                 // 7086
                        tspan.attr('x', 0).attr("dy", tspanDy).attr('dx', dxForText(rotate));                          // 7087
                        pathUpdate.attr("d", "M" + range[0] + "," + outerTickSize + "V0H" + range[1] + "V" + outerTickSize);
                        break;                                                                                         // 7089
                    }                                                                                                  // 7090
                case "top":                                                                                            // 7091
                    {                                                                                                  // 7092
                        // TODO: rotated tick text                                                                     // 7093
                        tickTransform = axisX;                                                                         // 7094
                        lineEnter.attr("y2", -innerTickSize);                                                          // 7095
                        textEnter.attr("y", -tickLength);                                                              // 7096
                        lineUpdate.attr("x2", 0).attr("y2", -innerTickSize);                                           // 7097
                        textUpdate.attr("x", 0).attr("y", -tickLength);                                                // 7098
                        text.style("text-anchor", "middle");                                                           // 7099
                        tspan.attr('x', 0).attr("dy", "0em");                                                          // 7100
                        pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize);
                        break;                                                                                         // 7102
                    }                                                                                                  // 7103
                case "left":                                                                                           // 7104
                    {                                                                                                  // 7105
                        tickTransform = axisY;                                                                         // 7106
                        lineEnter.attr("x2", -innerTickSize);                                                          // 7107
                        textEnter.attr("x", -tickLength);                                                              // 7108
                        lineUpdate.attr("x2", -innerTickSize).attr("y1", tickY).attr("y2", tickY);                     // 7109
                        textUpdate.attr("x", -tickLength).attr("y", tickOffset);                                       // 7110
                        text.style("text-anchor", "end");                                                              // 7111
                        tspan.attr('x', -tickLength).attr("dy", tspanDy);                                              // 7112
                        pathUpdate.attr("d", "M" + -outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + -outerTickSize);
                        break;                                                                                         // 7114
                    }                                                                                                  // 7115
                case "right":                                                                                          // 7116
                    {                                                                                                  // 7117
                        tickTransform = axisY;                                                                         // 7118
                        lineEnter.attr("x2", innerTickSize);                                                           // 7119
                        textEnter.attr("x", tickLength);                                                               // 7120
                        lineUpdate.attr("x2", innerTickSize).attr("y2", 0);                                            // 7121
                        textUpdate.attr("x", tickLength).attr("y", 0);                                                 // 7122
                        text.style("text-anchor", "start");                                                            // 7123
                        tspan.attr('x', tickLength).attr("dy", tspanDy);                                               // 7124
                        pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize);
                        break;                                                                                         // 7126
                    }                                                                                                  // 7127
                }                                                                                                      // 7128
                if (scale1.rangeBand) {                                                                                // 7129
                    var x = scale1, dx = x.rangeBand() / 2;                                                            // 7130
                    scale0 = scale1 = function (d) {                                                                   // 7131
                        return x(d) + dx;                                                                              // 7132
                    };                                                                                                 // 7133
                } else if (scale0.rangeBand) {                                                                         // 7134
                    scale0 = scale1;                                                                                   // 7135
                } else {                                                                                               // 7136
                    tickExit.call(tickTransform, scale1);                                                              // 7137
                }                                                                                                      // 7138
                tickEnter.call(tickTransform, scale0);                                                                 // 7139
                tickUpdate.call(tickTransform, scale1);                                                                // 7140
            });                                                                                                        // 7141
        }                                                                                                              // 7142
        axis.scale = function (x) {                                                                                    // 7143
            if (!arguments.length) { return scale; }                                                                   // 7144
            scale = x;                                                                                                 // 7145
            return axis;                                                                                               // 7146
        };                                                                                                             // 7147
        axis.orient = function (x) {                                                                                   // 7148
            if (!arguments.length) { return orient; }                                                                  // 7149
            orient = x in {top: 1, right: 1, bottom: 1, left: 1} ? x + "" : "bottom";                                  // 7150
            return axis;                                                                                               // 7151
        };                                                                                                             // 7152
        axis.tickFormat = function (format) {                                                                          // 7153
            if (!arguments.length) { return tickFormat; }                                                              // 7154
            tickFormat = format;                                                                                       // 7155
            return axis;                                                                                               // 7156
        };                                                                                                             // 7157
        axis.tickCentered = function (isCentered) {                                                                    // 7158
            if (!arguments.length) { return tickCentered; }                                                            // 7159
            tickCentered = isCentered;                                                                                 // 7160
            return axis;                                                                                               // 7161
        };                                                                                                             // 7162
        axis.tickOffset = function () {                                                                                // 7163
            return tickOffset;                                                                                         // 7164
        };                                                                                                             // 7165
        axis.tickInterval = function () {                                                                              // 7166
            var interval, length;                                                                                      // 7167
            if (params.isCategory) {                                                                                   // 7168
                interval = tickOffset * 2;                                                                             // 7169
            }                                                                                                          // 7170
            else {                                                                                                     // 7171
                length = axis.g.select('path.domain').node().getTotalLength() - outerTickSize * 2;                     // 7172
                interval = length / axis.g.selectAll('line').size();                                                   // 7173
            }                                                                                                          // 7174
            return interval === Infinity ? 0 : interval;                                                               // 7175
        };                                                                                                             // 7176
        axis.ticks = function () {                                                                                     // 7177
            if (!arguments.length) { return tickArguments; }                                                           // 7178
            tickArguments = arguments;                                                                                 // 7179
            return axis;                                                                                               // 7180
        };                                                                                                             // 7181
        axis.tickCulling = function (culling) {                                                                        // 7182
            if (!arguments.length) { return tickCulling; }                                                             // 7183
            tickCulling = culling;                                                                                     // 7184
            return axis;                                                                                               // 7185
        };                                                                                                             // 7186
        axis.tickValues = function (x) {                                                                               // 7187
            if (typeof x === 'function') {                                                                             // 7188
                tickValues = function () {                                                                             // 7189
                    return x(scale.domain());                                                                          // 7190
                };                                                                                                     // 7191
            }                                                                                                          // 7192
            else {                                                                                                     // 7193
                if (!arguments.length) { return tickValues; }                                                          // 7194
                tickValues = x;                                                                                        // 7195
            }                                                                                                          // 7196
            return axis;                                                                                               // 7197
        };                                                                                                             // 7198
        return axis;                                                                                                   // 7199
    }                                                                                                                  // 7200
                                                                                                                       // 7201
    c3_chart_internal_fn.isSafari = function () {                                                                      // 7202
        var ua = window.navigator.userAgent;                                                                           // 7203
        return ua.indexOf('Safari') >= 0 && ua.indexOf('Chrome') < 0;                                                  // 7204
    };                                                                                                                 // 7205
    c3_chart_internal_fn.isChrome = function () {                                                                      // 7206
        var ua = window.navigator.userAgent;                                                                           // 7207
        return ua.indexOf('Chrome') >= 0;                                                                              // 7208
    };                                                                                                                 // 7209
                                                                                                                       // 7210
    // PhantomJS doesn't have support for Function.prototype.bind, which has caused confusion. Use                     // 7211
    // this polyfill to avoid the confusion.                                                                           // 7212
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill         // 7213
                                                                                                                       // 7214
    if (!Function.prototype.bind) {                                                                                    // 7215
      Function.prototype.bind = function(oThis) {                                                                      // 7216
        if (typeof this !== 'function') {                                                                              // 7217
          // closest thing possible to the ECMAScript 5                                                                // 7218
          // internal IsCallable function                                                                              // 7219
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');                 // 7220
        }                                                                                                              // 7221
                                                                                                                       // 7222
        var aArgs   = Array.prototype.slice.call(arguments, 1),                                                        // 7223
            fToBind = this,                                                                                            // 7224
            fNOP    = function() {},                                                                                   // 7225
            fBound  = function() {                                                                                     // 7226
              return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };                                                                                                         // 7228
                                                                                                                       // 7229
        fNOP.prototype = this.prototype;                                                                               // 7230
        fBound.prototype = new fNOP();                                                                                 // 7231
                                                                                                                       // 7232
        return fBound;                                                                                                 // 7233
      };                                                                                                               // 7234
    }                                                                                                                  // 7235
                                                                                                                       // 7236
    if (typeof define === 'function' && define.amd) {                                                                  // 7237
        define("c3", ["d3"], function () { return c3; });                                                              // 7238
    } else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {                                      // 7239
        module.exports = c3;                                                                                           // 7240
    } else {                                                                                                           // 7241
        window.c3 = c3;                                                                                                // 7242
    }                                                                                                                  // 7243
                                                                                                                       // 7244
})(window);                                                                                                            // 7245
                                                                                                                       // 7246
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/perak_c3/template.template.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("c3");                                                                                            // 2
Template["c3"] = new Template("Template.c3", (function() {                                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    id: function() {                                                                                                   // 6
      return Spacebars.mustache(view.lookup("chartId"));                                                               // 7
    }                                                                                                                  // 8
  });                                                                                                                  // 9
}));                                                                                                                   // 10
                                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/perak_c3/template.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
c3charts = {};                                                                                                         // 1
                                                                                                                       // 2
Template.c3.rendered = function() {                                                                                    // 3
	var getData = function() {                                                                                            // 4
		// this.data.data.data can only exist if template has been passed a data attribute                                   // 5
		// https://github.com/perak/meteor-c3/issues/1                                                                       // 6
		var thisData = UI.getData();                                                                                         // 7
		var data;                                                                                                            // 8
		if (thisData && thisData.data && thisData.data.data) {                                                               // 9
			data = thisData.data                                                                                                // 10
			data.bindto = thisData.id ? "#"+thisData.id : "#chart"                                                              // 11
		} else {                                                                                                             // 12
			data = thisData || { data: { columns: [] }}                                                                         // 13
		}                                                                                                                    // 14
		return data;                                                                                                         // 15
	};                                                                                                                    // 16
                                                                                                                       // 17
	var data = getData() || { columns: [] };                                                                              // 18
	var chart = c3.generate(data);                                                                                        // 19
                                                                                                                       // 20
	var id = this.data.id || "chart";                                                                                     // 21
	c3charts[id] = chart;                                                                                                 // 22
                                                                                                                       // 23
	this.autorun(function (tracker) {                                                                                     // 24
		if(UI.getData()) {                                                                                                   // 25
			chart.load(getData().data || { columns: [] });                                                                      // 26
		}                                                                                                                    // 27
	});                                                                                                                   // 28
};                                                                                                                     // 29
                                                                                                                       // 30
Template.c3.destroyed = function() {                                                                                   // 31
	var id = this.data.id || "chart";                                                                                     // 32
	delete c3charts[id];                                                                                                  // 33
};                                                                                                                     // 34
                                                                                                                       // 35
Template.c3.helpers({                                                                                                  // 36
	chartId: function() {                                                                                                 // 37
		return this.id || "chart"                                                                                            // 38
	}                                                                                                                     // 39
});                                                                                                                    // 40
                                                                                                                       // 41
Template.c3.events({                                                                                                   // 42
                                                                                                                       // 43
});                                                                                                                    // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['perak:c3'] = {}, {
  c3charts: c3charts
});

})();
