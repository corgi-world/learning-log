# 4장 CSS 개요

## 외부 파일 선언

* HTML에서 CSS파일을 읽어오는 방법
    ```html
    <head>
        <link rel="stylesheet" href="/css/main.css">
    </head>
    ```

* CSS에서 CSS파일을 읽어오는 방법
    ```css
    @import url("./common.css");
    ```

## 기본 선택자

* 전체 선택자
    ```css
    * {
        color: red;
    }
    ```

* 태그 선택자
    ```css
    li {
        color: red;
    }
    ```

* 클래스 선택자
    ```css
    .orange {
        color: red;
    }
    ```

* 아이디 선택자
    ```css
    #orange {
        color: red;
    }
    ```

## 복합 선택자

* 일치 선택자 : ```EF``` E와 F를 동시에 만족하는 요소를 선택
    ```css
    span.orange {
        color: red;
    }
    ```

* 자식 선택자 : ```E > F``` E의 자식요소 F를 선택
    ```css
    ul > .orange {
        color: red;
    }
    ```

* 후손(하위) 선택자 : ```E F``` E의 후손(하위) 요소 F를 선택. 자식 선택자와 유사하지만 후손(하위)는 자식의 자식까지 선택한다. (자식 선택자는 딱 본인 자식만 선택)
    ``` css
    div .orange {
        color: red;
    }
    ```

* 인접 형제 선택자 : ```E + F``` E의 바로 다음 형제 요소 F 하나만 선택
    ``` css
    .orange + li {
        color: red;
    }
    ```

* 일반 형제 선택자 : ```E ~ F``` E의 다음 형제 요소 F 모두 선택. (이전 형제 요소는 선택하지 않는다.)
    ``` css
    .orange ~ li {
        color: red;
    }
    ```

## 상속
특정 속성(대부분 텍스트에 지정하는)은 부모, 조상 요소에 지정하는 것만 가지고도 모든 하위 요소들에도 적용된다.

* 강제 상속 : 상속되지 않는 속성 값에 inherit 이라는 값을 사용하여 '부모'에서 '자식'으로 강제 상속시킬 수 있다. '자식'을 제외한 '후손'에게는 적용되지 않으며, 모든 속성이 강제 상속을 사용할 수 있는 것은 아니다.
<br />
    ```html
    <div class="parent">
        <div class="child"></div>
    </div>
    ```
    ```css
    .parent {
        position: absolute;
    }
    .child {
        position: inherit;
    }
    ```

## 우선순위

1. !important가 적용된 선언 방식은 가장 우선
    ```color: red !important;```
2. 인라인 선언 방식 (1,000)
3. 아이디 선택자 (100)
4. 클래스 선택자 (10)
5. 태그 선택자 (1)
6. 전체 선택자 (0)
7. 상속 (점수 계산 안함)

## 가상클래스 선택자
요소들의 상태에 따라 특정 요소를 선택

* hover : ```E:hover``` E에 마우스가 올라가 있는 동안에만 E를 선택
    ```css
    a:hover {
        font-weight: bold;
    }
    ```

* active : ```E:active``` E를 마우스로 클릭하는 동안에만 E를 선택
    ```css
    .box:active {
        width: 200px;
    }
    ```

* focus : ```E:focus``` E가 포커스 된 동안에만 E를 선택. 대화형 콘텐츠에서 사용 가능하다.
    ```css
    input:focus {
        border-color: red;
    }
    ```

* first-child : ```E:first-child``` E가 형제 요소 중 첫번째 요소라면 선택
* last-child : ```E:last-child``` E가 형제 요소 중 마지막 요소라면 선택
    ```css
    .fruits li:first-child {
        color: red;
    }
    .fruits li:last-child {
        color: yellow;
    }
    ```
    ```html
    <ul class="fruits">
        <li>딸기</li>
        <li>사과</li>
        <li>오렌지</li>
        <li>망고</li>
    </ul>
    ```

* nth-child : ```E:nth-child(n)``` E가 형제 요소 중 n번째 요소라면 선택. n+3(3번 째 이후 요소), 2n(짝수 번 째 요소) 등과 같이도 사용할 수 있다.
    ```css
    .fruits li:nth-child(2) {
        color: red;
    }
    ```

* xxx-child 선택자로 형제 요소 중 요소의 타입과 관계없이 순서만 맞는 요소를 선택하려면, E를 생략하여 사용하면 된다.
    ```css
    .box-group :first-child {
        color: red;
    }
    ```

* nth-of-type : ```E:nth-of-type(n)``` E의 타입과 동일한 타입인 형제 요소 중 E가 n번째 요소라면 선택
    ```css
    .fruits p:nth-of-type(1) {
        color: red;
    }
    ```

* not : ```E:not(S)``` S가 아닌 E선택
    ```css
    .fruits li:not(.strawberry) {
        color: red;
    }
    ```

## 가상 요소 선택자
CSS를 통해 HTML에 가상의 요소를 생성해서 제공할 수 있다. before와 after에는 content라는 속성이 필수로 요구되고, 내부에 작성한 CSS는 추가한 요소에만 적용된다.

* before : ```E::before``` E요소 내부의 앞에, 가상 요소를 삽입
    ```css
    ul li::before {
        content: "숫자";
        color: red;
    }
    ```

* after : ```E::after``` E요소 내부의 뒤에, 가상 요소를 삽입
    ```css
    ul li::after {
        content: url("images/logo.png");
    }
    ```

## 속성 선택자
HTML의 속성을 선택

* attr : ```[attr]``` 속성 attr을 포함한 요소를 선택
    ```css
    [disabled] {
        opacity: 0.2;
    }
    ```
    ```css
    [type="password"] {
        color: red;
    }
    ```

* attr^=value : ```[attr^=value]``` 속성 attr을 포함하며 속성 값이 value로 시작하는 요소를 선택

* attr$=value : ```[attr$=value]``` 속성 attr을 포함하며 속성 값이 value로 끝나는 요소를 선택
    ```css
    [class^="btn-"] {
        font-weight: bold;
    }
    [class$="success"] {
        color: green;
    }
    ```

## CSS 초기화
모든 브라우저에서 동일하게 출력되게 하기 위해 기본으로 적용되어 있는 style을 초기화 한다.

reset-css cdn : https://www.jsdelivr.com/package/npm/reset-css

## 단위

* % : 부모 요소 size의 비율
* em : 자기 자신의 font-size의 배수
* rem : html태그의 font-size의 배수
* vw(viewport width) : viewport 넓이의 비율(0~100)
* vh(viewport height) : viewport 높이의 비율(0~100)
* vmin(viewport min) : viewport의 넓이와 높이 중 작은 것의 비율(0~100)
* vmax(viewport max) : viewport의 넓이와 높이 중 큰 것의 비율(0~100)

## 참고
HTML, CSS 돌려보기 : https://codepen.io/pen/

Emmet 문법 : https://velog.io/@aepee/Emmet-%EC%82%AC%EC%9A%A9%EB%B2%95