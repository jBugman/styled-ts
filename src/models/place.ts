import * as R from 'ramda';

export interface Place {
  city_iata?: string;
  city?: string;
  country: string;
  iata: string;
  name: string;
  type: 'airport' | 'city';
  //
  nested: boolean;
}

export const placeDescription = ({ country, name }: Place): string => `${name}, ${country}`

/* Grouping airports and cities by city */

const groupKey = (x: Place): string => R.propOr(
  R.prop('iata', x),
  'city_iata',
  x)

const groupKeyComparator = (a: Place, b: Place) => groupKey(a) === groupKey(b)

const typeComparator = R.descend(R.prop('type'))

const tagNested = (groupSize: number, places: Place[]): Place[] =>
  R.map(p =>
    R.assoc('nested',
      groupSize > 1 && R.propEq('type', 'airport', p),
      p),
    places)

// @ts-ignore For some reason ts fails to typecheck R.flatten
const flatten = (groups: Place[][]): Place[] => R.flatten(groups)

export const groupByCity = (places: Place[]): Place[] => R.pipe(
  R.groupWith(groupKeyComparator), // group by city
  R.map(R.sort(typeComparator)), // place cities first
  R.map((group: Place[]) => tagNested(R.length(group), group)), // tag airports inside non-singleton groups as nested
  flatten
)(places)
