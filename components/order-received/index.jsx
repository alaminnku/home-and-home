import { BiLeftArrowAlt } from "react-icons/bi";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import { useOrder } from "@contexts/OrderContext";
import styles from "@styles/order-received/OrderReceived.module.css";
import { useEffect } from "react";

export default function OrderReceived() {
  const router = useRouter();
  const { restaurantSlug } = router.query;
  const { orderAttributes } = useOrder();

  // If there are no order attributes
  // then push to the restaurant page
  useEffect(() => {
    if (!orderAttributes && restaurantSlug) {
      router.push(`/${restaurantSlug}`);
    }
  }, [router]);

  return (
    <section className={styles.order_received}>
      <div
        className={styles.back_icon}
        onClick={() => router.push(`/${restaurantSlug}`)}
      >
        <BiLeftArrowAlt />
      </div>

      <div className={styles.order_received_top}>
        <h1>Order received</h1>
        <p>
          WhatsApp confirmation sent <br /> You will be contacted to arrange
          payment by <span>{orderAttributes?.contactDisplayString}</span>
        </p>
      </div>

      <Player
        autoplay
        loop
        // src="https://assets1.lottiefiles.com/packages/lf20_myejiggj.json"
        src={orderAttributes?.lottie}
        style={{ height: "15rem", width: "15rem" }}
      />
    </section>
  );
}
