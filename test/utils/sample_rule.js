// sample_rule.js
var size = 4;

// always return true
function rule_true(data) {
  return true;
}

function rule_false(data) {
  return false;
}

module.exports = {
  match: {
    size: size,
    rule: rule_true
  },
  no_match: {
    size: size,
    rule: rule_false
  }
};