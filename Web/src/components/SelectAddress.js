import AddressCard from "./AddressCard";
import RadioButton from "./RadioButton";

function SelectAddress({ selected, item, onClick }) {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RadioButton checked={selected} />
      </div>
      <div style={{ display: "flex", flex: 8 }}>
        <AddressCard {...item} ShowOptionsIcon={false} />
      </div>
    </div>
  );
}

export default SelectAddress;
