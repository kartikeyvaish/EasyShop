import Container from "../components/Container";
import DevelopersCard from "../components/DevelopersCard";
import Text from "../components/Text";
import DevelopersArr from "../schema/Developers";

const DevelopersList = DevelopersArr;

function Developers() {
  return (
    <Container style={{ maxWidth: 900, paddingTop: 10 }}>
      <Text
        text="Developers"
        size={25}
        family="Mulish"
        weight="700"
        marginBottom={10}
      />
      {DevelopersList.map((item) => (
        <DevelopersCard {...item} key={item._id} />
      ))}
    </Container>
  );
}

export default Developers;
