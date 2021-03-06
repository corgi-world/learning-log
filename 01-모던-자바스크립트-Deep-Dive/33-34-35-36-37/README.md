# 7번째 데이터 타입 Symbol

- 심벌 값은 Symbol 함수를 호출하여 생성해야 한다. 이때 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없으며, 다른 값과 절대 중복되지 않는 유일무이한 값이다.

# 이터러블

- 이터러블은 for ... of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

  - Array, String, Map, Set, TypedArray, arguments, DOM 컬렉션

- for ... of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당한다.

# 스프레드 문법

- 스프레드 문법은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다.

  ```javascript
  const arr = [1, 2, 3];
  const max = Math.max(...arr);
  console.log(max); // 3
  ```

# 디스트럭처링 할당

- 디스트럭처링 할당은 구조화된 배열과 이터러블 또는 객체를 비구조화하여 1개 이상의 변수에 개별적으로 할당하는 것을 말한다.

  ```javascript
  const arr = [1, 2, 3];
  const [one, two, three] = arr;
  console.log(one, two, three); // 1 2 3
  ```

  ```javascript
  const obj = { a: 100, b: 200 };
  const { a, b } = obj;
  console.log(a, b); // 100 200
  ```

# Set과 Map

- Set 객체는 중복되지 않는 유일한 값들의 집합이다. 배열과 유사하지만 다음과 같은 차이가 있다.

  - |                 구분                 | 배열 | Set |
    | :----------------------------------: | :--: | :-: |
    | 동일한 값을 중복하여 포함할 수 있다. |  O   |  X  |
    |       요소 순서에 의미가 있다.       |  O   |  X  |
    |   인덱스로 요소에 접근할 수 있다.    |  O   |  X  |

- Set 프로퍼티

  - `Set.prototype.size`

- Set 메서드

  - `Set.prototype.add`
  - `Set.prototype.has`
  - `Set.prototype.delete`
  - `Set.prototype.clear`
  - `Set.prototype.forEach`

- Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다. 객체와 유사하지만 다음과 같은 차이가 있다.

  - |          구분          |          객체           |          Map          |
    | :--------------------: | :---------------------: | :-------------------: |
    | 키로 사용할 수 있는 값 |   문자열 또는 심벌 값   | 객체를 포함한 모든 값 |
    |        이터러블        |            X            |           O           |
    |     요소 개수 확인     | Object.keys(obj).length |       map.size        |

- Map 프로퍼티

  - `Map.prototype.size`

- Map 메서드

  - `Map.prototype.set`
  - `Map.prototype.get`
  - `Map.prototype.has`
  - `Map.prototype.delete`
  - `Map.prototype.clear`
  - `Map.prototype.forEach`
  - `Map.prototype.keys`
  - `Map.prototype.values`
  - `Map.prototype.entries`
