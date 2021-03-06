# flex

- flex-direction

  - main axis를 설정한다.
  - 기본값은 row(가로)이며 column(세로)로 변경할 수 있다.

    ```css
    .parents {
      flex-direction: row;
      flex-direction: column;
    }
    ```

- justify-content

  - 모든 자식 item들을 main axis에서 정렬한다.

    ```css
    .parents {
      justify-content: center;
      justify-content: space-around;
    }
    ```

- align-items

  - 모든 자식 item들을 closs axis에서 정렬한다.

  - align-items는 각 본인의 줄 단위로 정렬하고 align-content는 모든 줄을 일괄 정렬한다.

    ```css
    .parents {
      align-items: center;
      align-items: flex-end;
    }
    ```

- align-self

  - 자식 요소 하나를 closs axis에서 정렬한다.

    ```css
    .child:nth-child(2) {
      align-self: center;
      align-self: flex-end;
    }
    ```

- flex-wrap

  - flex container는 기본값인 nowrap 상태일 때에는 모든 자식 요소들의 width를 줄여서라도 한 줄로 배치한다.

  - wrap으로 변경하면 자식 요소들의 width를 유지하여 container의 width를 넘으면 다음 줄에 배치하게 된다.

    ```css
    .parents {
      flex-wrap: nowrap;
      flex-wrap: wrap;
    }
    ```

- flex-grow

  - flex-basis의 값보다 커질 수 있는지를 결정하는 속성이다.
  - 기본값은 0이다.
  - 각 item들은 여백 부분을 지정된 숫자의 비율로 나누어 가진다.

    ```css
    .child:nth-child(2) {
      flex-grow: 2;
    }
    ```

- flex-shrink

  - flex-basis의 값보다 작아질 수 있는지를 결정하는 속성이다.
  - 기본값은 1이다.
  - 너비가 감소할 때 지정된 숫자의 비율에 따라 감소한다.

    ```css
    .child:nth-child(2) {
      flex-shrink: 2;
    }
    ```

- flex-basis

  - item의 기본 크기를 설정한다.
  - flex-direction에 따라 width, height가 될 지 결정된다.

    ```css
    .child:nth-child(2) {
      flex-basis: 200px;
    }
    ```
