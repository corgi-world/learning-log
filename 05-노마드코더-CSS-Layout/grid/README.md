# grid

- grid-template-columns, -rows

  ```css
  .parents {
    display: grid;

    grid-template-columns: 150px 150px 150px 150px;
    grid-template-rows: 100px 100px 100px 100px;
    /*
    grid-template-columns: repeat(4, 150px);
    grid-template-rows: repeat(4, 100px);  
    */
  }
  ```

- column, row-gap

  ```css
  .parents {
    display: grid;

    column-gap: 10px;
    row-gap: 10px;
    /* 
    gap: 10px;
    */
  }
  ```

- grid-template, -areas

  ```css
  .parents {
    display: grid;
    grid-template-columns: repeat(4, 150px);
    grid-template-rows: 100px repeat(2, 150px) 100px;
    grid-template-areas:
      "header header header header"
      "content content content nav"
      "content content content nav"
      "footer footer footer footer";
  }

  .parents {
    display: grid;
    grid-template:
      "header header header header" 100px
      "content content content nav" 300px
      "footer footer footer footer" 100px / 150px 150px 150px 150px;
  }

  .header {
    background-color: #2ecc71;
    grid-area: header;
  }
  .content {
    background-color: #3498db;
    grid-area: content;
  }
  .nav {
    background-color: #8e44ad;
    grid-area: nav;
  }
  .footer {
    background-color: #f39c12;
    grid-area: footer;
  }
  ```

- grid-column, -row : 각 item에 grid 내부에 위치할 곳을 지정한다.

  ```css
  .parents {
    display: grid;
    grid-template-columns: repeat(4, 150px);
    grid-template-rows: repeat(4, 150px);
    gap: 10px;
  }

  .header {
    background-color: #2ecc71;
    grid-column-start: 1;
    grid-column-end: 5;
  }
  .content {
    background-color: #3498db;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
  }
  .nav {
    background-color: #8e44ad;
    grid-row: 2 / 4;
    /*
    grid-row: span 2;
    grid-row: 2 / -2;
    */
  }
  .footer {
    background-color: #f39c12;
    grid-column: span 4;
    /*
    grid-column: 1 / -1;
    grid-column: 1 / 5;
    */
  }
  ```

- fr : grid container에서 가질 수 있는 만큼의 공간을 fr의 비율만큼 서로 나누어 가진다.

  ```css
  .parents {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 2fr repeat(2, 3fr) 1fr;
    width: 50%;
    height: 50vh;
    gap: 10px;
  }
  ```

- justify, align-items : grid 내부의 item들을 정렬한다.

  ```css
  .parents {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
  }
  ```

- justify, align-self : grid 내부의 특정 item 하나를 정렬한다.

  ```css
  .header {
    background-color: #2ecc71;
    justify-self: end;
    align-self: end;
  }
  ```

- justify, align-content : grid 전체를 정렬한다.

  ```css
  .parents {
    height: 100vh;
    background: beige;
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 100px);
    justify-content: center;
    align-content: center;
  }
  ```

- justify, align-items center vs justify, align-content center

  - items

    <image src="./images/items.png" width="45%" height="45%" />

  - content

    <image src="./images/content.png" width="45%" height="45%" />

- grid-auto-rows : template-rows보다 item이 더 많아지면 auto-rows의 사이즈로 나머지 item들이 설정된다.

  ```css
  .parents {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 100px);
    grid-auto-rows: 150px;
  }
  ```

- grid-auto-flow : template보다 item이 더 많아졌을 때 나머지 item들 어떻게 배치할 것인지를 설정한다.

  ```css
  .parents {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 100px);
    grid-auto-flow: column; /* default: row */

    grid-auto-columns: 150px;
  }
  ```

- minmax : 공간이 넉넉할 땐 max사이즈를 유지하면서, 공간이 최소한으로 줄어들어도 min사이즈 미만으로 줄어들지는 않게한다.

  ```css
  .parents {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(10, minmax(100px, 1fr));
    grid-template-rows: repeat(4, 100px);
  }
  ```

- auto-fill : 주어진 공간 내에서 최대한 많은 column을 만들 수 있는 사이즈를 사용한다.

  ```css
  .parents {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-rows: 100px;
  }
  ```

- auto-fit : 주어진 공간 내에서 각 item에 적용할 수 있는 최대 사이즈를 적용한다.

  ```css
  .parents {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: 100px;
  }
  ```

- auto-fill vs auto-fit

  <image src="./images/auto-fill-fit.png" width="50%" height="50%" />

- min, max-content : 각 item 내부 content를 최대한 작게 담거나 최대한 크게 담게 설정한다.

  ```css
  .parents {
    display: grid;
    gap: 5px;
    grid-template-columns: min-content max-content;
    grid-template-rows: 100px;
  }
  ```

  <image src="./images/min-max-content.png" width="25%" height="25%" />
