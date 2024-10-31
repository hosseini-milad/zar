import invoiceEmpty from "@/assets/images/icons/invoiceEmpty.svg";
const Empty = () => {
  return (
    <section className="invoice-empty">
      <img className="invoice-empty__image" src={invoiceEmpty} alt="" />
      <section className="invoice-empty__message">
        صورت حسابی برای شما ایجاد نشده است.
      </section>
    </section>
  );
};

export default Empty;
