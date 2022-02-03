const test = require('tape');
const { statsd } = require('./');

test('counters work', async t => {
    const s = statsd();
    t.deepEqual(s.history, []);

    s.inc('inc-once');
    s.dec('dec-once');
    s.inc('inc-twice');
    s.inc('inc-twice');
    s.dec('dec-twice');
    s.dec('dec-twice');
    s.flush();

    t.deepEqual(s.history, [{
        counters: new Map([
            ['inc-once', 1],
            ['dec-once', -1],
            ['inc-twice', 2],
            ['dec-twice', -2],
        ]),
        gauges: new Map(),
    }]);
});
