# 브라우저의 렌더링 과정

- 브라우저는 다음과 같은 과정을 거쳐 렌더링을 수행한다.

  1. 브라우저는 HTML, CSS, JS, 이미지, 폰트 파일 등 렌더링에 필요한 리소스를 요청하고 서버로부터 응답 받는다.
  2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하고 이들을 결합하여 렌더 트리를 생성한다.
  3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST를 생성하고 바이트 코드로 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있다. 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합된다.
  4. 렌더 트리를 기반으로 HTML 요소의 레이아웃을 계산하고 브라우저 화면에 HTML 요소를 페인팅한다.

- 브라우저의 주소창에 URL을 입력하고 엔터 키를 누르면 URL의 호스트 이름이 DNS를 통해 IP 주소로 변환되고 이 IP 주소를 갖는 서버에게 요청을 전송한다.

- 일반적으로 서버는 루트 요청에 대해 암묵적으로 index.html을 응답하도록 기본 설정되어 있다. 따라서 서버는 루트 요청에 대해 서버의 루트 폴더에 존재하는 정적 파일 index.html을 브라우저(클라이언트)로 응답한다.

- HTTP/1.1은 기본적으로 커넥션당 하나의 요청과 응답만 처리한다. 즉, 여러 개의 요청을 한 번에 전송할 수 없고 응답 또한 마찬가지다. 따라서 HTML 문서 내에 포함된 여러 개의 리소스 요청이 개별적으로 전송되고 응답 또한 개별적으로 전송된다. 이처럼 HTTP/1.1은 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답 시간도 증가하는 단점이 있다.

- HTTP/2 커넥션당 여러 개의 요청과 응답, 즉 다중 요청/응답이 가능하다. 따라서 여러 리소스의 동시 전송이 가능하므로 HTTP/1.1에 비해 페이지 로드 속도가 약 50% 정도 빠르다고 알려져 있다.

- DOM이나 CSSOM을 변겨하는 DOM API가 사용된 경우 DOM이나 CSSOM이 변경된다. 이때 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더 트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저의 화면에 다시 렌더링한다.

  - 리플로우 : 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생한 경우에 한하여 실행된다.
  - 리페인트 : 재결합된 렌더 트리를 기반으로 다시 페인트 하는 것을 말한다.

- 브라우저는 동기적으로 위에서 아래 방향으로 HTML, CSS, 자바스크립트를 파싱하고 실행한다. 만약 script 태그가 HTML 파싱이 완료되기 전에 위치한다면, 자바스크립트를 파싱하고 실행 이전까지 HTML 파싱이 중단된다.

- script 태그의 async/defer 어트리뷰트

  - HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.

  - async : 자바스크립트의 파싱과 실행은 파일의 로드가 완료된 직후 진행되며, 이때 HTML 파시이 중단된다. 여러 개의 script 태그에 async 어트리뷰트를 지정하면 태그의 순서와 상관없이 로드가 완료된다.
  - defer : 자바스크립트의 파싱과 실행은 HTML 파싱이 완료된 직후 진행된다.

# DOM

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조다.

- DOM은 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공한다. 이를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.

  - | 프로토타입을 제공하는 객체 |         input 요소 노드 객체의 특성         |
    | :------------------------: | :-----------------------------------------: |
    |           Object           |                    객체                     |
    |        EventTarget         |          이벤트를 발생시키는 객체           |
    |            Node            |          트리 자료구조의 노드 객체          |
    |          Element           |     웹 문서의 요소(HTML, XML, SVG) 객체     |
    |        HTMLElement         | 웹 문서의 요소 중 HTML 요소를 표현하는 객체 |
    |      HTMLInputElement      |   HTML 요소 중 input 요소를 표현하는 객체   |

- HTMLCollection vs NodeList

  - HTMLCollection

    - getElementsByTagName, getElementsByClassName 메서드가 반환한다.
    - 노드 객체의 상태 변화를 실시간으로 반영한다.

  - NodeList

    - querySelectorAll 메서드가 반환한다.
    - 노드 객체의 상태 변화를 실시간으로 반영하지 않는다.
      - childeNodes 프로퍼티가 반환하는 NodeList는 상태 변화가 실시간으로 반영된다.

- HTML 어트리뷰트 vs DOM 프로퍼티

  - 어트리뷰트 노드는 요소 노드의 **초기 상태**를 관리하며, **최신 상태**는 DOM 프로퍼티가 관리한다.
  - 초기 상태가 필요한 이유는 새로고침 했을 때 초기 상태 값으로 돌아가기 위해서!
