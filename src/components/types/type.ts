export interface ShopCardProps {
    key: number;
    imgSrc: string;
    title: string;
    price: number;
    description: string;
}
  
export interface CartItemProps {
    key: number
    imgSrc: string,
    title: string,
    price: number,
    itemQuantity: number,
}