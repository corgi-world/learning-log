# 5장 CSS 속성

## 박스 모델

* width : 요소의 가로 너비를 지정
* height : 요소의 세로 너비를 지정

* max-width : 요소의 최대 가로 너비를 지정
* min-width : 요소의 최소 가로 너비를 지정
* max-height : 요소의 최대 세로 너비를 지정
* min-height : 요소의 최소 세로 너비를 지정

* margin : 요소의 '외부(바깥) 여백'을 지정

    * %(단위) : 부모 요소의 가로너비의 비율
    * ```margin: 10px;``` [위, 아래, 좌, 우]
    * ```margin: 10px 40px;``` [위, 아래] [좌, 우]
    * ```margin: 10px 20px 40px;``` 위 [좌, 우] 아래
    * ```margin: 10px 20px 30px 40px;``` 위 우 아래 좌
    * margin-top, -bottom, -left, -right
    * 형제 요소 위, 아래의 margin은 중복된다.
    * 부모 요소와 자식 요소의 margin-top 시작 지점이 같으면 자식 요소의 margin-top이 부모 요소의 margin-top으로 사용된다. -bottom은 부모 요소의 -bottom으로 사용된다.

* padding : 요소의 '내부(안) 여백'을 지정

    * 변수 순서는 margin과 같다. (위 우 아래 좌)
    * 추가된 padding 값만큼 요소의 크기가 커진다.
    * ```box-sizing: border-box;``` 를 추가하면 크기가 커지지 않도록 브라우저가 자동으로 계산한다.

* border : 요소의 '테두리 선'을 지정

    * ```border: 1px solid red;```
    * border-width, -style, -color 의 변수 순서는 margin과 같다. (위 우 아래 좌)
    * ```box-sizing: border-box;``` 를 추가하면 크기가 커지지 않도록 브라우저가 자동으로 계산한다.

* box-sizing : 요소의 크기 계산 기준을 지정

    * context-box : width, height만으로 요소의 크기를 계산
    * border-box : width, height에 padding과 border를 포함하여 요소의 크기를 계산

* display : 요소의 박스 타입을 설정

    * block : 기본적으로 가로 폭 전체를 사용한다.
    * inline : width, height 값을 가질 수 없다.
    * inline-block : width, height, margin, padding의 값을 가질 수 있는 inline 요소
    * none : 단순히 안보이게 하는 것이 아니라 존재하지 않게 한다.

* overflow : 요소의 크기 이상으로 내용(자식요소)이 넘쳤을 때, 내용의 보여짐을 제어

* opacity : 요소의 투명도를 지정 (기본값 1)

## 글꼴

* font : 글자 관련 속성들을 지정

    * ```font: 기울기 두께 크기 / 줄높이 글꼴;```
    * ```font: italic bold 20px / 1.5 "Arial", sans-serif;```
    * 단축 속성으로 사용하려면 font-size와 font-family를 필수로 입력해야 한다.
    * font-style : 글자 기울기를 지정
    * font-weight : 글자의 두께를 지정 (normal==400, bold==700)
    * font-size : 글자의 크기를 지정 (기본값 16px)
    * line-height : 줄 높이 지정
    * font-family : ```font-family: 글꼴후보1, 글꼴후보2, ..., 글꼴계열;```

## 문자

* color : 문자의 색상을 지정

    * Hex 색상코드 : ```#000000```
    * RGB : 빛의 삼원색 ```rgb(255, 255, 255)```
    * RGBA : 빛의 삼원색, 투명도 ```rgba(255, 0, 0, .5)```

* text-align : 문자 정렬 방식을 지정

* text-indent : 첫번째 줄의 들여쓰기를 지정

* text-decoration : 선(line)으로 문자의 장식을 설정

* letter-spacing : 글자 사이의 간격을 설정

* word-spacing : 단어 사이(띄어쓰기)의 간격을 설정

## 정렬

* float : 요소를 좌우 방향으로 띄움.(수평 정렬) 신문이나 칼럼 등에서 사진과 글을 자연스럽게 배치할 때 사용한다.

    * ```float: left;```
    * 다음 형제 요소에 ```clear: left;``` 를 추가하여 해제할 수 있다.

    ```css
    .clearfix::after {
        content: "";
        clear: both;
        display: block;
    }
    ```

    * float 속성이 추가된 요소는 대부분 display 속성의 값이 block로 변경된다.

    * 