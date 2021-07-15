# 7장 CSS Grid

* multi-columns : 일반 블록 레이아웃을 확장하여 여러 텍스트 다단으로 쉽게 정리하며, 가독성 확보

    * columns : 다단을 정의
        * ```columns: 너비 개수;```
    
    * column-gap : 단과 단 사이의 간격(px, em, cm)을 설정
        * ```column-gap: 간격;```

    * column-rule : 단과 단 사이의 선을 지정
        * ```column-rule: 두께 종류 색상;```

## Flex

* container : ```display: flex;```가 부여된 요소
    * block 요소를 포함한 모든 자식 요소를 가로로 배치
    * display: flex는 container를 block 요소로
    * display: inline-flex는 container를 inline 요소로

* items : container의 자식 요소

## Flex Containers 속성

* flex-flow : items의 주 축을 설정하고 여러 줄 묶음을 설정
    * ```flex-flow: 주축 여러줄묶음;```
    * ```flex-direction: column;``` items의 주 축을 설정
    * ```flex-wrap: wrap;``` items의 여러 줄 묶음을 설정
        * nowrap : 한 줄에 모두 담기 때문에 너비가 줄어들 수 있다.
        * wrap : container의 너비가 items의 너비를 모두 담을 수 없으면 아래 줄로 내린다.
    
* justify-content : 주 축의 정렬 방법을 설정
    * flex-start : 시작점을 기준으로 정렬
    * flex-end : 끝점을 기준으로 정렬
    * center : 가운데 정렬
    * space-between : 시작 item은 시작점에, 마지막 item은 끝점에 정렬되고 나머지는 사이에 고르게 정렬
    * space-around : 균등한 여백을 포함하여 정렬

* align-content : 교차 축의 정렬 방법을 설정한다. flex-wrap 속성을 통해 items가 여러 줄 이상이고 여백이 있을 때 사용할 수 있다.
    * stretch : container의 교차 축을 채우기 위해 items를 늘림
    * flex-start, -end, center, space-between, -around

* align-items : 각각의 줄에 교차 축의 정렬 방법을 설정한다. (align-content는 모든 줄에)
    * baseline : items를 문자 기준선에 정렬
    * stretch, flex-start, -end, center, space-between, -around

## Flex Items 속성

* order : item의 순서를 설정
    * ```order: -1;```

* flex-grow : item이 flex-basis의 값보다 커질 수 있는지를 결정. items의 flex-basis를 제외한 여백 부분을 지정된 숫자의 비율로 나누어 가진다.
    * ```flex-grow: 2;```

* flex-shrink : item이 감소하는 너비의 비율을 설정한다. 요소의 너비가 감소할 때 숫자가 클 수록 더 많은 너비가 감소한다.
    * ```flex-shrink: 3;```

* flex-basis : item의 기본 너비를 설정
    * ```flex-basis: 100px;```
    * flex-basis가 0이 아닐 때에는 내부 너비를 제외한 여백의 너비가 flex-grow의 비율로 설정된다.
    * 순수하게 flex-grow로 너비를 정하고 싶을 때는 flex-basis의 값을 0으로 한다.
    * flex 단축 속성을 사용할 때 명시적으로 적지 않으면 0으로 설정된다.

* align-self : 교차 축에서 개별 item의 정렬 방법을 설정
    * ```align-self: center;```

## Grid Containers 속성

* display : Grid Container를 정의
    * ```display: grid;```
    * grid : Block 특성의 Grid Container를 정의
    * inline-grid : Inline 특성의 Grid Container를 정의

* grid-template : -rows, -columns, -areas의 단축 속성

* grid-template-rows, -columns : 명시적으로 행 또는 열의 크기를 정의한다. [, ] 를 사용해서 선의 이름을 정의할 수 있다.
    * ```grid-template-rows: 100px 100px;```
    * ```grid-template-columns: 1fr 1fr;```
    * ```grid-template-columns: repeat(3, 1fr);```
    * ```grid-template-columns: [msw-start] 100px [msw] 200px [msw-end];```

