# RegExp

- 정규 표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어로 문자열을 대상으로 패턴 매칭 기능을 제공한다.

- `RegExp.prototype.test(string)` : 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 결과를 불리언 값으로 반환한다.
- `String.prototype.match(regExp)` : 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.

- 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.

  - | 플래그 |                      설명                      |
    | :----: | :--------------------------------------------: |
    |   i    |   대소문자를 구별하지 않고 패턴을 검색한다.    |
    |   g    |    패턴과 일치하는 모든 문자열을 검색한다.     |
    |   m    | 문자열의 행이 바뀌더라도 패턴 검색을 계속한다. |

- 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용한다.

  - 문자열 검색

    ```javascript
    const target = "Is this all there is?";
    const regExp = /is/gi;

    console.log(target.match(regExp)); // [ 'Is', 'is', 'is' ]
    console.log(regExp.test(target)); // true
    ```

  - 임의의 문자열 검색 : .은 임의의 문자 한 개를 의미한다.

    ```javascript
    const target = "Is this all there is?";
    const regExp = /.../g;

    console.log(target.match(regExp)); // ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
    ```

  - 반복 검색 : {m,n}은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.

    ```javascript
    const target = "A AA B BB Aa Bb AAA";
    const regExp = /A{1,2}/g;
    // {n} : {n, n}
    // {n,} : 최소 n번 이상
    // + : 최소 1번 이상

    console.log(target.match(regExp)); // [ 'A', 'AA', 'A', 'AA', 'A' ]
    ```

  - OR 검색

    ```javascript
    const target = "A AA B BB Aa Bb AAA";
    const regExp = /A|B/g;
    // const regExp = /[AB]/g;

    console.log(target.match(regExp)); // ["A", "A", "A", "B", "B", "B", "A", "B", "A", "A", "A"]
    ```

  - NOT 검색 : [] 내의 ^은 not의 의미를 갖는다.

    ```javascript
    const target = "A B C D E";
    const regExp = /[^A^ ]/g;

    console.log(target.match(regExp)); // [ 'B', 'C', 'D', 'E' ]
    ```

  - 시작 위치로 검색 : [] 밖의 ^은 문자열의 시작을 의미한다.

    ```javascript
    const target = "https://poiemaweb.com";
    const regExp = /^https/;

    console.log(regExp.test(target)); // true
    ```

  - 마지막 위치로 검색

    ```javascript
    const target = "https://poiemaweb.com";
    const regExp = /com$/;

    console.log(regExp.test(target)); // true
    ```

# String

- 표준 빌트인 객체인 String은 원시 타입인 문자열을 다룰 때 유용한 프로퍼티와 메서드를 제공한다. String 객체는 생성자 함수 객체기 때문에 String 인스턴스를 생성할 수 있다.

- 문자열은 변경 불가능한 원시 값이기 때문에 String 래퍼 객체도 읽기 전용 객체로 제공된다. 따라서 String 객체의 메서드는 언제나 새로운 문자열을 반환한다.

- String 메서드

  - `String.prototype.indexOf`
  - `String.prototype.search`
  - `String.prototype.includes`
  - `String.prototype.startsWith`
  - `String.prototype.charAt`
  - `String.prototype.substring`
  - `String.prototype.slice`
  - `String.prototype.toUpperCase`
  - `String.prototype.toLowerCase`
  - `String.prototype.trim`
  - `String.prototype.repeat`
  - `String.prototype.replace`
  - `String.prototype.split`
