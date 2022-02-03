
class StatsD {
    options;
    counters = new Map();
    gauges = new Map();
    history = [];

    constructor(options) {
        this.options = options;
    }

    inc(key) {
        if (!this.counters.has(key)) {
            this.counters.set(key, 1);
        } else {
            this.counters.set(key, this.counters.get(key) + 1);
        }
    }

    dec(key) {
        if (!this.counters.has(key)) {
            this.counters.set(key, -1);
        } else {
            this.counters.set(key, this.counters.get(key) - 1);
        }
    }

    gauge(key) {
        // TODO: track sum, count, min, max, historgram?

    }

    flush() {
        this.history.push({ counters: this.counters, gauges: this.gauges });
        // TODO: Clean history at some point
        this.counters = new Map();
        this.gauges = new Map();
    }
}


module.exports.statsd = (options) => new StatsD(options);
