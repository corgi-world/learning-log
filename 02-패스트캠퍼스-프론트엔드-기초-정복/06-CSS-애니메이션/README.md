# 6장 CSS 애니메이션

## 전환(Transitions)

* transition : CSS 속성의 시작과 끝을 지정하여 중간 값을 애니메이션

    * transition-property : 전환 효과를 사용할 속성 이름
    * transition-duration : 전환 효과의 지속시간 설정
    * transition-timing-function : 타이밍 함수 지정
        * ```transition-timing-function: linear;```
        * https://easings.net/ko
    * transition-delay : 전환 효과의 대기시간 설정
        
        ```css
        .box {
            width: 100px;
            height: 100px;
            background: tomato;
            transition: width 1s, background 1s;
        }
        .box:hover {
            width: 300px;
            background: dodgerblue;
        }
        ```

## 변환(Transform)

* transform : 요소의 변환 효과를 지정
    
    * ```transform: 변환함수1 변환함수2 변환함수3 ...;```
    * ```transform: 원근법 이동 크기 회전 기울임```
    * ```transform: rotate(20deg) translate(10px, 0);```

* 2D 변환 속성

    * translate : (X, Y) 이동
        * position relative의 결과와 유사하지만, position은 애니메이션에 특화된 속성이 아니므로 trainsition을 적용했을 때 많은 부하가 발생한다.
        * ```transform: translate(30px, 30px);```
    * scale : (X, Y) 크기 조절
        * ```transform: scale(1.5);```
    * skew : (X, Y) 비틀기
        * ```transform: skewX(45deg);```
    * rotate : 회전
        * ```transform: rotate(45deg);```

* 3D 변환 속성

    * translate3d : (X, Y, Z) 이동
    * scale3d : (X, Y, Z) 크기 조절
    * rotate3d : (X, Y, Z) 회전
    * perspective : 원근법
        * ```transform: perspective(500px);```
        * transform 가장 앞부분에 설정해주어야 한다.

* transform 속성

    * transform-origin : 요소 변환의 기준점을 설정
        * ```transform-origin: 50% 50%;```
    
    * transform-style : 3D 변환 요소의 자식 요소도 3D 변환을 사용할지 설정
        * ```transform-style: preserve-3d;```
    
    * perspective : 하위 요소를 관찰하는 원근 거리를 설정

    * perspective-origin : 원근 거리의 기준점을 설정

    * backface-visibility : 3D 변환으로 회전된 요소의 뒷면 숨김을 설정