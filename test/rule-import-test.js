// rule-import-test.js
var tape = require('tape-catch'),
    _ = require('lodash'),
    utils = require('./test-utils'),
    jsdom = require('jsdom'),
    d3_selection = require('d3-selection'),
    process_control = require('../').process_control;

var sample_rule = require('./utils/sample_rule');

//var sample_data = utils.sample(_.range(1, 10));
var sample_data = _.range(1, 10);

tape('process_control matches rules that return true', function(test) {
  // emulate a browser
  var dom = new jsdom.JSDOM();
  global.document = dom.window.document;
  var sample_elems = d3_selection
                      .select(global.document.body)
                      .selectAll('p')
                      .data(sample_data)
                      .enter()
                      .append('p');

  var pc = process_control().rule({
    'always_match': sample_rule.match
  });

  sample_elems.call(pc);

  sample_elems.each(function(res, i) {
    var elem = d3_selection.select(this);
    test.ok(utils.marked(elem, 'always_match'), 'el ' + i + ' is marked');
  });
  test.end();
  delete global.document;
});


tape('process_control matches rules that return true', function(test) {
  // emulate a browser
  var dom = new jsdom.JSDOM();
  global.document = dom.window.document;
  var sample_elems = d3_selection
                      .select(global.document.body)
                      .selectAll('p')
                      .data(sample_data)
                      .enter()
                      .append('p');

  var pc = process_control().rule({
    'never_match': sample_rule.no_match
  });

  sample_elems.call(pc);

  sample_elems.each(function(res, i) {
    var elem = d3_selection.select(this);
    test.ok(utils.notMarked(elem, 'never_match'), 'el ' + i + ' is marked');
  });
  test.end();
  delete global.document;
});