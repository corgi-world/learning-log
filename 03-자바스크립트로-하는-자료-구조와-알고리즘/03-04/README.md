# 숫자

* 정수 처리
    
    * ```Math.floor``` 가장 가까운 정수로 내림한다.
    * ```Math.round``` 가장 가까운 정수로 반올림한다.
    * ```Math.ceil``` 가장 가까운 정수로 올림한다.

        ```javascript
        Math.floor(0.9);    // 0
        Math.floor(1.1);    // 1

        Math.round(0.49);   // 0
        Math.round(0.5);    // 1

        Math.ceil(2.9);     // 3
        Math.ceil(0.1);     // 1
        ```

* ```Number.EPSILON``` 두 개의 표현 가능한 숫자 사이의 가장 작은 간격을 반환한다. 분수가 제대로 표현되지 않는 문제를 해결하는데 유용하다.

    ```javascript
    function numberEquals(x, y) {
        return Math.abs(x - y) < Number.EPSILON;
    }
    numberEquals(0.1 + 0.2, 0.3); // true
    ```

* 최대, 최소, 무한 표현
    * ```Number.MAX_SAFE_INTEGER``` 가장 큰 정수를 반환한다. (9007199254740991)
    * ```Number.MAX_VALUE``` 가장 큰 부동 소수점을 반환한다. (1.7976931348623157e+308)
    * ```Number.MIN_SAFE_INTEGER``` 가장 작은 정수를 반환한다. (-9007199254740991)
    * ```Number.MIN_VALUE``` 음수가 아닌 0에 가장 가까운 부동소수점을 반환한다. (5e-324)
    * ```-Infinity``` < ```Number.MIN_SAFE_INTEGER``` < ```0``` 
    * ```0``` < ```Number.MIN_VALUE``` < ```Number.MAX_SAFE_INTEGER``` < ```Number.MAX_VALUE``` < ```Infinity```

* 무작위 수 생성
    * ```Math.random()``` 0과 1 사이의 부동소수점을 반환한다.

        ```javascript
        Math.random() * 100;        // 0부터 100까지의 부동소수점
        Math.random() * 100 + 5;    // 5부터 105까지의 부동소수점
        Math.random() * 100 - 10;   // -10부터 90까지의 부동소수점

        Math.round(Math.random() * 100 + 5); // 5부터 105까지의 정수
        ```

# 문자열

* 문자열 접근
    * ```.charAt(index)``` 0부터 시작하는 인덱스를 입력 값으로 받고 문자열의 해당 인덱스 위치에 있는 문자를 반환한다.
    * ```.substring(startIndex, endIndex)``` 지정된 인덱스 사이의 문자들을 반환한다. endIndex를 생략하면 마지막 문자열까지 반환한다.

        ```javascript
        'dog'.charAt(0);            // o

        'YouTube'.substring(1, 2);  // o
        'YouTube'.substring(3, 7);  // tube
        'YouTube'.substring(1);     // ouTube
        ```

* 문자열 비교
    * ```<, >``` 연산자를 사용하여 문자열의 대소 비교를 할 수 있다. 결과는 아스키코드표의 대소 관계이며 두 문자열 중 짧은 문자열의 길이만큼까지 비교한다.

        ```javascript
        console.log('a' < 'b');     // true
        console.log('add' < 'b');   // true
        console.log('A' < 'a');     // true
        ```

* 문자열 검색
    * ```.indexOf(searchValue, fromIndex)``` 검색하고자 하는 문자열과 선택적으로 검색 시작 인덱스를 지정하는 매개변수를 받는다. 일치하는 문자열의 위치를 반환하고 일치하는 문자열을 발견하지 못한 경우 -1을 반환한다.

        ```javascript
        'Hello World'.indexOf('World'); // 6
        'Hello World'.indexOf('world'); // -1

        'Hello Hello'.indexOf('H', 0);  // 0
        'Hello Hello'.indexOf('H', 1);  // 6
        ```

        ```javascript
        /* 어떤 문자열 내에 특정 문자열이 존재하는지 확인하기 */
        function existsInString(stringValue, search) {
            return stringValue.indexOf(search) !== -1;
        }
        
        existsInString('red', 'r'); // true
        existsInString('red', 'a'); // false
        ```

        ```javascript
        /* 어떤 문자열 내에 특정 문자들이 몇 번 등장하는지 세기 */
        var str = "He's my king from this day untill his last day";
        var count = 0;
        var pos = str.indexOf('a');

        while(pos != -1) {
            pos = str.indexOf('a', pos + 1);
            count += 1;
        }
        ```

    * ```.startsWith(str)``` ```.endsWith(str)``` 문자열이 특정 입력으로 시작하거나 끝나면 true를, 아니면 false를 반환한다.

        ```javascript
        'Hello World'.startsWith('Hello'); // true
        'Hello World'.endsWith('world');   // true
        ```

* 문자열 분해
    * ```.split(separator)``` 하나의 매개변수(분리자)를 입력받아 부분 문자열 배열을 생성한다. 빈 분리자를 전달하면 문자열 내 모든 문자로 구성된 배열이 생성된다.

        ```javascript
        var test1 = 'chicken,noodle,soup,broth';
        test1.split(','); // ['chicken', 'noodle', 'soup', 'broth']

        var test2 = 'chicken';
        test2.split('');  // ['c', 'h', 'i', 'c', 'k', 'e', 'n']
        ```

* 문자열 바꾸기
    * ```.replace(string, replaceString)``` 문자열 변수 내에 특정 문자열을 다른 문자열로 대체한다.

        ```javascript
        "Wizard of Oz".replace('Wizard', 'Witch'); // Witch of Oz
        ```