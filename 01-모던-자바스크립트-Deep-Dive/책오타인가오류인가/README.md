## let 일시적 사각지대 에러 문구

<image src="./images/let-tdz-book.png" width="80%" />

let 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다. 즉, 위의 코드에서 foo 변수는 자바스크립트 엔진에 의해 **호이스팅** 되었다. 하지만 foo 변수를 **초기화** 하기 전에 console.log 함수로 참조하였으므로 ```foo is not defined``` 에러가 아닌 ```Cannot access 'foo' before initialization``` 에러가 발생한다.

<image src="./images/let-tdz-vscode.png" width="50%" />

확인