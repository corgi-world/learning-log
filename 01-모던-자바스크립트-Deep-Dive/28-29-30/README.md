# Number

- 표준 빌트인 객체인 Number는 원시 타입인 숫자를 다룰 때 유용한 프로퍼티와 메서드를 제공한다. Number 객체는 생성자 함수 객체기 때문에 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.

- Number 프로퍼티

  - `Number.EPSILON` : 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이
  - `Number.MAX_VALUE` : 표현할 수 있는 가장 큰 양수 값
  - `Number.MIN_VALUE` : 표현할 수 있는 가장 작은 양수 값
  - `Number.MAX_SAFE_INTEGER` : 안전하게 표현할 수 있는 가장 큰 정수값
  - `Number.MIN_SAFE_INTEGER` : 안전하게 표현할 수 있는 가장 작은 정수값
  - `Number.POSITIVE_INFINITY` : 양의 무한대를 나타내는 숫자값 Infinity
  - `Number.NEGATIVE_INFINITY` : 음의 무한대를 나타내는 숫자값 -Infinity
  - `Number.NaN` : 숫자가 아님을 나타내는 숫자값

- Number 메서드

  - `Number.isFinite` : 정상적인 유한수인지 검사한다. Infinity 또는 -Infinity 이면 false를 반환
  - `Number.isInteger` : 정상적인 정수인지 검사한다.
  - `Number.isNaN` : NaN인지 검사한다.
  - `Number.isSafeInteger` : 안전한 정수인지 검사한다.
  - `Number.prototype.toExponential` : 숫자를 지수 표기법으로 변환하여 문자열로 반환한다.
  - `Number.prototype.toFixed(자릿수)` : 숫자를 반올림하여 문자열로 반환한다.
  - `Number.prototype.toPrecision(자릿수)` : 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다.
  - `Number.prototype.toString(진법)` : 숫자를 문자열로 변환하여 반환한다. 진법을 나타내는 2~36 사이의 정수값을 인수로 전달할 수 있다.

# Math

- 표준 빌트인 객체인 Math는 수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공한다. Math는 생성자 함수가 아니기 때문에 정적 프로퍼티와 정적 메서드만 제공한다.

- Math 프로퍼티

  - Math.PI : 원주율 PI 값을 반환한다.

- Math 메서드

  - `Math.abs` : 절대값을 반환한다.
  - `Math.round` : 소수점 이하를 반올림한 정수를 반환한다.
  - `Math.ceil` : 소수점 이하를 올림한 정수를 반환한다.
  - `Math.floor` : 소수점 이하를 내림한 정수를 반환한다.
  - `Math.sqrt` : 제곱근을 반환한다.
  - `Math.random` : 0에서 1미만의 난수를 반환한다.
  - `Math.pow(밑, 지수)` : 밑을 지수로 거듭제곱한 결과를 반환한다.
  - `Math.max` : 전달받은 인수 중 가장 큰 수를 반환한다.
  - `Math.min` : 전달받은 인수 중 가장 작은 수를 반환한다.

# Date

- 표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.

- Date 생성자 함수

  - `new Date()` : 현재 날짜와 시간을 가지는 Date 객체를 반환한다.
  - `Date()` : 현재 날짜와 시간 정보를 나타내는 문자열을 반환한다.
  - `new Date(milliseconds)` : 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.
  - `new Date(dateString)` : Date.parse 메서드에 의해 해석 가능한 형식의 문자열을 인수로 전달하면 지정된 날짜와 지정된 시간을 나타내는 Date 객체를 반환한다.
  - `new Date(연, 월[, 일, 시, 분, 초, 밀리초])` : 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

- Date 메서드

  - `Date.now`
  - `Date.parse`
  - `Date.UTC`
  - `Date.prototype.getFullYear`
  - `Date.prototype.setFullYear`
  - `Date.prototype.getMonth`
  - `Date.prototype.setMonth`
  - `Date.prototype.getDate`
  - `Date.prototype.setDate`
  - `Date.prototype.getDay`
  - `Date.prototype.setDay`
  - `Date.prototype.getHours`
  - `Date.prototype.setHours`
  - `Date.prototype.getMinutes`
  - `Date.prototype.setMinutes`
  - `Date.prototype.getSeconds`
  - `Date.prototype.setSeconds`
  - `Date.prototype.getMilliseconds`
  - `Date.prototype.setMilliseconds`
  - `Date.prototype.getTime`
  - `Date.prototype.setTime`
  - `Date.prototype.getTimezoneOffset`
  - `Date.prototype.toDateString`
  - `Date.prototype.toTimeString`
  - `Date.prototype.toISOString`
  - `Date.prototype.toLocaleString`
  - `Date.prototype.toLocaleTimeString`
