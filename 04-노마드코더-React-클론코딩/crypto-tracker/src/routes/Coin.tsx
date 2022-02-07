import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

interface RouteParams {
  coinID: string;
}
interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IUSD {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: IUSD;
  };
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-self: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  background: gray;
  padding: 30px;
  border-radius: 50px;
  a {
    font-size: 30px;
    font-weight: 600;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

function Coin() {
  const { coinID } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch(`/${coinID}/price`);
  const chartMatch = useRouteMatch(`/${coinID}/chart`);

  // const [loading, setLoading] = useState(true);

  // const [info, setInfo] = useState<InfoData>();
  // const [price, setPrice] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const r1 = await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`);
  //     const infoData = await r1.json();

  //     const r2 = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`);
  //     const priceData = await r2.json();

  //     setInfo(infoData);
  //     setPrice(priceData);

  //     setLoading(false);
  //   })();
  // }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinID],
    () => fetchCoinInfo(coinID)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinID],
    () => fetchTickers(coinID),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading && tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : tickersData?.quotes?.USD?.price}

      <TabContainer>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinID}/price`}>PRICE</Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinID}/chart`}>CHART</Link>
        </Tab>
      </TabContainer>

      <Switch>
        <Route path={`/:coinID/price`}>
          <Price />
        </Route>
        <Route path={`/:coinID/chart`}>
          <Chart coinID={coinID} />
        </Route>
      </Switch>
    </Container>
  );
}
export default Coin;
