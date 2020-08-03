test('test common matcher', () => {
    expect( 2 + 3 ).toBe(5)
    expect( 2 + 3 ).not.toBe(3)
})

test('test to be true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy();
})

test('test number', () => {
    expect(3).toBeGreaterThan(2);
    expect(3).toBeLessThan(4);
})

test('test object', () => {
    expect({name: 'sky'}).toEqual({name: 'sky'});
})