* grid-template-areas : 지정된 그리드 영역 이름을 참조해 그리드 템플릿을 생성합니다.

    ```css
    .container {
        display: grid;
        grid-template-rows: 80px 350px 130px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
            "header header header"
            "main main aside"
            ". footer .";
    }
    .item:nth-child(1) {
        grid-area: header;
    }
    .item:nth-child(2) {
        grid-area: main;
    }
    .item:nth-child(3) {
        grid-area: aside;
    }
    .item:nth-child(4) {
        grid-area: footer;
    }
    ```

* row-gap, column-gap : 행 혹은 열 사이의 간격을 지정

    * ```gap: 30px 20px;```
    * ```row-gap: 30px;```
    * ```column-gap: 20px;```

* grid-auto-rows, -columns : 암시적으로 행 또는 열의 크기를 정의. grid-template- 로 명시적으로 정의된 행과 열 외부의 배치되는 경우 암시적 크기가 적용된다.
    * ```grid-auto-rows: 100px;```
    * ```grid-auto-columns: 1fr;```

* grid-auto-flow : 배치하지 않은 item을 어떤 방식의 자동 배치 알고리즘으로 처리할지 정의
    * ```grid-auto-flow: row dense;```

* align-content : 그리드 내의 content를 수직 정렬
    * ```align-content: center;```

* justify-content : 그리드 내의 content를 수평 정렬
    * ```justify-content: center;```

* align-items : 그리드 내의 item을 해당 칸을 기준으로 수직 정렬
    * ```align-items: center;```

* justify-items : 그리드 내의 item을 해당 칸을 기준으로 수평 정렬
    * ```justify-items: center;```

## Grid Items 속성

* grid-row, -column : start / end 로 item을 배치
    * ```grid-row: 1 / 3;```
    * ```grid-column: 1 / 3;```
    * ```grid-column: msw-start / msw-end;```
    * ```grid-column: 2 / span 3;```
    * ```grid-column: span 3 / 5;```

        ```css
        .item {
            grid-row: 1 / 5;
            grid-column: 1 / 5; 
        }
        .item {
            grid-area: 1 / 1 / 5 / 5; /* rs cs re ce */
        }
        ```

* align-self : item의 수직 축을 정렬
    * ```align-self: center;```

* justify-self : item의 수평 축을 정렬
    * ```justify-self: center;```

* order : 그리드 아이템이 자동 배치되는 순서를 변경
    * ```order: 1;```

* z-index : 아이템이 쌓이는 순서를 변경
    * ```z-index: 1;```

## Grid Items 함수

* repeat() : 행/열의 크기 정의를 반복
    * ```repeat(9, 100px);```
    * ```repeat(3, 100px 200px 300px);```

* minmax() : 행/열의 최소/최대 크기를 정의
    * ```grid-template-columns: minmax(100px, 1fr) minmax(200px, 1fr);```

* fit-content : 행/열의 크기를 item 내부의 content 크기에 맞춘다. 매개변수로 최대 크기를 지정한다. 최소 너비는 한 단어의 너비
    * ```grid-template-columns: fit-content(300px) fit-content(300px);```

## Grid 단위

* fr : 사용 가능한 공간에 대한 비율

* min-content : item이 포함하는 내용의 최소 크기
    * 문자가 영어일 경우 최소 너비는 한 단어의 너비
    * 한글일 경우는 ```word-break: keep-all;``` 필요

* max-content : item이 포함하는 내용의 최대 크기

* auto-fill, auto-fit : 행과 열의 개수를 그리드 container 및 행/열 크기에 맞게 자동적으로 조정
    * auto-fill은 남는 공간을 그대로 유지한다.
    * auto-fit은 공간을 남김 없이 모두 사용한다.
    * ```grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));```

## Grid Simple Example
```html
<div class="container">
    <header>HEADER</header>
    <main>MAIN</main>
    <aside>ASIDE</aside>
    <footer>FOOTER</footer>
</div>
```

```css
.container {
    display: grid;
    grid-template-rows: 80px 350px 130px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "header header header"
        "main main aside"
        "footer footer footer";
}
.container > * {
    border: 10px solid red;
}
header {
    grid-area: header;
    /* grid-area: 1 / 1 / 1 / 4; */
}
main {
    grid-area: main;
    /* grid-area: 2 / 1 / 2 / 3; */
}
aside {
    grid-area: aside;
    /* grid-area: 2 / 3 / 2 / 4; */
}
footer {
    grid-area: footer;
    /* grid-area: 3 / 1 / 3 / 4; */
}
```