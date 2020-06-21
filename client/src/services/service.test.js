import {formatDate} from "./service";

test('Date should be formed(yyyy/mm/dd) 2010-02-03', function () {
    const date = new Date(2010, 2, 3)
    expect(formatDate(date)).toBe('2010-03-03');
});