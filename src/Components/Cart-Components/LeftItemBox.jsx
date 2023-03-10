import React from "react";
import Button from "./Button";
import CartItem from "./CartItem";
import ConvenienceBox from "./ConvenienceBox";
import OfferBox from "./OfferBox";
import { HiOutlineClipboardList } from "react-icons/hi";
import LeftContentBox from "./LeftContentBox";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components'

const LeftItemBox = () => {
  const store = useSelector((store) => store.Appreducer);
  console.log(store)
  const {
    address: { address, city, locality, pinCode, state, town },
    cart,
    wishlist,
  } = store;
  // console.log(wishlist);
  return (
    <LeftContentBox>
      <OfferBox />
      <ConvenienceBox />
      <TotalItems>
        <b>Total Items: {cart.length}</b>
      </TotalItems>
      {/* <CartItem /> */}
      {cart.length > 0 &&
        cart.map((item) => {
          return (
            <CartItem
              key={item.product_base_href}
              id={item.product_base_href}
              size={["M", "L", "XL", "XXL"]}
              {...item}
            />
          );
        })}
      <Link to={"/wishlist"}>
        <AddFromWishList>
          <HiOutlineClipboardList />
          <b>Add more from Wishlist</b>
        </AddFromWishList>
      </Link>
    </LeftContentBox>
  );
};

const TotalItems = styled.div`
  padding: 16px;
`;

const Scroll = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`

const ScrollingText = styled.div`
  animation: ${Scroll} 10s linear infinite;
`


const AddFromWishList = styled.div`
  border: 1px solid #eaeaec;
  border-radius: 4px;
  padding: 16px;
  cursor: pointer;
`;
export default LeftItemBox;
