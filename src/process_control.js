// nelson.js
export default process_control;
import {select as d3_select} from 'd3-selection';
import * as d3_array from 'd3-array';
import * as _ from 'lodash';

import {window_arr, mark} from './utils.js';

function process_control() {

  var mean, std, get_value, rules = {};

  function rule_checker(selection) {
    console.log('calling the rule_elem')
    // collect the values and the elements that we are operating on
    // (since we need memory to do our rule processing)
    var elems = [];
    //selection = d3_select(selection);
    selection.each(function(d, i) {
      var value = (typeof(get_value) === 'function' ? get_value(d) : get_value);
      var element = d3_select(this);
      elems.push({
        el: element,
        val: value
      });
    });

    // check to see if we need to calc mean + std
    if (!mean) {
      mean = d3_array.mean(elems, function(d) { return d.val; });
    }
    if (!std) {
      std = d3_array.deviation(elems, function(d) { return d.val; });
    }

    // alright, now that we have our data + elements lets apply each rule
    // to the necessary window sizes
    var rule_names = Object.keys(rules);
    rule_names.forEach(function(rule_name, i) {
      var rule_elem = rules[rule_name];
      var windows = window_arr(elems, rule_elem.size);
      windows.forEach(function(wind) {
        var result = rule_elem.rule(wind, mean, std);
        if (result) {
          // mark the elements in the window
          wind.forEach(function(d) {
            d = mark(d, rule_name);
          });
        }
      });
    });

    return selection;

  }

  rule_checker.mean = function(val) {
    if (!arguments.length) {
      return mean;
    }
    mean = val;
    return rule_checker;
  };

  rule_checker.std = function(val) {
    if (!arguments.length) {
      return std;
    }
    std = val;
    return rule_checker;
  };

  rule_checker.value = function(val) {
    if (!arguments.length) {
      return get_value;
    }
    get_value = val;
    return rule_checker;
  };

  rule_checker.rule = function(name, rule) {
    if (!arguments.length) {
      return rules;
    }
    if (typeof name === 'object') {
      rules = _.extend(rules, name);
    } else if (typeof name === 'string'){
      rules[name] = rule;
    }
    return rule_checker;
  };

  rule_checker.window_arr = window_arr;

  return rule_checker;
}
