# 3장 HTML 요소

## 시맨틱(Semantic) 태그
시맨틱 태그란 고유한 의미를 가지는 태그로, 문서의 구조와 의미를 브라우저와 개발자 모두에게 명확하게 설명할 수 있다는 장점이 있다.

* header : 소개나 탐색을 돕는 것의 그룹을 나타내는 태그. 일반적으로 로고, 메뉴, 검색 바, 로그인, 회원가입 등의 content들이 존재한다.

* footer : 사이트 하단에 저작권, 회사 정보 등의 그룹을 나타내는 태그

* h : 6단계의 사이즈로 문서 제목을 구현할 때 사용하는 태그. 숫자가 작을수록 글자 크기가 크고 높은 단계이다. 각 단계는 문서의 주제를 구분하는 것이므로, 글자 크기 때문에 단계를 낮추어 사용해서는 안된다. 글자 크기는 CSS의 font-size 속성을 사용하여 수정할 수 있다.

* main : 문서 내부의 핵심적인 주제를 나타낼 때 사용하는 태그. 문서 당 하나만 존재해야 한다.

* article : 독립적으로 구분되거나 재사용 가능한 영역을 설정하는 태그. section과 유사하지만 article은 독립적으로 사용할 수 있는 영역을 설정한다.

* section : 문서의 일반적인 영역을 설정하는 태그. div와 유사하지만 section은 제목, 주제와 같은 어떠한 의미를 띄는 영역을 설정한다.

* aside : 광고나 기타 링크와 같은 문서의 별도 content를 설정하는 태그

* nav : 다른 페이지 링크를 제공하는 영역을 설정하는 태그

* address : 연락처 정보를 제공하는 영역을 설정하는 태그

## 콘텐츠 구분 태그

* div : 본질적으로 아무것도 나타내지 않는 콘텐츠 영역을 설정하는 태그

## 문자 콘텐츠 태그

* ol, ul, li : 각 항목(li)의 정렬된 목록(ol)이나 정렬되지 않은 목록(ul)을 설정하는 태그

* dl, dt, dd : 용어(dt)와 정의(dd) 쌍들의 영역(dl)을 설정하는 태그. dl 내부에는 dt와 dd 외의 다른 태그는 포함될 수 없다. 이 때문에 잘 쓰이지 않는다.

* p : 하나의 문단을 설정하는 태그

* hr : 수평선을 만들어 문단의 분리를 위해 설정하는 (빈)태그. CSS로 수평선을 디자인할 수 있다.
    ```css
    hr {
        border: none;
        border-top: 2px dashed red;
    }
    ```

* pre : 서식이 미리 지정된 텍스트를 설정하는 태그

* blockquote : 일반적인 인용문을 설정하는 태그

## 인라인 텍스트 태그

* a : 다른 URL 혹은 문서의 특정 위치로 이동할 때 사용하는 태그
    ```html
    <a href="https://google.com" target="_blank">Google</a>
    <a href="./README.md" download>README.md</a>
    <a href="#title">제목</a>
    ```  

* abbr : 약어를 지정하는 태그. title이라는 속성을 사용하여 약어의 간략한 설명을 추가한다.

* b : 문체가 다른 글자의 범위를 설정하는 태그

* mark : 사용자의 관심을 끌기 위해 하이라이팅할 때 사용하는 태그

* em : 의미를 강조할 때 사용하는 태그

* strong : 의미의 중요성을 나타내기 위해 사용하는 태그

* i : 평범한 글자와 아이콘, 특수기호를 구분하기 위해 사용하는 태그

* dfn : 용어를 정의할 때 사용하는 태그

* cite : 창작물에 대한 참조를 설정하는 태그

* q : 짧은 인용문을 설정하는 태그

* u : 밑줄이 있는 글자를 설정하는 태그. 의미는 없고 단순 꾸미는 용도이기 때문에 잘 사용하지 않는다.

* code : 컴퓨터 코드 범위를 설정하는 태그

* kbd : 키보드에서 사용자 입력을 나타내는 태그

* sup, sub : 위 첨자와 아래 첨자를 설정하는 태그

* time : 날짜나 시간을 나타내는 태그

* span : 본질적으로 아무것도 나타내지 않는 콘텐츠 영역을 설정하는 태그

* br : 줄바꿈을 설정하는 (빈)태그

* del : 삭제된 텍스트의 범위를 지정하는 태그

* ins : 새로 추가 혹은 변경된 텍스트의 범위를 지정하는 태그

## 멀티미디어 태그

* img : 이미지를 삽입하는 (빈)태그
    * srcset : 브라우저에 제시할 이미지들과 원본 크기
    * sizes : 조건에 해당하는 이미지의 최적화 출력 크기를 지정
    * w단위 : 이미지의 원본 크기(가로 너비)
    * x단위 : 이미지의 비율 의도  
    <br />
    ```html
    <img
        srcset="./images/msw_small.png 400w,
                ./images/msw_medium.png 700w,
                ./images/msw_large.png 1000w"
        sizes="(min-width: 701px) 1000px,
               (min-width: 401px) 700px,
               400px"
        src="images/msw.png"
        alt="moonsw" />
    ```

