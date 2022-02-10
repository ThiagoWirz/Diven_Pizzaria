import { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/cartContext";
import Header from "../Header";
import {
  Container,
  Order,
  Product,
  FinalPrice,
  ConfirmButton,
  Description,
  RemoveButton,
} from "./style";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState("");

  function calcTotal() {
    let sum = 0;
    for (const product of cart) {
      let priceNumber = product.price.replace(",", ".");
      priceNumber = parseFloat(priceNumber);
      sum += priceNumber;
    }
    let sumString = String(sum.toFixed(2));
    sumString = sumString.replace(".", ",");
    setTotal(sumString);
  }

  useEffect(calcTotal, []);

  function removeItem(i) {
    cart.splice(i);
    setCart([...cart]);
  }

  return (
    <>
      <Header />
      <Container>
        <Order>
          <h1>Seu pedido:</h1>
          {cart.length === 0 ? (
            <h1>Nenhum produto selecionado</h1>
          ) : (
            cart.map((p, i) => (
              <Product>
                <img src={p.image} alt={p.name} />
                <Description>
                  <h2>{p.name}</h2>
                  <h3>R$ {p.price}</h3>{" "}
                </Description>
                <RemoveButton onClick={() => removeItem(i)}>X</RemoveButton>
              </Product>
            ))
          )}
          {cart.length !== 0 && (
            <FinalPrice>Valor final : R$ {total}</FinalPrice>
          )}
        </Order>

        <ConfirmButton>Finalizar Pedido</ConfirmButton>
      </Container>
    </>
  );
}