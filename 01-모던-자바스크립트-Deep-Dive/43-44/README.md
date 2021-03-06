# Ajax

- Ajax란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 말한다.

- `JSON.stringify` : 객체를 JSON 포맷의 문자열로 변환한다.

- `JSON.parse` : JSON 포맷의 문자열을 객체로 변환한다.

- XMLHttpRequest

  ```javascript
  const xhr = XMLHttpRequest();

  xhr.open("GET", "url");
  // xhr.open("POST", "url");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send();
  // xhr.send(JSON.stringify({ }));

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
    } else {
      console.err("Error", xhr.status, xhr.statusText);
    }
  };
  ```

# REST API

- REST에서 가장 중요한 기본적인 원칙은 두 가지다. URI는 리소스를 표현하는 데 집중하고 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것이 RESTful API를 설계하는 중심 규칙이다.

  1. URI는 리소스를 표현해야 한다.

     ```javascript
     // bad
     GET "/getTodos/1";
     GET "/todos/show/1";

     // good
     GET "/todos/1";
     ```

  2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.

     ```javascript
     // bad
     GET "/todos/delete/1";

     // good
     DELETE "/todos/1";
     ```