* audio : 소리 콘텐츠를 삽입하는 태그

* video : 동영상 콘텐츠를 삽입하는 태그

* figure, figcaption : 이미지나 삽화, 도표 등의 영역을 설정하여 이미지나 삽화 등의 설명을 표시하는 태그
    ```html
    <figure>
        <img src="./msw.png" alt="msw"/>
        <figcaption>문성운의 이미지이다.</figcaption>
    </figure>
    ```

## 내장 콘텐츠 태그

* iframe : 다른 HTML 페이지를 현재 페이지에 삽입하는 태그

* canvas : Canvas API나 WebGL API를 사용하여 그래픽이나 애니메이션을 랜더링 할 범위를 설정하는 태그

## 스크립트 태그

* script : 스크립트 코드를 문서에 포함하거나 참조할 때 사용하는 태그. 스크립트에서 HTML을 제어하려면 defer 속성을 사용하거나 body 가장 밑에 두어야 한다.
    ```html
    <head>
        <script src="./js/main.js" defer></script>
    </head>
    ```

* noscript : 스크립트를 지원하지 않는 경우에 삽입할 HTML을 정의할 때 사용하는 태그

## 표 콘텐츠 태그

* table : 데이터 표(table)의 행(tr)과 열(th, td)를 생성하는 태그

* caption : 표의 제목을 설정하는 태그. table 당 1개만 사용 가능하다.
    ```html
    <table>
        <caption>문성운의 표</caption>
    </table>
    ```

* colgroup, col : 표의 열들을 공통적으로 정의하는 컬럼(col)과 그의 집합

* thead, tbody, tfood : 표의 머리글, 본문, 바닥글을 지정하는 태그

## 양식 태그

* form : 웹 서버에 정보를 제출하기 위한 양식 범위를 정의하는 태그
    * action : 전송한 정보를 처리할 웹페이지의 URL
    * method : 서버로 전송할 HTTP 방식
    * autocomplete : 자동완성 기능 사용 여부
    * novalidate : 전송할 때 양식 데이터의 유효성을 검사하지 않도록 지정

* input : 사용자에게 입력 받을 데이터 양식을 설정하는 태그

* label : 라벨 가능 요소(button, input, progress, select, textarea)의 제목을 설정하는 태그
    * for 속성으로 라벨 가능 요소를 참조
    * label을 눌러도 참조한 요소에 focus가 잡힘

* button : 선택 가능한 버튼을 지정하는 태그

* textarea : 여러 줄의 일반 텍스트 양식을 정의하는 태그

* fieldset, legend : 같은 목적의 양식을 그룹화(fieldset)하여 제목(legend)을 지정하는 태그

* select, datalist, optgroup, option : 옵션(option, optgroup)의 선택 메뉴(select), 나 자동완성(datalist)을 제공하는 태그
    ```html
    <select>
        <option>사과</option>
        <option>바나나</option>
        <option>딸기</option>
    </select>

    <input type="text" id="fruits" />
    <datalist id="fruits">
        <option>사과</option>
        <option>바나나</option>
        <option>딸기</option>
    </datalist>
    ```

* progress : 작업의 완료 진행률을 표시하는 태그

## 전역 속성
전역 속성이란 모든 HTML 요소에서 공통적으로 사용 가능한 속성을 뜻한다.

* class : 공백으로 구분된 요소의 별칭을 지정하는 속성. CSS 혹은 JS의 요소 선택기를 통해서 요소를 선택하거나 접근할 수 있다.

* id : 문서에서 고유한 식별자를 정의하는 속성. CSS 혹은 JS의 요소 선택기를 통해서 요소를 선택하거나 접근할 수 있다.

* style : 요소에 적용할 CSS를 선언하는 속성

* title : 요소의 정보를 지정하는 속성. 마우스로 해당 요소를 가르키면 작성한 title이 나타난다.

* lang : 요소의 언어를 지정하는 속성. 언어가 바뀌지 않는다면, html 태그에서 한 번만 사용하면 된다.

* data-* : 사용자 정의 데이터를 지정하는 속성

* draggable : 요소가 Drag and Drop API를 사용 가능한지 여부를 지정하는 속성

* hidden : 요소를 숨길 때 사용하는 속성

* tabindex : Tab키를 이용해 요소를 순차적으로 포커스 탐색할 순서를 지정하는 속성

## 특수기호

 * &nbsp : 띄어쓰기
 * &lt, &gt : <, >

<br />
<strong>HTML 태그는 보여지는 모습이 아닌 각 태그 고유의 의미에 집중 해야한다!</strong>
<br />
<br />

HTML References :  
https://developer.mozilla.org/ko/docs/Web/HTML  
https://heropy.blog/2019/05/26/html-elements/

문서의 구조와 검색엔진의 관계 :  
https://poiemaweb.com/html5-semantic-web