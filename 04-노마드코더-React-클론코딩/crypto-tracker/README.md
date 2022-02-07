# crpyto tracker

## react-router-dom (5.3.0)

- Switch 컴포넌트와 exact 속성

  - Switch : 가장 먼저 매칭되는 path의 컴포넌트만 렌더링 한다.

  - exact : 정확하게 일치하는 path의 컴포넌트만 렌더링 한다.

  - 아래 코드의 경우 "/btc"와 같은 path에서 Coins와 Coin 모두 렌더링 된다. "/"도 "/btc"에 포함되기 때문이다.

    ```javascript
    <BrowserRouter>
      <Route path="/:coinID">
        <Coin />
      </Route>
      <Route path="/">
        <Coins />
      </Route>
    </BrowserRouter>
    ```

  - Switch로 Route를 감싸주면 "/:coinID" path가 가장 먼저 매칭되므로 Coin만 렌더링 된다.

    ```javascript
    <BrowserRouter>
      <Switch>
        <Route path="/:coinID">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
    ```

  - 하지만 아래 코드와 같이 Route의 순서가 바뀌면 Coins만 렌더링 된다.

    ```javascript
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Coins />
        </Route>
        <Route path="/:coinID">
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
    ```

  - exact를 사용하면 "/"는 정확히 "/"에서만 렌더링 된다.

    ```javascript
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Coins />
        </Route>
        <Route path="/:coinID">
          <Coin />
        </Route>
      </Switch>
    </BrowserRouter>
    ```

- useParams : path 파라미터를 넘겨 받을 수 있다.

  ```javascript
  import { useParams } from "react-router-dom";

  function Coin() {
    const params = useParams(); // { coinID: 'BTC' }

    return <h1>Coin</h1>;
  }
  ```

- Link, useLocation

  ```javascript
  <Link
    to={{
      pathname: `/${coin.id}`,
      state: { name: coin.name },
    }}
  >
    ~~~
  </Link>
  ```

  ```javascript
  function Coin() {
    // url로 화면을 이동해 올 경우 state는 존재하지 않는다!!
    const { state } = useLocation(); // { name: 'Bitcoin' }

    // useLocation으로 받아온 Object로 현재 path도 알 수 있음!!

    return <h1>Coin</h1>;
  }
  ```

- useRouteMatch

  ```javascript
  const priceMatch = useRouteMatch(`/${coinID}/price`);
  // null or Object { isExact, path, url }
  ```

## react-query

1. index.tsx : queryClient 객체 생성 후 QueryClientProvider로 감싸기

   ```typescript
   /* import ~~~ */
   import { QueryClient, QueryClientProvider } from "react-query";

   const queryClient = new QueryClient();

   ReactDOM.render(
     <React.StrictMode>
       <QueryClientProvider client={queryClient}>
         <ThemeProvider theme={theme}>
           <App />
         </ThemeProvider>
       </QueryClientProvider>
     </React.StrictMode>,
     document.getElementById("root")
   );
   ```

2. api.ts : fecth 함수 정의

   ```typescript
   export function fetchCoins() {
     return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
       response.json()
     );
   }
   ```

3. useQuery

   ```typescript
   const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
   ```

   ```typescript
   const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
     ["tickers", coinID],
     () => fetchTickers(coinID),
     {
       refetchInterval: 5000,
     }
   );
   ```

## useEffect 내에서 async 함수 사용하기

- https://merrily-code.tistory.com/117
