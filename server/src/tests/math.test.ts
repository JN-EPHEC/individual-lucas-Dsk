import { calculateShipping } from '../utils/shipping';

// -----------------------
// DONNÉES DE TEST
// -----------------------

const testCases = [
  [10, 5, 'standard', 10],
  [50, 5, 'standard', 10],
  [100, 5, 'standard', 25],
  [500, 5, 'standard', 25],
  [600, 5, 'standard', 50],
  [100, 20, 'standard', 37.5],
  [10, 5, 'express', 20],
  [100, 20, 'express', 75],
];

const errorCases = [
  [-10, 5, 'standard', 'Invalid distance'],
  [10, 0, 'standard', 'Invalid weight'],
  [10, 51, 'standard', 'Invalid weight'],
];

// -----------------------
// TESTS
// -----------------------

describe('calculateShipping - cas valides', () => {
  test.each(testCases)(
    'distance=%i, weight=%i, type=%s → %f',
    (distance, weight, type, expected) => {
      expect(calculateShipping(distance, weight, type)).toBe(expected);
    }
  );
});

describe('calculateShipping - erreurs', () => {
  test.each(errorCases)(
    'distance=%i, weight=%i → erreur %s',
    (distance, weight, type, errorMessage) => {
      expect(() => calculateShipping(distance, weight, type))
        .toThrow(errorMessage);
    }
  );
});