import styled from "styled-components";
import { AuthContext } from "../Providers/Auth.js";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_BASE } from "../Constants/url.js";
import ProductsList from "./ProductsComponent.js";

export default function SalesData({ handleBox }) {
  const { userData } = React.useContext(AuthContext);
  const [salesUser, setSalesUser] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  useEffect(() => {
    axios.get(`${URL_BASE}/sale`, config).then((res) => {
      const sales = res.data;
      setSalesUser(sales);
      const products = [];
      sales.map((s) => products.push(s.products));
      setSalesProducts(products);
    });
  }, []);
  return (
    <SalesDiv enable={handleBox}>
      {salesUser.map((e) => (
        <div className="data-box">
          <ProductsList products={e} key={e.id}/>
          <div className="total">
            <p>Valor Total</p>
            <p>R${e.total}</p>
          </div>
          <p>Data da Compra: {e.time}</p>
          <p>Forma de Pagamento: {e.paymentMethod}</p>
        </div>
      ))}
    </SalesDiv>
  );
}

const SalesDiv = styled.div`
  display: ${(props) => props.enable};

  .data-box {
    border-bottom: 1px solid #c6c6c6;
    padding-bottom: 10px;
    width: 500px;
    margin: 0 auto 10px auto;
  }

  .total {
    font-size: 18px;
    margin: 10px 25px 10px 15px;
    display: flex;
    justify-content: space-between;
  }

  .products {
    width: 450px;
    margin: 0 auto;

    .products-list {

      background-color: rgb(255 240 250);
      li {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        margin-top: 5px;
        margin-bottom: 5px;

        div {
          display: flex;
          justify-content: space-between;
          width: 200px;
        }
      }
    }

    .titles {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
  }

  .infos {
    width: 240px;
    height: 50px;
  }
`;
