import { BiLeftArrowAlt } from "react-icons/bi";

import styles from "@styles/order-received/OrderReceived.module.css";

export default function OrderReceived() {
  return (
    <section className={styles.order_received}>
      <div className={styles.back_icon}>
        <BiLeftArrowAlt />
      </div>

      <div className={styles.order_received_top}>
        <h1>Order received</h1>
        <p>
          WhatsApp confirmation sent <br /> You will be contacted to arrange
          payment by <span>time</span>{" "}
        </p>
      </div>
    </section>
  );
}
