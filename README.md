# d3-process-control
[![build status](https://travis-ci.org/kiernanmcgowan/d3-process-control.svg)](https://travis-ci.org/kiernanmcgowan/d3-process-control)
d3 utility to apply [nelsons rules](https://en.wikipedia.org/wiki/Nelson_rules) of process control to a set of data.

## Installing

If you use NPM, `npm install d3-process-control`. Otherwise, download the [latest release](https://github.com/kiernanmcgowan/d3-process-control/releases/latest).

## API Example

```js
var data = [{
  name: 'foo',
  val: 3
} ...];

var control = d3.d3_process_control()
  .std(5)
  .mean(1)
  .rule({
    'gt_one_std': {
      size: 1,
      rule: function(data, mean, std) {
        // data is an array of size (1 in this case)
        // returning true marks the data point with the attribute gt_one_std
        return (data[0] - mean) > std;
      }
    }
  })
  .value(function(d) { return d.val; });

svg.selectAll('rect')
  .data(data)
  .enter()
  ...
  .call(control);
```

License
---

MIT