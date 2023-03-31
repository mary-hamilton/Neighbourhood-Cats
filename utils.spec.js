import {
    checkImageValidity,
    checkColourValidity,
    checkFluffinessValidity,
    checkNameValidity,
    isEmpty,
    onlyLetters,
    outOfTen,
    under50kb
} from "./utils.js";

// Is Empty
describe('isEmpty', () => {

    // Contain each test case for a function in a 'test' block
    test('returns true for undefined', () => {
        const result = isEmpty(undefined);
        expect(result).toEqual(true)
    });

    test('returns true for null', () => {
        const result = isEmpty(null);
        expect(result).toEqual(true)
    });

    test('returns true for empty', () => {
        const result = isEmpty("");
        expect(result).toEqual(true)
    });

    test('returns false for non-empty string', () => {
        const result = isEmpty("afsgd");
        expect(result).toEqual(false)
    });

});

// Only Letters
describe('onlyLetters', () => {

    // Contain each test case for a function in a 'test' block
    test('returns true for only letters', () => {
        const result = onlyLetters("abcABC");
        expect(result).toEqual(true)
    });

    test('returns false for empty', () => {
        const result = onlyLetters("");
        expect(result).toEqual(false)
    });

    test('returns false for letters and numbers', () => {
        const result = onlyLetters("abc123");
        expect(result).toEqual(false)
    });

    test('returns false for non-letter characters', () => {
        const result = onlyLetters("!@£$%     ");
        expect(result).toEqual(false)
    });

});

// Out of ten
describe('Out of ten', () => {
    test('returns false for over 10', () => {
        const result = outOfTen("11");
        expect(result).toEqual(false);
    })

    test('returns true for under 10', () => {
        const result = outOfTen("9");
        expect(result).toEqual(true);
    })

    test('returns true for 10', () => {
        const result = outOfTen("10");
        expect(result).toEqual(true);
    })

    test('returns false for negative number', () => {
        const result = outOfTen("-1");
        expect(result).toEqual(false);
    })
})

// Under 50kb
describe('Under 50kb', () => {
    test('returns false for over 50000', () => {
        const result = under50kb("50001");
        expect(result).toEqual(false);
    })

    test('returns true for under 50000', () => {
        const result = under50kb("49999");
        expect(result).toEqual(true);
    })

    test('returns true for 50000', () => {
        const result = under50kb("50000");
        expect(result).toEqual(true);
    })

    test('returns false for negative number', () => {
        const result = under50kb("-1");
        expect(result).toEqual(false);
    })

})

// Name validate

describe('Check name validity', () => {
    test('returns false for letters and numbers', () => {
        const result = checkNameValidity("Abcd1", [{name: 'Simon'}, {name: 'Phil'}, {name: 'Bob'}]);
        expect(result.length === 0).toEqual(false);
    })

    test('returns false for previously used name', () => {
        const result = checkNameValidity("Phil", [{name: 'Simon'}, {name: 'Phil'}, {name: 'Bob'}]);
        expect(result.length === 0).toEqual(false);
    })

    test('returns false for empty', () => {
        const result = checkNameValidity("", [{name: 'Simon'}, {name: 'Phil'}, {name: 'Bob'}]);
        expect(result.length === 0).toEqual(false);
    })

    test('returns true for unique name letters only', () => {
        const result = checkNameValidity("Andy", [{name: 'Simon'}, {name: 'Phil'}, {name: 'Bob'}]);
        expect(result.length === 0).toEqual(true);
    })

    test('returns true for unique name letters only', () => {
        const result = checkNameValidity("Andy", [{name: 'Simon'}, {name: 'Phil'}, {name: 'Bob'}]);
        expect(result.length === 0).toEqual(true);
    })

    test('returns false for same name different case', () => {
        const result = checkNameValidity("siMon", [{name: 'Simon'}, {name: 'Phil'}, {name: 'Bob'}]);
        expect(result.length === 0).toEqual(false);
    })
})

// Coat colour validate

describe('Check colour validity', () => {
    test('returns false for letters and numbers', () => {
        const result = checkColourValidity("Abcd1" );
        expect(result.length === 0).toEqual(false);
    })
    test('returns false for empty', () => {
        const result = checkColourValidity("" );
        expect(result.length === 0).toEqual(false);
    })
    test('returns true for letters', () => {
        const result = checkColourValidity("Abcdef" );
        expect(result.length === 0).toEqual(true);
    })
})

// Fluffiness validate

describe('Check fluffiness validity', () => {
    test('returns false for empty', () => {
        const result = checkFluffinessValidity("");
        expect(result.length === 0).toEqual(false);
    })
    test('returns false for string', () => {
        const result = checkFluffinessValidity("abdABC");
        expect(result.length === 0).toEqual(false);
    })
    test('returns true for number between 1 and 10', () => {
        const result = checkFluffinessValidity("5");
        expect(result.length === 0).toEqual(true);
    })
})

// Image validity

describe('Check image validity', () => {
    test('returns false for over 50kb', () => {
        const result = checkImageValidity(50001);
        expect(result.length === 0).toEqual(false);
    })
    test('returns true for under 50kb', () => {
        const result = checkImageValidity(49999);
        expect(result.length === 0).toEqual(false);
    })
})






