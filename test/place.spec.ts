import * as R from 'ramda';

import { Place, groupByCity } from '../src/models/place';

const response1 = require('./test_response.json');
const response2 = require('./test_response_2.json');

test('should correctly nest already sorted response', () => {
    const places = groupByCity(response1);
    expect(places).toHaveLength(response1.length);
    // @ts-ignore typing for `props` is incorrect
    const nestings = R.map(R.props(['iata', 'nested']), places);
    expect(nestings).toEqual([
        ["LON", false], ["STN", true], ["LGW", true], ["LCY", true], ["LHR", true],
        ["LTN", true], ["KWE", false], ["SEN", false], ["BQH", false], ["LDZ", false]
    ]);
})

test('should correctly group unsorted response', () => {
    const places = groupByCity(response2);
    expect(places).toHaveLength(response2.length);
    const codes = R.map(R.prop('iata'), places);
    expect(codes).toEqual(
        ["MOW", "DME", "VKO", "SVO", "MSU", "CRD", "PUW", "MWH"]
    );
})

